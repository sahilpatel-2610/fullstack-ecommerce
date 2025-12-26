import { Breadcrumbs, colors } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from '@mui/material/Button';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

import { MyContext } from "../../App";
import { useContext } from "react";


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
      

const CategoryAdd = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        name: '',
        images: [],
        color: ''
    });
    const history = useNavigate();

    const context = useContext(MyContext);

    


    const changeInput = (e) => {
        setFormFields(() => (
            {
                ...formFields,
                [e.target.name]:e.target.value
            }
        ))
    }

  
    const addImgUrl = (e) => {
        const arr = [];
        arr.push(e.target.value);
        setFormFields(() => (
            {
                ...formFields,
                [e.target.name]: arr
            }
        ))
    }
  
    const addCategory = (e) => {
        e.preventDefault();

        if(formFields.name !== "" && formFields.images.length !== 0 && formFields.color !== ""){
            setIsLoading(true);

            postData('/api/category/create', formFields).then(res => {
                setIsLoading(false);
                history('/category');
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


    // const addCategory = async (e) => {
    //     e.preventDefault();

    //     try {
    //         await postData('/api/category/create', formFields);

  
    //         navigate("/category");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col">
                    <h5 className="mb-0">Add Category</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
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

                <form className="form" onSubmit={addCategory}>
                    <div className='row'>
                        <div className="col-md-12">
                            <div className="card p-4 mt-0">

                                <div className="form-group">
                                    <h6>Category Name</h6>
                                    <input type='text' name="name" onChange={changeInput} />
                                </div>

                                <div className="form-group">
                                    <h6>Image Url</h6>
                                    <input type='text' name="images" onChange={addImgUrl} />
                                </div>

                                 <div className="form-group">
                                    <h6>Color</h6>
                                    <input type='text' name="color" onChange={changeInput} />
                                </div>


                                <br />

                                <Button type="submit" className="btn-blue btn-lg btn-big w-100"><FaCloudUploadAlt /> &nbsp; {isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'PUBLISH AND VIEW'}  </Button>

                            </div>
                        </div>

                        
                    </div>


                    
                </form>

            </div>
        </>
    )
}

export default CategoryAdd;