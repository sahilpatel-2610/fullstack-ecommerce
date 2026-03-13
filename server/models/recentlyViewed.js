const mongoose = require("mongoose");

const recentlyViewedSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    brand: {
        type: String,
        default: '',
    },
    price: {
        type: Number,
        default: 0
    },
    oldPrice: {
        type: Number,
        default: 0
    },
    catName: {
        type: String,
        default: '',
    },
    subCatId: {
        type: String,
        default: '',
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
    subCat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: false
    },
    countInStock: {
        type: Number,
        required: false,
    },
    rating: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    discount: {
        type: Number,
        required: false,
    },
    productRam: [
        {
            type: String,
            default: null,
        }
    ],
    size: [
        {
            type: String,
            default: null,
        }
    ],
    productWeight: [
        {
            type: String,
            default: null,
        }
    ],
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});


recentlyViewedSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

recentlyViewedSchema.set('toJSON', {
    virtual: true,
});



exports.RecentlyViewed = mongoose.model('RecentlyViewed', recentlyViewedSchema);