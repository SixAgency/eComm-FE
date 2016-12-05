import { navConsts } from "./site_const";

function getHeaderProps(loc) {
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

export { getHeaderProps };