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
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "An error occurred while processing your request" }));
        }
    }
    async getImagesByTag(req,res,params){
        const query = params.split("=")[1];
        try{
            const photos = await CatalogService.getImagesByTag(query);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(photos))
        }catch(error){
            console.error(error);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "An error occurred while processing your request" }));
        }
    };
}
    

export default new catalogController();