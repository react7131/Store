import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../userContext";
import api from "../api";
import Input from "./input";

const Register = () => {
    const currentUser = useContext(UserContext);
    const [formRegister, setformRegister]= useState({
        email: "",
        password: "", 
        fullName: "",
        dateofbirth: "", 
        gender: ""
    });
    const [errors, setErrors]= useState({
        email: [],
        password: [],
        fullName: [],
        dateofbirth:[],
        gender: []
    })

    const [dirty, setDirty]= useState({
        email: false,
        password: false,
        fullName: false,
        dateofbirth: false,
        gender: false
    })

    const [message, setMessage] = useState("")

    let navigate = useNavigate();
    let emailRef = useRef(null);

    const validate = () => {
        let errosData = {};

        //email 
        errosData.email = [];

        if(!formRegister.email) {
            errosData.email.push("Email can't be blank")
        }
        //email regex 
        const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if(formRegister.email){
            if(!validEmailRegex.test(formRegister.email)){
                errosData.email.push("Proper email address is expected")
            }
        }

        //password 
        errosData.password = [];

        if(!formRegister.password) {
            errosData.password.push("password can't be blank")
        }
        //password regex 
        const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
        if(formRegister.password){
            if(!validPasswordRegex.test(formRegister.password)){
                errosData.password.push("password should be 6 to 15 characters long with at least one uppercase letter, one lowercase letter and one digit")
            }
        }

        //fullname
        errosData.fullName = [];

        if(!formRegister.fullName) {
            errosData.fullName.push("full name can't be blank");
        }

         //dateofbirth
         //dateof birth can not be blank
         errosData.dateofbirth = [];

         if(!formRegister.dateofbirth) {
             errosData.dateofbirth.push("date of birth can't be blank");
         }

         //gender 
         errosData.gender=[];
          //dateof birth can not be blank

          if(!formRegister.gender) {
              errosData.gender.push("please select gender");
          }
         
          setErrors(errosData);
    }

    useEffect( () => {
        document.title = "Register"
        emailRef.current.focus();
    },[])

    useEffect(() => validate(),[formRegister])

    const changeHandler = (e) => {
        setformRegister({...formRegister, [e.target.name]: e.target.value} )
    }

    const blurHandler = (e) => {
        setDirty({ ...dirty, [e.target.name]: true});
        validate();
    }

    const submitHandler = async() => {
        let dirtyData = dirty;
                Object.keys(dirty).forEach(control => {
                    dirtyData[control] = true;
                });
                setDirty(dirtyData);
        validate();   
        if(isValid())  {
            
            let response = await api.post("users", {
                    email: formRegister.email,
                    password: formRegister.password,
                    fullName: formRegister.fullName,
                    dateofbirth: formRegister.dateofbirth,
                    gender: formRegister.gender,
                    role: "user"
            })
            if(response) {
                console.log(response.data)
                setMessage(<span className="text-success">Successfully Registered</span>)
                setformRegister({
                    email: "",
                    password: "", 
                    fullName: "",
                    dateofbirth: "", 
                    gender: ""
                })
                
                navigate('/dashboard', { replace: true});
                currentUser.dispatch({
                    type: 'login',
                    payload: {
                        currentUserId: response.data.id,
                        currentUserName: response.data.fullName,
                        currentUserRole: response.data.role
                    }
                })

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
            <div className="col-10 col-lg-5 col-sm-8 mx-auto mt-4 shadow border border-info rounded-3 p-0">
                <div className="card ">
                    <div className="card-header text-center fs-3">
                        Register
                        <ul className="text-danger">
                            {Object.keys(errors).map(control => {
                                if(dirty[control]){
                                    return errors[control].map( err => {
                                        return <li className="fs-6 text-start" key={err}>{err}</li>
                                    })
                                }else {
                                    return "";
                                }
                            })}
                        </ul>
                    </div>
                    <div className="card-body px-4">
                        <form>
                            <Input type="email" name="email" label="Email" value={formRegister.email} onChange={changeHandler} onBlur={blurHandler} inputRef={emailRef} dirty={dirty} errors={errors} />
                            <Input type="password" name="password" label="password" value={formRegister.password} onChange={changeHandler} onBlur={blurHandler} dirty={dirty} errors={errors} />
                            <Input type="text" name="fullName" label="FullName" value={formRegister.fullName} onChange={changeHandler} onBlur={blurHandler} dirty={dirty} errors={errors} />
                            <Input type="date" name="dateofbirth" label="Birth Date" value={formRegister.dateofbirth} onChange={changeHandler} onBlur={blurHandler} dirty={dirty} errors={errors} />    
                            <div>
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <div className="d-flex">
                                    <div className="me-3">
                                        <input 
                                            type="radio" 
                                            id="male" 
                                            name="gender" 
                                            value="male"
                                            checked ={formRegister.gender === "male"}
                                            onChange={changeHandler}
                                            />
                                        <label htmlFor="male" className="ms-1">male</label>
                                    </div>
                                    <div>
                                        <input 
                                            type="radio" 
                                            id="female" 
                                            name="gender" 
                                            value="female"
                                            checked ={formRegister.gender === "female"}
                                            onChange={changeHandler}
                                        />
                                        <label htmlFor="female" className="ms-1">female</label>
                                    </div>
                                </div>
                                <div className="text-danger">
                                        {dirty['gender'] && errors["gender"] ? errors["gender"] : ""}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer text-center border-0">
                        <div className="m-1">{message}</div>
                        <button onClick={submitHandler} className="btn btn-primary px-5">REGISTER</button>
                    </div>
                </div>   
            </div>
        </div>
    )
}

export default Register;