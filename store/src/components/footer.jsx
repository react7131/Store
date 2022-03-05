import React from "react";

const Footer = () => {
    return (
        <footer className="bg-white mt-5 p-4">
            <h5 className="text-uppercase">Contact us</h5>
            <div className="row g-5 align-items-center">
                <div className="col-sm-7">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12950.384218063109!2d51.42047615758156!3d35.76073210347694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e041faf0ee823%3A0xd7926b1a24b8ee77!2sTehran%20Province%2C%20Tehran%2C%20District%203%2C%20Mirdamad%20Blvd%2C%20Iran!5e0!3m2!1sro!2sro!4v1642624422810!5m2!1sro!2sro" className="border-0" width="100%" height="350" allowFullScreen="" loading="lazy"></iframe>
                </div>   
                <div className="col-sm-5">
                    <div>
                        <div>
                            <div className="fs-4 text-primary">
                                <i className="fas fa-map-pin"></i>
                            </div>
                            <h6 className="mb-2">address</h6>
                            <p className="text-muted"> Mirdamad, Tehran,</p>
                        </div>
                        <div>
                            <div className="fs-4 text-primary">
                                <i className="fas fa-headphones-alt"></i>
                            </div>
                            <h6>support</h6>
                            <p className="text-muted">
                                <span className="me-2"><i className="fas fa-phone"></i></span>
                                +9821-12345678
                            </p>
                            <p className="text-muted">
                                <span className="me-2"><i className="fas fa-envelope"></i></span>
                                store@gmail.com
                            </p>
                        </div>
                        <div>
                            <div className="fs-4 text-primary">
                                <i className="fas fa-clock"></i>
                            </div>
                            <h6>Response</h6>
                            <p className="text-muted">24 hours a day</p>
                            <p className="text-muted">7 days a week</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;