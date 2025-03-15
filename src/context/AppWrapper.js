import {createContext} from "react";
import {productStore} from "@/store/ProductsStore";
import {desktopStore} from "@/store/DesktopStore";

export const Context = createContext(null);

export function AppWrapper({ children }) {
    let sharedState = {
        desktop: desktopStore,
        products: productStore,
    }
    return (
        <Context.Provider value={sharedState}>
            {children}
        </Context.Provider>
    );
}