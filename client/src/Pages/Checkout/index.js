import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoBagCheckOutline } from "react-icons/io5";
import { loadStripe } from "@stripe/stripe-js";

import { MyContext } from '../../App';
import { postData, deleteData } from '../../utils/api';

const Checkout = () => {
    const history = useNavigate();

    const [formFilleds, setFormFilleds] = useState({
        fullName: '',
        country: '',
        streetAddressLine1: '',
        streetAddressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
        email: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    const onChangeInput = (e) => {
        setFormFilleds({
            ...formFilleds,
            [e.target.name]: e.target.value,
        });
    };

    const context = useContext(MyContext);

    const checkout = async (e) => {
        e.preventDefault();

        if (formFilleds.fullName === "") {
            context.setAlertBox({ open: true, error: true, msg: "Please fill full name!" })
            return false;
        }
        if (formFilleds.country === "") {
            context.setAlertBox({ open: true, error: true, msg: "Please fill country!" })
            return false;
        }
        if (formFilleds.streetAddressLine1 === "") {
            context.setAlertBox({ open: true, error: true, msg: "Please fill Street address!" })
            return false;
        }
        if (formFilleds.city === "") {
            context.setAlertBox({ open: true, error: true, msg: "Please fill city!" })
            return false;
        }
        if (formFilleds.state === "") {
            context.setAlertBox({ open: true, error: true, msg: "Please fill state!" })
            return false;
        }
        if (formFilleds.zipCode === "") {
            context.setAlertBox({ open: true, error: true, msg: "Please fill zip code!" })
            return false;
        }
        if (formFilleds.phoneNumber === "") {
            context.setAlertBox({ open: true, error: true, msg: "Please fill phone number!" })
            return false;
        }
        if (formFilleds.email === "") {
            context.setAlertBox({ open: true, error: true, msg: "Please fill email!" })
            return false;
        }

        const totalAmount = context.cartData?.length !== 0 ?
            context.cartData?.map(item => {
                const price = typeof item.price === "string" ? parseInt(item.price.replace(/[^0-9]/g, "")) : parseInt(item.price);
                return (price || 0) * (item.quantity || 1);
            }).reduce((total, value) => total + value, 0) : 0;

        // Warning for High Amount (MobiKwik/Wallet Limit Fix)
        if (totalAmount > 50000) {
            const message = totalAmount > 100000 
                ? `This high-value order (₹${totalAmount.toLocaleString()}) exceeds wallet limits. Please use Credit/Debit Card, Netbanking, or EMI for a successful transaction. Cards have no such limits. Do you want to proceed?`
                : "For payments above ₹50,000, wallets like MobiKwik may not work due to limit restrictions. Please use Credit/Debit Card or Netbanking. Do you want to proceed?";
            
            const confirmPayment = window.confirm(message);
            if (!confirmPayment) return false;
        }

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_lhO6WJjtmN7Evj",
            amount: totalAmount * 100,
            currency: "INR",
            name: "E-Commerce",
            description: "Shopping Payment",
            handler: function (response) {
                const paymentId = response.razorpay_payment_id;
                const userStr = localStorage.getItem("user");
                let userData = null;
                if (userStr && userStr !== "undefined") {
                    userData = JSON.parse(userStr);
                }

                const payLoad = {
                    name: formFilleds.fullName,
                    phoneNumber: formFilleds.phoneNumber,
                    address: formFilleds.streetAddressLine1 + " " + (formFilleds.streetAddressLine2 || ""),
                    pincode: formFilleds.zipCode,
                    amount: totalAmount,
                    paymentId: paymentId,
                    email: formFilleds.email,
                    userId: userData?._id || userData?.id,
                    products: context.cartData?.map((item) => ({
                        productId: item.productId,
                        productTitle: item.productTitle,
                        quantity: item.quantity,
                        price: item.price,
                        images: Array.isArray(item.images) ? (item.images.length > 0 ? item.images[0] : "") : (item.images || ""),
                        subTotal: item.subTotal
                    })),
                    status: "Pending",
                    date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
                };

                postData(`/api/orders/create`, payLoad).then((res) => {
                    // Clear Cart
                    deleteData(`/api/cart/user/${userData?._id}`).then(() => {
                        context.getCartData(); // Refresh cart context
                    });

                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Order placed successfully!"
                    });
                    history('/orders');
                }).catch(err => {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "Failed to create order. Please contact support."
                    });
                });
            },
            prefill: {
                name: formFilleds.fullName,
                email: formFilleds.email,
                contact: formFilleds.phoneNumber
            },
            theme: {
                color: "#ed174a"
            }
        };

        if (window.Razorpay) {
            var pay = new window.Razorpay(options);
            pay.open();
            setIsLoading(false);
        } else {
            setIsLoading(false);
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Razorpay script not loaded. Please wait a moment."
            });
        }
    };

    return (
        <section className='section'>
            <div className='container'>
                <form className='checkoutForm' onSubmit={checkout}>
                    <div className='row'>
                        <div className='col-md-8'>
                            <h2 className='hd'>BILLING DETAILS</h2>

                            <div className='row mt-3'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <TextField label="Full Name *" variant="outlined" className='w-100' size='small'
                                            name='fullName' onChange={onChangeInput}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <TextField label="Country / Region *" variant="outlined" className='w-100' size='small'
                                            name='country' onChange={onChangeInput}
                                        />
                                    </div>
                                </div>
                            </div>

                            <h6>Street address *</h6>

                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='form-group'>
                                        <TextField label="House number and street name" variant="outlined" className='w-100' size='small'
                                            name='streetAddressLine1' onChange={onChangeInput}
                                        />
                                    </div>
                                </div>

                                <div className='col-md-12'>
                                    <div className='form-group'>
                                        <TextField label="Apartment, suite, unit, etc. (optional)" variant="outlined" className='w-100' size='small'
                                            name='streetAddressLine2' onChange={onChangeInput}
                                        />
                                    </div>
                                </div>
                            </div>

                            <h6>Town / City *</h6>

                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='form-group'>
                                        <TextField label="City" variant="outlined" className='w-100' size='small'
                                            name='city' onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>

                            <h6>State / Country *</h6>

                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='form-group'>
                                        <TextField label="State" variant="outlined" className='w-100' size='small'
                                            name='state' onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>

                            <h6>Postcode / ZIP *</h6>

                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='form-group'>
                                        <TextField label="ZIP Code" variant="outlined" className='w-100' size='small'
                                            name='zipCode' onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <TextField label="Phone Number" variant="outlined" className='w-100' size='small'
                                            name='phoneNumber' onChange={onChangeInput} />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <TextField label="Email Address" variant="outlined" className='w-100' size='small'
                                            name='email' onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>



                        </div>

                        <div className='col-md-4'>
                            <div className='card orderInfo'>
                                <h4 className='hd'>YOUR ORDER</h4>
                                <div className='table-responsive mt-3'>
                                    <table className='table table-borderless'>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                context.cartData?.length !== 0 && context.cartData?.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{item?.productTitle?.substr(0, 15) + '...'} <b>× {item?.quantity}</b></td>

                                                            <td>&#8377; {item?.subTotal}</td>
                                                        </tr>

                                                    )
                                                })
                                            }



                                            <tr>
                                                <td>Subtotal</td>

                                                <td>
                                                    &#8377; {
                                                        context.cartData?.length !== 0 &&
                                                        context.cartData?.map(item => {
                                                            const price = typeof item.price === "string" ? parseInt(item.price.replace(/[^0-9]/g, "")) : parseInt(item.price);
                                                            return (price || 0) * (item.quantity || 1);
                                                        }).reduce((total, value) => total + value, 0).toLocaleString()
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>


                                <Button type='submit' className="btn-red btn-lg btn-big"><IoBagCheckOutline /> &nbsp; Checkout</Button>
                            </div>
                        </div>

                    </div>
                </form >
            </div >
        </section >
    )
}

export default Checkout;
