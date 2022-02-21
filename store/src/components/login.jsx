import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../userContext";
import api from "../api";

const Login = () => {

    const currentUser = useContext(UserContext);
    const [formLogin, setformLogin] = useState({email: "scott@test.com", password: "Scott123"});
    const [errors, setErrors] = useState({
        email: [],
        password: []
    })
    const [dirty, setDirty] = useState({
        email: false,
        password: false
    });
    const [message, setMessage] = useState("");
    let navigate = useNavigate();
    useEffect( () => {
        document.title = "Login"
    },[])

    const changeHandler = (e) => {
        setformLogin({...formLogin, [e.target.name]: e.target.value} )
    }

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

    useEffect(() => validate(),[formLogin])

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

    const isValid = () => {
        let valid = true;
        for( let control in errors) {
            if(errors[control].length > 0) {
                valid = false;
            }
        } 
        return valid;     
    }

    return (
        <div className="row">
            <div className="col-lg-6 col-md-8 mx-auto mt-4 shadow border border-info rounded-3 p-0">
                <div className="card ">
                    <div className="card-header text-center fs-3">
                        Login
                    </div>
                    <div className="card-body px-4">
                    <form>
                    <div className="mb-3 form-group">
                        <label htmlFor="email" className="form-label">Enter your email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="name@example.com" 
                            name="email" 
                            value={formLogin.email}
                            onChange={changeHandler}
                            onBlur={() => {
                                setDirty({ ...dirty, email: true});
                                validate();
                            }}
                        />
                        <div className="text-danger">
                            {dirty['email']&&errors['email'] ? errors['email'] : ''}
                        </div>
                    </div>
                    <div className="mb-3 form -group">
                        <label htmlFor="password" className="form-label">Enter your password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="your password" 
                            name="password" 
                            value={formLogin.password}
                            onChange={changeHandler}
                            onBlur={() => {
                                setDirty({ ...dirty, password: true});
                                validate();
                            }}
                        />
                        <div className="text-danger">
                            {dirty['password']&&errors['password'] ? errors['password'] : ''}
                        </div>
                    </div>
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