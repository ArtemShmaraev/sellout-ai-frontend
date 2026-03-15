import React, {forwardRef, useContext, useEffect, useState} from 'react';
import styles from './PromoBannerMainPageOffers.module.css'
import Image from 'next/image'
import {desktopStore} from "@/store/DesktopStore";
import aboutImg from "@/static/icons/promoBannerAboutImg.svg";
import guaranteeImg from "@/static/icons/promoBannerGuaranteeImg.svg";
import priceImg from "@/static/icons/priceImg.svg";
import allImg from "@/static/icons/allImg.svg";
import TextModalGuarantee from "@/components/shared/UI/TextModalGuarantee/TextModalGuarantee";
import HowWeWorkModal from "@/components/shared/HowWeWorkModal/HowWeWorkModal";
import ModalSocialNets from "@/components/shared/ModalSocialNets/ModalSocialNets";
import ModalRef from "@/components/shared/ModalRef/ModalRef";
import Cookies from "js-cookie";
import ModalGifts from "@/components/shared/ModalGifts/ModalGifts";

const PromoBannerMainPageOffers = forwardRef(({dataIndex="none"}, ref) => {
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

    const [socialsOpen, setSocialsOpen] = useState(false);

    const toggleSocials = () => {
        setSocialsOpen((prev) => !prev);
        document.body.classList.add('body-scroll-clip')
    };

    const handleSocialsClose = () => {
        setSocialsOpen(false); // Закрытие модалки извне
        document.body.classList.remove('body-scroll-clip')
    };

    const [refModalOpen, setRefModalOpen] = useState(false);

    const toggleRef = () => {
        setRefModalOpen((prev) => !prev);
        document.body.classList.add('body-scroll-clip')
    };

    const handleRefModalClose = () => {
        setRefModalOpen(false); // Закрытие модалки извне
        document.body.classList.remove('body-scroll-clip')
    };

    const [receivedWelcomeGift, setReceivedWelcomeGift] = useState('')

    useEffect(() => {
        setReceivedWelcomeGift(Cookies.get('receivedWelcomeGift'))
    }, [])

    const [giftsModalOpen, setGiftsModalOpen] = useState(false);

    const toggleGifts = () => {
        setGiftsModalOpen((prev) => !prev);
        document.body.classList.add('body-scroll-clip')
    };

    const handleGiftsModalClose = () => {
        setGiftsModalOpen(false); // Закрытие модалки извне
        document.body.classList.remove('body-scroll-clip')
    };

    return (
        <div data-index={dataIndex} ref={ref}>
            {desktopStore.isDesktop ?
                <div className={styles.aboutGuaranteeCont}>
                    {receivedWelcomeGift ? (
                        <div className={styles.aboutGuaranteeCont2}>
                            <div className={styles.price}>
                                <div className={styles.priceText} onClick={toggleRef}>
                                    До 7000₽ за приглашенного друга
                                </div>
                                <div className={styles.aboutButton} onClick={toggleRef}>
                                    Подробнее
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.aboutGuaranteeCont2}>
                            <div className={styles.about}>
                                <div className={styles.aboutText} onClick={toggleGifts}>
                                    До 5000₽ в подарок
                                </div>
                                <div className={styles.aboutButton} onClick={toggleGifts}>
                                    Получить
                                </div>
                            </div>
                            <div className={styles.guarantee}>
                                <div className={styles.aboutText} onClick={toggleRef}>
                                    До 7000₽ за приглашенного друга
                                </div>
                                <div className={styles.aboutButton} onClick={toggleRef}>
                                    Подробнее
                                </div>
                            </div>
                        </div>
                    )}


                    <div className={styles.aboutGuaranteeCont2}>
                        <div className={styles.price}>
                            <div className={styles.priceText} onClick={toggleSocials}>
                                Все розыгрыши, скидки, полезный контент, новости и многое другое в одном месте
                            </div>
                            <div className={styles.aboutButton} onClick={toggleSocials}>
                                Посмотреть
                            </div>
                        </div>
                    </div>

                    {!receivedWelcomeGift &&
                        <div className={styles.separator}>
                        </div>
                    }

                </div>
                :
                <div className={styles.aboutGuaranteeContMob}>
                    {receivedWelcomeGift ? (
                        <div className={styles.aboutGuaranteeCont2Mob}>
                            <div className={styles.priceMob}>
                                <div className={styles.priceTextMob} onClick={toggleRef}>
                                    До 7000₽ за приглашенного друга
                                </div>
                                <div className={styles.priceButtonMob} onClick={toggleRef}>
                                    Подробнее
                                </div>
                            </div>
                        </div>
                    ):(
                        <div className={styles.aboutGuaranteeCont2Mob}>
                            <div className={styles.aboutMob}>
                                <div className={styles.aboutTextMob} onClick={toggleGifts}>
                                    До 5000₽ в подарок к первому заказу
                                </div>
                                <div className={styles.aboutButtonMob} onClick={toggleGifts}>
                                    Получить
                                </div>
                            </div>
                            <div className={styles.guaranteeMob}>
                                <div className={styles.guaranteeTextMob} onClick={toggleRef}>
                                    До 7000₽ за приглашенного друга
                                </div>
                                <div className={styles.guaranteeButtonMob} onClick={toggleRef}>
                                    Подробнее
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={styles.aboutGuaranteeCont2Mob}>
                        <div className={styles.priceMob}>
                            <div className={styles.priceTextMob} onClick={toggleSocials}>
                                Розыгрыши, скидки, новости и многое другое
                            </div>
                            <div className={styles.priceButtonMob} onClick={toggleSocials}>
                                Посмотреть
                            </div>
                        </div>
                    </div>
                </div>
            }
            <HowWeWorkModal show={howOpen} onHide={closeHow}/>
            <ModalSocialNets show={socialsOpen} onClose={handleSocialsClose}/>
            <ModalRef show={refModalOpen} onClose={handleRefModalClose}/>
            <ModalGifts show={giftsModalOpen} onClose={handleGiftsModalClose}/>
        </div>
    );
});

export default PromoBannerMainPageOffers;