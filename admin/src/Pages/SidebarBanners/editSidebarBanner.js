import { Breadcrumbs } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { useState, useContext, useEffect } from "react";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { deleteImages, editData, fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { FaRegImages } from "react-icons/fa6";
import { MyContext } from "../../App";
import { IoCloseSharp } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";

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

const EditSidebarBanner = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [bannerTitle, setBannerTitle] = useState('');
    const [linkedCatIds, setLinkedCatIds] = useState([]);
    const [selectedNewCat, setSelectedNewCat] = useState('');
    const [linkedProductIds, setLinkedProductIds] = useState([]);
    const [selectedNewProduct, setSelectedNewProduct] = useState('');
    const [productList, setProductList] = useState([]);
    const [previews, setPreviews] = useState([]);

    let { id } = useParams();
    const history = useNavigate();
    const context = useContext(MyContext);

    useEffect(() => {
        fetchDataFromApi('/api/products?page=1&perPage=500').then((res) => {
            if (res && res.products) {
                setProductList(res.products);
            }
        }).catch(() => null);
    }, []);

    useEffect(() => {
        context.setProgress(20);
        fetchDataFromApi(`/api/sidebarBanners/${id}`).then((res) => {
            if (res) {
                setPreviews(res.images || []);
                setBannerTitle(res.bannerTitle || res.name || '');

                let existingCids = [];
                if (Array.isArray(res.catIds) && res.catIds.length > 0) {
                    existingCids = res.catIds;
                } else if (res.catId) {
                    existingCids = [res.catId];
                }
                setLinkedCatIds(existingCids);

                let existingPids = [];
                if (Array.isArray(res.productIds) && res.productIds.length > 0) {
                    existingPids = res.productIds;
                } else if (res.productId) {
                    existingPids = [res.productId];
                }
                setLinkedProductIds(existingPids);
            }
            context.setProgress(100);
        });
    }, [id]);

    const handleAppendCategory = (event) => {
        const catId = event.target.value;
        if (!catId) return;
        if (!linkedCatIds.includes(catId)) {
            setLinkedCatIds(prev => [...prev, catId]);
        }
        setSelectedNewCat('');
    };

    const handleRemoveLinkedCategory = (catId) => {
        setLinkedCatIds(prev => prev.filter(cid => cid !== catId));
    };

    const handleAppendProduct = (event) => {
        const prodId = event.target.value;
        if (!prodId) return;
        if (!linkedProductIds.includes(prodId)) {
            setLinkedProductIds(prev => [...prev, prodId]);
        }
        setSelectedNewProduct('');
    };

    const handleRemoveLinkedProduct = (prodId) => {
        setLinkedProductIds(prev => prev.filter(pid => pid !== prodId));
    };

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            const files = e.target.files;
            if (!files || files.length === 0) return;

            const formdata = new FormData();
            for (let i = 0; i < files.length; i++) {
                formdata.append(`images`, files[i]);
            }

            postData(apiEndPoint, formdata).then((res) => {
                if (Array.isArray(res) && res.length !== 0) {
                    const appendedArray = [...(previews || []), ...res];
                    setPreviews(appendedArray);
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Images Uploaded!"
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const editSidebarBanner = (e) => {
        e.preventDefault();
        const appendedArray = [...(previews || [])];
        if (appendedArray.length !== 0) {
            setIsLoading(true);

            const catNames = linkedCatIds.map(cid => {
                const cObj = context.catData?.categoryList?.find(c => c._id === cid);
                return cObj ? cObj.name : cid;
            });

            const pNames = linkedProductIds.map(pid => {
                const prod = productList.find(p => (p._id || p.id) === pid);
                return prod ? prod.name : pid;
            });

            const postObj = {
                images: appendedArray,
                bannerTitle: bannerTitle,
                name: bannerTitle,
                catId: linkedCatIds[0] || "",
                catName: catNames[0] || "",
                catIds: linkedCatIds,
                catNames: catNames,
                productId: linkedProductIds[0] || "",
                productName: pNames[0] || "",
                productIds: linkedProductIds,
                productNames: pNames
            };

            editData(`/api/sidebarBanners/${id}`, postObj).then(res => {
                setIsLoading(false);
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "Banner Updated Successfully!"
                });
                history('/sidebarBanner/list');
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
        deleteImages(`/api/sidebarBanners/deleteImage?img=${imgUrl}`);
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
                <h5 className="mb-0">Edit Sidebar Banner</h5>
                <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
                    <StyledBreadcrumb component="a" href="#" label="Dashboard" icon={<HomeIcon fontSize="small" />} />
                    <StyledBreadcrumb label="Edit Sidebar Banner" deleteIcon={<ExpandMoreIcon />} />
                </Breadcrumbs>
            </div>

            <form className="form" onSubmit={editSidebarBanner}>
                <div className='row mt-3'>
                    <div className="col-sm-9">
                        <div className="card p-4 mt-0 mb-3">
                            <h5 className="mb-3">Banner Details & Linked Items</h5>
                            
                            <div className="form-group mb-3">
                                <h6>Banner Name / Title (Displayed on Banner Screen)</h6>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter Custom Banner Name (e.g. Hottest Trends For Summer)" 
                                    value={bannerTitle} 
                                    onChange={(e) => setBannerTitle(e.target.value)} 
                                />
                            </div>

                            {/* Currently Linked Categories Badges */}
                            <div className="mb-3">
                                <h6 className="font-weight-bold">LINKED CATEGORIES ({linkedCatIds.length})</h6>
                                {
                                    linkedCatIds.length > 0 ? (
                                        <div className="d-flex flex-wrap gap-2 mt-2">
                                            {
                                                linkedCatIds.map((cid) => {
                                                    const cObj = context.catData?.categoryList?.find(c => c._id === cid);
                                                    return (
                                                        <span key={cid} className="badge bg-success p-2 d-inline-flex align-items-center me-2 mb-2" style={{ fontSize: '13px' }}>
                                                            {cObj ? cObj.name : cid}
                                                            <IoCloseSharp 
                                                                className="ms-2" 
                                                                style={{ cursor: 'pointer', fontSize: '16px' }}
                                                                onClick={() => handleRemoveLinkedCategory(cid)}
                                                            />
                                                        </span>
                                                    );
                                                })
                                            }
                                        </div>
                                    ) : (
                                        <p className="text-muted small">No categories linked to this banner yet.</p>
                                    )
                                }
                            </div>

                            {/* Currently Linked Products Badges */}
                            <div className="mb-3">
                                <h6 className="font-weight-bold">LINKED PRODUCTS ({linkedProductIds.length})</h6>
                                {
                                    linkedProductIds.length > 0 ? (
                                        <div className="d-flex flex-wrap gap-2 mt-2">
                                            {
                                                linkedProductIds.map((pid) => {
                                                    const prodObj = productList.find(p => (p._id || p.id) === pid);
                                                    return (
                                                        <span key={pid} className="badge bg-primary p-2 d-inline-flex align-items-center me-2 mb-2" style={{ fontSize: '13px' }}>
                                                            {prodObj ? prodObj.name : pid}
                                                            <IoCloseSharp 
                                                                className="ms-2" 
                                                                style={{ cursor: 'pointer', fontSize: '16px' }}
                                                                onClick={() => handleRemoveLinkedProduct(pid)}
                                                            />
                                                        </span>
                                                    );
                                                })
                                            }
                                        </div>
                                    ) : (
                                        <p className="text-muted small">No products linked to this banner yet. Select a product below to add one!</p>
                                    )
                                }
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <h6>Add / Append Category</h6>
                                        <Select
                                            value={selectedNewCat}
                                            onChange={handleAppendCategory}
                                            displayEmpty
                                            className="w-100"
                                        >
                                            <MenuItem value="">
                                                <em>+ Select Category to Add/Append</em>
                                            </MenuItem>
                                            {
                                                context.catData?.categoryList?.length > 0 && context.catData?.categoryList?.map((cat) => (
                                                    <MenuItem value={cat._id} key={cat._id}>{cat.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <h6>Add / Append Product To Banner</h6>
                                        <Select
                                            value={selectedNewProduct}
                                            onChange={handleAppendProduct}
                                            displayEmpty
                                            className="w-100"
                                        >
                                            <MenuItem value="">
                                                <em>+ Select Product to Add/Append</em>
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
                                    {
                                        previews?.length !== 0 && previews?.map((img, index) => (
                                            <div className="uploadBox" key={index}>
                                                <span className="remove" onClick={() => removeImg(index, img)}><IoCloseSharp /></span>
                                                <img src={img} className="w-100" alt="preview" />
                                            </div>
                                        ))
                                    }
                                    <div className="uploadBox">
                                        <input type="file" multiple onChange={(e) => onChangeFile(e, '/api/sidebarBanners/upload')} name="images" />
                                        <div className="info">
                                            <FaRegImages />
                                            <h5>image upload</h5>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <Button type="submit" className="btn-blue btn-lg btn-big w-100">
                                    <FaCloudUploadAlt /> &nbsp; {isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'UPDATE BANNER'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditSidebarBanner;
