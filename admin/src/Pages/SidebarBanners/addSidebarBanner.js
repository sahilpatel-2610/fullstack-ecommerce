import { Breadcrumbs } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { useState, useContext, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from '@mui/material/Button';
import { deleteImages, postData, fetchDataFromApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { FaRegImages } from "react-icons/fa6";
import { MyContext } from "../../App";
import { IoCloseSharp } from "react-icons/io5";

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

const AddSidebarBanner = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [categoryVal, setCategoryVal] = useState('');
    const [formFields, setFormFields] = useState({
        images: [],
        catId: '',
        catName: ''
    });
    const [previews, setPreviews] = useState([]);

    const formdata = new FormData();
    const history = useNavigate();
    const context = useContext(MyContext);

    const handleChangeCategory = (event) => {
        setCategoryVal(event.target.value);
        const selectedCatObj = context.catData?.categoryList?.find(c => c._id === event.target.value);
        setFormFields(prev => ({
            ...prev,
            catId: event.target.value,
            catName: selectedCatObj ? selectedCatObj.name : ''
        }));
    };

    const [productList, setProductList] = useState([]);
    const [productVal, setProductVal] = useState('');

    useEffect(() => {
        fetchDataFromApi('/api/products?page=1&perPage=500').then((res) => {
            if (res && res.products) {
                setProductList(res.products);
            }
        }).catch(() => null);
    }, []);

    const handleChangeProduct = (event) => {
        const prodId = event.target.value;
        setProductVal(prodId);
        const prodObj = productList.find(p => (p._id || p.id) === prodId);
        setFormFields(prev => ({
            ...prev,
            productId: prodId,
            productName: prodObj ? prodObj.name : ''
        }));
    };

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            const files = e.target.files;
            if (!files || files.length === 0) return;

            setUploading(true);
            const formdata = new FormData();
            let validFileCount = 0;

            for (var i = 0; i < files.length; i++) {
                const file = files[i];
                const isImage = file && (
                    (file.type && file.type.startsWith('image/')) ||
                    /\.(jpg|jpeg|png|webp|gif|svg|avif|jfif)$/i.test(file.name)
                );

                if (isImage) {
                    formdata.append(`images`, file);
                    validFileCount++;
                } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "Please select a valid image file."
                    });
                }
            }

            if (validFileCount === 0) {
                setUploading(false);
                return;
            }

            postData(apiEndPoint, formdata).then(res => {
                if (Array.isArray(res) && res.length !== 0) {
                    const appendedArray = [...(previews || []), ...res];
                    setPreviews(appendedArray);
                    setUploading(false);
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Images Uploaded!"
                    });
                } else {
                    setUploading(false);
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res?.msg || "Failed to upload images."
                    });
                }
            }).catch(err => {
                setUploading(false);
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Failed to upload images."
                });
                console.error("Upload Error:", err);
            });
        } catch (error) {
            setUploading(false);
            console.log(error);
        }
    };

    const addBanner = (e) => {
        e.preventDefault();

        if (previews.length !== 0) {
            setIsLoading(true);
            const postObj = {
                images: previews,
                catId: categoryVal || formFields.catId || "",
                catName: formFields.catName || "",
                productId: productVal || formFields.productId || "",
                productName: formFields.productName || ""
            };

            postData(`/api/sidebarBanners/create`, postObj).then(res => {
                setIsLoading(false);
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "Sidebar Banner Added Successfully!"
                });
                history('/sidebarBanner/list');
                setPreviews([]);
            }).catch(err => {
                setIsLoading(false);
            });
        } else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Please upload at least one image'
            });
        }
    };

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
        <div className="right-content w-100">
            <div className="card shadow border-0 w-100 flex-row p-4 mt-2">
                <h5 className="mb-0">Add Category Sidebar Banner</h5>
                <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
                    <StyledBreadcrumb component="a" href="#" label="Dashboard" icon={<HomeIcon fontSize="small" />} />
                    <StyledBreadcrumb label="Sidebar Banner" deleteIcon={<ExpandMoreIcon />} />
                    <StyledBreadcrumb label="Add Banner" deleteIcon={<ExpandMoreIcon />} />
                </Breadcrumbs>
            </div>

            <form className="form" onSubmit={addBanner}>
                <div className='row'>
                    <div className="col-sm-9">
                        <div className="card p-4 mt-0 mb-3">
                            <h5 className="mb-3">Category & Product Assignment</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <h6>Target Category (Optional)</h6>
                                        <Select
                                            value={categoryVal}
                                            onChange={handleChangeCategory}
                                            displayEmpty
                                            className="w-100"
                                        >
                                            <MenuItem value="">
                                                <em>Select Target Category</em>
                                            </MenuItem>
                                            {
                                                context.catData?.categoryList?.length > 0 && context.catData?.categoryList?.map((cat) => {
                                                    return (
                                                        <MenuItem value={cat._id} key={cat._id}>{cat.name}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <h6>Linked Product (Displayed on Banner Screen)</h6>
                                        <Select
                                            value={productVal}
                                            onChange={handleChangeProduct}
                                            displayEmpty
                                            className="w-100"
                                        >
                                            <MenuItem value="">
                                                <em>Select Linked Product (Optional)</em>
                                            </MenuItem>
                                            {
                                                productList?.length > 0 && productList.map((prod) => (
                                                    <MenuItem value={prod._id || prod.id} key={prod._id || prod.id}>
                                                        {prod.name} (RS: {prod.price})
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card p-4 mt-0">
                            <div className="imagesUploadSec">
                                <h5 className="mb-4">Media And Published</h5>

                                <div className="imgUploadBox d-flex align-items-center">
                                    {previews?.length !== 0 && previews?.map((img, index) => (
                                        <div className="uploadBox" key={index}>
                                            <span className="remove" onClick={() => removeImg(index, img)}><IoCloseSharp /></span>
                                            <img src={img} className="w-100" alt="banner preview" />
                                        </div>
                                    ))}

                                    <div className="uploadBox">
                                        {uploading === true ? (
                                            <div className="progressBar text-center d-flex align-items-center justify-content-center flex-column">
                                                <CircularProgress />
                                                <span>Uploading...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <input type="file" multiple onChange={(e) => onChangeFile(e, '/api/homeBanner/upload')} name="images" />
                                                <div className="info">
                                                    <FaRegImages />
                                                    <h5>image upload</h5>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <br />
                                <Button type="submit" className="btn-blue btn-lg btn-big w-100">
                                    <FaCloudUploadAlt /> &nbsp; {isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'PUBLISH AND VIEW'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddSidebarBanner;
