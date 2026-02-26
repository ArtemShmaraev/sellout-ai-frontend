import React, {useContext, useEffect, useState} from 'react';
import styles from './PromoBannerProductsPageRef.module.css'
import {desktopStore} from "@/store/DesktopStore";
import HowWeWorkModal from "@/components/shared/HowWeWorkModal/HowWeWorkModal";

const PromoBannerProductsPageRef = () => {
    const [howOpen, setHowOpen] = useState(false);

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

    const toggleHow = () => {
        setHowOpen(!howOpen);
        changeBrowserColor("#000000")
    };

    const closeHow = () => {
        setHowOpen(false);
        changeBrowserColor("#ffffff")
    };

    return (
        <>
            {desktopStore.isDesktop ?
                <div className={styles.refCont}>
                    <div className={styles.ref}>
                        <div className={styles.refText} onClick={toggleHow}>
                            До 7000₽ за приглашенного друга
                        </div>
                        <div className={styles.refButton} onClick={toggleHow}>
                            Получить
                        </div>
                    </div>
                </div>
                :
                <div className={styles.refContMob}>
                    <div className={styles.refTextMob} onClick={toggleHow}>
                        До 7000₽ за приглашенного друга
                    </div>
                    <div className={styles.refButtonMob} onClick={toggleHow}>
                        Получить
                    </div>
                </div>
            }
            <HowWeWorkModal show={howOpen} onHide={closeHow}/>
        </>
    );
};

export default PromoBannerProductsPageRef;