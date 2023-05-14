        import http from "http";
        import { servePublicFiles, serveStaticFile } from "./handler.js";
        import unsplash from "./api/unsplash.js";
        import catalogController from "./controllers/catalogController.js";

        const PORT = 5000;

        const routes = {
            "/" : async (req, res) => {
                console.log("Request received for /");
                serveStaticFile(res, "./public/index.html", "text/html");
            },
            "/login" : async (req,res)=>{

                serveStaticFile(res,"./public/login.html","text/html");
            },
            "/register" : async (req,res)=>{
                serveStaticFile(res,"./public/register.html","text/html");
            },
            "/catalog" : async (req,res)=>{
                serveStaticFile(res,"./public/catalog.html","text/html");
            },
            
            "/catalog/random-img" : async (req,res,params)=>{
                console.log("Request received for /catalog/random-img");
                serveStaticFile(res,"./public/catalog.html","text/html");
            },

            "/random-img" : async (req, res, params)=>{
                console.log("Request received for /random-img");

                catalogController.getRandomImages(req,res,params);
            },
            // /random-img/search?query=$query
            "/random-img/search" : async (req,res,params)=>{
                catalogController.getImagesByTag(params);
            },
            "/save-random-imgs" : async (req,res)=>{  
                console.log("Request received for /save-random-imgs");
                console.log("Saving images");
                catalogController.saveImages(req,res);
            }
        };

        const server = http.createServer( async ( req , res ) => {

            console.log("Request received to " + req.url + " using " + req.method + " method");
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
