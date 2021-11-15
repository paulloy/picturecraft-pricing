import { createContext, useEffect, useState } from 'react';
import './price-calculation-ui.css';
import ImageDimensions from './imageDimensions';
import PaperSelector from './paperSelector';
import OrderDetails from './orderDetails';
import Cart from './Cart';
import { useSelector, useDispatch } from 'react-redux';

import { getPapers } from '../../actions/papers';

export const DimensionsContext = createContext();

export default function PriceCalculationUi() {
    // Connect to store
    const dispatch = useDispatch();
    const getPapersData = useSelector(state => state.papers.papers);

    // Initialise papers as an empty array
    const [papers, setPapers] = useState([]);

    useEffect(() => {
        dispatch(getPapers());
        setPapers(getPapersData);
    }, []);    

    const [dimensions, setDimensions] = useState({
        unit: 'inches',
        width: 0,
        length: 0,
        qty: 1
    });

    const [orderDetails, setOrderDetails] = useState({
        imgWidth: 0,
        imgLength: 0,
        imgUnit: dimensions.unit,
        imgQty: 1,
        imgType: 'Please select paper',
        imgVat: '0.00',
        imgTotal: '0.00'
    });

    const [selectedPaper, setSelectedPaper] = useState(null);

    const [myCart, setMyCart] = useState([]);
    const [grandTotals, setGrandTotals] = useState({
        subTotal: '0.00',
        vat: '0.00',
        grandTotal: '0.00',
        discount: '0.00'
    });

    // When a new order is added to the cart, update the grandTotals
    useEffect(() => {
        // initialise as 0 each time.
        let subTotal = 0;
        let vat = 0;
        let grandTotal = 0;
        let discount = 0;
       
        // loop through cart for order details
        myCart.forEach(cartItem => {
            subTotal = Number(subTotal) + Number(cartItem.imgSubTotal);
            vat = Number(vat) + Number(cartItem.imgVat);
            grandTotal = Number(grandTotal) + Number(cartItem.imgTotal);
            discount = Number(discount) + Number(cartItem.imgDiscount);
        });

        setGrandTotals({
            subTotal: subTotal.toFixed(2),
            vat: vat.toFixed(2),
            grandTotal: grandTotal.toFixed(2),
            discount: discount.toFixed(2)
        });

    }, [myCart]);

    const calculateTotal = () => {
        if (!selectedPaper) return;

        let { width, length, qty } = dimensions;
        let discount = 0;
        let discountPercentage = '';
        let paperCostPerUnitArea;
        // convert cm to inches
        if (dimensions.unit !== 'inches') {
            width = width * 0.393701;
            length = length * 0.393701;
            paperCostPerUnitArea = selectedPaper.cost / 2064.512;
        }
        paperCostPerUnitArea = selectedPaper.cost / 320;
        
        let subTotal = (((width * length) * paperCostPerUnitArea) * qty);

        if (qty >= 50) {
            discount = subTotal * 0.2;
            subTotal = subTotal - discount;
            discountPercentage = '20';
        } else if (qty >= 20) {
            discount = subTotal * 0.1;
            subTotal = subTotal - discount;
            discountPercentage = '10';
        } else if (qty >= 10) {
            discount = subTotal * 0.05;
            subTotal = subTotal - discount;
            discountPercentage = '5';
        }

        const vat = subTotal / 6;
        setOrderDetails({
            imgWidth: width,
            imgLength: length,
            imgUnit: dimensions.unit,
            imgQty: qty,
            imgType: selectedPaper.name,
            imgSubTotal: ((subTotal * 5) / 6).toFixed(2),
            imgVat: vat.toFixed(2),
            imgTotal: (subTotal).toFixed(2),
            imgDiscount: discount.toFixed(2),
            imgDiscountPercentage: discountPercentage
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