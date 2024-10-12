import { DataTypes, Sequelize } from "sequelize";
import { CategoryModel, ProductModel, SupplierModel } from "./catalog_models";

const primaryKey = {     //Creates a reusable configuration for the id primary key field
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
};

export const initializeCatalogModels = (sequelize: Sequelize) => {  // The Sequelize instance connected to your database

    ProductModel.init({    //Defines the table schema for ProductModel in the database.
        ...primaryKey,                                    //Includes the primary key configuration
        name: { type: DataTypes.STRING},        
        description: { type: DataTypes.STRING}, 
        price: { type: DataTypes.DECIMAL(10, 2) }        //DECIMAL field with precision (10, 2) for the product's price.
    }, { sequelize })       //Associates this model with the provided Sequelize instance

    CategoryModel.init({
        ...primaryKey,
        name: { type: DataTypes.STRING}
    }, { sequelize });

    SupplierModel.init({
        ...primaryKey,
        name: { type: DataTypes.STRING}
    }, { sequelize})

    ProductModel.belongsTo(CategoryModel, { foreignKey: "categoryId", as: "category"});     // Establishes a many-to-one relationship from ProductModel to CategoryModel    
    ProductModel.belongsTo(SupplierModel, { foreignKey: "supplierId", as: "supplier"});
    CategoryModel.hasMany(ProductModel, { foreignKey: "categoryId", as: "products"}); // Establishes a one-to-many relationship from CategoryModel to ProductModel //"categoryId": Specifies the foreign key in ProductModel
    SupplierModel.hasMany(ProductModel, { foreignKey: "supplierId", as: "products"});
}

//This setup the actual database schema and relationships within Sequelize
//Passing { sequelize } associates the model with the Sequelize instance, allowing it to interact with the database.