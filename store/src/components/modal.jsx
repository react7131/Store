import React from "react";
import  ReactDOM  from "react-dom";
import { useNavigate } from "react-router";

const Modal = ({children, header}) => {
    const navigate = useNavigate()

    return ReactDOM.createPortal(
        <div onClick={ () => navigate('/store')} className="modal" tabIndex="-1">
            <div className="modal-dialog w-75">
                <div className="modal-content" onClick= { (e) => e.stopPropagation()}>
                    <div className="modal-header d-flex justify-content-center ">
                        <h5 className="modal-title  ">{header}</h5>
                    </div>
                    <div className="modal-body px-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>, document.querySelector('#modal')
    )
}

export default Modal;