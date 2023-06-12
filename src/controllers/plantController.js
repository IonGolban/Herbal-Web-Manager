import plantService from "../services/plantService.js";

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
}

export default new plantController();