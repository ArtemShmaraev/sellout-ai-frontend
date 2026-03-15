import React, {useContext, useEffect, useState} from 'react';
import styles from './PromoBannerProductsPageAboutAndGuarantee.module.css'
import Image from 'next/image'
import {desktopStore} from "@/store/DesktopStore";
import aboutImg from "@/static/icons/promoBannerAboutImg.svg";
import guaranteeImg from "@/static/icons/promoBannerGuaranteeImg.svg";
import TextModalGuarantee from "@/components/shared/UI/TextModalGuarantee/TextModalGuarantee";
import HowWeWorkModal from "@/components/shared/HowWeWorkModal/HowWeWorkModal";

const PromoBannerProductsPageAboutAndGuarantee = () => {
    const [howOpen, setHowOpen] = useState(false);

    useEffect(() => {
        const container = document.querySelector(`.${styles.aboutGuaranteeCont}`);

        if (container) {
            const updateAvailableWidth = () => {
                const availableWidth = container.offsetWidth;
                document.documentElement.style.setProperty('--available-width', `${availableWidth}px`);
            };

            // Инициализация события resize
            window.addEventListener('resize', updateAvailableWidth);
            window.addEventListener('load', updateAvailableWidth);

            // Инициализация ResizeObserver
            const observer = new ResizeObserver(updateAvailableWidth);
            observer.observe(container);

            return () => {
                // Очистка
                window.removeEventListener('resize', updateAvailableWidth);
                window.removeEventListener('load', updateAvailableWidth);
                observer.disconnect();
            };
        }
    }, []);

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
                    <div className={styles.separator}>
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
                </div>
            }
            <HowWeWorkModal show={howOpen} onHide={closeHow}/>
        </>
    );
};

export default PromoBannerProductsPageAboutAndGuarantee;