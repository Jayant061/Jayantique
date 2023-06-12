import bcrypt from "bcrypt";
// import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import User from "../models/user.js";

const saltRounds = 12;
 const postRegister = async (req, res) => {
    const { name, email, password, phone, gender } = req.body;
    console.log(name);
  
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      let user = await User.findOne({ email: email });
      if (err) {
        res.status(500).send("Something went Wrong");
      }
      if (user) {
        res.status(401).send("User already exist");
      } else {
        const newUser = new User({
          email,
          name,
          gender,
          password: hash,
          phone,
        });
        await newUser.save();
        const resData = await User.findOne({ email: req.body.email }).select("-password");
        console.log(resData);
        const accessToken = jwt.sign({resData},process.env.SECRETKEY);
        res.status(200).json(accessToken);
      }
    });
  }
  export default postRegister;