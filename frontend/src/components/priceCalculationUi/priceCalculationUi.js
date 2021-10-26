import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import './price-calculation-ui.css';
import ImageDimensions from './imageDimensions';
import Paper from './../../models/paper.model';
import PaperSelector from './paperSelector';
import OrderDetails from './orderDetails';
import Cart from './Cart';

export const DimensionsContext = createContext();

export default function PriceCalculationUi() {

    const [dimensions, setDimensions] = useState({
        unit: 'inches',
        width: 0,
        length: 0,
        qty: 1
    });

    const [papers, setPapers] = useState([]);

    const [orderDetails, setOrderDetails] = useState({
        imgWidth: 0,
        imgLength: 0,
        imgUnit: dimensions.unit,
        imgQty: 1,
        imgType: 'Please select paper',
        imgVat: 0.00,
        imgTotal: 0.00
    });

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
        setOrderDetails({
            imgWidth: width,
            imgLength: length,
            imgUnit: dimensions.unit,
            imgQty: qty,
            imgType: selectedPaper.name,
            imgVat: vat.toFixed(2),
            imgTotal: (vat + subTotal).toFixed(2)
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
                    <OrderDetails orderDetails={orderDetails} />
                </span>
            </div>
            <Cart />
        </div>
    );
}