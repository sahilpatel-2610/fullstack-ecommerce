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
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";
import { useContext } from "react";
import newsLetterImg from "../../assets/images/coupon.png";
import { IoMailOutline } from "react-icons/io5";


const Listing = () => {
  const context = useContext(MyContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [productView, setProductView] = useState('four'); // default 4-grid
  const [subCatId, setSubCatId] = useState('');
  const [filterPrice, setFilterPrice] = useState([100, 500000]);
  const [filterRating, setFilterRating] = useState();
  const [productData, setProductData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSubCategory, setCurrentSubCategory] = useState("");
  const openDropdown = Boolean(anchorEl);

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
    setSubCatId(id);
    setPage(1);
    setFilterPrice([100, 500000]);
    setFilterRating(null);

    // Synchronize Ribbon and Title
    if (context.subCategoryData?.length > 0 && id) {
      const sub = context.subCategoryData.find(item => item._id === id);
      if (sub) {
        setCurrentSubCategory(sub.subCat);
        setCurrentCategory(sub.category?.name);
      }
    }
  }, [id, context.categoryData, context.subCategoryData]);

  useEffect(() => {
    let url = `/api/products?subCatId=${subCatId}&page=${page}&perPage=${perPage}&minPrice=${filterPrice[0]}&maxPrice=${filterPrice[1]}`;
    if (filterRating) {
      url += `&rating=${filterRating}`;
    }

    fetchDataFromApi(url).then((res) => {
      setProductData(res.products);
      setTotalPages(res.totalPages);
    })
  }, [subCatId, page, perPage, filterPrice, filterRating]);


  const filterByPrice = (price, subId) => {
    setFilterPrice(price);
    setSubCatId(subId);
  }

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  }

  const filterByRating = (rating, subId) => {
    setFilterRating(rating);
    setSubCatId(subId);
  }





  return (
    <section className="product_Listing_Page">
      <div className="container">
        <div className="productListing d-flex">
          {/* Left Sidebar */}
          <Sidebar filterByPrice={filterByPrice} filterByRating={filterByRating} />

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
                productData?.map((item, index) => {
                  return (
                    <ProductItem key={index} itemView={productView} item={item} />
                  )
                })
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