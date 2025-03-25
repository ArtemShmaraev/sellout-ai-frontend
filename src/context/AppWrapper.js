import {createContext, useEffect} from "react";
import {productStore} from "@/store/ProductsStore";
import {desktopStore} from "@/store/DesktopStore";
import {filterStore} from "@/store/FilterStore";
import {adminStore} from "@/store/AdminStore";
import {userStore} from "@/store/UserStore";
import {refreshToken} from "@/http/userApi";
import jwtDecode from "jwt-decode";

export const Context = createContext(null);

export default function AppWrapper({ children }) {
    let sharedState = {
        desktopStore,
        productStore,
        filterStore,
        adminStore,
        userStore
    }
    useEffect(() => {
        const token = localStorage.getItem('refresh_token');
        const data = {
            refresh: token
        }
        console.log(JSON.stringify(data), '\nok')
        if (token) {
            refreshToken(JSON.stringify(data))
                .then((res) => {
                    const {access} = res
                    const data = jwtDecode(access)
                    userStore.setIsLogged(true)
                    userStore.setId(data.user_id)
                    userStore.setUsername(data.username)
                    userStore.setFirstName(data.first_name)
                    userStore.setLastName(data.last_name)
                    userStore.setAccessToken(data.access)
            }).catch((e) => {
                console.log(e.message)
                //TODO delete log
                userStore.setIsLogged(false)
            })
        }
    }, []);

    return (
        <Context.Provider value={sharedState}>
            {children}
        </Context.Provider>
    );
}