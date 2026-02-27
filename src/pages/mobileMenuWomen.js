import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/MobileMenuWomen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import logo from "@/static/img/sellout_logo.svg";
import cross from '@/static/icons/x-lg.svg'
import search from "@/static/img/sellout_logo.svg";
import more from "@/static/img/sellout_logo.svg";

const MobileMenuWomen = () => {
    const textsLines = [
        'adidas Samba', 'adidas Gazelle', 'adidas Campus', 'adidas Spezial','adidas Forum', 'Air Jordan 1 Low', 'Air Jordan 1 Mid', 'Air Jordan 1 High','New Balance 530', 'New Balance 550', 'New Balance 990', 'New Balance 1906R','adidas SL', 'Converse Run Star', 'adidas Falcon', 'adidas Stan Smith','Air Jordan 4', 'Air Jordan 3', 'New Balance 327', 'adidas Superstar','Nike Air Max 720', 'Nike Air Max 95', 'New Balance 993', 'Yeezy 700','Nike Dunk', 'Nike Air Force 1', 'Nike Zoom', 'Nike Cortez','Nike V2K', 'Nike Blazer', 'Nike Air Max 1', 'Nike Air Max 90','Converse', 'Vans Knu', 'NB 2002R', 'New Balance 9060','Foam Runner', 'Nike M2K', 'Yeezy 350', 'adidas NMD','Yeezy Slide', 'adidas Adilette', 'New Balance 574', 'Human Race','Nike Air Max 97', 'adidas Rivalry', 'Yeezy 380', 'Nike VaporMax'
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
                            src={search} // Путь к изображению лупы
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
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/1.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.mainCat}
                        width={700}
                        height={700}
                        layout="responsive"
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/2.png?v=${Date.now()}`}
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
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/3.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.mainCat}
                        width={700}
                        height={700}
                        layout="responsive"
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/4.png?v=${Date.now()}`}
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
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/5.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/6.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/7.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/8.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/9.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/10.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/11.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/12.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/13.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/14.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/15.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/16.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/17.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/18.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/19.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/20.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/21.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/22.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/23.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/24.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.popularCat}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/MainImages/25.png?v=${Date.now()}`}
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
                    src={`/Images New Frontend/Mobile/Women/Menu/MainImages/26.png?v=${Date.now()}`}
                    alt="Brand Image"
                    width={700}
                    height={700}
                    quality={100}
                    style={{width: '100%', height: 'auto'}}
                />
            </div>
            <div style={{display: 'flex', gap: '2px', marginBottom: '2px'}}>
                <Image
                    src={`/Images New Frontend/Mobile/Women/Menu/MainImages/27.png?v=${Date.now()}`}
                    alt="Brand Image"
                    width={700}
                    height={700}
                    quality={100}
                    layout="responsive"
                    style={{display: 'block'}}
                />
                <Image
                    src={`/Images New Frontend/Mobile/Women/Menu/MainImages/28.png?v=${Date.now()}`}
                    alt="Brand Image"
                    width={700}
                    height={700}
                    quality={100}
                    layout="responsive"
                    style={{display: 'block'}}
                />
            </div>
            <div style={{marginBottom: '50px'}}>
                <Image
                    src={`/Images New Frontend/Mobile/Women/Menu/MainImages/29.png?v=${Date.now()}`}
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
                        {Array.from({length: 48}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Image
                                        src={`/Images New Frontend/Mobile/Women/Menu/PopularLines/${idx + 1}.png?v=${Date.now()}`}
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
                        src={`/Images New Frontend/Mobile/Women/Menu/Sets/1.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.setImg}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/Sets/2.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.setImg}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/Sets/3.png?v=${Date.now()}`}
                        alt="Brand Image"
                        className={styles.setImg}
                        width={700}
                        height={700}
                        quality={100}
                    />
                    <Image
                        src={`/Images New Frontend/Mobile/Women/Menu/Sets/4.png?v=${Date.now()}`}
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

export default observer(MobileMenuWomen);