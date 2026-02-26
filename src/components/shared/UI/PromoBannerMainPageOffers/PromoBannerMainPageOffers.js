import React, {useContext, useEffect, useState} from 'react';
import styles from './PromoBannerMainPageOffers.module.css'
import Image from 'next/image'
import {desktopStore} from "@/store/DesktopStore";
import aboutImg from "@/static/icons/promoBannerAboutImg.svg";
import guaranteeImg from "@/static/icons/promoBannerGuaranteeImg.svg";
import priceImg from "@/static/icons/priceImg.svg";
import allImg from "@/static/icons/allImg.svg";
import TextModalGuarantee from "@/components/shared/UI/TextModalGuarantee/TextModalGuarantee";
import HowWeWorkModal from "@/components/shared/HowWeWorkModal/HowWeWorkModal";

const PromoBannerMainPageOffers = () => {
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
                <div className={styles.aboutGuaranteeCont}>
                    <div className={styles.aboutGuaranteeCont2}>
                        <div className={styles.about}>
                            <div className={styles.aboutText} onClick={toggleHow}>
                                До 5000₽ в подарок
                            </div>
                            <div className={styles.aboutButton} onClick={toggleHow}>
                                Получить
                            </div>
                        </div>
                        <div className={styles.guarantee}>
                            <div className={styles.aboutText} onClick={toggleHow}>
                                До 7000₽ за приглашенного друга
                            </div>
                            <div className={styles.aboutButton} onClick={toggleHow}>
                                Подробнее
                            </div>
                        </div>
                    </div>

                    <div className={styles.aboutGuaranteeCont2}>
                        <div className={styles.price}>
                            <div className={styles.priceText} onClick={toggleHow}>
                                Все розыгрыши, скидки, полезный контент, новости и многое другое в одном месте
                            </div>
                            <div className={styles.aboutButton} onClick={toggleHow}>
                                Посмотреть
                            </div>
                        </div>
                    </div>

                    <div className={styles.separator}>
                    </div>
                </div>
                :
                <div className={styles.aboutGuaranteeContMob}>
                    <div className={styles.aboutGuaranteeCont2Mob}>
                        <div className={styles.aboutMob}>
                            <div className={styles.aboutTextMob} onClick={toggleHow}>
                                До 5000₽ в подарок к первому заказу
                            </div>
                            <div className={styles.aboutButtonMob} onClick={toggleHow}>
                                Получить
                            </div>
                        </div>
                        <div className={styles.guaranteeMob}>
                            <div className={styles.guaranteeTextMob} onClick={toggleHow}>
                                До 7000₽ за приглашенного друга
                            </div>
                            <div className={styles.guaranteeButtonMob} onClick={toggleHow}>
                                Подробнее
                            </div>
                        </div>
                    </div>

                    <div className={styles.aboutGuaranteeCont2Mob}>
                        <div className={styles.priceMob}>
                            <div className={styles.priceTextMob} onClick={toggleHow}>
                                Розыгрыши, скидки, новости и многое другое
                            </div>
                            <div className={styles.priceButtonMob} onClick={toggleHow}>
                                Посмотреть
                            </div>
                        </div>
                    </div>
                </div>
            }
            <HowWeWorkModal show={howOpen} onHide={closeHow}/>
        </>
    );
};

export default PromoBannerMainPageOffers;