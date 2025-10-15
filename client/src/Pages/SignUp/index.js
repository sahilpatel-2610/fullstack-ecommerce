// import { useContext, useEffect } from "react";
// import { MyContext } from "../../App"; 
// import Logo from '../../assets/images/logo.jpg';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { Link } from "react-router-dom";
// import GoogleImg from '../../assets/images/googleimg.png';


// const SignUp = () => {

//     const context = useContext(MyContext);
    
//     useEffect(() => {
//         context.setisHeaderFooterShow(false);
//     },[]);

//     return (
//       <section className="section signUpPage">
//         <div className="shape-bottom"> <svg fill="#fff" id="Layer_1" x="0px" y="0px" viewBox="0 0 1921 819.8" 
//         style={{enableBackground: 'new 0 0 1921 819.8'}} > <path className="st0" d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"></path> </svg> 
//         </div>

//             <div className="container">
//               <div className="box card p-3 showdow border-0">
//                 <div className="text-center">
//                     <img src={Logo} />
//                 </div>

               

//                 <form className="mt-3">
//                   <h2 className="mb-4">Sign Up</h2>

//                     <div className="row">
//                         <div className="col-md-6">
//                           <div className="form-group">
//                               <TextField label="Name" type="text" required variant="standard" className="w-100" />
//                           </div>
//                         </div>  

//                         <div className="col-md-6">
//                           <div className="form-group">
//                               <TextField label="Phone No." type="text" required variant="standard" className="w-100" />
//                           </div>
//                         </div>  
//                     </div>  


//                     <div className="form-group">
//                         <TextField id="standard-basic" label="Email" type="email" required variant="standard" className="w-100" />
//                     </div>
//                     <div className="form-group">
//                         <TextField id="standard-basic" label="Password" type="password" required variant="standard" className="w-100" />
//                     </div>




//                     <a className="border-effect cursor txt">Forgot Password?</a>

//                     <div className="d-flex align-items-center mt-3 mb-3">
//                       <Button className="btn-blue col btn-lg btn-big">Sign In</Button>
//                       <Link to="/"> <Button className="btn-lg btn-big col ml-3" variant="outlined" onClick={() => context.setisHeaderFooterShow(true)}>Cancel</Button></Link>
//                     </div>

//                     <p className="txt">Not Registered? <Link to="/signUp" className="border-effect">Sign Up</Link></p>

//                     <h6 className="mt-4 text-center font-weight-bold">Or continue with social account</h6>

//                     <Button className="loginWithGoogle mt-2" variant="outlined"><img src={GoogleImg} /> Sign In with Google</Button>
                    

                    
                                                                

//                 </form>

//               </div>
//             </div>
//       </section>
//     )
// }

// export default SignUp;


import { useContext, useEffect } from "react";
import { MyContext } from "../../App"; 
import Logo from '../../assets/images/logo.jpg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import GoogleImg from '../../assets/images/googleimg.png';


const SignUp = () => {

    const context = useContext(MyContext);
    
    useEffect(() => {
        context.setisHeaderFooterShow(false);
    },[]);

    return (
      <section className="section signInPage signUpPage">
        <div className="shape-bottom"> <svg fill="#fff" id="Layer_1" x="0px" y="0px" viewBox="0 0 1921 819.8" 
        style={{enableBackground: 'new 0 0 1921 819.8'}} > <path className="st0" d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"></path> </svg> 
        </div>

            <div className="container">
              <div className="box card p-3 showdow border-0">
                <div className="text-center">
                    <img src={Logo} />
                </div>

               

                <form className="mt-2">
                <h2 className="mb-3">Sign Up</h2>


                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField label="Name" type="text" required variant="standard" className="w-100" />
                        </div>
                      </div>

                      <div className="col-md-6">
                          <div className="form-group">
                            <TextField label="Phone No." type="text" required variant="standard" className="w-100" />
                          </div>
                      </div>
                    </div>

                    <div className="form-group">
                        <TextField id="standard-basic" label="Email" type="email" required variant="standard" className="w-100" />
                    </div>
                    <div className="form-group">
                        <TextField id="standard-basic" label="Password" type="password" required variant="standard" className="w-100" />
                    </div>




                    <a className="border-effect cursor txt">Forgot Password?</a>

                    <div className="d-flex align-items-center mt-3 mb-3">
                      <div className="row w-100">
                        <div className="col-md-6">
                          <Button className="btn-blue w-100 btn-lg btn-big">Sign In</Button>
                        </div>

                        <div className="col-md-6 pr-0">
                          <Link to="/" className="d-block w-100"> <Button className="btn-lg btn-big w-100" variant="outlined" onClick={() => context.setisHeaderFooterShow(true)}>Cancel</Button></Link>
                        </div>
                      </div>
                    </div>

                    <p className="txt">Not Registered? <Link to="/signIn" className="border-effect">Sign In</Link></p>

                    <h6 className="mt-4 text-center font-weight-bold">Or continue with social account</h6>

                    <Button className="loginWithGoogle mt-2" variant="outlined"><img src={GoogleImg} /> Sign In with Google</Button>
                    

                    
                                                                

                </form>

              </div>
            </div>
      </section>
    )
}

export default SignUp;

