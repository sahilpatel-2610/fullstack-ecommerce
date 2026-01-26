const mongoose = require('mongoose');
 

// // Connection
// mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1");
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log("Mongo Error", err));

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subCat:{
        type:String,
        required:true
    },
    images:[
        {
            type:String,
            required:true
        }
    ],
    color:{
        type:String,
        required:true
    }
})


categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtual: true,
});


exports.Category = mongoose.model('Category', categorySchema);
exports.categorySchema = categorySchema;

