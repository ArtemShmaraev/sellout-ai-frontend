import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogClothesDesktopMen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import arrow from "@/static/icons/arrowSlider.svg";
import Link from "next/link";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

const CatalogClothesDesktopWomen = () => {
    const linksBrands = ['/products?line=stüssy&category=clothes',
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

    const textsBrands = [
        "1'200 лотов",
        "6'900 лотов",
        "900 лотов",
        "3'900 лотов",
        "8'700 лотов",
        "7'200 лотов",
        "7'200 лотов",
        "1'300 лотов",
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
        "1'100 лотов",
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
        "1'500 лотов",
        "7'500 лотов",
        "1'500 лотов",
        "3'900 лотов",
        "2'100 лотов",
        "1'300 лотов",
        "6'600 лотов",
        "9'900 лотов",
        "7'500 лотов",
        "1'500 лотов",
        "10'200 лотов",
        "800 лотов",
        "1'400 лотов",
        "9'300 лотов",
        "9'900 лотов",
        "1'500 лотов",
        "24'000 лотов",
        "3'000 лотов",
        "1'500 лотов",
        "4'200 лотов",
        "1'300 лотов",
        "1'200 лотов"
    ];

    const linksCategories = [
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
                    <div className={styles.title}>ОДЕЖДА</div>
                    <div className={styles.viewAll}>
                        <Link
                            href={'/products?category=clothes'}
                            style={{textDecoration: 'none', color: '#363636'}}
                        >
                            ПОСМОТРЕТЬ ВСЕ 300'000+ МОДЕЛЕЙ
                        </Link>
                    </div>
                </div>

                {/* Popular Brands */}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsTitle}>ПОПУЛЯРНЫЕ БРЕНДЫ</div>
                    <div className={styles.brandsGrid} ref={scrollableContainerRef}>
                        {Array.from({length: 60}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksBrands[idx]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Men/Products/Clothes/Brands/${idx + 1}.png`}
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
                        {['Футболки', 'Худи', 'Шорты', 'Лонгсливы', 'Свитеры', 'Поло', 'Рубашки', 'Треники', 'Джинсы', 'Брюки'].map((category, idx) => (
                            <Link
                                href={linksCategories[idx]}
                                style={{flex: 1}}
                            >
                                <div key={idx} className={styles.categoryItem}>
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Men/Products/Clothes/Categories/${idx + 1}.png`}
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

                {/* Categories 2*/}
                <div className={styles.categoriesSection}>
                    <div className={styles.categoriesTitle2}>СПОРТИВНАЯ ОДЕЖДА</div>
                    <div className={styles.categoriesGrid}>
                        {['Вся', 'Баскет. джерси', 'Баскет. шорты', 'Футб. майки', 'Футб. шорты', 'Шорты', 'Майки'].map((category, idx) => (
                            <Link
                                href={linksCategories[idx + 10]}
                                style={{flex: 1}}
                            >
                                <div key={idx} className={styles.categoryItem}>
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Men/Products/Clothes/Categories/${idx + 1 + 10}.png`}
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

                {/* Categories 3*/}
                <div className={styles.categoriesSection}>
                    <div className={styles.categoriesTitle2}>ВЕРХНЯЯ ОДЕЖДА</div>
                    <div className={styles.categoriesGrid}>
                        {['Вся', 'Куртки', 'Ветровки', 'Жилетки', 'Пуховики', 'Пальто', 'Бейсбольные', 'Джинсовые', 'Кожаные', 'Плащи'].map((category, idx) => (
                            <Link
                                href={linksCategories[idx + 17]}
                                style={{flex: 1}}
                            >
                                <div key={idx} className={styles.categoryItem}>
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Men/Products/Clothes/Categories/${idx + 1 + 17}.png`}
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

                {/* Categories 4*/}
                <div className={styles.categoriesSection2}>
                    <div className={styles.categoriesSectionPart}>
                        <div className={styles.categoriesTitle2}>ХУДИ И ТОЛСТОВКИ</div>
                        <div className={styles.categoriesGrid}>
                            {['Все толстовки', 'С капюшоном', 'На молнии', 'Свитшоты'].map((category, idx) => (
                                <Link
                                    href={linksCategories[idx + 27]}
                                    style={{flex: 1}}
                                >
                                    <div key={idx} className={styles.categoryItem}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Men/Products/Clothes/Categories/${idx + 1 + 27}.png`}
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
                    <div className={styles.categoriesSectionPart}>
                        <div className={styles.categoriesTitle2}>СВИТЕРЫ И ТРИКОТАЖ</div>
                        <div className={styles.categoriesGrid}>
                            {['Все', 'Свитеры', 'Водолазки', 'Кардиганы'].map((category, idx) => (
                                <Link
                                    href={linksCategories[idx + 31]}
                                    style={{flex: 1}}
                                >
                                    <div key={idx} className={styles.categoryItem}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Men/Products/Clothes/Categories/${idx + 1 + 31}.png`}
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

                {/* Categories 5*/}
                <div className={styles.categoriesSection3}>
                    <div className={styles.categoriesGrid}>
                        {['Деним', 'Пиджаки', 'Костюмы', 'Зимние штаны', 'Плавки', 'Комбинезоны', 'Носки', 'Трусы'].map((category, idx) => (
                            <Link
                                href={linksCategories[idx + 35]}
                                style={{flex: 1}}
                            >
                                <div key={idx} className={styles.categoryItem}>
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Men/Products/Clothes/Categories/${idx + 1 + 35}.png`}
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

export default observer(CatalogClothesDesktopWomen);