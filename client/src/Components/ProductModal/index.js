// import Dialog from '@mui/material/Dialog';
// import Button from '@mui/material/Button';
// import { MdClose } from "react-icons/md";
// import Rating from '@mui/material/Rating';
// import fade from '@mui/material/Fade';
// import Slider from "react-slick";
// import { useContext, useRef, useState } from 'react';
// import InnerImageZoom from 'react-inner-image-zoom';
// import 'react-inner-image-zoom/lib/styles.min.css'; 

// import QuantityBox from '../QuantityBox';
// import { IoIosHeartEmpty } from "react-icons/io";
// import { MdOutlineCompareArrows } from "react-icons/md";
// import { MyContext } from '../../App';
// import Swiper from 'swiper';
// import { Navigation } from 'swiper/modules';
// import {setSlideIndex} from 'react';
// import { SwiperSlide } from 'swiper/react';



// const ProductModal = (props) => {

//     const [slideIndex, setSlideIndex] = useState(0);
//     const zoomSliderBig = useRef();
//     const zoomSlider = useRef();

//     const context = useContext(MyContext);


//     const goto = (index) => {
//         setSlideIndex(index);
//         zoomSlider.current.swiper.slickTo(index);
//         zoomSliderBig.current.swiper.slickTo(index);
//     }

//     return (
//         <>

//             <Dialog  open={true} className="productModal" onClose={() => context.setisOpenProductModal(false)}>
//                 <Button className='close_' onClick={() => context.setisOpenProductModal(false)}><MdClose /></Button>
//                 <h4 className="mb-1 font-weight-bold">All Natural Italian-Style Chicken Meatballs</h4>
//                 <div className='d-flex align-items-center'>
//                     <div className='d-flex align-items-center mr-4'> 
//                         <span>Brands:</span>
//                         <span className='ml-2'>Welch's</span>
//                     </div>


//                     <Rating className="read-only" value={5} size="small" precision={0.5} readOnly />


//                 </div>
//                 <hr />

//                 <div className='row mt-2 productDetailsModal'>
//                     <div className='col-md-5'>
//                         <div className='productZoom position-relative'>
//                             <div className='badge badge-primary'>23%</div>
//                             <Swiper 
//                                 slidesPerView={1}
//                                 spaceBetween={0}
//                                 navigation={false}
//                                 slidesPerGroup={1}
//                                 modules={[Navigation]}
//                                 className="zoomSliderBig"
//                                 ref={zoomSliderBig}
//                             >    
                           
//                             <SwiperSlide>
//                                 <div className='item'>
//                                     <InnerImageZoom zoomType="hover" zoomScale={1} src={`https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg`} />
//                                 </div>

//                                 <div className='item'>
//                                     <InnerImageZoom zoomType="hover" zoomScale={1} src={`https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image2-47.jpg`} />
//                                 </div>

//                                 <div className='item'>
//                                     <InnerImageZoom zoomType="hover" zoomScale={1} src={`https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image3-35.jpg`} />
//                                 </div>

//                             </SwiperSlide>
//                             </Swiper>
//                         </div>


//                         <Swiper
//                             slidesPerView={4}
//                             spaceBetween={0}
//                             navigation={true}
//                             slidesPerGroup={1}
//                             modules={[Navigation]}
//                             className="zoomSlider"
//                             ref={zoomSlider}
//                         >

//                         <SwiperSlide>
//                             <div className={`item ${slideIndex===0 && 'item_active'}`}>
//                                 <img src={`https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg`} className='w-100' onClick={() => goto(0)} />
//                             </div>
//                         </SwiperSlide>

//                         <SwiperSlide>
//                             <div className={`item ${slideIndex===1 && 'item_active'}`}>
//                                 <img src={`https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image2-47.jpg`} className='w-100' onClick={() => goto(1)} />
//                             </div>
//                         </SwiperSlide>

//                         <SwiperSlide>
//                             <div className={`item ${slideIndex===2 && 'item_active'}`}>
//                                 <img src={`https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image3-35.jpg`} className='w-100' onClick={() => goto(2)} />
//                             </div>
//                         </SwiperSlide>
                      
//                        </Swiper>

//                     </div>


//                     <div className='col-md-7'>
//                         <div className='d-flex info align-items-center mb-3'>
//                             <span className='oldPrice lg mr-2'>$9.35</span>
//                             <span className='netPrice text-danger lg'>$7.25</span>
//                         </div>

//                         <span className="badge bg-success">IN STOCK</span>

//                         <p className='mt-3'>Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent</p>



//                         <div className='d-flex align-items-center'>
//                             <QuantityBox />
//                             <Button className='btn-blue btn-lg btn-big btn-round ml-3'>Add to Cart</Button>
//                         </div>


//                         <div className='d-flex align-items-center mt-5 actions'>
//                             <Button className='btn-round btn-sml' variant="outlined"><IoIosHeartEmpty /> &nbsp; ADD TO WISHLIST</Button>
//                             <Button className='btn-round btn-sml ml-3' variant="outlined"><MdOutlineCompareArrows  /> &nbsp; COMPARE</Button>
//                         </div>

//                     </div>
//                 </div>

//             </Dialog> 
//         </>
//     ) 
// }

// export default ProductModal;





import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { MdClose } from "react-icons/md";
import Rating from '@mui/material/Rating';
import Slider from "react-slick";
import { useContext } from 'react';


import QuantityBox from '../QuantityBox';
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineCompareArrows } from "react-icons/md";
import { MyContext } from '../../App';
import ProductZoom from '../ProductZoom';
import { IoCartSharp } from "react-icons/io5";


const ProductModal = () => {


  const context = useContext(MyContext);

  
  return (
    <Dialog
      open={true}
      className="productModal"
      onClose={() => context.setisOpenProductModal(false)}
    >
      <Button className="close_" onClick={() => context.setisOpenProductModal(false)}>
        <MdClose />
      </Button>
      <h4 className="mb-1 font-weight-bold">
        Seeds of Change Organic Quinoa, Brown
      </h4>

      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center mr-4">
          <span>Brands:</span>
          <span className="ml-2">Welch's</span>
        </div>
        <Rating className="read-only" value={5} size="small" precision={0.5} readOnly />
      </div>
      <hr />

      <div className="row mt-2 productDetailsModal">
        <div className="col-md-5">

        <ProductZoom/>

      </div>

        <div className="col-md-7">
          <div className="d-flex info align-items-center mb-3">
            <span className="oldPrice lg mr-2">$9.35</span>
            <span className="netPrice text-danger lg">$7.25</span>
          </div>

          <span className="badge bg-success">IN STOCK</span>

          <p className="mt-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam rem officia, corrupti reiciendis minima nisi modi, quasi, odio minus dolore impedit fuga eum eligendi.
          </p>

          <div className="d-flex align-items-center">
            <QuantityBox />
            <Button className="btn-blue btn-lg btn-big btn-round ml-3"><IoCartSharp/>Add to Cart</Button>
          </div>

          <div className="d-flex align-items-center mt-5 actions">
            <Button className="btn-round btn-sml" variant="outlined">
              <IoIosHeartEmpty /> &nbsp; ADD TO WISHLIST
            </Button>
            <Button className="btn-round btn-sml ml-3" variant="outlined">
              <MdOutlineCompareArrows /> &nbsp; COMPARE
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductModal;
