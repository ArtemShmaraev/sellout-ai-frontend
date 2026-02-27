import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogBasketballMobile.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import logo from "@/static/img/sellout_logo.svg";
import backLogo from "@/static/icons/chevron-left.svg";
import cross from "@/static/icons/x-lg.svg";
import Link from "next/link";

const CatalogBasketballMobile = ({handleClose}) => {
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

    const textsBrandsNike = [
        'LeBron James', 'Kobe Bryant', 'Kevin Durant', 'Kyrie Irving', 'Freak Giannis', 'Zoom G.T.', 'Ja Morant', 'Paul George'
    ];

    const textsBrandsJordan = [
        'Air Jordan 34', 'Air Jordan 35', 'Air Jordan 36', 'Air Jordan 37', 'Air Jordan 38', 'Luka Doncic', 'Jayson Tatum', 'Zion Williamson', 'Air Jordan 11', 'Air Jordan 32', 'Air Jordan 33', 'Why Not'
    ];

    const textsBrandsAdidas = [
        'James Harden', 'Trae Young', 'Damian Lillard', 'Derrick Rose'
    ];

    const textsBrandsLiNing = [
        'Way Of Wade', 'Yushuai', 'Sonic', 'Speed'
    ];

    const textsBrandsOther = [
        'Все Anta', 'Anta KT3', 'Anta KT7', 'Anta KT8', 'Under Armour', 'UA Curry 9', 'UA Curry 10', 'Converse BB'
    ];

    const linksCategories = [
        "/products?category=basketball_sneakers",
        "/products?category=basketball_jerseys",
        "/products?category=basketball_shorts",
        "/products?category=basketballs",
        "/products?category=sport_clothes",
        "/products?category=sport_bags"
    ];

    const allLinks = [
        "/products?line=nike_lebron_james",
        "/products?line=nike_kobe_bryant",
        "/products?line=nike_kd_%28kevin_durant%29",
        "/products?line=nike_kyrie_irving",
        "/products?line=nike_freak_%28giannis_antetokounmpo%29",
        "/products?line=nike_air_zoom_g.t.",
        "/products?line=nike_ja_morant",
        "/products?line=nike_pg_%28paul_george%29",

        "/products?line=air_jordan_34",
        "/products?line=air_jordan_35",
        "/products?line=air_jordan_36",
        "/products?line=air_jordan_37",
        "/products?line=air_jordan_38",
        "/products?line=jordan_luka",
        "/products?line=jordan_tatum",
        "/products?line=jordan_zion",
        "/products?line=air_jordan_11",
        "/products?line=air_jordan_32",
        "/products?line=air_jordan_33",
        "/products?line=jordan_why_not",

        "/products?line=adidas_harden",
        "/products?line=adidas_trae_young",
        "/products?line=adidas_dame_%28damian_lillard%29",
        "/products?line=adidas_d_rose",
        "/products?line=li-ning_way_of_wade",
        "/products?line=li-ning_yushuai",
        "/products?line=li-ning_sonic",
        "/products?line=li-ning_speed",
        "/products?line=anta&category=basketball_sneakers",
        "/products?line=anta_kt3",
        "/products?line=anta_kt7",
        "/products?line=anta_kt8",
        "/products?line=under_armour&category=basketball_sneakers",
        "/products?line=under_armour_curry_9",
        "/products?line=under_armour_curry_10",
        "/products?line=converse_all_star_pro_bb"
    ];

    return (
        <div>
            <div className={styles.catalogContainer}>
                {/* Categories */}
                <div className={styles.categoriesSection}>
                    <div className={styles.categoriesGrid}>
                        {['Кроссовки', 'Джерси', 'Шорты', 'Мячи', 'Одежда', 'Сумки'].map((category, idx) => (
                            <Link
                                href={linksCategories[idx]}
                                onClick={handleClose}
                                style={{flex: 1}}
                            >
                                <div key={idx} className={styles.categoryItem}>
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Basketball/Categories/${idx + 1}.png`}
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
                </div>

                {/* Popular Lines */}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsTitle}>ПОПУЛЯРНЫЕ ЛИНЕЙКИ</div>
                    <>
                        <div className={styles.titleContainer}>
                            <div className={styles.brandsTitle2}>NIKE</div>
                            <div className={styles.brandsTitle3}>
                                <Link
                                    href={'/products?line=nike&category=basketball_sneakers'}
                                    onClick={handleClose}
                                    style={{textDecoration: 'none', color: '#3E3E3E'}}
                                >
                                    Посмотреть все
                                </Link>
                            </div>
                        </div>
                        <div className={styles.brandsGrid}>
                            {Array.from({length: 8}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle}>
                                        <Link
                                            href={allLinks[idx]}
                                            onClick={handleClose}
                                        >
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Basketball/Nike/${idx + 1}.png`}
                                                alt="Brand Image"
                                                className={styles.circleImage}
                                                width={700}
                                                height={700}
                                                layout="responsive"
                                                quality={100}
                                            />
                                        </Link>
                                    </div>
                                    <div className={styles.circleText}>{textsBrandsNike[idx]}</div>
                                </div>
                            ))}
                        </div>
                    </>
                    <>
                        <div className={styles.titleContainer}>
                            <div className={styles.brandsTitle2}>JORDAN</div>
                            <div className={styles.brandsTitle3}>
                                <Link
                                    href={'/products?line=jordan&category=basketball_sneakers'}
                                    onClick={handleClose}
                                    style={{textDecoration: 'none', color: '#3E3E3E'}}
                                >
                                    Посмотреть все
                                </Link>
                            </div>
                        </div>
                        <div className={styles.brandsGrid}>
                            {Array.from({length: 12}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle}>
                                        <Link
                                            href={allLinks[idx + 8]}
                                            onClick={handleClose}
                                        >
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Basketball/Jordan/${idx + 1}.png`}
                                                alt="Brand Image"
                                                className={styles.circleImage}
                                                width={700}
                                                height={700}
                                                layout="responsive"
                                                quality={100}
                                            />
                                        </Link>
                                    </div>
                                    <div className={styles.circleText}>{textsBrandsJordan[idx]}</div>
                                </div>
                            ))}
                        </div>
                    </>
                    <>
                        <div className={styles.titleContainer}>
                            <div className={styles.brandsTitle2}>ADIDAS</div>
                            <div className={styles.brandsTitle3}>
                                <Link
                                    href={'/products?line=adidas&category=basketball_sneakers'}
                                    onClick={handleClose}
                                    style={{textDecoration: 'none', color: '#3E3E3E'}}
                                >
                                    Посмотреть все
                                </Link>
                            </div>
                        </div>
                        <div className={styles.brandsGrid}>
                            {Array.from({length: 4}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle}>
                                        <Link
                                            href={allLinks[idx + 20]}
                                            onClick={handleClose}
                                        >
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Basketball/adidas/${idx + 1}.png`}
                                                alt="Brand Image"
                                                className={styles.circleImage}
                                                width={700}
                                                height={700}
                                                layout="responsive"
                                                quality={100}
                                            />
                                        </Link>
                                    </div>
                                    <div className={styles.circleText}>{textsBrandsAdidas[idx]}</div>
                                </div>
                            ))}
                        </div>
                    </>
                    <>
                        <div className={styles.titleContainer}>
                            <div className={styles.brandsTitle2}>LI-NING</div>
                            <div className={styles.brandsTitle3}>
                                <Link
                                    href={'/products?line=li-ning&category=basketball_sneakers'}
                                    onClick={handleClose}
                                    style={{textDecoration: 'none', color: '#3E3E3E'}}
                                >
                                    Посмотреть все
                                </Link>
                            </div>
                        </div>
                        <div className={styles.brandsGrid}>
                            {Array.from({length: 4}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle}>
                                        <Link
                                            href={allLinks[idx + 24]}
                                            onClick={handleClose}
                                        >
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Basketball/Li-Ning/${idx + 1}.png`}
                                                alt="Brand Image"
                                                className={styles.circleImage}
                                                width={700}
                                                height={700}
                                                layout="responsive"
                                                quality={100}
                                            />
                                        </Link>
                                    </div>
                                    <div className={styles.circleText}>{textsBrandsLiNing[idx]}</div>
                                </div>
                            ))}
                        </div>
                    </>
                    <>
                        <div className={styles.titleContainer}>
                            <div className={styles.brandsTitle2}>ДРУГИЕ БРЕНДЫ</div>
                        </div>
                        <div className={styles.brandsGrid}>
                            {Array.from({length: 8}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle}>
                                        <Link
                                            href={allLinks[idx + 28]}
                                            onClick={handleClose}
                                        >
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Basketball/OtherBrands/${idx + 1}.png`}
                                                alt="Brand Image"
                                                className={styles.circleImage}
                                                width={700}
                                                height={700}
                                                layout="responsive"
                                                quality={100}
                                            />
                                        </Link>
                                    </div>
                                    <div className={styles.circleText}>{textsBrandsOther[idx]}</div>
                                </div>
                            ))}
                        </div>
                    </>
                </div>


                <div className={styles.centerButton}>
                    <Link
                        href={'/products?category=basketball_sneakers&category=basketball_jerseys&category=basketball_shorts&category=sport_vests&category=sport_shorts&category=sport_bags&category=basketballs'}
                        onClick={handleClose}
                        style={{textDecoration: 'none'}}
                    >
                        Посмотреть все баскетбольные товары
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default observer(CatalogBasketballMobile);