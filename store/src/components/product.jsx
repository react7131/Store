import React from "react";
import { Link } from "react-router-dom";

const Product = ({product}) => {
    return(
        <div className="col-xlg-3 col-lg-4 col-md-6 col-sm-12">
            <div className="product-card card text-center p-2 border-0" style={{height: "280px", fontSize: '1rem'}}>
                <div style={{ height: "60%" }} className="d-flex justify-content-center align-items-center">
                  <img src={product.image} alt={product.title} style={{ height: "70%", width: "70%" , objectFit: "contain" }} className="img-fluid" />
                </div>
                <div className="card-body">
                    <Link to={`/store/${product.id}`} className="text-dark text-decoration-none"><h6 className="text-truncate">{product.title}</h6></Link>
                    <div className=" position-absolute bottom-0 mb-3 p-2 d-flex justify-content-center" style={{width: "90%"}}  >
                        <span className="me-5 fs-6">${product.price}</span>
                        <span>{[...Array(product.rating).keys()].map(n => {
                            return <i className="fa-solid fa-star fa-sm text-warning" key={n}></i>
                        })}
                        {[...Array(5-product.rating).keys()].map(n => {
                            return <i className="fa-regular fa-star fa-sm text-warning" key={n}></i>
                        })
                        }</span>   
                    </div>
                </div>
        </div>
        </div>
        
    )
}

export default Product;