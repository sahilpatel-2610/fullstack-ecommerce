const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    images: [
        {
            type: String
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true
});

exports.User = mongoose.model("User", userSchema);
exports.userSchema = userSchema;
