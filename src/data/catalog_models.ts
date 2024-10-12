export interface Product {
    id?: number;  // ? used for optional fields
    name: string;
    description: string;
    price: number;

    category?: Category;  // An optional property of type Category. Links the product to a category.
    supplier?: Supplier;
}

export interface Category {
    id?: number;
    name: string;
    products?: Product[];  // Contains products belonging to the category.
}

export interface Supplier{
    id?: number;
    name: string;
    products?: Product[];

}
