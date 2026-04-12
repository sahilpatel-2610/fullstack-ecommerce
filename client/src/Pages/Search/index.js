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
import { MyContext } from "../../App";
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from "react";
import newsLetterImg from "../../assets/images/coupon.png";
import { IoMailOutline } from "react-icons/io5";


const SearchPage = () => {

  const context = useContext(MyContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [productView, setProductView] = useState('four'); // default 4-grid
  const [filterPrice, setFilterPrice] = useState([100, 500000]);
  const [filterRating, setFilterRating] = useState();
  const [productData, setProductData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isLoading, setisLoading] = useState(false);
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

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage(1);
    setFilterPrice([100, 500000]);
    setFilterRating(null);

    setisLoading(true);
    setProductData(context.searchData);
    setisLoading(false);

  }, [context.searchData]);


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
          <Sidebar filterByPrice={filterByPrice} filterByRating={filterByRating} categoryId={""} />

          {/* Right Content */}
          <div className="content_right">

            <div className="listingHeader mb-4">
              <h1 className="hd text-capitalize mb-0" style={{ fontSize: '22px' }}>Search Results</h1>
              <p className="text-muted text-sml">Showing {productData?.length} results</p>
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
                  Array.isArray(productData) && productData.length > 0 ? (
                    productData.map((item, index) => {
                      return (
                        <ProductItem key={index} itemView={productView} item={item} />
                      )
                    })
                  ) : (
                    <div className="d-flex align-items-center justify-content-center w-100" style={{ minHeight: '300px' }}>
                      <h4 className="text-muted">No products found for this search.</h4>
                    </div>
                  )
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

export default SearchPage;