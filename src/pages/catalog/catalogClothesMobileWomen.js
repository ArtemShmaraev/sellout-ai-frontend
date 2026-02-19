import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogClothesMobileWomen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import logo from "@/static/img/sellout_logo.svg";
import cross from '@/static/icons/x-lg.svg'
import backLogo from "@/static/icons/chevron-left.svg";

const CatalogClothesDesktopWomen = () => {
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

    return (
        <div>
            <div className={styles.header}>
                {/* Первая часть: Логотип и крестик */}
                <div className={styles.headerTop}>
                    <div className={styles.logoContainer}>
                        <Image src={logo} alt="Logo" className={styles.logo} width={120} height={50}/>
                    </div>
                    <div className={styles.closeButton}>
                        <Image src={cross} alt="Back" className={styles.backArrow} width={24}
                               height={24}/>
                    </div>
                </div>

                {/* Вторая часть: Стрелка назад и текст */}
                <div className={styles.headerBottom}>
                    <div className={styles.backArrowContainer}>
                        <Image src={backLogo} alt="Back" className={styles.backArrow} width={24}
                               height={24}/>
                    </div>
                    <div className={styles.headerTitle}>
                        ОДЕЖДА
                    </div>
                </div>
            </div>
            <div className={styles.catalogContainer}>
                {/* Popular Brands */}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsTitle}>ПОПУЛЯРНЫЕ БРЕНДЫ</div>
                    <div className={styles.brandsGrid}>
                        {Array.from({length: 66}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Mobile/Women/Products/Clothes/Brands/${idx + 1}.png?v=${Date.now()}`}
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
                </div>

                {/* Categories */}
                <div className={styles.categoriesSection1}>
                    <div className={styles.categoriesTitle}>КАТЕГОРИИ</div>
                    <div className={styles.categoriesGrid}>
                        {['Футболки', 'Худи', 'Шорты', 'Топы', 'Свитеры', 'Юбки'].map((category, idx) => (
                            <div key={idx} className={styles.categoryItem}>
                                <Image
                                    src={`/Images New Frontend/Mobile/Women/Products/Clothes/Categories/${idx + 1}.png?v=${Date.now()}`}
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
                    <div className={styles.categoriesGrid4}>
                        {['Рубашки', 'Треники', 'Джинсы', 'Платья', 'Поло', 'Лонгсливы', 'Боди', 'Брюки'].map((category, idx) => (
                            <div key={idx} className={styles.categoryItem4}>
                                <Image
                                    src={`/Images New Frontend/Mobile/Women/Products/Clothes/Categories/${idx + 7}.png?v=${Date.now()}`}
                                    alt={category}
                                    width={700}
                                    height={700}
                                    className={styles.categoryImage4}
                                />
                                <div className={styles.categoryText4}>
                                    {category}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.categoriesSection2}>
                    <div className={styles.categoriesTitle2}>СПОРТИВНАЯ ОДЕЖДА</div>
                    <div className={styles.categoriesGrid4}>
                        {['Вся', 'Топы', 'Шорты', 'Легинсы', 'Майки', 'Футб. майки', 'Баскет. джерси'].map((category, idx) => (
                            <div key={idx} className={styles.categoryItem4}>
                                <Image
                                    src={`/Images New Frontend/Mobile/Women/Products/Clothes/Categories/${idx + 15}.png?v=${Date.now()}`}
                                    alt={category}
                                    width={700}
                                    height={700}
                                    className={styles.categoryImage4}
                                />
                                <div className={styles.categoryText4}>
                                    {category}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.categoriesSection2}>
                    <div className={styles.categoriesTitle2}>ВЕРХНЯЯ ОДЕЖДА</div>
                    <div className={styles.categoriesGrid4}>
                        {['Вся', 'Куртки', 'Ветровки', 'Пуховики', 'Кожаные', 'Пальто', 'Джинсовые', 'Бейсбольные', 'Жилетки', 'Плащи', 'Шубы'].map((category, idx) => (
                            <div key={idx} className={styles.categoryItem4}>
                                <Image
                                    src={`/Images New Frontend/Mobile/Women/Products/Clothes/Categories/${idx + 22}.png?v=${Date.now()}`}
                                    alt={category}
                                    width={700}
                                    height={700}
                                    className={styles.categoryImage4}
                                />
                                <div className={styles.categoryText4}>
                                    {category}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.categoriesSection2}>
                    <div className={styles.categoriesTitle2}>ХУДИ И ТОЛСТОВКИ</div>
                    <div className={styles.categoriesGrid4}>
                        {['Все толстовки', 'С капюшоном', 'На молнии', 'Свитшоты'].map((category, idx) => (
                            <div key={idx} className={styles.categoryItem4}>
                                <Image
                                    src={`/Images New Frontend/Mobile/Men/Products/Clothes/Categories/${idx + 28}.png?v=${Date.now()}`}
                                    alt={category}
                                    width={700}
                                    height={700}
                                    className={styles.categoryImage4}
                                />
                                <div className={styles.categoryText4}>
                                    {category}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.categoriesSection2}>
                    <div className={styles.categoriesTitle2}>СВИТЕРЫ И ТРИКОТАЖ</div>
                    <div className={styles.categoriesGrid4}>
                        {['Все', 'Свитеры', 'Водолазки', 'Кардиганы'].map((category, idx) => (
                            <div key={idx} className={styles.categoryItem4}>
                                <Image
                                    src={`/Images New Frontend/Mobile/Men/Products/Clothes/Categories/${idx + 32}.png?v=${Date.now()}`}
                                    alt={category}
                                    width={700}
                                    height={700}
                                    className={styles.categoryImage4}
                                />
                                <div className={styles.categoryText4}>
                                    {category}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.categoriesSection2} style={{marginBottom: '50px'}}>
                    <div className={styles.categoriesTitle2}>ДРУГИЕ</div>
                    <div className={styles.categoriesGrid4}>
                        {['Деним', 'Пиджаки', 'Костюмы', 'Зимние штаны', 'Купальники', 'Купальники', 'Носки', 'Нижнее белье'].map((category, idx) => (
                            <div key={idx} className={styles.categoryItem4}>
                                <Image
                                    src={`/Images New Frontend/Mobile/Women/Products/Clothes/Categories/${idx + 41}.png?v=${Date.now()}`}
                                    alt={category}
                                    width={700}
                                    height={700}
                                    className={styles.categoryImage4}
                                />
                                <div className={styles.categoryText4}>
                                    {category}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.centerButton}>Посмотреть всю одежду</div>
            </div>
        </div>

    );
};

export default observer(CatalogClothesDesktopWomen);