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
        imgVat: '0.00',
        imgTotal: '0.00'
    });

    const getPapers = () => {
        axios.get("http://localhost:4000/api/paper")
            .then((res) => {
                setPapers(res.data.map(obj => new Paper(obj._id, obj.name, obj.width, obj.length, obj.cost, obj.description)))
            })
            .catch(error => console.log(error));
    }
    useEffect(() => getPapers(), []);

    const [selectedPaper, setSelectedPaper] = useState(null);

    const [myCart, setMyCart] = useState([]);
    const [grandTotals, setGrandTotals] = useState({
        subTotal: '0.00',
        vat: '0.00',
        grandTotal: '0.00'
    });

    // When a new order is added to the cart, update the grandTotals
    useEffect(() => {
        // initialise as 0 each time.
        let subTotal = 0;
        let vat = 0;
        let grandTotal = 0;
       
        // loop through cart for order details
        myCart.forEach(cartItem => {
            subTotal = Number(subTotal) + Number(cartItem.imgSubTotal);
            vat = Number(vat) + Number(cartItem.imgVat);
            grandTotal = Number(grandTotal) + Number(cartItem.imgTotal);
        });

        setGrandTotals({
            subTotal: subTotal.toFixed(2),
            vat: vat.toFixed(2),
            grandTotal: grandTotal.toFixed(2)
        });

    }, [myCart]);

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
            imgSubTotal: subTotal.toFixed(2),
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
                    <OrderDetails orderDetails={orderDetails} addCartItem={(newCartItem) => setMyCart([...myCart, newCartItem])}/>
                </span>
            </div>
            <Cart 
                myCart={myCart} 
                grandTotals={grandTotals} 
                removeCartItem={(e) => {
                    const arr = myCart.filter(cartItem => cartItem !== e);
                    setMyCart(arr);
                }}/>
        </div>
    );
}