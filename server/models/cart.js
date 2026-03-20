const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    productTitle: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    size: {
        type: String,
        default: ""
    },
    weight: {
        type: String,
        default: ""
    },
    ram: {
        type: String,
        default: ""
    },
})


cartSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

cartSchema.set('toJSON', {
    virtual: true,
});


exports.Cart = mongoose.model('Cart', cartSchema);
exports.cartSchema = cartSchema;

