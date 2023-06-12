import CatalogService from "../services/catalogService.js";


class catalogController{
    async getRandomImages(req,res,params){
        const count = +params.split("=")[1];
        try {
            const photos = await CatalogService.getRandomImages(count);
           // console.log(photos);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(photos))
        } catch (error) {
            console.error(error);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }
    async getImagesByTag(req,res,params){
        const tag = params.split("=")[1];
        try{
            const photos = await CatalogService.getImagesByTag(tag);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(photos))
        }catch(error){
            console.error(error);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: "An error occurred while processing your request" }));
        }
    };
    async saveImages(req,res){
        try{
            await CatalogService.saveImages();
            console.log("Images saved");
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Photo saved" }));
        }catch(error){
            console.error(error);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }
}
    

export default new catalogController();