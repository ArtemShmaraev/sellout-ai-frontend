import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogSneakersDesktopWomen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import arrow from "@/static/icons/arrowSlider.svg";
import Link from "next/link";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

const Sneakers_desktop_women = () => {
    const linksCategories = [
        "/products?category=sneakers&category=canvas_shoes",
        "/products?category=sneakers",
        "/products?category=canvas_shoes",
        "/products?category=high_top_sneakers",
        "/products?category=low_top_sneakers",
        "/products?category=other_sport_shoes&category=basketball_sneakers"
    ];

    const linksBrands = [
        '/products?line=nike&category=sneakers&category=canvas_shoes',
        '/products?line=jordan&category=sneakers&category=canvas_shoes',
        '/products?line=vans&category=sneakers&category=canvas_shoes',
        '/products?line=li-ning&category=sneakers&category=canvas_shoes',
        '/products?line=off-white&category=sneakers&category=canvas_shoes',
        '/products?line=vetements&category=sneakers&category=canvas_shoes',
        '/products?line=balenciaga&category=sneakers&category=canvas_shoes',
        '/products?line=a_bathing_ape®&category=sneakers&category=canvas_shoes',
        '/products?line=asics&category=sneakers&category=canvas_shoes',
        '/products?line=puma&category=sneakers&category=canvas_shoes',
        '/products?line=maison_margiela&category=sneakers&category=canvas_shoes',
        '/products?line=gucci&category=sneakers&category=canvas_shoes',
        '/products?line=adidas&category=sneakers&category=canvas_shoes',
        '/products?line=new_balance&category=sneakers&category=canvas_shoes',
        '/products?line=converse&category=sneakers&category=canvas_shoes',
        '/products?line=under_armour&category=sneakers&category=canvas_shoes',
        '/products?line=alexander_mcqueen&category=sneakers&category=canvas_shoes',
        '/products?line=dior&category=sneakers&category=canvas_shoes',
        '/products?line=prada&category=sneakers&category=canvas_shoes',
        '/products?line=louis_vuitton&category=sneakers&category=canvas_shoes',
        '/products?line=reebok&category=sneakers&category=canvas_shoes',
        '/products?line=anta&category=sneakers&category=canvas_shoes',
        '/products?line=valentino&category=sneakers&category=canvas_shoes',
        '/products?line=lanvin&category=sneakers&category=canvas_shoes',
    ];

    const textsBrandsAdidas = [
        'adidas Samba', 'adidas Gazelle', 'adidas SL', 'Human Race', 'Yeezy 350', 'adidas Falcon', 'Yeezy 380', 'adidas adimatic', 'adidas 4D', 'adidas Adilette', 'Foam Runner', 'adidas Rivalry', 'Yeezy 450', 'adidas EQT', 'adidas Superstar', 'adidas Deerupt', 'adidas Ozelia', 'Damian Lillard', 'Derrick Rose', 'adidas Nizza', 'adidas Campus', 'adidas Spezial', 'adidas Forum', 'adidas NMD', 'Yeezy Slide', 'Stan Smith', 'Continental', 'Nite Jogger', 'Yeezy 500', 'Trae Young', 'adidas Ultraboost', 'James Harden', 'Yeezy 700', 'adidas Ozweego', 'adidas ZX', 'adidas Hamburg', 'adidas Tubular', 'Pro Bounce', 'adidas D.O.N', 'Yeezy 750'
    ];

    const linksAdidas = [
        "/products?line=adidas_samba",
        "/products?line=adidas_gazelle",
        "/products?line=adidas_sl",
        "/products?line=adidas_human_race",
        "/products?line=adidas_yeezy_350",
        "/products?line=adidas_falcon",
        "/products?line=adidas_yeezy_380",
        "/products?line=adidas_adimatic",
        "/products?line=adidas_4d",
        "/products?line=adidas_adilette",
        "/products?line=adidas_yeezy_foam_runner",
        "/products?line=adidas_rivalry",
        "/products?line=adidas_yeezy_450",
        "/products?line=adidas_eqt",
        "/products?line=adidas_superstar",
        "/products?line=adidas_deerupt",
        "/products?line=adidas_ozelia",
        "/products?line=adidas_dame_%28damian_lillard%29",
        "/products?line=adidas_d_rose",
        "/products?line=adidas_nizza",
        "/products?line=adidas_campus",
        "/products?line=adidas_spezial",
        "/products?line=adidas_forum",
        "/products?line=adidas_nmd",
        "/products?line=adidas_yeezy_slide",
        "/products?line=adidas_stan_smith",
        "/products?line=adidas_continental",
        "/products?line=adidas_nite_jogger",
        "/products?line=adidas_yeezy_500",
        "/products?line=adidas_trae_young",
        "/products?line=adidas_ultraboost",
        "/products?line=adidas_harden",
        "/products?line=adidas_yeezy_700",
        "/products?line=adidas_ozweego",
        "/products?line=adidas_zx",
        "/products?line=adidas_hamburg",
        "/products?line=adidas_tubular",
        "/products?line=adidas_pro_bounce",
        "/products?line=adidas_d.o.n",
        "/products?line=adidas_yeezy_750"];

    const textsBrandsNike = [
        'Nike Dunk', 'Nike Air Force 1', 'Nike Blazer', 'Nike Cortez', 'Nike Air Max 95', 'Nike Zoom', 'Air Monarch', 'Nike Air Max 720', 'Nike Foamposite', 'Air Huarache', 'Nike Court Vision', 'Kyrie Irving', 'Kevin Durant', 'Nike Air Max 270', 'Nike Air Flight', 'Nike Air Trainer', 'Air Max Plus', 'Air Uptempo', 'Nike Hyperdunk', 'Nike Blazer Low', 'Nike Dunk Low', 'Nike Dunk Mid', 'Nike Dunk High', 'Nike Air Max 1', 'Nike Air Max 90', 'Zoom Voomero', 'Nike V2K', 'Nike Air Max 97', 'Nike React', 'Nike M2K', 'Nike VaporMax', 'Nike Air Max 98', 'Air Max Fusion', 'Nike Waffle', 'LeBron James', 'Kobe Bryant', 'Nike Air Presto', 'Freak Giannis', 'Zoom G.T.', 'Ja Morant', 'Paul George', 'Court Borough', 'Nike Blazer Mid', 'Air Force 1 Low', 'Air Force 1 Mid', 'Air Force 1 High'
    ];

    const linksNike = [
        "/products?line=nike_dunk",
        "/products?line=nike_air_force_1",
        "/products?line=nike_blazer",
        "/products?line=nike_cortez",
        "/products?line=nike_air_max_95",
        "/products?line=nike_zoom",
        "/products?line=nike_air_monarch",
        "/products?line=nike_air_max_720",
        "/products?line=nike_foamposite",
        "/products?line=nike_air_huarache",
        "/products?line=nike_court_vision",
        "/products?line=nike_kyrie_irving",
        "/products?line=nike_kd_%28kevin_durant%29",
        "/products?line=nike_air_max_270",
        "/products?line=nike_air_flight",
        "/products?line=nike_air_trainer",
        "/products?line=nike_air_max_plus",
        "/products?line=nike_air_more_uptempo",
        "/products?line=nike_hyperdunk",
        "/products?line=nike_blazer_low",
        "/products?line=nike_dunk_low",
        "/products?line=nike_dunk_mid",
        "/products?line=nike_dunk_high",
        "/products?line=nike_air_max_1",
        "/products?line=nike_air_max_90",
        "/products?line=nike_air_zoom_voomero",
        "/products?line=nike_v2k",
        "/products?line=nike_air_max_97",
        "/products?line=nike_react",
        "/products?line=nike_m2k",
        "/products?line=nike_vapormax",
        "/products?line=nike_air_max_98",
        "/products?line=nike_air_max_fusion",
        "/products?line=nike_waffle",
        "/products?line=nike_lebron_james",
        "/products?line=nike_kobe_bryant",
        "/products?line=nike_air_presto",
        "/products?line=nike_freak_%28giannis_antetokounmpo%29",
        "/products?line=nike_air_zoom_g.t.",
        "/products?line=nike_ja_morant",
        "/products?line=nike_pg_%28paul_george%29",
        "/products?line=nike_court_borough",
        "/products?line=nike_blazer_mid",
        "/products?line=nike_air_force_1_low",
        "/products?line=nike_air_force_1_mid",
        "/products?line=nike_air_force_1_high"];

    const textsBrandsJordan = [
        'Air Jordan 1 High', 'Air Jordan 1 Mid', 'Air Jordan 1 Low', 'Air Jordan 5', 'Air Jordan 7', 'Air Jordan 11', 'Air Jordan 13', 'Air Jordan 32', 'Air Jordan 33', 'Air Jordan 34', 'Luka Doncic', 'Zion Williamson', 'Air Jordan 2', 'Air Jordan 3', 'Air Jordan 4', 'Air Jordan 6', 'Air Jordan 8', 'Air Jordan 12', 'Air Jordan 35', 'Air Jordan 36', 'Air Jordan 37', 'Air Jordan 38', 'Jayson Tatum', 'Why Not'
    ];

    const linksJordan = [
        "/products?line=air_jordan_1_high", "/products?line=air_jordan_1_mid", "/products?line=air_jordan_1_low", "/products?line=air_jordan_5", "/products?line=air_jordan_7", "/products?line=air_jordan_11", "/products?line=air_jordan_13", "/products?line=air_jordan_32", "/products?line=air_jordan_33", "/products?line=air_jordan_34", "/products?line=jordan_luka", "/products?line=jordan_zion", "/products?line=air_jordan_2", "/products?line=air_jordan_3", "/products?line=air_jordan_4", "/products?line=air_jordan_6", "/products?line=air_jordan_8", "/products?line=air_jordan_12", "/products?line=air_jordan_35", "/products?line=air_jordan_36", "/products?line=air_jordan_37", "/products?line=air_jordan_38", "/products?line=jordan_tatum", "/products?line=jordan_why_not"];

    const textsBrandsNewBalance = [
        'New Balance 237', 'NB 2002R', 'New Balance 550', 'New Balance 530', 'New Balance 580', 'NB 57/40', 'New Balance 991', 'New Balance 993', 'New Balance 327', 'NB 1906R', 'NB 9060', 'New Balance 650', 'New Balance 574', 'New Balance 990', 'New Balance 992', 'New Balance 997'
    ];

    const linksNewBalance = [
        "/products?line=new_balance_237", "/products?line=new_balance_2002r", "/products?line=new_balance_550", "/products?line=new_balance_530", "/products?line=new_balance_580", "/products?line=new_balance_57%2F40", "/products?line=new_balance_991", "/products?line=new_balance_993", "/products?line=new_balance_327", "/products?line=new_balance_1906r", "/products?line=new_balance_9060", "/products?line=new_balance_650", "/products?line=new_balance_574", "/products?line=new_balance_990", "/products?line=new_balance_992", "/products?line=new_balance_997"];

    const textsBrandsConverse = [
        'Chuck Taylor', 'One Star', 'Converse BB', 'Pro Leather', 'Run Star'
    ];

    const linksConverse = [
        "/products?line=converse_chuck_taylor", "/products?line=converse_one_star", "/products?line=converse_all_star_pro_bb", "/products?line=converse_pro_leather", "/products?line=converse_chuck_taylor_run_star"];

    const textsBrandsVans = [
        'Vans Knu Skool', 'Vans Old Skool', 'Vans Half Cab', 'Vans ComfyCush', 'Vans Style 36', 'Vans SK8', 'Vans Era', 'Vans Slip-on', 'Vans Authentic', 'Vans Ward'
    ];

    const linksVans = [
        "/products?line=vans_knu", "/products?line=vans_old_skool", "/products?line=vans_half_cab", "/products?line=vans_comfycush", "/products?line=vans_style_36", "/products?line=vans_sk8", "/products?line=vans_era", "/products?line=vans_slip-on", "/products?line=vans_authentic", "/products?line=vans_ward"];

    const textsBrandsPuma = [
        'Puma MB', 'Ralph Sampson', 'Puma Mirage', 'Puma Suede', 'Puma Smash', 'Puma Ca Pro', 'Puma Slipstream', 'Puma RS', 'Puma Fusion', 'Future Rider', 'Puma Cali', 'Puma Roma', 'Puma Clyde', 'Puma Mayze', 'Puma Carina', 'Puma Ignite'
    ];

    const linksPuma = [
        "/products?line=puma_mb", "/products?line=puma_ralph_sampson", "/products?line=puma_mirage", "/products?line=puma_suede", "/products?line=puma_smash", "/products?line=puma_ca_pro", "/products?line=puma_slipstream", "/products?line=puma_rs", "/products?line=puma_fusion", "/products?line=puma_future_rider", "/products?line=puma_cali", "/products?line=puma_roma", "/products?line=puma_clyde", "/products?line=puma_mayze", "/products?line=puma_carina", "/products?line=puma_ignite"];

    const textsBrandsAsics = [
        'Asics Gel-NYC', 'Asics Gel-Lyte', 'Magic Speed', 'Asics Gel-Kahana', 'Gel-Cumulus', 'Gel-Contend', 'Asics Gel-Kayano', 'Asics Gel-1130', 'Gel-Quantum', 'Asics Gel-Nimbus', 'Asics Gel-Flux', 'Asics Gel-1090', 'Asics Gel-Excite', 'Asics GT'
    ];

    const linksAsics = [
        "/products?line=asics_gel-nyc", "/products?line=asics_gel-lyte", "/products?line=asics_magic_speed", "/products?line=asics_gel-kahana", "/products?line=asics_gel-cumulus", "/products?line=asics_gel-contend", "/products?line=asics_gel-kayano", "/products?line=asics_gel-1130", "/products?line=asics_gel-quantum", "/products?line=asics_gel-nimbus", "/products?line=asics_gel-flux", "/products?line=asics_gel-1090", "/products?line=asics_gel-excite", "/products?line=asics_gt"];

    const textsBrandsReebok = [
        'Reebok Club', 'Classic Leather', 'Instapump Fury', 'Reebok Workout', 'Zig Kinetica', 'Reebok Question'
    ];

    const linksReebok = [
        "/products?line=reebok_club", "/products?line=reebok_classic_leather", "/products?line=reebok_instapump_fury", "/products?line=reebok_workout", "/products?line=reebok_zig_kinetica", "/products?line=reebok_question"];

    const textsBrandsAnta = [
        'Anta KT3', 'Anta KT7', 'Anta KT8'
    ];

    const linksAnta = [
        "/products?line=anta_kt3", "/products?line=anta_kt7", "/products?line=anta_kt8"];

    const textsBrandsLiNing = [
        'Way Of Wade', 'Yushuai', 'Sonic', 'Speed'
    ];

    const linksLiNing = [
        "/products?line=li-ning_way_of_wade", "/products?line=li-ning_yushuai", "/products?line=li-ning_sonic", "/products?line=li-ning_speed"];

    const textsBrandsUA = [
        'UA Curry 4', 'UA Curry 6', 'UA Curry 7', 'UA Curry 1', 'UA Curry 2', 'UA Curry 8', 'UA Curry 9', 'UA Curry 10', 'UA Curry 3', 'UA Curry 5'
    ];

    const linksUA = [
        "/products?line=under_armour_curry_4", "/products?line=under_armour_curry_6", "/products?line=under_armour_curry_7", "/products?line=under_armour_curry_1", "/products?line=under_armour_curry_2", "/products?line=under_armour_curry_8", "/products?line=under_armour_curry_9", "/products?line=under_armour_curry_10", "/products?line=under_armour_curry_3", "/products?line=under_armour_curry_5"];


    const textsBrands = [
        "32'400 лотов",
        "6'000 лотов",
        "7'200 лотов",
        "1'100 лотов",
        "2'100 лотов",
        "1'300 лотов",
        "1'800 лотов",
        "1'500 лотов",
        "11'700 лотов",
        "9'000 лотов",
        "1'200 лотов",
        "1'200 лотов",
        "25'800 лотов",
        "9'000 лотов",
        "4'800 лотов",
        "1'500 лотов",
        "1'800 лотов",
        "900 лотов",
        "900 лотов",
        "1'100 лотов",
        "3'900 лотов",
        "1'100 лотов",
        "1'800 лотов",
        "900 лотов"
    ];

    const scrollAmount = 400;
    const numRefs = 13;  // Количество рефов

    // Создаём массив рефов
    const scrollableContainerRefs = useRef([]);
    const [noArrows, setNoArrows] = useState(Array(numRefs).fill(true));  // По умолчанию стрелки скрыты для всех

    // Функция для скроллинга влево
    const scrollLeft = (index) => {
        if (scrollableContainerRefs.current[index]) {
            scrollableContainerRefs.current[index].scrollTo({
                left: scrollableContainerRefs.current[index].scrollLeft - scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    // Функция для скроллинга вправо
    const scrollRight = (index) => {
        if (scrollableContainerRefs.current[index]) {
            scrollableContainerRefs.current[index].scrollTo({
                left: scrollableContainerRefs.current[index].scrollLeft + scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    // Проверяем ширину и устанавливаем видимость стрелок
    useEffect(() => {
        const handleResize = () => {
            const newNoArrows = scrollableContainerRefs.current.map((ref, idx) => {
                if (ref) {
                    const scrollableWidth = ref.scrollWidth;
                    const visibleWidth = ref.clientWidth;
                    return scrollableWidth <= visibleWidth; // Если контент помещается, скрываем стрелки
                }
                return true;
            });
            setNoArrows(newNoArrows);
        };

        // Проверка при загрузке и изменении размера окна
        handleResize();
        window.addEventListener('resize', handleResize);

        // Очистка обработчика при размонтировании компонента
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const router = useRouter();

    const selectedGender = Cookies.get('selected_gender')

    const handleClose = () => {
        const previousUrl = document.referrer;

        if (previousUrl && new URL(previousUrl).hostname === window.location.hostname) {
            router.back(); // Если реферер — это ваш сайт, вернуться назад
        } else {
            router.push(selectedGender === "M" ? '/men' : selectedGender === "F" ? '/women' : '/');
        }
    };
    return (
        <MainLayout>
            <div className={styles.catalogContainer}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.closeButton} onClick={handleClose}>✕</div>
                    <div className={styles.title}>КРОССОВКИ И КЕДЫ</div>
                    <div className={styles.viewAll}>
                        <Link
                            href={'/products?category=sneakers&category=canvas_shoes'}
                            style={{textDecoration: 'none', color: '#363636'}}
                        >
                            ПОСМОТРЕТЬ ВСЕ 250'000+ МОДЕЛЕЙ
                        </Link>
                    </div>
                </div>

                {/* Categories */}
                <div className={styles.categoriesSection}>
                    <div className={styles.categoriesTitle}>КАТЕГОРИИ</div>
                    <div className={styles.categoriesGrid}>
                        {['Все кроссовки и кеды', 'Кроссовки', 'Кеды', 'Высокие кроссовки', 'Низкие кроссовки', 'Кроссовки для спорта'].map((category, idx) => (
                            <Link
                                href={linksCategories[idx]}
                                style={{flex: 1}}
                            >
                                <div key={idx} className={styles.categoryItem}>
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Categories/${idx + 1}.png`}
                                        alt={category}
                                        width={700}
                                        height={700}
                                        className={styles.categoryImage}
                                        quality={100}
                                    />
                                    <div className={styles.categoryText}>
                                        {category}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Popular Brands */}
                <div className={styles.brandsSection1}>
                    <div className={styles.brandsTitle1}>ПОПУЛЯРНЫЕ БРЕНДЫ</div>
                    <div className={styles.brandsGrid11} ref={(el) => scrollableContainerRefs.current[0] = el}>
                        {Array.from({length: 24}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle1}>
                                <Link
                                    href={linksBrands[idx]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle1}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Brands/${idx + 1}.png`}
                                            alt="Brand Image"
                                            className={styles.circleImage1}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                </Link>
                                <div className={styles.circleText1}>{textsBrands[idx]}</div>
                            </div>
                        ))}
                    </div>
                    {!noArrows[0] &&
                        <button className={styles.left} onClick={() => scrollLeft(0)} style={{zIndex: 2}}>
                            <Image src={arrow} alt='' style={{transform: 'rotate(180deg)'}}/>
                        </button>
                    }
                    {!noArrows[0] &&
                        <button className={styles.right} onClick={() => scrollRight(0)} style={{zIndex: 2}}>
                            <Image src={arrow} alt=''/>
                        </button>
                    }
                </div>

                <div className={styles.categoriesTitle2}>ПОПУЛЯРНЫЕ ЛИНЕЙКИ</div>

                {/* Popular Brands adidas*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Link
                            href={'/products?category=sneakers&line=adidas'}
                            style={{flex: 1}}
                        >
                            <Image
                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Photos/1.png`}
                                alt=''
                                width={1000}
                                height={1000}
                                style={{width: '340px', height: 'auto'}}
                                className={styles.brandsPhoto}
                            />
                        </Link>
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid4}`}
                         ref={(el) => scrollableContainerRefs.current[4] = el}>
                        {Array.from({length: 40}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksAdidas[idx]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/adidas/${idx + 1}.png`}
                                            alt="Brand Image"
                                            className={styles.circleImage}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                </Link>
                                <div className={styles.circleText}>{textsBrandsAdidas[idx]}</div>
                            </div>
                        ))}
                    </div>
                    {!noArrows[4] &&
                        <button className={styles.left} onClick={() => scrollLeft(4)} style={{zIndex: 2}}>
                            <Image src={arrow} alt='' style={{transform: 'rotate(180deg)'}}/>
                        </button>
                    }
                    {!noArrows[4] &&
                        <button className={styles.right} onClick={() => scrollRight(4)} style={{zIndex: 2}}>
                            <Image
                                src={arrow}
                                alt=''
                            />
                        </button>
                    }
                </div>

                {/* Popular Brands Nike*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Link
                            href={'/products?category=sneakers&line=nike'}
                            style={{flex: 1}}
                        >
                            <Image
                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Photos/2.png`}
                                alt=''
                                width={1000}
                                height={1000}
                                style={{width: '340px', height: 'auto'}}
                                className={styles.brandsPhoto}
                            />
                        </Link>
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid1}`}
                         ref={(el) => scrollableContainerRefs.current[1] = el}>
                        {Array.from({length: 46}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksNike[idx]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Nike/${idx + 1}.png`}
                                            alt="Brand Image"
                                            className={styles.circleImage}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                </Link>
                                <div className={styles.circleText}>{textsBrandsNike[idx]}</div>
                            </div>
                        ))}
                    </div>
                    {!noArrows[1] &&
                        <button className={styles.left} onClick={() => scrollLeft(1)} style={{zIndex: 2}}>
                            <Image src={arrow} alt='' style={{transform: 'rotate(180deg)'}}/>
                        </button>
                    }
                    {!noArrows[1] &&
                        <button className={styles.right} onClick={() => scrollRight(1)} style={{zIndex: 2}}>
                            <Image
                                src={arrow}
                                alt=''
                            />
                        </button>
                    }
                </div>

                {/* Popular Brands Jordan*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Link
                            href={'/products?category=sneakers&line=jordan'}
                            style={{flex: 1}}
                        >
                            <Image
                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Photos/3.png`}
                                alt=''
                                width={1000}
                                height={1000}
                                style={{width: '340px', height: 'auto'}}
                                className={styles.brandsPhoto}
                            />
                        </Link>
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid2}`}
                         ref={(el) => scrollableContainerRefs.current[2] = el}>
                        {Array.from({length: 24}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksJordan[idx]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Jordan/${idx + 1}.png`}
                                            alt="Brand Image"
                                            className={styles.circleImage}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                </Link>
                                <div className={styles.circleText}>{textsBrandsJordan[idx]}</div>
                            </div>
                        ))}
                    </div>
                    {!noArrows[2] &&
                        <button className={styles.left} onClick={() => scrollLeft(2)} style={{zIndex: 2}}>
                            <Image src={arrow} alt='' style={{transform: 'rotate(180deg)'}}/>
                        </button>
                    }
                    {!noArrows[2] &&
                        <button className={styles.right} onClick={() => scrollRight(2)} style={{zIndex: 2}}>
                            <Image
                                src={arrow}
                                alt=''
                            />
                        </button>
                    }
                </div>

                {/* Popular Brands NB*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Link
                            href={'/products?category=sneakers&line=new_balance'}
                            style={{flex: 1}}
                        >
                            <Image
                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Photos/4.png`}
                                alt=''
                                width={1000}
                                height={1000}
                                style={{width: '430px', height: 'auto'}}
                                className={styles.brandsPhoto}
                            />
                        </Link>
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid3}`}
                         ref={(el) => scrollableContainerRefs.current[3] = el}>
                        {Array.from({length: 16}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksNewBalance[idx]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/New Balance/${idx + 1}.png`}
                                            alt="Brand Image"
                                            className={styles.circleImage}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                </Link>
                                <div className={styles.circleText}>{textsBrandsNewBalance[idx]}</div>
                            </div>
                        ))}
                    </div>
                    {!noArrows[3] &&
                        <button className={styles.left} onClick={() => scrollLeft(3)} style={{zIndex: 2}}>
                            <Image src={arrow} alt='' style={{transform: 'rotate(180deg)'}}/>
                        </button>
                    }
                    {!noArrows[3] &&
                        <button className={styles.right} onClick={() => scrollRight(3)} style={{zIndex: 2}}>
                            <Image
                                src={arrow}
                                alt=''
                            />
                        </button>
                    }
                </div>

                {/* Popular Brands Converse*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Link
                            href={'/products?category=sneakers&line=converse'}
                            style={{flex: 1}}
                        >
                            <Image
                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Photos/5.png`}
                                alt=''
                                width={1000}
                                height={1000}
                                style={{width: '430px', height: 'auto'}}
                                className={styles.brandsPhoto}
                            />
                        </Link>
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid7}`}
                         ref={(el) => scrollableContainerRefs.current[7] = el}>
                        {Array.from({length: 5}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksConverse[idx]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Converse/${idx + 1}.png`}
                                            alt="Brand Image"
                                            className={styles.circleImage}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                </Link>
                                <div className={styles.circleText}>{textsBrandsConverse[idx]}</div>
                            </div>
                        ))}
                    </div>
                    {!noArrows[7] &&
                        <button className={styles.left} onClick={() => scrollLeft(7)} style={{zIndex: 2}}>
                            <Image src={arrow} alt='' style={{transform: 'rotate(180deg)'}}/>
                        </button>
                    }
                    {!noArrows[7] &&
                        <button className={styles.right} onClick={() => scrollRight(7)} style={{zIndex: 2}}>
                            <Image
                                src={arrow}
                                alt=''
                            />
                        </button>
                    }
                </div>

                {/* Popular Brands Vans*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Link
                            href={'/products?category=sneakers&line=vans'}
                            style={{flex: 1}}
                        >
                            <Image
                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Photos/6.png`}
                                alt=''
                                width={1000}
                                height={1000}
                                style={{width: '430px', height: 'auto'}}
                                className={styles.brandsPhoto}
                            />
                        </Link>
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid5}`}
                         ref={(el) => scrollableContainerRefs.current[5] = el}>
                        {Array.from({length: 10}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksVans[idx]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Vans/${idx + 1}.png`}
                                            alt="Brand Image"
                                            className={styles.circleImage}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                </Link>
                                <div className={styles.circleText}>{textsBrandsVans[idx]}</div>
                            </div>
                        ))}
                    </div>
                    {!noArrows[5] &&
                        <button className={styles.left} onClick={() => scrollLeft(5)} style={{zIndex: 2}}>
                            <Image src={arrow} alt='' style={{transform: 'rotate(180deg)'}}/>
                        </button>
                    }
                    {!noArrows[5] &&
                        <button className={styles.right} onClick={() => scrollRight(5)} style={{zIndex: 2}}>
                            <Image
                                src={arrow}
                                alt=''
                            />
                        </button>
                    }
                </div>

                {/* Popular Brands Puma*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Link
                            href={'/products?category=sneakers&line=puma'}
                            style={{flex: 1}}
                        >
                            <Image
                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Photos/7.png`}
                                alt=''
                                width={1000}
                                height={1000}
                                style={{width: '430px', height: 'auto'}}
                                className={styles.brandsPhoto}
                            />
                        </Link>
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid10}`}
                         ref={(el) => scrollableContainerRefs.current[10] = el}>
                        {Array.from({length: 16}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksPuma[idx]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Puma/${idx + 1}.png`}
                                            alt="Brand Image"
                                            className={styles.circleImage}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                </Link>
                                <div className={styles.circleText}>{textsBrandsPuma[idx]}</div>
                            </div>
                        ))}
                    </div>
                    {!noArrows[10] &&
                        <button className={styles.left} onClick={() => scrollLeft(10)} style={{zIndex: 2}}>
                            <Image src={arrow} alt='' style={{transform: 'rotate(180deg)'}}/>
                        </button>
                    }
                    {!noArrows[10] &&
                        <button className={styles.right} onClick={() => scrollRight(10)} style={{zIndex: 2}}>
                            <Image
                                src={arrow}
                                alt=''
                            />
                        </button>
                    }
                </div>

                {/* Popular Brands Asics*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Link
                            href={'/products?category=sneakers&line=asics'}
                            style={{flex: 1}}
                        >
                            <Image
                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Photos/8.png`}
                                alt=''
                                width={1000}
                                height={1000}
                                style={{width: '430px', height: 'auto'}}
                                className={styles.brandsPhoto}
                            />
                        </Link>
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid6}`}
                         ref={(el) => scrollableContainerRefs.current[6] = el}>
                        {Array.from({length: 14}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksAsics[idx]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Asics/${idx + 1}.png`}
                                            alt="Brand Image"
                                            className={styles.circleImage}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                </Link>
                                <div className={styles.circleText}>{textsBrandsAsics[idx]}</div>
                            </div>
                        ))}
                    </div>
                    {!noArrows[6] &&
                        <button className={styles.left} onClick={() => scrollLeft(6)} style={{zIndex: 2}}>
                            <Image src={arrow} alt='' style={{transform: 'rotate(180deg)'}}/>
                        </button>
                    }
                    {!noArrows[6] &&
                        <button className={styles.right} onClick={() => scrollRight(6)} style={{zIndex: 2}}>
                            <Image
                                src={arrow}
                                alt=''
                            />
                        </button>
                    }
                </div>

                {/* Popular Brands Reebok*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Link
                            href={'/products?category=sneakers&line=reebok'}
                            style={{flex: 1}}
                        >
                            <Image
                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Photos/9.png`}
                                alt=''
                                width={1000}
                                height={1000}
                                style={{width: '430px', height: 'auto'}}
                                className={styles.brandsPhoto}
                            />
                        </Link>
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid11_}`}
                         ref={(el) => scrollableContainerRefs.current[11] = el}>
                        {Array.from({length: 6}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksReebok[idx]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Reebok/${idx + 1}.png`}
                                            alt="Brand Image"
                                            className={styles.circleImage}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                </Link>
                                <div className={styles.circleText}>{textsBrandsReebok[idx]}</div>
                            </div>
                        ))}
                    </div>
                    {!noArrows[11] &&
                        <button className={styles.left} onClick={() => scrollLeft(11)} style={{zIndex: 2}}>
                            <Image src={arrow} alt='' style={{transform: 'rotate(180deg)'}}/>
                        </button>
                    }
                    {!noArrows[11] &&
                        <button className={styles.right} onClick={() => scrollRight(11)} style={{zIndex: 2}}>
                            <Image
                                src={arrow}
                                alt=''
                            />
                        </button>
                    }
                </div>


                {/* Popular Brands Anta*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Link
                            href={'/products?category=sneakers&line=anta'}
                            style={{flex: 1}}
                        >
                            <Image
                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Photos/10.png`}
                                alt=''
                                width={1000}
                                height={1000}
                                style={{width: '430px', height: 'auto'}}
                                className={styles.brandsPhoto}
                            />
                        </Link>
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid8}`}
                         ref={(el) => scrollableContainerRefs.current[8] = el}>
                        {Array.from({length: 3}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksAnta[idx]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Anta/${idx + 1}.png`}
                                            alt="Brand Image"
                                            className={styles.circleImage}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                </Link>
                                <div className={styles.circleText}>{textsBrandsAnta[idx]}</div>
                            </div>
                        ))}
                    </div>
                    {!noArrows[8] &&
                        <button className={styles.left} onClick={() => scrollLeft(8)} style={{zIndex: 2}}>
                            <Image src={arrow} alt='' style={{transform: 'rotate(180deg)'}}/>
                        </button>
                    }
                    {!noArrows[8] &&
                        <button className={styles.right} onClick={() => scrollRight(8)} style={{zIndex: 2}}>
                            <Image
                                src={arrow}
                                alt=''
                            />
                        </button>
                    }
                </div>

                {/* Popular Brands Li-Ning*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Link
                            href={'/products?category=sneakers&line=li-ning'}
                            style={{flex: 1}}
                        >
                            <Image
                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Photos/11.png`}
                                alt=''
                                width={1000}
                                height={1000}
                                style={{width: '430px', height: 'auto'}}
                                className={styles.brandsPhoto}
                            />
                        </Link>
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid9}`}
                         ref={(el) => scrollableContainerRefs.current[9] = el}>
                        {Array.from({length: 4}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksLiNing[idx]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Li-Ning/${idx + 1}.png`}
                                            alt="Brand Image"
                                            className={styles.circleImage}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                </Link>
                                <div className={styles.circleText}>{textsBrandsLiNing[idx]}</div>
                            </div>
                        ))}
                    </div>
                    {!noArrows[9] &&
                        <button className={styles.left} onClick={() => scrollLeft(9)} style={{zIndex: 2}}>
                            <Image src={arrow} alt='' style={{transform: 'rotate(180deg)'}}/>
                        </button>
                    }
                    {!noArrows[9] &&
                        <button className={styles.right} onClick={() => scrollRight(9)} style={{zIndex: 2}}>
                            <Image
                                src={arrow}
                                alt=''
                            />
                        </button>
                    }
                </div>

                {/* Popular Brands Under Armour*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Link
                            href={'/products?category=sneakers&line=under_armour'}
                            style={{flex: 1}}
                        >
                            <Image
                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Photos/12.png`}
                                alt=''
                                width={1000}
                                height={1000}
                                style={{width: '430px', height: 'auto'}}
                                className={styles.brandsPhoto}
                            />
                        </Link>
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid12}`}
                         ref={(el) => scrollableContainerRefs.current[12] = el}>
                        {Array.from({length: 10}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksUA[idx]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Sneakers/Under Armour/${idx + 1}.png`}
                                            alt="Brand Image"
                                            className={styles.circleImage}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                </Link>
                                <div className={styles.circleText}>{textsBrandsUA[idx]}</div>
                            </div>
                        ))}
                    </div>
                    {!noArrows[12] &&
                        <button className={styles.left} onClick={() => scrollLeft(12)} style={{zIndex: 2}}>
                            <Image src={arrow} alt='' style={{transform: 'rotate(180deg)'}}/>
                        </button>
                    }
                    {!noArrows[12] &&
                        <button className={styles.right} onClick={() => scrollRight(12)} style={{zIndex: 2}}>
                            <Image
                                src={arrow}
                                alt=''
                            />
                        </button>
                    }
                </div>
            </div>
        </MainLayout>
    );
};

export default observer(Sneakers_desktop_women);