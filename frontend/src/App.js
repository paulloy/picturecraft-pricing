import './index.css';
import React, { useEffect, useRef, useState } from 'react';

import paperData from './models/test_data/test_paper_data.json';
import { Paper } from './models/paper.model';
import axios from 'axios';

import PaperForm from './components/PaperForm';

function App() {    

  const [paper, setPaper] = useState(paperData);

  useEffect(() => {
    axios.get('http://localhost:4000/api/paper')
    .then(res => 
      setPaper(res.data.map((data) => {
        return new Paper(data._id, data.name, data.length, data.width, data.cost);
      }))
    )
  }, []); 
  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/api/paper/delete/${id}`)
    .then(res => 
      console.log(res)
      );
    }

    const [formInputs, setFormInputs] = useState({
      unit: 'cm',
      width: 0,
      length: 0
    });
    
    let formWidth = useRef();
    let formLength = useRef();
    let paperDimension = useRef();
  
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
    
  // do this because typescript
  if (paper === paperData) return <p>Loading Data</p>;

  return (
    <React.Fragment>
      {/* <PaperForm />
      <table>
        <thead>
          <tr>
            <td><strong>Paper Name</strong></td>
            <td><strong>Length (cm)</strong></td>
            <td><strong>Width (cm)</strong></td>
            <td><strong>Paper Cost (£)</strong></td>
            <td><strong>Paper Cost per cm</strong></td>
            <td><strong>Length (inches)</strong></td>
            <td><strong>Width (inches)</strong></td>
            <td><strong>Paper Cost per Inch</strong></td>
            <td><strong>DELETE</strong></td>
          </tr>
        </thead>
        <tbody>
        { paper.map((obj) => (
          <tr key={ obj.id }>
            <td>{ obj.name }</td>
            <td>{ parseFloat(obj.length_cm).toFixed(2) } cm</td>
            <td>{ parseFloat(obj.width_cm).toFixed(2) } cm</td>
            <td>£{ obj.cost }</td>
            <td>{ parseFloat(obj.costPerUnitArea_cm).toFixed(2) } £/cm</td>
            <td>{ parseFloat(obj.length_inch).toFixed(2) } inch</td>
            <td>{ parseFloat(obj.width_inch).toFixed(2) } inch</td>
            <td>{ parseFloat(obj.costPerUnitArea_inch).toFixed(2) } £/inch</td>
            <td><button type="button" onClick={() => handleDelete(obj.id)}>DELETE</button></td>
          </tr>
        )) }
        </tbody>
      </table> 
           */}
      <form className="paper-form">
        note: include ink for prices
        <h4>Paper</h4>
        <div className="bb">
          <select name="paper" id="paper"
          >
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
    </React.Fragment>
  );
}

export default App;
