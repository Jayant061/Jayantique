import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    email:String,
    gender:String,
    name:String,
    password:String,
    phone:String,
    address:{
        home:[String],
        work:[String]
    }
});
const User = mongoose.model("User",userSchema);
export default User;