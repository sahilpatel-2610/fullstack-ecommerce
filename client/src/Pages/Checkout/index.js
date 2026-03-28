import React, { useState, useContext } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoBagCheckOutline } from "react-icons/io5";

import { MyContext } from '../../App';

const Checkout = () => {

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

    const onChangeInput = (e) => {
        setFormFilleds({
            ...formFilleds,
            [e.target.name]: e.target.value,
        });
    };

    const context = useContext(MyContext);

    const checkout = (e) => {
        e.preventDefault();

        console.log(formFilleds);
        if (formFilleds.fullName === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill full name!"
            })
            return false;
        }
        if (formFilleds.country === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill country!"
            })
            return false;
        }
        if (formFilleds.streetAddressLine1 === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill Street address!"
            })
            return false;
        }
        if (formFilleds.streetAddressLine2 === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill Street address!"
            })
            return false;
        }
        if (formFilleds.city === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill city!"
            })
            return false;
        }
        if (formFilleds.state === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill state!"
            })
            return false;
        }
        if (formFilleds.zipCode === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill zip code!"
            })
            return false;
        }
        if (formFilleds.phoneNumber === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill phone number!"
            })
            return false;
        }
        if (formFilleds.email === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please fill email!"
            })
            return false;
        }

        const addressInfo = {
            name: formFilleds.fullName,
            phoneNumber: formFilleds.phoneNumber,
            address: formFilleds.streetAddressLine1 + formFilleds.streetAddressLine2,
            pincode: formFilleds.zipCode,
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric"
                }
            )
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
                                                            <td>{item?.productTitle?.substr(0, 20) + '...'} <b>× {item?.quantity}</b></td>

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
                                                        context.cartData?.map(item => parseInt(item.price) * item.quantity).reduce((total, value) => total + value, 0).toLocaleString()
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>


                                <Button type='submit' className="btn-red btn-lg btn-big" onClick={checkout}><IoBagCheckOutline /> &nbsp; Checkout</Button>
                            </div>
                        </div>

                    </div>
                </form >
            </div >
        </section >
    )
}

export default Checkout;
