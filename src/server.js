import http from "http";
import { servePublicFiles, serveStaticFile } from "./handler.js";

const PORT = 5000;

const routes = {
    "/": (req, res) => {
        serveStaticFile(res, "./public/index.html", "text/html");
    },
    "/login":(req,res)=>{
        serveStaticFile(res,"./public/login.html","text/html");
    },
    "/register":(req,res)=>{
        serveStaticFile(res,"./public/register.html","text/html");
    },
};

const server = http.createServer((req, res) => {
    const routeHandler = routes[req.url];
    if (routeHandler) {
        routeHandler(req, res);
    } else {
        servePublicFiles(req, res);
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
