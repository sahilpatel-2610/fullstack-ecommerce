import { Breadcrumbs, CircularProgress } from "@mui/material";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MyContext } from '../../App';
import { useContext, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import { deleteData, postData } from "../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

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


const AddSubCat = () => {

    const [categoryVal, setCategoryVal] = useState('');
    const [catData, setCatData] = useState([]);
    const [subCatData, setSubCatData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [formFields, setFormFields] = useState({
        name: '',
        slug: '',
        parentId: ''
    });

    const history = useNavigate();
    const context = useContext(MyContext);


    useEffect(() => {
        setCatData(context.catData);
        setSubCatData(context.subCatData);
    }, [context.catData, context.subCatData]);


    const inputChange = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }


    const handleChangeCategory = (event) => {
        setCategoryVal(event.target.value);
        setFormFields((prev) => ({
            ...prev,
            parentId: event.target.value
        }))
    };


    const addSubCategory = (e) => {
        e.preventDefault();

        const data = {
            ...formFields,
            slug: formFields.name
        }


        if (formFields.name !== "" && formFields.parentId !== "") {
            setIsLoading(true);


            postData('/api/category/create', data).then(res => {
                setIsLoading(false);

                deleteData("/api/imageUpload/deleteAllImages");

                history('/subCategory');
            });

        } else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Please select a parent category and enter a name',
            });
        }

    }


    return (
        <div className="right-content w-100">
            <div className="card shadow border-0 w-100 flex-row p-4 mt-2 align-items-center">
                <h5 className="mb-0">Add Sub Category</h5>
                <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
                    <StyledBreadcrumb
                        component={Link}
                        to="/"
                        label="Dashboard"
                        icon={<HomeIcon fontSize="small" />}
                    />
                    <StyledBreadcrumb
                        component={Link}
                        to="/subCategory"
                        label="Sub Category"
                    />
                    <StyledBreadcrumb
                        label="Add Category"
                    />
                </Breadcrumbs>
            </div>

            <form className="form" onSubmit={addSubCategory}>
                <div className='row'>
                    <div className="col-sm-9">
                        <div className="card p-4 mt-0">

                            <div className='form-group'>
                                <h6>Parent Category</h6>
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
                                        catData?.categoryList?.length !== 0 && catData?.categoryList?.map((cat, index) => {
                                            // catData?.categoryList?.map((cat, index) => {
                                            return (
                                                <MenuItem className="text-capitalize" value={cat._id} key={index} >{cat.name}</MenuItem>
                                            )
                                        })
                                    }

                                </Select>

                            </div>


                            <div className='form-group'>
                                <h6>SUB CATEGORY</h6>
                                <input type='text' name="name" value={formFields.name} onChange={inputChange} />
                            </div>


                            <Button type="submit" className="btn-blue btn-lg btn-big w-100" ><FaCloudUploadAlt /> &nbsp; {isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'PUBLISH AND VIEW'} </Button>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddSubCat;