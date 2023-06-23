import { getAllUsersData,getAllPlantsData,deleteUserById,deletePlantById } from "../services/adminService.js";

export async function getAllUsers(req, res, params) {
    try {
        const response = await getAllUsersData();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify( response ));
    } catch (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({ error: err.message }));
    }
}

export async function getAllPlants(req, res, params){
    try{
        const response = await getAllPlantsData();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify( response ));
    }catch (err){
        console.log(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({ error: err.message }));
    }
}

export async function deleteUser(req, res, params) {
    const userId = params.split("=")[1];
    try {
        const response = await deleteUserById(userId);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ response }));
    } catch (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({ error: err.message }));
    }
}

export async function deletePlant(req, res, params) {
    const plantId = params.split("=")[1];
    try {
        const response = await deletePlantById(plantId);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ response }));
    } catch (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({ error: err.message }));
    }
}