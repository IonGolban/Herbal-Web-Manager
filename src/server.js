import http from "http";
import { servePublicFiles, serveStaticFile } from "./handler.js";
import routes from "./routes.js";
import dotenv from "dotenv";
import TokenUtils from "./util/tokenUtils.js";
dotenv.config();
const requiresAuthentication = ['/like', '/profile/liked', '/collection/create', '/collection/getList', '/collection/addPlant',
    "/collection/plants", "/upload/photo", "/edit", "/profile/uploaded",
];

const PORT = 5000;

const server = http.createServer(async (req, res) => {

    console.log("Request received to " + req.url + " using " + req.method + " method");
    const split = req.url.split("?");
    console.log(split);

    if (requiresAuthentication.includes(split[0])) {
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(" ")[1];


        console.log(verifyToken(token));
        console.log(requiresAuthentication.includes(split[0]));
        if (requiresAuthentication.includes(split[0]) && !verifyToken(token).valueOf()) {
            console.log(split[0]);
            console.log("Unauthorized");
            res.writeHead(401, { "Content-Type": "text/plain" });
            res.end(JSON.stringify({ error: "Unauthorized" }));
            return;
        }
    }
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


function verifyToken(token) {
    try {
        const id = TokenUtils.verifyToken(token);
        console.log("id=" + id.valueOf());
        if (id) return true;
        return false;
    } catch (error) {
        return false;
    }
}