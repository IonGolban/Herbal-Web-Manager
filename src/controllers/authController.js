import authService from "../services/authService.js";
import TokenUtils from "../util/tokenUtils.js";
class AuthController{
    async login(req,res){
        try{
            let data = "";
            await req.on("data", (chunk) => {
                data += chunk;
            });

            data = JSON.parse(data);
            const {username,password} = data;
            
            const token = await authService.login(username,password);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(token));
        }catch(err){
            console.error(err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: err.message }));
        }
        
    }
    async register(req,res){
        try{
            let data = "";
            await req.on("data", (chunk) => {
                data += chunk;
            });

            data = JSON.parse(data);
            const {username,password,email} = data;
            const token = await authService.register(username,password,email);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(token));
        }catch(err){
            console.error(err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: err.message }));
        }
    }
    async logout(req,res){
    }
    async getUser(req,res){
        try{
            const token = req.headers.authorization.split(" ")[1];
            const user = await authService.getUser(token);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(user));
        }catch(err){
            console.error(err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: err.message }));
        }
    }

    async isAuth(req,res){
        try{
            const token = req.headers.authorization.split(" ")[1];
            const user_id = TokenUtils.verifyToken(token);
            if(!user_id){
                res.writeHead(401,{"Content-Type" : "text/plain"});
                res.end(JSON.stringify({error:"Unauthorized"}));
                return;
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({message:"Authorized"}));
        }catch(err){
            console.error(err);
            res.writeHead(401, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: err.message }));
        }
    }
}

export default new AuthController();