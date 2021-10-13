import react, { useRef, useState } from "react";
import "../stylesheets/pricing-form.css";

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

  let imageWidth = useRef();
  let imageLength = useRef();

  // this is called when a user selects a new unit. Inputted values are converted
  const handleDimensionChoice = (e) => {
    let unitValue = e.target.value;
    let width = imageWidth.current.value;
    let length = imageLength.current.value;
    if (unitValue === "cm") {
      // cm --> inches
      let coefficient = 2.54;
      setFormInputs({
        unit: "cm",
        width: width * coefficient,
        length: length * coefficient,
      });
    } else if (unitValue === "inches") {
      // inches --> cm
      let coefficient = 0.393701;
      setFormInputs({
        unit: "inches",
        width: width * coefficient,
        length: length * coefficient,
      });
    } else {
      console.error('error has occurred with "handleDimensionChoice" function');
    }
  };

  const makeCalculation = () => {
    let unit = formInputs.unit;
    if (unit === "cm") {
      // alpha = area (cm^2) covered by 1ml of ink
      let alpha = 181.2069;
      let { width, length } = formInputs;
      let paperCost = selectedPaper.cost;
      let paperWidth = selectedPaper.width_cm;
      let paperLength = selectedPaper.length_cm;
      let inkPrice = inkCost.cost;
      let inkVolume = inkCost.volume;

      let subTotal = quantity * ((width * length) * ((paperCost / (paperWidth * paperLength)) + (inkPrice / (inkVolume * alpha))));
      let vat = subTotal * 0.2;
      let total = subTotal * 1.2;
      setTotal({
        subTotal: subTotal,
        vat: vat,
        grandTotal: total
      });
    } else if (unit === "inches") {
      // alpha = area (cm^2) covered by 1ml of ink
      let alpha = 28.087125674;
      let { width, length } = formInputs;
      let paperCost = selectedPaper.cost;
      let paperWidth = selectedPaper.width_inch;
      let paperLength = selectedPaper.length_inch;
      let inkPrice = inkCost.cost;
      let inkVolume = inkCost.volume;

      let subTotal = quantity * ((width * length) * ((paperCost / (paperWidth * paperLength)) + (inkPrice / (inkVolume * alpha))));
      let vat = subTotal * 0.2;
      let total = subTotal * 1.2;
      setTotal({
        subTotal: subTotal,
        vat: vat,
        grandTotal: total
      });
    }
  };

  return (
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
        <p>Sub-Total £{total.subTotal.toFixed(1)}0</p>
        <p>VAT £{total.vat.toFixed(1)}0</p>
        <p>Grand Total £{total.grandTotal.toFixed(1)}0</p>
        {/* improve rounding  */}
        <a onClick={makeCalculation}>calculate</a>
        <button>Add to Cart</button>
      </div>
    </form>
  );
}
