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

    const fetchOrdersData = (pageNum = 1) => {
        const userStr = localStorage.getItem("user");
        let userId = context.user?._id || context.user?.id || context.user?.userId;
        let email = context.user?.email;

        if (userStr && userStr !== "undefined") {
            try {
                const userData = JSON.parse(userStr);
                userId = userId || userData?._id || userData?.id || userData?.userId;
                email = email || userData?.email;
            } catch (e) {}
        }

        if (userId) {
            fetchDataFromApi(`/api/orders?userId=${userId}&page=${pageNum}&perPage=8`).then((res) => {
                if (res && res.ordersList && res.ordersList.length > 0) {
                    setOrders(res);
                } else if (email) {
                    fetchDataFromApi(`/api/orders?email=${email}&page=${pageNum}&perPage=8`).then((resEmail) => {
                        setOrders(resEmail || { ordersList: [], totalPages: 1 });
                    });
                } else {
                    setOrders(res || { ordersList: [], totalPages: 1 });
                }
            });
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchOrdersData(1);
    }, [context.user]);

    const deleteOrder = (id) => {
        deleteData(`/api/orders/${id}`).then((res) => {
            fetchOrdersData(page);
        });
    }

    const handleChange = (event, value) => {
        setPage(value);
        fetchOrdersData(value);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const showProducts = (id) => {
        fetchDataFromApi(`/api/orders/${id}`).then((res) => {
            setIdOpenModal(true);
            setProducts(res.products);
        });
    };
    const getOrderProductImage = (item) => {
        let img = item?.images || item?.image || item?.productImage || "";
        if (Array.isArray(img)) {
            img = img.find(i => typeof i === 'string' && i.trim() !== '') || img[0] || "";
        }
        if (typeof img !== 'string') {
            img = "";
        }
        img = img.trim();
        if (!img) {
            return "https://via.placeholder.com/100?text=No+Image";
        }
        if (!img.startsWith('http://') && !img.startsWith('https://') && !img.startsWith('data:')) {
            return `http://localhost:4000${img.startsWith('/') ? '' : '/'}${img}`;
        }
        return img;
    };

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
                                    orders?.ordersList?.length > 0 ? (
                                        orders?.ordersList?.map((order, index) => {
                                            return (
                                                <tr key={order?._id || index}>
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
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="12" className="text-center py-4">
                                                <h6 className="mb-0 text-muted">No orders found for your account.</h6>
                                            </td>
                                        </tr>
                                    )
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
                                            <div className="img" style={{ width: '60px', height: '60px', overflow: 'hidden', borderRadius: '6px', backgroundColor: '#f8f9fa' }}>
                                                <img 
                                                    src={getOrderProductImage(item)} 
                                                    alt={item?.productTitle || 'product'} 
                                                    className="w-100 h-100" 
                                                    style={{ objectFit: 'cover' }}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "https://via.placeholder.com/100?text=No+Image";
                                                    }}
                                                />
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