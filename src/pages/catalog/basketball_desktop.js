import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogBasketballDesktop.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import arrow from "@/static/icons/arrowSlider.svg";
import Link from "next/link";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

const Basketball_desktop = () => {
    const linksCategories = [
        "/products?category=basketball_sneakers",
        "/products?category=basketball_jerseys",
        "/products?category=basketball_shorts",
        "/products?category=basketballs",
        "/products?category=sport_clothes",
        "/products?category=sport_bags"
    ];

    const linksBrands = [
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

    const scrollableContainerRef = useRef(null);
    const scroll = 400

    const scrollLeft = () => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTo({
                left: scrollableContainerRef.current.scrollLeft - scroll,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTo({
                left: scrollableContainerRef.current.scrollLeft + scroll,
                behavior: 'smooth',
            });
        }
    };

    const [noArrows, setNoArrows] = useState(true);  // По умолчанию стрелки скрыты

    useEffect(() => {
        const handleResize = () => {
            if (scrollableContainerRef.current) {
                const scrollableWidth = scrollableContainerRef.current.scrollWidth;
                const visibleWidth = scrollableContainerRef.current.clientWidth;

                // Если содержимое шире контейнера, показываем стрелки
                if (scrollableWidth > visibleWidth) {
                    setNoArrows(false); // Показать стрелки
                } else {
                    setNoArrows(true);  // Скрыть стрелки
                }
            }
        };

        // Вызываем проверку при загрузке и при изменении размера окна
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
                    <div className={styles.title}>БАСКЕТБОЛ</div>
                    <div className={styles.viewAll}>
                        <Link
                            href={'/products?category=basketball_sneakers&category=basketball_jerseys&category=basketball_shorts&category=sport_vests&category=sport_shorts&category=sport_bags&category=basketballs'}
                            style={{textDecoration: 'none', color: '#363636'}}
                        >
                            ПОСМОТРЕТЬ ВСЕ 20'000+ МОДЕЛЕЙ
                        </Link>
                    </div>
                </div>

                {/* Categories */}
                <div className={styles.categoriesSection}>
                    <div className={styles.categoriesTitle}>КАТЕГОРИИ</div>
                    <div className={styles.categoriesGrid}>
                        {['Баскетбольные кроссовки', 'Баскетбольные джерси', 'Баскетбольные шорты', 'Баскетбольные мячи', 'Спортивная одежда', 'Спортивные сумки'].map((category, idx) => (
                            <Link
                                href={linksCategories[idx]}
                                style={{flex: 1}}
                            >
                                <div key={idx} className={styles.categoryItem}>
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Men/Products/Basketball/Categories/${idx + 1}.png`}
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

                <div className={styles.categoriesTitle2}>ПОПУЛЯРНЫЕ ЛИНЕЙКИ</div>

                {/* Popular Brands Nike*/}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsContainer}>
                        <div className={styles.brandsTitle}>NIKE</div>
                        <div className={styles.viewAll2}
                             style={{marginRight: "calc(max(0px,(100% - 8*100px - 7*17px)))"}}>
                            <Link
                                href={'/products?line=nike&category=basketball_sneakers'}
                                style={{textDecoration: 'none', color: '#3E3E3E'}}
                            >
                                Посмотреть все
                            </Link>
                        </div>
                    </div>

                    <div className={styles.brandsGrid}>
                        {Array.from({length: 8}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksBrands[idx]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Men/Products/Basketball/Nike/${idx + 1}.png`}
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
                </div>

                {/* Popular Brands Jordan*/}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsContainer}>
                        <div className={styles.brandsTitle}>JORDAN</div>
                        <div className={styles.viewAll2}
                             style={{marginRight: "calc(max(0px,(100% - 12*100px - 11*17px)))"}}>
                            <Link
                                href={'/products?line=jordan&category=basketball_sneakers'}
                                style={{textDecoration: 'none', color: '#3E3E3E'}}
                            >
                                Посмотреть все
                            </Link>
                        </div>
                    </div>

                    <div className={styles.brandsGrid} ref={scrollableContainerRef}>
                        {Array.from({length: 12}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksBrands[idx + 8]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Men/Products/Basketball/Jordan/${idx + 1}.png`}
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
                    {!noArrows &&
                        <button className={styles.left} onClick={scrollLeft} style={{zIndex: 2}}>
                            <Image src={arrow} alt='' style={{transform: 'rotate(180deg)'}}/>
                        </button>
                    }
                    {!noArrows &&
                        <button className={styles.right} onClick={scrollRight} style={{zIndex: 2}}>
                            <Image src={arrow} alt=''/>
                        </button>
                    }
                </div>

                {/* Popular Brands adidas*/}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsContainer}>
                        <div className={styles.brandsTitle}>ADIDAS</div>
                        <div className={styles.viewAll2}
                             style={{marginRight: "calc(max(0px,(100% - 4*100px - 3*17px)))"}}>
                            <Link
                                href={'/products?line=adidas&category=basketball_sneakers'}
                                style={{textDecoration: 'none', color: '#3E3E3E'}}
                            >
                                Посмотреть все
                            </Link>
                        </div>
                    </div>

                    <div className={styles.brandsGrid}>
                        {Array.from({length: 4}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksBrands[idx + 20]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Men/Products/Basketball/adidas/${idx + 1}.png`}
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
                </div>

                {/* Popular Brands Li-Ning*/}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsContainer}>
                        <div className={styles.brandsTitle}>LI-NING</div>
                        <div className={styles.viewAll2}
                             style={{marginRight: "calc(max(0px,(100% - 4*100px - 3*17px)))"}}>
                            <Link
                                href={'/products?line=li-ning&category=basketball_sneakers'}
                                style={{textDecoration: 'none', color: '#3E3E3E'}}
                            >
                                Посмотреть все
                            </Link>
                        </div>
                    </div>

                    <div className={styles.brandsGrid}>
                        {Array.from({length: 4}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksBrands[idx + 24]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Men/Products/Basketball/Li-Ning/${idx + 1}.png`}
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
                </div>

                {/* Popular Brands Другие*/}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsContainer}>
                        <div className={styles.brandsTitle}>ДРУГИЕ БРЕНДЫ</div>
                    </div>

                    <div className={styles.brandsGrid}>
                        {Array.from({length: 8}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksBrands[idx + 28]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Men/Products/Basketball/OtherBrands/${idx + 1}.png`}
                                            alt="Brand Image"
                                            className={styles.circleImage}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                </Link>
                                <div className={styles.circleText}>{textsBrandsOther[idx]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default observer(Basketball_desktop);