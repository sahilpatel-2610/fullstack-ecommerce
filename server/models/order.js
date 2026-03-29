const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    products: [
        {
            productName: {
                type: String
            },
            quantity: {
                type: Number
            },
            price: {
                type: Number
            },
            images: {
                type: String
            },
            total: {
                type: Number
            }
        }
    ],
    date: {
        type: String,
        default: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    }
});

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});

exports.Order = mongoose.model('Order', orderSchema);
