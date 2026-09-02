import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";

import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Pagination } from "@mui/material";
import { deleteData, editData, fetchDataFromApi } from "../../utils/api";

import { Link } from "react-router-dom";
import { MyContext } from "../../App";


const label = { inputProps: { "aria-label": "Checkbox demo" } };

//breadcrumb code
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    return {
        backgroundColor: 'rgba(0,0,0,0.05)',
        height: theme.spacing(3),
        color: 'rgba(0,0,0,0.7)',
        fontWeight: theme.typography.fontWeightMedium,
        padding: '0 5px',
        borderRadius: '100px',
        cursor: 'pointer',
        "& .MuiChip-label": {
            paddingLeft: '10px',
            paddingRight: '10px',
        },
        "& .MuiChip-icon": {
            color: 'rgba(0,0,0,0.7)',
        },
        "&:hover, &:focus": {
            backgroundColor: 'rgba(0,0,0,0.1)',
        },
        "body.dark &": {
            backgroundColor: '#1a2745',
            color: '#ffffffb3',
        },
        "body.dark & .MuiChip-label": {
            color: '#ffffffb3',
        },
        "body.dark & .MuiChip-icon": {
            color: '#ffffffb3',
        },
        "body.dark &:hover, body.dark &:focus": {
            backgroundColor: '#1e2d50',
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.2)' : '#1e2d50',
        },
    };
});


const Category = () => {

    const [catData, setCatData] = useState({
        categoryList: [],
        totalPages: 0,
    });

    const context = useContext(MyContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        context.setProgress(20)
        fetchDataFromApi('/api/category?page=1&perPage=10').then((res) => {
            setCatData(res);
            console.log(res);
            context.setProgress(100);
        })


    }, []);

    const deleteCat = (id) => {
        context.setProgress(30);
        deleteData(`/api/category/${id}`).then(res => {
            fetchDataFromApi('/api/category?page=1&perPage=10').then((res) => {
                setCatData(res);
                context.setProgress(100);
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "Category Deleted!"
                })
            })
        })
    }

    const handleChange = (event, value) => {
        context.setProgress(40);
        fetchDataFromApi(`/api/category?page=${value}&perPage=10`).then((res) => {
            setCatData(res);
            context.setProgress(100);
        })
    }



    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
                    <h5 className="mb-0">Category List</h5>
                    <div className="ms-auto d-flex align-items-center">
                        <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs_">
                            <StyledBreadcrumb
                                component={Link}
                                to="/"
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb
                                label="Category"
                            />
                        </Breadcrumbs>

                        <Link to="/category/add" className="ms-3">
                            <Button className="btn-blue ps-3 pe-3">Add Category</Button>
                        </Link>
                    </div>
                </div>


                <div className="card shadow border-0 p-3 mt-4">

                    <div className="table-responsive mt-3">
                        <table className="table table-bordered table-striped v-align">
                            <thead className="thead-dark">
                                <tr>
                                    {/* <th>UID</th> */}
                                    <th style={{ width: '100px' }}>IMAGE</th>
                                    <th>CATEGORY</th>
                                    <th>COLOR</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    (Array.isArray(catData) ? catData : (catData?.categoryList || []))?.map((item, index) => (
                                        <tr key={item._id || index}>
                                            <td>
                                                <div className="d-flex align-items-center productBox">
                                                    <div className="imgWrapper">
                                                        <div className="img card shadow m-0">
                                                            <img src={Array.isArray(item.images) ? item.images?.[0] : item.images} className="w-100" alt={item.name} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>{item.name}</td>
                                            <td>{item.color}</td>

                                            <td>
                                                <div className="actions d-flex align-items-center">
                                                    <Link to={`/category/edit/${item._id}`}>
                                                        <Button
                                                            color="success"
                                                        >
                                                            <FaPencilAlt />
                                                        </Button>
                                                    </Link>

                                                    <Button
                                                        color="error"
                                                        onClick={() => deleteCat(item._id)}
                                                    >
                                                        <MdDelete />
                                                    </Button>
                                                </div>

                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>



                        </table>


                        {
                            catData?.totalPages > 1 && <div className="d-flex tableFooter">
                                <Pagination count={catData?.totalPages} color="primary" className="pagination" showFirstButton showLastButton onChange={handleChange} />
                            </div>

                        }


                    </div>

                </div>


            </div>

        </>
    )
}
export default Category;


