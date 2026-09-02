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
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoCloseSharp } from "react-icons/io5";


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


const SubCategory = () => {

    const [catData, setCatData] = useState({
        categoryList: [],
        totalPages: 0,
    });

    const context = useContext(MyContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        context.setProgress(20)
        fetchDataFromApi('/api/category').then((res) => {
            setCatData(res);
            context.setProgress(100);
        })

    }, []);

    const deleteSubCat = (id) => {
        context.setProgress(30);
        deleteData(`/api/subCat/${id}`).then(res => {
            context.setProgress(100);
            fetchDataFromApi('/api/category').then((res) => {
                setCatData(res);
                context.setProgress(100);
                if (typeof context.fetchCategory === 'function') {
                    context.fetchCategory();
                }
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "Sub Category Deleted!"
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
                    <h5 className="mb-0">Sub Category List</h5>
                    <div className="ms-auto d-flex align-items-center">
                        <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs_">
                            <StyledBreadcrumb
                                component={Link}
                                to="/"
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb
                                label="Sub Category"
                            />
                        </Breadcrumbs>

                        <Link to="/subCategory/add" className="ms-3">
                            <Button className="btn-blue ps-3 pe-3">Add Sub Category</Button>
                        </Link>
                    </div>
                </div>


                <div className="card shadow border-0 p-3 mt-4">

                    <div className="table-responsive mt-3">
                        <table className="table table-bordered table-striped v-align">
                            <thead className="thead-dark">
                                <tr>
                                    {/* <th>UID</th> */}
                                    <th style={{ width: '100px' }}>CATEGORY IMAGE</th>
                                    <th>CATEGORY</th>
                                    <th>SUB CATEGORY</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    (Array.isArray(catData) ? catData : (catData?.categoryList || []))?.map((item, index) => {
                                        if (item?.children?.length !== 0) {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="d-flex align-items-center" style={{ width: '150px' }}>
                                                            <div className="imgWrapper" style={{ width: '50px', flex: '0 0 50px' }}>
                                                                <div className="img card shadow m-0">
                                                                    <LazyLoadImage
                                                                        alt={"image"}
                                                                        effect="blur"
                                                                        className="w-100"
                                                                        src={item.images[0]}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        {
                                                            item?.children?.length !== 0 && item?.children?.map((subCat, index) => {
                                                                return (
                                                                    <span className="badge badge-primary mx-1">
                                                                        {subCat.name}
                                                                        <IoCloseSharp className="cursor ms-1" onClick={() => deleteSubCat(subCat._id)} />
                                                                    </span>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })
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
export default SubCategory;


