import userModel from "../models/userModel";
import PasswordUtils from "../util/passwordUtils";
import TokenUtils from "../util/tokenUtils";


class AuthService{

    async login(username,password){
        const user = await userModel.findOne({username:username});
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
        if(!await userModel.findOne({username:username})){
            throw new Error("Username already exists");
        }
        if(!await userModel.findOne({email:email})){
            throw new Error("Email already exists");
        }
        const hashedPassword = await PasswordUtils.hashPassword(password);

        const user = await userModel.create({username:username,password:hashedPassword,email:email});
        const token = TokenUtils.generateToken(user._id);
        return token;
    }

    async logout(){
    }
    async getUser(token){
        const decoded = TokenUtils.verifyToken(token);
        const user = await userModel.findById(decoded);
        return user;
    }

}

export default new AuthService();