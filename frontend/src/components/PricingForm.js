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

  let formWidth = useRef();
  let formLength = useRef();
  let costPerUnitArea_cm = useRef();
  let costPerUnitArea_inch = useRef();

  // this is called when a user selects a new unit. Inputted values are converted
  const handleDimensionChoice = (e) => {
    let unitValue = e.target.value;
    let width = formWidth.current.value;
    let length = formLength.current.value;
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
      let inkCostPerUnit_ml = inkCost.cost / inkCost.volume;
      // figure out this value
      let inkUsedPerUnitArea_cm = 0.155;
      let { width, length } = formInputs;
      let area = width * length;
      let inkUsed = inkUsedPerUnitArea_cm * area;
      let usedInkCost = inkUsed * inkCostPerUnit_ml;
      let subTotal = (costPerUnitArea_cm.current.value * area) + usedInkCost;
      let total = quantity * subTotal;
      setTotal({
        subTotal: total,
        vat: total * 0.2,
        grandTotal: total + total * 0.2,
      });
    } else if (unit === "inches") {
      let inkCostPerUnit_ml = inkCost.cost / inkCost.volume;
      // figure out this value
      let inkUsedPerUnitArea_inches = 1;
      let { width, length } = formInputs;
      let area = width * length;
      let inkUsed = inkUsedPerUnitArea_inches * area;
      let usedInkCost = inkUsed * inkCostPerUnit_ml;
      let subTotal = (costPerUnitArea_inch.current.value * area) + usedInkCost;
      let total = quantity * subTotal;
      setTotal({
        subTotal: total,
        vat: total * 0.2,
        grandTotal: total + total * 0.2,
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
        <input
          type="hidden"
          ref={costPerUnitArea_cm}
          value={selectedPaper ? selectedPaper.costPerUnitArea_cm : ""}
        />
        <input
          type="hidden"
          ref={costPerUnitArea_inch}
          value={selectedPaper ? selectedPaper.costPerUnitArea_inch : ""}
        />
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
                ref={formWidth}
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
                ref={formLength}
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
