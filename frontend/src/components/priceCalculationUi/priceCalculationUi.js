import { useState } from 'react';
import './price-calculation-ui.css';

// class Paper {
//     constructor(name=name, width=width, length=length, ) {
//     }
// }

export default function PriceCalculationUi() {

    const [dimensionUnit, setDimensionUnit] = useState('inches');

    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center flex-column">
                <span className="col-12 d-flex">
                    <div className="p-4 col-3-custom glass-morphism">
                        <span className="d-flex justify-content-between align-items-center border-b-double mb-3">
                            <h4 className="align-left m-0">Step 1 - Image Dimensions</h4>
                            <button className="settings"><i class="fas fa-cog"></i></button>
                        </span>
                        <span className="d-flex img-dimension">
                            <select 
                                className="form-select form-select-lg mb-3" 
                                name="dimension-selector" 
                                id="dimension-selector" 
                                onChange={(e) => setDimensionUnit(e.target.value)}>
                                    <option value="inches">inches</option>
                                    <option value="cm">cm</option>
                            </select>
                        </span>
                        <hr className="m-0 mb-4 mt-2"/>
                        <span className="d-flex img-dimension">
                            <label className="mx-3 col-4" htmlFor="">Width</label>
                            <input className="col-6" type="number" />
                            <span className="mx-3 col-4">{dimensionUnit}</span>
                        </span>
                        <span className="d-flex p-2 img-dimension">
                            <label className="mx-3 col-4" htmlFor="">Length</label>
                            <input className="col-6" type="number" />
                            <span className="mx-3 col-4">{dimensionUnit}</span>
                        </span>
                        <hr />
                        <span className="d-flex p-2 justify-content-center qty">
                            <label className="mx-3" htmlFor="">Quantity</label>
                            <input type="number" />
                        </span>
                    </div>
                    <div className="col-3-custom p-4 glass-morphism">
                        <span className="d-flex justify-content-between align-items-center border-b-double mb-3">
                            <h4 className="align-left m-0">Step 2 - Your Paper</h4>
                            <button className="settings"><i class="fas fa-cog"></i></button>
                        </span>
                        <select className="form-select form-select-lg mb-3" name="paper-selector" id="paper-selector">
                            <option value="photo lustre">Photo Lustre</option>
                        </select>
                        <img className="img" src="https://www.blueskyprinting.co.uk/app/uploads/2021/02/giclee-fine-art-print-japan.jpg" alt="temp foto" />
                        <p className="p-2 sans-serif-custom">Wedding, portrait and fine art photographers traditionally use luster paper for their photos for first-class results.</p>
                    </div>
                    <div className="col-3-custom p-4 glass-morphism">
                        <h4 className="align-left">Order Summary</h4>
                        <div className="row">
                            <div className="col-6"><strong>Width</strong></div>
                            <div className="col-6">8 inches</div>
                        </div>
                        <div className="row">
                            <div className="col-6"><strong>Length</strong></div>
                            <div className="col-6">10 inches</div>
                        </div>
                        <div className="row">
                            <div className="col-6"><strong>Paper Type</strong></div>
                            <div className="col-6">Photo Lustre</div>
                        </div>
                        <div className="row">
                            <div className="col-6"><strong>Quantity</strong></div>
                            <div className="col-6">1</div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-6"><strong>VAT</strong></div>
                            <div className="col-6">£0.00</div>
                        </div>
                        <div className="row">
                            <div className="col-6"><strong>Total</strong></div>
                            <div className="col-6">£0.00</div>
                        </div>
                        <div className="row mt-5">
                            <button className="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                </span>
                <div className="col-12 d-flex flex-column p-4 glass-morphism">
                    <h4 className="align-left">Order Details</h4>
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