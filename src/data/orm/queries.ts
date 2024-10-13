import { CategoryModel, ProductModel, SupplierModel } from "./models";
import { BaseRepo, Constructor} from "./core";
import { ProductQueryParameters } from "../catalog_models";
import {Op} from "sequelize";

export function AddQueries<TBase extends Constructor<BaseRepo>>(Base: TBase) {
    return class extends Base {
        async getProducts(params?: ProductQueryParameters) {
            const opts: any = {};
            if(params?.page && params.pageSize)
            {
                opts.limit = params?.pageSize,
                opts.offset = (params.page -1) * params.pageSize
            }

            if(params?.searchTerm){
                const searchOp = { [Op.like]: "%" + params.searchTerm + "%"};
                opts.where = { [Op.or]: {name: searchOp, description: searchOp }}
            } //Products that contain the searchTerm in either their name or description will be included in the results.

            if (params?.category) {
                opts.where =  {
                    ...opts.where, categoryId: params.category //Merges the existing filter conditions (opts.where) with the new condition categoryId: params.category.
                }
            } //Only products that belong to the specified category are included in the results.
            
            const categories = await this.getCategories();

            const result = await ProductModel.findAndCountAll({
                include: [
                    {model: SupplierModel, as: "supplier"},
                    {model: CategoryModel, as: "category"}
                ],
                raw: true, nest: true,
                ...opts
            });

            return { products: result.rows, totalCount: result.count, categories };
        }

        getCategories() {
            return CategoryModel.findAll({
                raw: true, nest: true
            });
        }

        getSuppliers() {
            return SupplierModel.findAll({
                raw: true, nest: true
            });
        }
    }
}