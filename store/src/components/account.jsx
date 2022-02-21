import api from "../api";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";
import AccountItem from "./AccountItem";


const Account = () => {
    const currentUser = useContext(UserContext);
    const [accountInformation, setAccountInformation] = useState({});

    useEffect(() => {
        if(currentUser.user.isLoggedIn){
        (async() => {
            const response = await api.get(`users/${currentUser.user.currentUserId}`)
            if(response) {
                setAccountInformation(response.data)
           
            }
        })()}
    },[])

    return (
        accountInformation ?
        <div className="row g-3">
            <AccountItem title="Full Name" value= {accountInformation.fullName} />
            <AccountItem title="Email" value= {accountInformation.email} />
            <AccountItem title="Birth Date" value= {accountInformation.dateOfBirth} />
            <AccountItem title="gender" value= {accountInformation.gender} />
            <AccountItem title="Password" value= {accountInformation.password?[...Array((accountInformation.password).length).keys()].map (n => <span key={n}>*</span>): ""} />
        </div> : ""
    )
}

export default Account;