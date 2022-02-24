import React, { useContext } from "react";
import { UserContext } from "../userContext";
import { NavLink, Outlet } from "react-router-dom";
import { logoutHandler } from "../services";

const Dashboard = () => {

     const currentUser = useContext(UserContext);
    const classStyle= "p-2 p-md-3 dashboard-items text-dark d-block text-decoration-none"
    return (
            <div className="row g-4">
                <div className="col-md-4 col-lg-3">
                    <div className="bg-white rounded-3 p-4">
                        <h4 className="d-flex align-items-center fs-3 border-bottom px-4 py-4 ">
                            <i className="fas fa-user fa-lg me-2 "></i>
                            {currentUser.user.currentUserName}
                        </h4>
                        <div className="py-4 fs-6">
                            <div>
                                <NavLink className={({ isActive }) => isActive ? `nav-link bg-info text-white rounded-3 ${classStyle}` : `nav-link ${classStyle}`} to='/dashboard/account'>
                                    <i className=" fas fa-user me-2 "></i>
                                    account
                                </NavLink>
                            </div>
                            <div>
                                <NavLink className={({ isActive }) => isActive ? `nav-link bg-info text-white rounded-3 ${classStyle}` : `nav-link ${classStyle}`} to='/dashboard/orders'>
                                    <i className=" fa fa-list me-2 "></i>
                                    previous orders
                                </NavLink>
                            </div>
                            <div className="p-2 p-md-3 dashboard-items" onClick={e => logoutHandler(e,currentUser)}>
                                <i className=" fa fa-right-from-bracket me-2 text-danger"></i>
                                log out
                            </div>
                        </div>
                    </div>        
                </div>
                <div className="col-md-8 col-lg-9">
                    <div className=" bg-white rounded-3 p-3">
                        <Outlet />
                    </div>  
                </div>    
            </div>


// <div className="row g-4">
//                 <div className="col-md-4">
//                     <nav className="bg-white rounded-3 p-4 navbar">
//                         <h4 className="d-flex align-items-center fs-3 border-bottom p-4 ">
//                             <i className="fas fa-user fa-xl me-2 "></i>
//                             {currentUser.user.currentUserName}
//                         </h4>
//                         <ul className="py-4 fs-6 list-style-none navbar-nav">
//                             <li className="nav-item">
//                                 <NavLink className={({ isActive }) => isActive ? "nav-link text-info classStyle" : "nav-link classStyle"} to='/dashboard/account'>
//                                     <i className=" fas fa-user me-4 text-info"></i>
//                                     account
//                                 </NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className={({ isActive }) => isActive ? "nav-link bg-info" : "nav-link"} to='/dashboard/orders'>
//                                     <i className=" fa fa-list me-4 text-info"></i>
//                                     previous orders
//                                 </NavLink>
//                             </li>
//                             <li className="nav-item p-2 p-md-4 dashboard-items" onClick={e => logoutHandler(e,currentUser)}>
//                                 <i className=" fa fa-right-from-bracket me-4 text-danger"></i>
//                                 log out
//                             </li>
//                         </ul>
//                     </nav>        
//                 </div>
//                 <div className="col-md-8">
//                     <div className=" bg-white rounded-3 p-3">
//                         <Outlet />
//                     </div>  
//                 </div>    
//             </div>
    )
}

export default Dashboard;

