import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../userContext";
import * as yup from 'yup';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import Modal from "./modal";
import api from "../api";

const Register = () => {

    const [message, setMessage] = useState('')
    const emailRef= useRef(null);
    const currentUser = useContext(UserContext);
    let navigate = useNavigate();

    useEffect(() => {
        document.title = "Register"
        emailRef.current.focus();
    },[]) 

    const schema = yup.object().shape({
        email: yup.string().email('Proper email address is expected').required('Email can not be blank'),
        password: yup.string().required('Password can not be blank')
        .matches(
            /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/,
            "password should be 6 to 15 characters long with at least one uppercase letter, one lowercase letter and one digit"
          ),
        fullName: yup.string().required('full name can not be blank'),
        dateOfBirth: yup.date().required('please enter your birth date'),
        gender: yup.mixed().oneOf(['male', 'female'])
    })

    return (
        <Modal header='Register'>
            <Formik 
                initialValues = {{email: '', password: '', fullName: '', dateOfBirth: '', gender:''}}
                onSubmit={ async (values, { setSubmitting }) => {

                    const response = await api.post("users",{
                        email: values.email,
                        password: values.password,
                        fullName: values.fullName,
                        dateOfBirth: values.dateOfBirth,
                        gender: values.gender,
                        role: "user"
                    })
                    setSubmitting(false)
                    
                    if(response.data ) {
                        currentUser.dispatch({
                            type: 'login',
                            payload: {
                                currentUserId: response.data.id,
                                currentUserName: response.data.fullName,
                                currentUserRole: response.data.role
                            }
                        })
                            navigate('/dashboard');
                    } else {
                        setMessage('error in connection')
                    } 
                }
                }

                validationSchema = {schema}
            >
            {
                ({ handleSubmit, values, isSubmitting }) => (
                
                    <div className="card-body px-4">
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
                                <Field type="password" name='password' id="password" className="form-control"  />
                                <div className="text-danger">
                                    <ErrorMessage name="password" className="error" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label">fullName: </label>
                                <Field type="text" name='fullName' id="fullName" className="form-control"  />
                                <div className="text-danger">
                                    <ErrorMessage name="fullName" className="error" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dateOfBirth" className="form-label">Date of Birth: </label>
                                <Field type="date" name='dateOfBirth' id="dateOfBirth" className="form-control"  />
                                <div className="text-danger">
                                    <ErrorMessage name="dateOfBirth" className="error" />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="gender" className="form-label">Gender</label>
                                
                                <Field component="div" name="gender">
                                    <input
                                    type="radio"
                                    id="male"
                                    defaultChecked={values.gender === "male"}
                                    name="gender"
                                    value="male"
                                    className="me-1"
                                    />
                                    <label htmlFor="male">Male</label>

                                    <input
                                    type="radio"
                                    id="female"
                                    defaultChecked={values.gender === "female"}
                                    name="gender"
                                    value="female"
                                    className="me-1 ms-3"
                                    />
                                    <label htmlFor="female">Female</label>
                                </Field>
                            
                                <div className="text-danger">
                                    <ErrorMessage name="gender" className="error" />
                                </div>
                            </div>
                            
                            <div className="text-center mt-4">
                                <button disabled={isSubmitting} className="btn btn-primary w-100">Register</button>
                            </div>
                            <div className="text-danger">{message}</div>
                        </Form>
                    </div>     
                )}
            </Formik> 
        </Modal>   
    )
}

export default Register;

