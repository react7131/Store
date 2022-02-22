import './App.css';
import Login from './components/login';
import Register from './components/register';
import NotFound from './components/notFound';
import Dashboard from './components/Dashboard';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router';
import Navbar from './components/navbar';
import { UserContext } from './userContext';
import { useReducer } from 'react';
import Store from './components/store';
import ProductDetail from './components/productDetail';
import { ToastProvider} from 'react-toast-notifications';
import Orders from './components/orders';
import Account from './components/account';
import ShoppingCart from './components/shoppingCart';
import PrivateRoute from './components/privateRoute';
import {useEffect} from 'react';


// useEffect( () => {
//   getLocalAccountInfo();
// },[])

// useEffect( () => {
//   saveLocalAccountInfo();
// },[user])

// const saveLocalAccountInfo = () => {
//   localStorage.setItem("userInfo", JSON.stringify(user))  
// }

// const getLocalAccountInfo = () => {
// if(localStorage.getItem("userInfo") === null){
//   localStorage.setItem("userInfo", JSON.stringify({})) 
// }else {
//   let localAccount = JSON.parse(localStorage.getItem("userInfo"))  
//   dispatch(localAccount)
// dispatch({
//   type: 'login',
//   payload: {
//    currentUserId: localAccount.id,
//    currentUserName: localAccount.fullName,
//    currentUserRole: localAccount.role
//   }
// }) 
// }
// }

let initialUser = {
  isLoggedIn: false,
  currentUserId: null,
  currentUserName: null,
  currentUserRole: null
}

let reducer = (state, action) => {
  switch(action.type) {
    case 'login':
      return {
        isLoggedIn: true,
        currentUserId: action.payload.currentUserId,
        currentUserName: action.payload.currentUserName,
        currentUserRole: action.payload.currentUserRole
      }
    case 'logout': 
      return {
        isLoggedIn: false,
        currentUserId: null,
        currentUserName: null,
        currentUserRole: null
      }
    default: 
      return state;
    }
}

function App() {

  const [user, dispatch] = useReducer(reducer, initialUser);
  console.log(user)
  useEffect( () => {
   getLocalAccountInfo();
   

},[])

useEffect( () => {
  saveLocalAccountInfo();
},[user])

const saveLocalAccountInfo = () => {
  localStorage.setItem("userInfo", JSON.stringify(user))  
}

const getLocalAccountInfo = () => {
if(localStorage.getItem("userInfo") === null){
  localStorage.setItem("userInfo", JSON.stringify({})) 
}else {
  let localAccount = JSON.parse(localStorage.getItem("userInfo"))  
  dispatch(localAccount)
dispatch({
  type: 'login',
  payload: {
   currentUserId: localAccount.currentUserId,
   currentUserName: localAccount.currentUserName,
   currentUserRole: localAccount.currentUserRole
  }
}) 
}
}

  return (
    <UserContext.Provider value={{user, dispatch }}>
      <ToastProvider>
      <BrowserRouter >
        <Navbar />

        <div className="container-fluid p-4">
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/register"  element={<Register />} />
            <Route path="/dashboard"  element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
            } >
            
              <Route index  element={<Orders/>}/>
              <Route path="orders"  element={<Orders/>}/>
              <Route path="account" element={<Account/>}/>
            </Route>
            <Route path="/shoppingcart"  element={<ShoppingCart />} />
            <Route path="/store"  element={<Store />} />
            <Route path="/store/:productId"  element={<ProductDetail />} />
            <Route path="*"  element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
      </ToastProvider>
    </UserContext.Provider>
  );
}

export default App;
