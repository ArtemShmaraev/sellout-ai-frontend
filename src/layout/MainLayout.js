import NavbarC from "@/components/shared/NavbarC/NavbarC";
import {useEffect, useState} from "react";
import Footer from "@/components/shared/Footer/Footer";
import ScrollUp from "@/components/shared/ScrollUp/ScrollUp";
import Head from "next/head";
import Cookies from "js-cookie";
import CookieComponent from "@/components/shared/CookieComponent/CookieComponent";

const MainLayout = ({children}) => {

    const [cookieOpen, setCookieOpen] = useState(false)
    const closeCookie = () => {
        Cookies.set('cookie_message', true)
        setCookieOpen(false)
    }
    useEffect(() => {
        if (!Cookies.get('cookie_message')) {
            setCookieOpen(true)
        }
    }, [])

    return (
        <>
            <Head>
                <meta name={'description'} content={'Купить кроссовки круто'}/>
            </Head>
            <NavbarC/>
            {children}
            <ScrollUp/>
            <CookieComponent isOpen={cookieOpen} close={closeCookie}/>
            <Footer/>
        </>
    );
};

export default MainLayout;