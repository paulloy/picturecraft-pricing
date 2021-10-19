import React from "react";
import { useRef, useState } from "react";
import "../stylesheets/pricing-form.css";

import Cart from "./Cart";

export default function PricingForm({ paper, inkCost }) {
  // User can input dimensions in units of cm or inches.
  const [formInputs, setFormInputs] = useState({
    unit: "cm",
    width: 0,
    length: 0,
  });

  const [selectedPaper, setSelectedPaper] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [total, setTotal] = useState({
    subTotal: 0,
    vat: 0,
    grandTotal: 0,
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const [myCart, setMyCart] = useState([]);

  let imageWidth = useRef();
  let imageLength = useRef();

  // this is called when a user selects a new unit. Inputted values are converted
  const handleDimensionChoice = (e) => {
    let unit = e.target.value;
    let width = imageWidth.current.value;
    let length = imageLength.current.value;

    // units are cm, then inches
    let coefficient = unit === 'cm' ? 2.54 : 0.393701;
    setFormInputs({
      unit: unit,
      width: +(width * coefficient).toFixed(2),
      length: +(length * coefficient).toFixed(2),
    });
  };

    const makeCalculation = () => {
    let unit = formInputs.unit;
    setErrorMessage(null);
    // alpha = unit === 'cm' ? area (cm^2) : (inches^2) covered by 1ml of ink
    let alpha = unit === "cm" 
              ? 0.0158 
              : 0.1015;

    let { width, length } = formInputs;

    if (!selectedPaper) {
      setErrorMessage('Please select a paper');
      return;
    }
    if (width <= 0) {
      setErrorMessage('Width is set to an invalid value');
      return;
    }
    if (length <= 0) {
      setErrorMessage('Length is set to an invalid value');
      return;
    }
    if (quantity <= 0) {
      setErrorMessage('Quantity is set to an invalid value');
      return;
    }
    
    let paperCost = selectedPaper.cost;

    let paperWidth = unit === "cm" 
                  ? selectedPaper.width_cm 
                  : selectedPaper.width_inch;

    let paperLength = unit === "cm" 
                    ? selectedPaper.length_cm 
                    : selectedPaper.length_inch;

    let inkPrice = inkCost.cost;
    let inkVolume = inkCost.volume;

    let subTotal = quantity * ((width * length) * (((paperCost / (paperWidth * paperLength)) + ((inkPrice * alpha) / (inkVolume)))));
    let vat = subTotal * 0.2;
    let total = subTotal * 1.2;

    setTotal({
      subTotal: subTotal,
      vat: vat,
      grandTotal: total
    });
  };

  const addToMyCart = () => {
    let newCartItem = {
      name: selectedPaper.name,
      width: formInputs.width,
      length: formInputs.length,
      unit: formInputs.unit,
      qty: quantity,
      subTotal: total.subTotal,
      vat: total.vat,
      total: total.grandTotal
    }

    let index = myCart.findIndex(item => item.name === newCartItem.name && item.width === newCartItem.width && item.length === newCartItem.length);

    if (index !== -1) {
      let updateItem = {
        ...myCart[index],
        qty: Number(myCart[index].qty) + Number(quantity),
        subTotal: Number(myCart[index].subTotal) + Number(total.subTotal),
        vat: Number(myCart[index].vat) + Number(total.vat),
        total: Number(myCart[index].total) + Number(total.grandTotal)
      }
      myCart[index] = updateItem;
      setMyCart([...myCart]);
    } else {
      setMyCart([...myCart, newCartItem]);
    }
  }

  return (
    <React.Fragment>
      <form className="paper-form">
        {/* note: include ink for prices */}
        <div className="bb">
          <h4>Paper</h4>
          <select
            className="select-padding"
            name="paper"
            id="paper"
            onChange={(e) => setSelectedPaper(JSON.parse(e.target.value))}
          >
            <option value="null" id="psp">
              Select Paper
            </option>
            {paper.map((item) => (
              <option key={item._id} value={JSON.stringify(item)}>
                {item.name}
              </option>
            ))}
          </select>
          <a href="#">Open Settings</a>
        </div>
        <div className="flex-col">
          <h4>Dimensions</h4>
          <select
            className="select-padding"
            name="dimensions"
            id="dimensions"
            onChange={(e) => handleDimensionChoice(e)}
          >
            <option value="cm">cm</option>
            <option value="inches">inches</option>
          </select>
          <table>
            <tr>
              <td>
                <label>Width</label>
              </td>
              <td>
                <input
                  ref={imageWidth}
                  value={formInputs.width}
                  type="number"
                  onChange={(e) =>
                    setFormInputs({ ...formInputs, width: e.target.value })
                  }
                />
              </td>
              <td>
                <span>{formInputs.unit}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label>Length</label>
              </td>
              <td>
                <input
                  ref={imageLength}
                  value={formInputs.length}
                  type="number"
                  onChange={(e) =>
                    setFormInputs({ ...formInputs, length: e.target.value })
                  }
                />
              </td>
              <td>
                <span>{formInputs.unit}</span>
              </td>
            </tr>
          </table>
        </div>
        <div className="flex-col">
          <h4>Quantity</h4>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="flex-col">
          <h4>Price</h4>
          <table>
            <tr>
              <td><strong>Sub-Total</strong></td>
              <td>
                { !errorMessage
                  ? `£${total.subTotal.toFixed(1)}0`
                  : '£0.00'}
              </td>
            </tr>
            <tr>
              <td><strong>VAT</strong></td>
              <td>
                { !errorMessage
                  ? `£${total.vat.toFixed(1)}0`
                  : '£0.00'}
              </td>
            </tr>
            <tr>
              <td><strong>Grand Total</strong></td>
              <td>
                { !errorMessage
                  ? `£${total.grandTotal.toFixed(1)}0`
                  : '£0.00'}
              </td>
            </tr>
          </table>

          {/* error messages */}
          { errorMessage !== null
                          ? <p className="error">{ errorMessage }</p> 
                          : null }
          
          <a onClick={makeCalculation}>Calculate</a>

          { errorMessage !== null
                          ? null
                          : <a onClick={addToMyCart}>Add to Cart</a> }
          
        </div>
      </form>
      <Cart myCart={myCart}/>
    </React.Fragment>
  );
}
