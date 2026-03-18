import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "./Components/Footer";
import ProductModal from "./Components/ProductModal";
import Listing from "./Pages/Listing";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { fetchDataFromApi } from "./utils/api";
import LoadingBar from 'react-top-loading-bar';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const MyContext = createContext();

function App() {

  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isOpenProductModal, setisOpenProductModal] = useState({
    id: '',
    open: false
  });
  const [isHeaderFooterShow, setisHeaderFooterShow] = useState(true);
  const [isLogin, setisLogin] = useState(false);
  const [productData, setProductData] = useState();

  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [activeCat, setActiveCat] = useState([]);
  const [alertBox, setAlertBox] = useState({
    msg: '',
    error: false,
    open: false
  });
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: ""
  })



  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");

    fetchDataFromApi("/api/category").then((res) => {
      setCategoryData(res?.categoryList);
      if (res?.categoryList?.length > 0) {
        setActiveCat(res.categoryList[0]?.name);
      }
    })

    fetchDataFromApi("/api/subCat").then((res) => {
      setSubCategoryData(res?.subCategoryList);
    })

    const token = localStorage.getItem("token");
    if (token !== "" && token !== undefined && token !== null) {
      setisLogin(true);
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    }

  }, []);


  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token !== "" && token !== undefined && token !== null) {
      setisLogin(true);

      const userData = JSON.parse(localStorage.getItem("user"));

      setUser(userData);

    } else {
      setisLogin(false);
    }

  }, [isLogin]);



  useEffect(() => {
    if (isOpenProductModal.open === true) {
      fetchDataFromApi(`/api/products/${isOpenProductModal.id}`).then((res) => {
        setProductData(res);
      })
    }
  }, [isOpenProductModal]);

  const getCountry = async (url) => {
    await axios.get(url).then((res) => {
      setCountryList(res.data.data);
      console.log(res.data.data);
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertBox({
      open: false
    });
  };



  const values = {
    countryList,
    setSelectedCountry,
    selectedCountry,
    isOpenProductModal,
    setisOpenProductModal,
    isHeaderFooterShow,
    setisHeaderFooterShow,
    isLogin,
    setisLogin,
    productData,
    setProductData,
    categoryData,
    setCategoryData,
    subCategoryData,
    setSubCategoryData,
    activeCat,
    setActiveCat,
    alertBox,
    setAlertBox,
    setProgress,
    user,
    setUser
  };



  return (
    <Router>
      <MyContext.Provider value={values}>
        <LoadingBar
          color='#6d4aae'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          className='topLoadingBar'
        />
        {
          isHeaderFooterShow === true && <Header />
        }


        <Snackbar open={alertBox.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertBox.error === true ? "error" : 'success'}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>

        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/products/category/:id" exact={true} element={<Listing />} />
          <Route path="/products/subCat/:id" exact={true} element={<Listing />} />
          <Route exact={true} path="/product/:id" element={<ProductDetails />} />
          <Route exact={true} path="/cart" element={<Cart />} />
          <Route exact={true} path="/signIn" element={<SignIn />} />
          <Route exact={true} path="/signUp" element={<SignUp />} />
        </Routes>
        {
          isHeaderFooterShow === true && <Footer />
        }




        {
          isOpenProductModal.open === true && <ProductModal data={productData} />
        }


      </MyContext.Provider>
    </Router>
  );
}

export default App;

export { MyContext };