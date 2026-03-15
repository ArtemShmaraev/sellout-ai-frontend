import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogShoesMobileMen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import logo from "@/static/img/sellout_logo.svg";
import backLogo from "@/static/icons/chevron-left.svg";
import cross from '@/static/icons/x-lg.svg'
import Cookies from "js-cookie";
import Link from "next/link";


const CatalogShoesMobile = ({handleClose, handleOpenSection}) => {
    const linksBrandsM = ['/products?line=nike&category=shoes_category',
        '/products?line=jordan&category=shoes_category',
        '/products?line=vans&category=shoes_category',
        '/products?line=li-ning&category=shoes_category',
        '/products?line=off-white&category=shoes_category',
        '/products?line=maison_margiela&category=shoes_category',
        '/products?line=asics&category=shoes_category',
        '/products?line=converse&category=shoes_category',
        '/products?line=balenciaga&category=shoes_category',
        '/products?line=lanvin&category=shoes_category',
        '/products?line=bottega_veneta&category=shoes_category',
        '/products?line=valentino&category=shoes_category',
        '/products?line=timberland&category=shoes_category',
        '/products?line=dr.martens&category=shoes_category',
        '/products?line=adidas&category=shoes_category',
        '/products?line=new_balance&category=shoes_category',
        '/products?line=puma&category=shoes_category',
        '/products?line=under_armour&category=shoes_category',
        '/products?line=alexander_mcqueen&category=shoes_category',
        '/products?line=vetements&category=shoes_category',
        '/products?line=reebok&category=shoes_category',
        '/products?line=anta&category=shoes_category',
        '/products?line=dior&category=shoes_category',
        '/products?line=louis_vuitton&category=shoes_category',
        '/products?line=a_bathing_ape®&category=shoes_category',
        '/products?line=gucci&category=shoes_category',
        '/products?line=prada&category=shoes_category',
        '/products?line=loro_piana&category=shoes_category'];

    const linksBrandsW = ['/products?line=nike&category=shoes_category',
        '/products?line=jordan&category=shoes_category',
        '/products?line=maison_margiela&category=shoes_category',
        '/products?line=converse&category=shoes_category',
        '/products?line=chanel&category=shoes_category',
        '/products?line=vetements&category=shoes_category',
        '/products?line=off-white&category=shoes_category',
        '/products?line=balenciaga&category=shoes_category',
        '/products?line=puma&category=shoes_category',
        '/products?line=louis_vuitton&category=shoes_category',
        '/products?line=burberry&category=shoes_category',
        '/products?line=ferragamo&category=shoes_category',
        '/products?line=li-ning&category=shoes_category',
        '/products?line=reebok&category=shoes_category',
        '/products?line=adidas&category=shoes_category',
        '/products?line=new_balance&category=shoes_category',
        '/products?line=jimmy_choo&category=shoes_category',
        '/products?line=loewe&category=shoes_category',
        '/products?line=loro_piana&category=shoes_category',
        '/products?line=dior&category=shoes_category',
        '/products?line=mlb&category=shoes_category',
        '/products?line=prada&category=shoes_category',
        '/products?line=vans&category=shoes_category',
        '/products?line=lanvin&category=shoes_category',
        '/products?line=hermes&category=shoes_category',
        '/products?line=a_bathing_ape®&category=shoes_category',
        '/products?line=under_armour&category=shoes_category',
        '/products?line=balmain&category=shoes_category',
        '/products?line=miu_miu&category=shoes_category',
        '/products?line=timberland&category=shoes_category',
        '/products?line=manolo_blahnik&category=shoes_category',
        '/products?line=alexander_mcqueen&category=shoes_category',
        '/products?line=gucci&category=shoes_category',
        '/products?line=diesel&category=shoes_category',
        '/products?line=dr.martens&category=shoes_category',
        '/products?line=bottega_veneta&category=shoes_category',
        '/products?line=asics&category=shoes_category',
        '/products?line=versace&category=shoes_category',
        '/products?line=valentino&category=shoes_category',
        '/products?line=anta&category=shoes_category',
        '/products?line=fendi&category=shoes_category',
        '/products?line=celine&category=shoes_category'];

    const amountsBrandsM = [
        "34'200 лотов",
        "6'000 лотов",
        "7'200 лотов",
        "900 лотов",
        "3'300 лотов",
        "3'000 лотов",
        "11'700 лотов",
        "4'800 лотов",
        "3'900 лотов",
        "1'200 лотов",
        "3'900 лотов",
        "4'800 лотов",
        "2'400 лотов",
        "2'100 лотов",
        "27'000 лотов",
        "9'300 лотов",
        "9'600 лотов",
        "1'800 лотов",
        "3'600 лотов",
        "900 лотов",
        "3'900 лотов",
        "900 лотов",
        "2'400 лотов",
        "2'100 лотов",
        "900 лотов",
        "4'500 лотов",
        "2'700 лотов",
        "1'400 лотов"
    ];

    const amountsBrandsW = [
        "34'200 лотов",
        "6'000 лотов",
        "3'000 лотов",
        "4'800 лотов",
        "1'500 лотов",
        "1'200 лотов",
        "3'300 лотов",
        "3'900 лотов",
        "9'600 лотов",
        "2'100 лотов",
        "2'100 лотов",
        "2'700 лотов",
        "900 лотов",
        "3'900 лотов",
        "27'000 лотов",
        "9'300 лотов",
        "900 лотов",
        "1'200 лотов",
        "1'200 лотов",
        "2'400 лотов",
        "1'200 лотов",
        "2'700 лотов",
        "7'200 лотов",
        "1'200 лотов",
        "1'300 лотов",
        "1'300 лотов",
        "1'800 лотов",
        "1'200 лотов",
        "900 лотов",
        "2'400 лотов",
        "900 лотов",
        "3'600 лотов",
        "4'500 лотов",
        "1'500 лотов",
        "2'100 лотов",
        "3'900 лотов",
        "11'700 лотов",
        "2'100 лотов",
        "4'800 лотов",
        "900 лотов",
        "1'800 лотов",
        "1'200 лотов"
    ];

    const linksCategoriesM = [
        "/products?category=sneakers",
        "/products?category=loafers",
        "/products?category=slippers",
        "/products?category=slip_ons",
        "/products?category=moccasins_and_topsiders",
        "/products?category=espadrilles",
        "/products?category=winter_sneakers",
        "/products?category=shoes",
        "/products?category=mules_and_clogs",
        "/products?category=sandals",
        "/products?category=beach_sandals",
        "/products?category=boots",
        "/products?category=martins",
        "/products?category=timberlands",
        "/products?category=chelsea_boots"
    ];

    const linksCategoriesW = [
        "/products?category=sneakers",
        "/products?category=loafers",
        "/products?category=slippers",
        "/products?category=slip_ons",
        "/products?category=moccasins_and_topsiders",
        "/products?category=espadrilles",
        "/products?category=winter_sneakers",
        "/products?category=shoes",
        "/products?category=mules_and_clogs",
        "/products?category=sandals",
        "/products?category=beach_sandals",
        "/products?category=boots",
        "/products?category=thick-soled_shoes",
        "/products?category=high_boots_and_jackboots",
        "/products?category=short_boots_and_ankle_boots",
        "/products?category=medium_boots",
        "/products?category=martins",
        "/products?category=timberlands",
        "/products?category=chelsea_boots",
        "/products?category=shoes",
        "/products?category=high_heels",
        "/products?category=medium_heels",
        "/products?category=low_heels"
    ];

    const selectedGender = Cookies.get('selected_gender')

    return (
        <div>
            {/*<div className={styles.header}>*/}
            {/*    /!* Первая часть: Логотип и крестик *!/*/}
            {/*    <div className={styles.headerTop}>*/}
            {/*        <div className={styles.logoContainer}>*/}
            {/*            <Image src={logo} alt="Logo" className={styles.logo} width={120} height={50}/>*/}
            {/*        </div>*/}
            {/*        <div className={styles.closeButton}>*/}
            {/*            <Image src={cross} alt="Back" className={styles.backArrow} width={24}*/}
            {/*                   height={24}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    /!* Вторая часть: Стрелка назад и текст *!/*/}
            {/*    <div className={styles.headerBottom}>*/}
            {/*        <div className={styles.backArrowContainer}>*/}
            {/*            <Image src={backLogo} alt="Back" className={styles.backArrow} width={24}*/}
            {/*                   height={24}/>*/}
            {/*        </div>*/}
            {/*        <div className={styles.headerTitle}>*/}
            {/*            ОБУВЬ*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={styles.catalogContainer}>
                {/* Popular Brands */}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsTitle}>ПОПУЛЯРНЫЕ БРЕНДЫ</div>
                    <div className={styles.brandsGrid}
                         style={{
                             gridTemplateColumns: `repeat(${selectedGender === "M" ? 14 : 14}, 97px`,
                             gridTemplateRows: `repeat(${selectedGender === "M" ? 2 : 3}, auto`
                         }}>
                        {Array.from({length: selectedGender === "M" ? 28 : 42}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Link
                                        href={selectedGender === "M" ? linksBrandsM[idx] : linksBrandsW[idx]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Products/Shoes/Brands/${idx + 1}.png`}
                                            alt="Brand Image"
                                            className={styles.circleImage}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </Link>
                                </div>
                                <div
                                    className={styles.circleText}>{selectedGender === "M" ? amountsBrandsM[idx] : amountsBrandsW[idx]}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Categories */}
                <div className={styles.categoriesSection}>
                    <div className={styles.categoriesTitle}>КАТЕГОРИИ</div>
                    <div className={styles.categoriesGrid}>
                        {['Кроссовки', 'Лоферы', 'Шлёпки'].map((category, idx) => (
                            <>
                                {idx !== 0 ? (
                                    <Link
                                        href={selectedGender === "M" ? linksCategoriesM[idx] : linksCategoriesW[idx]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Products/Shoes/Categories/${idx + 1}.png`}
                                                alt={category}
                                                width={700}
                                                height={700}
                                                className={styles.categoryImage}
                                            />
                                            <div className={styles.categoryText}>
                                                {category}
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div key={idx} className={styles.categoryItem} onClick={() => handleOpenSection("sneakers")}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Products/Shoes/Categories/${idx + 1}.png`}
                                            alt={category}
                                            width={700}
                                            height={700}
                                            className={styles.categoryImage}
                                        />
                                        <div className={styles.categoryText}>
                                            {category}
                                        </div>
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                    {selectedGender === "M" &&
                        <div className={styles.categoriesGrid4}>
                            {['Слипоны', 'Мокасины', 'Эспадрильи', 'Зимние кросс..', 'Туфли', 'Мюли', 'Сандалии', 'Пляжные санд..', 'Все ботинки', 'Мартинсы', 'Тимберленды', 'Челси'].map((category, idx) => (
                                <Link
                                    href={selectedGender === "M" ? linksCategoriesM[idx + 3] : linksCategoriesW[idx]}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <div key={idx} className={styles.categoryItem4}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Shoes/Categories/${idx + 4}.png`}
                                            alt={category}
                                            width={700}
                                            height={700}
                                            className={styles.categoryImage4}
                                        />
                                        <div className={styles.categoryText4}>
                                            {category}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    }
                    {selectedGender === "F" &&
                        <>
                            <div className={styles.categoriesGrid4}>
                                {['Слипоны', 'Мокасины', 'Эспадрильи', 'Зимние кросс..', 'Туфли', 'Мюли', 'Босоножки', 'Пляжные санд..'].map((category, idx) => (
                                    <Link
                                        href={linksCategoriesW[idx + 3]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem4}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Shoes/Categories/${idx + 1 + 3}.png`}
                                                alt={category}
                                                width={700}
                                                height={700}
                                                className={styles.categoryImage4}
                                            />
                                            <div className={styles.categoryText4}>
                                                {category}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className={styles.categoriesGrid4}>
                                {['Все ботинки', 'Толстая подо..', 'Ботфорты', 'Ботильоны', 'Средние', 'Мартинсы', 'Тимберленды', 'Челси'].map((category, idx) => (
                                    <Link
                                        href={linksCategoriesW[idx + 11]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem4}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Shoes/Categories/${idx + 1 + 11}.png`}
                                                alt={category}
                                                width={700}
                                                height={700}
                                                className={styles.categoryImage4}
                                            />
                                            <div className={styles.categoryText4}>
                                                {category}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className={styles.categoriesGrid4}>
                                {['Все туфли', 'Высокие', 'Средние', 'Низкие'].map((category, idx) => (
                                    <Link
                                        href={linksCategoriesW[idx + 19]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem4}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Shoes/Categories/${idx + 1 + 19}.png`}
                                                alt={category}
                                                width={700}
                                                height={700}
                                                className={styles.categoryImage4}
                                            />
                                            <div className={styles.categoryText4}>
                                                {category}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    }

                </div>

                <div className={styles.centerButton}>
                    <Link
                        href={'/products?category=shoes_category'}
                        onClick={handleClose}
                        style={{textDecoration: 'none'}}
                    >
                        Посмотреть всю обувь
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default observer(CatalogShoesMobile);