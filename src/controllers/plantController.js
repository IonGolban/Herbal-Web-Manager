import plantService from "../services/plantService.js";
import TokenUtils from "../util/tokenUtils.js";
import {getBodyFromReq,getFormDataFromRequest} from "../util/utilFunctions.js";
class plantController {

    async serchByKey(req, res, params) {
        const key = params.split("=")[1];
        try {
            console.log(key);
            const plants = await plantService.searchByKey(key);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(plants))
        } catch (error) {
            console.error(error);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    async viewPlant(req, res) {
        
        try{
            if (!req.headers.authorization) {
                res.writeHead(401, { "Content-Type": "text/plain" });
                res.end(JSON.stringify({ error: "Unauthorized" }));
                return;
            }
            let data = "";
            await req.on("data", (chunk) => {
                data += chunk;
            });
            data = JSON.parse(data);
            const url = data;
            const token = req.headers.authorization.split(" ")[1];
            const user_id = TokenUtils.verifyToken(token);

            const response =  await plantService.viewPlantPhoto(url, user_id);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(response));

        } catch (error) {
            console.error(error);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    async likePlant(req, res) {

        try {
            if (!req.headers.authorization) {
                res.writeHead(401, { "Content-Type": "text/plain" });
                res.end(JSON.stringify({ error: "Unauthorized" }));
                return;
            }
            let data = "";
            await req.on("data", (chunk) => {
                data += chunk;
            });
            data = JSON.parse(data);
            const url = data;
            const token = req.headers.authorization.split(" ")[1];
            const user_id = TokenUtils.verifyToken(token);

            const response =  await plantService.likePlant(url, user_id);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: response }));
        } catch (error) {
            console.error(error);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }
    async getLikedPlants(req, res) {
        try{
            if(!req.headers.authorization){
                res.writeHead(401,{"Content-Type" : "text/plain"});
                res.end(Json.stringify({error:"Unauthorized"}));
            }
            const token = req.headers.authorization.split(" ")[1];
            const user_id = TokenUtils.verifyToken(token);

            const photos = await plantService.getLikedPlants(user_id);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(photos));


        }catch (error){
            console.error(error);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    async savePlant(req, res) {
        try{
            if(!req.headers.authorization){
                res.writeHead(401,{"Content-Type" : "text/plain"});
                res.end(Json.stringify({error:"Unauthorized"}));
            }
            const token = req.headers.authorization.split(" ")[1];
            const user_id = TokenUtils.verifyToken(token);
            
            const {fields,files} = await getFormDataFromRequest(req);
            // console.log(fields);
            // console.log(imageFile);
            // console.log(files.image[0].filepath);
            const response = await plantService.savePlant(fields, files.image[0].filepath, user_id);

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: response }));
        }catch (error){
            console.error(error);
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    async getUploadedPlants(req, res) {
        try{
            if(!req.headers.authorization){
                res.writeHead(401,{"Content-Type" : "text/plain"});
                res.end(Json.stringify({error:"Unauthorized"}));
            }
            const token = req.headers.authorization.split(" ")[1];
            const user_id = TokenUtils.verifyToken(token);
            if(!user_id){
                res.writeHead(401,{"Content-Type" : "text/plain"});
                res.end(Json.stringify({error:"Unauthorized"}));
            }

            const plants = await plantService.getPlantsByUser(user_id);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(plants));
        }
        catch (error){
            console.error(error);
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }
}

export default new plantController();