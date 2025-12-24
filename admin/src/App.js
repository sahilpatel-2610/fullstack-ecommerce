import { BrowserRouter, Route, Routes,} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './responsive.css';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import React,{ createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Category from './pages/Category';
import ProductUpload from './pages/ProductUpload';
import CategoryAdd from './pages/CategoryAdd';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const MyContext = createContext();


function App() {

  const [isToggleSidebar, setISToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isHideSidebarAndHeader, setisHideSidebarAndHeader] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');

  const [alertBox, setAlertBox] = useState({
    msg: '',
    error: false,
    open: false
  });
  
  // const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {

    // const theme = localStorage.getItem('theme');


    if(theme === true){
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('theme','dark');
    }
    else{
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      localStorage.setItem('theme','light');
    }
    
  },[theme]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertBox({
      open: false
    });
  };

  
    
  // const handleClickVariant = (variant) => () => {
  //       // variant could be success, error, warning, info, or default
  //       enqueueSnackbar('This is a success message!', { variant });
  // };


 

  useEffect(() => {

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }

  },[]);

  const openNav = () => {
    setIsOpenNav(true);
  }

  const values = {
    isToggleSidebar, 
    setISToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
    theme,
    setTheme,
    windowWidth,
    openNav,
    isOpenNav,
    setIsOpenNav,
    // handleClickVariant
    alertBox,
    setAlertBox
  }

 
  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {/* <SnackbarProvider maxSnack={3}> */}

        <Snackbar open={alertBox.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertBox.error === true ? "success" : 'error'}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>
          {
            isHideSidebarAndHeader !== true && 
            <Header />
          }

          <div className='main d-flex'>
            {
              isHideSidebarAndHeader !== true && 
              <>
                <div className={`sidebarOverlay d-none ${isOpenNav === true && 'show'}`} onClick={() => setIsOpenNav(false)}>

                </div>
                <div className={`sidebarWrapper ${
                  isToggleSidebar === true ? 'toggle' : ''
                } ${isOpenNav === true ? 'open' : ''}`}
              >
                  <Sidebar />
                </div>
              </>

            }

            <div className={`content ${isHideSidebarAndHeader === true && 'full'} ${isToggleSidebar === true ? 'toggle' : ''}`}>
              <Routes>
                  <Route path="/" exact={true} element={<Dashboard />} />
                  <Route path="/dashboard" exact={true} element={<Dashboard />} />
                  <Route path="/login" exact={true} element={<Login />} />
                  <Route path="/signUp" exact={true} element={<SignUp />} />
                  <Route path="/products" exact={true} element={<Products />} />
                  <Route path="/product/details" exact={true} element={<ProductDetails />} />
                  <Route path="/product/upload" exact={true} element={<ProductUpload />} />
                  <Route path="/category/add" exact={true} element={<CategoryAdd />} />
                  <Route path="/category" exact={true} element={<Category />} />
              </Routes>
            </div>
          </div>

        {/* </SnackbarProvider>   */}
      </MyContext.Provider>
    </BrowserRouter>
    
  );
}

export default App;
export { MyContext };
