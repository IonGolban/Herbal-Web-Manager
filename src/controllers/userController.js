import TokenUtils from "../util/tokenUtils.js";
import { getBodyFromReq, getFormDataFromRequest, parseToCSV, parseToPDF } from "../util/utilFunctions.js";
import { editInfo, getStatsViewsPlantsPDF, getStatLikedPlantsPDF
    ,getStatsViewsPlantsCSV,getStatLikedPlantsCSV,getData,
    getStatsTagsPDF,getStatsTagsCSV,getStatsByType } from "../services/userService.js";
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

export async function downloadStats(req,res,params){
    try {
        const splittedParams = params.split("&");
        const type = splittedParams[0].split("=")[1];
        const statsType = splittedParams[1].split("=")[1];
        const path =`./util/${statsType}-stats.${type}`;
        let data ;
        if(type === "csv"){
            console.log("csv");
            if( statsType === "like"){
                data = await getStatLikedPlantsCSV();
            }
            else if(statsType === "view"){
                data = await getStatsViewsPlantsCSV();
            }else if(statsType === "tag"){
                data = await getStatsTagsCSV();
            }
            parseToCSV(data,path);
        }
        else if(type === "pdf"){
            
            if(statsType === "like"){
                data = await getStatLikedPlantsPDF();
            }
            else if(statsType === "view"){
                data = await getStatsViewsPlantsPDF();
            }else if(statsType === "tag"){
                data = await getStatsTagsPDF();
            }
            console.log(data);
            parseToPDF(statsType,data,path);
        }

        const fileStream = fs.createReadStream(`${path}`);

        res.writeHead(200, {
            'Content-Type': `application/${type}`,
            'Content-Disposition': `attachment; filename= ${statsType}.${type}`
        });
         
        await fileStream.pipe(res);



    }catch(err){
        console.log(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({ error: err.message }));
    }
}

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

export async function getStats(req,res,params){
    try{
        const type = params.split("=")[1];
        const response = await getStatsByType(type);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify( response ));
    }catch(err){
        console.log(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({ error: err.message }));
    }
}