const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    categoryName: {
        type: String,
        default: ''
    },
    subCat: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: ''
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

subCategorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

subCategorySchema.set('toJSON', {
    virtual: true,
});

exports.SubCategory = mongoose.model('SubCategory', subCategorySchema, 'subcategories');
exports.subCategorySchema = subCategorySchema;
