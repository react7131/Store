import React from "react";
import notfound from '../images/notfound.jpg';
import { useNavigate } from "react-router";

const NotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column justify-content-center align-items-center "> 
        <img className="img-fluid" style={{height: '20rem', width: '45rem', objectFit: "contain"}} src={notfound} alt="not found" />
            <h3 className="mb-4">Page Not Found!!</h3>
            <p className="lead text-center mb-4">This page may have been changed or deleted.</p>
            <button onClick={() => navigate('/store')} className="btn btn-primary rounded-pill fs-5 py-3 px-5">Take me to homepage</button>
        </div>
    )
}

export default NotFound;