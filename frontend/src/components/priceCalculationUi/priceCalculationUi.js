import './price-calculation-ui.css';

// class Paper {
//     constructor(name=name, width=width, length=length, ) {
//     }
// }

export default function PriceCalculationUi() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-4 border p-2 glass-morphism">
                    <select className="form-select form-select-lg mb-3" name="paper-selector" id="paper-selector">
                        <option value="photo lustre">Photo Lustre</option>
                    </select>
                    <img className="img" src="https://www.blueskyprinting.co.uk/app/uploads/2021/02/giclee-fine-art-print-japan.jpg" alt="temp foto" />
                    <p>Description of our image. Lorem Ipsum, hola da boi says hello sir.</p>
                </div>
                <div className="col-4 border p-2 glass-morphism">
                    <span className="d-flex">
                        <label className="mx-3" htmlFor="">Width</label>
                        <input type="number" />
                        <span className="mx-3">inches</span>
                    </span>
                    <span className="d-flex p-2">
                        <label className="mx-3" htmlFor="">Length</label>
                        <input type="number" />
                        <span className="mx-3">inches</span>
                    </span>
                    <span className="d-flex p-2 mt-5">
                        <label className="mx-3" htmlFor="">Quantity</label>
                        <input type="numbert" />
                    </span>
                </div>
                <div className="col-4 border glass-morphism">
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
                        <div className="col-6">£0.00</div>
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
                </div>
            </div>
        </div>
    );
}