import React, { useEffect, useState, useContext } from "react";
import { fetchDataFromApi, deleteData } from "../../utils/api";
import { MyContext } from "../../App";
import { MdDelete } from "react-icons/md";
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Dialog from '@mui/material/Dialog';
import { MdClose } from "react-icons/md";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const context = useContext(MyContext);
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);

    const [isOpenModal, setIdOpenModal] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const userStr = localStorage.getItem("user");
        if (userStr && userStr !== "undefined") {
            const userData = JSON.parse(userStr);
            fetchDataFromApi(`/api/orders?userId=${userData?._id || userData?.id}&page=1&perPage=8`).then((res) => {
                setOrders(res);
            });
        }
    }, []);

    const deleteOrder = (id) => {
        deleteData(`/api/orders/${id}`).then((res) => {
            const userStr = localStorage.getItem("user");
            if (userStr && userStr !== "undefined") {
                const userData = JSON.parse(userStr);
                fetchDataFromApi(`/api/orders?userId=${userData?._id || userData?.id}&page=${page}&perPage=8`).then((res) => {
                    setOrders(res);
                });
            }
        });
    }

    const handleChange = (event, value) => {
        setPage(value);
        const userStr = localStorage.getItem("user");
        if (userStr && userStr !== "undefined") {
            const userData = JSON.parse(userStr);
            fetchDataFromApi(`/api/orders?userId=${userData?._id || userData?.id}&page=${value}&perPage=8`).then((res) => {
                setOrders(res);
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    const showProducts = (id) => {
        fetchDataFromApi(`/api/orders/${id}`).then((res) => {
            setIdOpenModal(true);
            setProducts(res.products);
        });
    }

    return (
        <>
            <section className="section">
                <div className="container">
                    <h2 className="hd">Orders</h2>

                    <div className="table-responsive orderTable mt-3">
                        <table className="table table-striped table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th>Payment Id</th>
                                    <th>Products</th>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                    <th>Pincode</th>
                                    <th>Total Amount</th>
                                    <th>Email</th>
                                    <th>User Id</th>
                                    <th>Order Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    orders?.ordersList?.length > 0 && orders?.ordersList?.map((order, index) => {
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td><span className="text-blue font-weight-bold">{order?.paymentId}</span></td>
                                                    <td><span className="text-blue font-weight-bold cursor" onClick={() => showProducts(order?._id)}
                                                    >Click here to view</span>
                                                    </td>
                                                    <td>{order?.name}</td>
                                                    <td>{order?.phoneNumber}</td>
                                                    <td>{order?.address}</td>
                                                    <td>{order?.pincode}</td>
                                                    <td>₹{order?.amount}</td>
                                                    <td>{order?.email}</td>
                                                    <td>{order?.userId}</td>
                                                    <td>
                                                        {order?.status?.toLowerCase() === "pending" ?
                                                            <span className="badge badge-danger">{order?.status}</span> :
                                                            <span className="badge badge-success">{order?.status}</span>
                                                        }
                                                    </td>
                                                    <td>{order?.date}</td>
                                                    <td>
                                                        <Button className="btn-red" style={{ minWidth: '32px', height: '32px', padding: '0px', borderRadius: '4px' }} onClick={() => deleteOrder(order?._id)}>
                                                            <MdDelete style={{ fontSize: '18px', color: '#fff' }} />
                                                        </Button>
                                                    </td>
                                                </tr>



                                            </>

                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>



                    {
                        orders?.totalPages > 1 &&
                        <div className="d-flex tableFooter">
                            <Pagination
                                count={orders?.totalPages}
                                color="primary"
                                className="pagination"
                                showFirstButton
                                showLastButton
                                onChange={handleChange}
                            />
                        </div>
                    }



                </div>
            </section>


            <Dialog
                open={isOpenModal}
                className="productModal"
            >
                <Button className="close_" onClick={() => setIdOpenModal(false)}>
                    <MdClose />
                </Button>
                <h4 className="mb-1 font-weight-bold pr-5 mb-4">
                    Products
                </h4>

                <table className="table table-striped table-bordered orderTable">
                    <thead className="thead-light">
                        <tr>
                            <th>Product Id</th>
                            <th>Product Title</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>SubTotal</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            products?.length > 0 && products?.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item?.productId}</td>
                                        <td style={{ whiteSpace: "inherit" }}>
                                            <span>
                                                {item?.productTitle?.substr(0, 30) + "..."}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="img">
                                                <img src={item?.images} />
                                            </div>
                                        </td>
                                        <td>{item?.quantity}</td>
                                        <td>{item?.price}</td>
                                        <td>{item?.subTotal}</td>
                                        <td>
                                            <Button className="btn-red" style={{ minWidth: '32px', height: '32px', padding: '0px', borderRadius: '4px' }} onClick={() => deleteOrder(item?._id)}>
                                                <MdDelete style={{ fontSize: '18px', color: '#fff' }} />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </Dialog>
        </>



    )
}

export default Orders;