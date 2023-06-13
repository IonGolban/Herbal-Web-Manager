import plantService from "../services/plantService.js";
import TokenUtils from "../util/tokenUtils.js";
class plantController{

    async serchByKey(req,res,params){
        const key = params.split("=")[1];
        try{
            console.log(key);
            const plants = await plantService.searchByKey(key);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(plants))
        }catch(error){
            console.error(error);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    async likePlant(req,res,params){
        if(!req.headers.authorization){
            res.writeHead(401, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: "Unauthorized" }));
            return;
        }
        const url = params.split("=")[1];
        const token = req.headers.authorization.split(" ")[1];
        const user_id = TokenUtils.verifyToken(token);
        try{
            await plantService.likePlant(url,user_id);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Plant liked" }));    
        }catch(error){
            console.error(error);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }
}

export default new plantController();