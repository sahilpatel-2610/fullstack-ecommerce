import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import './responsive.css';
import Dashboard from './Pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import React, { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import ProductDetails from './Pages/ProductDetails';
import Products from './Pages/Products';
import ProductUpload from './Pages/Products/addProduct';
import EditProduct from './Pages/Products/editProduct';
import CategoryList from './Pages/Category/categoryList';
import CategoryAdd from './Pages/Category/addCategory';
import EditCategory from './Pages/Category/editCategory';
import SubCatAdd from './Pages/Category/addSubCat';
import SubCatList from './Pages/Category/subCategoryList';
import EditSubCategory from './Pages/Category/editSubCat';
import AddProductRAMS from './Pages/Products/addProductRAMS';
import ProductWeight from './Pages/Products/addProductWeight';
import ProductSize from './Pages/Products/addProductSize';
import Orders from './Pages/Orders';
import AddHomeBannerSlide from './Pages/HomeBanner/addHomeSlide';
import HomeBannerSlideList from './Pages/HomeBanner/homeSlideList';
import EditHomeBannerSlide from './Pages/HomeBanner/editSlide';
import Users from './Pages/Users';
import Reviews from './Pages/Reviews';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { IoMdClose } from "react-icons/io";

import LoadingBar from "react-top-loading-bar";
import { fetchDataFromApi } from './utils/api';

import axios from 'axios';
import countriesData from './utils/countries.json';


const MyContext = createContext();


function App() {

  const [isToggleSidebar, setISToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isHideSidebarAndHeader, setisHideSidebarAndHeader] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') === 'dark' ? true : false
  );

  const [catData, setCatData] = useState([]);
  const [subCatData, setSubCatData] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: ""
  });

  const [baseUrl, setBaseUrl] = useState("http://localhost:4000");

  const [progress, setProgress] = useState(0);
  const [alertBox, setAlertBox] = useState({
    msg: '',
    error: false,
    open: false
  });

  const [countryList, setCountryList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');



  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token !== "" && token !== undefined && token !== null) {
      setIsLogin(true);

      const userData = JSON.parse(localStorage.getItem("user"));

      setUser(userData);

    } else {
      setIsLogin(false);
    }

  }, [isLogin]);


  useEffect(() => {
    setCountryList(countriesData);
  }, []);


  useEffect(() => {
    if (theme === true) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertBox(prev => ({
      ...prev,
      open: false
    }));
  };

  useEffect(() => {
    setProgress(20);
    fetchCategory();
    fetchSubCategory();
  }, []);

  const fetchCategory = () => {
    fetchDataFromApi('/api/category').then((res) => {
      setCatData(res);
      setProgress(100);
    })
  }

  const fetchSubCategory = () => {
    fetchDataFromApi('/api/subCat').then((res) => {
      setSubCatData(res);
      setProgress(100);
    })
  }



  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const openNav = () => {
    setIsOpenNav(true);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname;

    if (token === "" || token === undefined || token === null) {
      setIsLogin(false);
      // If not logged in and not on login/signup page, redirect to login
      if (currentPath !== "/login" && currentPath !== "/signUp") {
        window.location.href = "/login";
      }
    } else {
      setIsLogin(true);
      // If logged in and on login/signup page, redirect to dashboard
      if (currentPath === "/login" || currentPath === "/signUp") {
        window.location.href = "/";
      }
    }
  }, [isLogin]);

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
    setAlertBox,
    setProgress,
    baseUrl,
    catData,
    fetchCategory,
    subCatData,
    fetchSubCategory,
    user,
    setUser,
    countryList,
    selectedLocation,
    setSelectedLocation,
    selectedCountry,
    setSelectedCountry
  }


  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {/* <SnackbarProvider maxSnack={3}> */}

        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          className='topLoadingBar'
        />

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
              <div className={`sidebarWrapper ${isToggleSidebar === true ? 'toggle' : ''
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
              <Route path="/product/details/:id" exact={true} element={<ProductDetails />} />
              <Route path="/product/upload" exact={true} element={<ProductUpload />} />
              <Route path="/product/edit/:id" exact={true} element={<EditProduct />} />
              <Route path="/category" exact={true} element={<CategoryList />} />
              <Route path="/category/add" exact={true} element={<CategoryAdd />} />
              <Route path="/category/edit/:id" exact={true} element={<EditCategory />} />
              <Route path="/subCategory/" exact={true} element={<SubCatList />} />
              <Route path="/subCategory/add" exact={true} element={<SubCatAdd />} />
              <Route path="/subCategory/edit/:id" exact={true} element={<EditSubCategory />} />
              <Route path="/productRAMS/add" exact={true} element={<AddProductRAMS />} />
              <Route path="/productWEIGHT/add" exact={true} element={<ProductWeight />} />
              <Route path="/productSIZE/add" exact={true} element={<ProductSize />} />
              <Route path="/orders" exact={true} element={<Orders />} />
              <Route path="/homeBannerSlide/add" exact={true} element={<AddHomeBannerSlide />} />
              <Route path="/homeBannerSlide/list" exact={true} element={<HomeBannerSlideList />} />
              <Route path="/homeBannerSlide/edit/:id" exact={true} element={<EditHomeBannerSlide />} />
              <Route path="/users" exact={true} element={<Users />} />
              <Route path="/reviews" exact={true} element={<Reviews />} />
            </Routes>
          </div>
        </div>

        <Snackbar
          open={alertBox.open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          sx={{ zIndex: 999999 }}
        >
          <div style={{
            backgroundColor: alertBox.error === true ? '#d32f2f' : '#2e7d32',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '4px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '14px',
            minWidth: '250px',
            justifyContent: 'space-between'
          }}>
            <span>{alertBox.msg}</span>
            <IoMdClose style={{ cursor: 'pointer', fontSize: '20px' }} onClick={handleClose} />
          </div>
        </Snackbar>

        {/* </SnackbarProvider>   */}
      </MyContext.Provider>
    </BrowserRouter>

  );
}

export default App;
export { MyContext };
