import http from "http";
import { servePublicFiles, serveStaticFile } from "./handler.js";
import unsplash from "./api/unsplash.js";

const PORT = 5000;

const routes = {
    "/": (req, res) => {
        serveStaticFile(res, "./public/index.html", "text/html");
    },
    "/login":(req,res)=>{
        serveStaticFile(res,"./public/login.html","text/html");
    },
    "/register":(req,res)=>{
        serveStaticFile(res,"./public/register.html","text/html");    },
    "/random-img":async (req, res, params)=>{
       
        const count = +params.split("&")[0].split("=")[1];
        const photos = await unsplash.photos.getRandom({ query: 'plants', count });
        const result = photos.response.map(pic => pic.urls.regular);
        
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
    }
};

const server = http.createServer(async (req, res) => {
    const split = req.url.split("?");
    const routeHandler = routes[split[0]];

    if (routeHandler) {
        routeHandler(req, res, split[1]);
    } else {
        servePublicFiles(req, res);
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
