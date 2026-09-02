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


const EditCategory = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        name: '',
        subCat: '',
        images: [],
        color: ''
    });

    const [category, setcategory] = useState([]);
    const [catData, setCatData] = useState([]);
    const [files, setFiles] = useState([]);
    const [imgFiles, setimgFiles] = useState();
    const [previews, setPreviews] = useState();
    const [isSelectedFiles, setIsSelectedFiles] = useState(false);

    let { id } = useParams();

    const formdata = new FormData();

    const history = useNavigate();

    const context = useContext(MyContext);


    useEffect(() => {
        if (!imgFiles) return;

        let tmp = [];
        for (let i = 0; i < imgFiles.length; i++) {
            tmp.push(URL.createObjectURL(imgFiles[i]));
        }

        const objectUrls = tmp;
        setPreviews(objectUrls);

        // free memory 
        for (let i = 0; i < objectUrls.length; i++) {
            return () => {
                URL.revokeObjectURL(objectUrls[i]);
            }
        }
    }, [imgFiles]);

    useEffect(() => {
        context.setProgress(20);
        fetchDataFromApi("/api/imageUpload").then((res) => {
            res?.map((item) => {
                item?.images?.map((img) => {
                    deleteImages(`/api/category/deleteImage?img=${img}`).then((res) => {
                        deleteData("/api/imageUpload/deleteAllImages");
                    })
                })
            })
        })

        setCatData(context.catData);

        fetchDataFromApi(`/api/category/${id}`).then((res) => {
            setcategory(res);
            if (res.parentId !== undefined && res.parentId !== null && res.parentId !== "") {
                setFormFields({
                    name: res.parentId,
                    subCat: res.name,
                    color: res.color
                });
            } else {
                setFormFields({
                    name: res.name,
                    subCat: '',
                    color: res.color
                });
            }

            setPreviews(res.images);
            context.setProgress(100);
        });

    }, []);


    const changeInput = (e) => {
        setFormFields(() => (
            {
                ...formFields,
                [e.target.name]: e.target.value
            }
        ))
    }

    const [uploading, setUploading] = useState(false);

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            const files = e.target.files;
            const formdata = new FormData();
            setUploading(true);

            for (var i = 0; i < files.length; i++) {
                if (files[i] && (files[i].type === 'image/jpeg' || files[i].type === 'image/jpg' || files[i].type === 'image/png' || files[i].type === 'image/webp')) {
                    formdata.append(`images`, files[i]);
                } else {
                    setUploading(false);
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "Please select a valid JPG, PNG or WEBP image file."
                    });
                    return;
                }
            }

            postData(apiEndPoint, formdata).then((res) => {
                setUploading(false);
                if (Array.isArray(res) && res.length !== 0) {
                    setPreviews(res);
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Images Uploaded Successfully!"
                    });
                } else if (res?.images) {
                    setPreviews(res.images);
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Images Uploaded Successfully!"
                    });
                } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res?.msg || "Image Upload Failed!"
                    });
                }
            }).catch(err => {
                setUploading(false);
                console.error("Upload Error:", err);
            });

        } catch (error) {
            setUploading(false);
            console.log(error);
        }
    }

    const editCategory = (e) => {
        e.preventDefault();

        if (formFields.name !== "" && formFields.color !== "") {
            if (!previews || previews.length === 0) {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: 'Please upload at least one category image'
                });
                return false;
            }

            setIsLoading(true);

            const data = {
                name: formFields.subCat !== "" ? formFields.subCat : formFields.name,
                color: formFields.color,
                parentId: formFields.subCat !== "" ? formFields.name : undefined,
                images: previews
            }

            editData(`/api/category/${id}`, data).then(res => {
                setIsLoading(false);
                if (res.error) {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res.msg || 'Category update failed!'
                    });
                } else {
                    context.fetchCategory();
                    history('/category');
                }
            })
        } else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Please fill all the details'
            });
            return false;
        }
    }




    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Edit Category</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            component="a"
                            label="Category"
                            href="#"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb
                            label="Add Category"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className="form" onSubmit={editCategory}>
                    <div className='row'>
                        <div className="col-sm-9">
                            <div className="card p-4 mt-0">

                                <div className="form-group">
                                    <h6>Category Name</h6>
                                    {
                                        category?.parentId ?
                                            <select className='form-control' name="name" value={formFields.name} onChange={changeInput}>
                                                <option value="">Select Category</option>
                                                {
                                                    catData?.categoryList?.length !== 0 && catData?.categoryList?.map((cat, index) => {
                                                        return (
                                                            <option key={index} value={cat._id}>{cat.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            :
                                            <input type='text' name="name" value={formFields.name} onChange={changeInput} />
                                    }
                                </div>

                                {
                                    category?.parentId &&
                                    <div className="form-group">
                                        <h6>Sub Category</h6>
                                        <input type='text' name="subCat" value={formFields.subCat} onChange={changeInput} />
                                    </div>
                                }

                                <div className="form-group">
                                    <h6>Color</h6>
                                    <input type='text' name="color" value={formFields.color} onChange={changeInput} />
                                </div>

                                {/* <div className='card p-4 mt-0'> */}
                                <div className="imagesUploadSec">
                                    <h5 className="mb-4">Media And Published</h5>

                                    <div className="imgUploadBox d-flex align-items-center">

                                        {
                                            previews?.length !== 0 && previews?.map((img, index) => {
                                                return (
                                                    <div className="uploadBox" key={index}>
                                                        <img src={img} className="w-100" />
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="uploadBox">
                                            <input type="file" multiple onChange={(e) => onChangeFile(e, '/api/category/upload')} name="images" />
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

export default EditCategory;