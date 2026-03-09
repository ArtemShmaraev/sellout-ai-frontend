import React, {useContext, useEffect, useState} from 'react';
import styles from './PromoBannerProductsPageSocial.module.css'
import {desktopStore} from "@/store/DesktopStore";
import ModalSocialNets from "@/components/shared/ModalSocialNets/ModalSocialNets";

const PromoBannerProductsPageSocial = () => {
    function changeBrowserColor(color) {
        // Для Chrome, Firefox, Opera на Android
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', color);
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

    const [socialsOpen, setSocialsOpen] = useState(false);

    const toggleSocials = () => {
        setSocialsOpen((prev) => !prev);
        document.body.classList.add('body-scroll-clip')
    };

    const handleSocialsClose = () => {
        setSocialsOpen(false); // Закрытие модалки извне
        document.body.classList.remove('body-scroll-clip')
    };

    return (
        <>
            {desktopStore.isDesktop ?
                <div className={styles.socialCont}>
                    <div className={styles.social}>
                        <div className={styles.socialText} onClick={toggleSocials}>
                            Все розыгрыши, скидки, полезный контент, новости и многое другое в одном месте
                        </div>
                        <div className={styles.socialButton} onClick={toggleSocials}>
                            Подробнее
                        </div>
                    </div>
                </div>
                :
                <div className={styles.socialContMob}>
                    <div className={styles.socialTextMob} onClick={toggleSocials}>
                        Розыгрыши, скидки, полезный контент, новости и многое другое
                    </div>
                    <div className={styles.socialButtonMob} onClick={toggleSocials}>
                        Посмотреть
                    </div>
                </div>
            }
            <ModalSocialNets show={socialsOpen} onClose={handleSocialsClose}/>
        </>
    );
};

export default PromoBannerProductsPageSocial;