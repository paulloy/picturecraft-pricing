export default function Cart({ myCart }) {
    const grandTotal = () => {
        let total = 0;
        myCart.map(cartItem => {
            total = total + Number(cartItem.imgTotal);
        });
        return total.toFixed(2);
    }

    return (
        <div className="row">
            <div className="col-11 mx-auto glass-morphism">
                <h2>My Cart</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Paper Type</th>
                            <th>Width</th>
                            <th>Length</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myCart.map(cartItem => (
                        <tr>
                            <td>{cartItem.imgType}</td>
                            <td>{cartItem.imgWidth} {cartItem.imgUnit}</td>
                            <td>{cartItem.imgLength} {cartItem.imgUnit}</td>
                            <td>{cartItem.imgQty}</td>
                            <td>£{cartItem.imgTotal}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <p>Grand-Total</p>
                    <p>£{grandTotal()}</p>
                </div>
            </div>
        </div>
    );
}