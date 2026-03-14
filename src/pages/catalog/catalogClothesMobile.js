import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogClothesMobileMen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import logo from "@/static/img/sellout_logo.svg";
import backLogo from "@/static/icons/chevron-left.svg";
import cross from '@/static/icons/x-lg.svg'
import Link from "next/link";
import Cookies from "js-cookie";


const CatalogClothesMobile = ({handleClose}) => {
    const linksBrandsM = ['/products?line=stüssy&category=clothes',
        '/products?line=palm_angels&category=clothes',
        '/products?line=fear_of_god&category=clothes',
        '/products?line=ami_paris&category=clothes',
        '/products?line=alexander_mcqueen&category=clothes',
        '/products?line=maison_margiela&category=clothes',
        '/products?line=balenciaga&category=clothes',
        '/products?line=drew_house&category=clothes',
        '/products?line=bottega_veneta&category=clothes',
        '/products?line=nike&category=clothes',
        '/products?line=jordan&category=clothes',
        '/products?line=comme_des_garçons&category=clothes',
        '/products?line=polo_ralph_lauren&category=clothes',
        '/products?line=loro_piana&category=clothes',
        '/products?line=hugo_boss&category=clothes',
        '/products?line=lanvin&category=clothes',
        '/products?line=moncler&category=clothes',
        '/products?line=versace&category=clothes',
        '/products?line=vans&category=clothes',
        '/products?line=li-ning&category=clothes',
        '/products?line=supreme&category=clothes',
        '/products?line=carhartt&category=clothes',
        '/products?line=off-white&category=clothes',
        '/products?line=a-cold-wall*&category=clothes',
        '/products?line=ambush&category=clothes',
        '/products?line=vetements&category=clothes',
        '/products?line=dior&category=clothes',
        '/products?line=prada&category=clothes',
        '/products?line=louis_vuitton&category=clothes',
        '/products?line=adidas&category=clothes',
        '/products?line=new_balance&category=clothes',
        '/products?line=palace&category=clothes',
        '/products?line=celine&category=clothes',
        '/products?line=fendi&category=clothes',
        '/products?line=calvin_klein&category=clothes',
        '/products?line=champion&category=clothes',
        '/products?line=burberry&category=clothes',
        '/products?line=asics&category=clothes',
        '/products?line=converse&category=clothes',
        '/products?line=under_armour&category=clothes',
        '/products?line=cactus_jack_by_travis_scott&category=clothes',
        '/products?line=a_bathing_ape®&category=clothes',
        '/products?line=heron_preston&category=clothes',
        '/products?line=vlone&category=clothes',
        '/products?line=diesel&category=clothes',
        '/products?line=gucci&category=clothes',
        '/products?line=valentino&category=clothes',
        '/products?line=cav_empt&category=clothes',
        '/products?line=the_north_face&category=clothes',
        '/products?line=chrome_hearts&category=clothes',
        '/products?line=dickies&category=clothes',
        '/products?line=stone_island&category=clothes',
        '/products?line=balmain&category=clothes',
        '/products?line=hermes&category=clothes',
        '/products?line=armani&category=clothes',
        '/products?line=mlb&category=clothes',
        '/products?line=ferragamo&category=clothes',
        '/products?line=puma&category=clothes',
        '/products?line=reebok&category=clothes',
        '/products?line=anta&category=clothes'];

    const linksBrandsW = ['/products?line=cactus_jack_by_travis_scott&category=clothes',
        '/products?line=stüssy&category=clothes',
        '/products?line=skims&category=clothes',
        '/products?line=converse&category=clothes',
        '/products?line=carhartt&category=clothes',
        '/products?line=vetements&category=clothes',
        '/products?line=moncler&category=clothes',
        '/products?line=balenciaga&category=clothes',
        '/products?line=drew_house&category=clothes',
        '/products?line=louis_vuitton&category=clothes',
        '/products?line=burberry&category=clothes',
        '/products?line=asics&category=clothes',
        '/products?line=jw_anderson&category=clothes',
        '/products?line=acne_studios&category=clothes',
        '/products?line=chanel&category=clothes',
        '/products?line=versace&category=clothes',
        '/products?line=lanvin&category=clothes',
        '/products?line=mlb&category=clothes',
        '/products?line=michael_kors&category=clothes',
        '/products?line=vivienne_westwood&category=clothes',
        '/products?line=heron_preston&category=clothes',
        '/products?line=the_north_face&category=clothes',
        '/products?line=fear_of_god&category=clothes',
        '/products?line=supreme&category=clothes',
        '/products?line=polo_ralph_lauren&category=clothes',
        '/products?line=loewe&category=clothes',
        '/products?line=gucci&category=clothes',
        '/products?line=maison_margiela&category=clothes',
        '/products?line=chrome_hearts&category=clothes',
        '/products?line=prada&category=clothes',
        '/products?line=vans&category=clothes',
        '/products?line=dior&category=clothes',
        '/products?line=comme_des_garçons&category=clothes',
        '/products?line=puma&category=clothes',
        '/products?line=off-white&category=clothes',
        '/products?line=ami_paris&category=clothes',
        '/products?line=loro_piana&category=clothes',
        '/products?line=chloe&category=clothes',
        '/products?line=nike&category=clothes',
        '/products?line=jordan&category=clothes',
        '/products?line=balmain&category=clothes',
        '/products?line=under_armour&category=clothes',
        '/products?line=alexander_mcqueen&category=clothes',
        '/products?line=a_bathing_ape®&category=clothes',
        '/products?line=miu_miu&category=clothes',
        '/products?line=jacquemus&category=clothes',
        '/products?line=saint_laurent&category=clothes',
        '/products?line=jil_sander&category=clothes',
        '/products?line=bottega_veneta&category=clothes',
        '/products?line=diesel&category=clothes',
        '/products?line=cav_empt&category=clothes',
        '/products?line=valentino&category=clothes',
        '/products?line=alexander_wang&category=clothes',
        '/products?line=marc_jacobs&category=clothes',
        '/products?line=ambush&category=clothes',
        '/products?line=hermes&category=clothes',
        '/products?line=palace&category=clothes',
        '/products?line=champion&category=clothes',
        '/products?line=celine&category=clothes',
        '/products?line=fendi&category=clothes',
        '/products?line=adidas&category=clothes',
        '/products?line=new_balance&category=clothes',
        '/products?line=calvin_klein&category=clothes',
        '/products?line=palm_angels&category=clothes',
        '/products?line=reebok&category=clothes',
        '/products?line=anta&category=clothes'];

    const amountsBrandsM = [
        "1'200 лотов",
        "6'900 лотов",
        "1'200 лотов",
        "3'900 лотов",
        "8'700 лотов",
        "7'200 лотов",
        "7'200 лотов",
        "1'400 лотов",
        "5'400 лотов",
        "57'000 лотов",
        "6'600 лотов",
        "3'000 лотов",
        "10'200 лотов",
        "1'200 лотов",
        "7'500 лотов",
        "2'400 лотов",
        "13'800 лотов",
        "12'300 лотов",
        "900 лотов",
        "1'200 лотов",
        "1'500 лотов",
        "3'600 лотов",
        "10'500 лотов",
        "1'300 лотов",
        "2'100 лотов",
        "1'500 лотов",
        "4'200 лотов",
        "7'800 лотов",
        "3'000 лотов",
        "16'200 лотов",
        "4'200 лотов",
        "1'500 лотов",
        "2'700 лотов",
        "6'000 лотов",
        "1'500 лотов",
        "2'700 лотов",
        "9'300 лотов",
        "1'000 лотов",
        "1'200 лотов",
        "7'500 лотов",
        "800 лотов",
        "3'900 лотов",
        "2'100 лотов",
        "1'400 лотов",
        "6'600 лотов",
        "9'900 лотов",
        "7'500 лотов",
        "1'500 лотов",
        "10'200 лотов",
        "1'300 лотов",
        "1'400 лотов",
        "9'300 лотов",
        "9'900 лотов",
        "1'400 лотов",
        "24'000 лотов",
        "3'000 лотов",
        "1'500 лотов",
        "4'200 лотов",
        "700 лотов",
        "1'200 лотов"
    ];

    const amountsBrandsW = [
        "1'500 лотов",
        "1'200 лотов",
        "700 лотов",
        "1'400 лотов",
        "3'600 лотов",
        "1'500 лотов",
        "13'800 лотов",
        "7'200 лотов",
        "1'500 лотов",
        "3'000 лотов",
        "9'300 лотов",
        "1'000 лотов",
        "2'100 лотов",
        "3'600 лотов",
        "1'400 лотов",
        "12'300 лотов",
        "2'400 лотов",
        "3'000 лотов",
        "1'800 лотов",
        "1'800 лотов",
        "2'100 лотов",
        "10'200 лотов",
        "1'200 лотов",
        "1'500 лотов",
        "10'200 лотов",
        "3'300 лотов",
        "9'900 лотов",
        "7'200 лотов",
        "1'500 лотов",
        "7'800 лотов",
        "900 лотов",
        "4'200 лотов",
        "3'000 лотов",
        "4'200 лотов",
        "10'500 лотов",
        "3'900 лотов",
        "1'200 лотов",
        "3'000 лотов",
        "57'000 лотов",
        "6'600 лотов",
        "9'900 лотов",
        "7'500 лотов",
        "8'700 лотов",
        "3'900 лотов",
        "2'700 лотов",
        "3'900 лотов",
        "6'300 лотов",
        "5'100 лотов",
        "5'400 лотов",
        "6'600 лотов",
        "1'500 лотов",
        "7'500 лотов",
        "2'400 лотов",
        "1'200 лотов",
        "2'100 лотов",
        "1'200 лотов",
        "1'500 лотов",
        "2'700 лотов",
        "2'700 лотов",
        "6'000 лотов",
        "16'200 лотов",
        "4'200 лотов",
        "1'500 лотов",
        "6'900 лотов",
        "900 лотов",
        "1'200 лотов"
    ];

    const linksCategoriesM = [
        "/products?category=tshirts",
        "/products?category=hoodie_sweatshirts",
        "/products?category=shorts",
        "/products?category=longsleeves",
        "/products?category=knitwear",
        "/products?category=polo",
        "/products?category=shirts",
        "/products?category=sweatpants",
        "/products?category=jeans",
        "/products?category=trousers",
        "/products?category=sport_clothes",
        "/products?category=basketball_jerseys",
        "/products?category=basketball_shorts",
        "/products?category=football_shirts",
        "/products?category=football_shorts",
        "/products?category=sport_shorts",
        "/products?category=sport_vests",
        "/products?category=outerwear",
        "/products?category=coats_jackets",
        "/products?category=windbreakers",
        "/products?category=vests",
        "/products?category=down_jackets",
        "/products?category=coats",
        "/products?category=baseball_jackets",
        "/products?category=denim_jackets",
        "/products?category=leather_jackets",
        "/products?category=trench",
        "/products?category=hoodie_sweatshirts",
        "/products?category=hoodie",
        "/products?category=zip_hoodie",
        "/products?category=sweatshirts",

        "/products?category=knitwear",
        "/products?category=sweaters",
        "/products?category=turtlenecks",
        "/products?category=cardigans",

        "/products?category=denim",
        "/products?category=jackets",
        "/products?category=suits",
        "/products?category=winter_pants",
        "/products?category=mens_swimming_trunks",
        "/products?category=overalls",
        "/products?category=socks",
        "/products?category=underpants"
    ];

    const linksCategoriesW = [
        "/products?category=tshirts",
        "/products?category=hoodie_sweatshirts",
        "/products?category=shorts",
        "/products?category=tops",
        "/products?category=knitwear",
        "/products?category=skirts",
        "/products?category=shirts",
        "/products?category=sweatpants",
        "/products?category=jeans",
        "/products?category=dresses",
        "/products?category=polo",
        "/products?category=longsleeves",
        "/products?category=overalls",
        "/products?category=trousers",

        "/products?category=sport_clothes",
        "/products?category=sport_tops",
        "/products?category=sport_shorts",
        "/products?category=leggings_thermal_underwear",
        "/products?category=sport_vests",
        "/products?category=football_shirts",
        "/products?category=basketball_jerseys",

        "/products?category=outerwear",
        "/products?category=coats_jackets",
        "/products?category=windbreakers",
        "/products?category=down_jackets",
        "/products?category=leather_jackets",
        "/products?category=coats",
        "/products?category=denim_jackets",
        "/products?category=baseball_jackets",
        "/products?category=vests",
        "/products?category=trench",
        "/products?category=fur_coats",

        "/products?category=hoodie_sweatshirts",
        "/products?category=hoodie",
        "/products?category=zip_hoodie",
        "/products?category=sweatshirts",

        "/products?category=knitwear",
        "/products?category=sweaters",
        "/products?category=turtlenecks",
        "/products?category=cardigans",

        "/products?category=denim",
        "/products?category=jackets",
        "/products?category=suits",
        "/products?category=winter_pants",
        "/products?category=one_piece_swimsuits",
        "/products?category=womens_swimsuits",
        "/products?category=socks",
        "/products?category=underwear_home_wear"
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
            {/*            ОДЕЖДА*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={styles.catalogContainer}>
                {/* Popular Brands */}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsTitle}>ПОПУЛЯРНЫЕ БРЕНДЫ</div>
                    <div className={styles.brandsGrid}
                         style={{
                             gridTemplateColumns: `repeat(${selectedGender === "M" ? 20 : 22}, 97px`,
                         }}>
                        {Array.from({length: selectedGender === "M" ? 60 : 66}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Link
                                        href={selectedGender === "M" ? linksBrandsM[idx] : linksBrandsW[idx]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Products/Clothes/Brands/${idx + 1}.png`}
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
                    <>
                        {/* Categories */}
                        <div className={styles.categoriesSection1}>
                            <div className={styles.categoriesTitle}>КАТЕГОРИИ</div>
                            <div className={styles.categoriesGrid}>
                                {['Футболки', 'Худи', 'Шорты', 'Лонгсливы', 'Свитеры', 'Поло'].map((category, idx) => (
                                    <Link
                                        href={linksCategoriesM[idx]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Clothes/Categories/${idx + 1}.png`}
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
                                {['Рубашки', 'Треники', 'Джинсы', 'Брюки'].map((category, idx) => (
                                    <Link
                                        href={linksCategoriesM[idx + 6]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem4}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Clothes/Categories/${idx + 7}.png`}
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

                        <div className={styles.categoriesSection2}>
                            <div className={styles.categoriesTitle2}>СПОРТИВНАЯ ОДЕЖДА</div>
                            <div className={styles.categoriesGrid4}>
                                {['Вся', 'Баскет. джерси', 'Баскет. шорты', 'Футб. майки', 'Футб. шорты', 'Шорты', 'Майки'].map((category, idx) => (
                                    <Link
                                        href={linksCategoriesM[idx + 10]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem4}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Clothes/Categories/${idx + 11}.png`}
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

                        <div className={styles.categoriesSection2}>
                            <div className={styles.categoriesTitle2}>ВЕРХНЯЯ ОДЕЖДА</div>
                            <div className={styles.categoriesGrid4}>
                                {['Вся', 'Куртки', 'Ветровки', 'Жилетки', 'Пуховики', 'Пальто', 'Бейсбольные', 'Джинсовые', 'Кожаные', 'Плащи'].map((category, idx) => (
                                    <Link
                                        href={linksCategoriesM[idx + 17]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem4}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Clothes/Categories/${idx + 18}.png`}
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

                        <div className={styles.categoriesSection2}>
                            <div className={styles.categoriesTitle2}>ХУДИ И ТОЛСТОВКИ</div>
                            <div className={styles.categoriesGrid4}>
                                {['Все толстовки', 'С капюшоном', 'На молнии', 'Свитшоты'].map((category, idx) => (
                                    <Link
                                        href={linksCategoriesM[idx + 27]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem4}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Clothes/Categories/${idx + 28}.png`}
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

                        <div className={styles.categoriesSection2}>
                            <div className={styles.categoriesTitle2}>СВИТЕРЫ И ТРИКОТАЖ</div>
                            <div className={styles.categoriesGrid4}>
                                {['Все', 'Свитеры', 'Водолазки', 'Кардиганы'].map((category, idx) => (
                                    <Link
                                        href={linksCategoriesM[idx + 31]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem4}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Clothes/Categories/${idx + 32}.png`}
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

                        <div className={styles.categoriesSection2} style={{marginBottom: '50px'}}>
                            <div className={styles.categoriesTitle2}>ДРУГИЕ</div>
                            <div className={styles.categoriesGrid4}>
                                {['Деним', 'Пиджаки', 'Костюмы', 'Зимние штаны', 'Плавки', 'Комбинезоны', 'Носки', 'Трусы'].map((category, idx) => (
                                    <Link
                                        href={linksCategoriesM[idx + 35]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem4}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Clothes/Categories/${idx + 36}.png`}
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
                    </>
                }

                {selectedGender === "F" &&
                    <>
                        {/* Categories */}
                        <div className={styles.categoriesSection1}>
                            <div className={styles.categoriesTitle}>КАТЕГОРИИ</div>
                            <div className={styles.categoriesGrid}>
                                {['Футболки', 'Худи', 'Шорты', 'Топы', 'Свитеры', 'Юбки'].map((category, idx) => (
                                    <Link
                                        href={linksCategoriesW[idx]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Clothes/Categories/${idx + 1}.png`}
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
                                {['Рубашки', 'Треники', 'Джинсы', 'Платья', 'Поло', 'Лонгсливы', 'Боди', 'Брюки'].map((category, idx) => (
                                    <Link
                                        href={linksCategoriesW[idx + 6]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem4}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Clothes/Categories/${idx + 7}.png`}
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

                        <div className={styles.categoriesSection2}>
                            <div className={styles.categoriesTitle2}>СПОРТИВНАЯ ОДЕЖДА</div>
                            <div className={styles.categoriesGrid4}>
                                {['Вся', 'Топы', 'Шорты', 'Легинсы', 'Майки', 'Футб. майки', 'Баскет. джерси'].map((category, idx) => (
                                    <Link
                                        href={linksCategoriesW[idx + 14]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem4}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Clothes/Categories/${idx + 15}.png`}
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

                        <div className={styles.categoriesSection2}>
                            <div className={styles.categoriesTitle2}>ВЕРХНЯЯ ОДЕЖДА</div>
                            <div className={styles.categoriesGrid4}>
                                {['Вся', 'Куртки', 'Ветровки', 'Пуховики', 'Кожаные', 'Пальто', 'Джинсовые', 'Бейсбольные', 'Жилетки', 'Плащи', 'Шубы'].map((category, idx) => (
                                    <Link
                                        href={linksCategoriesW[idx + 21]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem4}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Clothes/Categories/${idx + 22}.png`}
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

                        <div className={styles.categoriesSection2}>
                            <div className={styles.categoriesTitle2}>ХУДИ И ТОЛСТОВКИ</div>
                            <div className={styles.categoriesGrid4}>
                                {['Все толстовки', 'С капюшоном', 'На молнии', 'Свитшоты'].map((category, idx) => (
                                    <Link
                                        href={linksCategoriesW[idx + 32]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem4}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Clothes/Categories/${idx + 28}.png`}
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

                        <div className={styles.categoriesSection2}>
                            <div className={styles.categoriesTitle2}>СВИТЕРЫ И ТРИКОТАЖ</div>
                            <div className={styles.categoriesGrid4}>
                                {['Все', 'Свитеры', 'Водолазки', 'Кардиганы'].map((category, idx) => (
                                    <Link
                                        href={linksCategoriesW[idx + 36]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem4}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Clothes/Categories/${idx + 32}.png`}
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

                        <div className={styles.categoriesSection2} style={{marginBottom: '50px'}}>
                            <div className={styles.categoriesTitle2}>ДРУГИЕ</div>
                            <div className={styles.categoriesGrid4}>
                                {['Деним', 'Пиджаки', 'Костюмы', 'Зимние штаны', 'Купальники', 'Купальники', 'Носки', 'Нижнее белье'].map((category, idx) => (
                                    <Link
                                        href={linksCategoriesW[idx + 40]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem4}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Clothes/Categories/${idx + 41}.png`}
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
                    </>
                }

                <div className={styles.centerButton}>
                    <Link
                        href={'/products?category=clothes'}
                        onClick={handleClose}
                        style={{textDecoration: 'none'}}
                    >
                        Посмотреть всю одежду
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default observer(CatalogClothesMobile);