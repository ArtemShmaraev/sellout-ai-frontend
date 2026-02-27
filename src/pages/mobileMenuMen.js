import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/MobileMenuMen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import logo from "@/static/img/sellout_logo.svg";
import cross from '@/static/icons/x-lg.svg'
import searchLogo from "@/static/icons/searchMob.svg";
import more from "@/static/icons/moreIcon.svg";

const MobileMenuMen = () => {
    const textsLines = [
        'Air Jordan 1', 'Air Jordan 3', 'Air Jordan 4', 'Air Jordan 35', 'Air Jordan 36', 'Air Jordan 38', 'Yeezy 350', 'Yeezy 500', 'Yeezy 700', 'Asics', 'New Balance 550', 'New Balance 1906R','New Balance 9060', 'New Balance 327', 'New Balance 530', 'New Balance 574','New Balance 990', 'New Balance 993', 'New Balance 992', 'adidas Samba','Human Race', 'adidas Campus', 'adidas Gazelle', 'adidas Forum','Yeezy 380', 'Yeezy 450', 'Yeezy 750', 'Foam Runner','Yeezy Slide', 'Air Uptempo', 'adidas NMD', 'adidas Stan Smith','adidas Ultraboost', 'adidas Superstar', 'Nike Dunk', 'Nike Air Force 1','Nike Air Max 1', 'Nike Air Max 90', 'Nike Blazer', 'Nike Zoom','Nike Cortez', 'Nike Kobe', 'Nike LeBron', 'Nike Kyrie','NB 2002R', 'Vans', 'Nike Air Max 95', 'Nike Air Max 98','Nike React', 'Nike KD', 'Nike Foamposite', 'Nike VaporMax','Nike Air Max 720', 'Nike Air Max 270', 'Nike Freak', 'Jordan Tatum','James Harden', 'Trae Young', 'Converse', 'Anta','Li-Ning', 'Under Armour', 'Nike Air Presto', 'Nike Air Trainer', 'Nike Air Max 97', 'New Balance 997', 'adidas Ozweego', 'adidas EQT'
    ];

    const [selectedGender, setSelectedGender] = useState(null); // По умолчанию ни одна кнопка не выбрана

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };

    const [isActive, setIsActive] = useState(false);
    const [searchText, setSearchText] = useState('');
    const inputRef = useRef(null); // Реф для управления фокусом на инпуте

    const handleInputClick = () => {
        setIsActive(true); // Активируем поле при нажатии
    };

    const handleClose = () => {
        setIsActive(false);
        setSearchText(''); // Очищаем текст и возвращаемся в исходное состояние
    };

    const handleBlur = () => {
        // Если пользователь перестал фокусироваться на input, возвращаем состояние в неактивное
        if (!searchText) {
            setIsActive(false);
        }
    };

    const handleClear = () => {
        setSearchText(''); // Очищаем поле поиска
        if (inputRef.current) {
            inputRef.current.focus(); // Возвращаем фокус на инпут, чтобы клавиатура не закрывалась
        }
    };

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
            </div>
            {/* Вторая часть: Стрелка назад и текст */}
            <div className={styles.genderBlock}>
                <button
                    className={`${styles.genderButton} ${selectedGender === 'male' ? styles.selected : ''}`}
                    onClick={() => handleGenderSelect('male')}
                >
                    Мужское
                </button>
                <button
                    className={`${styles.genderButton} ${selectedGender === 'female' ? styles.selected : ''}`}
                    onClick={() => handleGenderSelect('female')}
                >
                    Женское
                </button>
            </div>
            <div className={styles.searchBlock}>
                <div className={isActive ? `${styles.searchBar} ${styles.active}` : styles.searchBar}>
                    <div className={styles.inputContainer}>
                        <Image
                            src={searchLogo} // Путь к изображению лупы
                            alt="Search Icon"
                            width={20}
                            height={20}
                            className={styles.searchIcon}
                        />
                        <input
                            type="text"
                            placeholder="Поиск среди 2'000'000+ товаров"
                            value={searchText}
                            onClick={handleInputClick}
                            onBlur={handleBlur}
                            onChange={(e) => setSearchText(e.target.value)}
                            className={styles.searchInput}
                            ref={inputRef} // Привязываем реф к инпуту
                        />
                        {isActive && searchText && (
                            <div className={styles.clearButton} onClick={handleClear}>
                                ✕
                            </div>
                        )}
                    </div>
                </div>
                {isActive && (
                    <div className={styles.closeButton2} onClick={handleClose}>
                        Закрыть
                    </div>
                )}
            </div>
            <div className={styles.mainCats}>
                <div className={styles.mainCatsRow}>
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/1.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.mainCat}
                        width={700}
                        height={700}
                        layout="responsive"
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/2.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.mainCat}
                        width={700}
                        height={700}
                        layout="responsive"
                        quality={100}
                    />
                </div>
                <div className={styles.mainCatsRow}>
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/3.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.mainCat}
                        width={700}
                        height={700}
                        layout="responsive"
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/4.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.mainCat}
                        width={700}
                        height={700}
                        layout="responsive"
                        quality={100}
                    />
                </div>
            </div>
            <div className={styles.popularCats}>
                <div className={styles.brandsTitle}>ПОПУЛЯРНЫЕ КАТЕГОРИИ</div>
                <div className={styles.popularCatsRow}>
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/5.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/6.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/7.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/8.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/9.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/10.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/11.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/12.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/13.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/14.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/15.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/16.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/17.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/18.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/19.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/MainImages/20.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                </div>
            </div>
            <div style={{marginBottom: '2px'}}>
                <Image
                    src={`/Images New Frontend/Mobile/Men/Menu/MainImages/21.png?v=${Date.now()}`}
                    alt="Brand Image"
                    width={700}
                    height={700}
                    quality={100}
                    style={{width: '100%', height: 'auto'}}
                />
            </div>
            <div style={{display: 'flex', gap: '2px', marginBottom: '2px'}}>
                <Image
                    src={`/Images New Frontend/Mobile/Men/Menu/MainImages/22.png?v=${Date.now()}`}
                    alt="Brand Image"
                    width={700}
                    height={700}
                    quality={100}
                    style={{width: '50%', height: 'auto'}}
                />
                <Image
                    src={`/Images New Frontend/Mobile/Men/Menu/MainImages/23.png?v=${Date.now()}`}
                    alt="Brand Image"
                    width={700}
                    height={700}
                    quality={100}
                    style={{width: '50%', height: 'auto'}}
                />
            </div>
            <div style={{marginBottom: '50px'}}>
                <Image
                    src={`/Images New Frontend/Mobile/Men/Menu/MainImages/24.png?v=${Date.now()}`}
                    alt="Brand Image"
                    width={700}
                    height={700}
                    quality={100}
                    style={{width: '100%', height: 'auto'}}
                />
            </div>

            <div className={styles.brandsSection}>
                <div className={styles.brandsTitle2}>ПОПУЛЯРНЫЕ ЛИНЕЙКИ</div>
                <div className={styles.brandsGridCont}>
                    <div className={styles.brandsGrid}>
                        {Array.from({length: 68}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Mobile/Men/Menu/PopularLines/${idx + 1}.png?v=${Date.now()}`}
                                        alt="Brand Image"
                                        className={styles.circleImage}
                                        width={700}
                                        height={700}
                                        layout="responsive"
                                        quality={100}
                                    />
                                </div>
                                <div className={styles.circleText}>{textsLines[idx]}</div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.moreLines}>
                        <div>
                            <Image
                                src={more} // Путь к изображению лупы
                                alt="Search Icon"
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className={styles.moreLinesText}>
                            Все 100+ линеек
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.brandsSection}>
                <div className={styles.brandsTitle}>ПОДБОРКИ</div>
                <div className={styles.sets}>
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/Sets/1.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.setImg}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/Sets/2.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.setImg}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Men/Menu/Sets/3.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.setImg}
                        width={700}
                        height={700}
                        quality={100}
                    />
                </div>
            </div>

            <div className={styles.centerButton}>Посмотреть все 2’000’000+ товаров</div>
        </div>

    );
};

export default observer(MobileMenuMen);