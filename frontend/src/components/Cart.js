

export default function Cart({ myCart }) {

    return (
        <div>
            <h3>My Cart</h3>
            <table>
                <thead>
                    <tr>
                        <th>Paper Name</th>
                        <th>Width</th>
                        <th>Length</th>
                        <th>Quantity</th>
                        <th>Sub-Total</th>
                        <th>VAT</th>
                        <th>Total</th>
                    </tr>
                </thead>
            {
                myCart 
                ? myCart.map(obj => 
                        <tbody>
                            <tr>
                                <td>{ obj.name }</td>
                                <td>{ obj.width } { obj.unit }</td>
                                <td>{ obj.length } { obj.unit }</td>
                                <td>{ obj.qty }</td>
                                <td>£{ obj.subTotal.toFixed(2) }</td>
                                <td>£{ obj.vat.toFixed(2) }</td>
                                <td>£{ obj.total.toFixed(2) }</td>
                            </tr>
                        </tbody>
                ) 
                : null
            }
            </table>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Sub-Total
                            </th>
                            <th>
                                VAT
                            </th>
                            <th>
                                Grand Total
                            </th>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr>
                            {/* <td>{ myCart.reduce((x, y) => ({subTotal: x.subTotal + y.subTotal}), 0) }</td> */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div> 
    );
}