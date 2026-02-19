import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogBagsDesktopMen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import arrow from "@/static/icons/arrowSlider.svg";

const Bags_desktop_men = () => {
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
        'https://sellout.su/brand28', 'https://sellout.su/brand1', 'https://sellout.su/brand2', 'https://sellout.su/brand3',
        'https://sellout.su/brand4', 'https://sellout.su/brand5', 'https://sellout.su/brand6',
        'https://sellout.su/brand7', 'https://sellout.su/brand8', 'https://sellout.su/brand9',
        'https://sellout.su/brand10', 'https://sellout.su/brand11', 'https://sellout.su/brand12',
        'https://sellout.su/brand13', 'https://sellout.su/brand14', 'https://sellout.su/brand15',
        'https://sellout.su/brand16', 'https://sellout.su/brand17', 'https://sellout.su/brand18',
        'https://sellout.su/brand19', 'https://sellout.su/brand20', 'https://sellout.su/brand21',
        'https://sellout.su/brand22', 'https://sellout.su/brand23', 'https://sellout.su/brand24',
        'https://sellout.su/brand25', 'https://sellout.su/brand26'
    ];

    const textsBrands = [
        '1000 лотов', '2000 лотов', '3000 лотов', '4000 лотов', '5000 лотов',
        '6000 лотов', '7000 лотов', '8000 лотов', '9000 лотов', '10000 лотов',
        '11000 лотов', '12000 лотов', '13000 лотов', '14000 лотов', '15000 лотов',
        '16000 лотов', '17000 лотов', '18000 лотов', '19000 лотов', '20000 лотов',
        '21000 лотов', '22000 лотов', '23000 лотов', '24000 лотов', '25000 лотов',
        '26000 лотов', '27000 лотов', '28000 лотов',
        '1000 лотов', '2000 лотов', '3000 лотов', '4000 лотов', '5000 лотов',
        '6000 лотов', '7000 лотов', '8000 лотов', '9000 лотов', '10000 лотов',
        '11000 лотов', '12000 лотов', '13000 лотов', '14000 лотов', '15000 лотов',
        '16000 лотов', '17000 лотов', '18000 лотов', '19000 лотов', '20000 лотов',
        '21000 лотов', '22000 лотов', '23000 лотов', '24000 лотов', '25000 лотов',
        '26000 лотов'
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
                    <div className={styles.title}>СУМКИ</div>
                    <div className={styles.viewAll}>ПОСМОТРЕТЬ ВСЕ 100'000+ МОДЕЛЕЙ</div>
                </div>

                {/* Popular Brands */}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsTitle}>ПОПУЛЯРНЫЕ БРЕНДЫ</div>
                    <div className={styles.brandsGrid} ref={scrollableContainerRef}>
                        {Array.from({length: 54}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Bags/Brands/${idx + 1}.png?v=${Date.now()}`}
                                        alt="Brand Image"
                                        className={styles.circleImage}
                                        width={700}
                                        height={700}
                                        layout="responsive"
                                        quality={100}
                                    />
                                </div>
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
                        {['Все сумки', 'Сумки на пояс', 'Рюкзаки', 'Спортивные', 'Кошельки', 'Клатчи', 'Кардхолдеры', 'Косметички', 'Портфели', 'Чемоданы', 'Обложки'].map((category, idx) => (
                            <div key={idx} className={styles.categoryItem}>
                                <Image
                                    src={`/Images New Frontend/Desktop/Men/Products/Bags/Categories/${idx + 1}.png?v=${Date.now()}`}
                                    alt={category}
                                    width={700}
                                    height={700}
                                    className={styles.categoryImage}
                                />
                                <div className={styles.categoryText}>
                                    {category}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default observer(Bags_desktop_men);