import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogShoesDesktopMen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import arrow from "@/static/icons/arrowSlider.svg";
import Link from "next/link";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

const Shoes_desktop_men = () => {
    const linksBrands = ['/products?line=nike&category=shoes_category',
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

    const textsBrands = [
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
        "1'200 лотов",
        "3'900 лотов",
        "1'200 лотов",
        "2'400 лотов",
        "2'100 лотов",
        "700 лотов",
        "4'500 лотов",
        "2'700 лотов",
        "700 лотов"
    ];

    const linksCategories = [
        "/catalog/sneakers_desktop_men",
        "/products?category=loafers",
        "/products?category=slippers",
        "/products?category=slip_ons",
        "/products?category=winter_sneakers",
        "/products?category=boots",
        "/products?category=martins",
        "/products?category=timberlands",
        "/products?category=sandals",
        "/products?category=beach_sandals",
        "/products?category=mules_and_clogs"
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
                    <div className={styles.title}>ОБУВЬ</div>
                    <div className={styles.viewAll}>
                        <Link
                            href={'/products?category=shoes_category'}
                            style={{textDecoration: 'none', color: '#363636'}}
                        >
                            ПОСМОТРЕТЬ ВСЕ 400'000+ МОДЕЛЕЙ
                        </Link>
                    </div>
                </div>

                {/* Popular Brands */}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsTitle}>ПОПУЛЯРНЫЕ БРЕНДЫ</div>
                    <div className={styles.brandsGrid} ref={scrollableContainerRef}>
                        {Array.from({length: 28}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksBrands[idx]}
                                    style={{flex: 1}}
                                >
                                    <div className={styles.circle}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Men/Products/Shoes/Brands/${idx + 1}.png`}
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
                        {['Кроссовки', 'Лоферы', 'Шлёпки', 'Слипоны', 'Зимние кроссов..', 'Все ботинки', 'Мартинсы', 'Тимберленды', 'Сандалии', 'Пляжные санда..', 'Мюли'].map((category, idx) => (
                            <Link
                                href={linksCategories[idx]}
                                style={{flex: 1}}
                            >
                                <div key={idx} className={styles.categoryItem}>
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Men/Products/Shoes/Categories/${idx + 1}.png`}
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

export default observer(Shoes_desktop_men);