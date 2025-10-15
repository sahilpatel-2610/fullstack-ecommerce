import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { useRef } from "react";
import { useState } from "react";

const ProductZoom = () => {

    const [slideIndex, setSlideIndex] = useState(0);
    const zoomSliderBig = useRef();
    const zoomSlider = useRef();

    const goto = (index) => {
        setSlideIndex(index);
        zoomSliderBig.current.swiper.slideTo(index);
        zoomSlider.current.swiper.slideTo(index);
    };
    

    return (
        <div className="productZoom">
               <div className="productZoom position-relative">
            <div className="badge badge-primary">23%</div>

            {/* Main Swiper */}
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              navigation={false}
              modules={[Navigation]}
              className="zoomSliderBig"
              ref={zoomSliderBig}
            >
              <SwiperSlide>
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1}
                  src={`https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-1.jpg`}
                />
              </SwiperSlide>
              <SwiperSlide>
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1}
                  src={`https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-2.jpg`}
                />
              </SwiperSlide>
              <SwiperSlide>
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1}
                  src={`https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-3.jpg`}
                />
              </SwiperSlide>
            </Swiper>
          </div>


         
    
        {/* Thumbnail Swiper */}
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            navigation={true}
            slidesPerGroup={1}
            modules={[Navigation]}
            className="zoomSlider"
            ref={zoomSlider}
          >
          <SwiperSlide>
          <div
            className={`thumb_item ${slideIndex === 0 ? 'active' : ''}`}
            onClick={() => goto(0)}
          >
            <img
              src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/thumbnail-4.jpg"
              alt="thumb1"
            />
          </div>
          </SwiperSlide>

          <SwiperSlide>
          <div
            className={`thumb_item ${slideIndex === 1 ? 'active' : ''}`}
            onClick={() => goto(1)}
          >
            <img
              src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/thumbnail-3.jpg"
              alt="thumb2"
            />
          </div>
          </SwiperSlide>

          <SwiperSlide>
          <div
            className={`thumb_item ${slideIndex === 2 ? 'active' : ''}`}
            onClick={() => goto(2)}
          >
            <img
             src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/thumbnail-5.jpg"
              alt="thumb3"
            />
          </div>
          </SwiperSlide>
          </Swiper>
        </div>
    )
}

export default ProductZoom;