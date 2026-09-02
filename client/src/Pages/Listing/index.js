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
import NewsLetter from "../../Components/NewsLetter";


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

    if (location.pathname.includes("banner-products")) {
      setType("banner");
      setCurrentCategory("Exclusive Banner Collection");
      setCurrentSubCategory("");
    } else if (location.pathname.includes("category")) {
      setType("category");
    } else {
      setType("subCat");
    }

    // Synchronize Ribbon and Title
    if (location.pathname.includes("banner-products")) {
      setCurrentCategory("Exclusive Banner Collection");
      setCurrentSubCategory("");
    } else if (location.pathname.includes("category")) {
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
        const sub = context.subCategoryData.find(item => item._id === id || item.id === id || item.name?.toLowerCase() === id?.toLowerCase() || encodeURIComponent(item.name)?.toLowerCase() === id?.toLowerCase());
        if (sub) {
          setCurrentSubCategory(sub.name);
          const parent = context.categoryData?.find(cat => cat._id === sub.parentId || cat.id === sub.parentId || cat.name?.toLowerCase() === sub.category?.toLowerCase());
          setCurrentCategory(parent?.name || sub.category || "");
          if (sub.name?.toLowerCase() === "facial" || parent?.name?.toLowerCase() === "facial" || sub.name?.toLowerCase() === "wellness" || parent?.name?.toLowerCase() === "wellness") {
            setProductView('three');
          }
        } else {
          setCurrentSubCategory(decodeURIComponent(id));
        }
      } else {
        setCurrentSubCategory(decodeURIComponent(id));
      }
    }
  }, [id, location.pathname, context.categoryData, context.subCategoryData]);


  useEffect(() => {
    setisLoading(true);

    const locationParam = context.selectedCountry && context.selectedCountry !== "All" ? `&location=${context.selectedCountry}` : '';
    let apiEndPoint = "";
    if (type === "category") {
      apiEndPoint = `/api/products?category=${id}&page=${page}&perPage=${perPage}&minPrice=${filterPrice[0]}&maxPrice=${filterPrice[1]}${locationParam}`;
    } else if (type === "banner") {
      apiEndPoint = `/api/products?page=${page}&perPage=${perPage}&minPrice=${filterPrice[0]}&maxPrice=${filterPrice[1]}${locationParam}`;
    } else {
      apiEndPoint = `/api/products?subCatId=${id}&page=${page}&perPage=${perPage}&minPrice=${filterPrice[0]}&maxPrice=${filterPrice[1]}${locationParam}`;
    }

    if (filterRating) {
      apiEndPoint += `&rating=${filterRating}`;
    }

    fetchDataFromApi(apiEndPoint).then((res) => {
      setProductData(res?.products || []);
      setTotalPages(res?.totalPages || 1);
      setisLoading(false);
    }).catch(() => setisLoading(false));
  }, [id, type, page, perPage, filterPrice, filterRating, context.selectedCountry]);


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
          <Sidebar filterByPrice={filterByPrice} filterByRating={filterByRating} categoryId={type === 'category' ? id : (context.subCategoryData?.find(item => item._id === id || item.id === id)?.parentId)} />

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

      <NewsLetter />
    </section>


  );
};

export default Listing;