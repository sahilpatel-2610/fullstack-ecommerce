import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

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

const TruncatedBadges = ({ items, badgeBg, limit = 3 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const context = useContext(MyContext);
    if (!items || items.length === 0) return null;

    const uniqueItems = [...new Set(items)];
    const displayedItems = isExpanded ? uniqueItems : uniqueItems.slice(0, limit);
    const hiddenCount = uniqueItems.length - limit;
    const readMoreColor = context.theme === true ? '#38bdf8' : '#0284c7';

    return (
        <span className="d-inline-flex flex-wrap align-items-center me-1">
            {displayedItems.map((item, idx) => (
                <span key={idx} className={`badge ${badgeBg} me-1 mb-1 shadow-sm`} style={{ fontSize: '12px', padding: '5px 8px' }}>
                    {item}
                </span>
            ))}
            {hiddenCount > 0 && (
                <button
                    type="button"
                    className="btn btn-sm btn-link p-0 font-weight-bold text-decoration-none ms-1 mb-1"
                    style={{ fontSize: '12px', cursor: 'pointer', outline: 'none', background: 'transparent', border: 'none', color: readMoreColor }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                    }}
                >
                    {isExpanded ? 'Read Less' : `+${hiddenCount} Read More...`}
                </button>
            )}
        </span>
    );
};

const HomeBottomBannerList = () => {
    const [slideList, setSlideList] = useState([]);
    const [lightBox, setLightBox] = useState({
        photoIndex: 0,
        isOpen: false,
    });

    const context = useContext(MyContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        context.setProgress(20);
        fetchDataFromApi('/api/homeBottomBanners?page=1&perPage=10').then((res) => {
            setSlideList(res);
            context.setProgress(100);
        });
    }, []);

    const deleteSlide = (id) => {
        context.setProgress(30);
        deleteData(`/api/homeBottomBanners/${id}`).then(res => {
            fetchDataFromApi('/api/homeBottomBanners?page=1&perPage=10').then((res) => {
                setSlideList(res);
                context.setProgress(100);
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Banner Deleted!"
                });
            });
        });
    };

    const slideImages = slideList?.bannerList?.map(item => Array.isArray(item.images) ? item.images[0] : item.images) || [];
    const textColor = context.theme === true ? '#ffffff' : '#1e293b';
    const titleColor = context.theme === true ? '#00e676' : '#059669';

    return (
        <>
            <Dialog 
                open={lightBox.isOpen} 
                onClose={() => setLightBox({ isOpen: false })} 
                maxWidth="md" 
                fullWidth 
                PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none' } }}
            >
                {lightBox.isOpen && slideImages.length > 0 && (
                    <div style={{ position: 'relative' }}>
                        <IconButton 
                            onClick={() => setLightBox({ isOpen: false })} 
                            style={{ position: 'absolute', top: -10, right: -10, color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <img 
                            src={slideImages[lightBox.photoIndex]} 
                            className="w-100" 
                            style={{ borderRadius: '8px' }} 
                            alt="Preview" 
                        />
                    </div>
                )}
            </Dialog>

            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Home Bottom Banner List</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
                        <StyledBreadcrumb component="a" href="#" label="Dashboard" icon={<HomeIcon fontSize="small" />} />
                        <StyledBreadcrumb label="Home Bottom Banner" deleteIcon={<ExpandMoreIcon />} />
                    </Breadcrumbs>
                    <Link to="/homeBottomBanner/add"><Button className="btn-blue ms-3 ps-3 pe-3">Add Home Bottom Banner</Button></Link>
                </div>

                <div className="card shadow border-0 p-3 mt-4">
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered table-striped v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th style={{ width: '250px' }}>IMAGE</th>
                                    <th>TARGET CATEGORY & PRODUCT</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>

                            <tbody>
                                {slideList?.bannerList?.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>
                                            <div className="d-flex align-items-center" style={{ width: '250px', height: '100px' }} onClick={() => setLightBox({ isOpen: true, photoIndex: index })}>
                                                <img src={Array.isArray(item.images) ? item.images?.[0] : item.images} className="w-100 h-100 rounded shadow" style={{ objectFit: 'cover', cursor: 'pointer' }} alt="banner" />
                                            </div>
                                        </td>
                                        <td>
                                            {(item.bannerTitle || item.name) && (
                                                <div className="fw-bold mb-2" style={{ fontSize: '15px', color: titleColor }}>
                                                    Title: <span style={{ color: textColor }}>{item.bannerTitle || item.name}</span>
                                                </div>
                                            )}
                                            
                                            <div className="mb-2 d-flex align-items-center flex-wrap">
                                                <span className="fw-bold me-2" style={{ color: textColor, fontSize: '13px' }}>Categories:</span>
                                                {
                                                    (Array.isArray(item.catNames) && item.catNames.length > 0) ? (
                                                        <TruncatedBadges items={item.catNames} badgeBg="bg-success" limit={3} />
                                                    ) : item.catName ? (
                                                        <span className="badge bg-success me-1 mb-1">{item.catName}</span>
                                                    ) : (
                                                        <span className="badge bg-secondary me-1 mb-1">All Categories</span>
                                                    )
                                                }
                                            </div>

                                            <div className="d-flex align-items-center flex-wrap">
                                                <span className="fw-bold me-2" style={{ color: textColor, fontSize: '13px' }}>
                                                    Products ({(Array.isArray(item.productNames) && item.productNames.length > 0) ? [...new Set(item.productNames)].length : (item.productName ? 1 : 0)}):
                                                </span>
                                                {
                                                    (Array.isArray(item.productNames) && item.productNames.length > 0) ? (
                                                        <TruncatedBadges items={item.productNames} badgeBg="bg-primary" limit={3} />
                                                    ) : item.productName ? (
                                                        <span className="badge bg-primary me-1 mb-1">{item.productName}</span>
                                                    ) : (
                                                        <span className="small" style={{ color: textColor }}>None</span>
                                                    )
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <div className="actions d-flex align-items-center">
                                                <Link to={`/homeBottomBanner/edit/${item._id}`}>
                                                    <Button className="success me-2" color="success">
                                                        <FaPencilAlt />
                                                    </Button>
                                                </Link>
                                                <Button className="error" color="error" onClick={() => deleteSlide(item._id)}>
                                                    <MdDelete />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeBottomBannerList;
