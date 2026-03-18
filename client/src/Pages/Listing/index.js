// import Sidebar from "../../Components/Sidebar";
// import Button from '@mui/material/Button';
// import { IoIosMenu } from "react-icons/io";
// import { CgMenuGridR } from "react-icons/cg";
// import { HiViewGrid } from "react-icons/hi";
// import { TfiLayoutGrid4Alt } from "react-icons/tfi";
// import { FaAngleDown } from "react-icons/fa6";
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { useState } from "react";
// import ProductItem from "../../Components/ProductItem";


// const Listing = () => {

//     const [anchorEl, setAnchorEl] = useState(null);
//     const [productView, setProductView] = useState(`four`);
//     const openDropdown = Boolean(anchorEl);
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };


//     return (
//         <>
//            <section className="product_Listing_Page">
//             <div className="container">
//                 <div className="productListing d-flex">
//                     <Sidebar/>

//                     <div className="content_right">
//                         <img src="https://klbtheme.com/bacola/wp-content/uploads/2021/08/bacola-banner-18.jpg" className="w-100" style={{borderRadius:'8px'}}/>


//                         <div className="showBy mt-3 mb-3 d-flex align-items-center">
//                             <div className="d-flex align-items-center btnWrapper">
//                                 <Button onClick={() => setProductView('one')}><IoIosMenu/></Button>
//                                 <Button onClick={() => setProductView('two')}><HiViewGrid/></Button>
//                                 <Button onClick={() => setProductView('three')}><CgMenuGridR/></Button>
//                                 <Button onClick={() => setProductView('four')}><TfiLayoutGrid4Alt/></Button>
//                             </div>

//                             <div className="ml-auto showByFilter">
//                                 <Button onClick={handleClick}>Show 9 <FaAngleDown/></Button>
//                                 <Menu
//                                     className="w-100 showPerPageDropdown"
//                                     id="basic-menu"
//                                     anchorEl={anchorEl}
//                                     open={openDropdown}
//                                     onClose={handleClose}
//                                     slotProps={{
//                                     list: {
//                                         'aria-labelledby': 'basic-button',
//                                     },
//                                     }}
//                                 >
//                                     <MenuItem onClick={handleClose}>10</MenuItem>
//                                     <MenuItem onClick={handleClose}>20</MenuItem>
//                                     <MenuItem onClick={handleClose}>30</MenuItem>
//                                     <MenuItem onClick={handleClose}>40</MenuItem>
//                                     <MenuItem onClick={handleClose}>50</MenuItem>
//                                     <MenuItem onClick={handleClose}>60</MenuItem>

//                                 </Menu>
//                             </div>
//                         </div>


//                         <div className="productListing">
//                             <ProductItem itemView={productView}/>
//                             <ProductItem itemView={productView}/>
//                             <ProductItem itemView={productView}/>
//                             <ProductItem itemView={productView}/>
//                             <ProductItem itemView={productView}/>
//                             <ProductItem itemView={productView}/>
//                             <ProductItem itemView={productView}/>
//                             <ProductItem itemView={productView}/>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//            </section>
//         </>
//     )
// }

// export default Listing;


// import Sidebar from "../../Components/Sidebar";
// import Button from '@mui/material/Button';
// import { IoIosMenu } from "react-icons/io";
// import { CgMenuGridR } from "react-icons/cg";
// import { HiViewGrid } from "react-icons/hi";
// import { TfiLayoutGrid4Alt } from "react-icons/tfi";
// import { FaAngleDown } from "react-icons/fa6";
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { useState } from "react";
// import ProductItem from "../../Components/ProductItem";

// const Listing = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [productView, setProductView] = useState("four");
//   const openDropdown = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <section className="product_Listing_Page">
//       <div className="container">
//         <div className="productListing d-flex">
//           <Sidebar />

//           <div className="content_right">
//             {/* Banner */}
//             <img
//               src="https://klbtheme.com/bacola/wp-content/uploads/2021/08/bacola-banner-18.jpg"
//               className="w-100"
//               style={{ borderRadius: "8px" }}
//               alt="banner"
//             />

