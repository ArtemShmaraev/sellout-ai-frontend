import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './Sidebar.module.css'
import tg from '@/static/icons/tg.svg'
import tgBlack from '@/static/icons/tg_black.svg'
import Image from "next/image";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import logo from "@/static/img/sellout_logo.svg";
import Link from "next/link";
import ContactModal from "@/components/shared/ContactModal/ContactModal";
import TextModal from "@/components/shared/UI/TextModal/TextModal";
import warranty from "@/static/icons/warranty.svg";
import payment from "@/static/icons/payment.svg";
import refund from "@/static/icons/arrow-return-left.svg";
import {fetchFilter} from "@/http/productsApi";
import truck from "@/static/icons/truck.svg";
import LoyaltyFAQ from "@/components/pages/account/LoyaltyFAQ/LoyaltyFAQ";
import returnImg from "@/static/icons/arrow-return-left.svg";
import shield from "@/static/icons/shield-check 1.svg";
import patch from "@/static/icons/patch-check 1.svg";
import personCheck from "@/static/icons/person-check 1.svg";
import file from "@/static/icons/file-earmark-check 1.svg";
import creditCard from "@/static/icons/credit-card 2.svg";
import HowWeWorkModal from "@/components/shared/HowWeWorkModal/HowWeWorkModal";
import Cookies from "js-cookie";
import igBlack from "@/static/icons/igImg.svg";
import igWhite from "@/static/icons/igImgWhite.svg";
import imgUs4Mob from "@/static/img/Гарантии 1 mob.png";
import imgUs5Mob from "@/static/img/Гарантии 2 mob.png";
import imgUs6Mob from "@/static/img/Гарантии 3 mob.png";
import imgUs7Mob from "@/static/img/Гарантии 4 mob.png";
import imgUs8Mob from "@/static/img/Гарантии 5 mob.png";
import imgUs9Mob from "@/static/img/Гарантии 6 mob.png";
import imgUs10Mob from "@/static/img/Гарантии 7 mob.png";
import imgUs11Mob from "@/static/img/Гарантии 8 mob.png";
import {desktopStore} from "@/store/DesktopStore";
import styles from "@/styles/MobileMenuMen.module.css";
import cross from "@/static/icons/x-lg.svg";
import searchLogo from "@/static/icons/searchMob.svg";
import more from "@/static/icons/moreIcon.svg";
import backLogo from "@/static/icons/chevron-left.svg";
import CatalogShoesMobile from "@/pages/catalog/catalogShoesMobile";
import CatalogClothesMobile from "@/pages/catalog/catalogClothesMobile";
import CatalogBagsMobile from "@/pages/catalog/catalogBagsMobile";
import CatalogAccessoriesMobile from "@/pages/catalog/catalogAccessoriesMobile";
import CatalogBasketballMobile from "@/pages/catalog/catalogBasketballMobile";
import CatalogBrandsMobile from "@/pages/catalog/catalogBrandsMobile";
import CatalogSneakersMobile from "@/pages/catalog/catalogSneakersMobile";
import SearchModal from "@/components/shared/SearchModalNew/SearchModal";

