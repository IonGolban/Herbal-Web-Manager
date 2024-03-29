import { getRandomImagesService, getImagesByTagService, saveImagesService } from "../services/catalogService.js";


export async function getRandomImages(req, res, params) {
    const count = +params.split("=")[1];
    try {
        const photos = await getRandomImagesService(count);
        // console.log(photos);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(photos))
    } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({ error: error.message }));
    }
}
export async function getImagesByTag(req, res, params) {
    const tag = params.split("=")[1];
    try {
        const photos = await getImagesByTagService(tag);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(photos))
    } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({ error: "An error occurred while processing your request" }));
    }
};
export async function saveImages(req, res) {
    try {
        await saveImagesService();
        console.log("Images saved");
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Photo saved" }));
    } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(JSON.stringify({ error: error.message }));
    }
}



