import { Category, Product, Supplier, ProductQueryParameters, ProductQueryResult } from "./catalog_models";

export interface CatalogRepository {
    getProducts(params?: ProductQueryParameters): Promise<ProductQueryResult>;   // Retrieves a list of all products. A Promise that resolves to an array of Product objects.
    storeProduct(p: Product): Promise<Product>;
    getCategories() : Promise<Category[]>;
    storeCategory(c: Category): Promise<Category>;
    getSuppliers(): Promise<Supplier[]>;
    storeSupplier(s: Supplier): Promise<Supplier>;
}

//All methods return Promise objects, indicating that the operations are asynchronous. This is typical when interacting with databases or external APIs.
//It defines what operations can be performed without dictating how they are implemented. This separation of concerns allows for flexibility in the implementation details.