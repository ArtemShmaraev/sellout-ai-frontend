import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogBrandsMobileMen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import more from "@/static/icons/moreIcon.svg";
import Cookies from "js-cookie";
import Link from "next/link";


const CatalogBrandsMobile = ({handleClose, handleOpenSection}) => {
    const linksBrandsM = [
        '/products?line=nike',
        '/products?line=jordan',
        '/products?line=vans',
        '/products?line=converse',
        '/products?line=off-white',
        '/products?line=vetements',
        '/products?line=moncler',
        '/products?line=balenciaga',
        '/products?line=polo_ralph_lauren',
        '/products?line=louis_vuitton',
        '/products?line=burberry',
        '/products?line=palace',
        '/products?line=a_bathing_ape®',
        '/products?line=a-cold-wall*',
        '/products?line=chanel',
        '/products?line=versace',
        '/products?line=lanvin',
        '/products?line=li-ning',
        '/products?line=armani',
        '/products?line=rolex',
        '/products?line=michael_kors',
        '/products?line=adidas',
        '/products?line=new_balance',
        '/products?line=stüssy',
        '/products?line=asics',
        '/products?line=heron_preston',
        '/products?line=maison_margiela',
        '/products?line=chrome_hearts',
        '/products?line=prada',
        '/products?line=stone_island',
        '/products?line=dior',
        '/products?line=reebok',
        '/products?line=cav_empt',
        '/products?line=comme_des_garçons',
        '/products?line=ami_paris',
        '/products?line=loro_piana',
        '/products?line=ferragamo',
        '/products?line=van_cleef_and_arpels',
        '/products?line=anta',
        '/products?line=hugo_boss',
        '/products?line=audemars_piguet',
        '/products?line=rayban',
        '/products?line=fear_of_god',
        '/products?line=supreme',
        '/products?line=cactus_jack_by_travis_scott',
        '/products?line=puma',
        '/products?line=palm_angels',
        '/products?line=diesel',
        '/products?line=goyard',
        '/products?line=bottega_veneta',
        '/products?line=the_north_face',
        '/products?line=gucci',
        '/products?line=vlone',
        '/products?line=drew_house',
        '/products?line=dickies',
        '/products?line=ambush',
        '/products?line=celine',
        '/products?line=fendi',
        '/products?line=timberland',
        '/products?line=dr.martens',
        '/products?line=calvin_klein',
        '/products?line=casio',
        '/products?line=swatch'];

    const linksBrandsW = [
        '/products?line=nike',
        '/products?line=jordan',
        '/products?line=skims',
        '/products?line=converse',
        '/products?line=marc_jacobs',
        '/products?line=vetements',
        '/products?line=moncler',
        '/products?line=balenciaga',
        '/products?line=polo_ralph_lauren',
        '/products?line=louis_vuitton',
        '/products?line=burberry',
        '/products?line=asics',
        '/products?line=jw_anderson',
        '/products?line=acne_studios',
        '/products?line=chanel',
        '/products?line=versace',
        '/products?line=lanvin',
        '/products?line=fear_of_god',
        '/products?line=cartier',
        '/products?line=rolex',
        '/products?line=michael_kors',
        '/products?line=adidas',
        '/products?line=new_balance',
        '/products?line=vivienne_westwood',
        '/products?line=loewe',
        '/products?line=the_row',
        '/products?line=maison_margiela',
        '/products?line=chrome_hearts',
        '/products?line=prada',
        '/products?line=vans',
        '/products?line=dior',
        '/products?line=hermes',
        '/products?line=puma',
        '/products?line=comme_des_garçons',
        '/products?line=ami_paris',
        '/products?line=loro_piana',
        '/products?line=chloe',
        '/products?line=van_cleef_and_arpels',
        '/products?line=jimmy_choo',
        '/products?line=balmain',
        '/products?line=cav_empt',
        '/products?line=rayban',
        '/products?line=miu_miu',
        '/products?line=jacquemus',
        '/products?line=longchamp',
        '/products?line=saint_laurent',
        '/products?line=jil_sander',
        '/products?line=diesel',
        '/products?line=goyard',
        '/products?line=bottega_veneta',
        '/products?line=alexander_wang',
        '/products?line=gucci',
        '/products?line=valentino',
        '/products?line=drew_house',
        '/products?line=furla',
        '/products?line=ambush',
        '/products?line=celine',
        '/products?line=fendi',
        '/products?line=a.p.c.',
        '/products?line=manolo_blahnik',
        '/products?line=calvin_klein',
        '/products?line=cactus_jack_by_travis_scott',
        '/products?line=stüssy'];

    const amountsBrandsM = [
        "104к лотов",
        "16'200 лотов",
        "10'200 лотов",
        "7'800 лотов",
        "16'500 лотов",
        "1'800 лотов",
        "19'200 лотов",
        "23'700 лотов",
        "12'300 лотов",
        "24'300 лотов",
        "23'400 лотов",
        "2'700 лотов",
        "4'800 лотов",
        "900 лотов",
        "14'100 лотов",
        "23'100 лотов",
        "3'900 лотов",
        "11'400 лотов",
        "33'900 лотов",
        "1'000 лотов",
        "22'800 лотов",
        "56'700 лотов",
        "14'700 лотов",
        "2'100 лотов",
        "11'700 лотов",
        "2'400 лотов",
        "14'400 лотов",
        "700 лотов",
        "24'600 лотов",
        "9'900 лотов",
        "21'600 лотов",
        "4'200 лотов",
        "1'200 лотов",
        "4'500 лотов",
        "4'800 лотов",
        "1'500 лотов",
        "12'000 лотов",
        "1'000 лотов",
        "5'400 лотов",
        "9'000 лотов",
        "1'000 лотов",
        "1'200 лотов",
        "1'400 лотов",
        "5'100 лотов",
        "1'100 лотов",
        "19'800 лотов",
        "8'700 лотов",
        "8'700 лотов",
        "900 лотов",
        "29'700 лотов",
        "19'500 лотов",
        "45'900 лотов",
        "1'200 лотов",
        "900 лотов",
        "3'000 лотов",
        "3'000 лотов",
        "12'300 лотов",
        "19'500 лотов",
        "4'200 лотов",
        "2'100 лотов",
        "4'200 лотов",
        "22'800 лотов",
        "3'900 лотов"
    ];

    const amountsBrandsW = [
        "104к лотов",
        "16'200 лотов",
        "800 лотов",
        "7'800 лотов",
        "3'300 лотов",
        "1'800 лотов",
        "19'200 лотов",
        "23'700 лотов",
        "12'300 лотов",
        "24'300 лотов",
        "23'400 лотов",
        "11'700 лотов",
        "3'600 лотов",
        "6'000 лотов",
        "14'100 лотов",
        "23'100 лотов",
        "3'900 лотов",
        "700 лотов",
        "2'100 лотов",
        "1'300 лотов",
        "22'800 лотов",
        "56'700 лотов",
        "14'700 лотов",
        "6'600 лотов",
        "13'500 лотов",
        "900 лотов",
        "14'400 лотов",
        "800 лотов",
        "24'600 лотов",
        "10'200 лотов",
        "21'600 лотов",
        "17'700 лотов",
        "19'800 лотов",
        "4'500 лотов",
        "4'800 лотов",
        "1'500 лотов",
        "9'900 лотов",
        "1'000 лотов",
        "1'800 лотов",
        "12'900 лотов",
        "1'100 лотов",
        "1'000 лотов",
        "6'900 лотов",
        "5'700 лотов",
        "6'600 лотов",
        "23'400 лотов",
        "8'400 лотов",
        "8'700 лотов",
        "900 лотов",
        "29'700 лотов",
        "3'600 лотов",
        "45'900 лотов",
        "18'900 лотов",
        "900 лотов",
        "3'000 лотов",
        "3'000 лотов",
        "12'300 лотов",
        "19'500 лотов",
        "4'200 лотов",
        "900 лотов",
        "4'200 лотов",
        "900 лотов",
        "2'100 лотов"
    ];

    const textsLinesM = [
        'Air Jordan 1', 'Air Jordan 3', 'Air Jordan 4', 'Air Jordan 35', 'Air Jordan 36', 'Air Jordan 38', 'Yeezy 350', 'Yeezy 500', 'Yeezy 700', 'Asics', 'New Balance 550', 'NB 1906R', 'NB 9060', 'New Balance 327', 'New Balance 530', 'New Balance 574', 'NB 990', 'New Balance 993', 'New Balance 992', 'adidas Samba', 'Human Race', 'adidas Campus', 'adidas Gazelle', 'adidas Forum', 'Yeezy 380', 'Yeezy 450', 'Yeezy 750', 'Foam Runner', 'Yeezy Slide', 'Air Uptempo', 'adidas NMD', 'Stan Smith', 'Ultraboost', 'adidas Superstar', 'Nike Dunk', 'Nike Air Force 1', 'Nike Air Max 1', 'Nike Air Max 90', 'Nike Blazer', 'Nike Zoom', 'Nike Cortez', 'Nike Kobe', 'Nike LeBron', 'Nike Kyrie', 'NB 2002R', 'Vans', 'Nike Air Max 95', 'Nike Air Max 98', 'Nike React', 'Nike KD', 'Nike Foamposite', 'Nike VaporMax', 'Nike Air Max 720', 'Nike Air Max 270', 'Nike Freak', 'Jordan Tatum', 'James Harden', 'Trae Young', 'Converse', 'Anta', 'Li-Ning', 'Under Armour', 'Nike Air Presto', 'Nike Air Trainer', 'Nike Air Max 97', 'New Balance 997', 'adidas Ozweego', 'adidas EQT'
    ];

    const textsLinesW = [
        'adidas Samba', 'adidas Gazelle', 'adidas Campus', 'adidas Spezial', 'adidas Forum', 'Air Jordan 1 Low', 'Air Jordan 1 Mid', 'Air Jordan 1 High', 'New Balance 530', 'New Balance 550', 'NB 990', 'NB 1906R', 'adidas SL', 'Run Star', 'adidas Falcon', 'Stan Smith', 'Air Jordan 4', 'Air Jordan 3', 'New Balance 327', 'adidas Superstar', 'Nike Air Max 720', 'Nike Air Max 95', 'New Balance 993', 'Yeezy 700', 'Nike Dunk', 'Nike Air Force 1', 'Nike Zoom', 'Nike Cortez', 'Nike V2K', 'Nike Blazer', 'Nike Air Max 1', 'Nike Air Max 90', 'Converse', 'Vans Knu', 'NB 2002R', 'NB 9060', 'Foam Runner', 'Nike M2K', 'Yeezy 350', 'adidas NMD', 'Yeezy Slide', 'adidas Adilette', 'New Balance 574', 'Human Race', 'Nike Air Max 97', 'adidas Rivalry', 'Yeezy 380', 'Nike VaporMax'
    ];

    const linksLinesM = [
        "/products?line=air_jordan_1",
        "/products?line=air_jordan_3",
        "/products?line=air_jordan_4",
        "/products?line=air_jordan_35",
        "/products?line=air_jordan_36",
        "/products?line=air_jordan_38",
        "/products?line=adidas_yeezy_350",
        "/products?line=adidas_yeezy_500",
        "/products?line=adidas_yeezy_700",
        "/products?line=asics&category=shoes_category",
        "/products?line=new_balance_550",
        "/products?line=new_balance_1906r",
        "/products?line=new_balance_9060",
        "/products?line=new_balance_327",
        "/products?line=new_balance_530",
        "/products?line=new_balance_574",
        "/products?line=new_balance_990",
        "/products?line=new_balance_993",
        "/products?line=new_balance_992",
        "/products?line=adidas_samba",
        "/products?line=adidas_human_race",
        "/products?line=adidas_campus",
        "/products?line=adidas_gazelle",
        "/products?line=adidas_forum",
        "/products?line=adidas_yeezy_380",
        "/products?line=adidas_yeezy_450",
        "/products?line=adidas_yeezy_750",
        "/products?line=adidas_yeezy_foam_runner",
        "/products?line=adidas_yeezy_slide",
        "/products?line=nike_air_more_uptempo",
        "/products?line=adidas_nmd",
        "/products?line=adidas_stan_smith",
        "/products?line=adidas_ultraboost",
        "/products?line=adidas_superstar",
        "/products?line=nike_dunk",
        "/products?line=nike_air_force_1",
        "/products?line=nike_air_max_1",
        "/products?line=nike_air_max_90",
        "/products?line=nike_blazer",
        "/products?line=nike_zoom",
        "/products?line=nike_cortez",
        "/products?line=nike_kobe_bryant",
        "/products?line=nike_lebron_james",
        "/products?line=nike_kyrie_irving",
        "/products?line=new_balance_2002r",
        "/products?line=vans&category=shoes_category",
        "/products?line=nike_air_max_95",
        "/products?line=nike_air_max_98",
        "/products?line=nike_react",
        "/products?line=nike_kd_(kevin_durant)",
        "/products?line=nike_foamposite",
        "/products?line=nike_vapormax",
        "/products?line=nike_air_max_720",
        "/products?line=nike_air_max_270",
        "/products?line=nike_freak_(giannis_antetokounmpo)",
        "/products?line=jordan_tatum",
        "/products?line=adidas_harden",
        "/products?line=adidas_trae_young",
        "/products?line=converse&category=shoes_category",
        "/products?line=anta&category=shoes_category",
        "/products?line=li-ning&category=shoes_category",
        "/products?line=under_armour&category=shoes_category",
        "/products?line=nike_air_presto",
        "/products?line=nike_air_trainer",
        "/products?line=nike_air_max_97",
        "/products?line=new_balance_997",
        "/products?line=adidas_ozweego",
        "/products?line=adidas_eqt"
    ];

    const linksLinesW = [
        "/products?line=adidas_samba",
        "/products?line=adidas_gazelle",
        "/products?line=adidas_campus",
        "/products?line=adidas_spezial",
        "/products?line=adidas_forum",
        "/products?line=air_jordan_1_low",
        "/products?line=air_jordan_1_mid",
        "/products?line=air_jordan_1_high",
        "/products?line=new_balance_530",
        "/products?line=new_balance_550",
        "/products?line=new_balance_990",
        "/products?line=new_balance_1906r",
        "/products?line=adidas_sl",
        "/products?line=converse_run_star",
        "/products?line=adidas_falcon",
        "/products?line=adidas_stan_smith",
        "/products?line=air_jordan_4",
        "/products?line=air_jordan_3",
        "/products?line=new_balance_327",
        "/products?line=adidas_superstar",
        "/products?line=nike_air_max_720",
        "/products?line=nike_air_max_95",
        "/products?line=new_balance_993",
        "/products?line=adidas_yeezy_700",
        "/products?line=nike_dunk",
        "/products?line=nike_air_force_1",
        "/products?line=nike_zoom",
        "/products?line=nike_cortez",
        "/products?line=nike_v2k",
        "/products?line=nike_blazer",
        "/products?line=nike_air_max_1",
        "/products?line=nike_air_max_90",
        "/products?line=converse&category=shoes_category",
        "/products?line=vans_knu",
        "/products?line=new_balance_2002r",
        "/products?line=new_balance_9060",
        "/products?line=adidas_yeezy_foam_runner",
        "/products?line=nike_m2k",
        "/products?line=adidas_yeezy_350",
        "/products?line=adidas_nmd",
        "/products?line=adidas_yeezy_slide",
        "/products?line=adidas_adilette",
        "/products?line=new_balance_574",
        "/products?line=adidas_human_race",
        "/products?line=nike_air_max_97",
        "/products?line=adidas_rivalry",
        "/products?line=adidas_yeezy_380",
        "/products?line=nike_vapormax"
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
                             gridTemplateColumns: `repeat(${selectedGender === "M" ? 21 : 21}, 97px`,
                         }}>
                        {Array.from({length: selectedGender === "M" ? 63 : 63}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Link
                                        href={selectedGender === "M" ? linksBrandsM[idx] : linksBrandsW[idx]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/MainPage/PopularBrands/${idx + 1}.png`}
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

                <div className={styles.brandsSection}>
                    <div className={styles.brandsTitle}>ПОПУЛЯРНЫЕ ЛИНЕЙКИ</div>
                    <div className={styles.brandsGridCont}>
                        <div className={styles.brandsGrid2}
                             style={{
                                 gridTemplateColumns: `repeat(${selectedGender === "M" ? 34 : 24}, 97px`,
                             }}>
                            {Array.from({length: selectedGender === "M" ? 68 : 48}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle}>
                                        <Link
                                            href={selectedGender === "M" ? linksLinesM[idx] : linksLinesW[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Menu/PopularLines/${idx + 1}.png`}
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
                                        className={styles.circleText}>{selectedGender === "M" ? textsLinesM[idx] : textsLinesW[idx]}</div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.moreLines} onClick={() => handleOpenSection("sneakers")}>
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

                <div className={styles.centerButton}>
                    <Link
                        href={'/brands'}
                        onClick={handleClose}
                        style={{textDecoration: 'none'}}
                    >
                        Посмотреть все бренды
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default observer(CatalogBrandsMobile);