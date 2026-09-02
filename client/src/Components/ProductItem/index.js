import Rating from '@mui/material/Rating';
import { TfiFullscreen } from "react-icons/tfi";
import Button from '@mui/material/Button';
import { IoIosImages, IoMdHeartEmpty } from "react-icons/io";
import { useEffect, useState, useContext, useRef } from 'react';
import { MyContext } from '../../App';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Skeleton from '@mui/material/Skeleton';
import { fetchDataFromApi, postData } from '../../utils/api';
import { FaHeart } from "react-icons/fa";

const ProductItem = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddedToMyList, setIsAddedToMyList] = useState(false);

    const context = useContext(MyContext);

    const sliderRef = useRef();

    const settings = {
        dots: true,
        infinite: true,
        loop: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };

    const viewProductDetails = (id) => {
        context.setisOpenProductModal({
            id: id,
            open: true
        });
    }

    const handleMouseEnter = (id) => {
        setIsHovered(true);
        setTimeout(() => {
            if (sliderRef.current) {
                sliderRef.current.slickPlay();
            }
        }, 20);

        const userStr = localStorage.getItem("user");
        if (userStr && userStr !== "undefined") {
            try {
                const userData = JSON.parse(userStr);
                const userId = userData?._id || userData?.id || userData?.userId || context.user?._id || context.user?.id || context.user?.userId;
                if (userId) {
                    fetchDataFromApi(`/api/my-list?productId=${id}&userId=${userId}`).then((res) => {
                        if (res !== undefined && res?.length !== 0) {
                            setIsAddedToMyList(true);
                        }
                    });
                }
            } catch (e) {}
        }
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTimeout(() => {
            if (sliderRef.current) {
                sliderRef.current.slickPause();
            }
        }, 20);
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500)
    }, [])

    const addToMyList = (id) => {
        const userStr = localStorage.getItem("user");
        let userData = null;
        if (userStr && userStr !== "undefined") {
            try {
                userData = JSON.parse(userStr);
            } catch (e) {}
        }

        const userId = userData?._id || userData?.id || userData?.userId || context.user?._id || context.user?.id || context.user?.userId;

        if (context.isLogin !== true || !userId) {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please login to add products to your wishlist"
            })
            return;
        }

        const data = {
            productTitle: props?.item?.name,
            images: props?.item?.images?.[0] || "",
            rating: props?.item?.rating,
            price: props?.item?.price,
            productId: id,
            userId: userId
        }

        postData("/api/my-list/add", data).then((res) => {
            if (res !== undefined && res.status === true) {
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "Item added to My List!"
                })
                context.getMyListData();
                setIsAddedToMyList(true);
            } else {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: res?.msg || "Failed to add item to My List!"
                })
            }
        }).catch((err) => {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "An unexpected error occurred!"
            })
        })
    }

    return (
        <>
            <div className={`productItem ${props.itemView}`}
                onMouseEnter={() => handleMouseEnter(props?.itemView === 'recentlyView' ? props.item?.productId : props.item?._id)}
                onMouseLeave={handleMouseLeave}>
                <div className="img_rapper">
                    <Link to={`/product/${props?.itemView === 'recentlyView' ? props.item?.productId : props.item?._id}`}>
                        <div className='sliderWrapper'>
                            {
                                isHovered === true ?
                                    <Slider {...settings} ref={sliderRef}>
                                        {
                                            props.item?.images?.map((img, index) => {
                                                return (
                                                    <div className='slick-slide' key={index}>
                                                        <img src={img} className='w-100' alt="product" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </Slider>
                                    : null
                            }
                        </div>

                        {
                            isHovered === false ? (
                                isLoading === true ?
                                    <Skeleton variant='rectangular' width="100%" height={200} >
                                        <IoIosImages />
                                    </Skeleton>
                                    :
                                    <img src={props?.item?.images[0]} className='w-100' alt="product" />
                            ) : null
                        }
                    </Link>

                    <span className="badge badge-primary">{props?.item?.discount}%</span>

                    <div className="actions">
                        <Button onClick={() => viewProductDetails(props?.itemView === 'recentlyView' ? props.item?.productId : props.item?._id)}><TfiFullscreen /></Button>
                        <Button className={isAddedToMyList === true && 'active'} onClick={() => addToMyList(props?.itemView === 'recentlyView' ? props.item?.productId : props.item?._id)}>
                            {
                                isAddedToMyList === true ?
                                    <FaHeart style={{ fontSize: '20px' }} />
                                    :
                                    <IoMdHeartEmpty style={{ fontSize: '20px' }} />
                            }
                        </Button>
                    </div>
                </div>

                <div className="info">
                    <Link to={`/product/${props?.itemView === 'recentlyView' ? props.item?.productId : props.item?._id}`}>
                        <h4>{props?.item?.name?.substr(0, 30) + '...'}</h4>
                    </Link>
                    <span className="text-success d-block">In Stock</span>
                    <Rating className="mt-2 mb-2" name="read-only" value={props?.item?.rating} readOnly size="small" precision={0.5} />

                    <div className="d-flex">
                        <span className="oldPrice">Rs {props?.item?.oldPrice}</span>
                        <span className="netPrice text-danger ml-2">Rs {props?.item?.price}</span>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ProductItem;