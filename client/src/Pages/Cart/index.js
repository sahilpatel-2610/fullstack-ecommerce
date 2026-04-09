import { Link, useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
import QuantityBox from "../../Components/QuantityBox";
import { IoIosClose } from "react-icons/io";
import Button from '@mui/material/Button';
import { IoBagCheckOutline } from "react-icons/io5";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useEffect } from "react";
import { deleteData, editData, fetchDataFromApi, postData } from "../../utils/api";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {

    const [cartData, setCartData] = useState([]);
    const [productQuantity, setProductQuantity] = useState();
    let [cartFields, setCartFields] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [chengeQuantity, setChengeQuantity] = useState(0);
    const [selectedQuantity, setSelectedQuantity] = useState();

    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(() => {
        fetchDataFromApi(`/api/cart`).then((res) => {
            if (res !== undefined && !res.error) {
                setCartData(res);
                setSelectedQuantity(res?.quantity);
            } else {
                setCartData([]);
            }
        })
    }, []);

    const quantity = (val) => {
        setProductQuantity(val);
        setChengeQuantity(val);
    }

    const selectedItem = (item, quantityVal) => {
        if (chengeQuantity !== 0) {
            setIsLoading(true);

            const cartFields = {
                productTitle: item?.productTitle,
                images: item?.images,
                rating: item?.rating,
                price: item?.price,
                quantity: quantityVal,
                subTotal: parseInt(item?.price * quantityVal),
                productId: item?.productId,
                userId: item?.userId,
                ram: item?.ram,
                size: item?.size,
                weight: item?.weight
            }

            editData(`/api/cart/${item?._id}`, cartFields).then((res) => {
                if (res !== undefined && res.error !== true) {
                    setTimeout(() => {
                        setIsLoading(false);
                        context.getCartData();
                    }, 1000)
                } else {
                    setIsLoading(false);
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res?.msg || "Failed to update quantity!"
                    })
                }
            }).catch((err) => {
                setIsLoading(false);
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "An unexpected error occurred!"
                })
            })
        }
    }

    const removeItem = (id) => {
        setIsLoading(true);
        deleteData(`/api/cart/${id}`).then((res) => {
            if (res !== undefined && res.error !== true) {
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "Item removed from cart!"
                })
                context.getCartData();
            } else {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: res?.msg || "Failed to remove item from cart!"
                })
            }
            setIsLoading(false);
        }).catch((err) => {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "An unexpected error occurred!"
            })
            setIsLoading(false);
        })
    }

    const checkout = () => {
        history("/checkout");
    }

    return (
        <>
            <section className="section cartPage">
                <div className="container">
                    <h2 className="hd mb-1">YOUR CART</h2>
                    <p>There are <b className="text-red">{context.cartData?.length}</b> products in your cart</p>

                    {
                        context.cartData?.length !== 0 ?
                            <div className="row">
                                <div className="col-md-9 pr-5">



                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th width="35%">Product</th>
                                                    <th width="15%">Unit Price</th>
                                                    <th width="20%">Quantity</th>
                                                    <th width="15%">Subtotal</th>
                                                    <th width="10%">Remove</th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {
                                                    context.cartData?.length !== 0 && context.cartData?.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <td width="35%">
                                                                    <Link to={`/product/${item?.productId}`}>
                                                                        <div className="d-flex align-item-center cartItemimgWrapper">
                                                                            <div className="imgWrapper">
                                                                                <img src={item?.images}
                                                                                    className="w-100" alt={item?.productTitle}
                                                                                />
                                                                            </div>

                                                                            <div className="info px-3">
                                                                                <h6>
                                                                                    {item?.productTitle?.substr(0, 30) + '...'}</h6>
                                                                                <Rating name="read-only" value={item?.rating} readOnly size="small" />
                                                                                {/* {item?.size !== "" && <p>Size: <b>{item?.size}</b></p>}
                                                                                {item?.ram !== "" && <p>RAM: <b>{item?.ram}</b></p>}
                                                                                {item?.weight !== "" && <p>Weight: <b>{item?.weight}</b></p>} */}
                                                                            </div>

                                                                        </div>
                                                                    </Link>
                                                                </td>
                                                                <td width="15%">₹ {item?.price}</td>
                                                                <td width="25%">
                                                                    <QuantityBox quantity={quantity} value={item?.quantity} item={item} selectedItem={selectedItem} />
                                                                </td>
                                                                <td width="15%">₹ {item?.subTotal}</td>
                                                                <td width="10%"><span className="remove" onClick={() => removeItem(item?._id)}><IoIosClose /></span></td>
                                                            </tr>

                                                        )
                                                    })
                                                }



                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="card border p-3 cartDetails">
                                        <h4>CART TOTALS</h4>


                                        <div className="d-flex align-item-center mb-3">
                                            <span>Subtotal</span>
                                            <span className="ml-auto text-red font-weight-bold">
                                                ₹
                                                {
                                                    context.cartData?.length !== 0 &&
                                                    context.cartData?.map(item => parseInt(item.price) * item.quantity).reduce((total, value) => total + value, 0).toFixed(2)
                                                }
                                            </span>
                                        </div>

                                        <div className="d-flex align-item-center mb-3">
                                            <span>Shipping</span>
                                            <span className="ml-auto"><b>Free</b></span>
                                        </div>

                                        <div className="d-flex align-item-center mb-3">
                                            <span>Estimate for</span>
                                            <span className="ml-auto"><b>United Kingdom</b></span>
                                        </div>

                                        <div className="d-flex align-item-center mb-3">
                                            <span>Total</span>
                                            <span className="ml-auto text-red font-weight-bold">
                                                ₹
                                                {
                                                    context.cartData?.length !== 0 &&
                                                    context.cartData?.map(item => parseInt(item.price) * item.quantity).reduce((total, value) => total + value, 0).toFixed(2)
                                                }
                                            </span>
                                        </div>

                                        <br />
                                        <Button className="btn-blue btn-lg btn-big btn-round w-100" onClick={checkout}><IoBagCheckOutline /> &nbsp; Checkout</Button>


                                    </div>
                                </div>
                            </div>

                            :
                            <div className="empty d-flex align-items-center justify-content-center flex-column">
                                <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtNTg2LWJhdGNoMi1zZ3MtMDgtcG5nLnBuZw.png" width="150" alt="empty" />
                                <h3>Your Cart is currently empty</h3>
                                <br />
                                <Link to="/"> <Button className="btn-blue btn-lg btn-big btn-round">Continue Shopping</Button></Link>
                            </div>
                    }


                </div>
            </section>

            {
                isLoading === true && <div className="loading"></div>
            }
        </>
    )
}

export default Cart;
