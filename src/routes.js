import { servePublicFiles, serveStaticFile } from "./handler.js";
import catalogController from "./controllers/catalogController.js";

const routes = {
    "/": async (req, res) => {
        console.log("Request received for /");
        serveStaticFile(res, "./public/index.html", "text/html");
    },
    "/login": async (req, res) => {

        serveStaticFile(res, "./public/login.html", "text/html");
    },
    "/register": async (req, res) => {
        serveStaticFile(res, "./public/login.html", "text/html");
    },
    "/profile": async (req, res) => {
        serveStaticFile(res, "./public/profile.html", "text/html");
    },
    "/catalog": async (req, res) => {
        serveStaticFile(res, "./public/catalog.html", "text/html");
    },

    "/catalog/random-img": async (req, res, params) => {
        console.log("Request received for /catalog/random-img");
        serveStaticFile(res, "./public/catalog.html", "text/html");
    },

    "/random-img": async (req, res, params) => {
        console.log("Request received for /random-img");
        catalogController.getRandomImages(req, res, params);
    },

    "/img-by-tag": async (req, res, params) => {
        console.log(params);
        catalogController.getImagesByTag(req, res, params);
    },
    "/save-random-imgs": async (req, res) => {
        console.log("Request received for /save-random-imgs");
        console.log("Saving images");
        catalogController.saveImages(req, res);
    }
};

export default routes;