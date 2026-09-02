const mongoose = require('mongoose');

const newsletterSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

newsletterSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

newsletterSchema.set('toJSON', {
    virtuals: true,
});

exports.Newsletter = mongoose.model('Newsletter', newsletterSchema);
exports.newsletterSchema = newsletterSchema;
