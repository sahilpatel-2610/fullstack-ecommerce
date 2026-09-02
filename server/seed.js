const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const { Category } = require('./models/category');
const { Product } = require('./models/products');
const { HomeBanner } = require('./models/homeBanner');
const { HomeSideBanner } = require('./models/homeSideBanner');
const { HomeBottomBanner } = require('./models/homeBottomBanner');
const { User } = require('./models/user');

const sampleCategories = [
    {
        name: "Fashion",
        slug: "fashion",
        color: "#f1f1f1",
        images: ["https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60"],
        subCats: ["Men", "Women", "Kids", "Accessories"]
    },
    {
        name: "Electronics",
        slug: "electronics",
        color: "#e8f4fd",
        images: ["https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60"],
        subCats: ["Smartphones", "Laptops", "Smart Watches", "Headphones"]
    },
    {
        name: "Bags & Luggage",
        slug: "bags-luggage",
        color: "#fef3e7",
        images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=60"],
        subCats: ["Backpacks", "Handbags", "Travel Bags"]
    },
    {
        name: "Footwear",
        slug: "footwear",
        color: "#f3e8fd",
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60"],
        subCats: ["Sneakers", "Formal Shoes", "Sandals", "Sports Shoes"]
    },
    {
        name: "Groceries",
        slug: "groceries",
        color: "#eafaf1",
        images: ["https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60"],
        subCats: ["Fresh Fruits", "Vegetables", "Dairy & Eggs", "Snacks"]
    },
    {
        name: "Beauty & Wellness",
        slug: "beauty-wellness",
        color: "#fce8ed",
        images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60"],
        subCats: ["Skincare", "Haircare", "Fragrances", "Makeup"]
    }
];

const sampleProducts = [
    {
        name: "Men Slim Fit Casual Cotton Shirt",
        description: "Premium pure cotton casual shirt with breathable fabric, spread collar, and stylish modern slim fit.",
        brand: "Zara",
        price: 1299,
        oldPrice: 2499,
        discount: 48,
        countInStock: 25,
        rating: 4.5,
        isFeatured: true,
        catName: "Fashion",
        subCatName: "Men",
        productWeight: ["250g", "300g"],
        size: ["S", "M", "L", "XL"],
        images: [
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80"
        ],
        location: [{ label: "All", value: "All" }]
    },
    {
        name: "Women Floral Printed Maxi Dress",
        description: "Elegant floral print A-line maxi dress crafted in soft rayon fabric, perfect for summer outings and casual parties.",
        brand: "H&M",
        price: 1899,
        oldPrice: 3599,
        discount: 47,
        countInStock: 18,
        rating: 4.8,
        isFeatured: true,
        catName: "Fashion",
        subCatName: "Women",
        size: ["XS", "S", "M", "L"],
        images: [
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=80"
        ],
        location: [{ label: "All", value: "All" }]
    },
    {
        name: "Apple MacBook Air M2 - 13.6 inch",
        description: "Supercharged by M2 chip with 8-Core CPU and 8-Core GPU, 8GB Unified Memory, 256GB SSD storage, Liquid Retina Display.",
        brand: "Apple",
        price: 89900,
        oldPrice: 99900,
        discount: 10,
        countInStock: 10,
        rating: 4.9,
        isFeatured: true,
        catName: "Electronics",
        subCatName: "Laptops",
        productRam: ["8GB", "16GB", "24GB"],
        images: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80"
        ],
        location: [{ label: "All", value: "All" }]
    },
    {
        name: "Sony WH-1000XM5 Wireless Headphones",
        description: "Industry-leading noise cancelling with two processors and 8 microphones for unprecedented noise cancellation and crystal clear calls.",
        brand: "Sony",
        price: 26990,
        oldPrice: 34990,
        discount: 23,
        countInStock: 15,
        rating: 4.7,
        isFeatured: true,
        catName: "Electronics",
        subCatName: "Headphones",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80"
        ],
        location: [{ label: "All", value: "All" }]
    },
    {
        name: "Nike Air Max 270 Running Shoes",
        description: "Boasting Nike's biggest heel Air unit yet, the Nike Air Max 270 delivers visible air under every step with plush cushioning.",
        brand: "Nike",
        price: 7495,
        oldPrice: 11995,
        discount: 37,
        countInStock: 30,
        rating: 4.6,
        isFeatured: true,
        catName: "Footwear",
        subCatName: "Sneakers",
        size: ["7", "8", "9", "10", "11"],
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&auto=format&fit=crop&q=80"
        ],
        location: [{ label: "All", value: "All" }]
    },
    {
        name: "Leather Classic Travel Duffel Bag",
        description: "Handcrafted full grain genuine vintage leather duffle gym weekender bag with brass hardware and adjustable shoulder strap.",
        brand: "Wildhorn",
        price: 3499,
        oldPrice: 6999,
        discount: 50,
        countInStock: 12,
        rating: 4.6,
        isFeatured: true,
        catName: "Bags & Luggage",
        subCatName: "Travel Bags",
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80"
        ],
        location: [{ label: "All", value: "All" }]
    },
    {
        name: "Organic Raw California Almonds - 1kg",
        description: "100% natural, crunchy and unpolished California almonds packed with protein, dietary fiber and essential healthy fats.",
        brand: "Happilo",
        price: 799,
        oldPrice: 1200,
        discount: 33,
        countInStock: 50,
        rating: 4.7,
        isFeatured: false,
        catName: "Groceries",
        subCatName: "Snacks",
        productWeight: ["500g", "1kg"],
        images: [
            "https://images.unsplash.com/photo-1508061252224-237ff54ed5a8?w=600&auto=format&fit=crop&q=80"
        ],
        location: [{ label: "All", value: "All" }]
    },
    {
        name: "Vitamin C Radiance Face Serum - 30ml",
        description: "Infused with pure Vitamin C and Hyaluronic Acid to brighten skin tone, reduce dark spots and boost collagen production.",
        brand: "DermaCo",
        price: 549,
        oldPrice: 799,
        discount: 31,
        countInStock: 40,
        rating: 4.4,
        isFeatured: false,
        catName: "Beauty & Wellness",
        subCatName: "Skincare",
        images: [
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80"
        ],
        location: [{ label: "All", value: "All" }]
    }
];

