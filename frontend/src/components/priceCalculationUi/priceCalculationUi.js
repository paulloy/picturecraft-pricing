import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import './price-calculation-ui.css';
import ImageDimensions from './imageDimensions';

// Paper model
class Paper {
    // Axios request data
    id;
    name;
    width;
    length;
    rollCost;
    description;
    // 
    area;
    paperCostPerUnitArea;

    constructor(id=id, name=name, width=width, length=length, rollCost=rollCost, description=description) {
        this.id = id;
        this.name = name;
        this.width = width;
        this.length = length;
        this.rollCost = rollCost;
        this.description = description;
        this.area = width * length;
        this.paperCostPerUnitArea = rollCost / (width * length);
    }
}

export const DimensionsContext = createContext();

export default function PriceCalculationUi() {

    // STATE
    const [dimensions, setDimensions] = useState({
        unit: 'inches',
        width: 0,
        length: 0,
        qty: 1
    });

    const [costs, setCosts] = useState({
        total: 0,
        vat: 0
    });

    const [papers, setPapers] = useState([]);

    axios.get("http://localhost:4000/api/paper")
        .then((res) => {
            setPapers(res.data.map(obj => new Paper(obj._id, obj.name, obj.width, obj.length, obj.cost, obj.description)))
        })
        .catch(error => console.log(error));

    const [selectedPaper, setSelectedPaper] = useState(null);

    const calculateTotal = () => {
        if (!selectedPaper) return;

        const { width, length, qty } = dimensions;
        // temporary values
        const inkCostPerUnitArea = 0.002902;
        const paperCostPerUnitArea = selectedPaper.paperCostPerUnitArea;
        const pp = 2.6;
        // 
        const subTotal = ((((width * length) * paperCostPerUnitArea) + ((width * length) * inkCostPerUnitArea)) * pp) * qty;
        const vat = subTotal * 0.2;
        setCosts({
            total: (vat + subTotal).toFixed(2),
            vat: vat.toFixed(2)
        });
    }

    const getSelectedPaper = (event) => {
        setSelectedPaper(papers.filter(paper => {
            return paper.name === event.target.value
        })[0]);
    }

    useEffect(() => {
        calculateTotal();
    }, [dimensions, selectedPaper]);

    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center flex-column">
                <span className="col-12 d-flex">
                    
                    <DimensionsContext.Provider value={{dimensions, setDimensions}}>
                        <ImageDimensions/>
                    </DimensionsContext.Provider>

                    <div className="col-3-custom p-4 glass-morphism">
                        <span className="d-flex justify-content-between align-items-center border-b-double mb-3">
                            <h4 className="align-left m-0">Step 2 - Your Paper</h4>
                            <button className="settings"><i class="fas fa-cog"></i></button>
                        </span>
                        <select 
                            className="form-select form-select-lg mb-3" 
                            name="paper-selector" 
                            id="paper-selector" 
                            onChange={(e) => getSelectedPaper(e)}>
                                <option className="d-none" value="not a value">Please select paper</option>
                                {papers.map(paper => (
                                    <option value={paper.name}>{paper.name}</option>
                                ))}
                        </select>
                        <img className="img" src="https://www.blueskyprinting.co.uk/app/uploads/2021/02/giclee-fine-art-print-japan.jpg" alt="temp foto" />
                        <p className="p-2 sans-serif-custom">{selectedPaper ? selectedPaper.description : null}</p>
                    </div>
                    <div className="col-3-custom p-4 glass-morphism">
                        <span className="d-flex justify-content-between align-items-center border-b-double mb-3 p-0">
                            <h4 className="align-left m-0">Order Details</h4>
                        </span>
                        <div className="row">
                            <div className="col-6 text-right"><strong>Width</strong></div>
                            <div className="col-6">{dimensions.width} {dimensions.unit}</div>
                        </div>
                        <div className="row">
                            <div className="col-6 text-right"><strong>Length</strong></div>
                            <div className="col-6">{dimensions.length} {dimensions.unit}</div>
                        </div>
                        <div className="row">
                            <div className="col-6 text-right"><strong>Paper Type</strong></div>
                            <div className="col-6">Photo Lustre</div>
                        </div>
                        <div className="row">
                            <div className="col-6 text-right"><strong>Quantity</strong></div>
                            <div className="col-6">{dimensions.qty}</div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-6 text-right"><strong>VAT</strong></div>
                            <div className="col-6">£{costs.vat}</div>
                        </div>
                        <div className="row">
                            <div className="col-6 text-right"><strong>Total</strong></div>
                            <div className="col-6">£{costs.total}</div>
                        </div>
                        <hr />
                        <div className="row mt-5">
                            <button className="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                </span>
                {/* Cart */}
                {/* <div className="col-12 d-flex flex-column p-4 glass-morphism">
                    <h4 className="align-left">Order Summary</h4>
                    A carousel containing uploaded imgs, or imgs from cart?
                    <div className="row">
                        <div className="col-6"><strong>Paper Type</strong></div>
                        <div className="col-6">Photo Lustre</div>
                    </div>
                    <div className="row">
                        <div className="col-6"><strong>Width</strong></div>
                        <div className="col-6">8 inches</div>
                    </div>
                    <div className="row">
                        <div className="col-6"><strong>Length</strong></div>
                        <div className="col-6">10 inches</div>
                    </div>
                    <div className="row">
                        <div className="col-6"><strong>Quantity</strong></div>
                        <div className="col-6">1</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-6"><strong>Sub-total</strong></div>
                        <div className="col-6">£</div>
                    </div>
                    <div className="row">
                        <div className="col-6"><strong>VAT</strong></div>
                        <div className="col-6">£0.00</div>
                    </div>
                    <div className="row">
                        <div className="col-6"><strong>Grand Total</strong></div>
                        <div className="col-6">£0.00</div>
                    </div>
                    <hr />
                    <button className="btn btn-primary">Add to Cart</button>
                </div> */}
            </div>
        </div>
    );
}