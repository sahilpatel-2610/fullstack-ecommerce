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

import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { deleteData, editData, fetchDataFromApi } from "../../utils/api";

import { Link } from "react-router-dom";
import { MyContext } from "../../App";


const label = { inputProps: { "aria-label": "Checkbox demo" } };

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


const HomeSlideList = () => {

    const [slideList, setSlideList] = useState([]);

    const [lightBox, setLightBox] = useState({
        photoIndex: 0,
        isOpen: false,
    });

    const context = useContext(MyContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        context.setProgress(20)
        fetchDataFromApi('/api/homeBanner?page=1&perPage=10').then((res) => {
            setSlideList(res);
            console.log(res);
            context.setProgress(100);
        })


    }, []);

    const deleteSlide = (id) => {
        context.setProgress(30);
        deleteData(`/api/homeBanner/${id}`).then(res => {
            fetchDataFromApi('/api/homeBanner?page=1&perPage=10').then((res) => {
                setSlideList(res);
                context.setProgress(100);
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Slide Deleted!"
                })
            })
        })
    }


    const slideImages = slideList?.bannerList?.map(item => Array.isArray(item.images) ? item.images[0] : item.images) || [];


    return (
        <>


            <Dialog 
                open={lightBox.isOpen} 
                onClose={() => setLightBox({ isOpen: false })} 
                maxWidth="md" 
                fullWidth 
                PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none' } }}
            >
                {lightBox.isOpen && slideImages.length > 0 && (
                    <div style={{ position: 'relative' }}>
                        <IconButton 
                            onClick={() => setLightBox({ isOpen: false })} 
                            style={{ position: 'absolute', top: -10, right: -10, color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <img 
                            src={slideImages[lightBox.photoIndex]} 
                            className="w-100" 
                            style={{ borderRadius: '8px' }} 
                            alt="Preview" 
                        />
                    </div>
                )}
            </Dialog>

            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Home Banner Slide List</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            label="Home Banner Slide"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>

                    <Link to="/homeBannerSlide/add"><Button className="btn-blue ms-3 ps-3 pe-3">Add Home Slide</Button></Link>
                </div>


                <div className="card shadow border-0 p-3 mt-4">

                    <div className="table-responsive mt-3">
                        <table className="table table-bordered table-striped v-align">
                            <thead className="thead-dark">
                                <tr>
                                    {/* <th>UID</th> */}
                                    <th style={{ width: '250px' }}>IMAGE</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    slideList?.bannerList?.map((item, index) => (
                                        <tr key={item._id}>
                                            {/* <td>
                                                <div className="d-flex align-items-center">
                                                    <Checkbox {...label} /> <span>#{index + 1}</span>
                                                </div>
                                            </td> */}

                                            <td>
                                                <div className="d-flex align-items-center" style={{ width: '250px', height: '100px' }} onClick={() => setLightBox({ isOpen: true, photoIndex: index })}>
                                                    <img src={Array.isArray(item.images) ? item.images?.[0] : item.images} className="w-100 h-100 rounded shadow" style={{ objectFit: 'cover' }} />
                                                </div>
                                            </td>

                                            <td>
                                                <div className="actions d-flex align-items-center">
                                                    <Link to={`/homeBannerSlide/edit/${item._id}`}>
                                                        <Button className="success" color="success">
                                                            <FaPencilAlt />
                                                        </Button>
                                                    </Link>

                                                    <Button className="error" color="error" onClick={() => deleteSlide(item._id)}>
                                                        <MdDelete />
                                                    </Button>
                                                </div>

                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>



                        </table>


                    </div>

                </div>


            </div>

        </>
    )
}
export default HomeSlideList;


