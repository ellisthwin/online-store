"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const port = 8000;
const expressApp = (0, express_1.default)(); //the instance of the Express application
expressApp.use(express_1.default.json()); // used to parse incoming requests with JSON payloads
expressApp.use(express_1.default.urlencoded({ extended: true })); //middleware parses URL-encoded data (form submissions). The extended: true option allows parsing more complex objects, including nested objects
expressApp.get("/", (req, resp) => {
    resp.send("Hello, SportsStore");
});
const server = (0, http_1.createServer)(expressApp); //the Express application is passed to the createServer function, creating an HTTP server using the Express app as the request handler.
server.listen(port, () => console.log(`HTPP Server listening on port ${port}`));
