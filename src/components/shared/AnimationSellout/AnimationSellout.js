import React, {useEffect, useLayoutEffect} from 'react';
import s from './AnimationSellout.module.css'
import img from '@/static/img/logo_white.png'
import Image from "next/image";

const AnimationSellout = () => {
    function changeBrowserColor(color) {
        // Для Chrome, Firefox, Opera на Android
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (themeColorMeta) {
            setTimeout(() => {
                themeColorMeta.setAttribute('content', color);
            }, 100)
        }

        // Для Safari на iOS (к сожалению, не все цвета поддерживаются)
        const statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
        if (statusBarMeta) {
            // Изменение цвета status-bar на iOS
            statusBarMeta.setAttribute('content', 'black-translucent'); // ограниченные возможности
        }

        // Для Microsoft Edge
        const msNavbuttonMeta = document.querySelector('meta[name="msapplication-navbutton-color"]');
        if (msNavbuttonMeta) {
            msNavbuttonMeta.setAttribute('content', color);
        }
    }

    // setTimeout(() => {
    //     changeBrowserColor("#000000")
    // }, 1)

    useEffect(() => {
        changeBrowserColor("#000000")
    }, [])
    return (
        <div className={s.block}>
            <Image src={img} alt='' className={s.img} loading={"eager"}/>
        </div>
    );
};

export default AnimationSellout;