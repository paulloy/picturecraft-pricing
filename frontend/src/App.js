import "./index.css";
import React, { useEffect, useRef, useState } from "react";

import paperData from "./models/test_data/test_paper_data.json";
import { Paper } from "./models/paper.model";
import axios from "axios";

import PaperForm from "./components/PaperForm";
import PricingForm from "./components/PricingForm";

import { getPaper } from "./requests/paperRequests";

function App() {
  const [paper, setPaper] = useState({
    isLoaded: false,
    data: [],
  });

  const [inkCost, setInkCost] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:4000/api/paper").then((res) =>
      setPaper({
        isLoaded: true,
        data: res.data.map((data) => {
          return new Paper(
            data._id,
            data.name,
            data.length,
            data.width,
            data.cost
          );
        }),
      })
    );
    
    axios.get("http://localhost:4000/api/ink").then((res) =>
      setInkCost(res.data)
    );  
  }, []);
  
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/paper/delete/${id}`)
      .then((res) => console.log(res));
  };
  
  // do this because typescript
  if (!paper) return <p>Loading Data</p>;
  
  return (
    <React.Fragment>
      <PricingForm paper={paper.data} inkCost={inkCost} />
      <PaperForm />
      <table className="table">
        <thead>
          <tr>
            <td>
              <strong>Paper Name</strong>
            </td>
            <td>
              <strong>Paper Cost (£)</strong>
            </td>
            <td>
              <strong>Length (cm)</strong>
            </td>
            <td>
              <strong>Width (cm)</strong>
            </td>
            <td>
              <strong>Length (inches)</strong>
            </td>
            <td>
              <strong>Width (inches)</strong>
            </td>
            <td>
              <strong>DELETE</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {paper.data.map((obj) => (
            <tr key={obj.id}>
              <td>{obj.name}</td>
              <td>£{obj.cost}</td>
              <td>{parseFloat(obj.length_cm).toFixed(2)} cm</td>
              <td>{parseFloat(obj.width_cm).toFixed(2)} cm</td>
              <td>{parseFloat(obj.length_inch).toFixed(2)} inch</td>
              <td>{parseFloat(obj.width_inch).toFixed(2)} inch</td>
              <td>
                <button type="button" onClick={() => handleDelete(obj.id)}>
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </React.Fragment>
  );
}

export default App;
