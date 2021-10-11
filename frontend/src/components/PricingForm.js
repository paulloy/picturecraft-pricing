import react, { useRef, useState } from "react";
import "../stylesheets/pricing-form.css";

export default function PricingForm({ paper }) {
  // User can input dimensions in units of cm or inches.
  const [formInputs, setFormInputs] = useState({
    unit: "cm",
    width: 0,
    length: 0,
  });

  const [calculator, setCalculator] = useState({
    imageArea: 0,
    inkPerUnitArea_cm: 1,
    inkPerUnitArea_inches: 1,
  });

  const [selectedPaper, setSelectedPaper] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [total, setTotal] = useState({
    subTotal: 0,
    vat: 0,
    grandTotal: 0
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
      let { width, length } = formInputs;
      let area = width * length;
      let subTotal = costPerUnitArea_cm.current.value * area;
      let total = quantity * subTotal;
      setTotal({
        subTotal: total,
        vat: total * 0.2,
        grandTotal: total + (total * 0.2)
      });
    } else if (unit === "inches") {
      let { width, length } = formInputs;
      let area = width * length;
      let subTotal = costPerUnitArea_inch.current.value * area;
      let total = quantity * subTotal;
      setTotal({
        subTotal: total,
        vat: total * 0.2,
        grandTotal: total + (total * 0.2)
      });
    }
  };

  return (
    <form className="paper-form">
      {/* note: include ink for prices */}
      <h4>Paper</h4>
      {/* div:nth-of-type(1) */}
      <div className="bb">
        <select
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
          ref={ costPerUnitArea_cm }
          value={selectedPaper ? selectedPaper.costPerUnitArea_cm : ""}
        />
        <input
          type="hidden"
          ref={ costPerUnitArea_inch }
          value={selectedPaper ? selectedPaper.costPerUnitArea_inch : ""}
        />
        <a href="#">Open Settings</a>
      </div>
      <h4>Dimensions</h4>
      {/* Unit Selector */}
      {/* div:nth-of-type(2) */}
      <div>
        <select
          name="dimensions"
          id="dimensions"
          onChange={(e) => handleDimensionChoice(e)}
        >
          <option value="cm">cm</option>
          <option value="inches">inches</option>
        </select>
      </div>
      {/* Width */}
      {/* div:nth-of-type(3) */}
      <div className="flex-row">
        <label>Width</label>

        <input
          ref={formWidth}
          value={formInputs.width}
          type="number"
          onChange={(e) =>
            setFormInputs({ ...formInputs, width: e.target.value })
          }
        />

        <span>{formInputs.unit}</span>
      </div>
      {/* Length */}
      {/* div:nth-of-type(4) */}
      <div className="bb flex-row">
        <label>Length</label>

        <input
          ref={formLength}
          value={formInputs.length}
          type="number"
          onChange={(e) =>
            setFormInputs({ ...formInputs, length: e.target.value })
          }
        />

        <span>{formInputs.unit}</span>
      </div>
      <h4>Quantity</h4>
      {/* div:nth-of-type(5) */}
      <div className="bb">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <h4>Price</h4>
      {/* div:nth-of-type(6) */}
      <div>
        <p>Sub-Total £{total.subTotal.toFixed(1)}0</p>
        <p>VAT £{total.vat.toFixed(1)}0</p>
        <p>Grand Total £{total.grandTotal.toFixed(1)}0</p>
        <p>include vat. and make order form</p>
        {/* improve rounding  */}
        <a onClick={makeCalculation}>calculate</a>
        <button>Add to Cart</button>
      </div>
    </form>
  );
}
