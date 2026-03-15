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
import {useRouter} from 'next/router';
import YandexMetrica from "@/components/shared/YandexMetrica/YandexMetrica"; // Assuming you're using Next.js
import logo_sq from "@/static/img/logo_sq.png"
import tempMenu from "@/static/img/Все меню.png"
import Image from 'next/image'
import {parse} from "cookie";
import PromoBanner from "@/components/shared/PromoBanner/PromoBanner";
// import BottomNav from "@/components/shared/BottomNav/BottomNav";

const MainLayout = ({children, footerData}) => {
    const {desktopStore} = useContext(Context)
    const router = useRouter();


    const [cookieOpen, setCookieOpen] = useState(false)
    const [promoOpen, setPromoOpen] = useState(false)
    const [selectedGender, setSelectedGender] = useState("")
    const [isAuth, setIsAuth] = useState(false)
    // const [headerCustom, setHeaderCustom] = useState(true)

    const closeCookie = () => {
        Cookies.set('cookie_message', true, {expires: 2772})
        setCookieOpen(false)
    }
    useEffect(() => {
        if (!Cookies.get('cookie_message')) {
            setCookieOpen(true)
        }
        if ((!Cookies.get('promo_message')) && (!Cookies.get('access_token'))){
            setPromoOpen(true)
        }
    }, [])

    const closePromo = () => {
        Cookies.set('promo_message', true, {expires: 2772})
        setPromoOpen(false)
    }
    // useEffect(() => {
    //     if (!Cookies.get('promo_message')) {
    //         setPromoOpen(true)
    //     }
    // }, [])


    useLayoutEffect(() => {
        // checkIsDesktop();
        if (Cookies.get('selected_gender')) {
            setSelectedGender(Cookies.get('selected_gender'))
        }
        if (Cookies.get('access_token')) {
            setIsAuth(true)
        }
        // setHeaderCustom(router.pathname !== '/' || selectedGender === "M" || selectedGender === "F")

    })

    const checkIsDesktop = () => {

        const width = window.innerWidth

        if (width <= 1200) {
            desktopStore.setIsDesktop(false)
        } else {
            desktopStore.setIsDesktop(true)
        }
    }


    useLayoutEffect(() => {

        window.addEventListener('resize', checkIsDesktop);
        checkIsDesktop();

        // Убираем обработчик события при размонтировании компонента
        return () => {
            window.removeEventListener('resize', checkIsDesktop);
        };

    }, [])

    const [canonicalUrl, setCanonicalUrl] = useState('');

    useEffect(() => {
        if (process.browser) {
            const url = window.location.href;
            setCanonicalUrl(url);
        }
    }, [router]);

    // Определяем цвет для каждого пути
    const themeColor = (() => {
        switch (router.pathname) {
            case '/':
                return '#E5EAE6'; // Главная страница
            default:
                return '#ffffff'; // Другие страницы
        }
    })();


    return (
        <>
            <Head>

                {/*<title>Sellout: онлайн-платформа брендовой одежды и обуви</title>*/}
                {/*<meta*/}
                {/*    name="description"*/}
                {/*    content="2 000 000+ лотов по лучшим ценам с гарантией оригинальности: от премиальных и лимитированных релизов до более доступных, но не менее желанных позиций"*/}
                {/*/>*/}


                <link rel="canonical" href={canonicalUrl}/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={canonicalUrl}/>
                <link rel={'icon'} type={'image/png'} sizes={"192x192"} href={'/favicon.png'}/>
                {/*<link rel={'icon'} type={'image/svg+xml'} sizes={"192x192"} href={'/favicon.svg'}/>*/}
                <link rel="apple-touch-icon" href="/favicon.jpg"/>
                <link rel={'manifest'} href={'/manifest.json'}/>

                {/*<meta name={'description'}*/}
                {/*      content={'Закажите одежду, обувь и аксессуары в интернет-магазине SELLOUT. Выгодные цены. Доставка по всей России. Бонусы к первому заказу.'}/>*/}
                <meta name="google-site-verification" content="-9Lz8B9UM4KuSBbpP5pxTwJW9Ha0ee2nQmpMUTXh75E"/>
                {/*<meta name="google-site-verification" content="-9Lz8B9UM4KuSBbpP5pxTwJW9Ha0ee2nQmpMUTXh75E" />*/}
                <meta name="yandex-verification" content="82500b5b5e72aa3a"/>
                <meta name="theme-color" content={themeColor}/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
                <meta name="mailru-verification" content="2d636d2d3b28c14a"/>



                {/*<script*/}
                {/*    type="text/javascript"*/}
                {/*    dangerouslySetInnerHTML={{__html: '(function ab(){ var request = new XMLHttpRequest(); request.open(\'GET\', "https://scripts.botfaqtor.ru/one/128285", false); request.send(); if(request.status == 200) eval(request.responseText); })();'}}*/}
                {/*/>*/}

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
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(95264330, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true,
        ecommerce:"dataLayer"
   });
          `,
                    }}
                />
            </Head>
            {(desktopStore.animation) && <AnimationSellout/>}
            <div className={'body'}>
                {(selectedGender === "M" || selectedGender === "F" || router.pathname !== '/') &&
                    <NavbarC/>
                    // <></>
                }
                <div className={`${router.pathname === '/' ? '' : desktopStore.isDesktop ? 'cont_up' : 'cont_up_mob'}`}>
                    {children}
                </div>
                <Footer textData={footerData}/>
            </div>
            <ScrollUp/>
            <CookieComponent isOpen={cookieOpen && router.pathname !== '/'} close={closeCookie}/>
            <YandexMetrica/>
        </>
    );
};

export default observer(MainLayout);

export const setSelectedGender = (gender) => {
};

MainLayout.defaultProps = {
    footerData: {title: "", description: ""} // Устанавливаем пустой объект по умолчанию, если footerData не передано
};