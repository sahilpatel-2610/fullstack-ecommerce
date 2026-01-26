import DashboardBox from "./components/dashboardBox";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";
import Button from '@mui/material/Button';
import { HiDotsVertical } from "react-icons/hi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from "react";
import { IoIosTimer } from "react-icons/io";
import { Chart } from "react-google-charts";

import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { useContext } from "react";
import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";
import { deleteData } from "../../utils/api";
import { Rating } from "@mui/material";

export const data = [
  ["Year", "Sales", "Expenses"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
];

export const options = {
    'backgroundColor': 'transparent',
    'chartArea': {'width': '100%', 'height': '80%'},
};

const Dashboard = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [showBy, setShowBy] = useState('');
    const [showBysetCatBy, setCatBy] = useState('');
    const [productList, setProductList] = useState([]);

    const open = Boolean(anchorEl);
    
    const ITEM_HEIGHT = 48;

    const context = useContext(MyContext);


    useEffect(() => {
        context.setisHideSidebarAndHeader(false);
        window.scrollTo(0,0);
        context.setProgress(40);
        fetchDataFromApi("/api/products").then((res)=>{
            setProductList(res);
            context.setProgress(100);
        })
    },[]);

    const deleteProduct = (id) => {
        context.setProgress(40);
        deleteData(`/api/products/${id}`).then((res)=>{
            context.setProgress(100);
            context.setAlertBox({
                open: true,
                error: false,
                msg: "Product Deleted!",
            });
                
            fetchDataFromApi("/api/products").then((res)=>{
                setProductList(res);
            })
    
        })
    }
    
    const handleChange = (event, value) => {
    context.setProgress(40);
        fetchDataFromApi(`/api/products?page=${value}`).then((res) => {
            setProductList(res);
            context.setProgress(100);
        })
    }
            

   
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className="right-content w-100">
               <div className="row dashboardBoxWrapperRow">
                    <div className="col-md-8">
                        <div className="dashboardBoxWrapper d-flex">
                            <DashboardBox color={["#1da256", "#48d483"]} icon={<FaUserCircle />} grow={true} />
                            <DashboardBox color={["#c012e2", "#eb64fe"]} icon={<IoMdCart />} />
                            <DashboardBox color={["#2c78e5", "#60aff5"]} icon={<MdShoppingBag />} />
                            <DashboardBox color={["#e1950e", "#f3cd29"]} icon={<GiStarsStack />} />
                        </div>
                    </div>


                    <div className="col-md-4 pl-0 topPart2">
                        <div className="box graphBox">
                            <div className="d-flex align-items-center w-100 bottomEle">
                                <h6 className="text-white mb-0 mt-0">Total Sales</h6>
                                    <div className="ml-auto">
                                        <Button className="ml-auto toggleIcon"  onClick={handleClick}><HiDotsVertical /></Button>
                                        <Menu
                                            className="dropdown_menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'long-button',
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            slotProps={{
                                                paper: {
                                                    style: {
                                                        maxHeight: ITEM_HEIGHT * 4.5,
                                                        width: '20ch',
                                                    },
                                                },
                            
                                            }}
                                        >
                                                       
                                            <MenuItem onClick={handleClose}>
                                                <IoIosTimer /> Last Day
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <IoIosTimer /> Last Week
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <IoIosTimer /> Last Month
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <IoIosTimer /> Last Year
                                            </MenuItem>
                                        </Menu>
                                    </div>
                            </div>

                            <h3 className="text-white font-weight-bold">$3,787,681.00</h3>
                            <p>$3,578.90 in last month</p>
                            

                            <Chart
                                chartType="PieChart"
                                width="100%"
                                height="170px"
                                data={data}
                                options={options}
                            />

                        </div>
                    </div>

                </div>





                <div className="card shadow border-0 p-3 mt-4">
                    <h3 className="hd">Best Selling Products</h3>




                    <div className="row cardFilters mt-3">
                        <div className="col-md-3">
                            <h4>SHOW BY</h4>
                            <FormControl size="small" className="w-100">
                            <Select
                                value={showBy}
                                onChange={(e) => setShowBy(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                labelId="demo-select-small-label"
                                className="w-100"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            </FormControl>
                        </div>

                        <div className="col-md-3">
                            <h4>CATEGORY BY</h4>
                            <FormControl size="small" className="w-100">
                            <Select
                                value={showBysetCatBy}
                                onChange={(e) => setCatBy(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                labelId="demo-select-small-label"
                                className="w-100"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            </FormControl>
                        </div>
                    </div>
                    


                    <div className="table-responsive mt-3">
                        <table className="table table-bordered table-striped v-align">
                            <thead className="thead-dark">
                                <tr>
                                    {/* <th>UID</th> */}
                                    <th style={{width:'300px'}}>PRODUCT</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th>PRICE</th>
                                    <th>RATING</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                    
                            <tbody>
                            {
                                productList?.products?.length !== 0 && productList?.products?.map((item,index)=>{
                                    return (
                                        <tr>
                                            {/* <td>
                                                <div className="d-flex align-items-center">
                                                    <Checkbox {...label} />  <span>#1</span>
                                                </div>
                                            </td> */}
                                            <td>
                                                <div className="d-flex align-items-center productBox">
                                                    <div className="imgWrapper">
                                                        <div className="img card shadow m-0">
                                                            <img src={`${context.baseUrl}/uploads/${item?.images[0]}`} className="w-100" />
                                                        </div>
                                                    </div>
                                                    <div className="info pl-0">
                                                        <h6> &nbsp; {item.name}</h6>
                                                        <p> &nbsp; {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{item.category.name}</td>
                                            <td>{item.brand}</td>
                                            <td>
                                                <div style={{ width: '70px' }}>
                                                    <del className="old">Rs {item.oldPrice}</del>
                                                        <span className="new text-danger">Rs {item.Price}</span>
                                                </div>
                                            </td>
                                            <td><Rating name="read-only" defaultValue={item.rating} precision={0.5} size="small" readOnly /></td>
                                                                
                                            <td>
                                                <div className="actions d-flex align-items-center">
                                                    <Link to="product/details">
                                                        <Link to="product/details">
                                                            <Button className="secondary"
                                                                color="secondary"><FaEye />
                                                            </Button>
                                                        </Link>
                                                    </Link>
                                                    <Button className="success"
                                                        color="success"><FaPencilAlt /></Button>
                                                    <Button className="error"
                                                        color="error" onClick={()=>deleteProduct(item.id)}><MdDelete /></Button>
                                                </div>
                                            </td>
                                        </tr>
                    
                                    )
                                })
                            }
                                                   
                        </tbody>
                    </table>
                    
                    <div className="d-flex tableFooter">
                        <Pagination count={productList?.totalPages} color="primary" className="pagination" showFirstButton showLastButton onChange={handleChange} />
                    </div>
                    
                </div>

                </div>


            </div>
        </>
    )

}

export default Dashboard;