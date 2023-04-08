// const http = require('http');
// const url = require('url');
// const querystring = require('querystring');
// const fs = require('fs');
// const port = 3000;

// const server = http.createServer((req, res) => {
//     const reqUrl = url.parse(req.url, true);
//     const reqMethod = req.method;
//     if (reqMethod === 'GET') {
//         if (reqUrl.pathname === '/') {
//             fs.readFile("./html/index.html", function (error, data) {
//                 if (error) {
//                     res.writeHead(404);
//                     res.write('Error: File not found')
//                 }
//                 else {
//                     res.writeHead(202);
//                     res.write(data)
//                 }
//                 res.end()
//             })
//         } else if (reqUrl.pathname === '/about') {
            
//         } else {
//             res.writeHead(404, { 'Content-Type': 'text/plain' });
//             res.end('404 Not Found'); 
//         }
//     }
// })   

// server.listen(port, () => {
//     console.log('Server running on port 3000');
// });


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
