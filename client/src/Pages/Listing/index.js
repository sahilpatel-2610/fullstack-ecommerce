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
import { useState } from "react";
import ProductItem from "../../Components/ProductItem";
import Pagination from '@mui/material/Pagination';


const Listing = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [productView, setProductView] = useState(`four`); // default 4-grid
  const openDropdown = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <section className="product_Listing_Page">
      <div className="container">
        <div className="productListing d-flex">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Right Content */}
          <div className="content_right">
            {/* Banner */}
            <img
              src="https://klbtheme.com/bacola/wp-content/uploads/2021/08/bacola-banner-18.jpg"
              className="w-100"
              style={{ borderRadius: "8px" }}
              alt="banner"
            />

            {/* Toolbar */}
            <div className="showBy mt-3 mb-3 d-flex align-items-center">
              <div className="d-flex align-items-center btnWrapper">
                <Button
                  className={productView==='one' && 'act'}
                  onClick={() => setProductView("one")}
                >
                  <IoIosMenu size={20} />
                </Button>

                <Button
                  className={productView==='tow' && 'act'}
                  onClick={() => setProductView("two")}
                >
                  <HiViewGrid size={20} />
                </Button>

                <Button
                  className={productView==='three' && 'act'}
                  onClick={() => setProductView("three")}
                >
                  <CgMenuGridR size={20} />
                </Button>

                <Button
                  className={productView==='four' && 'act'}
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
                    <MenuItem key={num} onClick={handleClose}>
                      {num}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>

            {/* Product Items */}
            <div className={`productsWrapper ${productView}`}>
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductItem key={i} itemView={productView} />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductItem key={i} itemView={productView} />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductItem key={i} itemView={productView} />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductItem key={i} itemView={productView} />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductItem key={i} itemView={productView} />
              ))}
            </div>




              <div className="d-flex align-items-center justify-content-center mt-5">
                 <Pagination count={10} color="primary" size="large" />
              </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Listing;