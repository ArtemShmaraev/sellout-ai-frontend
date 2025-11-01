import NavbarC from "@/components/shared/NavbarC/NavbarC";
import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import Footer from "@/components/shared/Footer/Footer";
import ScrollUp from "@/components/shared/ScrollUp/ScrollUp";
import Head from "next/head";
import Cookies from "js-cookie";
import CookieComponent from "@/components/shared/CookieComponent/CookieComponent";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import AnimationSellout from "@/components/shared/AnimationSellout/AnimationSellout";
import NavbarNoGender from "@/components/shared/NavbarNoGender/NavbarNoGender";
import { useRouter } from 'next/router'; // Assuming you're using Next.js

const MainLayout = ({children}) => {
    const {desktopStore} = useContext(Context)
    const router = useRouter();

    const [cookieOpen, setCookieOpen] = useState(false)
    const [headerCustom, setHeaderCustom] = useState(true)
    const [selectedGender, setSelectedGender] = useState("")
    const closeCookie = () => {
        Cookies.set('cookie_message', true, {expires: 2772})
        setCookieOpen(false)
    }
    useEffect(() => {
        if (!Cookies.get('cookie_message')) {
            setCookieOpen(true)
        }

    }, [])

    // useEffect( () => {
    //     if (Cookies.get('selected_gender')) {
    //         setSelectedGender(Cookies.get('selected_gender'))
    //     }
    // })

    useLayoutEffect(() => {
        if (Cookies.get('selected_gender')) {
            setSelectedGender(Cookies.get('selected_gender'))
        }
        setHeaderCustom(selectedGender === 'M' || selectedGender === 'F' || router.pathname !== '/' )

    })
    const checkIsDesktop = () => {
        const width = window.innerWidth
        if (width <= 1200) {
            desktopStore.setIsDesktop(false)
        } else {
            desktopStore.setIsDesktop(true)
        }
    }

    // const selectedGender = "M";

    // Inside your component



    useLayoutEffect(() => {
        window.addEventListener("resize", checkIsDesktop);
        // Call handler right away so state gets updated with initial window size
        checkIsDesktop();
        // Remove event listener on cleanup
        // return () => window.removeEventListener("resize", checkIsDesktop);
    }, [])



    return (
        <>
            <Head>
                <link rel={'icon'} type={'image/png'} sizes={"192x192"} href={'/favicon.png'}/>
                {/*<link rel={'icon'} type={'image/svg+xml'} sizes={"192x192"} href={'/favicon.svg'}/>*/}
                <link rel="apple-touch-icon" href="/favicon.jpg"/>
                <link rel={'manifest'} href={'/manifest.json'}/>
                <meta name={'description'}
                      content={'Закажите одежду, обувь и аксессуары в интернет-магазине SELLOUT. Выгодные цены. Доставка по всей России. Бонусы к первому заказу.'}/>
                <meta name="google-site-verification" content="-9Lz8B9UM4KuSBbpP5pxTwJW9Ha0ee2nQmpMUTXh75E"/>
                {/*<meta name="google-site-verification" content="-9Lz8B9UM4KuSBbpP5pxTwJW9Ha0ee2nQmpMUTXh75E" />*/}
                <meta name="yandex-verification" content="82500b5b5e72aa3a"/>
                <meta name="theme-color" content="#000000"/>
                {/*<meta name="viewport" content="width=device-width, initial-scale=1.0"/>*/}
                <meta name="mailru-verification" content="2d636d2d3b28c14a"/>


                <script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{
                        __html: `
            var _tmr = window._tmr || (window._tmr = []);
            _tmr.push({id: "3470916", type: "pageView", start: (new Date()).getTime()});
            (function (d, w, id) {
                if (d.getElementById(id)) return;
                var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
                ts.src = "https://top-fwz1.mail.ru/js/code.js";
                var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
                if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
            })(document, window, "tmr-code");
        `,
                    }}
                />
                {/*<noscript>*/}
                {/*    <div>*/}
                {/*        <img src="https://top-fwz1.mail.ru/counter?id=3470916;js=na"*/}
                {/*             style={{position: 'absolute', left: '-9999px'}} alt="Top.Mail.Ru"/>*/}
                {/*    </div>*/}
                {/*</noscript>*/}


                {/*<meta name="google-site-verification" content="N9kK5FGqkUH2WCQCjRsNPhP-jyCRNa4oWTjkS_Ll_nc" />*/}
                <script
                    async
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
                {headerCustom ? (
                    <NavbarC/>
                ) : (
                    <NavbarNoGender/>
                )}
                {headerCustom ? (
                    <div className={'cont_up'}>
                        {children}
                    </div>
                ) : (
                    <div>
                        {children}
                    </div>
                )}
                <Footer/>
            </div>
            <ScrollUp/>
            <CookieComponent isOpen={cookieOpen} close={closeCookie}/>
            {(desktopStore.animation) && <AnimationSellout/>}
            <div style={{display: 'none'}}>Front-end by Mikhail Valuev</div>
        </>
    );
};

export default observer(MainLayout);
export const setSelectedGender = (gender) => {
};