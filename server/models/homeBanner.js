const mongoose = require('mongoose');

const homeBannerSchema = mongoose.Schema({
    images: [
        {
            type: String,
            required: true
        }
    ],
    bannerTitle: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    catId: {
        type: String,
        default: ""
    },
    subCatId: {
        type: String,
        default: ""
    },
    catName: {
        type: String,
        default: ""
    },
    catIds: [
        {
            type: String
        }
    ],
    catNames: [
        {
            type: String
        }
    ],
    productId: {
        type: String,
        default: ""
    },
    productName: {
        type: String,
        default: ""
    },
    productIds: [
        {
            type: String
        }
    ],
    productNames: [
        {
            type: String
        }
    ]
});


homeBannerSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

homeBannerSchema.set('toJSON', {
    virtual: true,
});


exports.HomeBanner = mongoose.model('HomeBanner', homeBannerSchema);
exports.homeBannerSchema = homeBannerSchema;

