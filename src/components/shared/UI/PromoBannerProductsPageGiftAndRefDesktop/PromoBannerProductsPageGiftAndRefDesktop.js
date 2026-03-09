import React, {useContext, useEffect, useState} from 'react';
import styles from './PromoBannerProductsPageGiftAndRefDesktop.module.css'
import Image from 'next/image'
import {desktopStore} from "@/store/DesktopStore";
import aboutImg from "@/static/icons/promoBannerAboutImg.svg";
import guaranteeImg from "@/static/icons/promoBannerGuaranteeImg.svg";
import TextModalGuarantee from "@/components/shared/UI/TextModalGuarantee/TextModalGuarantee";
import HowWeWorkModal from "@/components/shared/HowWeWorkModal/HowWeWorkModal";
import ModalRef from "@/components/shared/ModalRef/ModalRef";


const PromoBannerProductsPageGiftAndRefDesktop = () => {
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

    const [refModalOpen, setRefModalOpen] = useState(false);

    const toggleRef = () => {
        setRefModalOpen((prev) => !prev);
        document.body.classList.add('body-scroll-clip')
    };

    const handleRefModalOpen = () => {
        setRefModalOpen(false); // Закрытие модалки извне
        document.body.classList.remove('body-scroll-clip')
    };

    return (
        <>
            {desktopStore.isDesktop ?
                <div className={styles.giftRefCont}>
                    <div className={styles.gift}>
                        <div className={styles.giftText} onClick={toggleHow}>
                            До 5000₽ в подарок
                        </div>
                        <div className={styles.giftButton} onClick={toggleHow}>
                            Получить
                        </div>
                    </div>
                    <div className={styles.separator}>
                    </div>
                    <div className={styles.ref}>
                        <div className={styles.refText} onClick={toggleRef}>
                            До 7000₽ за приглашенного друга
                        </div>
                        <div className={styles.refButton} onClick={toggleRef}>
                            Подробнее
                        </div>
                    </div>
                </div>
                :
                <></>
            }
            <HowWeWorkModal show={howOpen} onHide={closeHow}/>
            <ModalRef show={refModalOpen} onClose={handleRefModalOpen}/>
        </>
    );
};

export default PromoBannerProductsPageGiftAndRefDesktop;