//             {/* Toolbar */}
//             <div className="showBy mt-3 mb-3 d-flex align-items-center">
//               <div className="d-flex align-items-center btnWrapper">
//                 <Button
//                   className={`iconBtn ${productView === "one" ? "active" : ""}`}
//                   onClick={() => setProductView("one")}
//                 >
//                   <IoIosMenu size={20} />
//                 </Button>

//                 <Button
//                   className={`iconBtn ${productView === "two" ? "active" : ""}`}
//                   onClick={() => setProductView("two")}
//                 >
//                   <HiViewGrid size={20} />
//                 </Button>

//                 <Button
//                   className={`iconBtn ${productView === "three" ? "active" : ""}`}
//                   onClick={() => setProductView("three")}
//                 >
//                   <CgMenuGridR size={20} />
//                 </Button>

//                 <Button
//                   className={`iconBtn ${productView === "four" ? "active" : ""}`}
//                   onClick={() => setProductView("four")}
//                 >
//                   <TfiLayoutGrid4Alt size={20} />
//                 </Button>
//               </div>

//               {/* Dropdown */}
//               <div className="ml-auto showByFilter">
//                 <Button onClick={handleClick}>
//                   Show 9 <FaAngleDown />
//                 </Button>
//                 <Menu
//                   id="basic-menu"
//                   anchorEl={anchorEl}
//                   open={openDropdown}
//                   onClose={handleClose}
//                 >
//                   {[10, 20, 30, 40, 50, 60].map((num) => (
//                     <MenuItem key={num} onClick={handleClose}>
//                       {num}
//                     </MenuItem>
//                   ))}
//                 </Menu>
//               </div>
//             </div>

//             {/* Products */}
//             <div className={`productListing view-${productView}`}>
//               {Array.from({ length: 8 }).map((_, i) => (
//                 <ProductItem key={i} itemView={productView} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Listing;


import Sidebar from "../../Components/Sidebar";
import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { HiViewGrid } from "react-icons/hi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import ProductItem from "../../Components/ProductItem";
import Pagination from '@mui/material/Pagination';
import { useParams, useLocation } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from "react";
import newsLetterImg from "../../assets/images/coupon.png";
import { IoMailOutline } from "react-icons/io5";


