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
import { editData, fetchDataFromApi, postData } from "../../utils/api";
import { useEffect } from "react";
import { MyContext } from "../../App";
import { useContext } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
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

const ProductEdit = () => {

    const [categoryVal, setCategoryVal] = useState('');
    const [subCatVal, setSubCatVal] = useState('');
    const [ratingValue, setRatingValue] = useState(1);
    const [productRams, setProductRAMS] = useState([]);
    const [isFeaturedValue, setisFeaturedValue] = useState('');

    const [catData, setCatData] = useState([]);
    const [productImagesArr, setproductImagesArr] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const [files, setFiles] = useState([]);
    const [imgFiles, setimgFiles] = useState();
    const [previews, setPreviews] = useState();
    const [isSelectedFiles, setIsSelectedFiles] = useState(false);
    const [isSelectedImages, setIsSelectedImages] = useState(false);

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
        countInStock: null,
        rating: 0,
        isFeatured: null,
    });

    const productImages = useRef();

    const context = useContext(MyContext);

    const formdata = new FormData();

    useEffect(() => {
        window.scrollTo(0, 0);
        setCatData(context.catData);


        fetchDataFromApi(`/api/products/${id}`).then((res) => {
            setProducts(res);
            setFormFields({
                name: res.name,
                subCat: res.subCat,
                description: res.description,
                brand: res.brand,
                price: res.price,
                oldPrice: res.oldPrice,
                category: res.category,
                countInStock: res.countInStock,
                rating: res.rating,
                isFeatured: res.isFeatured,
            });

            setRatingValue(res.rating);
            setCategoryVal(res.category);
            setSubCatVal(res.subCat);
            setisFeaturedValue(res.isFeatured);
            setPreviews(res.images);
            context.setProgress(100);
        });

    },[]);


    useEffect(() => {
        if (!imgFiles) return;
        let tmp = [];
        for(let i=0; i<imgFiles.length; i++){
            tmp.push(URL.createObjectURL(imgFiles[i]));
        }

        const objectUrls = tmp;
        setPreviews(objectUrls);

        // free memory 
        for(let i=0; i<objectUrls.length; i++){
            return() => {
                URL.revokeObjectURL(objectUrls[i]);
            }
        }
    }, [imgFiles]);


    const handleChangeCategory = (event) => {
        setCategoryVal(event.target.value);
        setFormFields(() => ({
            ...formFields,
            category: event.target.value
        }))
    };

    const handleChangeSubCategory = (event) => {
        setSubCatVal(event.target.value);
        setFormFields(() => ({
            ...formFields,
            subCat: event.target.value
        }))
    };

    const handleChangeisFeaturedValue = (event) => {
        setisFeaturedValue(event.target.value);
        setFormFields(() => ({
            ...formFields,
            isFeatured:event.target.value
        }))
    };

    const handleChangeProductRams = (event) => {
        const {
            target: { value },
        } = event;
        setProductRAMS(
            typeof value === 'string' ? value.split(',') : value,
        );


    }


    const inputChange = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }


    
    const onChangeFile = async(e, apiEndPoint) => {
        try {
            const imgArr = [];
            const files = e.target.files;

            // const fd = new FormData();
            for (var i = 0; i < files.length; i++) {
                if (files[i] && (files[i].type === 'image/jpeg' || files[i].type === 'image/jpg' || files[i].type === 'image/png')) {
                    setimgFiles(files);
                    const file = files[i];
                    imgArr.push(file);
                    formdata.append(`images`, file);

                    setFiles(imgArr);

                    console.log(imgArr);
                    setIsSelectedImages(true);
                    postData(apiEndPoint, formdata, id).then((res) => {
                        context.setAlertBox({
                            open: true,
                            error: false,
                            msg: "Image uploaded!"
                        })
                    });

                } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "Please select a valid JPG or PNG image file."
                    });
                }    
            }
             
            
            setIsSelectedFiles(true);

            console.log(imgArr); 
            postData(apiEndPoint, formdata).then((res) => {
                       
            });
           
        } catch (error) {
            console.log(error);
        }
    }


    const editProduct = (e) => {
        e.preventDefault();
    

        formdata.append('name', formFields.name);
        formdata.append('subCat', formFields.subCat);
        formdata.append('description', formFields.description);
        formdata.append('brand', formFields.brand);
        formdata.append('price', formFields.price);
        formdata.append('oldPrice', formFields.oldPrice);
        formdata.append('category', formFields.category);
        formdata.append('countInStock', formFields.countInStock);
        formdata.append('rating', formFields.rating);
        formdata.append('isFeatured', formFields.isFeatured);
        // formdata.append('images', productImagesArr);



        if(formFields.name === "") {
            context.setAlertBox({
                open: true,
                msg: 'please add product name',
                error: true
            });
            return false;
        }

        if(formFields.description === "") {
            context.setAlertBox({
                open: true,
                msg: 'please add product description',
                error: true
            });
            return false;
        }

        if(formFields.brand === "") {
            context.setAlertBox({
                open: true,
                msg: 'please add product brand',
                error: true
            });
            return false;
        }

        if(formFields.price === null) {
            context.setAlertBox({
                open: true,
                msg: 'please add product price',
                error: true
            });
            return false;
        }

        if(formFields.oldPrice === null) {
            context.setAlertBox({
                open: true,
                msg: 'please add product oldPrice',
                error: true
            });
            return false;
        }

        if(formFields.category === "") {
            context.setAlertBox({
                open: true,
                msg: 'please select a category',
                error: true
            })
        }

        if(formFields.subCat === "") {
            context.setAlertBox({
                open: true,
                msg: 'please select a sub category',
                error: true
            })
        }


        if(formFields.countInStock === null) {
            context.setAlertBox({
                open: true,
                msg: 'please add product count in stock',
                error: true
            });
            return false;
        }

        if(formFields.rating === 0) {
            context.setAlertBox({
                open: true,
                msg: 'please select product rating',
                error: true
            });
            return false;
        }

        if(formFields.isFeatured === null) {
            context.setAlertBox({
                open: true,
                msg: 'please select the product is a featured or not',
                error: true
            });
            return false;
        }

        setIsLoading(true);

        editData(`/api/products/${id}`, formFields).then((res) => {
            context.setAlertBox({
                open: true,
                msg: 'The product is updated!',
                error: false
            });

            setIsLoading(false);

            history('/products');
        })
    }

   
    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col">
                    <h5 className="mb-0">Edit Upload</h5>
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
                            label="Product Upload"
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
                                                    catData?.categoryList?.length !== 0 && catData?.categoryList?.map((cat,index)=>{
                                                    // catData?.categoryList?.map((cat, index) => {
                                                        return(
                                                            <MenuItem className="text-capitalize" value={cat._id} key={index} >{cat.name}</MenuItem>
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
                                                    catData?.categoryList?.length !== 0 && catData?.categoryList?.map((cat,index)=>{
                                                    // catData?.categoryList?.map((cat, index) => {
                                                        return(
                                                            <MenuItem className="text-capitalize" value={cat.subCat} key={index} >{cat.subCat}</MenuItem>
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
                                                <input type='text' name="oldPrice" value={formFields.oldPrice}  onChange={inputChange} />
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
                                                    <MenuItem value="4GB">4GB</MenuItem>
                                                    <MenuItem value="8GB">8GB</MenuItem>
                                                    <MenuItem value="16GB">16GB</MenuItem>
                                                    <MenuItem value="32GB">32GB</MenuItem>
                                                </Select>
                                        </div>
                                    </div> 
                                </div>


                                <div className="row">
                                    
                                    
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
                                                                rating:newValue
                                                            }))
                                                        }}      
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
                                            {
                                                isSelectedImages === true ? <img src={`${img}`} className="w-100" /> : <img src={`${context.baseUrl}/uploads/${img}`} className="w-100" />
                                            }
                                            
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

export default ProductEdit;