import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 1,
        maxlength: 30
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50,
    },

    email: {
        type: String,
        required: true,
        trim: true, 
        unique: true,
        lowercase: true,
    }
},{
    timestamps: true,
} 
)

// before saving the user, hash the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);

}); 

// method to compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
export const User = mongoose.model("User", userSchema);    

