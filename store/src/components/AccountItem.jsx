import { useContext } from "react";
import { UserContext } from "../userContext";
import api from "../api";

const AccountItem = ({title, value, accountInformation, setAccountInformation}) => {

    const currentUser = useContext(UserContext)

    const editAccountHandler = async (userId,title) => {
        const t= title.title
        const newValue = window.prompt('enter new value:');
        const response = await api.patch(`users/${userId }`, {
            [t] : newValue 
        })
        if(response.data){
           setAccountInformation( {...accountInformation, [t]: newValue} )
        }  
    }
    return (
        <div className="col-sm-6">
            <div className="p-3 rounded-3 bg-light d-flex align-items-center justify-content-between">
                <div>
                    <p className='text-uppercase' style={{fontSize: "14px"}}>{title}</p>
                    <h6 className="lead" style={{fontSize: "16px"}}>{value}</h6>
                </div>
                <div className="text-primary" onClick={() => editAccountHandler(currentUser.user.currentUserId,{title})}>
                    <i className="fas fa-edit"></i>
                </div>
            </div>
        </div>
    )
}

export default AccountItem;