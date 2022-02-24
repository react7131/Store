import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../userContext";
import api from "../api";
import Input from "./input";

const Login = () => {

    const [formLogin, setformLogin] = useState({
        email: "scott@test.com",
        password: "Scott123"
    });
    const [errors, setErrors] = useState({
        email: [],
        password: []
    })
    const [dirty, setDirty] = useState({
        email: false,
        password: false
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const emailRef= useRef(null);
    const currentUser = useContext(UserContext);

    const validate = () => {
        let errosData = {};

        //email 
        errosData.email = [];

        if(!formLogin.email) {
            errosData.email.push("Email can't be blank")
        }
        //email regex 
        const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if(formLogin.email){
            if(!validEmailRegex.test(formLogin.email)){
                errosData.email.push("Proper email address is expected")
            }
        }

        //password 
        errosData.password = [];

        if(!formLogin.password) {
            errosData.password.push("password can't be blank")
        }
        //password regex 
        const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
        if(formLogin.password){
            if(!validPasswordRegex.test(formLogin.password)){
                errosData.password.push("password should be 6 to 15 characters long with at least one uppercase letter, one lowercase letter and one digit")
            }
        }
          setErrors(errosData);
    }

    const isValid = () => {
        let valid = true;
        for( let control in errors) {
            if(errors[control].length > 0) {
                valid = false;
            }
        } 
        return valid;     
    }

    useEffect( () => {
        document.title = "Login"
        emailRef.current.focus();
    },[])

    useEffect(() => validate(),[formLogin])

    const changeHandler = (e) => {
        setformLogin({...formLogin, [e.target.name]: e.target.value} )
    }

    const blurHandler = (e) => {
        setDirty({ ...dirty, [e.target.name]: true});
        validate();
    }

    const onLoginClick = async() => {
        let dirtyData = dirty;
        Object.keys(dirty).forEach(control => {
            dirtyData[control] = true;
        });
        setDirty(dirtyData);
        validate();   
        if(isValid())  {
            let response = await api.get(`users?email=${formLogin.email}&password=${formLogin.password}`)
            if(response) {
                setDirty({
                    email: false,
                    password: false
                })
                setformLogin({
                    email: '',
                    password: ''
                })
                currentUser.dispatch({
                   type: 'login',
                   payload: {
                    currentUserId: response.data[0].id,
                    currentUserName: response.data[0].fullName,
                    currentUserRole: response.data[0].role
                   }
               }) 
                navigate('/dashboard' , { replace: true});

                
            }else {
                setMessage(<span className="text-danger">Errors in database connections</span>)
            }

        }  else {
            setMessage(<span className="text-danger">Errors</span>)
        } 
    }

    return (
        <div className="row">
            <div className="col-10 col-lg-5 col-sm-8 mx-auto mt-4 shadow border border-info rounded-3 p-0">
                <div className="card ">
                    <div className="card-header text-center fs-3">
                        Login
                    </div>
                    <div className="card-body px-4">
                    <form>
                    <Input type="email" name="email" label="Email" value={formLogin.email} onChange={changeHandler} onBlur={blurHandler} inputRef={emailRef} dirty={dirty} errors={errors} />
                    <Input type="password" name="password" label="Password" value={formLogin.password} onChange={changeHandler} onBlur={blurHandler} dirty={dirty} errors={errors} />
                    
                </form>
                    </div>
                    <div className="card-footer text-center border-0">
                        <div className="m-1">{message}</div>
                        <button onClick={onLoginClick} className="btn btn-primary px-5">LOGIN</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Login;