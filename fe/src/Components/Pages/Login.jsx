import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import '../../App.css'
import { logIn } from "../../Store/loginSlice";
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";
import { GoAlertFill } from 'react-icons/go';
import { postAuthors } from "../../Store/authorSlice";



const Login = () => {

    const actualTheme = useSelector(state => state.theme.theme)
    const logStatus = useSelector(state => state.logIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loginFormData, setLoginFormData] = useState({})
    const [register, setRegister] = useState(false)
    const [registerFormData, setRegisterFormData] = useState({})
    const [secondPassword, setSecondPassword] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault();

        dispatch(logIn(loginFormData))
            .then(() => localStorage.getItem('userLoggedIn') ? navigate('/') : '')
    }

    const sendRegister = async (e) => {
        e.preventDefault();
        if (registerFormData.password === secondPassword) {
            dispatch(postAuthors(registerFormData))
                .then(() => dispatch(logIn({
                    email: registerFormData.email,
                    password: registerFormData.password
                })))
                .then(() => localStorage.getItem('userLoggedIn') ? navigate('/') : '')
            console.log(registerFormData)
        } else { console.log("psw errate") }

    }

    const loginWithGithub = async () => {
        /* localStorage.setItem('isLogging', true) */     //?
        window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github/`;
    }

    return (
        <div className={actualTheme ? " py-5" : "dark-secondary text-light py-5"}>
            <div className="d-flex flex-column justify-content-center align-items-center" >
                <form style={{ width: '400px' }} onSubmit={onSubmit}>
                    <h3>Log In</h3>
                    <div className="mb-3">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={(e) => setLoginFormData({
                                ...loginFormData,
                                email: e.target.value
                            })}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={(e) => setLoginFormData({
                                ...loginFormData,
                                password: e.target.value
                            })}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                            />
                            <label className="custom-control-label mx-1" htmlFor="customCheck1">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-info mb-3">
                            Log in
                        </button>
                    </div>
                    <p className="forgot-password text-right" style={{ fontSize: '14px' }}>
                        <a href="#">I'm forgot the password?</a>
                    </p>

                </form>
                {logStatus.res && logStatus.res.statusCode === 404 && (
                    <Alert style={{ width: '400px' }} key="danger" variant="danger">
                        Wrong E-mail or Password
                    </Alert>
                )}
                {logStatus.res && logStatus.res.statusCode === 400 && (
                    <Alert style={{ width: '400px' }} key="danger" variant="danger">
                        Wrong E-mail or Password
                    </Alert>
                )}

                <div>
                    <h6 className="text-center mt-4 mb-3">YOU'RE NOT A MEMBER?</h6>
                    <button onClick={() => setRegister(!register)} className="btn btn-info mx-1">
                        Sing up
                    </button>
                    <button onClick={loginWithGithub} className="btn btn-dark mx-1">
                        Login with Github
                    </button>
                </div>
                {register && (
                    <div style={{ width: '400px' }} className="mb-5">
                        <form onSubmit={sendRegister}>
                            <div className="mb-3">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Your Name"
                                    onChange={(e) => setRegisterFormData({
                                        ...registerFormData,
                                        name: e.target.value
                                    })}

                                />
                            </div>
                            <div className="mb-3">
                                <label>Surname:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Your Surname"
                                    onChange={(e) => setRegisterFormData({
                                        ...registerFormData,
                                        surname: e.target.value
                                    })}

                                />
                            </div>
                            <div className="mb-3">
                                <label>Birthday:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Enter Your Date of Birth"
                                    onChange={(e) => setRegisterFormData({
                                        ...registerFormData,
                                        birthdate: e.target.value
                                    })}

                                />
                            </div>
                            <div className="mb-3">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Your Email"
                                    onChange={(e) => setRegisterFormData({
                                        ...registerFormData,
                                        email: e.target.value
                                    })}

                                />
                            </div>
                            <div className="mb-3">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Your Password"
                                    onChange={(e) => {
                                        setRegisterFormData({
                                            ...registerFormData,
                                            password: e.target.value
                                        })
                                    }}

                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Repete Password"
                                    onChange={(e) => setSecondPassword(e.target.value)}
                                />
                                {registerFormData.password !== secondPassword && (
                                    <>
                                        <GoAlertFill />
                                        <span>No match password</span>
                                    </>
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="file"
                                    className="form-control"
                                    placeholder="Avatar"
                                    onChange={(e) => setRegisterFormData({
                                        ...registerFormData,
                                        avatar: e.target.files[0]
                                    })}
                                />
                            </div>
                            <div className="d-grid mb-4">
                                <button type="submit" className="btn btn-info">
                                    Sing in
                                </button>
                            </div>
                        </form>
                    </div>
                )}


            </div>
        </div>
    )
}

export default Login