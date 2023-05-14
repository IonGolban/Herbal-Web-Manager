import http from "http";
import { servePublicFiles, serveStaticFile } from "./handler.js";
import routes from "./routes.js";
const PORT = 5000;



const server = http.createServer(async (req, res) => {

    console.log("Request received to " + req.url + " using " + req.method + " method");
    const split = req.url.split("?");
    console.log(split);
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
