import "./index.css";
import React, { useEffect, useState } from "react";

import { Paper } from "./models/paper.model";
import axios from "axios";

import PaperForm from "./components/PaperForm";
import PricingForm from "./components/PricingForm";
import PricingCopy from "./components/PricingCopy";
import PriceCalculationUi from "./components/priceCalculationUi/priceCalculationUi";

// function AppOG() {
//   const [paper, setPaper] = useState({
//     isLoaded: false,
//     data: [],
//   });

//   const [inkCost, setInkCost] = useState(0);

//   useEffect(() => {
//     axios.get("http://localhost:4000/api/paper").then((res) =>
//       setPaper({
//         isLoaded: true,
//         data: res.data.map((data) => {
//           return new Paper(
//             data._id,
//             data.name,
//             data.length,
//             data.width,
//             data.cost
//           );
//         }),
//       })
//     );
    
//     axios.get("http://localhost:4000/api/ink").then((res) =>
//       setInkCost(res.data)
//     );  
//   }, []);
  
//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:4000/api/paper/delete/${id}`)
//       .then((res) => console.log(res));
//   };
  
//   // while state is loading
//   if (!paper.isLoaded) return <p className="loading-data">Loading Data <i className="fas fa-spinner fa-pulse"></i></p>;
  
//   return (
//     <React.Fragment>
//       <PricingCopy />
//       <PricingForm paper={paper.data} inkCost={inkCost} />
//       <PaperForm />
//       <table className="table">
//         <thead>
//           <tr>
//             <td>
//               <strong>Paper Name</strong>
//             </td>
//             <td>
//               <strong>Paper Cost (£)</strong>
//             </td>
//             <td>
//               <strong>Length (cm)</strong>
//             </td>
//             <td>
//               <strong>Width (cm)</strong>
//             </td>
//             <td>
//               <strong>Length (inches)</strong>
//             </td>
//             <td>
//               <strong>Width (inches)</strong>
//             </td>
//             <td>
//               <strong>DELETE</strong>
//             </td>
//           </tr>
//         </thead>
//         <tbody>
//           {paper.data.map((obj) => (
//             <tr key={obj.id}>
//               <td>{obj.name}</td>
//               <td>£{obj.cost}</td>
//               <td>{parseFloat(obj.length_cm).toFixed(2)} cm</td>
//               <td>{parseFloat(obj.width_cm).toFixed(2)} cm</td>
//               <td>{parseFloat(obj.length_inch).toFixed(2)} inch</td>
//               <td>{parseFloat(obj.width_inch).toFixed(2)} inch</td>
//               <td>
//                 <button type="button" onClick={() => handleDelete(obj.id)}>
//                   DELETE
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </React.Fragment>
//   );
// }

function App() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h1>Picturecraft Printing</h1>
        <ul className="d-flex">
          <li className="mx-5 btn">Printing</li>
          <li className="mx-5 btn">Canvas</li>
          <li className="mx-5 btn">Cart</li>
        </ul>
      </div>
      <PriceCalculationUi />
      <img id="bg-img" src="https://media.istockphoto.com/photos/flowers-on-the-shore-of-lake-geneva-picture-id1280003274?b=1&k=20&m=1280003274&s=170667a&w=0&h=bFSswo40EQIa6Ohj7iyXSXbo4Fh2Ud3fxGnFfzUsLqU=" alt="" />
    </>
  );
}

export default App;
