import { Breadcrumbs, colors } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from '@mui/material/Button';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { deleteData, deleteImages, editData, fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { FaRegImages } from "react-icons/fa6";
import { MyContext } from "../../App";
import { useContext } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";

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


const EditHomeSlide = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        images: [],
    });

    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState();
    const [isSelectedFiles, setIsSelectedFiles] = useState(false);

    let { id } = useParams();

    const formdata = new FormData();

    const history = useNavigate();

    const context = useContext(MyContext);




    useEffect(() => {
        context.setProgress(20);
        fetchDataFromApi("/api/imageUpload").then((res) => {
            res?.map((item) => {
                item?.images?.map((img) => {
                    deleteImages(`/api/homeBanner/deleteImage?img=${img}`).then((res) => {
                        deleteData("/api/imageUpload/deleteAllImages");
                    })
                })
            })
        })

        fetchDataFromApi(`/api/homeBanner/${id}`).then((res) => {
            setPreviews(res.images);
            context.setProgress(100);
        });

    }, []);

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            const imgArr = [];
            const files = e.target.files;

            // const fd = new FormData();
            for (var i = 0; i < files.length; i++) {

                // Validate file type
                if (files[i] && (files[i].type === 'image/jpeg' || files[i].type === 'image/jpg' || files[i].type === 'image/png' || files[i].type === 'image/webp')) {

                    const file = files[i];
                    imgArr.push(file);
                    formdata.append(`images`, file);

                    setFiles(imgArr);
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "images uploaded!"
                    });

                    setIsSelectedFiles(true);

                } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "Please select a valid JPG, PNG, or WEBP image file."
                    });
                }

            }

        } catch (error) {
            console.log(error);
        }

        postData(apiEndPoint, formdata).then((res) => {
            if (Array.isArray(res) && res.length !== 0) {
                const appendedArray = [...(previews || []), ...res];
                setPreviews(appendedArray);
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "images uploaded!"
                });
            } else {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Failed to upload images."
                });
            }
        });

    }



    const editHomeSlide = (e) => {
        e.preventDefault();

        const appendedArray = [...(previews || [])];
        
        formdata.append('images', appendedArray);
        formFields.images = appendedArray;

        if (formFields.images.length !== 0) {
            setIsLoading(true);

            editData(`/api/homeBanner/${id}`, formFields).then(res => {
                setIsLoading(false);
                history('/homeBannerSlide/list');
            })
        }

        else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Please fill all the details'
            });
            return false;
        }

    }

    const removeImg = (index, imgUrl) => {
        deleteImages(`/api/homeBanner/deleteImage?img=${imgUrl}`);
        setPreviews((prev) => prev.filter((img) => img !== imgUrl));
        context.setAlertBox({
            open: true,
            error: true,
            msg: "Image Removed!"
        });
    };





    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Edit Home Slide</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            component="a"
                            label="Edit Home Slide"
                            href="#"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className="form" onSubmit={editHomeSlide}>
                    <div className='row'>
                        <div className="col-sm-9">
                            <div className="card p-4 mt-0">
                                <div className="imagesUploadSec">
                                    <h5 className="mb-4">Media And Published</h5>

                                    <div className="imgUploadBox d-flex align-items-center">

                                        {
                                            previews?.length !== 0 && previews?.map((img, index) => {
                                                return (
                                                    <div className="uploadBox" key={index}>
                                                        <span className="remove" onClick={() => removeImg(index, img)}><IoCloseSharp /></span>
                                                        <img src={img} className="w-100" />
                                                    </div>
                                                )
                                            })
                                        }


                                        <div className="uploadBox">
                                            <input type="file" multiple onChange={(e) => onChangeFile(e, '/api/homeBanner/upload')} name="images" />
                                            <div className="info">
                                                <FaRegImages />
                                                <h5>image upload</h5>
                                            </div>
                                        </div>


                                    </div>


                                    <br />

                                    <Button type="submit" className="btn-blue btn-lg btn-big w-100" ><FaCloudUploadAlt /> &nbsp; {isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'PUBLISH AND VIEW'} </Button>
                                </div>
                                {/* </div> */}


                            </div>
                        </div>




                    </div>



                </form>

            </div>
        </>
    )
}

export default EditHomeSlide;