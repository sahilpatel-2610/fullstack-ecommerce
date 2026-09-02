import React, { useState, useContext } from 'react';
import { IoMailOutline } from "react-icons/io5";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import newsLetterImg from '../../assets/images/coupon.png';
import { postData } from '../../utils/api';
import { MyContext } from '../../App';

const NewsLetter = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(MyContext);

    const handleSubscribe = (e) => {
        e.preventDefault();

        if (!email || email.trim() === '') {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please enter your email address!"
            });
            return;
        }

        setIsLoading(true);

        postData('/api/newsletter/subscribe', { email: email.trim() }).then((res) => {
            setIsLoading(false);
            if (res && (res.status === true || res.status === "true")) {
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: res.msg || "Subscribed to Newsletter successfully!"
                });
                setEmail('');
            } else {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: res?.msg || "Failed to subscribe. Please try again."
                });
            }
        }).catch((err) => {
            setIsLoading(false);
            context.setAlertBox({
                open: true,
                error: true,
                msg: "An error occurred while subscribing."
            });
        });
    };

    return (
        <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p className="text-white mb-1">$20 discount for your first order</p>
                        <h3 className="text-white">Join our newsletter and get...</h3>
                        <p className="text-light">
                            Join our email subscription now to get updates on<br /> promotions and coupons.
                        </p>

                        <form onSubmit={handleSubscribe}>
                            <IoMailOutline />
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Subscribe'}
                            </Button>
                        </form>
                    </div>

                    <div className="col-md-6">
                        <img src={newsLetterImg} alt="newsletter" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsLetter;
