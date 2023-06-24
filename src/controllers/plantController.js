import {searchByKeyService,viewPlantPhoto,likePlantService,findLikedPlants,savePlantService,getPlantsByUser
,getAllTags,findByTags} from "../services/plantService.js";
import TokenUtils from "../util/tokenUtils.js";
import {getBodyFromReq,getFormDataFromRequest} from "../util/utilFunctions.js";

export async function serchByKey(req, res, params) {
        const key = params.split("=")[1];
        try {
            console.log(key);
            const plants = await searchByKeyService(key);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(plants))
        } catch (error) {
            console.error(error);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    export async function viewPlant(req, res) {
        
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

    export async function likePlant(req, res) {

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

            const response =  await likePlantService(url, user_id);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: response }));
        } catch (error) {
            console.error(error);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }
    export async function getLikedPlants(req, res) {
        try{
            if(!req.headers.authorization){
                res.writeHead(401,{"Content-Type" : "text/plain"});
                res.end(Json.stringify({error:"Unauthorized"}));
            }
            const token = req.headers.authorization.split(" ")[1];
            const user_id = TokenUtils.verifyToken(token);
            console.log("decoded :", user_id);
            const photos = await findLikedPlants(user_id);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(photos));


        }catch (error){
            console.error(error);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    export async function savePlant(req, res) {
        try{
            if(!req.headers.authorization){
                res.writeHead(401,{"Content-Type" : "text/plain"});
                res.end(Json.stringify({error:"Unauthorized"}));
            }
            const token = req.headers.authorization.split(" ")[1];
            const user_id = TokenUtils.verifyToken(token);
            
            const {fields,files} = await getFormDataFromRequest(req);
          
            const response = await savePlantService(fields, files.image[0].filepath, user_id);

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: response }));
        }catch (error){
            console.error(error);
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    export async function getUploadedPlants(req, res) {
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

            const plants = await getPlantsByUser(user_id);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(plants));
        }
        catch (error){
            console.error(error);
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    export async function getTags(req, res) {
        try{
            const tags = await getAllTags();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(tags));
        }catch (error){
            console.error(error);
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }
    export async function searchByTags(req, res, params) {
        try{
            const tags = params.split("=")[1];
            const plants = await findByTags(tags);
            console.log("plants",plants);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(plants));
        }catch (error){
            console.error(error);
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }

