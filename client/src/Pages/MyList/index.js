import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { IoIosClose } from "react-icons/io";
import Button from '@mui/material/Button';
import { useContext } from "react";
import { MyContext } from "../../App";
import { useEffect } from "react";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { useState } from "react";
import { FaHome } from "react-icons/fa";

const MyList = () => {

    const context = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        context.getMyListData();
    }, []);

    const removeItem = (id) => {
        setIsLoading(true);
        deleteData(`/api/my-list/${id}`).then((res) => {
            if (res !== undefined && res.error !== true) {
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "Item removed from My List!"
                })
                context.getMyListData();
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            } else {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: res?.msg || "Failed to remove item from My List!"
                })
                setIsLoading(false);
            }
        }).catch((err) => {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "An unexpected error occurred!"
            })
            setIsLoading(false);
        })
    }

    return (
        <>
            <section className="section cartPage">
                <div className="container">


                    <div className="myListTableWrapper">
                        <h2 className="hd mb-1">MY LIST</h2>
                        <p>There are <b className="text-red">{context.myListData?.length}</b> products in your wish list</p>

                        {
                            context.myListData?.length !== 0 ?
                                <div className="row">
                                    <div className="col-md-12 pr-5">
                                        <div className="table-responsive myListTable">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th width="50%">Product</th>
                                                        <th width="15%">Unit Price</th>
                                                        <th width="10%">Remove</th>
                                                    </tr>
                                                </thead>

                                                <tbody>

                                                    {
                                                        context.myListData?.length !== 0 && context.myListData?.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td width="50%">
                                                                        <Link to={`/product/${item?.productId}`}>
                                                                            <div className="d-flex align-item-center cartItemimgWrapper">
                                                                                <div className="imgWrapper">
                                                                                    <img src={item?.images}
                                                                                        className="w-100" alt={item?.productTitle}
                                                                                    />
                                                                                </div>

                                                                                <div className="info px-3">
                                                                                    <h6>
                                                                                        {item?.productTitle}</h6>
                                                                                    <Rating name="read-only" value={item?.rating} readOnly size="small" />
                                                                                </div>

                                                                            </div>
                                                                        </Link>
                                                                    </td>
                                                                    <td width="15%">Rs {item?.price}</td>
                                                                    <td width="10%"><span className="remove" onClick={() => removeItem(item?._id)}><IoIosClose /></span></td>
                                                                </tr>

                                                            )
                                                        })
                                                    }



                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                :
                                <div className="empty d-flex align-items-center justify-content-center flex-column">
                                    <img src="https://cdn-icons-png.flaticon.com/128/4472/4472515.png" width="150" alt="empty" />
                                    <h3>My List is currently empty</h3>
                                    <br />
                                    <Link to="/"> <Button className="btn-blue btn-lg btn-big btn-round"><FaHome /> &nbsp; Continue Shopping</Button></Link>
                                </div>
                        }

                    </div>

                </div>
            </section>

            {
                isLoading === true && <div className="loading"></div>
            }
        </>
    )
}

export default MyList;
