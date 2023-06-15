import {createCollectionService,getCollectionByIdService,addPlantToCollectionService,getPlantsByCollectionIdService} from "../services/collectionService.js";
import TokenUtils from "../util/tokenUtils.js";
import getBodyFromReq from "../util/utilFunctions.js";
// import getCollectionByIdService from "../services/collectionService.js";

export async function createCollection(req, res, params) {
    try {

        console.log(req.headers.authorization);
        if (!req.headers.authorization) {
            res.writeHead(401, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: "Unauthorized" }));
            return;
        }

        const collection = await getBodyFromReq(req);
        const id = TokenUtils.verifyToken(req.headers.authorization.split(" ")[1]).id;

        console.log("collection: ", collection);
        console.log("id: ", id);
        const response = await createCollectionService(collection, id);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(response));
    } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({ error: error.message }));
    }
}

export async function getCollectionOfCurrentUser(req, res, params) {
    try {
        if (!req.headers.authorization) {
            res.writeHead(401, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: "Unauthorized" }));
            return;
        }
        const id = TokenUtils.verifyToken(req.headers.authorization.split(" ")[1]).id;
        const response = await getCollectionByIdService(id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(response));
    } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({ error: error.message }));
    }

}

export async function addPlantToCollection(req, res, params) {
    try {
        if (!req.headers.authorization) {
            res.writeHead(401, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: "Unauthorized" }));
            return;
        }
        const data = await getBodyFromReq(req);
        // console.log(data);
        const response = await addPlantToCollectionService(data.collection_id, data.photo_id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(response));
    } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({ error: error.message }));
    }

}

export async function getPlantsByCollectionId(req, res, params) {
    try {
        const collection_id = params.split("=")[1];
        const response = await getPlantsByCollectionIdService(collection_id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(response));
    } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({ error: error.message }));
    }

}