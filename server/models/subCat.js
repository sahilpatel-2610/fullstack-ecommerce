const mongoose = require('mongoose');
 
const subCatSchema = mongoose.Schema({
    category: {
        type:String,   
        required: true
    }, 
    subCat:{
        type:String,
        required:true
    }
})


subCatSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

subCatSchema.set('toJSON', {
    virtual: true,
});



exports.SubCategory = mongoose.model('SubCategory', subCatSchema);
exports.subCatSchema = subCatSchema;