const Sidebar = ({
                     initialSection = "main", // Дефолтная текущая секция
                     initialOpenedSections = ["main"], // Дефолтный список открытых секций
                     initialScrollPositions = {main: 0}, // Дефолтные позиции скролла
                 }) => {
    const {userStore} = useContext(Context)
    const router = useRouter()
    const sidebarRef = useRef(null)
    const [isClosing, setIsClosing] = useState(false);
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            desktopStore.setMobileSideBar(false)
            desktopStore.setCurrentSection("main"); // Устанавливаем текущую секцию
            desktopStore.setOpenedSections(["main"]); // Задаем список открытых секций
            desktopStore.setScrollPosition({main: 0}); // Устанавливаем позиции скролла
            document.body.classList.remove('body-scroll-clip')
        }, 300);
    }

    // Сброс состояния закрытия при повторном открытии
    useEffect(() => {
        if (desktopStore.mobileSideBar) {
            setIsClosing(false);
        }
    }, [desktopStore.mobileSideBar]);

    const [filters, setFilters] = useState(null)
    useEffect(() => {
        fetchFilter('tree_line').then(res => setFilters(res))
    }, [])

    const [contactOpen, setContactOpen] = useState(false)

    const selectedGender = Cookies.get('selected_gender')

    const handleGenderSelection = (gender) => {
        // setSelectedGender(gender);
        Cookies.set('selected_gender', gender, {expires: 2772});
        handleClose()
    };
    const toggleContact = () => {
        setContactOpen(!contactOpen)
    }
    const closeContact = () => {
        setContactOpen(false)
    }
    useEffect(() => {
        document.body.classList.add('body-scroll-clip')

        return () => {
            document.body.classList.remove('body-scroll-clip')
        }
    }, [])

    function changeBrowserColor(color) {
        // Для Chrome, Firefox, Opera на Android
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', color);
        }

        // Для Safari на iOS (к сожалению, не все цвета поддерживаются)
        const statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
        if (statusBarMeta) {
            // Изменение цвета status-bar на iOS
            statusBarMeta.setAttribute('content', 'black-translucent'); // ограниченные возможности
        }

        // Для Microsoft Edge
        const msNavbuttonMeta = document.querySelector('meta[name="msapplication-navbutton-color"]');
        if (msNavbuttonMeta) {
            msNavbuttonMeta.setAttribute('content', color);
        }
    }

    const [howOpen, setHowOpen] = useState(false)

    const toggleHow = () => {
        setHowOpen(!howOpen)
        changeBrowserColor("#000000")
    }
    const closeHow = () => {
        setHowOpen(false)
        changeBrowserColor("#ffffff")
    }

    const textsLinesM = ['Air Jordan 1',
        'Air Jordan 3',
        'Air Jordan 4',
        'Air Jordan 35',
        'Air Jordan 36',
        'Air Jordan 38',
        'Yeezy 350',
        'Yeezy 500',
        'Yeezy 700',
        'Asics',
        'New Balance 550',
        'New Balance 1906R',
        'New Balance 9060',
        'New Balance 327',
        'New Balance 530',
        'New Balance 574',
        'New Balance 990',
        'New Balance 993',
        'New Balance 992',
        'adidas Samba',
        'Human Race',
        'adidas Campus',
        'adidas Gazelle',
        'adidas Forum',
        'Yeezy 380',
        'Yeezy 450',
        'Yeezy 750',
        'Foam Runner',
        'Yeezy Slide',
        'Air Uptempo',
        'adidas NMD',
        'adidas Stan Smith',
        'adidas Ultraboost',
        'adidas Superstar',
        'Nike Dunk',
        'Nike Air Force 1',
        'Nike Air Max 1',
        'Nike Air Max 90',
        'Nike Blazer',
        'Nike Zoom',
        'Nike Cortez',
        'Nike Kobe',
        'Nike LeBron',
        'Nike Kyrie',
        'NB 2002R',
        'Vans',
        'Nike Air Max 95',
        'Nike Air Max 98',
        'Nike React',
        'Nike KD',
        'Nike Foamposite',
        'Nike VaporMax',
        'Nike Air Max 720',
        'Nike Air Max 270',
        'Nike Freak',
        'Jordan Tatum',
        'James Harden',
        'Trae Young',
        'Converse',
        'Anta',
        'Li-Ning',
        'Under Armour',
        'Nike Air Presto',
        'Nike Air Trainer',
        'Nike Air Max 97',
        'New Balance 997',
        'adidas Ozweego',
        'adidas EQT'
    ];

    const queriesM = [
        {line: 'air_jordan_1'}, // Пример с дополнительным параметром
        {line: 'air_jordan_3'},
        {line: 'air_jordan_4'},
        {line: 'air_jordan_35'},
        {line: 'air_jordan_36'},
        {line: 'air_jordan_38'},
        {line: 'adidas_yeezy_350'},
        {line: 'adidas_yeezy_500'},
        {line: 'adidas_yeezy_700'},
        {line: 'asics', category: 'shoes_category'},
        {line: 'new_balance_550'},
        {line: 'new_balance_1906r'},
        {line: 'new_balance_9060'},
        {line: 'new_balance_327'},
        {line: 'new_balance_530'},
        {line: 'new_balance_574'},
        {line: 'new_balance_990'},
        {line: 'new_balance_993'},
        {line: 'new_balance_992'},
        {line: 'adidas_samba'},
        {line: 'adidas_human_race'},
        {line: 'adidas_campus'},
        {line: 'adidas_gazelle'},
        {line: 'adidas_forum'},
        {line: 'adidas_yeezy_380'},
        {line: 'adidas_yeezy_450'},
        {line: 'adidas_yeezy_750'},
        {line: 'adidas_yeezy_foam_runner'},
        {line: 'adidas_yeezy_slide'},
        {line: 'nike_air_more_uptempo'},
        {line: 'adidas_nmd'},
        {line: 'adidas_stan_smith'},
        {line: 'adidas_ultraboost'},
        {line: 'adidas_superstar'},
        {line: 'nike_dunk'},
        {line: 'nike_air_force_1'},
        {line: 'nike_air_max_1'},
        {line: 'nike_air_max_90'},
        {line: 'nike_blazer'},
        {line: 'nike_zoom'},
        {line: 'nike_cortez'},
        {line: 'nike_kobe_bryant'},
        {line: 'nike_lebron_james'},
        {line: 'nike_kyrie_irving'},
        {line: 'new_balance_2002r'},
        {line: 'vans', category: 'shoes_category'},
        {line: 'nike_air_max_95'},
        {line: 'nike_air_max_98'},
        {line: 'nike_react'},
        {line: 'nike_kd_%28kevin_durant%29'},
        {line: 'nike_foamposite'},
        {line: 'nike_vapormax'},
        {line: 'nike_air_max_720'},
        {line: 'nike_air_max_270'},
        {line: 'nike_freak_%28giannis_antetokounmpo%29'},
        {line: 'jordan_tatum'},
        {line: 'adidas_harden'},
        {line: 'adidas_trae_young'},
        {line: 'converse', category: 'shoes_category'},
        {line: 'anta', category: 'shoes_category'},
        {line: 'li-ning', category: 'shoes_category'},
        {line: 'under_armour', category: 'shoes_category'},
        {line: 'nike_air_presto'},
        {line: 'nike_air_trainer'},
        {line: 'nike_air_max_97'},
        {line: 'new_balance_997'},
        {line: 'adidas_ozweego'},
        {line: 'adidas_eqt'}
    ];

    const textsLinesW = [
        'adidas Samba',
        'adidas Gazelle',
        'adidas Campus',
        'adidas Spezial',
        'adidas Forum',
        'Air Jordan 1 Low',
        'Air Jordan 1 Mid',
        'Air Jordan 1 High',
        'New Balance 530',
        'New Balance 550',
        'New Balance 990',
        'New Balance 1906R',
        'adidas SL',
        'Converse Run Star',
        'adidas Falcon',
        'adidas Stan Smith',
        'Air Jordan 4',
        'Air Jordan 3',
        'New Balance 327',
        'adidas Superstar',
        'Nike Air Max 720',
        'Nike Air Max 95',
        'New Balance 993',
        'Yeezy 700',
        'Nike Dunk',
        'Nike Air Force 1',
        'Nike Zoom',
        'Nike Cortez',
        'Nike V2K',
        'Nike Blazer',
        'Nike Air Max 1',
        'Nike Air Max 90',
        'Converse',
        'Vans Knu',
        'NB 2002R',
        'New Balance 9060',
        'Foam Runner',
        'Nike M2K',
        'Yeezy 350',
        'adidas NMD',
        'Yeezy Slide',
        'adidas Adilette',
        'New Balance 574',
        'Human Race',
        'Nike Air Max 97',
        'adidas Rivalry',
        'Yeezy 380',
        'Nike VaporMax'
    ];

    const queriesW = [
        {line: 'adidas_samba', category: 'shoes_category'}, // Пример с дополнительным параметром
        {line: 'adidas_gazelle'},
        {line: 'adidas_campus'},
        {line: 'adidas_spezial'},
        {line: 'adidas_forum'},
        {line: 'air_jordan_1_low'},
        {line: 'air_jordan_1_mid'},
        {line: 'air_jordan_1_high'},
        {line: 'new_balance_530'},
        {line: 'new_balance_550'},
        {line: 'new_balance_990'},
        {line: 'new_balance_1906r'},
        {line: 'adidas_sl'},
        {line: 'converse_chuck_taylor_run_star'},
        {line: 'adidas_falcon'},
        {line: 'adidas_stan_smith'},
        {line: 'air_jordan_4'},
        {line: 'air_jordan_3'},
        {line: 'new_balance_327'},
        {line: 'adidas_superstar'},
        {line: 'nike_air_max_720'},
        {line: 'nike_air_max_95'},
        {line: 'new_balance_993'},
        {line: 'adidas_yeezy_700'},
        {line: 'nike_dunk'},
        {line: 'nike_air_force_1'},
        {line: 'nike_zoom'},
        {line: 'nike_cortez'},
        {line: 'nike_v2k'},
        {line: 'nike_blazer'},
        {line: 'nike_air_max_1'},
        {line: 'nike_air_max_90'},
        {line: 'converse', category: 'shoes_category'},
        {line: 'vans_knu'},
        {line: 'new_balance_2002r'},
        {line: 'new_balance_9060'},
        {line: 'adidas_yeezy_foam_runner'},
        {line: 'nike_m2k'},
        {line: 'adidas_yeezy_350'},
        {line: 'adidas_nmd'},
        {line: 'adidas_yeezy_slide'},
        {line: 'adidas_adilette'},
        {line: 'new_balance_574'},
        {line: 'adidas_human_race'},
        {line: 'nike_air_max_97'},
        {line: 'adidas_rivalry'},
        {line: 'adidas_yeezy_380'},
        {line: 'nike_vapormax'}
    ];

    const popularCatsLinksM = [
        "",
        "",
        "/products?category=hoodie_sweatshirts",
        "/products?category=cardholders&category=wallets&category=clutches",
        "/products?category=football_boots",
        "/products?category=tshirts",
        "/products?category=slippers",
        "/products?category=all_hats",
        "/products?category=watches",
        "/products?category=shorts",
        "/products?category=canvas_shoes",
        "/products?category=belts",
        "/products?category=collectibles",
        "/products?category=jewelries",
        "/products?category=sunglasses&category=optical_glasses",
        "/products?category=other_sport_shoes&category=football_boots&category=basketball_sneakers&category=sport_clothes&category=sport_goods&category=sport_bags"
    ];

    const popularCatsLinksW = [
        "",
        "/products?category=hoodie_sweatshirts",
        "/products?category=sunglasses&category=optical_glasses",
        "/products?category=shoes",
        "/products?category=panamas",
        "/products?category=tshirts",
        "/products?category=caps",
        "/products?category=tote_bags",
        "/products?category=rings",
        "/products?category=sandals",
        "/products?category=earrings",
        "/products?category=tops",
        "/products?category=bracelets",
        "/products?category=necklaces",
        "/products?category=hobo_bags",
        "/products?category=makeup_bags",
        "/products?category=loafers",
        "/products?category=skirts",
        "/products?category=watches",
        "/products?category=cardholders&category=wallets&category=clutches",
        "/products?category=knitwear"
    ]

    const sections = {
        "main": {
            "id": 0,
            "title": "",
            "name": "main"
        },
        "shoes": {
            "id": 1,
            "title": "ОБУВЬ",
            "name": "shoes"
        },
        "clothes": {
            "id": 2,
            "title": "ОДЕЖДА",
            "name": "clothes"
        },
        "bags": {
            "id": 3,
            "title": "СУМКИ",
            "name": "bags"
        },
        "accessories": {
            "id": 4,
            "title": "АКСЕССУАРЫ",
            "name": "accessories"
        },
        "sneakers": {
            "id": 5,
            "title": "КРОССОВКИ И КЕДЫ",
            "name": "sneakers"
        },
        "brands": {
            "id": 6,
            "title": "БРЕНДЫ",
            "name": "brands"
        },
        "basketball": {
            "id": 7,
            "title": "БАСКЕТБОЛ",
            "name": "basketball"
        }
    }

    const [currentSection, setCurrentSection] = useState(sections[initialSection]);
    const [openedSections, setOpenedSections] = useState(initialOpenedSections); // Список открытых секций
    const [scrollPositions, setScrollPositions] = useState(initialScrollPositions); // Позиции скролла по секциям

    const handleOpenSection = (sectionName) => {
        setScrollPositions((prev) => ({
            ...prev,
            [currentSection["name"]]: sidebarRef.current.scrollTop, // Сохраняем текущую позицию
        }));

        setOpenedSections((prev) => {
            const index = prev.indexOf(sectionName);
            if (index !== -1) {
                // Если секция уже есть, возвращаемся и убираем все последующие
                const updatedSections = prev.slice(0, index + 1);
                setScrollPositions((pos) => {
                    // Удаляем ненужные позиции
                    const newPos = {...pos};
                    Object.keys(newPos)
                        .filter((key) => !updatedSections.includes(key))
                        .forEach((key) => delete newPos[key]);
                    return newPos;
                });
                setCurrentSection(sections[sectionName]); // Устанавливаем текущую секцию
                return updatedSections;
            } else {
                // Если секции нет, добавляем её в список
                const updatedSections = [...prev, sectionName];
                setCurrentSection(sections[sectionName]); // Устанавливаем текущую секцию
                return updatedSections;
            }
        });

        sidebarRef.current.scrollTo(0, 0)
    };

    const handleReturnSection = () => {
        setOpenedSections((prev) => {
            if (prev.length <= 1) {
                setCurrentSection({
                    "id": -1,
                    "title": "",
                    "name": ""
                }); // Если список пуст или один элемент, обнуляем текущую секцию
                return [];
            }
            const updatedSections = prev.slice(0, -1); // Удаляем последнюю секцию
            const previousSection = updatedSections[updatedSections.length - 1]; // Предыдущая секция
            const scrollToPosition = scrollPositions[previousSection] || 0; // Позиция скролла

            setCurrentSection(sections[updatedSections[updatedSections.length - 1]]); // Устанавливаем предыдущую секцию

            // Скроллим к запомненному положению
            setTimeout(() => {
                sidebarRef.current.scrollTo(0, scrollToPosition);
            }, 0);

            return updatedSections;
        });
    };

    const handleNavigate = (path) => {
        handleClose()
        router.push(`/${path}`);
    };

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <div className={`${s.sidebar} ${isClosing ? s.closingSideBar : ""}`} ref={sidebarRef}>
                <div className={styles.header}>
                    {/* Первая часть: Логотип и крестик */}
                    <div className={styles.headerTop}>
                        <div className={styles.logoContainer}>
                            <Image src={logo} alt="Logo" className={styles.logo} width={120} height={50}/>
                        </div>
                        <div className={styles.closeButton} onClick={handleClose}>
                            <Image src={cross} alt="Back" className={styles.backArrow} width={24}
                                   height={24}/>
                        </div>
                    </div>
                </div>

                {currentSection.id === 0 &&
                    <>
                        {selectedGender !== "M" && selectedGender !== "F" &&
                            <div style={{textAlign: 'center', marginTop: '100px', fontSize: '24px'}}>Выберите
                                раздел:</div>
                        }
                        <div className={styles.genderBlock}
                             style={{
                                 marginTop: selectedGender !== "M" && selectedGender !== "F" ? '10px' : '',
                                 marginBottom: selectedGender !== "M" && selectedGender !== "F" ? '200px' : ''
                             }}>
                            {selectedGender === 'M' ? (
                                <button
                                    className={`${styles.genderButton} ${selectedGender === 'M' ? styles.selected : ''}`}
                                >
                                    Мужское
                                </button>
                            ) : (
                                <Link href={'/men'} style={{cursor: 'pointer'}}
                                      className={`${styles.genderButton} ${selectedGender === 'M' ? styles.selected : ''}`}
                                      onClick={() => handleGenderSelection('M')}
                                >
                                    Мужское
                                </Link>
                            )
                            }

                            {selectedGender === 'F' ? (
                                <button
                                    className={`${styles.genderButton} ${selectedGender === 'F' ? styles.selected : ''}`}
                                >
                                    Женское
                                </button>
                            ) : (
                                <Link href={'/women'}
                                      className={`${styles.genderButton} ${selectedGender === 'F' ? styles.selected : ''}`}
                                      onClick={() => handleGenderSelection('F')}
                                >
                                    Женское
                                </Link>
                            )
                            }
                        </div>
                        {(selectedGender === "M" || selectedGender === "F") &&
                            <SearchModal setIsOpenInSideBar={setIsSearchOpen} sideBarRef={sidebarRef} handleCloseSideBar={handleClose}/>
                        }
                    </>
                }

                {currentSection.id === 0 && (selectedGender === "M" || selectedGender === "F") && !isSearchOpen &&
                    <div>
                        <div style={{marginBottom: '2px'}}>
                            <Link
                                href={{
                                    pathname: '/products',
                                    query: {is_sale: 'is_sale'}
                                }}
                                onClick={handleClose}
                            >
                                <Image
                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Menu/MainImages/${selectedGender === "M" ? "21" : "26"}.png`}
                                    alt="Brand Image"
                                    width={430}
                                    height={260}
                                    quality={100}
                                    style={{width: '100%', height: 'auto'}}
                                />
                            </Link>
                        </div>
                        <div style={{display: 'flex', gap: '2px', marginBottom: '2px'}}>
                            <Link
                                href={{
                                    pathname: '/products',
                                    query: {new: true}
                                }}
                                onClick={handleClose}
                                style={{flex: 1}}
                            >
                                <Image
                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Menu/MainImages/${selectedGender === "M" ? "22" : "27"}.png`}
                                    alt="Brand Image"
                                    width={428}
                                    height={selectedGender === "M" ? 452 : 346}
                                    quality={100}
                                    layout="responsive"
                                    style={{display: 'block'}}
                                />
                            </Link>
                            <Link
                                href={{
                                    pathname: '/products',
                                    query: {recommendations: true}
                                }}
                                onClick={handleClose}
                                style={{flex: 1}}
                            >
                                <Image
                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Menu/MainImages/${selectedGender === "M" ? "23" : "28"}.png`}
                                    alt="Brand Image"
                                    width={428}
                                    height={selectedGender === "M" ? 452 : 346}
                                    quality={100}
                                    layout="responsive"
                                    style={{display: 'block'}}
                                />
                            </Link>
                        </div>
                        <div className={styles.mainCats}>
                            <div className={styles.mainCatsRow}>
                                <Image
                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Menu/MainImages/1.png`}
                                    alt="Brand Image"
                                    className={styles.mainCat}
                                    width={642}
                                    height={600}
                                    quality={100}
                                    onClick={() => handleOpenSection("shoes")}
                                />
                                <Image
                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Menu/MainImages/2.png`}
                                    alt="Brand Image"
                                    className={styles.mainCat}
                                    width={642}
                                    height={600}
                                    quality={100}
                                    onClick={() => handleOpenSection("clothes")}
                                />
                            </div>
                            <div className={styles.mainCatsRow}>
                                <Image
                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Menu/MainImages/3.png`}
                                    alt="Brand Image"
                                    className={styles.mainCat}
                                    width={642}
                                    height={600}
                                    quality={100}
                                    onClick={() => handleOpenSection("bags")}
                                />
                                <Image
                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Menu/MainImages/4.png`}
                                    alt="Brand Image"
                                    className={styles.mainCat}
                                    width={642}
                                    height={600}
                                    quality={100}
                                    onClick={() => handleOpenSection("accessories")}
                                />
                            </div>
                        </div>
                        <div className={styles.popularCats}>
                            <div className={styles.brandsTitle}>ПОПУЛЯРНЫЕ КАТЕГОРИИ</div>
                            <div className={styles.popularCatsRow}>
                                {Array.from({length: selectedGender === "M" ? 16 : 21}, (_, index) => (
                                    <Image
                                        key={index}
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Menu/MainImages/${index + 5}.png`}
                                        alt={`Image ${index + 1}`}
                                        className={styles.popularCat}
                                        width={700}
                                        height={700}
                                        quality={100}
                                        onClick={() => {
                                            if (index === 0) {
                                                handleOpenSection("sneakers");
                                            } else if (index === 1 && selectedGender === "M") {
                                                handleOpenSection("basketball");
                                            } else {
                                                const path = selectedGender === "M" ? popularCatsLinksM[index] : popularCatsLinksW[index];
                                                if (path) handleNavigate(path);
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div style={{marginBottom: '50px'}}>
                            <Image
                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Menu/MainImages/${selectedGender === "M" ? "24" : "29"}.png`}
                                alt="Brand Image"
                                width={430}
                                height={selectedGender === "M" ? 286 : 225}
                                quality={100}
                                style={{width: '100%', height: 'auto'}}
                                onClick={() => handleOpenSection("brands")}
                            />
                        </div>
                        <div className={styles.brandsSection}>
                            <div className={styles.brandsTitle2}>ПОПУЛЯРНЫЕ ЛИНЕЙКИ</div>
                            <div className={styles.brandsGridCont}>
                                <div className={styles.brandsGrid}
                                     style={{gridTemplateColumns: `repeat(${selectedGender === "M" ? 34 : 24}, 110px`}}>
                                    {Array.from({length: selectedGender === "M" ? 68 : 48}).map((_, idx) => (
                                        <div key={idx} className={styles.brandCircle}>
                                            <div className={styles.circle}>
                                                <Link
                                                    href={{
                                                        pathname: '/products',
                                                        query: selectedGender === "M" ? queriesM[idx] : queriesW[idx]
                                                    }}
                                                    onClick={handleClose}
                                                    style={{flex: 1}}
                                                >
                                                    <Image
                                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Menu/PopularLines/${idx + 1}.png`}
                                                        alt="Brand Image"
                                                        className={styles.circleImage}
                                                        width={700}
                                                        height={700}
                                                        layout="responsive"
                                                        quality={100}
                                                    />
                                                </Link>
                                            </div>
                                            <div
                                                className={styles.circleText}>{selectedGender === "M" ? textsLinesM[idx] : textsLinesW[idx]}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.moreLines} onClick={() => handleOpenSection("sneakers")}>
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
                                <Link
                                    href={{
                                        pathname: '/products',
                                        query: {collection: selectedGender === "M" ? 'bargainsmen' : 'trendswomen'}
                                    }}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Menu/Sets/1.png`}
                                        alt="Brand Image"
                                        className={styles.setImg}
                                        width={700}
                                        height={700}
                                        quality={100}
                                    />
                                </Link>
                                <Link
                                    href={{
                                        pathname: '/products',
                                        query: {collection: selectedGender === "M" ? 'springmen' : 'springwomen'}
                                    }}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Menu/Sets/5.png`}
                                        alt="Brand Image"
                                        className={styles.setImg}
                                        width={700}
                                        height={700}
                                        quality={100}
                                    />
                                </Link>
                                <Link
                                    href={{
                                        pathname: '/products',
                                        query: {collection: selectedGender === "M" ? 'topshelfmen' : 'bagsunder20000women'}
                                    }}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Menu/Sets/2.png`}
                                        alt="Brand Image"
                                        className={styles.setImg}
                                        width={700}
                                        height={700}
                                        quality={100}
                                    />
                                </Link>
                                {selectedGender === "M" &&
                                    <Link
                                        href={{
                                            pathname: '/products',
                                            query: {collection: selectedGender === "M" ? 'basketballmvpmen' : 'topshelfwomen'}
                                        }}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Menu/Sets/4.png`}
                                            alt="Brand Image"
                                            className={styles.setImg}
                                            width={700}
                                            height={700}
                                            quality={100}
                                        />
                                    </Link>
                                }
                                <Link
                                    href={{
                                        pathname: '/products',
                                        query: {
                                            collection: selectedGender === "M" ? '8march' : 'peachfuzz',
                                            gender: "F"
                                        }
                                    }}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Menu/Sets/3.png`}
                                        alt="Brand Image"
                                        className={styles.setImg}
                                        width={700}
                                        height={700}
                                        quality={100}
                                    />
                                </Link>
                                {selectedGender === "F" &&
                                    <Link
                                        href={{
                                            pathname: '/products',
                                            query: {collection: selectedGender === "M" ? 'bargainsmen' : 'topshelfwomen'}
                                        }}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Menu/Sets/4.png`}
                                            alt="Brand Image"
                                            className={styles.setImg}
                                            width={700}
                                            height={700}
                                            quality={100}
                                        />
                                    </Link>
                                }
                            </div>
                        </div>
                        <div className={styles.centerButton}>
                            <Link
                                href={{
                                    pathname: '/products'
                                }}
                                onClick={handleClose}
                                style={{textDecoration: 'none'}}
                            >
                                Посмотреть все 2’000’000+ товаров
                            </Link>
                        </div>
                    </div>
                }

                {[1, 2, 3, 4, 5, 6, 7].includes(currentSection.id) &&
                    <div className={s.headerBottomSection}>
                        {openedSections.length > 1 &&
                            <div className={s.backArrowContainerSection} onClick={handleReturnSection}>
                                <Image src={backLogo} alt="Back" className={s.backArrowSection} width={24}
                                       height={24} loading={"eager"}/>
                            </div>
                        }
                        <div className={s.headerTitleSection}>
                            {currentSection.title}
                        </div>
                    </div>
                }

                {currentSection.id === 1 &&
                    <CatalogShoesMobile handleClose={handleClose}
                                        handleOpenSection={handleOpenSection}></CatalogShoesMobile>
                }

                {currentSection.id === 2 &&
                    <CatalogClothesMobile handleClose={handleClose}></CatalogClothesMobile>
                }

                {currentSection.id === 3 &&
                    <CatalogBagsMobile handleClose={handleClose}></CatalogBagsMobile>
                }

                {currentSection.id === 4 &&
                    <CatalogAccessoriesMobile handleClose={handleClose}></CatalogAccessoriesMobile>
                }

                {currentSection.id === 5 &&
                    <CatalogSneakersMobile handleClose={handleClose}
                                           handleOpenSection={handleOpenSection}></CatalogSneakersMobile>
                }

                {currentSection.id === 6 &&
                    <CatalogBrandsMobile handleClose={handleClose}
                                         handleOpenSection={handleOpenSection}></CatalogBrandsMobile>
                }

                {currentSection.id === 7 &&
                    <CatalogBasketballMobile handleClose={handleClose}></CatalogBasketballMobile>
                }

                <div className={s.sidebar_footer}>
                    <div className={s.col}>
                        <Link href="/about" className={s.sidebar_links} onClick={handleClose} target={'_blank'}>О
                            нас</Link>
                        <Link href="https://t.me/selloutsu" className={s.sidebar_links} onClick={handleClose}
                              target={'_blank'}>Блог</Link>
                        <span className={s.sidebar_links}
                              onClick={toggleContact}
                        >Контакты</span>
                    </div>
                    <div className={s.col}>
                        <div className={s.social_media}>
                            <h4 className={'text-white'} style={{textAlign: 'left', marginBottom: '0'}}>Мы в
                                социальных сетях:</h4>
                            <div className={s.icons_block2}>
                                <div className={s.socialsBlock}>
                                    <a href={'https://t.me/selloutsu'}>
                                        <Image src={tg} width={45} alt="" className={s.icon}/>
                                    </a>
                                    <span className={s.mainSocialsText2}>
                                              Телеграм: <br/>
                                              @<a href="https://t.me/selloutsu" className={s.linkTgSocials2}>
                                                selloutsu
                                              </a>
                                        </span>
                                </div>
                                <div className={s.socialsBlock}>
                                    <a>
                                        <Image src={igWhite} width={45} alt="" className={s.icon}/>
                                    </a>
                                    <span className={s.mainSocialsText2}>
                                              Запретграм: <br/> @sellout_platform
                                        </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.col}>
                        <h4 className='text-white'>Помощь</h4>
                        <div>
                            <span className={s.footer_link} onClick={toggleHow}>Как мы работаем?</span>
                        </div>
                        <TextModal title={'Гарантии оригинальности и отзывы'} img={warranty}
                                   titleClassname={s.footer_link}>
                            <>
                                <Image src={shield} alt='' width={60}/>
                                <h4 className={'my-3'}>Гарантии оригинальности и качества</h4>
                                <p className={s.text}>
                                    На SELLOUT продаются только 100% оригинальные и новые вещи. Мы бережно относимся
                                    к своей репутации и не допускаем подделок. Мы сотрудничаем только с проверенными
                                    бутиками, магазинами и продавцами. Каждый товар перед отправкой покупателю
                                    проходит тщательные проверки на оригинальность и качество. Наша команда состоит
                                    из специалистов, которые уже более 5 лет занимаются проверкой подлинности
                                    одежды, обуви и прочих аксессуаров, а также использует передовые технологии
                                    искусственного интеллекта, чтобы исключить человеческий фактор.

                                </p>
                                <h5 className={'mb-3 mt-5'}>Вы можете найти нас во всех соц. сетях и посмотреть
                                    отзывы, подробнее прочитать <Link href={'/about'} className={s.link}
                                                                      target={'_blank'}>про нашу компанию</Link>, а
                                    также изучить отзывы на интернет ресурсах:</h5>
                                <div className={s.icons_block}>
                                    <div className={s.socialsCont}>
                                        <a style={{height: '45px'}}>
                                            <Image src={igBlack} height={45} alt="" className={s.icon}/>
                                        </a>
                                        <span className={s.mainSocialsText}>
                                                  Запретграм: <br/> @sellout_platform
                                            </span>
                                    </div>

                                    <div className={s.socialsCont}>
                                        <a href={'https://t.me/selloutsu'} style={{height: '45px'}}>
                                            <Image src={tgBlack} height={45} alt="" className={s.icon}/>
                                        </a>
                                        <span className={s.mainSocialsText}>
                                                  Телеграм: <br/>
                                                  @<a href="https://t.me/selloutsu" className={s.linkTgSocials}>
                                                    selloutsu
                                                  </a>
                                            </span>
                                    </div>
                                </div>
                                <div className={s.icons_block}>
                                    <iframe
                                        src="https://www.yandex.ru/sprav/widget/rating-badge/108238948174?type=rating&theme=dark"
                                        width="150" height="50" frameBorder="0"></iframe>
                                    {/*<a id="zoon_widget_210x40_dark"*/}
                                    {/*   href="https://zoon.ru/service/657ee85a79a80027cf0274d7/">*/}
                                    {/*    <img src="https://zoon.ru/wg/210x40/657ee85a79a80027cf0274d7/dark/"*/}
                                    {/*         alt="Интернет-магазин Sellout" title="Интернет-магазин Sellout"*/}
                                    {/*         width="210" height="40"/>*/}
                                    {/*</a>*/}
                                </div>
                                <Image src={patch} alt='' width={60} className={'mt-3'}/>
                                <h5 className={'my-3'}>Какие этапы проверки проходит каждый товар?</h5>
                                <Image src={personCheck} alt='' width={60}/>
                                <h5 className={'my-3'}>Проверка партнера</h5>
                                <p className={s.text}>
                                    Перед тем как оказаться на платформе SELLOUT, мы тщательно проверяем наших
                                    контрагентов. Мы работаем только с крупнейшими международными ресурсами с
                                    многомиллиардными оборотами и годами проверенными продавцами, а также частными
                                    коллекционерами, деятелями искусства и моды и публичными персонами.

                                </p>
                                <Image src={file} alt='' width={60}/>
                                <h5 className={'my-3'}>Многоэтапная проверка</h5>
                                <p className={s.text}>
                                    Несмотря на надёжность каждого партнера, мы дополнительно проверяем каждый товар
                                    по прибытии к нам на склад. Мы можем запросить дополнительную проверку у
                                    независимых экспертов, если сомневаемся в оригинальности товара. Лишь после
                                    этого мы приложим к товару сертификат подлинности и сопутствующий комплект,
                                    подтверждающий оригинальность (пломбы, наклейки и.т.д) и отправим вам заказ!

                                </p>
                                <Image src={creditCard} alt='' width={60}/>
                                <h5 className={'my-3'}>Безопасная оплата</h5>
                                <p className={s.text}>
                                    Деньги на вашем счету замораживаются и списываются лишь после того, как ваш
                                    заказ повторно успешно пройдет все проверки на оригинальность и качество! В ином
                                    случае деньги будут незамедлительно разморожены и станут доступными на вашем
                                    счете.
                                </p>
                                <div className={s.faq_block}>
                                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                    <LoyaltyFAQ
                                        title={'Что делать, если сомневаетесь в оригинальности или качестве?'}>
                                        Если вы считаете, что вам привезли подделку или бракованный товар, можете
                                        смело обращаться в службу поддержки, и мы разберемся в вашей ситуации. Мы
                                        проведем ряд дополнительных проверок, а также призовем независимых экспертов
                                        для вынесения объективного вердикта. Мы настоятельно рекомендуем фиксировать
                                        на видео факт получения и вскрытия заказа, чтобы избежать двояких ситуаций!
                                        Согласно нашим правилам, за попытку продажи через платформу Sellout
                                        неоригинального товара следуют большие штрафы, конфискация товара и отказ от
                                        сотрудничества с партнером. Торговля контрафактом карается законом, наша
                                        компания занимается исключительно легальным и прозрачным бизнесом.

                                    </LoyaltyFAQ>
                                </div>
                                <h5 style={{marginBottom: '30px'}}>Ответы на большинство вопросов вы найдете
                                    здесь: <Link href={'/faq'}
                                                 className={s.link}
                                                 target={'_blank'}>FAQ</Link>
                                </h5>
                                <div className={s.page2}>
                                    <Image src={imgUs4Mob} alt="Img" width={6000} height={2000}
                                           className={s.page2Img}/>
                                </div>
                                <div className={s.page2}>
                                    <Image src={imgUs5Mob} alt="Img" width={6000} height={2000}
                                           className={s.page2Img}/>
                                </div>
                                <div className={s.page2}>
                                    <Image src={imgUs6Mob} alt="Img" width={6000} height={2000}
                                           className={s.page2Img}/>
                                </div>
                                <div className={s.page2}>
                                    <Image src={imgUs7Mob} alt="Img" width={6000} height={2000}
                                           className={s.page2Img}/>
                                </div>
                                <div className={s.page2}>
                                    <Image src={imgUs8Mob} alt="Img" width={6000} height={2000}
                                           className={s.page2Img}/>
                                </div>
                                <div className={s.page2}>
                                    <Image src={imgUs9Mob} alt="Img" width={6000} height={2000}
                                           className={s.page2Img}/>
                                </div>
                                <div className={s.page2}>
                                    <Image src={imgUs10Mob} alt="Img" width={6000} height={2000}
                                           className={s.page2Img}/>
                                </div>
                                <div className={s.page2}>
                                    <Image src={imgUs11Mob} alt="Img" width={6000} height={2000}
                                           className={s.page2Img}/>
                                </div>
                            </>
                        </TextModal>
                        <TextModal title={'Доставка, оплата, возврат'} img={payment} titleClassname={s.footer_link}>
                            <Image src={truck} alt='' width={60}/>
                            <h4 className={'my-3'}>Доставка</h4>
                            <p className={s.text}>
                                Обратите внимание, на кнопке на странице товара указано количество дней, необходимое
                                для доставки от
                                продавца до нашего склада в Москве. Доставка со склада занимает от 1 дня в
                                зависимости вашего от местоположения.<br/><br/>Мы собираем десятки миллионов
                                предложений со всего мира: от различных бутиков,
                                магазинов и частных коллекционеров. В связи с этим мы можем предложить вам разные
                                условия доставки: от самых быстрых до более длительных и при этом выгодных. Выбрав
                                размер или конфигурацию товара, вам предстоит выбрать срок доставки и
                                соответствующую цену. Обычно мы укладываемся сильно раньше, чем указанный крайний
                                срок, однако мы берем время с запасом, чтобы учесть все непредвиденные
                                обстоятельства.

                            </p>
                            <div className={s.faq_block}>
                                <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                <LoyaltyFAQ
                                    title={'Какие существуют варианты доставок с нашего склада в Москве до вас?'}>
                                    При оформлении заказа вы указываете адрес и способ доставки. Мы доставляем,
                                    используя курьерскую службу Boxberry
                                    {/*, а также на данный момент доставка по*/}
                                    {/*Москве бесплатная!*/}
                                    <br/>
                                    Вы можете выбрать доставку до Пункта Выдачи Заказов (ПВЗ) Boxberry, отметив на
                                    карте нужный ПВЗ, или выбрать доставку курьером до двери.
                                    <br/>
                                    Самовывоза на данный момент нет, но скоро появится!

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Как рассчитывается стоимость доставки?'}>
                                    Стоимость доставки рассчитываются автоматически на этапе оформления заказа. Она
                                    зависит от количества и веса
                                    товаров, способа и типа доставки, а также от адреса.

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Куда мы доставляем?'}>
                                    Мы доставляем по всей России службой курьерской доставки Boxberry. Очень скоро
                                    появится доставка в страны СНГ!

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Какая скорость доставки со склада в Москве?'}>
                                    В зависимости от вашего города доставка занимает
                                    от одного до нескольких дней после прибытия вашего заказа на наш склад в Москве.
                                    Подробнее вы сможете отслеживать на сайте или в приложении Boxberry.

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Как отслеживать доставку?'}>
                                    Как только ваш заказ приедет на наш склад в Москве и будет отправлен курьерской
                                    службой Boxberry, вам
                                    придет уведомление на почту с информацией о трек-номере отправления, а также
                                    трек-номер появится в
                                    личном кабинете в информации о вашем заказе.
                                    <br/>
                                    Отследить заказ можно по
                                    этой <a href="https://boxberry.ru/tracking-page" className={'text-black'}
                                            target={'_blank'}>ссылке</a> или в мобильном приложении Boxberry.
                                    Отправление
                                    автоматически появляется в приложении, если авторизоваться под теми
                                    же данными, под которыми был выполнен заказ на нашем сайте.

                                </LoyaltyFAQ>
                            </div>


                            <Image src={payment} alt='' width={60}/>
                            <h4 className={'my-3'}>Оплата</h4>
                            <p className={s.text}>
                                При оплате товара средства с вашей карты замораживаются эквайрингом, а не
                                списываются. Далее мы должны подтвердить ваш заказ, провести дополнительный ряд
                                проверок, если требуется, и только после этого деньги поступят к нам. Обычно
                                подтверждение заказа происходит в кратчайшие сроки. Обо всех изменениях статуса
                                заказа вы можете получать уведомления удобным для вас способом, а также следить за
                                ними в личном кабинете. В случае, если заказ не удастся подтвердить, вся сумма будет
                                незамедлительно разморожена и снова станет доступной на вашем счету.

                            </p>
                            <div className={s.faq_block}>
                                <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                <LoyaltyFAQ title={'Безопасная оплата'}>
                                    При оплате заказа банковской картой, обработка платежа (включая ввод номера
                                    карты) происходит на защищенной странице процессинговой системы, которая прошла
                                    международную сертификацию. Это значит, что Ваши конфиденциальные данные
                                    (реквизиты карты, регистрационные данные и др.) не поступают в интернет-магазин,
                                    их обработка полностью защищена и никто, в том числе наш интернет-магазин, не
                                    может получить персональные и банковские данные клиента. При работе с карточными
                                    данными применяется стандарт защиты информации, разработанный международными
                                    платёжными системами Visa и Masterсard-Payment Card Industry Data Security
                                    Standard (PCI DSS), что обеспечивает безопасную обработку реквизитов Банковской
                                    карты Держателя. Применяемая технология передачи данных гарантирует безопасность
                                    по сделкам с Банковскими картами путем использования протоколов Secure Sockets
                                    Layer (SSL), Verifiedby Visa, Secure Code, и закрытых банковских сетей, имеющих
                                    высшую степень защиты.
                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Какие есть способы оплаты?'}>
                                    Мы принимаем всевозможные способы оплаты: МИР, Visa, Mastercard, СБП.
                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Безопасность данных'}>
                                    Мы собираем и не разглашаем третьим лицам конфиденциальную информацию. Более
                                    подробно с политикой обработки персональных данных можно
                                    ознакомиться <a href="/docs/Политика%20конфиденциальности.pdf" target={"_blank"}
                                                    className={'text-black'}>
                                    здесь</a>
                                    <br/>
                                    Все платежи проходят через интернет-эквайринг с использованием защиты 3d-secure.
                                    <br/>
                                    Интернет-эквайринг защищен всеми нужными протоколами и имеет сертификации для
                                    создания безопасной связи между доменами при оплате. Более того,
                                    интернет-эквайринг позволяет отслеживать данные по каждой транзакции (пункт
                                    товара, сумма транзакции, статус транзакции, данные покупателя) и вовремя
                                    заподозрить вредоносные операции со стороны сотрудников, покупателей или
                                    сторонних людей (мошенников).
                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Включены ли таможенные пошлины и налоги в стоимость заказа?'}>
                                    Да, цена окончательная, никаких дополнительных платежей не потребуется!
                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Возврат средств в случае отмены заказа'}>
                                    В большинстве случаев средства при оплате не списываются, а замораживаются на
                                    вашем счете и списываются лишь после окончательного подтверждения заказа. Если
                                    нам не удастся подтвердить заказ, то деньги моментально разморозятся и вернутся
                                    на ваш счет. Вам для этого ничего делать не потребуется. Если деньги уже
                                    списались с вашего счета, то при отмене заказа деньги вернутся в течение 3-10
                                    рабочих дней в зависимости от банка.

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Правила возврата средств при частичной отмене заказа'}>
                                    В большинстве случаев средства при оплате не списываются, а замораживаются на
                                    вашем счете и списываются лишь после окончательного подтверждения заказа. Если
                                    нам не удастся подтвердить заказ частично, то часть денег, которая подлежит
                                    возврату, моментально разморозится и вернется на ваш счет. Вам для этого ничего
                                    делать не потребуется. Если деньги уже списались с вашего счета, то при
                                    частичной отмене заказа часть денег вернется в течение 3-10 рабочих дней в
                                    зависимости от банка.
                                    <br/>
                                    Оплата за ту часть заказа, которая успешна подтверждена, будет списана с вашего
                                    счета.
                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Возможна ли оплата криптовалютой?'}>
                                    На сайте не предусмотрена оплата криптовалютой. В Российской Федерации запрещено
                                    принимать цифровые деньги.
                                </LoyaltyFAQ>
                            </div>


                            <Image src={refund} alt='' width={60}/>
                            <h4 className={'my-3'}>Возврат</h4>
                            <p className={s.text}>
                                Многие представленные на нашей платформе товары выкупаются специально под
                                вас у
                                частных продавцов, коллекционеров или из разных иностранных бутиков и
                                магазинов,
                                поэтому мы не способны предложить вам возврат товара после подтверждения
                                заказа
                                на
                                все позиции.
                            </p>
                            <p className={s.text} style={{color: '#057e48'}}>
                                Если вам необходимо посмотреть товар вживую, померить, определиться с
                                размером и так далее, обязательно <span onClick={toggleContact} style={{
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}>напишите нам</span> и мы оперативно найдем решения: подберем индивидуально
                                для вас другие предложения с возможностью примерки/возврата, подскажем по
                                размеру или где можно посмотреть товар вживую :)
                            </p>
                            <p className={s.text}>
                                Вскоре некоторые позиции будут подлежать
                                возврату, в
                                том
                                числе даже эксклюзивные коллекции. Они будут помечены
                                значком <Image src={returnImg} alt={''}/>. Обращаем внимание, что по
                                правилам
                                зарубежных продавцов, возврат
                                возможен в течение 7 - 30 календарных дней с момента поставки товара на
                                зарубежный
                                склад. Однако срок доставки
                                заказов от склада за рубежом до получателя в РФ может быть больше в связи с
                                ограничениями
                                и особенностями международной логистики. Кроме того, условия возврата могут
                                быть
                                связаны с
                                особенностями законов страны, из которой товар был для вас выкуплен.
                                Несмотря на
                                это, SELLOUT
                                всячески содействует по организации возврата товаров. В случае обнаружения
                                брака
                                или
                                ненадлежащего качества вам необходимо связаться с нами для решения проблемы.
                                Мы
                                постоянно стремимся увеличить ассортимент товаров, подлежащих возврату,
                                чтобы ваши покупки с нами стали еще более удобными!
                            </p>
                            <div className={s.faq_block}>
                                <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                <LoyaltyFAQ title={'Что делать, если пришел не тот товар?'}>
                                    Если вам пришёл поврежденный или несоответствующий заказу товар, откажитесь от
                                    него при получении и свяжитесь с нами для выяснения обстоятельств и
                                    урегулирования вопроса. Также мы настоятельно рекомендуем снимать процесс
                                    вскрытия товара, чтобы избежать
                                    недопониманий!
                                    <ul>
                                        <li>Попросите у сотрудника «акт несоответствия», заполните его и
                                            сфотографируйте.
                                        </li>
                                        <li>Верните товар сотруднику службы доставки и приложите к нему акт.</li>
                                        <li>Незамедлительно напишите нам в службу поддержки по электронному
                                            адресу <a href={'mailto:customerservice@sellout.su'}
                                                      className={'text-black'}>customerservice@sellout.su</a>,
                                            прикрепите к письму фотографию акта несоответствия и укажите проблему.
                                        </li>
                                        <li>Проверка заявления и возврат денежных средств осуществляются в срок до
                                            10 календарных дней с момента отказа от товара при получении.
                                        </li>
                                    </ul>
                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Что делать с неподошедшим товаром?'}>
                                    Мы искренне стараемся помочь вам в такой ситуации, поэтому обязательно напишите
                                    нам, если вам не подошел товар. Мы попробуем продать его через нашу платформу и
                                    иные каналы продажи на особых условиях для вас, и, возможно, вам даже удастся
                                    заработать!

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Можно ли вернуть только часть заказа?'}>
                                    На частичный возврат товаров распространяются точно такие же правила, как и
                                    описано выше.
                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Как быстро вернутся деньги за возврат?'}>
                                    В большинстве случаев средства при оплате не списываются, а замораживаются на
                                    вашем счете и списываются лишь после окончательного подтверждения заказа. Если
                                    нам не удастся подтвердить заказ или придется его вернуть, то деньги моментально
                                    разморозятся и вернутся на ваш счет. Вам для этого ничего делать не потребуется.
                                    Если деньги уже списались с вашего счета, то при отмене или возврате заказа
                                    деньги вернутся в течение 3-10 рабочих дней в зависимости от банка.

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Можно ли отказаться от заказа до его получения?'}>
                                    Это возможно только в том случае, если заказ еще не был подтвержден и передан в
                                    обработку. Сообщите о своем желании отказаться от заказа как можно скорее на
                                    нашу почту <a href={'mailto:customerservice@sellout.su'}
                                                  className={'text-black'}>customerservice@sellout.su</a>
                                </LoyaltyFAQ>
                            </div>
                            <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}
                                                                                       className={s.link}
                                                                                       target={'_blank'}>FAQ</Link>
                            </h5>

                        </TextModal>
                    </div>
                    <div className={s.col}>
                        <h4 className='text-white'>Остались вопросы?</h4>
                        <Link href={'/faq'} className={s.sidebar_links} onClick={handleClose} target={'_blank'}>Ответы
                            на большинство из них: FAQ</Link>
                        <p className={s.sidebar_text}>Или напишите нам</p>
                        <a href={'mailto:customerservice@sellout.su'}
                           className={s.footer_link}>Почта: customerservice@sellout.su</a>
                        <a href={'https://wa.me/message/L2OINP6KNMNLA1'}
                           target={'_blank'}
                           className={s.footer_link}>WhatsApp: +7 993 896-92-27</a>
                        <a href={'https://t.me/sellout_official'}
                           target={'_blank'}
                           className={s.footer_link}>Telegram: @sellout_official</a>
                    </div>
                </div>
            </div>
            <ContactModal isOpen={contactOpen} handleClose={closeContact}/>
            <HowWeWorkModal show={howOpen} onHide={closeHow}/>
        </>
    );
};

export default observer(Sidebar);