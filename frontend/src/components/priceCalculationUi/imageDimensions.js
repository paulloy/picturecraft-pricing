import { useContext } from "react";
import { DimensionsContext } from "./priceCalculationUi";

export default function ImageDimensions() {
    const {dimensions, setDimensions} = useContext(DimensionsContext);

    return (
        <div className="p-4 col-3-custom glass-morphism">
            {/* Heading and settings button */}
            <span className="d-flex justify-content-between align-items-center border-b-double mb-3">
                <h4 className="align-left m-0">Step 1 - Image Dimensions</h4>
            </span>
            {/* dimension selector */}
            <span className="d-flex img-dimension">
                <select 
                    className="form-select form-select-lg mb-3" 
                    name="dimension-selector" 
                    id="dimension-selector" 
                    onChange={(e) => setDimensions({unit: e.target.value, width: 0, length: 0, qty: 1})}>
                        <option value="inches">inches</option>
                        <option value="cm">cm</option>
                </select>
            </span>
            <hr className="m-0 mb-4 mt-2"/>
            {/* width input */}
            <span className="d-flex img-dimension">
                <label className="mx-3 col-4" htmlFor="">Width</label>
                <input 
                    className="col-4 input-styling" 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    max="10000" 
                    value={dimensions.width} 
                    onChange={(e) => setDimensions({...dimensions, width: e.target.value})}/>
                <span className="mx-3 col-4">{dimensions.unit}</span>
            </span>
            {/* length input */}
            <span className="d-flex p-2 img-dimension">
                <label className="mx-3 col-4" htmlFor="">Length</label>
                <input 
                    className="input-styling col-4" 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    max="10000" 
                    value={dimensions.length} 
                    onChange={(e) => setDimensions({...dimensions, length: e.target.value})}/>
                <span className="mx-3 col-4">{dimensions.unit}</span>
            </span>
            <hr />
            {/* quantity input */}
            <span className="d-flex p-2 align-items-center justify-content-center qty">
                <label htmlFor="">Quantity</label>
                <button
                    className="btn btn-secondary" 
                    onClick={() => setDimensions({...dimensions, qty: dimensions.qty - 1})}>
                     <i class="fas fa-chevron-left"></i>
                </button>
                <input 
                    className="text-right" 
                    type="number" 
                    step="1"
                    min="1" 
                    max="1000" 
                    value={dimensions.qty} 
                    onChange={(e) => setDimensions({...dimensions, qty: Number(e.target.value)})}/>
                <button 
                    className="btn btn-secondary" 
                    onClick={() => setDimensions({...dimensions, qty: dimensions.qty + 1})}>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </span>
        </div>
    );
}