import react, { useRef, useState } from 'react';

function PricingForm({ paper }) {

    // User can input dimensions in units of cm or inches.
    const [formInputs, setFormInputs] = useState({
        unit: 'cm',
        width: 0,
        length: 0
    });
      
    let formWidth = useRef();
    let formLength = useRef();
    let paperDimension = useRef();
    
    // this is called when a user selects a new unit. Inputted values are converted
    const handleDimensionChoice = e => {
      let unitValue = e.target.value;
      let width = formWidth.current.value;
      let length = formLength.current.value;
      if (unitValue === 'cm') {
        setFormInputs({
          unit: 'cm',
          width: width * 2.54,
          length: length * 2.54
        });
      } else if (unitValue === 'inches') {
        setFormInputs({
          unit: 'inches',
          width: width * 0.393701,
          length: length * 0.393701
        });
      } else {
        console.error('error has occurred with "handleDimensionChoice" function');
      }
    }

    return (
        <form className="paper-form">
            note: include ink for prices
            <h4>Paper</h4>
            <div className="bb">
              <select name="paper" id="paper">
                { paper.map( item => (
                  <option ref={ paperDimension } value={ item.costPerUnitArea_cm }>{ item.name }</option>
                )) }
              </select>
              <input type="text" value="hide this. Cost of paper per cm or inch"/>
              <a href="#">Open Settings</a>          
            </div>
    
            <h4>Dimensions</h4>
            {/* Unit Selector */}
            <div>
              <select name="dimensions" id="dimensions" onChange={ e => handleDimensionChoice(e) }>
                <option value="cm">cm</option>
                <option value="inches">inches</option>
              </select>
            </div>
            {/* Width */}
            <div>
              <label>Width</label>
              <input ref={ formWidth } value={ formInputs.width } onChange={ e => setFormInputs({ ...formInputs, width: e.target.value }) } type="number" />
              <span>{ formInputs.unit }</span>
            </div>
            {/* Length */}
            <div className="bb">
              <label>Length</label>
              <input ref={ formLength } value={ formInputs.length } onChange={ e => setFormInputs({ ...formInputs, length: e.target.value })} type="number" />
              <span>{ formInputs.unit }</span>
            </div>
    
            <h4>Quantity</h4>
            <div className="bb">
              <input type="number" />
            </div>
    
            <h4>Price</h4>
            <div>
              <p>Price £0.00. Round to 1 decimal place</p>
              <button>Add to Cart</button>
            </div>
          </form>
    );
}

export default PricingForm;