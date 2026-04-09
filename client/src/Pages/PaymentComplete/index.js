import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { fetchDataFromApi, postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';

const PaymentComplete = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const context = useContext(MyContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            // 1. Verify payment with server
            fetchDataFromApi(`/api/checkout/payment/complete?session_id=${id}`).then((res) => {
                if (res && res.length > 0) {
                    const session = res[0];
                    const lineItems = res[1];

                    // 2. Prepare Order Payload (matching Razorpay logic in Checkout/index.js)
                    const userData = JSON.parse(localStorage.getItem("user"));
                    
                    const payLoad = {
                        name: session.customer_details.name,
                        phoneNumber: session.customer_details.phone || "N/A",
                        address: session.shipping_details?.address?.line1 + " " + (session.shipping_details?.address?.line2 || ""),
                        pincode: session.shipping_details?.address?.postal_code || "N/A",
                        amount: session.amount_total / 100,
                        paymentId: session.payment_intent,
                        email: session.customer_details.email,
                        userId: userData?._id,
                        products: lineItems.data.map((item) => ({
                            productId: item.price.product, // Stripe product ID
                            productTitle: item.description,
                            quantity: item.quantity,
                            price: item.price.unit_amount / 100,
                            images: "", 
                            subTotal: item.amount_total / 100
                        })),
                        status: "Pending",
                        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
                    };

                    // 3. Save Order to Database
                    postData(`/api/orders/create`, payLoad).then((response) => {
                        context.setAlertBox({
                            open: true,
                            error: false,
                            msg: "Order placed successfully!"
                        });
                        
                        // 4. Clear Cart
                        // Assuming you have a way to clear cart, maybe context.getCartData() will refresh and show empty?
                        
                        setLoading(false);
                        navigate('/orders');
                    }).catch(err => {
                        console.error("Order Creation Error:", err);
                        setLoading(false);
                        navigate('/');
                    });
                }
            }).catch(err => {
                console.error("Payment Verification Error:", err);
                setLoading(false);
                navigate('/');
            });
        }
    }, [id]);

    return (
        <section className="section paymentCompletePage">
            <div className="container">
                <div className="d-flex align-items-center justify-content-center flex-column" style={{ minHeight: '400px' }}>
                    {loading ? (
                        <>
                            <CircularProgress color="secondary" />
                            <h3 className="mt-3">Completing your order...</h3>
                            <p>Please do not refresh the page.</p>
                        </>
                    ) : (
                        <h3>Redirecting to your orders...</h3>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PaymentComplete;
