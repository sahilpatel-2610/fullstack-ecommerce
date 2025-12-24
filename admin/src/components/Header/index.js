
import React,{ useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import SearchBox from "../SearchBox";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import { IoShieldHalfSharp } from "react-icons/io5";
import Divider from '@mui/material/Divider';
import { MyContext } from "../../App";
import { useContext } from "react";
import UserAvtarImgComponent from "../userAvtarImg";


const Header = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpennotificationDrop, setisOpennotificationDrop] = useState(false);
  const openMyAcc = Boolean(anchorEl);
  const openNotifications = Boolean(isOpennotificationDrop);


  const context = useContext(MyContext);

  const handleOpenMyAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };

  const handleOpennotificationsDrop = () => {
    setisOpennotificationDrop(true);
  }

  const handleClosenotificationsDrop = () => {
    setisOpennotificationDrop(false);
  }

  return (
    <header className="d-flex align-items-center">
      <div className="container-fluid w-100">
        <div className="row d-flex align-items-center w-100">
          {/* Logo Wrapper */}
          <div className="col-sm-2 part1">
            <Link to={'/'} className="d-flex align-items-center logo">
              <img src={logo} />
              <span className="ml-2">ECOMMERCE</span>
            </Link>
          </div>

          {
              context.windowWidth > 992 && 
              <div className="col-sm-3 d-flex align-items-center part2 res-hide">
            <Button className="rounded-circle mr-3" onClick={()=>context.setISToggleSidebar(!context.isToggleSidebar)}>
              {
                context.isToggleSidebar===false ? <MdMenuOpen /> : <MdOutlineMenu />
              }
            </Button>
            <SearchBox />
          </div>

          }

          

          <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
            <Button className="rounded-circle mr-3" onClick={()=>context.setTheme(!context.theme)}>
              <MdOutlineLightMode />
            </Button>
      
            
           
            

            <div className="dropdownWrapper position-relative">
              <Button className="rounded-circle mr-3" onClick={handleOpennotificationsDrop}><FaRegBell /></Button>

              <Button className="rounded-circle mr-3" onClick={() => context.openNav()}><IoMenu /></Button>


              <Menu
                  anchorEl={isOpennotificationDrop}
                  className="notifications dropdown_list"
                  id="notifications"
                  open={openNotifications}
                  onClose={handleClosenotificationsDrop}
                  onClick={handleClosenotificationsDrop}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >

                  <div className="head pl-3 pb-0">
                    <h4>Orders (17) </h4>
                  </div>

                  <Divider className="mb-1" />

                <div className="scroll">
                    
                  <MenuItem onClick={handleCloseMyAccDrop}>
                      <div className="d-flex">
                        <div>
                            <UserAvtarImgComponent img={'https://api.spicezgold.com/download/file_1734529702603_eyebogler-solid-men-polo-neck-regular-fit-half-sleeves-ethereal-blue-melange-t-shirt-product-images-rvjbg2r4o6-0-202308021954.webp'} />
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>John </b>
                              added to his favorite list 
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>
                          <p className="text-sky mb-0">few seconds ago</p>
                        </div>

                      </div>
                  </MenuItem>

                   <MenuItem onClick={handleCloseMyAccDrop}>
                      <div className="d-flex">
                        <div>
                            <div className="userImg">
                                <span className="rounded-circle">
                                    {/* <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" /> */}
                                    <img src="https://api.spicezgold.com/download/file_1734529702603_eyebogler-solid-men-polo-neck-regular-fit-half-sleeves-ethereal-blue-melange-t-shirt-product-images-rvjbg2r4o6-0-202308021954.webp" />
                                </span>
                            </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>John </b>
                              added to his favorite list 
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>
                          <p className="text-sky mb-0">few seconds ago</p>
                        </div>

                      </div>
                  </MenuItem>

                   <MenuItem onClick={handleCloseMyAccDrop}>
                      <div className="d-flex">
                        <div>
                            <div className="userImg">
                                <span className="rounded-circle">
                                    {/* <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" /> */}
                                    <img src="https://api.spicezgold.com/download/file_1734529702603_eyebogler-solid-men-polo-neck-regular-fit-half-sleeves-ethereal-blue-melange-t-shirt-product-images-rvjbg2r4o6-0-202308021954.webp" />
                                </span>
                            </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>John </b>
                              added to his favorite list 
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>
                          <p className="text-sky mb-0">few seconds ago</p>
                        </div>

                      </div>
                  </MenuItem>

                   <MenuItem onClick={handleCloseMyAccDrop}>
                      <div className="d-flex">
                        <div>
                            <div className="userImg">
                                <span className="rounded-circle">
                                    {/* <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" /> */}
                                    <img src="https://api.spicezgold.com/download/file_1734529702603_eyebogler-solid-men-polo-neck-regular-fit-half-sleeves-ethereal-blue-melange-t-shirt-product-images-rvjbg2r4o6-0-202308021954.webp" />
                                </span>
                            </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>John </b>
                              added to his favorite list 
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>
                          <p className="text-sky mb-0">few seconds ago</p>
                        </div>

                      </div>
                  </MenuItem>

                   <MenuItem onClick={handleCloseMyAccDrop}>
                      <div className="d-flex">
                        <div>
                            <div className="userImg">
                                <span className="rounded-circle">
                                    {/* <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" /> */}
                                    <img src="https://api.spicezgold.com/download/file_1734529702603_eyebogler-solid-men-polo-neck-regular-fit-half-sleeves-ethereal-blue-melange-t-shirt-product-images-rvjbg2r4o6-0-202308021954.webp" />
                                </span>
                            </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>John </b>
                              added to his favorite list 
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>
                          <p className="text-sky mb-0">few seconds ago</p>
                        </div>

                      </div>
                  </MenuItem>

                   <MenuItem onClick={handleCloseMyAccDrop}>
                      <div className="d-flex">
                        <div>
                            <div className="userImg">
                                <span className="rounded-circle">
                                    {/* <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" /> */}
                                    <img src="https://api.spicezgold.com/download/file_1734529702603_eyebogler-solid-men-polo-neck-regular-fit-half-sleeves-ethereal-blue-melange-t-shirt-product-images-rvjbg2r4o6-0-202308021954.webp" />
                                </span>
                            </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>John </b>
                              added to his favorite list 
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>
                          <p className="text-sky mb-0">few seconds ago</p>
                        </div>

                      </div>
                  </MenuItem>

                   <MenuItem onClick={handleCloseMyAccDrop}>
                      <div className="d-flex">
                        <div>
                            <div className="userImg">
                                <span className="rounded-circle">
                                    {/* <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" /> */}
                                    <img src="https://api.spicezgold.com/download/file_1734529702603_eyebogler-solid-men-polo-neck-regular-fit-half-sleeves-ethereal-blue-melange-t-shirt-product-images-rvjbg2r4o6-0-202308021954.webp" />
                                </span>
                            </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>John </b>
                              added to his favorite list 
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>
                          <p className="text-sky mb-0">few seconds ago</p>
                        </div>

                      </div>
                  </MenuItem>
                  
                </div>
 
                <div className='pl-3 pr-3 w-100 pt-2 pb-1'>
                   <Button className='btn-blue w-100'>View all notifications</Button>
                </div> 
       
              </Menu>

              
            </div>


            {
              context.isLogin !== true ? 
              <Link to={'/login'}><Button className='btn-blue btn-lg btn-round'>Sign In</Button></Link> 
                : 
              
                <div className="myAccWrapper">
                  <Button className="myAcc d-flex align-items-center" onClick={handleOpenMyAccDrop}>
                <div className="userImg">
                  <span className="rounded-circle">
                    {/* <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" /> */}
                    {/* <img src="https://api.spicezgold.com/download/file_1734529702603_eyebogler-solid-men-polo-neck-regular-fit-half-sleeves-ethereal-blue-melange-t-shirt-product-images-rvjbg2r4o6-0-202308021954.webp" /> */}
                    <img src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                  </span>
                </div>

                <div className="userInfo res-hide">
                  <h4>United kingdom</h4>
                  <p className="mb-0"> &nbsp; @london7227</p>
                </div>



                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={openMyAcc}
                    onClose={handleCloseMyAccDrop}
                    onClick={handleCloseMyAccDrop}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={handleCloseMyAccDrop}>
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      My Account
                    </MenuItem>
                    <MenuItem onClick={handleCloseMyAccDrop}>
                      <ListItemIcon>
                        <IoShieldHalfSharp />
                      </ListItemIcon>
                      Reset Password
                    </MenuItem>
                    <MenuItem onClick={handleCloseMyAccDrop}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>

                </div>
            }  
           



          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;




// import { Link } from "react-router-dom";
// import logo from "../../assets/images/logo.png";
// import Button from "@mui/material/Button";
// import { MdMenuOpen } from "react-icons/md";
// import { MdOutlineMenu } from "react-icons/md";
// import SearchBox from "../SearchBox";

// const Header = () => {
//   return (
//     <header className="d-flex align-items-center">
//       <div className="container-fluid w-100">
//         <div className="row d-flex align-items-center w-100">
//           {/* Logo + Text + Icon All in One Line */}
//           <div className="col-sm-2 d-flex align-items-center part1">
//             <Link
//               to="/"
//               className="d-flex align-items-center logo"
//             >
//               <img src={logo} />
//               <span className="ml-2">ECOMMERCE</span>
//             </Link>


//             {/* Icon just beside text */}
//             <div className="col-sm-3 d-flex align-items-center part2 pl-4">
//                 <Button
//                     className="rounded-circle mr-3 "
//                 >
//                 <MdMenuOpen  />
//                 </Button>
//                 <SearchBox />   
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;




// import { Link } from "react-router-dom";
// import logo from "../../assets/images/logo.png";
// import Button from "@mui/material/Button";
// import { MdMenuOpen } from "react-icons/md";
// import SearchBox from "../SearchBox";

// const Header = () => {
//   return (
//     <header className="header-wrapper py-2 shadow-sm bg-white">
//       <div className="container-fluid">
//         <div className="row align-items-center">
//           {/* === Left side: Logo + Text + Icon + SearchBox All in One Line === */}
//           <div className="col d-flex align-items-center">
//             {/* Logo + Text */}
//             <Link
//               to="/"
//               className="d-flex align-items-center text-decoration-none"
//             >
//               <img
//                 src={logo}
//                 alt="Logo"
//                 style={{ width: "40px", height: "40px", objectFit: "contain" }}
//               />
//               <span className="ml-2 fw-bold text-dark fs-5">ECOMMERCE</span>
//             </Link>

//             {/* Icon beside text */}
//             <Button
//               className="rounded-circle ms-3"
             
//             >
//               <MdMenuOpen  />
//             </Button>

//             {/* Search Box beside icon */}
//             <div className="ms-3">
//               <SearchBox />
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;