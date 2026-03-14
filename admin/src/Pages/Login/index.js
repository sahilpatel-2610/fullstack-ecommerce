import { useEffect } from 'react';
import Logo from '../../assets/images/logo.png';
import patern from '../../assets/images/pattern.webp'
import { MyContext } from '../../App';
import { useContext } from 'react';
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { useState } from 'react';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import googleicon from '../../assets/images/googleicon.png'


const Login = () => {

    const history = useNavigate();
    const [inputIndex, setInputIndex] = useState(null);
    const [isShowPassword, setisShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(MyContext);


    const [formfildes, setFormfildes] = useState({
        email: "",
        password: "",
        isAdmin: true,
        terms: false
    });


    useEffect(() => {
        context.setisHideSidebarAndHeader(true);
    }, [])

    const focusInput = (index) => {
        setInputIndex(index);
    }


    const onChangeInput = (e) => {
        setFormfildes(() => ({
            ...formfildes,
            [e.target.name]: e.target.value
        }));
    }

    const signIn = (e) => {
        e.preventDefault();

        if (formfildes.email === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "email can not be blank!",
            })
            return false;
        }

        if (formfildes.password === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "password can not be blank!",
            })
            return false;
        }

        if (formfildes.terms === false) {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please agree to all Terms & Conditions!",
            })
            return false;
        }


        setIsLoading(true);
        context.setProgress(30);

        postData("/api/user/signin", formfildes).then((res) => {
            if (res.error !== true) {
                localStorage.setItem("token", res.token);
                const user = {
                    name: res.user?.name,
                    email: res.user?.email,
                    userId: res.user?.id
                }
                localStorage.setItem("user", JSON.stringify(user));

                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "User Login Successfully!",
                })

                setTimeout(() => {
                    setIsLoading(false);
                    context.setIsLogin(true);
                    // history("/dashboard");
                    window.location.href = "/dashboard";
                }, 2000);

                context.setProgress(100);
            } else {
                setIsLoading(false);
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: res.msg || "Something went wrong!",
                })
                context.setProgress(100);
            }

        })


    }

    return (
        <>
            <img src={patern} className='loginPatern' />
            <section className="loginSection">
                <div className="loginBox">
                    <div className='logo text-center'>
                        <img src={Logo} width="60px" />
                        <h5 className='font-weight-bold'>Login to Ecommerce</h5>
                    </div>

                    <div className='wrapper mt-3 card border'>
                        <form onSubmit={signIn}>
                            <div className={`form-group position-relative ${inputIndex === 0 && 'focus'}`}>
                                <span className='icon'><MdEmail /></span>
                                <input type='text' className='form-control' placeholder='enter your email' onFocus={() => focusInput(0)} onBlur={() => setInputIndex(null)} autoFocus name='email' onChange={onChangeInput} />
                            </div>

                            <div className={`form-group position-relative ${inputIndex === 1 && 'focus'}`}>
                                <span className='icon'><IoMdLock /></span>
                                <input type={`${isShowPassword === true ? 'text' : 'password'}`} className='form-control' placeholder='enter your password' onFocus={() => focusInput(1)} onBlur={() => setInputIndex(null)} name='password' onChange={onChangeInput} />

                                <span className='toggleShowPassword' onClick={() => setisShowPassword(!isShowPassword)}>
                                    {
                                        isShowPassword === true ? <IoMdEyeOff /> : <IoMdEye />
                                    }

                                </span>

                            </div>


                            <FormControlLabel control={<Checkbox onChange={(e) => setFormfildes({ ...formfildes, terms: e.target.checked })} />} label="I agree to all Terms & Conditions" />

                            <div className='form-group'>
                                <Button type="submit" className="btn-blue btn-lg w-100 btn-big">
                                    {
                                        isLoading === true ? <CircularProgress color="inherit" className="loader" /> : "Sign In"
                                    }
                                </Button>
                            </div>

                            <div className='form-group text-center mt-3 mb-0'>
                                <Link to={'/forgot-password'} className="link">FORGOT PASSWORD</Link>
                                <div className='d-flex align-items-center justify-content-center or mt-3 mb-3'>
                                    <span className='line'></span>
                                    <span className='txt'>or</span>
                                    <span className='line'></span>
                                </div>

                                <Button variant="outlined" className='w-100 btn-lg btn-big loginWithGooogle'>
                                    <img src={googleicon} width="25px" /> &nbsp; Sign In with Google
                                </Button>


                            </div>

                        </form>

                    </div>

                    <div className='wrapper mt-3 card border footer p-3'>
                        <span className='text-center'>
                            Don't have an account?
                            <Link to={'/signUp'} className='link color ml-2'>  Register</Link>
                        </span>
                    </div>




                </div>
            </section>
        </>
    )
}

export default Login;