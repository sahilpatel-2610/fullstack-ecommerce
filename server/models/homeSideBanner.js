const mongoose = require('mongoose');

const homeSideBannerSchema = mongoose.Schema({
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

homeSideBannerSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

homeSideBannerSchema.set('toJSON', {
    virtuals: true,
});

exports.HomeSideBanner = mongoose.model('HomeSideBanner', homeSideBannerSchema);
exports.homeSideBannerSchema = homeSideBannerSchema;
