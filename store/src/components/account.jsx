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
            if(response.data) {
                setAccountInformation(response.data)
           
            }
        })()}
    },[])

    return (
        accountInformation ?
        <div className="row g-3">
            <AccountItem title="fullName" value= {accountInformation.fullName} accountInformation={accountInformation} setAccountInformation={setAccountInformation} />
            <AccountItem title="email" value= {accountInformation.email} accountInformation={accountInformation} setAccountInformation={setAccountInformation} />
            <AccountItem title="dateOfBirth" value= {accountInformation.dateOfBirth} accountInformation={accountInformation} setAccountInformation={setAccountInformation} />
            <AccountItem title="gender" value= {accountInformation.gender} accountInformation={accountInformation} setAccountInformation={setAccountInformation} />
            <AccountItem title="password" value= {accountInformation.password?[...Array((accountInformation.password).length).keys()].map (n => <span key={n}>*</span>): ""} accountInformation={accountInformation} setAccountInformation={setAccountInformation} />
        </div> : ""
    )
}

export default Account;