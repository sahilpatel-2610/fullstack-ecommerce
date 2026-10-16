import { Breadcrumbs, colors } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from "react";
import Rating from '@mui/material/Rating';
import { FaCloudUploadAlt, FaStepForward } from "react-icons/fa";
import Button from '@mui/material/Button';
import { IoCloseSharp } from "react-icons/io5";
import { FaRegImages } from "react-icons/fa6";
import { Style } from "@mui/icons-material";
import OutlinedInput from "@mui/material/OutlinedInput";

import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useRef } from "react";
import { editData, fetchDataFromApi, postData, deleteImages } from "../../utils/api";
import { useEffect } from "react";
import { MyContext } from "../../App";
import { useContext } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import CountryDropdown from "../../components/CountryDropdown";
import Select2 from "react-select";


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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const EditUpload = () => {

    const [categoryVal, setCategoryVal] = useState('');
    const [subCatVal, setSubCatVal] = useState('');

    const [productRams, setProductRams] = useState([]);
    const [productWeight, setProductWeight] = useState([]);
    const [productSize, setProductSize] = useState([]);

    const [ratingValue, setRatingValue] = useState(1);
    const [isFeaturedValue, setisFeaturedValue] = useState('');

    const [productRAMSData, setProductRAMSData] = useState([]);
    const [productWEIGHTData, setProductWEIGHTData] = useState([]);
    const [productSIZEData, setProductSIZEData] = useState([]);

    const [catData, setCatData] = useState([]);
    const [subCatData, setSubCatData] = useState([]);
    const [productImagesArr, setproductImagesArr] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [products, setProducts] = useState([]);

    const [files, setFiles] = useState([]);
    const [imgFiles, setimgFiles] = useState();
    const [previews, setPreviews] = useState();
    const [isSelectedFiles, setIsSelectedFiles] = useState(false);
    const [isSelectedImages, setIsSelectedImages] = useState(false);

    const [selectedLocation, setSelectedLocation] = useState([]);
    const [countryList, setCountryList] = useState([]);



    let { id } = useParams();

    const history = useNavigate();

    const [formFields, setFormFields] = useState({
        name: '',
        subCat: '',
        description: '',
        brand: '',
        price: null,
        oldPrice: null,
        category: '',
        subCatId: '',
        catName: '',
        countInStock: null,
        rating: 0,
        isFeatured: null,
        discount: null,
        productRam: [],
        size: [],
        productWeight: [],
        location: []
    });

    const productImages = useRef();

    const context = useContext(MyContext);

    const formdata = new FormData();

    useEffect(() => {
        window.scrollTo(0, 0);

        setCatData(context.catData);


        fetchDataFromApi(`/api/products/${id}`).then((res) => {
            setProducts(res);
            const catIdVal = res?.category?._id || res?.category || '';
            let subCatIdVal = '';
            if (res?.subCat && typeof res?.subCat === 'object') {
                subCatIdVal = res?.subCat?._id || res?.subCat?.id || '';
            } else if (typeof res?.subCat === 'string' && res.subCat !== '') {
                subCatIdVal = res.subCat;
            } else if (res?.subCatId && (res?.subCatName || res?.subCategory)) {
                subCatIdVal = res.subCatId;
            }

            const catNameVal = res?.category?.name || res?.catName || '';
            const subCatNameVal = res?.subCat?.name || res?.subCat?.subCat || res?.subCatName || res?.subCategory || '';

            setFormFields({
                name: res.name,
                description: res.description,
                brand: res.brand,
                price: res.price,
                oldPrice: res.oldPrice,
                catName: catNameVal,
                category: catIdVal,
                subCat: subCatIdVal,
                subCatId: subCatIdVal,
                subCatName: subCatNameVal,
                countInStock: res.countInStock,
                rating: res.rating,
                isFeatured: res.isFeatured,
                discount: res.discount,
                productRam: res.productRam,
                size: res.size,
                productWeight: res.productWeight,
                location: res.location
            });

            let locationArr = [];
            if (Array.isArray(res.location)) {
                locationArr = res.location.map((item) => ({
                    label: item.label,
                    value: item.label
                }));
            } else if (res.location && typeof res.location === 'string') {
                const arr = res.location.split(',');
                locationArr = arr.map((item) => ({
                    label: item.trim(),
                    value: item.trim()
                }));
            }

            setSelectedLocation(locationArr);

            setRatingValue(res.rating);
            setCategoryVal(catIdVal);
            setSubCatVal(subCatIdVal);
            setisFeaturedValue(res.isFeatured);
            setProductRams(res.productRam || []);
            setProductSize(res.size || []);
            setProductWeight(res.productWeight || []);
            setPreviews(res.images);
            context.setSelectedCountry(res.location || '');
            context.setSelectedLocation(res.location || '');
            setFormFields((prev) => ({
                ...prev,
                location: res.location || ''
            }));
            context.setProgress(100);
        });

        fetchDataFromApi("/api/productWeight").then((res) => {
            setProductWEIGHTData(res);
        });

        fetchDataFromApi("/api/productRAMS").then((res) => {
            setProductRAMSData(res);
        });

        fetchDataFromApi("/api/productSIZE").then((res) => {
            setProductSIZEData(res);
        });

        // Fetch fresh categories dynamically from database
        fetchDataFromApi("/api/category").then((res) => {
            setCatData(res);
        });

        // Fetch fresh subcategories dynamically from database
        fetchDataFromApi("/api/subCat").then((res) => {
            const list = res?.subCategoryList || (Array.isArray(res) ? res : []);
            setAllSubCatList(list);
        });

    }, []);

    const [allSubCatList, setAllSubCatList] = useState([]);

    useEffect(() => {
        formFields.location = context.selectedCountry;
    }, [context.selectedCountry]);

    useEffect(() => {
        setCountryList(context.countryList);
    }, [context.countryList]);

    const handleChangeLocation = (selectedOptions) => {
        setSelectedLocation(selectedOptions);
    };


    useEffect(() => {
        const availableCategories = catData?.categoryList?.length ? catData.categoryList : (context.catData?.categoryList || []);

        if (categoryVal) {
            const selectedCat = availableCategories.find(c => (c._id === categoryVal || c.id === categoryVal));
            const selectedCatName = selectedCat ? selectedCat.name : '';

            // Filter from dynamic subcategories collection
            const filtered = allSubCatList.filter(item => {
                const itemCatId = item.category?._id || item.category?.id || (typeof item.category === 'string' ? item.category : '') || item.parentId;
                const itemCatName = item.categoryName || item.category?.name || '';
                return (
                    (itemCatId && itemCatId.toString() === categoryVal.toString()) ||
                    (selectedCatName && itemCatName && itemCatName.trim().toLowerCase() === selectedCatName.trim().toLowerCase())
                );
            });

            if (filtered.length > 0) {
                setSubCatData(filtered);
                return;
            }

            // Fallback to selectedCat.children
            if (selectedCat && selectedCat.children && selectedCat.children.length > 0) {
                setSubCatData(selectedCat.children);
                return;
            }

            setSubCatData([]);
        } else {
            if (allSubCatList.length > 0) {
                setSubCatData(allSubCatList);
            } else {
                const subCatArr = [];
                availableCategories.forEach((cat) => {
                    if (cat?.children && cat.children.length !== 0) {
                        cat.children.forEach((subCat) => {
                            subCatArr.push(subCat);
                        });
                    }
                });
                setSubCatData(subCatArr);
            }
        }
    }, [categoryVal, allSubCatList, catData, context.catData]);

    const handleChangeCategory = (event) => {
        const selectedCatId = event.target.value;
        setCategoryVal(selectedCatId);

        const availableCategories = catData?.categoryList?.length ? catData.categoryList : (context.catData?.categoryList || []);
        const selectedCatObj = availableCategories.find(cat => (cat._id === selectedCatId || cat.id === selectedCatId));
        const catName = selectedCatObj ? selectedCatObj.name : '';

        setSubCatVal('');

        setFormFields((prev) => ({
            ...prev,
            category: selectedCatId,
            catName: catName,
            subCat: '',
            subCatId: '',
            subCatName: ''
        }));
    };

    const handleChangeSubCategory = (event) => {
        const selectedSubId = event.target.value;
        setSubCatVal(selectedSubId);

        const selectedSubObj = subCatData?.find(s => (s._id === selectedSubId || s.id === selectedSubId));
        const subName = selectedSubObj ? (selectedSubObj.name || selectedSubObj.subCat) : '';

        // Auto-select category if not selected
        let updatedCatId = categoryVal;
        let updatedCatName = formFields.catName;
        if (!categoryVal && selectedSubObj) {
            const pId = selectedSubObj.category?._id || selectedSubObj.category?.id || selectedSubObj.category || selectedSubObj.parentId;
            const pName = selectedSubObj.categoryName || selectedSubObj.category?.name;
            if (pId) {
                updatedCatId = pId;
                setCategoryVal(pId);
            }
            if (pName) {
                updatedCatName = pName;
            }
        }

        setFormFields((prev) => ({
            ...prev,
            category: updatedCatId || prev.category,
            catName: updatedCatName || prev.catName,
            subCat: selectedSubId,
            subCatId: selectedSubId,
            subCatName: subName
        }));
    };

    const handleChangeisFeaturedValue = (event) => {
        setisFeaturedValue(event.target.value);
        setFormFields(() => ({
            ...formFields,
            isFeatured: event.target.value
        }))
    };

    // const handleChangeProductRams = (event) => {
    //     setProductRams(event.target.value);
    //     setFormFields(() => ({
    //         ...formFields,
    //         productRAMS: event.target.value
    //     }))
    // };

    // const handleChangeProductWeight = (event) => {
    //     setProductWeight(event.target.value);
    //     setFormFields(() => ({
    //         ...formFields,
    //         productWEIGHT: event.target.value
    //     }))
    // };

    // const handleChangeProductSize = (event) => {
    //     setProductSize(event.target.value);
    //     setFormFields(() => ({
    //         ...formFields,
    //         productSIZE: event.target.value
    //     }))
    // };

    const handleChangeProductRams = (event) => {
        // setProductRams(event.target.value);
        // setFormFields(() => ({
        //     ...formFields,
        //     productRam: event.target.value
        // }))

        const {
            target: { value },
        } = event;
        setProductRams(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        formFields.productRam = value;

    };

    const handleChangeProductWeight = (event) => {
        // setProductWeight(event.target.value);
        // setFormFields(() => ({
        //     ...formFields,
        //     productWeight: event.target.value
        // }))


        const {
            target: { value },
        } = event;
        setProductWeight(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        formFields.productWeight = value;

    };

    const handleChangeProductSize = (event) => {
        // setProductSize(event.target.value);
        // setFormFields(() => ({
        //     ...formFields,
        //     size: event.target.value
        // }))  

        const {
            target: { value },
        } = event;
        setProductSize(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        formFields.size = value;

    };


    const inputChange = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }


    const selectCat = (cat) => {
        formFields.catName = cat;
    }




    const onChangeFile = async (e, apiEndPoint) => {
        try {

            const files = e.target.files;
            setUploading(true);

            // const fd = new FormData();
            for (var i = 0; i < files.length; i++) {

                //validate file type
                if (files[i] && (files[i].type === 'image/jpeg' || files[i].type === 'image/jpg' || files[i].type === 'image/png' || files[i].type === 'image/webp')) {

                    const file = files[i];

                    formdata.append(`images`, file);


                } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "Please select a valid JPG or PNG image file."
                    });

                    return false;
                }
            }


        } catch (error) {
            console.log(error);
        }


        postData(apiEndPoint, formdata).then((res) => {
            if (res && res.length !== 0) {
                const appendedArray = [...(previews || []), ...res];
                setPreviews(appendedArray);
                setIsSelectedImages(true);

                setTimeout(() => {
                    setUploading(false);
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Images Uploaded!"
                    });
                }, 500);
            } else {
                setUploading(false);
            }
        });

    }

    const removeImg = async (index, imgUrl) => {

        const imgIndex = previews.indexOf(imgUrl);

        deleteImages(`/api/category/deleteImage?img=${imgUrl}`).then((res) => {
            context.setAlertBox({
                open: true,
                error: false,
                msg: "Image Deleted!"
            })
        })

        if (imgIndex > -1) { //only splice array when item is found
            previews.splice(imgIndex, 1); //2nd parameter means remove one item only
        }
    }





    const editProduct = (e) => {
        e.preventDefault();

        const catId = (typeof categoryVal === 'object' ? categoryVal?._id : categoryVal) || (typeof formFields.category === 'object' ? formFields.category?._id : formFields.category) || '';
        const subId = (typeof subCatVal === 'object' ? subCatVal?._id : subCatVal) || (typeof formFields.subCat === 'object' ? formFields.subCat?._id : formFields.subCat) || '';

        const selectedSubObj = subCatData?.find(s => (s._id === subId || s.id === subId));
        const subName = selectedSubObj ? (selectedSubObj.name || selectedSubObj.subCat) : (formFields.subCatName || '');

        const availableCategories = catData?.categoryList?.length ? catData.categoryList : (context.catData?.categoryList || []);
        const selectedCatObj = availableCategories.find(c => (c._id === catId || c.id === catId));
        const catName = selectedCatObj ? selectedCatObj.name : (formFields.catName || '');

        formFields.location = selectedLocation;
        formFields.category = catId;
        formFields.catName = catName;
        formFields.subCat = subId;
        formFields.subCatId = subId ? String(subId) : '';
        formFields.subCatName = subName;

        if (formFields.name === "") {
            context.setAlertBox({
                open: true,
                msg: 'please add product name',
                error: true
            });
            return false;
        }

        if (formFields.description === "") {
            context.setAlertBox({
                open: true,
                msg: 'please add product description',
                error: true
            });
            return false;
        }

        if (formFields.brand === "") {
            context.setAlertBox({
                open: true,
                msg: 'please add product brand',
                error: true
            });
            return false;
        }

        if (formFields.price === null || formFields.price === '') {
            context.setAlertBox({
                open: true,
                msg: 'please add product price',
                error: true
            });
            return false;
        }

        if (formFields.oldPrice === null || formFields.oldPrice === '') {
            context.setAlertBox({
                open: true,
                msg: 'please add product oldPrice',
                error: true
            });
            return false;
        }

        if (!formFields.category) {
            context.setAlertBox({
                open: true,
                msg: 'please select a category',
                error: true
            });
            return false;
        }

        // subcategory is optional (if unselected, it saves as null in DB)

        if (formFields.countInStock === null || formFields.countInStock === '') {
            context.setAlertBox({
                open: true,
                msg: 'please add product count in stock',
                error: true
            });
            return false;
        }

        if (formFields.rating === 0) {
            context.setAlertBox({
                open: true,
                msg: 'please select product rating',
                error: true
            });
            return false;
        }

        if (formFields.isFeatured === null || formFields.isFeatured === undefined) {
            context.setAlertBox({
                open: true,
                msg: 'please select the product is a featured or not',
                error: true
            });
            return false;
        }

        if (formFields.discount === null || formFields.discount === '') {
            context.setAlertBox({
                open: true,
                msg: 'please select the product discount',
                error: true
            });
            return false;
        }

        formFields.images = previews;

        if (!previews || previews.length === 0) {
            context.setAlertBox({
                open: true,
                msg: 'please select images',
                error: true
            });
            return false;
        }

        setIsLoading(true);

        editData(`/api/products/${id}`, formFields).then((res) => {
            setIsLoading(false);

            if (res?.error || res?.status === false || res?.success === false) {
                context.setAlertBox({
                    open: true,
                    msg: res?.msg || res?.message || res?.error || 'Failed to update product!',
                    error: true
                });
                return;
            }

            context.setAlertBox({
                open: true,
                msg: 'The product is updated!',
                error: false
            });

            history('/products');
        });
    }


    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col">
                    <h5 className="mb-0">Product Edit</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            label="Products"
                            href="#"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb
                            label="Product Edit"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className="form" onSubmit={editProduct}>
                    <div className='row'>
                        <div className="col-md-12">
                            <div className="card p-4 mt-0">
                                <h5 className="mb-4">Basic Information</h5>

                                <div className="form-group">
                                    <h6>PRODUCT NAME</h6>
                                    <input type='text' name="name" value={formFields.name} onChange={inputChange} />
                                </div>

                                <div className="form-group">
                                    <h6>DESCRIPTION</h6>
                                    <textarea rows={5} cols={10} name="description" value={formFields.description} onChange={inputChange} />
                                </div>





                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>CATEGORY</h6>
                                            <Select
                                                value={categoryVal}
                                                onChange={handleChangeCategory}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>
                                                {
                                                    (catData?.categoryList?.length ? catData.categoryList : (context.catData?.categoryList || []))?.map((cat, index) => {
                                                        return (
                                                            <MenuItem className="text-capitalize" value={cat._id} key={cat._id || index}
                                                                onClick={() => selectCat(cat.name)}
                                                            >{cat.name}</MenuItem>
                                                        )
                                                    })
                                                }

                                            </Select>

                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>SUB CATEGORY</h6>
                                            <Select
                                                value={subCatVal}
                                                onChange={handleChangeSubCategory}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>

                                                {
                                                    subCatData?.length !== 0 &&
                                                    subCatData?.map((subCat, index) => {
                                                        return (
                                                            <MenuItem value={subCat._id || subCat.id} key={subCat._id || subCat.id || index}>
                                                                {subCat.name || subCat.subCat}
                                                            </MenuItem>
                                                        )
                                                    })
                                                }



                                            </Select>

                                        </div>
                                    </div>


                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>PRICE</h6>
                                            <input type='text' name="price" value={formFields.price} onChange={inputChange} />
                                        </div>
                                    </div>

                                </div>


                                <div className="row">

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>OLD PRICE</h6>
                                            <input type='text' name="oldPrice" value={formFields.oldPrice} onChange={inputChange} />
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6 className="text-uppercase">is Featured</h6>
                                            <Select
                                                value={isFeaturedValue}
                                                onChange={handleChangeisFeaturedValue}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>
                                                <MenuItem value={true}>True</MenuItem>
                                                <MenuItem value={false}>False</MenuItem>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>PRODUCT STOCK</h6>
                                            <input type='text' name="countInStock" value={formFields.countInStock} onChange={inputChange} />
                                        </div>
                                    </div>
                                </div>



                                <div className="row">
                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <h6>BRAND</h6>
                                            <input type='text' name="brand" value={formFields.brand} onChange={inputChange} />
                                        </div>
                                    </div>

                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <h6>DISCOUNT</h6>
                                            <input type='text' name="discount" value={formFields.discount} onChange={inputChange} />
                                        </div>
                                    </div>

                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <h6>PRODUCT RAMS</h6>
                                            <Select
                                                multiple
                                                value={productRams}
                                                onChange={handleChangeProductRams}
                                                displayEmpty
                                                className="w-100"
                                                MenuProps={MenuProps}
                                            >
                                                {
                                                    Array.isArray(productRAMSData) && productRAMSData?.map((item, index) => {
                                                        return (
                                                            <MenuItem key={index} value={item.productRam}>{item.productRam}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </div>
                                    </div>

                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <h6>PRODUCT WEIGHT</h6>
                                            <Select
                                                multiple
                                                value={productWeight}
                                                onChange={handleChangeProductWeight}
                                                displayEmpty
                                                className="w-100"
                                                MenuProps={MenuProps}
                                            >
                                                {
                                                    Array.isArray(productWEIGHTData) && productWEIGHTData?.map((item, index) => {
                                                        return (
                                                            <MenuItem key={index} value={item.productWeight}>{item.productWeight}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </div>
                                    </div>

                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <h6>PRODUCT SIZE</h6>
                                            <Select
                                                multiple
                                                value={productSize}
                                                onChange={handleChangeProductSize}
                                                displayEmpty
                                                className="w-100"
                                                MenuProps={MenuProps}
                                            >
                                                {
                                                    Array.isArray(productSIZEData) && productSIZEData?.map((item, index) => {
                                                        return (
                                                            <MenuItem key={index} value={item.size}>{item.size}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </div>
                                    </div>

                                    <div className='col-md-4'>
                                        <div className='col'>
                                            <div className='form-group'>
                                                <h6>RATINGS</h6>
                                                <Rating
                                                    name="simple-controlled"
                                                    value={ratingValue}
                                                    onChange={(event, newValue) => {
                                                        setRatingValue(newValue);
                                                        setFormFields(() => ({
                                                            ...formFields,
                                                            rating: newValue
                                                        }))
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className='col-md-12'>
                                            <div className='form-group'>
                                                <h6>LOCATION</h6>
                                                <Select2
                                                    value={selectedLocation}
                                                    isMulti
                                                    name="location"
                                                    options={countryList}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={handleChangeLocation}
                                                    placeholder="Select Location..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className='card p-4 mt-0'>
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
                                    <input type="file" multiple onChange={(e) => onChangeFile(e, '/api/products/upload')} name="images" />
                                    <div className="info">
                                        <FaRegImages />
                                        <h5>image upload</h5>
                                    </div>

                                </div>


                            </div>


                            <br />

                            <Button type="submit" className="btn-blue btn-lg btn-big w-100" ><FaCloudUploadAlt /> &nbsp; {isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'PUBLISH AND VIEW'} </Button>
                        </div>
                    </div>
                </form>

            </div>
        </>
    )
}

export default EditUpload;