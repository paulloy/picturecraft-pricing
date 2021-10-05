import './index.css';
import React, { useEffect, useState } from 'react';

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
        return new Paper(data.name, data.length, data.width, data.cost);
      }))
    )
  }, []); 

  // do this because typescript
  if (paper === paperData) return <p>Loading Data</p>;

  return (
    <React.Fragment>
      <PaperForm />
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
          </tr>
        </thead>
        <tbody>
        { paper.map((obj) => (
          <tr>
            <td>{ obj.name }</td>
            <td>{ parseFloat(obj.length_cm).toFixed(2) } cm</td>
            <td>{ parseFloat(obj.width_cm).toFixed(2) } cm</td>
            <td>£{ obj.cost }</td>
            <td>{ parseFloat(obj.costPerUnitArea_cm).toFixed(2) } £/cm</td>
            <td>{ parseFloat(obj.length_inch).toFixed(2) } inch</td>
            <td>{ parseFloat(obj.width_inch).toFixed(2) } inch</td>
            <td>{ parseFloat(obj.costPerUnitArea_inch).toFixed(2) } £/inch</td>
          </tr>
        )) }
        </tbody>
      </table> 
    </React.Fragment>
  );
}

export default App;
