import Button from '@mui/material/Button';
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { MyContext } from '../../../App';
import { useContext, useState } from 'react';
import { FaAngleRight } from "react-icons/fa6";

const Navigation = (props) => {

    const [isOpenSidebarVal, setIsOpenSidebarVal] = useState(false);
    const context = useContext(MyContext);

    return (
        <nav>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-2 navpart1'>
                        <div className='catWrapper'>
                            <Button className='allCatTab align-items-center' onClick={() => setIsOpenSidebarVal(!isOpenSidebarVal)}>
                                <span className='icon1 mr-2'><IoIosMenu /></span>
                                <span className='text'>ALL CATEGORIES</span>
                                <span className='icon2 ml-2'><FaAngleDown /></span>
                            </Button>

                            <div className={`sidebarNav ${isOpenSidebarVal === true ? 'open' : ''} shadow`}>
                                <ul>
                                    {
                                        context.categoryData?.length > 0 && context.categoryData?.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link to={`/products/category/${item._id}`}>
                                                        <Button>{item.name} <FaAngleRight className='ml-auto' /></Button>
                                                    </Link>
                                                    <div className='submenu'>
                                                        {
                                                            context.subCategoryData?.length > 0 && context.subCategoryData?.filter(sub => sub.category?._id === item._id || sub.category === item._id).map((subItem, subIndex) => {
                                                                return (
                                                                    <Link key={subIndex} to={`/products/subCat/${subItem._id}`} onClick={() => setIsOpenSidebarVal(false)}>
                                                                        <Button>{subItem.subCat}</Button>
                                                                    </Link>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='col-sm-10 navpart2 d-flex align-items-center'>
                        <ul className='list list-inline ml-auto'>
                            <li className='list-inline-item'><Link to="/"><Button>Home</Button></Link></li>
                            {
                                props.navData?.length > 0 && props.navData?.map((item, index) => {
                                    return (
                                        <li className='list-inline-item'>
                                            <Link to={`/products/subCat/${item?._id}`}><Button>{item?.subCat}</Button></Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;