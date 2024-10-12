import { CategoryModel, ProductModel, SupplierModel } from "./models";
import { BaseRepo, Constructor} from "./core";
import { ProductQueryParameters } from "../catalog_models";

export function AddQueries<TBase extends Constructor<BaseRepo>>(Base: TBase) {
    return class extends Base {
        async getProducts(params?: ProductQueryParameters) {
            const opts: any = {};
            if(params?.page && params.pageSize)
            {
                opts.limit = params?.pageSize,
                opts.offset = (params.page -1) * params.pageSize
            }
            const result = await ProductModel.findAndCountAll({
                include: [
                    {model: SupplierModel, as: "supplier"},
                    {model: CategoryModel, as: "category"}
                ],
                raw: true, nest: true,
                ...opts
            });
            return { products: result.rows, totalCount: result.count};
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