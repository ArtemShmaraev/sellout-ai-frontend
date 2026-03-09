import React, {useContext, useEffect, useState} from 'react';
import styles from './PromoBannerProductsPageRef.module.css'
import {desktopStore} from "@/store/DesktopStore";
import ModalRef from "@/components/shared/ModalRef/ModalRef";

const PromoBannerProductsPageRef = () => {
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

    const [refModalOpen, setRefModalOpen] = useState(false);

    const toggleRef = () => {
        setRefModalOpen((prev) => !prev);
        document.body.classList.add('body-scroll-clip')
    };

    const handleRefModalClose = () => {
        setRefModalOpen(false); // Закрытие модалки извне
        document.body.classList.remove('body-scroll-clip')
    };

    return (
        <>
            {desktopStore.isDesktop ?
                <div className={styles.refCont}>
                    <div className={styles.ref}>
                        <div className={styles.refText} onClick={toggleRef}>
                            До 7000₽ за приглашенного друга
                        </div>
                        <div className={styles.refButton} onClick={toggleRef}>
                            Получить
                        </div>
                    </div>
                </div>
                :
                <div className={styles.refContMob}>
                    <div className={styles.refTextMob} onClick={toggleRef}>
                        До 7000₽ за приглашенного друга
                    </div>
                    <div className={styles.refButtonMob} onClick={toggleRef}>
                        Получить
                    </div>
                </div>
            }
            <ModalRef show={refModalOpen} onClose={handleRefModalClose}/>
        </>
    );
};

export default PromoBannerProductsPageRef;