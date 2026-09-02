const mongoose = require('mongoose');

const homeBottomBannerSchema = mongoose.Schema({
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

homeBottomBannerSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

homeBottomBannerSchema.set('toJSON', {
    virtuals: true,
});

exports.HomeBottomBanner = mongoose.model('HomeBottomBanner', homeBottomBannerSchema);
exports.homeBottomBannerSchema = homeBottomBannerSchema;
