    import { servePublicFiles, serveStaticFile } from "./handler.js";
import catalogController from "./controllers/catalogController.js";
import plantService from "./services/plantService.js";
import plantController from "./controllers/plantController.js";
import authController from "./controllers/authController.js";
import editController from "./controllers/editController.js";
import {createCollection,getCollectionOfCurrentUser,addPlantToCollection,getPlantsByCollectionId} from "./controllers/collectionController.js";
import editService from "./services/editService.js";
import {editProfileInfo} from "./controllers/userController.js";

const routes = {
    "/": async (req, res) => {
        console.log("Request received for /");
        // await editService.addNameForPlants();
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
    "/upload": async (req, res) => {
        serveStaticFile(res, "./public/upload.html", "text/html");
    },

    "/catalog/random-img": async (req, res, params) => {
        console.log("Request received for /catalog/random-img");
        serveStaticFile(res, "./public/catalog.html", "text/html");
    },
    "/profile/collection": async (req, res) => {
        console.log("Request received for /profile/collection");
        serveStaticFile(res, "./public/profile.html", "text/html");
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
    },
    "/collection/create" : async (req,res,params) => {
        console.log("Request received for /collection/create");
        await createCollection(req,res,params);
    },
    "/collection/getList" : async (req,res,params) => {
        console.log("Request received for /collection/getList");
        await getCollectionOfCurrentUser(req,res,params);
    },
    "/collection/addPlant" : async (req,res,params) => {
        console.log("Request received for /collection/addPlant");
        await addPlantToCollection(req,res,params);
    },
    "/collection/plants" : async (req,res,params) => {
        console.log("Request received for /collection/getPlants");
        await getPlantsByCollectionId(req,res,params);
    },
    "/upload/photo" : async (req,res,params) => {
        console.log("Request received for /uppload/photo");
        await plantController.savePlant(req,res,params);
    },
    "/edit" : async (req, res, params) => {
        console.log("Request received for /edit");
        await editProfileInfo(req, res, params);
    },
    "/profile/uploaded" : async (req, res, params) => {
        console.log("Request received for /profile/uploaded");
        await plantController.getUploadedPlants(req, res, params);
    },
    "/profile/change/profile-picture" : async (req, res, params) => {
        console.log("Request received for /profile/change/profile-picture");
        await authController.changeProfilePicture(req, res, params);
    },
    "profile/change/cover-photo" : async (req, res, params) => {
        console.log("Request received for /profile/change/cover-photo");
        await authController.changeCoverPhoto(req, res, params);
    }


};

export default routes;