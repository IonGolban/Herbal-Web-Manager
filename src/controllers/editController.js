import editService from "../services/editService.js";
import TokenUtils from "../util/tokenUtils.js";

class editController{

    async editData(req, res){
        try{

            let newData = "";
            await req.on("data", (chunk) => {
                newData += chunk;
            });
            const token = req.headers.authorization.split(" ")[1];
            const user_id = TokenUtils.verifyToken(token);
            
            const response = await editService.editInformation(newData, user_id);
                        
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ user: response }));
        } catch (err){
            console.log(err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: err.message }));
        }
    }
}

export default new editController();