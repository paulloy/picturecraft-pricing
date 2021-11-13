export default function Cart({ myCart, grandTotals, removeCartItem = f => f }) {
    return (
        <div className="row">
            <div className="col-11 mx-auto p-5 glass-morphism">
                <h2 className="text-center mb-4">My Cart</h2>
                <table className="my-cart">
                    <thead>
                        <tr>
                            <th className="text-center p-2">Paper Type</th>
                            <th className="text-center p-2">Width</th>
                            <th className="text-center p-2">Length</th>
                            <th className="text-center p-2">Quantity</th>
                            <th className="text-center p-2">Total</th>
                            <th className="bg-dark"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {myCart.map((cartItem) => (
                        <tr key={JSON.stringify(cartItem)}>
                            <td>{cartItem.imgType}</td>
                            <td>{cartItem.imgWidth} {cartItem.imgUnit}</td>
                            <td>{cartItem.imgLength} {cartItem.imgUnit}</td>
                            <td>{cartItem.imgQty}</td>
                            <td>£{cartItem.imgTotal}</td>
                            <td><button onClick={() => removeCartItem(cartItem)} className="btn btn-danger">Remove</button></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex mt-5 justify-content-end">
                    <p><strong>Discount</strong></p>
                    <p className="mx-3">£{grandTotals.discount}</p>
                </div>
                <div className="d-flex justify-content-end">
                    <p><strong>Sub-Total</strong></p>
                    <p className="mx-3">£{grandTotals.subTotal}</p>
                </div>
                <div className="d-flex justify-content-end">
                    <p><strong>VAT</strong></p>
                    <p className="mx-3">£{grandTotals.vat}</p>
                </div>
                <div className="d-flex justify-content-end">
                    <p><strong>Grand-Total</strong></p>
                    <p className="mx-3">£{grandTotals.grandTotal}</p>
                </div>
            </div>
        </div>
    );
}