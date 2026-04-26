import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import Logo from '../../assets/images/logo.jpg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import GoogleImg from '../../assets/images/googleimg.png';
import { postData } from "../../utils/api";
import CircularProgress from '@mui/material/CircularProgress';


import { getAuth, signInWithPopup, GoogleAuthProvider, } from "firebase/auth";
import { firebaseApp } from "../../firebase";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formfildes, setFormfildes] = useState({
        email: "",
        password: "",
    });

    const history = useNavigate();
    const context = useContext(MyContext);

    const onChangeInput = (e) => {
        setFormfildes(() => ({
            ...formfildes,
            [e.target.name]: e.target.value
        }));
    }


    useEffect(() => {
        context.setisHeaderFooterShow(false);
        return () => {
            context.setisHeaderFooterShow(true);
        }
    }, [context]);

    const login = (e) => {
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

        setIsLoading(true);
        context.setProgress(30);

        postData("/api/user/signin", formfildes).then((res) => {
            if (res.error === false) {
                localStorage.setItem("user", JSON.stringify(res.user));
                localStorage.setItem("token", res.token);
                context.setUser(res.user);
                context.setisLogin(true);

                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "User Login Successfully!",
                })

                setTimeout(() => {
                    setIsLoading(false);
                    history("/");
                }, 2000);
            } else {
                setIsLoading(false);
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: res.msg || "Invalid Credentials!",
                })
            }
            context.setProgress(100);
        }).catch(() => {
            setIsLoading(false);
            context.setProgress(100);
        });

    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                const fields = {
                    name: user.displayName,
                    email: user.email,
                    password: null,
                    images: user.photoURL ? [user.photoURL.replace("s96-c", "s400-c")] : [],
                    phone: user.phoneNumber
                }

                postData("/api/user/authWithGoogle", fields).then((res) => {
                    try {
                        if (res.error !== true) {
                            localStorage.setItem("token", res.token);
                            localStorage.setItem("user", JSON.stringify(res.user));

                            context.setAlertBox({
                                open: true,
                                error: false,
                                msg: res.msg || "User Login Successfully!",
                            });

                            context.setisLogin(true);
                            context.setUser(res.user);

                            setTimeout(() => {
                                setIsLoading(false);
                                window.location.href = "/";
                            }, 2000);
                        } else {
                            context.setAlertBox({
                                open: true,
                                error: true,
                                msg: res.msg || "Invalid Credentials!",
                            });
                            setIsLoading(false);
                        }
                    } catch (error) {
                        console.log(error);
                        setIsLoading(false);
                    }
                });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: errorMessage,
                });
            });
    };

    return (
        <section className="section signInPage">
            <div className="shape-bottom"> <svg fill="#fff" id="Layer_1" x="0px" y="0px" viewBox="0 0 1921 819.8"
                style={{ enableBackground: 'new 0 0 1921 819.8' }} > <path className="st0" d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"></path> </svg>
            </div>

            <div className="container">
                <div className="box card p-3 showdow border-0">
                    <div className="text-center">
                        <img src={Logo} alt="logo" />
                    </div>



                    <form className="mt-3" onSubmit={login}>
                        <h2 className="mb-4">Sign In</h2>
                        <div className="form-group">
                            <TextField id="email" label="Email" type="email" name="email" onChange={onChangeInput} required variant="standard" className="w-100" />
                        </div>
                        <div className="form-group">
                            <TextField id="password" label="Password" type="password" name="password" onChange={onChangeInput} required variant="standard" className="w-100" />
                        </div>


                        <a href="#!" className="border-effect cursor txt">Forgot Password?</a>

                        <div className="d-flex align-items-center mt-3 mb-3">
                            <Button className="btn-blue col btn-lg btn-big" type="submit" disabled={isLoading === true ? true : false}>
                                {
                                    isLoading === true ? <CircularProgress color="inherit" className="loader" /> : "Sign In"
                                }
                            </Button>
                            <Link to="/"> <Button className="btn-lg btn-big col ml-3" variant="outlined">Cancel</Button></Link>
                        </div>

                        <p className="txt">Not Registered? <Link to="/signUp" className="border-effect">Sign Up</Link></p>

                        <h6 className="mt-4 text-center font-weight-bold">Or continue with social account</h6>

                        <Button className="loginWithGoogle mt-2" variant="outlined" onClick={signInWithGoogle}><img src={GoogleImg} alt="google" /> Sign In with Google</Button>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default SignIn;

