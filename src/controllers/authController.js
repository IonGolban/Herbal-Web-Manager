import authService from "../services/authService";

class AuthController{
    async login(req,res){
        try{
            const {username,password} = req.body;
            const token = await authService.login(username,password);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(token));
        }catch(err){
            console.error(err);
            res.status(500).json({error:"An error occurred while processing your request"});
        }
        
    }
    async register(req,res){
        try{
            const {username,password,email} = req.body;
            const token = await authService.register(username,password,email);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(token));
        }catch(err){
            res.status(500).json({error:"An error occurred while processing your request"});
        }
    }
    async logout(req,res){
    }
    async getUser(req,res){
    }
}

export default new AuthController();