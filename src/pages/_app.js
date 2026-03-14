import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'
import AppWrapper from "@/context/AppWrapper";
import {useEffect, useRef} from 'react';
import {useRouter} from 'next/router';
import NProgress from 'nprogress'; // Импортируем библиотеку
import 'nprogress/nprogress.css';
import {desktopStore} from "@/store/DesktopStore";  // Импортируем стили NProgress

NProgress.configure({showSpinner: false, speed: 500, minimum: 0.17});

export default function App({Component, pageProps}) {
    const router = useRouter();

    useEffect(() => {
        const root = document.documentElement;

        if (!desktopStore.isDesktop) {
            // Мобильное устройство — всегда черный индикатор
            root.classList.remove('navbar-visible-desktop');
        } else {
            // Десктоп — проверка видимости хедера
            if (desktopStore.navbarVisible) {
                root.classList.add('navbar-visible-desktop'); // Белый индикатор
            } else {
                root.classList.remove('navbar-visible-desktop'); // Красный индикатор
            }
        }
    }, [desktopStore.isDesktop, desktopStore.navbarVisible]);

    useEffect(() => {
        const handleStart = () => NProgress.start(); // Начинаем индикатор
        const handleComplete = () => NProgress.done(); // Завершаем индикатор

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, [router]);

    useEffect(() => {
        const handlePopstate = () => {
            const url = window.location.pathname;
            const isMainPage = url === '/men' || url === '/women';

            if (isMainPage) {
                router.push(url); // Корректируем путь
            }
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, [router]);

    return (
        <AppWrapper>
            <Component {...pageProps} />
        </AppWrapper>
    )
}
