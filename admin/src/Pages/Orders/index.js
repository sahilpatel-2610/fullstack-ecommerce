import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Pagination, Dialog } from "@mui/material";
import { fetchDataFromApi, deleteData, editData } from "../../utils/api";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { MdClose } from "react-icons/md";


//breadcrumb code
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        "&:hover, &:focus": {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const context = useContext(MyContext);
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);

    const [isOpenModal, setIdOpenModal] = useState(false);
    const [singleOrder, setSingleOrder] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);
        context.setProgress(20);
        fetchDataFromApi(`/api/orders?page=1&perPage=8`).then((res) => {
            setOrders(res);
            context.setProgress(100);
        });
    }, []);

    const deleteOrder = (id) => {
        context.setProgress(30);
        deleteData(`/api/orders/${id}`).then((res) => {
            fetchDataFromApi(`/api/orders?page=${page}&perPage=8`).then((res) => {
                setOrders(res);
                context.setProgress(100);
            });
        });
    }

    const handleChange = (event, value) => {
        setPage(value);
        context.setProgress(40);
        fetchDataFromApi(`/api/orders?page=${value}&perPage=8`).then((res) => {
            setOrders(res);
            context.setProgress(100);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const showProducts = (id) => {
        fetchDataFromApi(`/api/orders/${id}`).then((res) => {
            setIdOpenModal(true);
            setProducts(res.products);
        });
    }

    const orderStatus = (status, id) => {
        fetchDataFromApi(`/api/orders/${id}`).then((res) => {

            const order = {
                name: res.name,
                phoneNumber: res.phoneNumber,
                address: res.address,
                pincode: res.pincode,
                amount: res.amount,
                paymentId: res.paymentId,
                email: res.email,
                userId: res.userId,
                products: res.products,
                status: status,
                date: res.date
            }

            editData(`/api/orders/${id}`, order).then((res) => {
                fetchDataFromApi(`/api/orders?page=${page}&perPage=8`).then((res) => {
                    setOrders(res);
                    context.setProgress(100);
                });
            });

            setSingleOrder(res.products);
        });
    }


    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
                    <h5 className="mb-0">Orders List</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            label="Orders"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <div className="card shadow border-0 p-3 mt-4">
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered table-striped v-align">
                            <thead className="thead-dark">

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
                                                            <span className="badge badge-danger cursor" onClick={() => orderStatus("confirm", order?._id)}>{order?.status}</span> :
                                                            <span className="badge badge-success cursor" onClick={() => orderStatus("pending", order?._id)}>{order?.status}</span>
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
                </div>
            </div>


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
                    <thead className="thead-dark">
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
                                            <Button className="btn-red" style={{ minWidth: 'auto', height: 'auto', padding: '6px 12px', borderRadius: '4px' }} onClick={() => deleteOrder(item?._id)}>
                                                <MdDelete style={{ fontSize: '15px', color: '#fff' }} />
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
    );
};

export default Orders;