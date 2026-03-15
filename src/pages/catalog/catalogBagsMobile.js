import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogBagsMobileMen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import logo from "@/static/img/sellout_logo.svg";
import backLogo from "@/static/icons/chevron-left.svg";
import cross from '@/static/icons/x-lg.svg'
import Link from "next/link";
import Cookies from "js-cookie";

const CatalogBagsMobile = ({handleClose}) => {
    const linksBrandsM = ['/products?line=balenciaga&category=bags',
        '/products?line=carhartt&category=bags',
        '/products?line=michael_kors&category=bags',
        '/products?line=coach&category=bags',
        '/products?line=gucci&category=bags',
        '/products?line=nike&category=bags',
        '/products?line=jordan&category=bags',
        '/products?line=vans&category=bags',
        '/products?line=a_bathing_ape®&category=bags',
        '/products?line=burberry&category=bags',
        '/products?line=vetements&category=bags',
        '/products?line=loewe&category=bags',
        '/products?line=heron_preston&category=bags',
        '/products?line=armani&category=bags',
        '/products?line=marc_jacobs&category=bags',
        '/products?line=fjallraven&category=bags',
        '/products?line=champion&category=bags',
        '/products?line=palace&category=bags',
        '/products?line=prada&category=bags',
        '/products?line=stüssy&category=bags',
        '/products?line=bally&category=bags',
        '/products?line=louis_vuitton&category=bags',
        '/products?line=dior&category=bags',
        '/products?line=adidas&category=bags',
        '/products?line=new_balance&category=bags',
        '/products?line=off-white&category=bags',
        '/products?line=dickies&category=bags',
        '/products?line=alexander_mcqueen&category=bags',
        '/products?line=calvin_klein&category=bags',
        '/products?line=cav_empt&category=bags',
        '/products?line=palm_angels&category=bags',
        '/products?line=hugo_boss&category=bags',
        '/products?line=versace&category=bags',
        '/products?line=diesel&category=bags',
        '/products?line=balmain&category=bags',
        '/products?line=stone_island&category=bags',
        '/products?line=goyard&category=bags',
        '/products?line=supreme&category=bags',
        '/products?line=guess&category=bags',
        '/products?line=hermes&category=bags',
        '/products?line=bottega_veneta&category=bags',
        '/products?line=puma&category=bags',
        '/products?line=converse&category=bags',
        '/products?line=under_armour&category=bags',
        '/products?line=longchamp&category=bags',
        '/products?line=maison_margiela&category=bags',
        '/products?line=the_north_face&category=bags',
        '/products?line=drew_house&category=bags',
        '/products?line=comme_des_garçons&category=bags',
        '/products?line=mlb&category=bags',
        '/products?line=fendi&category=bags',
        '/products?line=a.p.c.&category=bags',
        '/products?line=ferragamo&category=bags',
        '/products?line=moncler&category=bags'];

    const linksBrandsW = ['/products?line=dior&category=bags',
        '/products?line=jw_anderson&category=bags',
        '/products?line=bottega_veneta&category=bags',
        '/products?line=chanel&category=bags',
        '/products?line=louis_vuitton&category=bags',
        '/products?line=gucci&category=bags',
        '/products?line=michael_kors&category=bags',
        '/products?line=hermes&category=bags',
        '/products?line=fendi&category=bags',
        '/products?line=dickies&category=bags',
        '/products?line=carhartt&category=bags',
        '/products?line=nike&category=bags',
        '/products?line=jordan&category=bags',
        '/products?line=vans&category=bags',
        '/products?line=tory_burch&category=bags',
        '/products?line=manu_atelier&category=bags',
        '/products?line=burberry&category=bags',
        '/products?line=vetements&category=bags',
        '/products?line=versace&category=bags',
        '/products?line=acne_studios&category=bags',
        '/products?line=fjallraven&category=bags',
        '/products?line=givenchy&category=bags',
        '/products?line=armani&category=bags',
        '/products?line=palace&category=bags',
        '/products?line=prada&category=bags',
        '/products?line=diesel&category=bags',
        '/products?line=chloe&category=bags',
        '/products?line=balenciaga&category=bags',
        '/products?line=the_row&category=bags',
        '/products?line=coach&category=bags',
        '/products?line=charlesandkeith&category=bags',
        '/products?line=loewe&category=bags',
        '/products?line=a.p.c.&category=bags',
        '/products?line=bally&category=bags',
        '/products?line=stüssy&category=bags',
        '/products?line=adidas&category=bags',
        '/products?line=new_balance&category=bags',
        '/products?line=dkny&category=bags',
        '/products?line=furla&category=bags',
        '/products?line=paco_rabanne&category=bags',
        '/products?line=comme_des_garçons&category=bags',
        '/products?line=palm_angels&category=bags',
        '/products?line=vivienne_westwood&category=bags',
        '/products?line=alexander_wang&category=bags',
        '/products?line=champion&category=bags',
        '/products?line=heron_preston&category=bags',
        '/products?line=drew_house&category=bags',
        '/products?line=ferragamo&category=bags',
        '/products?line=miu_miu&category=bags',
        '/products?line=jacquemus&category=bags',
        '/products?line=saint_laurent&category=bags',
        '/products?line=jil_sander&category=bags',
        '/products?line=goyard&category=bags',
        '/products?line=guess&category=bags',
        '/products?line=longchamp&category=bags',
        '/products?line=celine&category=bags',
        '/products?line=marc_jacobs&category=bags',
        '/products?line=staud&category=bags',
        '/products?line=supreme&category=bags',
        '/products?line=a_bathing_ape®&category=bags',
        '/products?line=converse&category=bags',
        '/products?line=off-white&category=bags',
        '/products?line=maison_margiela&category=bags',
        '/products?line=alexander_mcqueen&category=bags',
        '/products?line=calvin_klein&category=bags',
        '/products?line=the_north_face&category=bags',
        '/products?line=mlb&category=bags',
        '/products?line=balmain&category=bags',
        '/products?line=valentino&category=bags',
        '/products?line=under_armour&category=bags',
        '/products?line=puma&category=bags',
        '/products?line=cav_empt&category=bags'];

    const amountsBrandsM = [
        "8'100 лотов",
        "1'100 лотов",
        "18'300 лотов",
        "34'800 лотов",
        "16'500 лотов",
        "7'800 лотов",
        "3'000 лотов",
        "1'800 лотов",
        "1'300 лотов",
        "6'900 лотов",
        "1'100 лотов",
        "6'300 лотов",
        "1'200 лотов",
        "2'400 лотов",
        "3'000 лотов",
        "1'500 лотов",
        "900 лотов",
        "1'300 лотов",
        "8'700 лотов",
        "1'400 лотов",
        "3'000 лотов",
        "13'200 лотов",
        "7'800 лотов",
        "9'900 лотов",
        "1'200 лотов",
        "1'200 лотов",
        "2'100 лотов",
        "3'600 лотов",
        "1'400 лотов",
        "1'500 лотов",
        "1'200 лотов",
        "1'500 лотов",
        "4'800 лотов",
        "1'200 лотов",
        "1'500 лотов",
        "1'300 лотов",
        "900 лотов",
        "1'800 лотов",
        "1'100 лотов",
        "6'600 лотов",
        "15'900 лотов",
        "4'800 лотов",
        "2'100 лотов",
        "1'800 лотов",
        "6'300 лотов",
        "3'300 лотов",
        "6'300 лотов",
        "1'200 лотов",
        "1'500 лотов",
        "2'100 лотов",
        "7'500 лотов",
        "2'100 лотов",
        "4'500 лотов",
        "900 лотов"
    ];

    const amountsBrandsW = [
        "7'800 лотов",
        "1'200 лотов",
        "15'900 лотов",
        "7'200 лотов",
        "13'200 лотов",
        "16'500 лотов",
        "18'300 лотов",
        "6'600 лотов",
        "7'500 лотов",
        "2'100 лотов",
        "1'500 лотов",
        "7'800 лотов",
        "3'000 лотов",
        "1'800 лотов",
        "9'300 лотов",
        "900 лотов",
        "6'900 лотов",
        "1'300 лотов",
        "4'800 лотов",
        "900 лотов",
        "1'500 лотов",
        "3'000 лотов",
        "2'400 лотов",
        "1'200 лотов",
        "8'700 лотов",
        "1'200 лотов",
        "4'200 лотов",
        "8'100 лотов",
        "900 лотов",
        "34'800 лотов",
        "3'000 лотов",
        "6'300 лотов",
        "2'100 лотов",
        "3'000 лотов",
        "800 лотов",
        "9'900 лотов",
        "1'200 лотов",
        "900 лотов",
        "2'700 лотов",
        "800 лотов",
        "1'500 лотов",
        "1'300 лотов",
        "2'400 лотов",
        "900 лотов",
        "900 лотов",
        "1'400 лотов",
        "1'300 лотов",
        "4'500 лотов",
        "2'400 лотов",
        "1'500 лотов",
        "8'100 лотов",
        "1'800 лотов",
        "900 лотов",
        "1'100 лотов",
        "6'300 лотов",
        "6'000 лотов",
        "3'000 лотов",
        "1'400 лотов",
        "1'800 лотов",
        "900 лотов",
        "2'100 лотов",
        "1'200 лотов",
        "3'300 лотов",
        "3'600 лотов",
        "800 лотов",
        "6'300 лотов",
        "2'100 лотов",
        "1'500 лотов",
        "4'500 лотов",
        "1'800 лотов",
        "4'800 лотов",
        "800 лотов"
    ];

    const linksCategoriesM = [
        "/products?category=bags",
        "/products?category=waist_bags",
        "/products?category=backpacks",
        "/products?category=sport_bags",
        "/products?category=wallets",
        "/products?category=clutches",
        "/products?category=cardholders",
        "/products?category=makeup_bags",
        "/products?category=formal_case",
        "/products?category=suitcases",
        "/products?category=passport_covers"
    ];

    const linksCategoriesW = [
        "/products?category=bags",
        "/products?category=waist_bags",
        "/products?category=backpacks",
        "/products?category=tote_bags",
        "/products?category=hobo_bags",
        "/products?category=bucket_bags",
        "/products?category=sport_bags",
        "/products?category=wallets",
        "/products?category=clutches",
        "/products?category=cardholders",
        "/products?category=makeup_bags",
        "/products?category=formal_case",
        "/products?category=suitcases",
        "/products?category=passport_covers"
    ];

    const selectedGender = Cookies.get('selected_gender')

    return (
        <div>
            <div className={styles.catalogContainer}>
                {/* Popular Brands */}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsTitle}>ПОПУЛЯРНЫЕ БРЕНДЫ</div>
                    <div className={styles.brandsGrid}
                         style={{
                             gridTemplateColumns: `repeat(${selectedGender === "M" ? 18 : 24}, 97px`,
                         }}>
                        {Array.from({length: selectedGender === "M" ? 54 : 72}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Link
                                        href={selectedGender === "M" ? linksBrandsM[idx] : linksBrandsW[idx]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Products/Bags/Brands/${idx + 1}.png`}
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

                {selectedGender === "M" &&
                    <div className={styles.categoriesSection}>
                        <div className={styles.categoriesTitle}>КАТЕГОРИИ</div>
                        <div className={styles.categoriesGrid}>
                            {['Все сумки', 'Сумки на пояс', 'Рюкзаки'].map((category, idx) => (
                                <Link
                                    href={linksCategoriesM[idx]}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <div key={idx} className={styles.categoryItem}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Bags/Categories/${idx + 1}.png`}
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
                            ))}
                        </div>
                        <div className={styles.categoriesGrid4}>
                            {['Спортивные', 'Кошельки', 'Клатчи', 'Кардхолдеры', 'Косметички', 'Портфели', 'Чемоданы', 'Обложки'].map((category, idx) => (
                                <Link
                                    href={linksCategoriesM[idx + 3]}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <div key={idx} className={styles.categoryItem4}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Bags/Categories/${idx + 4}.png`}
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
                    </div>
                }

                {selectedGender === "F" &&
                    <div className={styles.categoriesSection}>
                        <div className={styles.categoriesTitle}>КАТЕГОРИИ</div>
                        <div className={styles.categoriesGrid}>
                            {['Все сумки', 'Сумки на пояс', 'Рюкзаки', 'Сумки тоуты', 'Сумки хобо', 'Сумки вёдра'].map((category, idx) => (
                                <Link
                                    href={linksCategoriesW[idx]}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <div key={idx} className={styles.categoryItem}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Bags/Categories/${idx + 1}.png`}
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
                            ))}
                        </div>
                        <div className={styles.categoriesGrid4}>
                            {['Спортивные', 'Кошельки', 'Клатчи', 'Кардхолдеры', 'Косметички', 'Портфели', 'Чемоданы', 'Обложки'].map((category, idx) => (
                                <Link
                                    href={linksCategoriesW[idx + 6]}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <div key={idx} className={styles.categoryItem4}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Bags/Categories/${idx + 7}.png`}
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
                    </div>
                }

                <div className={styles.centerButton}>
                    <Link
                        href={'/products?category=bags'}
                        onClick={handleClose}
                        style={{textDecoration: 'none'}}
                    >
                        Посмотреть все сумки
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default observer(CatalogBagsMobile);