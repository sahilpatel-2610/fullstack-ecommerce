// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';

// const HomeCat = (props) => {

//     // const [itemBg, setItemBg] = useState([
//     //     '#fffceb',
//     //     '#ecffec',
//     //     '#feefea',
//     //     '#fff3eb',
//     //     '#fff3ff',
//     //     '#f2fce4',
//     //     '#feefea',
//     //     '#fffceb',
//     //     '#feefea',
//     //     '#ecffec',
//     //     '#feefea',
//     //     '#fff3eb',
//     //     '#fff3ff',
//     //     '#f2fce4',
//     //     '#feefea',
//     //     '#fffceb',
//     //     '#feefea',
//     //     '#ecffec'
//     // ]);

//     return(
//         <section className="homeCat">
//             <div className="container">
//                 <h3 className="mb-3 hd">Featured Categories</h3>
//                 <Swiper
//                     slidesPerView={10}
//                     spaceBetween={8}
//                     navigation={true}
//                     slidesPerGroup={3}
//                     pagination={{
//                     clickable: true,
//                     }}
//                     modules={[Navigation]}
//                     className="mySwiper"
//                 >
//                 {/* {
//                     itemBg?.map((item,index) => {
//                         return(
//                             <SwiperSlide>
//                                 <div className="item text-center cursor" style={{background: item}}>
//                                   <img src={catData?.images[0]}/>

//                                   <h6>{catData?.name}</h6>
//                                 </div>
//                             </SwiperSlide>

//                         )
//                     })
//                 } */}

//                 {
//                         props.catData?.categoryList?.length!==0 && props.catData?.categoryList?.map((cat,index) => {
//                             return(
//                                 <SwiperSlide key={index}>
//                                     <div className="item text-center cursor" style={{background: cat.color}}>
//                                         <img src={cat.images[0]}/>

//                                         <h6>{cat.name}</h6>
//                                     </div>
//                                 </SwiperSlide>

//                             )
//                         })
//                 }




//                 </Swiper>  
//             </div>
//         </section>
//     )
// }

// export default HomeCat;


import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const HomeCat = (props) => {

    return (
        <section className="homeCat">
            <div className="container">
                {
                    props.hideTitle !== true && <h3 className="mb-3 hd">Featured Categories</h3>
                }

                <Swiper
                    slidesPerView={8}
                    spaceBetween={15}
                    navigation={true}
                    slidesPerGroup={3}
                    modules={[Navigation]}
                    className="mySwiper"
                >

                    {
                        props.catData?.length > 0 &&
                        props.catData?.map((cat, index) => {
                            const itemBg = [
                                '#fffceb', '#ecffec', '#feefea', '#fff3eb', '#fff3ff', '#f2fce4', '#feefea', '#fffceb', '#feefea', '#ecffec'
                            ];
                            return (
                                <SwiperSlide key={index}>
                                    <div
                                        className={`item text-center cursor ${props.activeIndex === index ? 'active' : ''}`}
                                        style={{ background: cat.color ? cat.color : itemBg[index % itemBg.length] }}
                                        onClick={() => props.onSelect(index)}
                                    >
                                        <div className="img_wrapper">
                                            <img
                                                src={cat.images?.[0]}
                                                alt={cat.name}
                                                className="w-100"
                                            />
                                        </div>

                                        <h6>{cat.name}</h6>
                                    </div>
                                </SwiperSlide>
                            )
                        })

                    }

                </Swiper>
            </div>
        </section>
    )
}

export default HomeCat;