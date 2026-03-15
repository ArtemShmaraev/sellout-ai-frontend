import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogAccessoriesDesktopMen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import arrow from "@/static/icons/arrowSlider.svg";
import Link from "next/link";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

const Accessories_desktop_men = () => {
    const linksBrands = ['/products?line=nike&category=accessories',
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

    const textsBrands = [
        "6'300 лотов",
        "900 лотов",
        "1'100 лотов",
        "3'000 лотов",
        "2'100 лотов",
        "1'400 лотов",
        "4'800 лотов",
        "1'000 лотов",
        "900 лотов",
        "3'000 лотов",
        "1'800 лотов",
        "5'700 лотов",
        "900 лотов",
        "4'200 лотов",
        "6'300 лотов",
        "900 лотов",
        "1'200 лотов",
        "2'100 лотов",
        "1'100 лотов",
        "4'200 лотов",
        "700 лотов",
        "900 лотов",
        "1'200 лотов",
        "5'100 лотов",
        "7'500 лотов",
        "5'700 лотов",
        "6'300 лотов",
        "900 лотов",
        "1'300 лотов",
        "1'300 лотов",
        "1'400 лотов",
        "1'400 лотов",
        "3'300 лотов",
        "1'000 лотов",
        "900 лотов",
        "1'000 лотов",
        "1'200 лотов",
        "1'400 лотов",
        "900 лотов",
        "1'500 лотов",
        "700 лотов",
        "1'400 лотов",
        "1'200 лотов",
        "15'300 лотов",
        "2'400 лотов",
        "1'000 лотов",
        "2'100 лотов",
        "5'100 лотов",
        "2'700 лотов",
        "1'500 лотов",
        "1'300 лотов",
        "2'100 лотов",
        "22'800 лотов",
        "3'900 лотов",
        "10'500 лотов",
        "8'100 лотов",
        "900 лотов"
    ];

    const linksCategories = [
        "/products?category=caps",
        "/products?category=sunglasses",
        "/products?category=panamas",
        "/products?category=watches",
        "/products?category=optical_glasses",
        "/products?category=collectibles",
        "/products?category=belts",
        "/products?category=hats",
        "/products?category=scarfs",
        "/products?category=rings",
        "/products?category=necklaces",
        "/products?category=bracelets",

        "/products?category=gloves",
        "/products?category=glasses_cases",
        "/products?category=perfumes",
        "/products?category=cosmetics",
        "/products?category=ties",
        "/products?category=keychains",

        "/products?category=basketballs",
        "/products?category=footballs",
        "/products?category=volleyballs",
        "/products?category=phone_cases",
        "/products?category=tech_accessories",
        "/products?category=other_accessories"
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
                    <div className={styles.title}>АКСЕССУАРЫ</div>
                    <div className={styles.viewAll}>
                        <Link
                            href={'/products?category=accessories'}
                            style={{textDecoration: 'none', color: '#363636'}}
                        >
                            ПОСМОТРЕТЬ ВСЕ 150'000+ МОДЕЛЕЙ
                        </Link>
                    </div>
                </div>

                {/* Categories */}
                <div className={styles.categoriesSection}>
                    <div className={styles.categoriesTitle}>КАТЕГОРИИ</div>
                    <div className={styles.categoriesGrid}>
                        {['Кепки', 'Очки', 'Панамы', 'Часы', 'Оправы', 'Collectibles', 'Ремни', 'Шапки', 'Шарфы', 'Кольца', 'Цепочки', 'Браслеты', 'Перчатки', 'Очешники', 'Духи', 'Косметика', 'Галстуки', 'Брелоки', 'Мячи', 'Мячи', 'Мячи', 'Чехлы', 'Для техники', 'Другие'].map((category, idx) => (
                            <Link
                                href={linksCategories[idx]}
                                style={{flex: 1}}
                            >
                            <div key={idx} className={styles.categoryItem}>
                                <Image
                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Men/Products/Accessories/Categories/${idx + 1}.png`}
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

                {/* Popular Brands */}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsTitle}>ПОПУЛЯРНЫЕ БРЕНДЫ</div>
                    <div className={styles.brandsGrid} ref={scrollableContainerRef}>
                        {Array.from({length: 57}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <Link
                                    href={linksBrands[idx]}
                                    style={{flex: 1}}
                                >
                                <div className={styles.circle}>
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Desktop/Men/Products/Accessories/Brands/${idx + 1}.png`}
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
            </div>
        </MainLayout>
    );
};

export default observer(Accessories_desktop_men);