import NavbarC from "@/components/shared/NavbarC/NavbarC";
import {useContext, useEffect, useState} from "react";
import Footer from "@/components/shared/Footer/Footer";
import ScrollUp from "@/components/shared/ScrollUp/ScrollUp";
import Head from "next/head";
import Cookies from "js-cookie";
import CookieComponent from "@/components/shared/CookieComponent/CookieComponent";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import AnimationSellout from "@/components/shared/AnimationSellout/AnimationSellout";

const MainLayout = ({children}) => {
    const {desktopStore} = useContext(Context)

    const [cookieOpen, setCookieOpen] = useState(false)
    const closeCookie = () => {
        Cookies.set('cookie_message', true, {expires: 2772})
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
                <meta name="theme-color" content="#000000"/>
                <script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{
                        __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) {
                  return;
                }
              }
              k=e.createElement(t);
              a=e.getElementsByTagName(t)[0];
              k.async=1;
              k.src=r;
              a.parentNode.insertBefore(k,a);
            })
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(95264330, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `,
                    }}
                />
            </Head>
            <div className={'body'}>
                <NavbarC/>
                <div className={'cont_up'}>
                    {children}
                </div>
                <Footer/>
            </div>
            <ScrollUp/>
            <CookieComponent isOpen={cookieOpen} close={closeCookie}/>
            {desktopStore.animation && <AnimationSellout/>}
        </>
    );
};

export default observer(MainLayout);