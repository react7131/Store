import React from "react";
import { Link } from "react-router-dom";

const Product = ({product}) => {
    return(
        <div className="col-xlg-4 col-lg-6">
            <div className="product-card card text-center  p-2 border-0" style={{height: "330px"}}>
                <img src={product.image} alt={product.title} className="card-img-top" style={{ height: "60%" , objectFit: "contain" }} className="img-fluid" />
                <div className="card-body">
                    <Link to={`/store/${product.id}`} className="text-dark text-decoration-none"><h6>{product.title}</h6></Link>
                    <div className=" position-absolute bottom-0 mb-3"  >
                        <span className="me-5">${product.price.toFixed(2)}</span>
                        <span>{[...Array(product.rating).keys()].map(n => {
                            return <i className="fa-solid fa-star text-warning" key={n}></i>
                        })}
                        {[...Array(5-product.rating).keys()].map(n => {
                            return <i className="fa-regular fa-star text-warning" key={n}></i>
                        })
                        }</span>   
                    </div>
                </div>
        </div>
        </div>
        
    )
}

export default Product;