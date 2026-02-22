import Rating from '@mui/material/Rating';
import { TfiFullscreen } from "react-icons/tfi";
import Button from '@mui/material/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoMdHeartEmpty } from "react-icons/io";

import { useState } from 'react';
import { MyContext } from '../../App';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Slider from 'react-slick';
import sliderRef from 'react-slick';


const ProductItem = (props) => {

    const [isHovered, setIsHovered] = useState(false);

    const context = useContext(MyContext);

    var setrings = {
      dots: true,
      infinite: true,
      loop: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };

    const viewProductDetails = (id) => {
      context.setisOpenProductModal(true);
    }

    const handleMouseEnter = () => {
      setIsHovered(true);
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.slickPlay();
        }
      }, 20);
    }

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.slickPause();
        }
      }, 20);
    }

    
    return(
       <>
            <div className={`productItem ${props.itemView}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

                <div className="img_rapper">
                    <Link to={'/product/1'}>
                      {
                        isHovered === true ? <Slider {...setrings} ref={sliderRef}>
                          {
                            props.item?.images?.map((img, index) => {
                              return (
                                <div className='slick-slide' key={index}><img src={img}       className='w-100' />
                                </div>
                              )
                            })
                          }
                        </Slider>

                        :

                        <img
                        src={props.item?.images[0]} className='w-100' />
                      }

                    </Link>

                    <span className="badge badge-primary">{props?.item?.discount}%</span>

                    <div className="actions">
                     <Button onClick={() => viewProductDetails(1)}><TfiFullscreen /></Button>
                     <Button><IoMdHeartEmpty style={{fontSize: '20px'}} /></Button>
                    </div>

                    </div>

                    <div className="info ">
                      <Link to={'/product/1'}><h4>{props?.item?.name?.substr(0,30)+'...'}</h4></Link>
                      <span className="text-success d-block">In Stock</span>
                      <Rating className="mt-2 mb-2" name="read-only" value={props?.item?.rating} readOnly size="small" precision={0.5} />

                      <div className="d-flex">
                        <span className="oldPrice">Rs {props?.item?.oldPrice}</span> 
                        <span className="netPrice text-danger ml-2">Rs {props?.item?.Price}</span>
                      </div>

                    </div>

                </div>
        

           {/* <ProductModal />  */}
       </>

        

                
    )
}

export default ProductItem;


// import Rating from '@mui/material/Rating';
// import { TfiFullscreen } from "react-icons/tfi";
// import Button from '@mui/material/Button';
// import { IoMdHeartEmpty } from "react-icons/io";

// import { useState, useContext, useRef } from 'react';
// import { MyContext } from '../../App';
// import { Link } from 'react-router-dom';

// import Slider from 'react-slick';

// const ProductItem = (props) => {

//     const [isHovered, setIsHovered] = useState(false);
//     const context = useContext(MyContext);
//     const sliderRef = useRef(null);   // ✅ Proper ref create

//     // ✅ Correct variable name
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 300,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//         arrows: false
//     };

//     const viewProductDetails = (id) => {
//         context.setisOpenProductModal(true);
//     }

//     const handleMouseEnter = () => {
//         setIsHovered(true);

//         setTimeout(() => {
//             if (sliderRef.current) {
//                 sliderRef.current.slickPlay();
//             }
//         }, 100);
//     }

//     const handleMouseLeave = () => {
//         setIsHovered(false);

//         if (sliderRef.current) {
//             sliderRef.current.slickPause();
//         }
//     }

//     return (
//         <>
//             <div 
//                 className={`productItem ${props.itemView}`} 
//                 onMouseEnter={handleMouseEnter} 
//                 onMouseLeave={handleMouseLeave}
//             >

//                 <div className="img_rapper">
//                     <Link to={`/product/${props?.item?._id}`}>

//                         {
//                             isHovered && props?.item?.images?.length > 1 ? (
//                                 <Slider {...settings} ref={sliderRef}>
//                                     {
//                                         props.item.images.map((img, index) => (
//                                             <div key={index}>
//                                                 <img src={img} className='w-100' alt="product"/>
//                                             </div>
//                                         ))
//                                     }
//                                 </Slider>
//                             )
//                             :
//                             (
//                                 <img 
//                                     src={props?.item?.images?.[0]} 
//                                     className='w-100' 
//                                     alt="product"
//                                 />
//                             )
//                         }

//                     </Link>

//                     <span className="badge badge-primary">
//                         {props?.item?.discount}
//                     </span>

//                     <div className="actions">
//                         <Button onClick={() => viewProductDetails(props?.item?._id)}>
//                             <TfiFullscreen />
//                         </Button>

//                         <Button>
//                             <IoMdHeartEmpty style={{ fontSize: '20px' }} />
//                         </Button>
//                     </div>

//                 </div>

//                 <div className="info">
//                     <Link to={`/product/${props?.item?._id}`}>
//                         <h4>
//                             {props?.item?.name?.substring(0, 30)}...
//                         </h4>
//                     </Link>

//                     <span className="text-success d-block">
//                         In Stock
//                     </span>

//                     <Rating
//                         className="mt-2 mb-2"
//                         value={props?.item?.rating}
//                         readOnly
//                         size="small"
//                         precision={0.5}
//                     />

//                     <div className="d-flex">
//                         <span className="oldPrice">
//                             Rs {props?.item?.oldPrice}
//                         </span>

//                         <span className="netPrice text-danger ml-2">
//                             Rs {props?.item?.price}
//                         </span>
//                     </div>
//                 </div>

//             </div>
//         </>
//     );
// }

// export default ProductItem;