import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogBrandsMobileWomen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import logo from "@/static/img/sellout_logo.svg";
import backLogo from "@/static/icons/chevron-left.svg";
import cross from '@/static/icons/x-lg.svg'
import more from "@/static/img/sellout_logo.svg";


const CatalogBrandsMobileWomen = () => {
    const linksBrands = [
        'https://sellout.su/brand1', 'https://sellout.su/brand2', 'https://sellout.su/brand3',
        'https://sellout.su/brand4', 'https://sellout.su/brand5', 'https://sellout.su/brand6',
        'https://sellout.su/brand7', 'https://sellout.su/brand8', 'https://sellout.su/brand9',
        'https://sellout.su/brand10', 'https://sellout.su/brand11', 'https://sellout.su/brand12',
        'https://sellout.su/brand13', 'https://sellout.su/brand14', 'https://sellout.su/brand15',
        'https://sellout.su/brand16', 'https://sellout.su/brand17', 'https://sellout.su/brand18',
        'https://sellout.su/brand19', 'https://sellout.su/brand20', 'https://sellout.su/brand21',
        'https://sellout.su/brand22', 'https://sellout.su/brand23', 'https://sellout.su/brand24',
        'https://sellout.su/brand25', 'https://sellout.su/brand26', 'https://sellout.su/brand27',
        'https://sellout.su/brand28'
    ];

    const textsBrands = [
        '1000 лотов', '2000 лотов', '3000 лотов', '4000 лотов', '5000 лотов',
        '6000 лотов', '7000 лотов', '8000 лотов', '9000 лотов', '10000 лотов',
        '11000 лотов', '12000 лотов', '13000 лотов', '14000 лотов', '15000 лотов',
        '16000 лотов', '17000 лотов', '18000 лотов', '19000 лотов', '20000 лотов',
        '21000 лотов', '22000 лотов', '23000 лотов', '24000 лотов', '25000 лотов',
        '26000 лотов', '27000 лотов', '28000 лотов'
    ];

    const textsLines = [
        'adidas Samba', 'adidas Gazelle', 'adidas Campus', 'adidas Spezial','adidas Forum', 'Air Jordan 1 Low', 'Air Jordan 1 Mid', 'Air Jordan 1 High','New Balance 530', 'New Balance 550', 'NB 990', 'NB 1906R','adidas SL', 'Run Star', 'adidas Falcon', 'Stan Smith','Air Jordan 4', 'Air Jordan 3', 'New Balance 327', 'adidas Superstar','Nike Air Max 720', 'Nike Air Max 95', 'New Balance 993', 'Yeezy 700','Nike Dunk', 'Nike Air Force 1', 'Nike Zoom', 'Nike Cortez','Nike V2K', 'Nike Blazer', 'Nike Air Max 1', 'Nike Air Max 90','Converse', 'Vans Knu', 'NB 2002R', 'NB 9060','Foam Runner', 'Nike M2K', 'Yeezy 350', 'adidas NMD','Yeezy Slide', 'adidas Adilette', 'New Balance 574', 'Human Race','Nike Air Max 97', 'adidas Rivalry', 'Yeezy 380', 'Nike VaporMax'
    ];

    return (
        <div>
            <div className={styles.header}>
                {/* Первая часть: Логотип и крестик */}
                <div className={styles.headerTop}>
                    <div className={styles.logoContainer}>
                        <Image src={logo} alt="Logo" className={styles.logo} width={120} height={50}/>
                    </div>
                    <div className={styles.closeButton}>
                        <Image src={cross} alt="Back" className={styles.backArrow} width={24}
                               height={24}/>
                    </div>
                </div>

                {/* Вторая часть: Стрелка назад и текст */}
                <div className={styles.headerBottom}>
                    <div className={styles.backArrowContainer}>
                        <Image src={backLogo} alt="Back" className={styles.backArrow} width={24}
                               height={24}/>
                    </div>
                    <div className={styles.headerTitle}>
                        БРЕНДЫ
                    </div>
                </div>
            </div>
            <div className={styles.catalogContainer}>
                {/* Popular Brands */}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsTitle}>ПОПУЛЯРНЫЕ БРЕНДЫ</div>
                    <div className={styles.brandsGrid}>
                        {Array.from({length: 63}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Mobile/Women/MainPage/PopularBrands/${idx + 1}.png?v=${Date.now()}`}
                                        alt="Brand Image"
                                        className={styles.circleImage}
                                        width={700}
                                        height={700}
                                        layout="responsive"
                                        quality={100}
                                    />
                                </div>
                                <div className={styles.circleText}>{textsBrands[idx]}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Categories */}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsTitle}>ПОПУЛЯРНЫЕ ЛИНЕЙКИ</div>
                    <div className={styles.brandsGridCont}>
                        <div className={styles.brandsGrid2}>
                            {Array.from({length: 48}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle}>
                                        <Image
                                            src={`/Images New Frontend/Mobile/Women/Menu/PopularLines/${idx + 1}.png?v=${Date.now()}`}
                                            alt="Brand Image"
                                            className={styles.circleImage}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                    <div className={styles.circleText}>{textsLines[idx]}</div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.moreLines}>
                            <div>
                                <Image
                                    src={more} // Путь к изображению лупы
                                    alt="Search Icon"
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={styles.moreLinesText}>
                                Все 100+ линеек
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.centerButton}>Посмотреть все бренды</div>
            </div>
        </div>

    );
};

export default observer(CatalogBrandsMobileWomen);