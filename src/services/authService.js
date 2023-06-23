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
        if(user.role == null){
          user.role = "user";
          await user.save();
        }
        const payload = {
            id: user._id,
            role: user.role,
        };
        const token = TokenUtils.generateToken(payload);
        console.log(token);
        console.log(user.role);
        return {token, role : user.role};


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
            let role = "user";
           if(username == "admin"){
            role = "admin";
           }
            const user = new User({
              username: username,
              password: hashedPassword,
              email: email,
              role: role,
            });
        
            const savedUser = await user.save();
            const payload = {
              id: savedUser._id,
              role: savedUser.role,
            };
            const token = TokenUtils.generateToken(payload);
            
            return {token, role : savedUser.role};
          } catch (error) {
            console.error(error);
            throw new Error(error);
          }
    }

    async logout(){
    }
    async getUser(token){
        const payload = TokenUtils.verifyToken(token);
        const user = await User.findById(payload.id);
        return user;
    }

}

export default new AuthService();