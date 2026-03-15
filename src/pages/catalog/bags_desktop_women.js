import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogBagsDesktopWomen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import arrow from "@/static/icons/arrowSlider.svg";
import Link from "next/link";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

const Bags_desktop_women = () => {
    const linksBrands = ['/products?line=dior&category=bags',
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

    const textsBrands = [
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
        "1'100 лотов",
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
        "1'100 лотов",
        "8'700 лотов",
        "1'200 лотов",
        "4'200 лотов",
        "8'100 лотов",
        "700 лотов",
        "34'800 лотов",
        "3'000 лотов",
        "6'300 лотов",
        "2'100 лотов",
        "3'000 лотов",
        "1'200 лотов",
        "9'900 лотов",
        "1'200 лотов",
        "1'100 лотов",
        "2'700 лотов",
        "1'200 лотов",
        "1'500 лотов",
        "900 лотов",
        "2'400 лотов",
        "900 лотов",
        "900 лотов",
        "700 лотов",
        "1'400 лотов",
        "4'500 лотов",
        "2'400 лотов",
        "1'500 лотов",
        "8'100 лотов",
        "1'800 лотов",
        "900 лотов",
        "1'200 лотов",
        "6'300 лотов",
        "6'000 лотов",
        "3'000 лотов",
        "1'100 лотов",
        "1'800 лотов",
        "1'400 лотов",
        "2'100 лотов",
        "1'200 лотов",
        "3'300 лотов",
        "3'600 лотов",
        "1'400 лотов",
        "6'300 лотов",
        "2'100 лотов",
        "1'500 лотов",
        "4'500 лотов",
        "1'800 лотов",
        "4'800 лотов",
        "1'300 лотов"
    ];

    const linksCategories = [
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
                    <div className={styles.title}>СУМКИ</div>
                    <div className={styles.viewAll}>
                        <Link
                            href={'/products?category=bags'}
                            style={{textDecoration: 'none', color: '#363636'}}
                        >
                            ПОСМОТРЕТЬ ВСЕ 100'000+ МОДЕЛЕЙ
                        </Link>
                    </div>
                </div>

                {/* Popular Brands */}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsTitle}>ПОПУЛЯРНЫЕ БРЕНДЫ</div>
                    <div className={styles.brandsGrid} ref={scrollableContainerRef}>
                        {Array.from({length: 72}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksBrands[idx]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Bags/Brands/${idx + 1}.png`}
                                            alt="Brand Image"
                                            className={styles.circleImage}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                </Link>
                                <div className={styles.circleText}>{textsBrands[idx]}</div>
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

                {/* Categories */}
                <div className={styles.categoriesSection}>
                    <div className={styles.categoriesTitle}>КАТЕГОРИИ</div>
                    <div className={styles.categoriesGrid}>
                        {['Все сумки', 'Сумки на пояс', 'Рюкзаки', 'Сумки тоуты', 'Сумки хобо', 'Сумки вёдра', 'Спортивные', 'Кошельки', 'Клатчи', 'Кардхолдеры', 'Косметички', 'Портфели', 'Чемоданы', 'Обложки'].map((category, idx) => (
                            <Link
                                href={linksCategories[idx]}
                                style={{flex: 1}}
                            >
                                <div key={idx} className={styles.categoryItem}>
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Women/Products/Bags/Categories/${idx + 1}.png`}
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
            </div>
        </MainLayout>
    );
};

export default observer(Bags_desktop_women);