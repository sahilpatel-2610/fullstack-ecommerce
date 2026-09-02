import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { FaHome, FaAngleRight, FaShoppingCart, FaEye } from "react-icons/fa";
import Rating from '@mui/material/Rating';
import { MyContext } from '../../App';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { fetchDataFromApi, postData } from '../../utils/api';

const BannerDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const context = useContext(MyContext);

    // Prioritize location.state passed from click
    const initialBanner = location.state?.banner || null;
    const initialImg = location.state?.imgUrl || (
        initialBanner?.images ? (Array.isArray(initialBanner.images) ? initialBanner.images[0] : initialBanner.images) : ""
    );

    const [bannerData, setBannerData] = useState(initialBanner);
    const [bannerImage, setBannerImage] = useState(initialImg);
    const [loading, setLoading] = useState(!initialImg);
    const [linkedProducts, setLinkedProducts] = useState([]);
    const [isOpenLightbox, setIsOpenLightbox] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    // Smooth Wheel Zoom & Drag Panning State
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panPos, setPanPos] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleWheelZoom = (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.25 : -0.25;
        setZoomLevel(prev => {
            const next = Math.min(Math.max(1, prev + delta), 5);
            if (next === 1) setPanPos({ x: 0, y: 0 });
            return next;
        });
    };

    const handleDoubleClickZoom = () => {
        if (zoomLevel > 1) {
            setZoomLevel(1);
            setPanPos({ x: 0, y: 0 });
        } else {
            setZoomLevel(2.5);
        }
    };

    const handleMouseDownPan = (e) => {
        if (zoomLevel > 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - panPos.x, y: e.clientY - panPos.y });
        }
    };

    const handleMouseMovePan = (e) => {
        if (isDragging && zoomLevel > 1) {
            setPanPos({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUpPan = () => {
        setIsDragging(false);
    };

    const handleCloseLightbox = () => {
        setIsOpenLightbox(false);
        setZoomLevel(1);
        setPanPos({ x: 0, y: 0 });
        setIsDragging(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        if (location.state?.imgUrl) {
            setBannerImage(location.state.imgUrl);
            if (location.state.banner) setBannerData(location.state.banner);
        }

        // Fetch all banner lists to find item by ID
        Promise.all([
            fetchDataFromApi('/api/homeBanner').catch(() => []),
            fetchDataFromApi('/api/homeSideBanners').catch(() => []),
            fetchDataFromApi('/api/homeBottomBanners').catch(() => []),
            fetchDataFromApi('/api/sidebarBanners').catch(() => []),
            fetchDataFromApi(`/api/homeBanner/${id}`).catch(() => null)
        ]).then(([homeList, sideList, bottomList, sidebarList, singleHome]) => {
            const hList = Array.isArray(homeList) ? homeList : (homeList?.bannerList || homeList?.data || []);
            const sList = Array.isArray(sideList) ? sideList : (sideList?.bannerList || sideList?.data || []);
            const bList = Array.isArray(bottomList) ? bottomList : (bottomList?.bannerList || bottomList?.data || []);
            const sbList = Array.isArray(sidebarList) ? sidebarList : (sidebarList?.bannerList || sidebarList?.data || []);

            const allBanners = [...hList, ...sList, ...bList, ...sbList];
            let found = allBanners.find(item => item && (item._id === id || item.id === id));

            if (!found && singleHome && !singleHome.error && !singleHome.message) {
                found = singleHome;
            }

            if (found) {
                setBannerData(found);
                const img = Array.isArray(found.images) ? found.images[0] : found.images;
                if (img) setBannerImage(img);
            }
            setLoading(false);
        }).catch(() => setLoading(false));

    }, [id, location.state]);

    // Fetch products linked to this banner: Prioritize explicit productIds selected by Admin!
    useEffect(() => {
        const pIds1 = Array.isArray(bannerData?.productIds) ? bannerData.productIds : [];
        const pIds2 = Array.isArray(location.state?.banner?.productIds) ? location.state.banner.productIds : [];
        const singleId1 = bannerData?.productId;
        const singleId2 = location.state?.banner?.productId;

        const combinedPids = [...pIds1, ...pIds2, singleId1, singleId2].filter(pid => pid && pid !== "" && pid !== "all");
        const targetPids = [...new Set(combinedPids)];

        if (targetPids.length > 0) {
            // Admin explicitly selected products -> Display ONLY those specific products!
            Promise.all(targetPids.map(pid => fetchDataFromApi(`/api/products/${pid}`).catch(() => null)))
                .then(results => {
                    const validProds = results.filter(res => res && !res.error && (res._id || res.id));
                    setLinkedProducts(validProds);
                }).catch(() => setLinkedProducts([]));
        } else {
            // No explicit products selected by Admin -> Fallback to category products
            const cIds1 = Array.isArray(bannerData?.catIds) ? bannerData.catIds : [];
            const cIds2 = Array.isArray(location.state?.banner?.catIds) ? location.state.banner.catIds : [];
            const singleCid1 = bannerData?.catId;
            const singleCid2 = location.state?.banner?.catId;
            const cNames1 = Array.isArray(bannerData?.catNames) ? bannerData.catNames : [];

            const combinedCats = [...cIds1, ...cIds2, singleCid1, singleCid2, ...cNames1].filter(cid => cid && cid !== "" && cid !== "all");
            const targetCats = [...new Set(combinedCats)];

            if (targetCats.length > 0) {
                Promise.all(targetCats.map(cid => fetchDataFromApi(`/api/products?category=${encodeURIComponent(cid)}&perPage=500`).catch(() => null)))
                    .then(results => {
                        let catProds = [];
                        results.forEach(res => {
                            if (res && !res.error && Array.isArray(res.products)) {
                                catProds.push(...res.products);
                            }
                        });
                        const uniqueMap = new Map();
                        catProds.forEach(p => {
                            const key = p._id || p.id;
                            if (key && !uniqueMap.has(key)) {
                                uniqueMap.set(key, p);
                            }
                        });
                        setLinkedProducts(Array.from(uniqueMap.values()));
                    }).catch(() => setLinkedProducts([]));
            } else {
                setLinkedProducts([]);
            }
        }
    }, [bannerData, location.state]);

    const handleAddToCart = (product) => {
        if (!product) return;
        const userStr = localStorage.getItem("user");
        let userData = null;
        if (userStr && userStr !== "undefined") {
            try {
                userData = JSON.parse(userStr);
            } catch (e) {}
        }
        const userId = userData?._id || userData?.id || userData?.userId || context.user?._id || context.user?.id || context.user?.userId;

        const cartItem = {
            productTitle: product.name,
            images: Array.isArray(product.images) ? product.images[0] : product.images,
            rating: product.rating || 5,
            price: product.price,
            quantity: 1,
            subTotal: product.price,
            productId: product._id || product.id,
            countInStock: product.countInStock || 10,
            userId: userId
        };

        if (typeof context.addtoCart === 'function') {
            context.addtoCart(cartItem);
        } else if (typeof context.addToCart === 'function') {
            context.addToCart(cartItem);
        } else {
            postData("/api/cart/add", cartItem).then((res) => {
                if (res?.status === true) {
                    if (context.setAlertBox) context.setAlertBox({ open: true, error: false, msg: "Item added to Cart!" });
                    if (context.getCartData) context.getCartData();
                } else {
                    if (context.setAlertBox) context.setAlertBox({ open: true, error: true, msg: res?.msg || "Failed to add to Cart!" });
                }
            }).catch(() => null);
        }
    };

    return (
        <section className="bannerDetailsSection py-4" style={{ backgroundColor: '#f5f7fa', minHeight: '85vh' }}>
            <div className="container">
                {/* Breadcrumbs Ribbon */}
                <div className="breadcrumbWrapper mb-4 p-3 bg-white shadow-sm rounded d-flex align-items-center justify-content-between">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/" className="d-flex align-items-center text-dark font-weight-bold">
                            <FaHome className="mr-1" /> Home
                        </Link>
                        <span className="text-muted d-flex align-items-center">
                            Banner Screen
                        </span>
                    </Breadcrumbs>
                    <Link to="/">
                        <Button className="btn-blue btn-sml btn-round">
                            Back to Home
                        </Button>
                    </Link>
                </div>

                {/* Banner Display Screen Header */}
                <div className="row justify-content-center mb-4">
                    <div className="col-md-11">
                        <div className="card border-0 shadow-sm overflow-hidden rounded-lg p-4 text-center bg-white">
                            {
                                (bannerData?.bannerTitle || bannerData?.name) && (
                                    <div 
                                        className="bannerHeaderTitleWrapper mb-4 text-center py-3 px-4 shadow-sm position-relative overflow-hidden rounded border" 
                                        style={{ 
                                            background: 'linear-gradient(135deg, #090d16 0%, #111827 50%, #1e1b4b 100%)', 
                                            borderColor: 'rgba(99, 102, 241, 0.3)'
                                        }}
                                    >
                                        {/* Background Orbs */}
                                        <div style={{ position: 'absolute', top: '-40px', left: '20%', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(15px)', pointerEvents: 'none' }}></div>
                                        <div style={{ position: 'absolute', bottom: '-40px', right: '20%', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(15px)', pointerEvents: 'none' }}></div>

                                        {/* Top Pill Tag */}
                                        <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-2 rounded-pill shadow-sm" style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.25)', color: '#f8fafc', fontSize: '11px', fontWeight: '800', letterSpacing: '2px' }}>
                                            <span style={{ fontSize: '13px' }}>🏷️</span> 
                                            <span>
                                                {
                                                    (Array.isArray(bannerData?.catNames) && bannerData.catNames.length === 1)
                                                        ? `${bannerData.catNames[0].toUpperCase()} BANNER OFFER`
                                                        : 'SPECIAL PROMOTIONAL BANNER OFFER'
                                                }
                                            </span>
                                        </div>
                                        
                                        {/* Sleek Sunset Gradient Title */}
                                        <h2 
                                            className="font-weight-bold text-uppercase mb-1" 
                                            style={{ 
                                                fontSize: '28px', 
                                                letterSpacing: '1.5px', 
                                                fontWeight: '800',
                                                background: 'linear-gradient(90deg, #ffffff 0%, #f472b6 35%, #a78bfa 70%, #38bdf8 100%)', 
                                                WebkitBackgroundClip: 'text', 
                                                WebkitTextFillColor: 'transparent',
                                                fontFamily: "'Poppins', sans-serif",
                                                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))'
                                            }}
                                        >
                                            {bannerData?.bannerTitle || bannerData?.name}
                                        </h2>

                                        {/* Subtle Divider Line */}
                                        <div className="d-flex align-items-center justify-content-center gap-2 mt-2">
                                            <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, transparent, #ec4899)' }}></div>
                                            <div style={{ width: '6px', height: '6px', background: '#ec4899', transform: 'rotate(45deg)', borderRadius: '1px' }}></div>
                                            <div style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6)', borderRadius: '2px' }}></div>
                                            <div style={{ width: '6px', height: '6px', background: '#3b82f6', transform: 'rotate(45deg)', borderRadius: '1px' }}></div>
                                            <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, #3b82f6, transparent)' }}></div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                bannerImage ? (
                                    <div 
                                        className="bannerImgWrapper my-3 rounded overflow-hidden shadow-sm border position-relative" 
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setIsOpenLightbox(true)}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        title="Click to view full screen image"
                                    >
                                        <img
                                            src={bannerImage}
                                            alt="Banner"
                                            className="w-100 img-fluid rounded"
                                            style={{ 
                                                maxHeight: '520px', 
                                                objectFit: 'cover', 
                                                background: '#f8f9fa', 
                                                transition: 'transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                                                transform: isHovered ? 'scale(1.03)' : 'scale(1)'
                                            }}
                                        />
                                        <div 
                                            className="position-absolute bottom-0 end-0 m-3 px-3 py-1 rounded-pill text-white shadow-sm" 
                                            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', fontSize: '12px', fontWeight: '600' }}
                                        >
                                            🔍 Click to view full image
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bannerImgWrapper my-3 rounded overflow-hidden shadow-sm bg-light p-5 border">
                                        <h4 className="text-muted mb-0">Promotional Banner Display</h4>
                                    </div>
                                )
                            }

                            {/* Explicit Admin-Linked Multi-Products Collection */}
                            {
                                linkedProducts?.length > 0 ? (
                                    <div className="linkedProductsSec my-4 text-left">
                                        <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                                            <h4 className="font-weight-bold mb-0 text-dark">
                                                Linked Products Collection ({linkedProducts.length})
                                            </h4>
                                            <span className="badge badge-success px-3 py-1">ADMIN EXCLUSIVE OFFER</span>
                                        </div>

                                        <div className="row">
                                            {
                                                linkedProducts.map((product, idx) => (
                                                    <div className="col-md-6 mb-4" key={product._id || idx}>
                                                        <div className="card border p-3 rounded h-100 shadow-sm bg-light">
                                                            <div className="row align-items-center">
                                                                <div className="col-4 text-center">
                                                                    <img 
                                                                        src={Array.isArray(product.images) ? product.images[0] : product.images} 
                                                                        alt={product.name}
                                                                        className="img-fluid rounded border bg-white p-2"
                                                                        style={{ maxHeight: '160px', objectFit: 'contain' }}
                                                                    />
                                                                </div>
                                                                <div className="col-8">
                                                                    <h5 className="font-weight-bold mb-1">{product.name}</h5>
                                                                    <div className="d-flex align-items-center mb-1">
                                                                        <span className="text-muted mr-2" style={{ fontSize: '13px' }}>Brand: {product.brand || 'Special'}</span>
                                                                        <Rating name="read-only" value={Number(product.rating || 5)} readOnly size="small" />
                                                                    </div>
                                                                    <h5 className="text-danger font-weight-bold mb-2">
                                                                        RS: {product.price}
                                                                        {product.oldPrice && (
                                                                            <span className="text-muted ml-2 font-weight-normal" style={{ textDecoration: 'line-through', fontSize: '14px' }}>
                                                                                RS: {product.oldPrice}
                                                                            </span>
                                                                        )}
                                                                    </h5>
                                                                    <div className="d-flex gap-2">
                                                                        <Link to={`/product/${product._id || product.id}`}>
                                                                            <Button className="btn-blue btn-sml btn-round mr-2">
                                                                                View
                                                                            </Button>
                                                                        </Link>
                                                                        <Button 
                                                                            className="btn-red btn-sml btn-round"
                                                                            onClick={() => handleAddToCart(product)}
                                                                        >
                                                                            <FaShoppingCart className="mr-1" /> Add To Cart
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bannerInfo mt-3">
                                        <p className="text-secondary lead mb-4">
                                            Explore our promotional banner offers and store collections!
                                        </p>
                                        <div className="d-flex justify-content-center gap-3">
                                            <Link to="/">
                                                <Button className="btn-blue btn-big btn-round mr-2">
                                                    <FaHome className="mr-2" /> Back to Home
                                                </Button>
                                            </Link>
                                            {
                                                bannerData?.catId && (
                                                    <Link to={`/products/category/${bannerData.catId}`}>
                                                        <Button className="btn-red btn-big btn-round">
                                                            Explore Category <FaAngleRight className="ml-1" />
                                                        </Button>
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Full-Screen Lightbox Modal for Banner Image */}
            <Dialog 
                open={isOpenLightbox} 
                onClose={handleCloseLightbox} 
                fullScreen={true}
                PaperProps={{ 
                    style: { 
                        backgroundColor: '#000000', 
                        boxShadow: 'none', 
                        margin: 0,
                        padding: 0,
                        overflow: 'hidden' 
                    } 
                }}
            >
                <div style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
                    <IconButton 
                        onClick={handleCloseLightbox} 
                        style={{ 
                            position: 'fixed', 
                            top: 12, 
                            right: 15, 
                            color: '#fff', 
                            backgroundColor: 'rgba(255,255,255,0.25)', 
                            backdropFilter: 'blur(10px)',
                            zIndex: 9999,
                            width: 40,
                            height: 40,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                        }}
                    >
                        <CloseIcon style={{ fontSize: '22px' }} />
                    </IconButton>

                    <div 
                        className="w-100 h-100 d-flex align-items-center justify-content-center p-2 p-md-4 overflow-hidden" 
                        style={{ 
                            cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
                            userSelect: 'none'
                        }}
                        onWheel={handleWheelZoom}
                        onDoubleClick={handleDoubleClickZoom}
                        onMouseDown={handleMouseDownPan}
                        onMouseMove={handleMouseMovePan}
                        onMouseUp={handleMouseUpPan}
                        onMouseLeave={handleMouseUpPan}
                    >
                        <img 
                            src={bannerImage} 
                            className="img-fluid" 
                            style={{ 
                                width: '100%', 
                                maxHeight: '92vh', 
                                objectFit: 'contain', 
                                borderRadius: '8px',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.9)',
                                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                                transform: `translate(${panPos.x}px, ${panPos.y}px) scale(${zoomLevel})`,
                                pointerEvents: 'none'
                            }} 
                            alt="Full Banner Preview" 
                        />
                    </div>
                </div>
            </Dialog>
        </section>
    );
};

export default BannerDetails;
