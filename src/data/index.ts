import { CatalogRepository } from "./catalog_repository";
import { CatalogRepoImpl } from "./orm";


export const catalog_repository: CatalogRepository = new CatalogRepoImpl(); // this is the instance of the CatalogRepoImpl class that will be used by the application to interact with the database.