import { createServer } from "http";
import express, { Express } from "express";
import helmet from "helmet";

const port = 8000;
const expressApp: Express = express();  //the instance of the Express application

expressApp.use(express.json());  // used to parse incoming requests with JSON payloads
expressApp.use(express.urlencoded({extended: true})) //middleware parses URL-encoded data (form submissions). The extended: true option allows parsing more complex objects, including nested objects

expressApp.get("/", (req, resp) => {
    resp.send("Hello, SportsStore");
})

const server = createServer(expressApp);  //the Express application is passed to the createServer function, creating an HTTP server using the Express app as the request handler.
server.listen(port, () => console.log(`HTPP Server listening on port ${port}`)); 