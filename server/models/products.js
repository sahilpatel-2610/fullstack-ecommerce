const mongoose = require("mongoose");

const peoductSchema = mongoose.Schema({
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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',    
        required: true
    }, 
    subCat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',    
        required: true
    },     
    countInStock: {
        type: Number,
        required: true,
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
        required: true,
    },
    productRAMS:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductRams',
        default: null,
    },
    productSIZE:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductSize',
        default: null,
    },
    productWEIGHT:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductWeight',
        default: null,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});


peoductSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

peoductSchema.set('toJSON', {
    virtual: true,
});



exports.Product = mongoose.model('Product', peoductSchema);