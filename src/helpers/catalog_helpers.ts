import Handlebars, { HelperOptions } from "handlebars";
import { stringify } from "querystring"; //Converts an object into a URL-encoded query string.
import { escape } from "querystring"; // Escapes a string for use in a query string

const getData = (options:HelperOptions) => {
    return {...options.data.root, ...options.hash}
};

export const navigationUrl = (options: HelperOptions) => {
    const { page, pageSize, category, searchTerm } = getData(options);
    return "/?" + stringify({ page, pageSize, category, searchTerm });
}

export const escapeUrl = (url: string) => escape(url);

export const pageButtons = (options: HelperOptions) => {
    const {page, pageCount} = getData(options);
    let output = "";
    for(let i=1; i <= pageCount; i++)
    {
        output += options.fn({
            page, pageCount, index: i, selected: i === page
        });
    }
    return output;
}

export const pageSizeOptions = (options:HelperOptions) => {
    const { pageSize } = getData(options);
    let output="";
    [3,6,9].forEach(size => {
        output += options.fn({ size, selected: pageSize === size ? "selected": ""})
    })
    return output;
}

export const categoryButtons = (options: HelperOptions) => {
    const { category, categories } = getData(options);
    let output = "";
    for (let i=0; i < categories.length; i++)
    {
        output += options.fn({
            id: categories[i].id,
            name: categories[i].name,
            selected: category === categories[i].id
        })
    }
    return output;
}

export const highlight = (value: string, options: HelperOptions) => {
    const { searchTerm } = getData(options);
    if (searchTerm && searchTerm !== "") {
        const regexp = new RegExp(searchTerm, "ig");
        const mod = value.replaceAll(regexp, "<strong>$&</strong>");
        return new Handlebars.SafeString(mod);
    }
    return value;
}

const formatter = new Intl.NumberFormat("en-us", {style: "currency", currency: "USD"}) //Uses the Internationalization API (Intl) to format numbers as currency.

export const currency  = (value: number) => {
    return formatter.format(value);
}