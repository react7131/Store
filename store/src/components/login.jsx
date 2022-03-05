import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../userContext";
import * as yup from 'yup';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import Modal from "./modal";
import api from "../api";

const Login = () => {

    const [ message, setMessage ] = useState('');
    const currentUser = useContext(UserContext);
    const navigate = useNavigate();
    const emailRef= useRef(null)

    useEffect(() => {
        document.title = "Login"
        emailRef.current.focus();
    },[])

    const schema = yup.object().shape({
        email: yup.string().email('Proper email address is expected').required('Email can not be blank'),
        password: yup.string().required('Password can not be blank').matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/, "password should be 6 to 15 characters long with at least one uppercase letter, one lowercase letter and one digit")
    })

    return (
        <Modal header= 'Login'>
        <Formik 
            initialValues = {{email: '', password: ''}}

            onSubmit={async (values, { setSubmitting }) => {
                    const response = await api.get(`users?email=${values.email}&password=${values.password}`)
                    setSubmitting(false)
                    if(response.data.length > 0) {
                        currentUser.dispatch({
                            type: 'login',
                            payload: {
                                currentUserId: response.data[0].id,
                                currentUserName: response.data[0].fullName,
                                currentUserRole: response.data[0].role
                            }
                        }) 
                            navigate('/dashboard');
                            } else {
                            setMessage(['email or password is not correct'])
                        }
                    }
            }

            validationSchema = {schema}
        >
            {
                ({ handleSubmit, isSubmitting }) => (

                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email: </label>
                            <Field type="email" innerRef={emailRef} name='email' id="email" className="form-control"  />
                            <div className="text-danger">
                                <ErrorMessage name="email" className="error" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password: </label>
                            <Field type="password" name="password" id="password" className="form-control"   />
                            <div className="text-danger">
                                <ErrorMessage name="password" />
                            </div>
                        </div>
                        
                        <div className="text-center mt-4 w-100">
                            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>Submit</button>
                        </div>
                        <div className="text-danger text-center mt-3">{message}</div>
                    </Form>   
                )
            }
        </Formik>
        </Modal>
    )
}

export default Login;
