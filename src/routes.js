    import { servePublicFiles, serveStaticFile } from "./handler.js";
import catalogController from "./controllers/catalogController.js";
import plantService from "./services/plantService.js";
import plantController from "./controllers/plantController.js";
import authController from "./controllers/authController.js";
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
        await catalogController.getRandomImages(req, res, params);
    },

    "/img-by-tag": async (req, res, params) => {
        console.log(params);
        await catalogController.getImagesByTag(req, res, params);
    },
    "/save-random-imgs": async (req, res) => {
        console.log("Request received for /save-random-imgs");
        console.log("Saving images");
        await catalogController.saveImages(req, res);
    },
    "/search": async (req,res,params) => {
        console.log("Request received for /search");
        await plantController.serchByKey(req,res,params);
    },
    "/login-user": async (req,res,params) => {
        console.log("Request received for /login-user");

        await authController.login(req,res,params);
    },
    "/register-user": async (req,res,params) => {
        console.log("Request received for /register-user");
        await authController.register(req,res,params);
    },
    "/like" : async (req,res,params) => {
        console.log("Request received for /like");
        await plantController.likePlant(req,res,params);
    },
    "/views" : async (req,res,params) => {
        console.log("Request received for /views");
        await plantController.viewPlant(req,res,params);
    },
    "/profile/liked" : async (req,res,params) => {
        console.log("Request received for /profile/liked");
        await plantController.getLikedPlants(req,res,params);
    }
};

export default routes;