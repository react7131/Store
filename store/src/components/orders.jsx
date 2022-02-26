import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";
import Order from "./Order";
import api from "../api";
import { findItemByItemId } from "../services";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const currentUser = useContext(UserContext);

    useEffect( () => {
        (async() => {  
            const orderResponse = await api.get(`orders?userId=${currentUser.user.currentUserId}&isPaymentCompleted=true`)
            
            const ordersResponseBody = orderResponse.data;
            const productResponse = await api.get("products");
            const products = productResponse.data;
            ordersResponseBody.forEach( order => order.product= findItemByItemId(products, order.productId))
                setOrders(ordersResponseBody)
        })()
    },[currentUser.user.currentUserId])


    return (
        <>
            <h4 className="py-2 text-primary border-bottom border-primary">
                <i className="fas fa-history"></i>{" "}Previous Orders
                <span className="badge bg-primary mx-2">{orders.length}</span>
            </h4>
            {orders.length === 0 ?  <div className="text-danger">No orders</div>: (
                <table className="table table-sm borderless mt-1">
                    <tbody>
                        <tr className="border rounded-3 m-3 px-2">
                            <th>image</th>
                            <th>product name</th>
                            <th>quantity</th>
                            <th>price</th>
                            <th>total price</th>
                        </tr>
                        { orders.map(order => <Order key={order.id} order={order} />)}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default Orders;