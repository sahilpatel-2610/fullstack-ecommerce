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
import { fetchDataFromApi, postData } from "../../utils/api";
import { useEffect } from "react";
import { MyContext } from "../../App";
import { useContext } from "react";
import CircularProgress from '@mui/material/CircularProgress';


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

const ProductUpload = () => {

    const [categoryVal, setCategoryVal] = useState('');
    const [subCatVal, setSubCatVal] = useState('');
    const [ratingValue, setRatingValue] = useState(1);
    const [productRams, setProductRAMS] = useState([]);
    const [isFeaturedValue, setisFeaturedValue] = useState('');

    const [catData, setCatData] = useState([]);
    const [productImagesArr, setproductImagesArr] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState([]);

    const [formFields, setFormFields] = useState({
        name: '',
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
        window.scrollTo(0,0);
        context.setProgress(20);

        fetchDataFromApi('/api/category').then((res) => {
            setCatData(res);
            context.setProgress(100);
        })

        

    },[]);


    const handleChangeCategory = (event) => {
        setCategoryVal(event.target.value);
        setFormFields(() => ({
            ...formFields,
            category:event.target.value
        }))
    };

    const handleChangeSubCategory = (event) => {
        setSubCatVal(event.target.value);
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

    
    // const addProductImages = () => {

    //     const arr=[];

    //     const imgGrid = document.querySelector('#imgGrid');

    //     const imgData = ` <div class='img'>
    //                         <img src="${productImages.current.value}" alt="image"
    //                         class="w-100" />
    //                    </div> `;

    //       arr[parseInt(count)] = productImages.current.value
    //       setCount(count+1);

    //       setFormFields(() => ({
    //         ...formFields,
    //         images:arr
    //       }))

    //     imgGrid.insertAdjacentHTML('beforeend', imgData);

    //     productImages.current.value = "";
    // }

    const addProductImages = () => {
        setproductImagesArr(prevArray => [...prevArray, productImages.current.value]);
        productImages.current.value = "";
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
                const file = files[i];
                imgArr.push(file);
                formdata.append(`images`, file);
            }


            setFiles(imgArr);

            postData(apiEndPoint, formdata).then((res) => {
                console.log(res);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const addProduct = (e) => {
        e.preventDefault();
    

        formdata.append('name', formFields.name);
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

        if(formFields.images.length === 0) {
            context.setAlertBox({
                open: true,
                msg: 'please add product images',
                error: true
            });
            return false;
        }

        setIsLoading(true);

        postData('/api/products/create', formFields).then((res) => {
            context.setAlertBox({
                open:true,
                msg:'The product is created!',
                error:false
            });

            setIsLoading(false);

            setFormFields({
                name: '',
                description: '',
                brand: '',
                price: 0,
                oldPrice: 0,
                category: '',
                countInStock: 0,
                rating: 0,
                isFeatured: false,
                images: []
            });
        })
    }

    // const addProduct = (e) => {
    //     e.preventDefault();

    //     const payload = {
    //         ...formFields,
    //         images: productImagesArr
    //     };

    //     postData('/api/products/create', payload)
    //         .then(() => {
    //             context.setAlertBox({
    //                 open: true,
    //                 msg: 'The product is created!',
    //                 error: false
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // };


    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col">
                    <h5 className="mb-0">Product Upload</h5>
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


                {/* <form className="form">
                    <div className='row'>
                        <div className="col-sm-9">
                            <div className="card p-4">
                                <h5 className="mb-4">Basic Information</h5>
                                
                                <div className="form-group">
                                    <h6>TITLE</h6>
                                    <input type='text' />
                                </div>

                                <div className="form-group">
                                    <h6>DESCRIPTION</h6>
                                    <textarea rows={5} cols={10} />
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
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </div> 
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>   
                                            <h6>BRAND</h6>  
                                            <Select
                                                value={categoryVal}
                                                onChange={handleChangeCategory}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                </div>


                               <div className="row">
                                    <div className='col'>
                                        <div className='form-group'>   
                                            <h6>REGULAR PRICE</h6> 
                                                <input type='text' />
                                        </div>
                                    </div>     

                                    <div className='col'>
                                        <div className='form-group'>   
                                            <h6>DISCOUNT PRICE</h6>
                                               <input type='text' /> 
                                        </div>
                                    </div>        
                                </div>



                                <div className="row">
                                    <div className='col'>
                                        <div className='form-group'>   
                                            <h6>RATINGS</h6> 
                                                <Rating
                                                    name="simple-uncontrolled"
                                                    value={ratingValue}
                                                    onChange={(event, newValue) => {
                                                        setRatingValue(newValue);
                                                    }}
                                                />
                                        </div>
                                    </div>     

                                    <div className='col'>
                                        <div className='form-group'>   
                                            <h6>PRODUCT STOCK</h6>
                                               <input type='text' /> 
                                        </div>
                                    </div>        
                                </div>

                                <br/>

                                <Button className="btn-blue btn-lg btn-big"><FaCloudUploadAlt /> &nbsp;PUBLISH AND VIEW</Button>


                            </div>
                        </div>

                        
                    </div>
                </form> */}

                <form className="form" onSubmit={addProduct}>
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
                                                <MenuItem className="text-capitalize" value="Jeans">Jeans</MenuItem>

                                                <MenuItem className="text-capitalize" value="Shirts">Shirts</MenuItem>
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


                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6 className="text-uppercase">PRODUCT IMAGES</h6>
                                            <div className="position-relative inputBtn">
                                                <input type="text" required ref={productImages} style={{paddingRight:'100px'}} name="images" onChange={inputChange} />
                                                <Button className="btn-blue" onClick={addProductImages}>Add</Button>
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

                                <div className="uploadBox">
                                    <span className="remove mr-3"><IoCloseSharp /></span>
                                    <div className="box">
                                        <LazyLoadImage
                                            alt={"image"}
                                            effect="blur"
                                            className="w-100"
                                            src={'https://plus.unsplash.com/premium_photo-1712267564480-b3e89550e644?q=80&w=1157&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                        />
                                        <LazyLoadImage
                                            alt={"image"}
                                            effect="blur"
                                            className="w-100"
                                            src={'https://plus.unsplash.com/premium_photo-1712267564480-b3e89550e644?q=80&w=1157&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                        />
                                        <LazyLoadImage
                                            alt={"image"}
                                            effect="blur"
                                            className="w-100"
                                            src={'https://plus.unsplash.com/premium_photo-1712267564480-b3e89550e644?q=80&w=1157&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                        />
                                        <LazyLoadImage
                                            alt={"image"}
                                            effect="blur"
                                            className="w-100"
                                            src={'https://plus.unsplash.com/premium_photo-1712267564480-b3e89550e644?q=80&w=1157&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                        />
                                        <LazyLoadImage
                                            alt={"image"}
                                            effect="blur"
                                            className="w-100"
                                            src={'https://plus.unsplash.com/premium_photo-1712267564480-b3e89550e644?q=80&w=1157&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                        />
                                    </div>
                                </div>




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

export default ProductUpload;