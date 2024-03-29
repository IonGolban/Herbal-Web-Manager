import { servePublicFiles, serveStaticFile } from "./handler.js";
import {getRandomImages,getImagesByTag,saveImages} from "./controllers/catalogController.js";
import {serchByKey,viewPlant,likePlant,getLikedPlants,savePlant,getUploadedPlants,getTags,searchByTags} from "./controllers/plantController.js";
import authController from "./controllers/authController.js";
import { createCollection, getCollectionOfCurrentUser, addPlantToCollection, getPlantsByCollectionId } from "./controllers/collectionController.js";
import editService from "./services/editService.js";
import { getAllUsers, getAllPlants, deleteUser, deletePlant } from "./controllers/adminController.js";
import {
    editProfileInfo, downloadStats, getStats, getUser,
    deleteLiked, deleteCollectionAdded, deleteUpdated,
    deleteCollection
} from "./controllers/userController.js";


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
    "/upload": async (req, res) => {
        serveStaticFile(res, "./public/upload.html", "text/html");
    },
    "/statistics": async (req, res, params) => {
        console.log("Request received for /statistics");
        serveStaticFile(res, "./public/statistics.html", "text/html");
    },
    "/admin": async (req, res, params) => {
        console.log("Request received for /admin");
        serveStaticFile(res, "./public/admin.html", "text/html");
    },
    "/authorized": async (req, res) => {
        await authController.isAuth(req, res);
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
        await getRandomImages(req, res, params);
    },

    "/img-by-tag": async (req, res, params) => {
        console.log(params);
        await getImagesByTag(req, res, params);
    },
    "/save-random-imgs": async (req, res) => {
        console.log("Request received for /save-random-imgs");
        console.log("Saving images");
        await saveImages(req, res);
    },
    "/search": async (req, res, params) => {
        console.log("Request received for /search");
        await serchByKey(req, res, params);
    },
    "/login-user": async (req, res, params) => {
        console.log("Request received for /login-user");

        await authController.login(req, res, params);
    },
    "/register-user": async (req, res, params) => {
        console.log("Request received for /register-user");
        await authController.register(req, res, params);
    },
    "/like": async (req, res, params) => {
        console.log("Request received for /like");
        await likePlant(req, res, params);
    },
    "/views": async (req, res, params) => {
        console.log("Request received for /views");
        await viewPlant(req, res, params);
    },
    "/profile/liked": async (req, res, params) => {
        console.log("Request received for /profile/liked");
        await getLikedPlants(req, res, params);
    },
    "/collection/create": async (req, res, params) => {
        console.log("Request received for /collection/create");
        await createCollection(req, res, params);
    },
    "/collection/getList": async (req, res, params) => {
        console.log("Request received for /collection/getList");
        await getCollectionOfCurrentUser(req, res, params);
    },
    "/collection/addPlant": async (req, res, params) => {
        console.log("Request received for /collection/addPlant");
        await addPlantToCollection(req, res, params);
    },
    "/collection/plants": async (req, res, params) => {
        console.log("Request received for /collection/getPlants");
        await getPlantsByCollectionId(req, res, params);
    },
    "/upload/photo": async (req, res, params) => {
        console.log("Request received for /uppload/photo");
        await savePlant(req, res, params);
    },
    "/edit": async (req, res, params) => {
        console.log("Request received for /edit");
        await editProfileInfo(req, res, params);
    },
    "/profile/uploaded": async (req, res, params) => {
        console.log("Request received for /profile/uploaded");
        await getUploadedPlants(req, res, params);
    },
    "/catalog/tags": async (req, res, params) => {
        console.log("Request received for /catalog/tags");
        await getTags(req, res, params);
    },
    "/catalog/search": async (req, res, params) => {
        console.log("Request received for /catalog/search");
        await searchByTags(req, res, params);
    },
    "/statistics/liked/download": async (req, res, params) => {
        console.log("Request received for /statistics/liked/download");
        downloadStats(req, res, params);
    },
    "/getUserData": async (req, res, params) => {
        console.log("Request received for /getUserData");
        await getUser(req, res, params);
    },
    "/collection/plants/remove": async (req, res, params) => {
        console.log("Request received for /collection/plant/remove");
        await deleteCollectionAdded(req, res, params);
    },
    "/like/remove": async (req, res, params) => {
        console.log("Request received for /like/remove");
        await deleteLiked(req, res, params)
    },
    "/statistics/download": async (req, res, params) => {
        console.log("Request received for /statistics/download");
        await downloadStats(req, res, params);
    },
    "/statistics/data": async (req, res, params) => {
        console.log("Request received for /statistics/data");
        // await editController.setRandomNamesToPlants(req, res, params);
        await getStats(req, res, params);
    },
    "/update/remove": async (req, res, params) => {
        console.log("Request received for /like/remove");
        await deleteUpdated(req, res, params)
    },
    "/collection/delete": async (req, res, params) => {
        console.log("Request received for /collection/delete");
        await deleteCollection(req, res, params)
    },
    "/users/all": async (req, res, params) => {
        console.log("Request received for /users/all");
        await getAllUsers(req, res, params)
    },
    "/user/delete": async (req, res, params) => {
        console.log("Request received for /user/delete");
        await deleteUser(req, res, params)
    },
    "/plants/all": async (req, res, params) => {
        console.log("Request received for /plant/all");
        await getAllPlants(req, res, params)
    },
    "/plant/delete": async (req, res, params) => {
        console.log("Request received for /plant/delete");
        await deletePlant(req, res, params)
    }

};

export default routes;