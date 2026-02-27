import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogSneakersMobileWomen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import logo from "@/static/img/sellout_logo.svg";
import backLogo from "@/static/icons/chevron-left.svg";
import cross from '@/static/icons/x-lg.svg'


const CatalogSneakersMobileWomen = () => {
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

    const textsBrandsAdidas = [
        'adidas Samba', 'adidas Gazelle', 'adidas SL', 'Human Race', 'Yeezy 350', 'adidas Falcon', 'Yeezy 380', 'adidas adimatic', 'adidas 4D', 'adidas Adilette', 'Foam Runner', 'adidas Rivalry', 'Yeezy 450', 'adidas EQT', 'adidas Superstar', 'adidas Deerupt', 'adidas Ozelia', 'Damian Lillard', 'Derrick Rose', 'adidas Nizza', 'adidas Campus', 'adidas Spezial', 'adidas Forum', 'adidas NMD', 'Yeezy Slide', 'Stan Smith', 'Continental', 'Nite Jogger', 'Yeezy 500', 'Trae Young', 'adidas Ultraboost', 'James Harden', 'Yeezy 700', 'adidas Ozweego', 'adidas ZX', 'adidas Hamburg', 'adidas Tubular', 'Pro Bounce', 'adidas D.O.N', 'Yeezy 750'
    ];

    const textsBrandsNike = [
        'Nike Dunk', 'Nike Air Force 1', 'Nike Blazer', 'Nike Cortez', 'Nike Air Max 95', 'Nike Zoom', 'Air Monarch', 'Nike Air Max 720', 'Nike Foamposite', 'Air Huarache', 'Nike Court Vision', 'Kyrie Irving', 'Kevin Durant', 'Nike Air Max 270', 'Nike Air Flight', 'Nike Air Trainer', 'Air Max Plus', 'Air Uptempo', 'Nike Hyperdunk', 'Nike Blazer Low', 'Nike Dunk Low', 'Nike Dunk Mid', 'Nike Dunk High', 'Nike Air Max 1', 'Nike Air Max 90', 'Zoom Voomero', 'Nike Zoom', 'Air Monarch', 'Nike Air Max 720', 'Nike Foamposite', 'Air Huarache', 'Nike Court Vision', 'Kyrie Irving', 'Kevin Durant', 'Nike Air Max 270', 'Nike Air Flight', 'Nike Air Trainer', 'Freak Giannis', 'Zoom G.T.', 'Ja Morant', 'Paul George', 'Court Borough', 'Nike Blazer Mid', 'Air Force 1 Low', 'Air Force 1 Mid', 'Air Force 1 High'
    ];

    const textsBrandsJordan = [
        'Air Jordan 1 High', 'Air Jordan 1 Mid', 'Air Jordan 1 Low', 'Air Jordan 5', 'Air Jordan 7', 'Air Jordan 11', 'Air Jordan 13', 'Air Jordan 32', 'Air Jordan 33', 'Air Jordan 34', 'Luka Doncic', 'Zion Williamson', 'Air Jordan 2', 'Air Jordan 3', 'Air Jordan 4', 'Air Jordan 6', 'Air Jordan 8', 'Air Jordan 12', 'Air Jordan 35', 'Air Jordan 36', 'Air Jordan 37', 'Air Jordan 38', 'Jayson Tatum', 'Why Not'
    ];

    const textsBrandsNewBalance = [
        'New Balance 237', 'NB 2002R', 'New Balance 550', 'New Balance 530', 'New Balance 580', 'New Balance 57/40', 'New Balance 991', 'New Balance 993', 'New Balance 327', 'NB 1906R', 'NB 9060', 'New Balance 650', 'New Balance 574', 'New Balance 990', 'New Balance 992', 'New Balance 997'
    ];

    const textsBrandsConverse = [
        'Chuck Taylor', 'One Star', 'Converse BB', 'Pro Leather', 'Run Star'
    ];

    const textsBrandsVans = [
        'Vans Knu Skool', 'Vans Old Skool', 'Vans Half Cab', 'Vans ComfyCush', 'Vans Style 36', 'Vans SK8', 'Vans Era', 'Vans Slip-on', 'Vans Authentic', 'Vans Ward'
    ];

    const textsBrandsPuma = [
        'Puma MB', 'Ralph Sampson', 'Puma Mirage', 'Puma Suede', 'Puma Smash', 'Puma Ca Pro', 'Puma Slipstream', 'Puma RS', 'Puma Fusion', 'Future Rider', 'Puma Cali', 'Puma Roma', 'Puma Clyde', 'Puma Mayze', 'Puma Carina', 'Puma Ignite'
    ];

    const textsBrandsAsics = [
        'Asics Gel-NYC', 'Asics Gel-Lyte', 'Magic Speed', 'Asics Gel-Kahana', 'Gel-Cumulus', 'Gel-Contend', 'Asics Gel-Kayano', 'Asics Gel-1130', 'Gel-Quantum', 'Asics Gel-Nimbus', 'Asics Gel-Flux', 'Asics Gel-1090', 'Asics Gel-Excite', 'Asics GT'
    ];

    const textsBrandsReebok = [
        'Reebok Club', 'Classic Leather', 'Instapump Fury', 'Reebok Workout', 'Zig Kinetica', 'Reebok Question'
    ];

    const textsBrandsAnta = [
        'Anta KT3', 'Anta KT7', 'Anta KT8'
    ];

    const textsBrandsLiNing = [
        'Way Of Wade', 'Yushuai', 'Sonic', 'Speed'
    ];

    const textsBrandsUA = [
        'UA Curry 4', 'UA Curry 6', 'UA Curry 7', 'UA Curry 1', 'UA Curry 2', 'UA Curry 8', 'UA Curry 9', 'UA Curry 10', 'UA Curry 3', 'UA Curry 5'
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
                        КРОССОВКИ И КЕДЫ
                    </div>
                </div>
            </div>
            <div className={styles.catalogContainer}>
                {/* Categories */}
                <div className={styles.categoriesSection}>
                    <div className={styles.categoriesGrid}>
                        {['Все кроссовки и кеды', 'Кроссовки', 'Кеды', 'Высокие кроссовки', 'Низкие кроссовки', 'Кроссовки для спорта'].map((category, idx) => (
                            <div key={idx} className={styles.categoryItem}>
                                <Image
                                    src={`/Images New Frontend/Mobile/Women/Products/Sneakers/Categories/${idx + 1}.png?v=${Date.now()}`}
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

                {/* Popular Brands */}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsTitle}>ПОПУЛЯРНЫЕ БРЕНДЫ</div>
                    <div className={styles.brandsGrid}>
                        {Array.from({length: 24}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Mobile/Women/Products/Sneakers/Brands/${idx + 1}.png?v=${Date.now()}`}
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

                {/* Popular Lines */}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsTitle}>ЛИНЕЙКИ КРОССОВОК</div>
                    <>
                        <div>
                            <Image
                                src={`/Images New Frontend/Mobile/Women/Products/Sneakers/Photos/1.png?v=${Date.now()}`}
                                alt=''
                                width={1000}
                                height={1000}
                                className={styles.brandsPhoto}
                                style={{marginTop: '0'}}
                            />
                        </div>
                        <div className={`${styles.brandsGrid} ${styles.brandsGrid4}`}>
                            {Array.from({length: 40}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle2}>
                                        <Image
                                            src={`/Images New Frontend/Desktop/Women/Products/Sneakers/adidas/${idx + 1}.png?v=${Date.now()}`}
                                            alt="Brand Image"
                                            className={styles.circleImage2}
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
                    </>
                    <>
                        <div>
                            <Image
                                src={`/Images New Frontend/Mobile/Women/Products/Sneakers/Photos/2.png?v=${Date.now()}`}
                                alt=''
                                width={1000}
                                height={1000}
                                className={styles.brandsPhoto}
                            />
                        </div>
                        <div className={`${styles.brandsGrid} ${styles.brandsGrid1}`}>
                            {Array.from({length: 46}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle2}>
                                        <Image
                                            src={`/Images New Frontend/Desktop/Women/Products/Sneakers/Nike/${idx + 1}.png?v=${Date.now()}`}
                                            alt="Brand Image"
                                            className={styles.circleImage2}
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
                    </>
                    <>
                        <div>
                            <Image
                                src={`/Images New Frontend/Mobile/Women/Products/Sneakers/Photos/3.png?v=${Date.now()}`}
                                alt=''
                                width={1000}
                                height={1000}
                                className={styles.brandsPhoto}
                            />
                        </div>
                        <div className={`${styles.brandsGrid} ${styles.brandsGrid2}`}>
                            {Array.from({length: 24}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle2}>
                                        <Image
                                            src={`/Images New Frontend/Mobile/Women/Products/Sneakers/Jordan/${idx + 1}.png?v=${Date.now()}`}
                                            alt="Brand Image"
                                            className={styles.circleImage2}
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
                    </>
                    <>
                        <div>
                            <Image
                                src={`/Images New Frontend/Mobile/Women/Products/Sneakers/Photos/4.png?v=${Date.now()}`}
                                alt=''
                                width={1000}
                                height={1000}
                                className={styles.brandsPhoto}
                            />
                        </div>
                        <div className={`${styles.brandsGrid} ${styles.brandsGrid3}`}>
                            {Array.from({length: 16}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle2}>
                                        <Image
                                            src={`/Images New Frontend/Desktop/Women/Products/Sneakers/New Balance/${idx + 1}.png?v=${Date.now()}`}
                                            alt="Brand Image"
                                            className={styles.circleImage2}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                    <div className={styles.circleText}>{textsBrandsNewBalance[idx]}</div>
                                </div>
                            ))}
                        </div>
                    </>
                    <>
                        <div>
                            <Image
                                src={`/Images New Frontend/Mobile/Women/Products/Sneakers/Photos/5.png?v=${Date.now()}`}
                                alt=''
                                width={1000}
                                height={1000}
                                className={styles.brandsPhoto}
                            />
                        </div>
                        <div className={`${styles.brandsGrid} ${styles.brandsGrid7}`}>
                            {Array.from({length: 5}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle2}>
                                        <Image
                                            src={`/Images New Frontend/Desktop/Women/Products/Sneakers/Converse/${idx + 1}.png?v=${Date.now()}`}
                                            alt="Brand Image"
                                            className={styles.circleImage2}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                    <div className={styles.circleText}>{textsBrandsConverse[idx]}</div>
                                </div>
                            ))}
                        </div>
                    </>
                    <>
                        <div>
                            <Image
                                src={`/Images New Frontend/Mobile/Women/Products/Sneakers/Photos/6.png?v=${Date.now()}`}
                                alt=''
                                width={1000}
                                height={1000}
                                className={styles.brandsPhoto}
                            />
                        </div>
                        <div className={`${styles.brandsGrid} ${styles.brandsGrid5}`}>
                            {Array.from({length: 10}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle2}>
                                        <Image
                                            src={`/Images New Frontend/Desktop/Women/Products/Sneakers/Vans/${idx + 1}.png?v=${Date.now()}`}
                                            alt="Brand Image"
                                            className={styles.circleImage2}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                    <div className={styles.circleText}>{textsBrandsVans[idx]}</div>
                                </div>
                            ))}
                        </div>
                    </>
                    <>
                        <div>
                            <Image
                                src={`/Images New Frontend/Mobile/Women/Products/Sneakers/Photos/7.png?v=${Date.now()}`}
                                alt=''
                                width={1000}
                                height={1000}
                                className={styles.brandsPhoto}
                            />
                        </div>
                        <div className={`${styles.brandsGrid} ${styles.brandsGrid10}`}>
                            {Array.from({length: 16}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle2}>
                                        <Image
                                            src={`/Images New Frontend/Desktop/Women/Products/Sneakers/Puma/${idx + 1}.png?v=${Date.now()}`}
                                            alt="Brand Image"
                                            className={styles.circleImage2}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                    <div className={styles.circleText}>{textsBrandsPuma[idx]}</div>
                                </div>
                            ))}
                        </div>
                    </>
                    <>
                        <div>
                            <Image
                                src={`/Images New Frontend/Mobile/Women/Products/Sneakers/Photos/8.png?v=${Date.now()}`}
                                alt=''
                                width={1000}
                                height={1000}
                                className={styles.brandsPhoto}
                            />
                        </div>
                        <div className={`${styles.brandsGrid} ${styles.brandsGrid6}`}>
                            {Array.from({length: 14}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle2}>
                                        <Image
                                            src={`/Images New Frontend/Desktop/Women/Products/Sneakers/Asics/${idx + 1}.png?v=${Date.now()}`}
                                            alt="Brand Image"
                                            className={styles.circleImage2}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                    <div className={styles.circleText}>{textsBrandsAsics[idx]}</div>
                                </div>
                            ))}
                        </div>
                    </>
                    <>
                        <div>
                            <Image
                                src={`/Images New Frontend/Mobile/Women/Products/Sneakers/Photos/9.png?v=${Date.now()}`}
                                alt=''
                                width={1000}
                                height={1000}
                                className={styles.brandsPhoto}
                            />
                        </div>
                        <div className={`${styles.brandsGrid} ${styles.brandsGrid11}`}>
                            {Array.from({length: 6}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle2}>
                                        <Image
                                            src={`/Images New Frontend/Desktop/Women/Products/Sneakers/Reebok/${idx + 1}.png?v=${Date.now()}`}
                                            alt="Brand Image"
                                            className={styles.circleImage2}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                    <div className={styles.circleText}>{textsBrandsReebok[idx]}</div>
                                </div>
                            ))}
                        </div>
                    </>
                    <>
                        <div>
                            <Image
                                src={`/Images New Frontend/Mobile/Women/Products/Sneakers/Photos/10.png?v=${Date.now()}`}
                                alt=''
                                width={1000}
                                height={1000}
                                className={styles.brandsPhoto}
                            />
                        </div>
                        <div className={`${styles.brandsGrid} ${styles.brandsGrid8}`}>
                            {Array.from({length: 3}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle2}>
                                        <Image
                                            src={`/Images New Frontend/Desktop/Women/Products/Sneakers/Anta/${idx + 1}.png?v=${Date.now()}`}
                                            alt="Brand Image"
                                            className={styles.circleImage2}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                    <div className={styles.circleText}>{textsBrandsAnta[idx]}</div>
                                </div>
                            ))}
                        </div>
                    </>
                    <>
                        <div>
                            <Image
                                src={`/Images New Frontend/Mobile/Women/Products/Sneakers/Photos/11.png?v=${Date.now()}`}
                                alt=''
                                width={1000}
                                height={1000}
                                className={styles.brandsPhoto}
                            />
                        </div>
                        <div className={`${styles.brandsGrid} ${styles.brandsGrid9}`}>
                            {Array.from({length: 4}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle2}>
                                        <Image
                                            src={`/Images New Frontend/Desktop/Women/Products/Sneakers/Li-Ning/${idx + 1}.png?v=${Date.now()}`}
                                            alt="Brand Image"
                                            className={styles.circleImage2}
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
                    </>
                    <>
                        <div>
                            <Image
                                src={`/Images New Frontend/Mobile/Women/Products/Sneakers/Photos/12.png?v=${Date.now()}`}
                                alt=''
                                width={1000}
                                height={1000}
                                className={styles.brandsPhoto}
                            />
                        </div>
                        <div className={`${styles.brandsGrid} ${styles.brandsGrid12}`}>
                            {Array.from({length: 10}).map((_, idx) => (
                                <div key={idx} className={styles.brandCircle}>
                                    <div className={styles.circle2}>
                                        <Image
                                            src={`/Images New Frontend/Desktop/Women/Products/Sneakers/Under Armour/${idx + 1}.png?v=${Date.now()}`}
                                            alt="Brand Image"
                                            className={styles.circleImage2}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </div>
                                    <div className={styles.circleText}>{textsBrandsUA[idx]}</div>
                                </div>
                            ))}
                        </div>
                    </>
                </div>


                <div className={styles.centerButton}>Посмотреть все кроссовки и кеды</div>
            </div>
        </div>

    );
};

export default observer(CatalogSneakersMobileWomen);