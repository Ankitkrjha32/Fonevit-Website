import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    
    cartData: {type: Object, default: {}},
    profilePic: {type: String, default: "/profile.png"},
    lastLogin: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpiresAt: { type: Date },
    verficationToken: { type: String, default: null },
    verificationTokenExpiresAt: { type: Date },
}, {timestamps: true});

const userModel = mongoose.models.user || mongoose.model('user',userSchema);
export default userModel