import { Breadcrumbs, CircularProgress } from "@mui/material";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MyContext } from '../../App';
import { useContext, useState } from "react";
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import { deleteData, editData, fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
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


const AddProductWeight = () => {

    const [editId, setEditId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [productWeightData, setProductWeightData] = useState([]);
    const [formFields, setFormFields] = useState({
        productWeight: '',
    });

    const history = useNavigate();
    const context = useContext(MyContext);

    const inputChange = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        fetchDataFromApi("/api/productWeight").then((res) => {
            setProductWeightData(res);
        })
    }, []);

    const addproductWeight = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('productWeight', formFields.productWeight);

        if (formFields.productWeight === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Please add product Weight',
            });
            return false;
        }

        setIsLoading(true);

        if (editId === "") {

            postData('/api/productWeight/create', formFields).then(res => {
                setIsLoading(false);
                setFormFields({
                    productWeight: ""
                });


                fetchDataFromApi("/api/productWeight").then((res) => {
                    setProductWeightData(res);
                })

            });

        } else {

            editData(`/api/productWeight/${editId}`, formFields).then((res) => {
                fetchDataFromApi("/api/productWeight").then((res) => {
                    setProductWeightData(res);
                    setEditId("");
                    setIsLoading(false);
                })
            })
        }


    }

    const deleteItem = (id) => {
        deleteData(`/api/productWeight/${id}`).then((res) => {
            fetchDataFromApi("/api/productWeight").then((res) => {
                setProductWeightData(res);
            })
        })
    }

    const updateData = (id) => {
        fetchDataFromApi(`/api/productWeight/${id}`).then((res) => {
            setEditId(id);
            setFormFields({
                productWeight: res.productWeight
            })
        })
    }


    return (
        <div className="right-content w-100">
            <div className="card shadow border-0 w-100 flex-row p-4 mt-2">
                <h5 className="mb-0">Add Product WEIGHT</h5>
                <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
                    <StyledBreadcrumb
                        component={Link}
                        to="/"
                        label="Dashboard"
                        icon={<HomeIcon fontSize="small" />}
                    />
                    <StyledBreadcrumb
                        component={Link}
                        label="Product WEIGHT"
                        to="/productWEIGHT/add"
                    />
                    <StyledBreadcrumb
                        label="Add Product WEIGHT"
                    />
                </Breadcrumbs>
            </div>

            <form className="form" onSubmit={addproductWeight}>
                <div className='row'>
                    <div className="col-sm-9">
                        <div className="card p-4 mt-0">
                            <div className="row">

                                <div className='col md-4'>
                                    <div className='form-group'>
                                        <h6>PRODUCT WEIGHT</h6>
                                        <input type='text' name="productWeight" value={formFields.productWeight} onChange={inputChange} />
                                    </div>
                                </div>


                            </div>



                            <Button type="submit" className="btn-blue btn-lg btn-big w-100" ><FaCloudUploadAlt /> &nbsp; {isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'PUBLISH AND VIEW'} </Button>

                        </div>
                    </div>
                </div>
            </form>

            {
                productWeightData.length !== 0 &&

                <div className="row">
                    <div className="col-md-9">
                        <div className="card p-4 mt-0">
                            <div className="table-responsive mt-3">
                                <table className="table table-bordered table-striped v-align">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>PRODUCT WEIGHT</th>
                                            <th width="25%">ACTION</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            productWeightData?.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            {item.productWeight}
                                                        </td>
                                                        <td>
                                                            <div className="actions d-flex align-items-center">

                                                                <Button className="success"
                                                                    color="success" onClick={() => updateData(item._id)}><FaPencilAlt /></Button>

                                                                <Button className="error"
                                                                    color="error" onClick={() => deleteItem(item._id)} ><MdDelete /></Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>

                                </table>

                            </div>
                        </div>
                    </div>
                </div>

            }
        </div>
    );
}

export default AddProductWeight;