import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import './price-calculation-ui.css';
import ImageDimensions from './imageDimensions';
import Paper from './../../models/paper.model';
import PaperSelector from './paperSelector';

export const DimensionsContext = createContext();

export default function PriceCalculationUi() {

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

                    <PaperSelector 
                        papers={papers} 
                        selectedPaper={selectedPaper} 
                        getSelectedPaper={(e) => setSelectedPaper(papers.filter(paper => paper.name === e.target.value)[0])}/>

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
            </div>
        </div>
    );
}