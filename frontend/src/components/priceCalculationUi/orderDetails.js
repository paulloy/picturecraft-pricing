export default function OrderDetails({ dimensions, costs }) {
    return (
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
    );
}