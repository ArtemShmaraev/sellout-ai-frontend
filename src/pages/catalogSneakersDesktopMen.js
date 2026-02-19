import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogSneakersDesktopMen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import arrow from "@/static/icons/arrowSlider.svg";

const CatalogSneakersDesktopMen = () => {
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
        'Nike Dunk', 'Nike Air Force 1', 'Nike Blazer', 'Nike Cortez', 'Nike Air Max 95', 'Nike Air Max 97', 'Nike React', 'Nike V2K', 'Nike M2K', 'Air Monarch', 'Nike Foamposite', 'Air Uptempo', 'Nike Air Presto', 'Air Huarache', 'Nike Hyperdunk', 'Air Max Fusion', 'Nike Waffle', 'Nike Zoom', 'Nike Court Vision', 'Nike Blazer Low', 'Nike Dunk Low', 'Nike Dunk Mid', 'Nike Dunk High', 'Nike Air Max 1', 'Nike Air Max 90', 'Zoom Voomero', 'LeBron James', 'Kobe Bryant', 'Kyrie Irving', 'Kevin Durant', 'Nike Air Trainer', 'Nike Air Flight', 'Nike Air Max 98', 'Air Max Plus', 'Nike VaporMax', 'Nike Air Max 270', 'Nike Air Max 720', 'Freak Giannis', 'Zoom G.T.', 'Ja Morant', 'Paul George', 'Court Borough', 'Nike Blazer Mid', 'Air Force 1 Low', 'Air Force 1 Mid', 'Air Force 1 High'
    ];

    const textsBrandsJordan = [
        'Air Jordan 1 High', 'Air Jordan 1 Mid', 'Air Jordan 1 Low', 'Air Jordan 5', 'Air Jordan 7', 'Air Jordan 11', 'Air Jordan 13', 'Air Jordan 32', 'Air Jordan 33', 'Air Jordan 34', 'Luka Doncic', 'Zion Williamson', 'Air Jordan 2', 'Air Jordan 3', 'Air Jordan 4', 'Air Jordan 6', 'Air Jordan 8', 'Air Jordan 12', 'Air Jordan 35', 'Air Jordan 36', 'Air Jordan 37', 'Air Jordan 38', 'Jayson Tatum', 'Why Not'
    ];

    const textsBrandsNewBalance = [
        'New Balance 237', 'NB 2002R', 'New Balance 550', 'New Balance 530', 'New Balance 580', 'New Balance 580', 'New Balance 991', 'New Balance 993', 'New Balance 327', 'NB 1906R', 'NB 9060', 'New Balance 650', 'New Balance 574', 'New Balance 990', 'New Balance 992', 'New Balance 997'
    ];

    const textsBrandsAdidas = [
        'Yeezy 350', 'Yeezy 500', 'Yeezy 700', 'adidas Gazelle', 'adidas Forum', 'adidas Spezial', 'Yeezy 380', 'adidas adimatic', 'adidas 4D', 'adidas Adilette', 'Foam Runner', 'adidas Rivalry', 'Yeezy 450', 'adidas EQT', 'adidas Superstar', 'adidas Deerupt', 'adidas Ozelia', 'Damian Lillard', 'Derrick Rose', 'adidas Nizza', 'adidas Samba', 'Human Race', 'adidas Campus', 'Yeezy Slide', 'adidas NMD', 'adidas SL', 'James Harden', 'Nite Jogger', 'Trae Young', 'Stan Smith', 'adidas Ultraboost', 'adidas Falcon', 'Continental', 'adidas Ozweego', 'adidas ZX', 'adidas Hamburg', 'adidas Tubular', 'Pro Bounce', 'adidas D.O.N', 'Yeezy 750'
    ];

    const textsBrandsVans = [
        'Vans Knu Skool', 'Vans Old Skool', 'Vans Half Cab', 'Vans ComfyCush', 'Vans Style 36', 'Vans SK8', 'Vans Era', 'Vans Slip-on', 'Vans Authentic', 'Vans Ward'
    ];

    const textsBrandsAsics = [
        'Asics Gel-NYC', 'Asics Gel-Lyte', 'Magic Speed', 'Asics Gel-Kahana', 'Gel-Cumulus', 'Gel-Contend', 'Asics Gel-Kayano', 'Asics Gel-1130', 'Gel-Quantum', 'Asics Gel-Nimbus', 'Asics Gel-Flux', 'Asics Gel-1090', 'Asics Gel-Excite', 'Asics GT'
    ];

    const textsBrandsConverse = [
        'Chuck Taylor', 'One Star', 'Converse BB', 'Pro Leather', 'Run Star'
    ];

    const textsBrandsAnta = [
        'Anta KT3', 'Anta KT7', 'Anta KT8'
    ];

    const textsBrandsLiNing = [
        'Way Of Wade', 'Yushuai', 'Sonic', 'Speed'
    ];

    const textsBrandsPuma = [
        'Puma MB', 'Ralph Sampson', 'Puma Mirage', 'Puma Suede', 'Puma Smash', 'Puma Ca Pro', 'Puma Slipstream', 'Puma RS', 'Puma Fusion', 'Future Rider', 'Puma Cali', 'Puma Roma', 'Puma Clyde', 'Puma Mayze', 'Puma Carina', 'Puma Ignite'
    ];

    const textsBrandsReebok = [
        'Reebok Club', 'Classic Leather', 'Instapump Fury', 'Reebok Workout', 'Zig Kinetica', 'Reebok Question'
    ];

    const textsBrandsUA = [
        'UA Curry 4', 'UA Curry 6', 'UA Curry 7', 'UA Curry 1', 'UA Curry 2', 'UA Curry 8', 'UA Curry 9', 'UA Curry 10', 'UA Curry 3', 'UA Curry 5'
    ];

    const textsBrands = [
        '1000 лотов', '2000 лотов', '3000 лотов', '4000 лотов', '5000 лотов',
        '6000 лотов', '7000 лотов', '8000 лотов', '9000 лотов', '10000 лотов',
        '11000 лотов', '12000 лотов', '13000 лотов', '14000 лотов', '15000 лотов',
        '16000 лотов', '17000 лотов', '18000 лотов', '19000 лотов', '20000 лотов',
        '21000 лотов', '22000 лотов', '23000 лотов', '24000 лотов', '25000 лотов',
        '26000 лотов', '27000 лотов', '28000 лотов'
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

    return (
        <MainLayout>
            <div className={styles.catalogContainer}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.closeButton}>✕</div>
                    <div className={styles.title}>КРОССОВКИ И КЕДЫ</div>
                    <div className={styles.viewAll}>ПОСМОТРЕТЬ ВСЕ 100'000+ МОДЕЛЕЙ</div>
                </div>

                {/* Categories */}
                <div className={styles.categoriesSection}>
                    <div className={styles.categoriesTitle}>КАТЕГОРИИ</div>
                    <div className={styles.categoriesGrid}>
                        {['Все кроссовки и кеды', 'Высокие кроссовки', 'Низкие кроссовки', 'Баскетбольные кроссовки', 'Футбольные бутсы', 'Кроссовки для спорта'].map((category, idx) => (
                            <div key={idx} className={styles.categoryItem}>
                                <Image
                                    src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Categories/${idx + 1}.png?v=${Date.now()}`}
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

                {/* Popular Brands */}
                <div className={styles.brandsSection1}>
                    <div className={styles.brandsTitle1}>ПОПУЛЯРНЫЕ БРЕНДЫ</div>
                    <div className={styles.brandsGrid11} ref={(el) => scrollableContainerRefs.current[0] = el}>
                        {Array.from({length: 24}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle1}>
                                <div className={styles.circle1}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Brands/${idx + 1}.png?v=${Date.now()}`}
                                        alt="Brand Image"
                                        className={styles.circleImage1}
                                        width={700}
                                        height={700}
                                        layout="responsive"
                                        quality={100}
                                    />
                                </div>
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

                {/* Popular Brands Nike*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Image
                            src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Photos/1.png?v=${Date.now()}`}
                            alt=''
                            width={1000}
                            height={1000}
                            style={{width: '326px', height: 'auto'}}
                            className={styles.brandsPhoto}
                        />
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid1}`}
                         ref={(el) => scrollableContainerRefs.current[1] = el}>
                        {Array.from({length: 46}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Nike/${idx + 1}.png?v=${Date.now()}`}
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
                        <Image
                            src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Photos/2.png?v=${Date.now()}`}
                            alt=''
                            width={1000}
                            height={1000}
                            style={{width: '326px', height: 'auto'}}
                            className={styles.brandsPhoto}
                        />
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid2}`}
                         ref={(el) => scrollableContainerRefs.current[2] = el}>
                        {Array.from({length: 24}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Jordan/${idx + 1}.png?v=${Date.now()}`}
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
                        <Image
                            src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Photos/3.png?v=${Date.now()}`}
                            alt=''
                            width={1000}
                            height={1000}
                            style={{width: '326px', height: 'auto'}}
                            className={styles.brandsPhoto}
                        />
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid3}`}
                         ref={(el) => scrollableContainerRefs.current[3] = el}>
                        {Array.from({length: 16}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Sneakers/New Balance/${idx + 1}.png?v=${Date.now()}`}
                                        alt="Brand Image"
                                        className={styles.circleImage}
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

                {/* Popular Brands adidas*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Image
                            src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Photos/4.png?v=${Date.now()}`}
                            alt=''
                            width={1000}
                            height={1000}
                            style={{width: '326px', height: 'auto'}}
                            className={styles.brandsPhoto}
                        />
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid4}`}
                         ref={(el) => scrollableContainerRefs.current[4] = el}>
                        {Array.from({length: 40}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Sneakers/adidas/${idx + 1}.png?v=${Date.now()}`}
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

                {/* Popular Brands Vans*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Image
                            src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Photos/5.png?v=${Date.now()}`}
                            alt=''
                            width={1000}
                            height={1000}
                            style={{width: '326px', height: 'auto'}}
                            className={styles.brandsPhoto}
                        />
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid5}`}
                         ref={(el) => scrollableContainerRefs.current[5] = el}>
                        {Array.from({length: 10}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Vans/${idx + 1}.png?v=${Date.now()}`}
                                        alt="Brand Image"
                                        className={styles.circleImage}
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

                {/* Popular Brands Asics*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Image
                            src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Photos/6.png?v=${Date.now()}`}
                            alt=''
                            width={1000}
                            height={1000}
                            style={{width: '326px', height: 'auto'}}
                            className={styles.brandsPhoto}
                        />
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid6}`}
                         ref={(el) => scrollableContainerRefs.current[6] = el}>
                        {Array.from({length: 14}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Asics/${idx + 1}.png?v=${Date.now()}`}
                                        alt="Brand Image"
                                        className={styles.circleImage}
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

                {/* Popular Brands Converse*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Image
                            src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Photos/7.png?v=${Date.now()}`}
                            alt=''
                            width={1000}
                            height={1000}
                            style={{width: '430px', height: 'auto'}}
                            className={styles.brandsPhoto}
                        />
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid7}`}
                         ref={(el) => scrollableContainerRefs.current[7] = el}>
                        {Array.from({length: 5}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Converse/${idx + 1}.png?v=${Date.now()}`}
                                        alt="Brand Image"
                                        className={styles.circleImage}
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

                {/* Popular Brands Anta*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Image
                            src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Photos/8.png?v=${Date.now()}`}
                            alt=''
                            width={1000}
                            height={1000}
                            style={{width: '430px', height: 'auto'}}
                            className={styles.brandsPhoto}
                        />
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid8}`}
                         ref={(el) => scrollableContainerRefs.current[8] = el}>
                        {Array.from({length: 3}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Anta/${idx + 1}.png?v=${Date.now()}`}
                                        alt="Brand Image"
                                        className={styles.circleImage}
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
                        <Image
                            src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Photos/9.png?v=${Date.now()}`}
                            alt=''
                            width={1000}
                            height={1000}
                            style={{width: '430px', height: 'auto'}}
                            className={styles.brandsPhoto}
                        />
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid9}`}
                         ref={(el) => scrollableContainerRefs.current[9] = el}>
                        {Array.from({length: 4}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Li-Ning/${idx + 1}.png?v=${Date.now()}`}
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

                {/* Popular Brands Puma*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Image
                            src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Photos/10.png?v=${Date.now()}`}
                            alt=''
                            width={1000}
                            height={1000}
                            style={{width: '430px', height: 'auto'}}
                            className={styles.brandsPhoto}
                        />
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid10}`}
                         ref={(el) => scrollableContainerRefs.current[10] = el}>
                        {Array.from({length: 16}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Puma/${idx + 1}.png?v=${Date.now()}`}
                                        alt="Brand Image"
                                        className={styles.circleImage}
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

                {/* Popular Brands Reebok*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Image
                            src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Photos/11.png?v=${Date.now()}`}
                            alt=''
                            width={1000}
                            height={1000}
                            style={{width: '430px', height: 'auto'}}
                            className={styles.brandsPhoto}
                        />
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid11_}`}
                         ref={(el) => scrollableContainerRefs.current[11] = el}>
                        {Array.from({length: 6}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Reebok/${idx + 1}.png?v=${Date.now()}`}
                                        alt="Brand Image"
                                        className={styles.circleImage}
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

                {/* Popular Brands Under Armour*/}
                <div className={styles.brandsSection}>
                    <div>
                        <Image
                            src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Photos/12.png?v=${Date.now()}`}
                            alt=''
                            width={1000}
                            height={1000}
                            style={{width: '430px', height: 'auto'}}
                            className={styles.brandsPhoto}
                        />
                    </div>
                    <div className={`${styles.brandsGrid} ${styles.brandsGrid12}`}
                         ref={(el) => scrollableContainerRefs.current[12] = el}>
                        {Array.from({length: 10}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Desktop/Men/Products/Sneakers/Under Armour/${idx + 1}.png?v=${Date.now()}`}
                                        alt="Brand Image"
                                        className={styles.circleImage}
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

export default observer(CatalogSneakersDesktopMen);