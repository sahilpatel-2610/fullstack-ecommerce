import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { useRef } from "react";
import { useState } from "react";

const ProductZoom = (props) => {

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
      <div className="productZoom productZoomBig position-relative mb-3">
        <div className="badge badge-primary">{props?.discount}%</div>

        {/* Main Swiper */}
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          navigation={false}
          modules={[Navigation]}
          className="zoomSliderBig"
          ref={zoomSliderBig}
        >
          {
            props?.images?.map((img, index) => {
              return (
                <SwiperSlide key={index}>
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={img}
                  />
                </SwiperSlide>

              )
            })
          }


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
        {
          props?.images?.map((img, index) => {
            return (
              <SwiperSlide>
                <div
                  className={`thumb_item ${slideIndex === index ? 'active' : ''}`}
                  onClick={() => goto(index)} key={index}
                >
                  <img
                    src={img}
                    alt="thumb1"
                  />
                </div>
              </SwiperSlide>

            )
          })
        }

      </Swiper>
    </div>
  )
}

export default ProductZoom;