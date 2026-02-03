import {createContext, useEffect, useLayoutEffect} from "react";
import {productStore} from "@/store/ProductsStore";
import {desktopStore} from "@/store/DesktopStore";
import {filterStore} from "@/store/FilterStore";
import {adminStore} from "@/store/AdminStore";
import {userStore} from "@/store/UserStore";
import {googleAuth, refreshToken} from "@/http/userApi";
import jwtDecode from "jwt-decode";
import Cookies from 'js-cookie';
import {cartStore} from "@/store/CartStore";
import {orderStore} from "@/store/OrderStore";
import {useRouter} from "next/router";
import {fetchCart2, updateCartFromCookies} from "@/http/cartApi";

export const Context = createContext(null);

export default function AppWrapper({ children }) {
    const router = useRouter()
    let sharedState = {
        desktopStore,
        productStore,
        filterStore,
        adminStore,
        userStore,
        cartStore,
        orderStore
    }
    const getGoogleToken = () => {
        const path = router.asPath
        if (!path.includes('#')) {
            return null
        }
        const urlParts = path.split("#");
        let idToken = null;
        if (urlParts.length > 1) {
            const queryParams = urlParts[1].split("&");
            for (let i = 0; i < queryParams.length; i++) {
                const paramParts = queryParams[i].split("=");
                if (paramParts[0] === "id_token") {
                    idToken = paramParts[1];
                    break;
                }
            }
        }

        return idToken
    }
    const authViaGoogle = async () => {
        const googleToken = getGoogleToken()
        if (googleToken) {
            const res = await googleAuth(googleToken)
            Cookies.set('access_token', res.access, {expires: 2772})
            Cookies.set('refresh_token', res.refresh, {expires: 2772})
            const cookieCart = Cookies.get('cart').trim().filter(el => el !== '' && el !== ' ')
            let cartFromBack
            if (cookieCart) {
                cartFromBack = await updateCartFromCookies(cookieCart, res.user_id, res.access)
            } else {
                cartFromBack = await updateCartFromCookies('', res.user_id, res.access)
            }
            cartStore.setCartCnt(cartFromBack.length)
            let newStr = ''
            cartFromBack.forEach(el => newStr += " " + el)
            Cookies.set('cart', newStr, {expires: 2772})
            userStore.setIsLogged(true)
            userStore.setId(res.user_id)
            userStore.setUsername(res.username)
            userStore.setFirstName(res.first_name)
            userStore.setLastName(res.last_name)
            userStore.setAccessToken(res.access)
            userStore.setGender('')
        }
    }
    useEffect(() => {
        const token = Cookies.get('refresh_token')
        const refreshObj = JSON.stringify({refresh: token})
        if (token) {
            refreshToken(refreshObj).then((data) => {
                // Save the new token
                Cookies.set('access_token', data.access, {expires: 2772})
                // Decode token to get user data
                const userData = jwtDecode(data.access)
                // Set user data in userStore
                userStore.setIsLogged(true)
                userStore.setId(userData.user_id)
                userStore.setUsername(userData.username)
                userStore.setFirstName(userData.first_name)
                userStore.setLastName(userData.last_name)
                if (userData.gender === 'None') {
                    userStore.setGender('')
                } else {
                    userStore.setGender(userData.gender)
                }
                fetchCart2(userData.user_id, data.access).then(cart => {
                    cartStore.setCartCnt(cart.product_units.length)
                })

            }).catch(() => {
                userStore.setIsLogged(false)
                userStore.setGender('')
                Cookies.remove('access_token')
                Cookies.remove('refresh_token')
            })
        }
        authViaGoogle()
        const cart = Cookies.get('cart')
        const lastSeen = Cookies.get('last_seen')
        if (cart && !userStore.isLogged) {
            const cartCnt = cart.trim().split(' ').filter(el => el !== ' ' && el !== '').length
            cartStore.setCartCnt(cartCnt)
        }
        if (!cart) {
            Cookies.set('cart', '', {expires: 2772})
        }
        if (!lastSeen) {
            Cookies.set('last_seen', '', {expires: 2772})
        }
    }, [])

    useLayoutEffect(() => {
        desktopStore.setAnimation(true)
        document.body.classList.add('body-scroll-clip')
        setTimeout(() => {
            desktopStore.setAnimation(false)
        }, 2700)
        setTimeout(() => {
            document.body.classList.remove('body-scroll-clip')
        }, 2600)
    }, []);
    useEffect(() => {
        const referral = router.query.referral_id
        if (referral) {
            Cookies.set('referral_id', referral)
        }
    }, [])
    return (
        <Context.Provider value={sharedState}>
            {children}
        </Context.Provider>
    );
}