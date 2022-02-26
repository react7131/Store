import React, {useEffect, useContext, useState, useCallback} from "react";
import { UserContext } from "../userContext";
import { useToasts } from "react-toast-notifications";
import svg from '../images/404.svg';
import api from "../api";
import { findItemByItemId } from "../services";
import { Link } from "react-router-dom";

const ShoppingCart = () => {

    const [orders, setOrders] = useState([]);
    const currentUser = useContext(UserContext);
    const { addToast } = useToasts();
  
    const decreaseItem =async(orderId, quantity) => {
        const response = await api.patch(`orders/${orderId }`, {
            quantity : quantity - 1
        })
        if(response.data){
            LoadDataFromDatabase()
        }       
    }

    const increaseItem =async(orderId, quantity) => {
        const response = await api.patch(`orders/${orderId }`, {
            quantity : quantity + 1
        })
        if(response.data){
            LoadDataFromDatabase()
        }       
    }

    const deleteItem =async(orderId) => {
        const response = await api.delete(`orders/${orderId }`)
        if(response){
            LoadDataFromDatabase()
        } 
    }

    const onBuyNowClick = (orders) => {
        orders.forEach( async order => {
            const response = await api.patch(`orders/${order.id}`, {
                isPaymentCompleted: true
            })
            if(response.data) {
                LoadDataFromDatabase();
            }
        })
        addToast("Your orders completed successfully.", {appearance:"success", autoDismiss: "true"})
    }

    const LoadDataFromDatabase = useCallback( async() => {
        const orderResponse = await api.get(`orders?userId=${currentUser.user.currentUserId}&isPaymentCompleted=false`)
            
        const ordersResponseBody = orderResponse.data;
        const productResponse = await api.get("products");
        const products = productResponse.data;
        ordersResponseBody.forEach( order => order.product = findItemByItemId(products, order.productId))
            setOrders(ordersResponseBody)
    }, [currentUser.user.currentUserId])

    useEffect( () => {
        LoadDataFromDatabase()
    },[currentUser.user.currentUserId, LoadDataFromDatabase])

    const renderedList = orders.map(order => {
        return (
            <div key={order.id} className="shop-card border-bottom d-flex align-items-center px-3 " style={{width: '90%', height: '200px'}}>
                <div className="me-3 text-center" style={{width: '30%'}} >
                        <img 
                            src={order.product.image} 
                            alt={order.product.title} 
                            style={{width:'100px', height:'100px', objectFit: 'contain'}} 
                            className="img-fluid"
                        />
                </div>
                <div  className="d-flex flex-column justify-content-between align-items-start" style={{width: '70%'}} >    
                    <div className="mb-3">{order.product.title}</div>
                    
                    <div className="d-flex justify-content-between w-75 align-items-center" >
                        <div className="text-danger d-flex justify-content-between border rounded-3 ">
                            {order.quantity === 1 ? <span style={{cursor:'pointer'}} onClick={() => deleteItem(order.id)} className="m-2"><i className="fas fa-trash"></i></span>:
                            <span style={{cursor:'pointer'}} onClick={() => decreaseItem(order.id, order.quantity)} className="m-2"><i className="fas fa-minus"></i></span>}
                            <span className="m-2">{order.quantity}</span>
                            <span style={{cursor:'pointer'}} className="m-2" onClick={() => increaseItem(order.id, order.quantity)}><i className="fas fa-plus "></i></span>
                        </div>
                        <h6>$ {order.product.price * order.quantity}</h6>
                    </div>
                </div>
            </div> 
        )
    }   
    )

    const total = () => {
        const totalPrice = orders.reduce((acc, curr) => {
            return acc+ curr.product.price *curr.quantity
        },0)
        return totalPrice;
    } 

    return (
        <div>
            <h4 className="py-2 my-2 text-primary border-bottom border-primary">
                <i className="fas fa-cart-shopping"></i>{" "}Cart
                <span className="badge bg-primary mx-2">{orders.length}</span>
            </h4>
            {orders.length === 0 ? (
                <div className=" d-flex flex-column mt-5 justify-content-center align-items-center" style={{height: '100%'}}>
                   <img src={svg} alt="cart" />
                   <p> your cart is empty!</p>
                   <Link to="/store"><div className="btn btn-primary mt-3 ">Return to Store</div></Link>
                </div>)
            : (
                <div className="row g-4 mt-4">
                    <div className="col-md-8">
                        <div className="bg-white fs-6 p-4 border rounded-3 shadow">
                            {renderedList}
                        </div>     

                    </div>
                    <div className="col-md-4">
                        <div className="bg-white shadow p-3 border rounded-3 d-flex flex-column">
                            <div className="mb-2 d-flex justify-content-between align-items-center">
                              <p>Total Price:</p>
                              <h6 className="text-primary">$ {total().toFixed(2)}</h6>
                            </div>
                            <div className="mb-2 d-flex justify-content-between align-items-center">
                              <p>discount code:</p>
                              <div className="mb-2 d-flex w-50 h-25 float-end ">
                                  <input type="text"  className="outline-0 rounded-0 rounded-start form-control"/>
                                  <button className="btn btn-primary btn-sm rounded-0 rounded-end">confirm</button>
                              </div>
                            </div>
                            <div className="mb-2 d-flex justify-content-between align-items-center">
                                 <p>discount</p>
                                 <h6>$25.00</h6> 
                            </div>
                            <div className="mb-2 d-flex justify-content-between align-items-center">
                                 <p>the final price</p>
                                 <h6 className="text-primary">$ {total().toFixed(2) - 25.00}</h6> 
                            </div>
                            <button onClick={() => onBuyNowClick(orders)} className="mb-2 btn btn-primary btn-lg fs-6 mt-2 border w-100">Buy Now</button>
                            <button className="btn btn-outline-primary btn-lg fs-6 mt-2 w-100">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShoppingCart;