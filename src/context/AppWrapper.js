import {createContext} from "react";
import {productStore} from "@/store/ProductsStore";
import {desktopStore} from "@/store/DesktopStore";
import {filterStore} from "@/store/FilterStore";

export const Context = createContext(null);

export function AppWrapper({ children }) {
    let sharedState = {
        desktopStore,
        productStore,
        filterStore
    }
    return (
        <Context.Provider value={sharedState}>
            {children}
        </Context.Provider>
    );
}