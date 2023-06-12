import User from "../models/userModel.js";
import PasswordUtils from "../util/passwordUtils.js";
import TokenUtils from "../util/tokenUtils.js";
import connect from "../db/mongoDatabase.js";

import dotenv from "dotenv";
dotenv.config();
 

class AuthService{

    async login(username,password){
        await connect();
        const user = await User.findOne({username:username});
        if(!user){
            throw new Error("Invalid username");
        }

        if(!await PasswordUtils.comparePassword(password,user.password)){
            throw new Error("Invalid password");
        }
        const token = TokenUtils.generateToken(user._id);

        return token;


    }
    async register(username,password,email){
        try {
            await connect();
            const existingUser = await User.findOne({ username });
            if (existingUser) {
              throw new Error("Username already exists");
            }
        
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
              throw new Error("Email already exists");
            }
            
            const hashedPassword = await PasswordUtils.hashPassword(password);
           
            const user = new User({
              username: username,
              password: hashedPassword,
              email: email,
            });
        
            const savedUser = await user.save();

            const token = TokenUtils.generateToken(2000);
            
            return token;
          } catch (error) {
            console.error(error);
            throw new Error(error);
          }
    }

    async logout(){
    }
    async getUser(token){
        const _id = TokenUtils.verifyToken(token);
        const user = await User.findById(_id);
        return user;
    }

}

export default new AuthService();