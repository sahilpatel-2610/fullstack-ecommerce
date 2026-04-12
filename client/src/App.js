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
import SearchPage from "./Pages/Search";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import MyList from "./Pages/MyList";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Checkout from "./Pages/Checkout";
import Orders from "./Pages/Orders";
import PaymentComplete from "./Pages/PaymentComplete";
import MyAccount from "./Pages/MyAccount";
import { fetchDataFromApi, postData, deleteData, editData } from "./utils/api";
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

  const [addingInCart, setAddingInCart] = useState(false);

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

  const [searchData, setSearchData] = useState([]);

  const [cartData, setCartData] = useState([]);
  const [myListData, setMyListData] = useState([]);




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

    // fetchDataFromApi(`/api/count`).then((res) => {
    //   setCartData(res);
    // })

  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "" && token !== undefined && token !== null) {
      const userData = JSON.parse(localStorage.getItem("user"));
      fetchDataFromApi(`/api/cart?userId=${userData?._id}`).then((res) => {
        if (res !== undefined && !res.error) {
          setCartData(res);
        } else {
          setCartData([]);
        }
      })
    }
  }, [isLogin]);

  const getCartData = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/cart?userId=${userData?._id}`).then((res) => {
      if (res !== undefined && !res.error) {
        setCartData(res);
      } else {
        setCartData([]);
      }
    })
  }

  const getMyListData = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/my-list?userId=${userData?._id}`).then((res) => {
      if (res !== undefined && !res.error) {
        setMyListData(res);
      } else {
        setMyListData([]);
      }
    })
  }



  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token !== "" && token !== undefined && token !== null) {
      setisLogin(true);

      const userData = JSON.parse(localStorage.getItem("user"));

      setUser(userData);
      getMyListData();
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
    try {
      const res = await axios.get(url);
      setCountryList(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertBox({
      open: false
    });
  };

  const addtoCart = (data) => {
    if (isLogin !== true) {
      setAlertBox({
        open: true,
        error: true,
        msg: "Please login to add products to cart"
      })
      return;
    }

    setAddingInCart(true);

    postData(`/api/cart/add`, data).then((res) => {
      if (res.status !== false && res.status !== "false" && res.success !== false && res.success !== "false") {
        setAlertBox({
          open: true,
          error: false,
          msg: "Item is added in the cart"

        })

        getCartData();

      } else {
        setAlertBox({
          open: true,
          error: true,
          msg: res.msg || res.error || "Failed to add item"

        })
      }

      setTimeout(() => {
        setAddingInCart(false);
      }, 1000);
    })
  }


  const updateCartItem = (id, data) => {
    editData(`/api/cart/${id}`, data).then((res) => {
      getCartData();
    })
  }

  const removeItemsFromCart = (id) => {
    deleteData(`/api/cart/${id}`).then((res) => {
      setAlertBox({
        open: true,
        error: false,
        msg: "Item is removed from the cart"

      })
      getCartData();
    })
  }

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
    setUser,
    addtoCart,
    addingInCart,
    setAddingInCart,
    cartData,
    setCartData,
    getCartData,
    removeItemsFromCart,
    updateCartItem,
    myListData,
    setMyListData,
    getMyListData,
    searchData,
    setSearchData
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

        {
          isHeaderFooterShow === true && <Header />
        }




        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/search" exact={true} element={<SearchPage />} />
          <Route path="/products/category/:id" exact={true} element={<Listing />} />
          <Route path="/products/subCat/:id" exact={true} element={<Listing />} />
          <Route exact={true} path="/product/:id" element={<ProductDetails />} />
          <Route exact={true} path="/cart" element={<Cart />} />
          <Route exact={true} path="/my-list" element={<MyList />} />
          <Route exact={true} path="/signIn" element={<SignIn />} />
          <Route exact={true} path="/signUp" element={<SignUp />} />
          <Route exact={true} path="/checkout" element={<Checkout />} />
          <Route exact={true} path="/orders" element={<Orders />} />
          <Route exact={true} path="/payment/complete/:id" element={<PaymentComplete />} />
          <Route exact={true} path="/my-account" element={<MyAccount />} />
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