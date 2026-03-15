import React, {forwardRef, useContext, useEffect, useState} from 'react';
import styles from './PromoBannerMainPageAbout.module.css'
import Image from 'next/image'
import {desktopStore} from "@/store/DesktopStore";
import aboutImg from "@/static/icons/promoBannerAboutImg.svg";
import guaranteeImg from "@/static/icons/promoBannerGuaranteeImg.svg";
import priceImg from "@/static/icons/priceImg.svg";
import allImg from "@/static/icons/allImg.svg";
import TextModalGuarantee from "@/components/shared/UI/TextModalGuarantee/TextModalGuarantee";
import HowWeWorkModal from "@/components/shared/HowWeWorkModal/HowWeWorkModal";
import OfferBetterPriceModal from "@/components/shared/OfferBetterPriceModal/OfferBetterPriceModal";
import BuyoutModal from "@/components/shared/BuyoutModal/BuyoutModal";
import ModalSocialNets from "@/components/shared/ModalSocialNets/ModalSocialNets";

const PromoBannerMainPageAbout = forwardRef(({dataIndex="none"}, ref) => {
    const [howOpen, setHowOpen] = useState(false);
    const [offerOpen, setOfferOpen] = useState(false);
    const [deliverAnythingOpen, setDeliverAnythingOpen] = useState(false);

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

    const toggleOffer = () => {
        setOfferOpen(!offerOpen);
    };

    const closeOffer = () => {
        setOfferOpen(false);
    };

    const toggleDeliver = () => {
        setDeliverAnythingOpen(!deliverAnythingOpen);
    };

    const closeDeliver = () => {
        setDeliverAnythingOpen(false);
    };

    return (
        <div data-index={dataIndex} ref={ref}>
            {desktopStore.isDesktop ?
                <div className={styles.aboutGuaranteeCont}>
                    <div className={styles.aboutGuaranteeCont2}>
                        <div className={styles.about}>
                            <div className={styles.aboutImg}>
                                <Image
                                    src={aboutImg}
                                    alt="aboutImg"
                                    width={34}
                                    height={34}
                                />
                            </div>
                            <div className={styles.aboutText} onClick={toggleHow}>
                                2'000'000+ лотов и выгоднейшие цены: на 30-70% ниже всех в РФ
                            </div>
                            <div className={styles.aboutButton} onClick={toggleHow}>
                                О нас
                            </div>
                        </div>
                        <div className={styles.guarantee}>
                            <div className={styles.guaranteeImg}>
                                <Image
                                    src={guaranteeImg}
                                    alt="guaranteeImg"
                                    width={32}
                                    height={36}
                                />
                            </div>
                            <TextModalGuarantee titleClassname={styles.guaranteeText}
                                                title={'Гарантии оригинальности и качества'}></TextModalGuarantee>
                            <TextModalGuarantee titleClassname={styles.guaranteeButton}
                                                title={'Посмотреть отзывы'}></TextModalGuarantee>
                        </div>
                    </div>

                    <div className={styles.aboutGuaranteeCont2}>
                        <div className={styles.price}>
                            <div className={styles.aboutImg}>
                                <Image
                                    src={priceImg}
                                    alt="priceImg"
                                    width={34}
                                    height={34}
                                />
                            </div>
                            <div className={styles.priceText} onClick={toggleOffer}>
                                Предложим цену выгоднее, если найдете где-то дешевле
                            </div>
                            <div className={styles.aboutButton} onClick={toggleOffer}>
                                Подробнее
                            </div>
                        </div>
                        <div className={styles.all}>
                            <div className={styles.aboutImg}>
                                <Image
                                    src={allImg}
                                    alt="allImg"
                                    width={34}
                                    height={34}
                                />
                            </div>
                            <div className={styles.allText} onClick={toggleDeliver}>
                                Привезем любой ваш желанный товар по лучшей цене
                            </div>
                            <div className={styles.aboutButton} onClick={toggleDeliver}>
                                Подробнее
                            </div>
                        </div>
                    </div>

                    <div className={styles.separator}>
                    </div>
                </div>
                :
                <div className={styles.aboutGuaranteeContMob}>
                    <div className={styles.aboutMob}>
                        <div className={styles.aboutImgMob}>
                            <Image
                                src={aboutImg}
                                alt="aboutImg"
                                width={34}
                                height={34}
                            />
                        </div>
                        <div className={styles.aboutTextMob} onClick={toggleHow}>
                            2'000'000+ лотов и выгоднейшие цены: на 30-70% ниже всех в РФ
                        </div>
                        <div className={styles.aboutButtonMob} onClick={toggleHow}>
                            О нас
                        </div>
                    </div>
                    <div className={styles.guaranteeMob}>
                        <div className={styles.guaranteeImgMob}>
                            <Image
                                src={guaranteeImg}
                                alt="guaranteeImg"
                                width={32}
                                height={36}
                            />
                        </div>
                        <TextModalGuarantee titleClassname={styles.guaranteeTextMob}
                                            title={'Гарантии оригинальности'}></TextModalGuarantee>
                        <TextModalGuarantee titleClassname={styles.guaranteeButtonMob}
                                            title={'Отзывы'}></TextModalGuarantee>
                    </div>
                    <div className={styles.aboutMob}>
                        <div className={styles.aboutImgMob}>
                            <Image
                                src={priceImg}
                                alt="priceImg"
                                width={34}
                                height={34}
                            />
                        </div>
                        <div className={styles.aboutTextMob} onClick={toggleOffer}>
                            Предложим цену выгоднее, если найдете где-то дешевле
                        </div>
                        <div className={styles.aboutButtonMob} onClick={toggleOffer}>
                            Подробнее
                        </div>
                    </div>
                    <div className={styles.guaranteeMob}>
                        <div className={styles.aboutImgMob}>
                            <Image
                                src={allImg}
                                alt="allImg"
                                width={34}
                                height={34}
                            />
                        </div>
                        <div className={styles.aboutTextMob} onClick={toggleDeliver}>
                            Привезем любой желанный товар
                        </div>
                        <div className={styles.aboutButtonMob} onClick={toggleDeliver}>
                            Подробнее
                        </div>
                    </div>
                </div>
            }
            <HowWeWorkModal show={howOpen} onHide={closeHow}/>
            <OfferBetterPriceModal show={offerOpen} onHide={closeOffer}/>
            <BuyoutModal show={deliverAnythingOpen} handleClose={closeDeliver}/>
        </div>
    );
});

export default PromoBannerMainPageAbout;