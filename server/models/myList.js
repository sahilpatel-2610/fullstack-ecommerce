const mongoose = require('mongoose');

const myListSchema = mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})


myListSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

myListSchema.set('toJSON', {
    virtual: true,
});


exports.MyList = mongoose.model('MyList', myListSchema);
exports.myListSchema = myListSchema;

