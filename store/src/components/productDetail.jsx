import React, { useEffect, useState, useContext } from "react";
import { useToasts } from "react-toast-notifications";
import { useParams } from "react-router";
import { UserContext } from "../userContext";
import api from "../api";

const ProductDetail = () => {
    const params = useParams();
    const currentUser = useContext(UserContext);
    const [product, setProduct] = useState({});
    const [isOrdered, setIsOrdered] = useState(false);
    const { addToast } = useToasts();

    useEffect(() => {
        (async() => {
            const response = await api.get(`products/${params.productId}`)
            setProduct(response.data);
        })()
       
    }, [])

    const addToCartHandler = async() => {
        const response = await api.post(`orders`,{
            userId: currentUser.user.currentUserId,
            productId: product.id,
            quantity: 1,
            isPaymentCompleted: false 
        })
        if(response.data) {
            setIsOrdered(true);
            addToast("item successfully added to your cart", {appearance:"success", autoDismiss: "true"})
        }
    }

    const renderedDescription = (product.description ?product.description.map((des, index) => <li key={index}>{des}</li>): "")

    return (
        <div className="row d-flex align-items-center p-2" style={{height: "100%"}}>
             <div className="col-md-5">
                <img className="img-fluid" src={product.image} alt={product.title} style={{maxWidth:"80%", maxHeight: "80%" , objectFit: "contain"}} />
            </div> 
            <div className="col-md-7 mt-5 mt-md-1">
                <h4 className="mb-3">{product.title}</h4>
                <ul>{renderedDescription}</ul>
                {product.rating ? <div>{[...Array(product.rating).keys()].map(n => {
                        return <i className="fa-solid fa-star text-warning" key={n}></i>
                    })}
                    {[...Array(5-product.rating).keys()].map(n => {
                        return <i className="fa-regular fa-star text-warning" key={n}></i>
                     })
                     }</div>: ""}
                     {product.price ? <div className="text-muted m-2"><b>${product.price.toFixed(2)}</b></div> : ""}
                     {!isOrdered? <button 
                        className="btn btn-primary btn-lg mt-2 fs-6"
                        onClick={addToCartHandler}
                     >
                         <span><i className="fa-solid fa-cart-shopping me-2"></i>Add tO Cart</span>
                     </button> : <button className="btn btn-outline-primary ">Added to Cart!</button>  }
            </div>
        </div>   
    )
}

export default ProductDetail;