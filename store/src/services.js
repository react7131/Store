import { Navigate } from "react-router";

export const logoutHandler = (e, user) => {
        e.preventDefault();
        user.dispatch({
            type:'logout'
        });
        <Navigate to="/" />;
}

export const findItemByItemId = (items, itemId) => {
    return items.find( item => item.id === itemId)
}

export const filterItems = (items, element) => {
    return items.filter(item => item !== element)
}
