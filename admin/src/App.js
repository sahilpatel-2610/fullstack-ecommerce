// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import './App.css';
// import Dashboard from "./Pages/Dashboard";
// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
// import { createContext, useEffect, useState } from "react";
// import Login from "./Pages/Login";
// import SignUp from "./Pages/SignUp";
// import Products from "./Pages/Products";
// import ProductDetails from "./Pages/ProductDetails";
// import ProductUpload from "./Pages/ProductUpload";
// import CategoryAdd from "./Pages/CategoryAdd";


// export const MyContext = createContext();

// function App() {

//   const [isToggleSidebar, setIsToggleSidebar] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
//   const [themeMode, setThemeMode] = useState(true);

//   useEffect(() => {

 
//     const theme_Mode = localStorage.getItem('themeMode');

//     if(theme_Mode === true){
//       document.body.classList.remove('dark');
//       document.body.classList.add('light');
//       localStorage.setItem('themeMode', 'light');
//     }
//     else{
//       document.body.classList.remove('light');
//       document.body.classList.add('dark');
//       localStorage.setItem('themeMode', 'dark');
//     }

//   },[themeMode]);


//   const values = {
//     isToggleSidebar,
//     setIsToggleSidebar,
//     isLogin,
//     setIsLogin,
//     isHideSidebarAndHeader,
//     setIsHideSidebarAndHeader,
//     themeMode,
//     setThemeMode
//   }

//   return (
//     <BrowserRouter>
//       <MyContext.Provider value={values}>
//         {
//           isHideSidebarAndHeader !== true && <Header />
//         }
//         <div className="main d-flex">
//           {
//             isHideSidebarAndHeader !== true && 
//             <div className={`sidebarWrapper ${isToggleSidebar === true ? 'toggle' : ''}`}>
//               <Sidebar />
//             </div>
//           }


//           <div className={`context ${isHideSidebarAndHeader === true ? 'full' : ''} ${isToggleSidebar === true ? 'toggle' : ''}`}>
//             <Routes>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/dashboard" exact={true} element={<Dashboard />} />
//               <Route path="/login" exact={true} element={<Login />} />
//               <Route path="/signup" exact={true} element={<SignUp />} />
//               <Route path="/products" exact={true} element={<Products />} />
//               <Route path="/product/details" exact={true} element={<ProductDetails />} />
//               <Route path="/product/upload" exact={true} element={<ProductUpload />} />
//               <Route path="/category/add" exact={true} element={<CategoryAdd />} />
//             </Routes>
//           </div>
          
//         </div>
//       </MyContext.Provider>
//     </BrowserRouter>
//   );
// }




// export default App;

import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { createContext, useEffect, useState } from "react";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import ProductUpload from "./Pages/ProductUpload";
import CategoryAdd from "./Pages/CategoryAdd";

export const MyContext = createContext();

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  const [themeMode, setThemeMode] = useState(true);

  useEffect(() => {
    const theme_Mode = localStorage.getItem("themeMode");
    if (theme_Mode === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [themeMode]);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setIsHideSidebarAndHeader,
    themeMode,
    setThemeMode,
  };

  return (
    <MyContext.Provider value={values}>
      {isHideSidebarAndHeader !== true && <Header />}
      <div className="main d-flex">
        {isHideSidebarAndHeader !== true && (
          <div
            className={`sidebarWrapper ${
              isToggleSidebar === true ? "toggle" : ""
            }`}
          >
            <Sidebar />
          </div>
        )}

        <div
          className={`context ${
            isHideSidebarAndHeader === true ? "full" : ""
          } ${isToggleSidebar === true ? "toggle" : ""}`}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/details" element={<ProductDetails />} />
            <Route path="/product/upload" element={<ProductUpload />} />
            <Route path="/category/add" element={<CategoryAdd />} />
          </Routes>
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
