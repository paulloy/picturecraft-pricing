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
    const [consts, setConsts] = useState(null);

    const [orderDetails, setOrderDetails] = useState({
        imgWidth: 0,
        imgLength: 0,
        imgUnit: dimensions.unit,
        imgQty: 1,
        imgType: 'Please select paper',
        imgVat: '0.00',
        imgTotal: '0.00'
    });

    const getInitData = () => {
        axios.all([
                axios.get("/api/paper"),
                axios.get("/api/ink")
            ])
            .then(axios.spread((res1, res2) => {
                setPapers(res1.data.map(obj => new Paper(obj._id, obj.name, obj.width, obj.length, obj.cost, obj.description)));
                setConsts(res2.data);
            }))
            .catch(error => console.log(error));
    }
    useEffect(() => getInitData(), []);

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

        let { width, length, qty } = dimensions;
        // temporary values
        let inkCostPerUnitArea = consts.inkCostPerUnitSquareInch;
        // convert cm to inches
        if (dimensions.unit !== 'inches') {
            width = width * 0.393701;
            length = length * 0.393701;
        }
        const paperCostPerUnitArea = selectedPaper.paperCostPerUnitArea;
        const pp = consts.profitPercentage * 0.01;
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