import { Express } from "express";
import { createCatalogRoutes } from "./catalog";

export const createRoute = (app: Express) => {
    createCatalogRoutes(app);
}