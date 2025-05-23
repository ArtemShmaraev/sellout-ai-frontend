import NavbarC from "@/components/shared/NavbarC/NavbarC";
import {useContext, useEffect, useState} from "react";
import Footer from "@/components/shared/Footer/Footer";
import ScrollUp from "@/components/shared/ScrollUp/ScrollUp";
import Head from "next/head";
import Cookies from "js-cookie";
import CookieComponent from "@/components/shared/CookieComponent/CookieComponent";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";

const MainLayout = ({children}) => {
    const {desktopStore} = useContext(Context)

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
    const checkIsDesktop = () => {
        const width = window.innerWidth
        if (width <= 1200) {
            desktopStore.setIsDesktop(false)
        } else {
            desktopStore.setIsDesktop(true)
        }
    }
    useEffect(() => {
        window.addEventListener("resize", checkIsDesktop);
        // Call handler right away so state gets updated with initial window size
        checkIsDesktop();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", checkIsDesktop);
    }, [])
    return (
        <>
            <Head>
                <meta name={'description'} content={'Купить кроссовки круто'}/>
            </Head>
            <NavbarC/>
            <div className={'cont_up'}>
                {children}
            </div>
            <ScrollUp/>
            <CookieComponent isOpen={cookieOpen} close={closeCookie}/>
            <Footer/>
        </>
    );
};

export default observer(MainLayout);