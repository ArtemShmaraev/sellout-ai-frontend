import {createContext, useEffect} from "react";
import {productStore} from "@/store/ProductsStore";
import {desktopStore} from "@/store/DesktopStore";
import {filterStore} from "@/store/FilterStore";
import {adminStore} from "@/store/AdminStore";
import {userStore} from "@/store/UserStore";
import {refreshToken} from "@/http/userApi";
import jwtDecode from "jwt-decode";
import Cookies from 'js-cookie';

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
        const token = Cookies.get('refresh_token')
        const refreshObj = JSON.stringify({refresh: token})
        if (token) {
            refreshToken(refreshObj).then((data) => {
                // Save the new token
                Cookies.set('access_token', data.access)
                // Decode token to get user data
                const userData = jwtDecode(data.access)
                // Set user data in userStore
                userStore.setIsLogged(true)
                userStore.setId(userData.user_id)
                userStore.setUsername(userData.username)
                userStore.setFirstName(userData.first_name)
                userStore.setLastName(userData.last_name)

            }).catch(() => {
                Cookies.remove('access_token')
                Cookies.remove('refresh_token')
            })
        }
    }, [])

    return (
        <Context.Provider value={sharedState}>
            {children}
        </Context.Provider>
    );
}