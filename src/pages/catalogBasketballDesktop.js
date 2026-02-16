import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogBasketballDesktop.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import arrow from "@/static/icons/arrowSlider.svg";

const CatalogBasketballDesktop = () => {
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
        'https://sellout.su/brand28', 'https://sellout.su/brand15',
        'https://sellout.su/brand16', 'https://sellout.su/brand17', 'https://sellout.su/brand18',
        'https://sellout.su/brand19', 'https://sellout.su/brand20', 'https://sellout.su/brand21',
        'https://sellout.su/brand22', 'https://sellout.su/brand23', 'https://sellout.su/brand24',
        'https://sellout.su/brand25', 'https://sellout.su/brand26', 'https://sellout.su/brand27',
        'https://sellout.su/brand28'
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

    return (
        <MainLayout>
            <div className={styles.catalogContainer}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.closeButton}>✕</div>
                    <div className={styles.title}>БАСКЕТБОЛ</div>
                    <div className={styles.viewAll}>ПОСМОТРЕТЬ ВСЕ 100'000+ МОДЕЛЕЙ</div>
                </div>

                {/* Categories */}
                <div className={styles.categoriesSection}>
                    <div className={styles.categoriesTitle}>КАТЕГОРИИ</div>
                    <div className={styles.categoriesGrid}>
                        {['Баскетбольные кроссовки', 'Баскетбольные джерси', 'Баскетбольные шорты', 'Баскетбольные мячи', 'Спортивная одежда', 'Спортивные сумки'].map((category, idx) => (
                            <div key={idx} className={styles.categoryItem}>
                                <Image
                                    src={`/Images New Frontend/Desktop/Men/Products/Basketball/Categories/${idx + 1}.png?v=${Date.now()}`}
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
                        ))}
                    </div>
                </div>

                <div className={styles.categoriesTitle2}>ПОПУЛЯРНЫЕ ЛИНЕЙКИ</div>

                {/* Popular Brands Nike*/}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsContainer}>
                        <div className={styles.brandsTitle}>NIKE</div>
                        <div className={styles.viewAll2}
                             style={{marginRight: "calc(max(0px,(100% - 8*100px - 7*17px)))"}}>Посмотреть все
                        </div>
                    </div>

                    <div className={styles.brandsGrid}>
                        {Array.from({length: 8}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Basketball/Nike/${idx + 1}.png?v=${Date.now()}`}
                                        alt="Brand Image"
                                        className={styles.circleImage}
                                        width={700}
                                        height={700}
                                        layout="responsive"
                                        quality={100}
                                    />
                                </div>
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
                             style={{marginRight: "calc(max(0px,(100% - 12*100px - 11*17px)))"}}>Посмотреть все
                        </div>
                    </div>

                    <div className={styles.brandsGrid} ref={scrollableContainerRef}>
                        {Array.from({length: 12}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Basketball/Jordan/${idx + 1}.png?v=${Date.now()}`}
                                        alt="Brand Image"
                                        className={styles.circleImage}
                                        width={700}
                                        height={700}
                                        layout="responsive"
                                        quality={100}
                                    />
                                </div>
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
                             style={{marginRight: "calc(max(0px,(100% - 4*100px - 3*17px)))"}}>Посмотреть все
                        </div>
                    </div>

                    <div className={styles.brandsGrid}>
                        {Array.from({length: 4}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Basketball/adidas/${idx + 1}.png?v=${Date.now()}`}
                                        alt="Brand Image"
                                        className={styles.circleImage}
                                        width={700}
                                        height={700}
                                        layout="responsive"
                                        quality={100}
                                    />
                                </div>
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
                             style={{marginRight: "calc(max(0px,(100% - 4*100px - 3*17px)))"}}>Посмотреть все
                        </div>
                    </div>

                    <div className={styles.brandsGrid}>
                        {Array.from({length: 4}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Basketball/Li-Ning/${idx + 1}.png?v=${Date.now()}`}
                                        alt="Brand Image"
                                        className={styles.circleImage}
                                        width={700}
                                        height={700}
                                        layout="responsive"
                                        quality={100}
                                    />
                                </div>
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

                    <div className={styles.brandsGrid} >
                        {Array.from({length: 8}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Basketball/OtherBrands/${idx + 1}.png?v=${Date.now()}`}
                                        alt="Brand Image"
                                        className={styles.circleImage}
                                        width={700}
                                        height={700}
                                        layout="responsive"
                                        quality={100}
                                    />
                                </div>
                                <div className={styles.circleText}>{textsBrandsOther[idx]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default observer(CatalogBasketballDesktop);