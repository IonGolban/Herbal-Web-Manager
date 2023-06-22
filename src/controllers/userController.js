import TokenUtils from "../util/tokenUtils.js";
import { getBodyFromReq, getFormDataFromRequest, parseToCSV, parseToPDF } from "../util/utilFunctions.js";
import { editInfo, getStatLikedPlantsCSV, getStatLikedPlantsJSON,getData } from "../services/userService.js";
import fs from "fs";

export async function editProfileInfo(req, res) {
    try {

        const { fields, files } = await getFormDataFromRequest(req);
        const token = req.headers.authorization.split(" ")[1];
        const user_id = TokenUtils.verifyToken(token);
        // console.log(fields,files);

        if(fields.email)
        {
            fields.email = fields.email[0];
        }
        if(fields.description)
        {
            fields.description = fields.description[0];
        }
        if(files.coverPhoto){
            fields.coverPhoto = files.coverPhoto[0].filepath;
            console.log("cover photo :", fields.coverPhoto);
        }
        if (files.profilePhoto) {
            fields.profilePhoto = files.profilePhoto[0].filepath;
            console.log("profile photo :", fields.profilePhoto);
        }

        console.log(fields);
        const response = await editInfo(fields, user_id);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ response }));
    } catch (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({ error: err.message }));
    }


}

export async function downloadCSVLikedPlants(req, res) {
    try {

        const data = await getStatLikedPlantsCSV();
        const path = parseToCSV(data);
        console.log(path);

        const fileStream = fs.createReadStream(`${path}`);
        res.writeHead(200, {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=likedPlants.csv'
        });
        fileStream.pipe(res);

    } catch (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({ error: err.message }));
    }
}

export async function downloadPDFLikedPlants(req, res) {
    try {

        const data = await getStatLikedPlantsJSON();
        let stats = [];
        data.forEach((plant) => {
            let stat = {
                name: plant.name,
                value: `${plant.likes} likes, ${plant.views} views, ${plant.description}`
            };
            stats.push(stat);
        });

        const path = "./liked_plants.pdf";
        parseToPDF("By Likes", stats, path);

        const fileStream = fs.createReadStream(`${path}`);
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=likedPlants.pdf'
        });
        fileStream.pipe(res);

export async function getUser(req, res) {
    try{
        
        const token = req.headers.authorization.split(" ")[1];
        const user_id = TokenUtils.verifyToken(token);

        const response = await getData(user_id);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ response }));

    } catch (err) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({ error: err.message }));
    }
}