const sampleHomeBanners = [
    {
        images: ["https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&auto=format&fit=crop&q=80"],
        bannerTitle: "Mega Summer Electronics Sale - Up to 60% Off",
        name: "Electronics Fest",
        catName: "Electronics"
    },
    {
        images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80"],
        bannerTitle: "New Season Fashion Collection - Fresh Styles Daily",
        name: "Fashion Week",
        catName: "Fashion"
    }
];

const sampleSideBanners = [
    {
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80"],
        bannerTitle: "Exclusive Audio Deals",
        catName: "Electronics"
    },
    {
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80"],
        bannerTitle: "Best Running Sneakers",
        catName: "Footwear"
    }
];

const sampleBottomBanners = [
    {
        images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80"],
        bannerTitle: "Travel Bags & Luggage",
        catName: "Bags & Luggage"
    },
    {
        images: ["https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80"],
        bannerTitle: "Fresh Farm Groceries",
        catName: "Groceries"
    },
    {
        images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80"],
        bannerTitle: "Luxury Beauty Care",
        catName: "Beauty & Wellness"
    }
];

async function seed() {
    try {
        const uri = process.env.CONNECTION_STRING;
        if (!uri) {
            console.error("No CONNECTION_STRING found in .env");
            process.exit(1);
        }

        console.log("Connecting to MongoDB...");
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully!");

        console.log("Clearing existing sample data (if any)...");
        await Category.deleteMany({});
        await Product.deleteMany({});
        await HomeBanner.deleteMany({});
        await HomeSideBanner.deleteMany({});
        await HomeBottomBanner.deleteMany({});

        console.log("Creating Categories & SubCategories...");
        const createdCatMap = {};
        const createdSubCatMap = {};

        for (const cat of sampleCategories) {
            const newCat = await Category.create({
                name: cat.name,
                slug: cat.slug,
                color: cat.color,
                images: cat.images
            });
            createdCatMap[cat.name] = newCat;

            for (const subName of cat.subCats) {
                const newSubCat = await Category.create({
                    name: subName,
                    slug: `${cat.slug}-${subName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
                    parentId: newCat._id.toString(),
                    images: cat.images
                });
                createdSubCatMap[`${cat.name}_${subName}`] = newSubCat;
            }
        }
        console.log(`Created ${Object.keys(createdCatMap).length} categories and ${Object.keys(createdSubCatMap).length} subcategories.`);

        console.log("Creating Products...");
        for (const prod of sampleProducts) {
            const catObj = createdCatMap[prod.catName];
            const subCatObj = createdSubCatMap[`${prod.catName}_${prod.subCatName}`];

            await Product.create({
                ...prod,
                category: catObj ? catObj._id : undefined,
                subCat: subCatObj ? subCatObj._id : undefined,
                subCatId: subCatObj ? subCatObj._id.toString() : ""
            });
        }
        console.log(`Created ${sampleProducts.length} products.`);

        console.log("Creating Home Banners...");
        for (const banner of sampleHomeBanners) {
            const catObj = createdCatMap[banner.catName];
            await HomeBanner.create({
                ...banner,
                catId: catObj ? catObj._id.toString() : ""
            });
        }

        console.log("Creating Side Banners...");
        for (const banner of sampleSideBanners) {
            const catObj = createdCatMap[banner.catName];
            await HomeSideBanner.create({
                ...banner,
                catId: catObj ? catObj._id.toString() : ""
            });
        }

        console.log("Creating Bottom Banners...");
        for (const banner of sampleBottomBanners) {
            const catObj = createdCatMap[banner.catName];
            await HomeBottomBanner.create({
                ...banner,
                catId: catObj ? catObj._id.toString() : ""
            });
        }

        console.log("\n==========================================");
        console.log("DATABASE SEED COMPLETED SUCCESSFULLY!");
        console.log("All categories, products, banners are ready!");
        console.log("==========================================\n");

        process.exit(0);
    } catch (err) {
        console.error("Database seed error:", err);
        process.exit(1);
    }
}

seed();
