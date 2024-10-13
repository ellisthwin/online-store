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

export interface ProductQueryParameters { // pagination required
    pageSize?: number;
    page?: number;
    category?: number;
    searchTerm?: string;
}

export interface ProductQueryResult { // response the repository will produce
    products: Product[];
    totalCount: number;
    categories:Category[];
}
