import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const postLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
      if(user){
          bcrypt.compare(password, user.password, async function(err, result) {
              if(err){
                  res.status(401).send(err);
              }
              if(result){
                try {
                    const resData = await User.findOne({ email: email }).select("-password");
                    const accessToken = jwt.sign({resData},process.env.SECRETKEY);
                      res.status(200).json(accessToken);
                    
                } catch (error) {
                  res.send("Something went worng"); 
                }
              }
              else{
                  res.status(403).send("Invalid username or password");
              }
          });
      }else{
          res.status(404).send("Invalid username or password");
      }
  }
  export default postLogin;