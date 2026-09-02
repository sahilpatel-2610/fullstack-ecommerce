const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    images: [
        {
            type: String,
        }
    ],
    color: {
        type: String,
        default: ''
    },
    parentId: {
        type: String,
        default: null
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtual: true,
});

exports.Category = mongoose.model('Category', categorySchema);
exports.categorySchema = categorySchema;
