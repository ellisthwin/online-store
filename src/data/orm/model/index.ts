import { Sequelize } from "sequelize";
import { initializeCatalogModels } from "./catalog_helpers";

export { ProductModel, CategoryModel, SupplierModel} from "./catalog_models"; //any module that imports from this script can also access these three models without directly importing from "./catalog_models".

export const initializeModels = (sequelize: Sequelize) => {
    initializeCatalogModels(sequelize); // by linking these models with the provided Sequelize instance, we can now use them to interact with the database.
}