import {Express} from "express";
export const createCatalogRoutes = (app: Express) => 
{
    app.get("/", (req, resp) => {
        //resp.send("Hello, SportsStore Route");
        resp.render("index");
    })
}