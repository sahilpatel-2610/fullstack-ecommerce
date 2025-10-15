import Rating from '@mui/material/Rating';
import { TfiFullscreen } from "react-icons/tfi";
import Button from '@mui/material/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoMdHeartEmpty } from "react-icons/io";

import { useState } from 'react';
import { MyContext } from '../../App';
import { useContext } from 'react';



const ProductItem = (props) => {

    const context = useContext(MyContext);

    const viewProductDetails = (id) => {
      context.setisOpenProductModal(true);
    }

    
    return(
       <>
          <SwiperSlide>
            <div className={`productItem ${props.itemView}`}>
                <div className="imgWrapper">
                    <img
                    src="https://api.spicezgold.com/download/file_1734690981297_23990e6b-d01e-40fd-bb6b-98198db544c01714702040162RARERABBITMenComfortOpaqueCasualShirt2.jpg"
                    //  src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-3-346x310.jpg"
                    //  scr="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-62.jpg"
                    // src="https://images.pexels.com/photos/31000073/pexels-photo-31000073.jpeg"
                    // src="https://images.pexels.com/photos/1682699/pexels-photo-1682699.jpeg"
                     className="w-100"
                     alt="product"
                    />

                    <span className="badge badge-primary">28%</span>

                    <div className="actions">
                     <Button onClick={() => viewProductDetails(1)}><TfiFullscreen /></Button>
                     <Button><IoMdHeartEmpty style={{fontSize: '20px'}} /></Button>
                    </div>

                    </div>

                    <div className="info ">
                      <h4>Men Alias-N Regular Fit Spread Collar Shirt</h4>
                      <span className="text-success d-block">In Stock</span>
                      <Rating className="mt-2 mb-2" name="read-only" value={5} readOnly size="small" precision={0.5} />

                      <div className="d-flex">
                        <span className="oldPrice">$20.00</span>
                        <span className="netPrice text-danger ml-2">$14.00</span>
                      </div>

                    </div>

                </div>
          </SwiperSlide>

           {/* <ProductModal />  */}
       </>

        

                
    )
}

export default ProductItem;