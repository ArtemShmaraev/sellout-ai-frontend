import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogAccessoriesMobileMen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import logo from "@/static/img/sellout_logo.svg";
import backLogo from "@/static/icons/chevron-left.svg";
import cross from "@/static/icons/x-lg.svg";
import Link from "next/link";
import Cookies from "js-cookie";

const CatalogAccessoriesMobile = ({handleClose}) => {
    const linksBrandsM = ['/products?line=nike&category=accessories',
        '/products?line=jordan&category=accessories',
        '/products?line=vans&category=accessories',
        '/products?line=li-ning&category=accessories',
        '/products?line=off-white&category=accessories',
        '/products?line=vetements&category=accessories',
        '/products?line=balenciaga&category=accessories',
        '/products?line=a_bathing_ape®&category=accessories',
        '/products?line=carhartt&category=accessories',
        '/products?line=moncler&category=accessories',
        '/products?line=polo_ralph_lauren&category=accessories',
        '/products?line=burberry&category=accessories',
        '/products?line=palace&category=accessories',
        '/products?line=versace&category=accessories',
        '/products?line=armani&category=accessories',
        '/products?line=rolex&category=accessories',
        '/products?line=michael_kors&category=accessories',
        '/products?line=cartier&category=accessories',
        '/products?line=champion&category=accessories',
        '/products?line=adidas&category=accessories',
        '/products?line=new_balance&category=accessories',
        '/products?line=converse&category=accessories',
        '/products?line=under_armour&category=accessories',
        '/products?line=alexander_mcqueen&category=accessories',
        '/products?line=dior&category=accessories',
        '/products?line=prada&category=accessories',
        '/products?line=louis_vuitton&category=accessories',
        '/products?line=stüssy&category=accessories',
        '/products?line=chrome_hearts&category=accessories',
        '/products?line=stone_island&category=accessories',
        '/products?line=cav_empt&category=accessories',
        '/products?line=comme_des_garçons&category=accessories',
        '/products?line=ferragamo&category=accessories',
        '/products?line=van_cleef_and_arpels&category=accessories',
        '/products?line=hugo_boss&category=accessories',
        '/products?line=audemars_piguet&category=accessories',
        '/products?line=rayban&category=accessories',
        '/products?line=kangol&category=accessories',
        '/products?line=asics&category=accessories',
        '/products?line=puma&category=accessories',
        '/products?line=reebok&category=accessories',
        '/products?line=anta&category=accessories',
        '/products?line=maison_margiela&category=accessories',
        '/products?line=gucci&category=accessories',
        '/products?line=valentino&category=accessories',
        '/products?line=lanvin&category=accessories',
        '/products?line=supreme&category=accessories',
        '/products?line=bottega_veneta&category=accessories',
        '/products?line=the_north_face&category=accessories',
        '/products?line=drew_house&category=accessories',
        '/products?line=dickies&category=accessories',
        '/products?line=calvin_klein&category=accessories',
        '/products?line=casio&category=accessories',
        '/products?line=swatch&category=accessories',
        '/products?line=hermes&category=accessories',
        '/products?line=new_era&category=accessories',
        '/products?line=mlb&category=accessories'];

    const linksBrandsW = [
        '/products?line=vivienne_westwood&category=accessories',
        '/products?line=van_cleef_and_arpels&category=accessories',
        '/products?line=balenciaga&category=accessories',
        '/products?line=nike&category=accessories',
        '/products?line=off-white&category=accessories',
        '/products?line=vetements&category=accessories',
        '/products?line=carhartt&category=accessories',
        '/products?line=polo_ralph_lauren&category=accessories',
        '/products?line=michael_kors&category=accessories',
        '/products?line=moncler&category=accessories',
        '/products?line=loewe&category=accessories',
        '/products?line=diesel&category=accessories',
        '/products?line=champion&category=accessories',
        '/products?line=alexander_wang&category=accessories',
        '/products?line=celine&category=accessories',
        '/products?line=burberry&category=accessories',
        '/products?line=swatch&category=accessories',
        '/products?line=asics&category=accessories',
        '/products?line=vans&category=accessories',
        '/products?line=li-ning&category=accessories',
        '/products?line=miu_miu&category=accessories',
        '/products?line=rolex&category=accessories',
        '/products?line=prada&category=accessories',
        '/products?line=adidas&category=accessories',
        '/products?line=alexander_mcqueen&category=accessories',
        '/products?line=dior&category=accessories',
        '/products?line=stüssy&category=accessories&category=accessories',
        '/products?line=chrome_hearts&category=accessories',
        '/products?line=rayban&category=accessories',
        '/products?line=louis_vuitton&category=accessories',
        '/products?line=jw_anderson&category=accessories',
        '/products?line=saint_laurent&category=accessories',
        '/products?line=kangol&category=accessories',
        '/products?line=ami_paris&category=accessories',
        '/products?line=chloe&category=accessories',
        '/products?line=audemars_piguet&category=accessories',
        '/products?line=versace&category=accessories',
        '/products?line=new_balance&category=accessories',
        '/products?line=converse&category=accessories',
        '/products?line=under_armour&category=accessories',
        '/products?line=jacquemus&category=accessories',
        '/products?line=cartier&category=accessories',
        '/products?line=valentino&category=accessories',
        '/products?line=jordan&category=accessories',
        '/products?line=maison_margiela&category=accessories',
        '/products?line=gucci&category=accessories',
        '/products?line=supreme&category=accessories',
        '/products?line=bottega_veneta&category=accessories',
        '/products?line=new_era&category=accessories',
        '/products?line=lanvin&category=accessories',
        '/products?line=hermes&category=accessories',
        '/products?line=jil_sander&category=accessories',
        '/products?line=mlb&category=accessories',
        '/products?line=a_bathing_ape®&category=accessories',
        '/products?line=comme_des_garçons&category=accessories',
        '/products?line=calvin_klein&category=accessories',
        '/products?line=the_north_face&category=accessories',
        '/products?line=casio&category=accessories',
        '/products?line=puma&category=accessories',
        '/products?line=reebok&category=accessories'];

    const amountsBrandsM = [
        "6'300 лотов",
        "900 лотов",
        "700 лотов",
        "3'000 лотов",
        "2'100 лотов",
        "1'100 лотов",
        "4'800 лотов",
        "1'300 лотов",
        "900 лотов",
        "3'000 лотов",
        "1'800 лотов",
        "5'700 лотов",
        "900 лотов",
        "4'200 лотов",
        "6'300 лотов",
        "1'500 лотов",
        "1'200 лотов",
        "2'100 лотов",
        "700 лотов",
        "4'200 лотов",
        "1'500 лотов",
        "900 лотов",
        "1'200 лотов",
        "5'100 лотов",
        "7'500 лотов",
        "5'700 лотов",
        "6'300 лотов",
        "900 лотов",
        "1'100 лотов",
        "1'000 лотов",
        "700 лотов",
        "700 лотов",
        "3'300 лотов",
        "1'000 лотов",
        "900 лотов",
        "1'000 лотов",
        "700 лотов",
        "1'300 лотов",
        "700 лотов",
        "1'500 лотов",
        "1'500 лотов",
        "1'400 лотов",
        "1'200 лотов",
        "15'300 лотов",
        "2'400 лотов",
        "1'200 лотов",
        "2'100 лотов",
        "5'100 лотов",
        "2'700 лотов",
        "1'300 лотов",
        "1'000 лотов",
        "2'100 лотов",
        "22'800 лотов",
        "3'900 лотов",
        "10'500 лотов",
        "8'100 лотов",
        "900 лотов"
    ];

    const amountsBrandsW = [
        "2'400 лотов",
        "1'000 лотов",
        "4'800 лотов",
        "6'300 лотов",
        "2'100 лотов",
        "1'000 лотов",
        "900 лотов",
        "1'800 лотов",
        "1'200 лотов",
        "3'000 лотов",
        "3'300 лотов",
        "800 лотов",
        "900 лотов",
        "700 лотов",
        "2'700 лотов",
        "5'700 лотов",
        "3'900 лотов",
        "1'500 лотов",
        "1'300 лотов",
        "3'000 лотов",
        "1'200 лотов",
        "900 лотов",
        "5'700 лотов",
        "4'200 лотов",
        "5'100 лотов",
        "7'500 лотов",
        "900 лотов",
        "800 лотов",
        "1'500 лотов",
        "6'300 лотов",
        "1'200 лотов",
        "6'300 лотов",
        "1'300 лотов",
        "700 лотов",
        "2'100 лотов",
        "1'000 лотов",
        "4'200 лотов",
        "1'100 лотов",
        "900 лотов",
        "1'200 лотов",
        "900 лотов",
        "2'100 лотов",
        "2'400 лотов",
        "900 лотов",
        "1'200 лотов",
        "15'300 лотов",
        "2'100 лотов",
        "5'100 лотов",
        "8'100 лотов",
        "1'000 лотов",
        "10'500 лотов",
        "800 лотов",
        "900 лотов",
        "1'000 лотов",
        "1'000 лотов",
        "2'100 лотов",
        "2'700 лотов",
        "22'800 лотов",
        "1'500 лотов",
        "900 лотов"
    ];

    const linksCategoriesM = [
        "/products?category=caps",
        "/products?category=sunglasses",
        "/products?category=panamas",
        "/products?category=watches",
        "/products?category=optical_glasses",
        "/products?category=collectibles",
        "/products?category=belts",
        "/products?category=hats",
        "/products?category=scarfs",
        "/products?category=gloves",
        "/products?category=glasses_cases",
        "/products?category=perfumes",
        "/products?category=cosmetics",
        "/products?category=ties",
        "/products?category=keychains",
        "/products?category=rings",
        "/products?category=necklaces",
        "/products?category=bracelets",
        "/products?category=basketballs",
        "/products?category=footballs",
        "/products?category=volleyballs",
        "/products?category=phone_cases",
        "/products?category=tech_accessories",
        "/products?category=other_accessories"
    ];

    const linksCategoriesW = [
        "/products?category=caps",
        "/products?category=sunglasses",
        "/products?category=panamas",
        "/products?category=watches",
        "/products?category=optical_glasses",
        "/products?category=collectibles",
        "/products?category=belts",
        "/products?category=hats",
        "/products?category=scarfs",
        "/products?category=gloves",
        "/products?category=glasses_cases",
        "/products?category=perfumes",
        "/products?category=cosmetics",
        "/products?category=ties",
        "/products?category=keychains",
        "/products?category=rings",
        "/products?category=necklaces",
        "/products?category=bracelets",
        "/products?category=earrings",
        "/products?category=phone_cases",
        "/products?category=basketballs",
        "/products?category=footballs",
        "/products?category=tech_accessories",
        "/products?category=other_accessories"
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
                             gridTemplateColumns: `repeat(${selectedGender === "M" ? 19 : 20}, 97px`,
                         }}>
                        {Array.from({length: selectedGender === "M" ? 57 : 60}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Link
                                        href={selectedGender === "M" ? linksBrandsM[idx] : linksBrandsW[idx]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Products/Accessories/Brands/${idx + 1}.png`}
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
                            {['Кепки', 'Очки', 'Панамы', 'Часы', 'Оправы', 'Collectibles'].map((category, idx) => (
                                <Link
                                    href={linksCategoriesM[idx]}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <div key={idx} className={styles.categoryItem}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Accessories/Categories/${idx + 1}.png`}
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
                            {['Ремни', 'Шапки', 'Шарфы', 'Перчатки', 'Очешники', 'Духи', 'Косметика', 'Галстуки', 'Брелоки', 'Кольца', 'Цепочки', 'Браслеты', 'Мячи', 'Мячи', 'Мячи', 'Чехлы', 'Для техники', 'Другие'].map((category, idx) => (
                                <Link
                                    href={linksCategoriesM[idx + 6]}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <div key={idx} className={styles.categoryItem4}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Accessories/Categories/${idx + 7}.png`}
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
                            {['Кепки', 'Очки', 'Панамы', 'Часы', 'Оправы', 'Collectibles'].map((category, idx) => (
                                <Link
                                    href={linksCategoriesW[idx]}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <div key={idx} className={styles.categoryItem}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Accessories/Categories/${idx + 1}.png`}
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
                            {['Ремни', 'Шапки', 'Шарфы', 'Перчатки', 'Очешники', 'Духи', 'Косметика', 'Галстуки', 'Брелоки', 'Кольца', 'Цепочки', 'Браслеты', 'Серьги', 'Чехлы', 'Мячи', 'Мячи', 'Для техники', 'Другие'].map((category, idx) => (
                                <Link
                                    href={linksCategoriesW[idx + 6]}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <div key={idx} className={styles.categoryItem4}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Accessories/Categories/${idx + 7}.png`}
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
                        href={'/products?category=accessories'}
                        onClick={handleClose}
                        style={{textDecoration: 'none'}}
                    >
                        Посмотреть все аксессуары
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default observer(CatalogAccessoriesMobile);