const Listing = () => {
  const context = useContext(MyContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [productView, setProductView] = useState('four'); // default 4-grid
  const [filterPrice, setFilterPrice] = useState([100, 500000]);
  const [filterRating, setFilterRating] = useState();
  const [productData, setProductData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSubCategory, setCurrentSubCategory] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [type, setType] = useState("");
  const openDropdown = Boolean(anchorEl);
  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (num) => {
    setAnchorEl(null);
    if (typeof num === 'number') {
      setPerPage(num);
      setPage(1);
    }
  };

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage(1);
    setFilterPrice([100, 500000]);
    setFilterRating(null);

    if (location.pathname.includes("category")) {
      setType("category");
    } else {
      setType("subCat");
    }

    // Synchronize Ribbon and Title
    if (location.pathname.includes("category")) {
      if (context.categoryData?.length > 0) {
        const cat = context.categoryData.find(item => item._id === id || item.id === id);
        if (cat) {
          setCurrentCategory(cat.name);
          setCurrentSubCategory(""); // Clear subcategory on category page
          if (cat.name?.toLowerCase() === "facial" || cat.name?.toLowerCase() === "wellness") {
            setProductView('three');
          }
        }
      }
    } else {
      if (context.subCategoryData?.length > 0) {
        const sub = context.subCategoryData.find(item => item._id === id || item.id === id);
        if (sub) {
          setCurrentSubCategory(sub.subCat);
          setCurrentCategory(sub.category?.name);
          if (sub.subCat?.toLowerCase() === "facial" || sub.category?.name?.toLowerCase() === "facial" || sub.subCat?.toLowerCase() === "wellness" || sub.category?.name?.toLowerCase() === "wellness") {
            setProductView('three');
          }
        }
      }
    }
  }, [id, location.pathname, context.categoryData, context.subCategoryData]);


  useEffect(() => {
    setisLoading(true);

    let apiEndPoint = "";
    if (type === "category") {
      apiEndPoint = `/api/products?category=${id}&page=${page}&perPage=${perPage}&minPrice=${filterPrice[0]}&maxPrice=${filterPrice[1]}`;
    } else {
      apiEndPoint = `/api/products?subCatId=${id}&page=${page}&perPage=${perPage}&minPrice=${filterPrice[0]}&maxPrice=${filterPrice[1]}`;
    }

    if (filterRating) {
      apiEndPoint += `&rating=${filterRating}`;
    }

    fetchDataFromApi(apiEndPoint).then((res) => {
      setProductData(res.products);
      setTotalPages(res.totalPages);
      setisLoading(false);
    });
  }, [id, type, page, perPage, filterPrice, filterRating]);


  const filterByPrice = (price, subId) => {
    setFilterPrice(price);
  }

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  }

  const filterByRating = (rating, subId) => {
    setFilterRating(rating);
  }





  return (
    <section className="product_Listing_Page">
      <div className="container">
        <div className="productListing d-flex">
          {/* Left Sidebar */}
          <Sidebar filterByPrice={filterByPrice} filterByRating={filterByRating} categoryId={type === 'category' ? id : (context.subCategoryData.find(item => item._id === id || item.id === id)?.category?._id)} />

          {/* Right Content */}
          <div className="content_right">

            <div className="listingHeader mb-4">
              <h1 className="hd text-capitalize mb-0" style={{ fontSize: '22px' }}>{currentCategory} / {currentSubCategory}</h1>
              <p className="text-muted text-sml">Showing {productData?.length} results for {currentSubCategory}</p>
            </div>

            {/* Toolbar */}
            <div className="showBy mt-3 mb-3 d-flex align-items-center">
              <div className="d-flex align-items-center btnWrapper">
                <Button
                  className={productView === 'one' ? 'act' : ''}
                  onClick={() => setProductView("one")}
                >
                  <IoIosMenu size={20} />
                </Button>

                <Button
                  className={productView === 'two' ? 'act' : ''}
                  onClick={() => setProductView("two")}
                >
                  <HiViewGrid size={20} />
                </Button>

                <Button
                  className={productView === 'three' ? 'act' : ''}
                  onClick={() => setProductView("three")}
                >
                  <CgMenuGridR size={20} />
                </Button>

                <Button
                  className={productView === 'four' ? 'act' : ''}
                  onClick={() => setProductView("four")}
                >
                  <TfiLayoutGrid4Alt size={20} />
                </Button>
              </div>

              <div className="ml-auto showByFilter">
                <Button onClick={handleClick}>
                  Show 9 <FaAngleDown />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openDropdown}
                  onClose={handleClose}
                >
                  {[10, 20, 30, 40, 50, 60].map((num) => (
                    <MenuItem key={num} onClick={() => handleClose(num)}>
                      {num}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>

            {/* Product Items */}
            <div className={`productsWrapper ${productView}`}>
              {
                isLoading === true ? (
                  <div className="d-flex align-items-center justify-content-center w-100" style={{ minHeight: '300px' }}>
                    <CircularProgress />
                  </div>
                ) : (
                  productData?.map((item, index) => {
                    return (
                      <ProductItem key={index} itemView={productView} item={item} />
                    )
                  })
                )
              }
            </div>

            {/* Bottom Pagination */}
            <div className="d-flex align-items-center justify-content-center mt-5">
              <Pagination count={totalPages} page={page} color="primary" size="large" onChange={handlePageChange} />
            </div>

          </div>
        </div>
      </div>

      <br />
      <br />

      <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white mb-1">$20 discount for your first order</p>
              <h3 className="text-white">Join our newsletter and get...</h3>
              <p className="text-light">Join our email subscription now to get updates on<br /> promotions and coupons.</p>


              <form>
                <IoMailOutline />
                <input type="text" placeholder="Your Email Address" />
                <Button>Subscribe</Button>
              </form>

            </div>

            <div className="col-md-6">
              <img src={newsLetterImg} alt="newsletter" />
            </div>
          </div>
        </div>
      </section>
    </section>


  );
};

export default Listing;