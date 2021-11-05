export default function OrderDetails({ orderDetails, addCartItem = f => f }) {
    let {
        imgWidth,
        imgLength,
        imgUnit,
        imgQty,
        imgType,
        imgVat,
        imgTotal
    } = orderDetails;

    return (
        <div className="col-3-custom p-4 glass-morphism">
            <span className="d-flex justify-content-between align-items-center border-b-double mb-3 p-0">
                <h4 className="align-left m-0">Order Details</h4>
            </span>
            <div className="row">
                <div className="col-6 text-right"><strong>Width</strong></div>
                <div className="col-6">{imgUnit === 'inches' ? imgWidth : imgWidth = (imgWidth * 2.54).toFixed(2)} {imgUnit}</div>
            </div>
            <div className="row">
                <div className="col-6 text-right"><strong>Length</strong></div>
                <div className="col-6">{imgUnit === 'inches' ? imgLength : imgLength = (imgLength * 2.54).toFixed(2)} {imgUnit}</div>
            </div>
            <div className="row">
                <div className="col-6 text-right"><strong>Paper Type</strong></div>
                <div className="col-6">{imgType}</div>
            </div>
            <div className="row">
                <div className="col-6 text-right"><strong>Quantity</strong></div>
                <div className="col-6">{imgQty}</div>
            </div>
            <hr />
            <div className="row">
                <div className="col-6 text-right"><strong>VAT</strong></div>
                <div className="col-6">£{imgVat}</div>
            </div>
            <div className="row">
                <div className="col-6 text-right"><strong>Total</strong></div>
                <div className="col-6">£{imgTotal}</div>
            </div>
            <hr />
            <div className="row mt-5">
                <button onClick={() => addCartItem(orderDetails)} className="btn btn-primary">Add to Cart</button>
            </div>
        </div>
    );
}