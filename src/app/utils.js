import { navConsts } from "./site_const";

export function getHeaderProps(loc) {
    let navItems = [...navConsts],
        headerClass = 'default';
    navItems.map((item) => {
        if (item.regex) {
            item.isActive = Boolean(loc.pathname.match(item.regex));
        } else {
            item.isActive = loc.pathname == "/";
        }
        if (item.isActive) headerClass = item.h_class;
    });
    return { navItems, headerClass };
}

export function mapProductResponse(raw_data) {
    let product = {};
    product.name = raw_data.name;
    product.main_image = raw_data.master.images[0].large_url;
    product.price = raw_data.display_price;
    product.description = raw_data.description;
    return product;
}