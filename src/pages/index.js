import React, {useContext, useEffect, useLayoutEffect, useState, useRef} from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {observer} from "mobx-react-lite";
import MainLayout from "@/layout/MainLayout";

import styles from "@/styles/MainPage.module.css";
import stylesMob from "@/styles/MainPageMobile.module.css";
import Head from "next/head";
import {desktopStore} from "@/store/DesktopStore";

export const getServerSideProps = async (context) => {

    return {props: {}};
}


const Home = ({data}) => {
    const router = useRouter();
    const page1Ref = useRef(null);
    const page2Ref = useRef(null);
    const page3Ref = useRef(null);
    const page4Ref = useRef(null);
    const page5Ref = useRef(null);
    const page6Ref = useRef(null);
    const page7Ref = useRef(null);
    const page8Ref = useRef(null);
    const page9Ref = useRef(null);
    const page10Ref = useRef(null);
    const page11Ref = useRef(null);
    const page12Ref = useRef(null);
    const page13Ref = useRef(null);
    const page14Ref = useRef(null);
    const page15Ref = useRef(null);
    const page16Ref = useRef(null);
    const page17Ref = useRef(null);
    const page18Ref = useRef(null);
    const page19Ref = useRef(null);
    const page20Ref = useRef(null);
    const page21Ref = useRef(null);
    const page22Ref = useRef(null);
    const page23Ref = useRef(null);
    const page24Ref = useRef(null);
    const page25Ref = useRef(null);
    const sections = [page1Ref, page2Ref, page3Ref, page4Ref, page5Ref, page6Ref, page7Ref, page8Ref, page9Ref, page10Ref, page11Ref, page12Ref, page13Ref, page14Ref, page15Ref, page16Ref, page17Ref, page18Ref, page19Ref, page20Ref, page21Ref, page22Ref, page23Ref, page24Ref, page25Ref];

    const [currentSectionIndex, setCurrentSectionIndex] = useState(1); // Индекс текущей секции

    useLayoutEffect(() => {
        const savedGender = Cookies.get('selected_gender');
        if (savedGender) {
            if (savedGender === "M") {
                router.push("/men")
            } else {
                router.push("/women")
            }
        }

        // setTimeout(() => {
        //     changeBrowserColor("#E5EAE6")
        // }, 3050);
    }, []);

    const handleNavigation = (path) => {
        router.push(path);
    };

    // const [isScrolling, setIsScrolling] = useState(false); // Состояние для блокировки скролла
    // const sectionsRefs = [page1Ref, page2Ref, page3Ref]; // Массив с рефами секций

    const [isContentPage2Visible, setIsContentPage2Visible] = useState(false);
    const [isHoveredArrowPage1, setIsHoveredArrowPage1] = useState(false);
    const [isHoveredArrowPage2, setIsHoveredArrowPage2] = useState(false);

    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const [isHeaderMobVisible, setIsHeaderMobVisible] = useState(false);
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    // Функция для прокрутки к следующей секции
    const scrollToNextSection = () => {
        if (currentSectionIndex + 1 <= sections.length && (!isDesktop || currentSectionIndex <= 16)) {
            sections[currentSectionIndex].current.scrollIntoView({behavior: 'smooth', block: 'start'});
            setCurrentSectionIndex(currentSectionIndex + 1)
            if (currentSectionIndex === 1) {
                setIsContentPage2Visible(true)
                setTimeout(() => {
                    changeBrowserColor("#000000")
                }, 150);
                if (!isContentPage2Visible) {
                    setTimeout(() => {
                        setIsFooterVisible(true)
                    }, 2000);
                } else {
                    setTimeout(() => {
                        setIsFooterVisible(true)
                    }, 300);
                }
            }
            if (currentSectionIndex >= 2) {
                setTimeout(() => {
                    setIsHeaderVisible(true)
                }, 500);
            }
            if (currentSectionIndex === 3) {
                setTimeout(() => {
                    setIsHeaderMobVisible(true)
                }, 500);
            }
        }
    };

    // Функция для прокрутки к предыдущей секции
    const scrollToPreviousSection = () => {
        if (currentSectionIndex - 1 > 0) {
            sections[currentSectionIndex - 2].current.scrollIntoView({behavior: 'smooth'});
            setCurrentSectionIndex(currentSectionIndex - 1)
            if (currentSectionIndex === 3) {
                setIsContentPage2Visible(true)
            }
            if (currentSectionIndex <= 3) {
                setIsHeaderVisible(false);
            }
            if (currentSectionIndex === 2) {
                setTimeout(() => {
                    changeBrowserColor("#E5EAE6")
                }, 100);
                setTimeout(() => {
                    setIsFooterVisible(false)
                }, 150);
            }
            if (currentSectionIndex === 4) {
                setIsHeaderMobVisible(false)
            }
        }
    };

    // useEffect(() => {
    //     const handleKeyDown = (event) => {
    //         if (event.key === 'ArrowUp') {
    //             scrollToPreviousSection();
    //         } else if (event.key === 'ArrowDown') {
    //             scrollToNextSection();
    //         }
    //     };
    //
    //     window.addEventListener('keydown', handleKeyDown);
    //
    //     // Убираем обработчик при размонтировании компонента
    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, [currentSectionIndex, sections]);

    // const [isHeaderVisible, setHeaderVisible] = useState(false);

    // const scrollToRef = (ref) => {
    //     ref.current.scrollIntoView({behavior: 'smooth'});
    //     if (ref === page2Ref) {
    //         setIsContentPage2Visible(true)
    //     }
    // };

    // Функция для плавного скролла к следующей секции
    // const scrollToNextPage = () => {
    //     setIsScrolling(true);
    //
    //     // Плавный скролл к следующей секции
    //     page2Ref.current.scrollIntoView({behavior: 'smooth'});
    //     setCurrentSectionIndex(1);
    //     setIsContentPage2Visible(true)
    //
    //
    //     // Включаем прокрутку через 1 секунду (или по завершении анимации)
    //     setTimeout(() => {
    //         setIsScrolling(false);
    //
    //     }, 300);
    // };
    // // Функция для скроллинга между секциями
    // const handleScroll = throttle((e) => {
    //     const deltaY = e.deltaY; // Получаем направление скролла
    //
    //     if (isScrolling) {
    //         return
    //     }
    //     console.log(deltaY)
    //     console.log("AAAAA")
    //     // Блокируем, если уже идет анимация
    //
    //     if (deltaY > 0 && currentSectionIndex < sectionsRefs.length - 1) {
    //         // Скролл вниз и есть следующая секция
    //         scrollToSection(currentSectionIndex + 1);
    //     } else if (deltaY < 0 && currentSectionIndex > 0) {
    //         // Скролл вверх и есть предыдущая секция
    //         scrollToSection(currentSectionIndex - 1);
    //     }
    // }, 300);

    // const scrollToSection = (index) => {
    //     setIsScrolling(true);
    //     sectionsRefs[index].current.scrollIntoView({behavior: "smooth"});
    //     setCurrentSectionIndex(index);
    //
    //     setTimeout(() => {
    //         // Запускаем анимацию появления изображения на второй странице
    //         if (index === 1) {
    //             setIsContentPage2Visible(true)
    //         } else if (currentSectionIndex === 1) {
    //             setIsContentPage2Visible(false)
    //             setIsBlocksPage2Visible(false)
    //         } else if (index >= 2) {
    //             setHeaderVisible(true)
    //         } else if (currentSectionIndex === 2 && index === 1) {
    //             setHeaderVisible(false)
    //         }
    //     }, 300);
    //
    //     if (index === 1 && currentSectionIndex === 0) {
    //         setTimeout(() => {
    //             setIsScrolling(false);
    //         }, 300);
    //     } else {
    //         setTimeout(() => {
    //             setIsScrolling(false);
    //         }, 300);
    //     }
    // };

    // useEffect(() => {
    //     // Добавляем обработчик скролла
    //     window.addEventListener("wheel", handleScroll);
    //
    //     // Убираем обработчик при размонтировании компонента
    //     return () => {
    //         console.log("WHAT")
    //         window.removeEventListener("wheel", handleScroll);
    //     };
    //
    // }, [currentSectionIndex, isScrolling]);


    const [isBlocksPage2Visible, setIsBlocksPage2Visible] = useState(false);

    // После завершения анимации логотипа
    useEffect(() => {
        if (isContentPage2Visible) {
            const timer = setTimeout(() => {
                setIsBlocksPage2Visible(true);
            }, 2000); // Время, соответствующее длительности анимации логотипа

            return () => clearTimeout(timer);
        }
    }, [isContentPage2Visible]);

    const [isDesktop, setIsDesktop] = useState(true)
    const checkIsDesktop = () => {
        const width = window.innerWidth
        const height = window.innerHeight;

        // if (width <= 1497) {
        //     setIsDesktop(false)
        // } else {
        //     setIsDesktop(true)
        // }

        // Вычисляем значение по моей формуле
        const threshold = (2144 / 1720) * width + 110 + 2.5 * Math.min(37, 0.045 * width);

        if (height >= threshold) {
            setIsDesktop(false);
        } else {
            setIsDesktop(true);
        }
    }
    useEffect(() => {
        window.addEventListener("resize", checkIsDesktop);
        // Call handler right away so state gets updated with initial window size
        checkIsDesktop();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", checkIsDesktop);
    })

    function changeBrowserColor(color) {
        // Для Chrome, Firefox, Opera на Android
        // const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        // if (themeColorMeta) {
        //     console.log("Before change:", themeColorMeta.getAttribute('content'));
        //     document.querySelector('meta[name="theme-color"]').setAttribute('content', color);
        //     console.log("After change:", themeColorMeta.getAttribute('content'));
        // }

        // Принудительное обновление
        setTimeout(() => {
            const themeColorMeta = document.querySelector('meta[name="theme-color"]');
            if (themeColorMeta && themeColorMeta.getAttribute('content') !== color) {
                themeColorMeta.setAttribute('content', color);
            }
        }, 100);

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

    // Новые попытки сделать иначе: одна анимация при первом скроле, которая отправляет нас во вторую рефку.
    const scrollToSection = (section) => {
        if (sections[section] && sections[section].current) {
            sections[section].current.scrollIntoView({behavior: 'smooth'});
            if (section === 1) {
                changeBrowserColor("#000000")
            }
        } else {
            console.error("Section ref is not defined");
        }
    }

    const [isSeen2ndPage, setIsSeen2ndPage] = useState(false)
    useEffect(() => {
        if (window.scrollY !== 0) {
            // Если не на верхней позиции, прокручиваем вверх
            setIsSeen2ndPage(true)
            setIsContentPage2Visible(true)
        } else {
        }

        const handleScrollNew = () => {
            window.removeEventListener('scroll', handleScrollNew);
            if (!isSeen2ndPage) {
                setIsSeen2ndPage(true)
                setIsContentPage2Visible(true)
                if (desktopStore.isDesktop) {
                    document.body.classList.add('bodyNoScroll');
                    setIsSeen2ndPage(true)
                    setIsContentPage2Visible(true)
                    setTimeout(() => {
                        scrollToSection(1)
                    }, 500); // Задержка в 100 мс
                    setTimeout(() => {
                        document.body.classList.remove('bodyNoScroll');
                    }, 3500); // Задержка в 100 мс
                }
            }
        };

        // Добавляем обработчик события scroll
        window.addEventListener('scroll', handleScrollNew);

        // Очистка обработчика при размонтировании компонента
        return () => {
            window.removeEventListener('scroll', handleScrollNew);
        };
    }, [isSeen2ndPage]);

    return (
        <>
            <MainLayout>
                <Head>
                    <title>Sellout: онлайн-платформа брендовой одежды и обуви</title>
                    <meta property="og:title" content="Sellout: онлайн-платформа брендовой одежды и обуви"/>
                    <meta property="og:description"
                          content="2 000 000+ лотов по лучшим ценам с гарантией оригинальности: от премиальных и лимитированных релизов до более доступных, но не менее желанных позиций"
                    />

                    <meta
                        name="description"
                        content="2 000 000+ лотов по лучшим ценам с гарантией оригинальности: от премиальных и лимитированных релизов до более доступных, но не менее желанных позиций"
                    />
                    <meta property="og:image"
                          content="https://sellout.su/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_sq.02469b83.png&w=640&q=75"/>
                    <meta property="og:image:width" content="640px"/>
                    <meta property="og:image:height" content="640px"/>
                </Head>
                <style jsx global>{`
                  :root {
                    --background: #ffffff;
                    --foreground: #171717;
                  }

                  @media (prefers-color-scheme: dark) {
                    :root {
                      --background: #000000;
                      --foreground: #ededed;
                    }
                  }

                  html,
                  body {
                    max-width: 100vw;
                    scrollbar-width: none; /* Для Firefox — скрытие скроллбара */
                    -ms-overflow-style: none; /* Для Internet Explorer и Edge — скрытие скроллбара */
                  }

                  .body::-webkit-scrollbar {
                    display: none; /* Для Chrome, Safari, Opera — скрытие скроллбара */
                  }

                  .bodyNoScroll {
                    overflow-y: hidden; /* Отключаем прокрутку */
                  }

                  body {
                    color: #171717;
                    background: #000000;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                  }

                  * {
                    box-sizing: border-box;
                    padding: 0;
                    margin: 0;
                  }

                  a {
                    color: inherit;
                    text-decoration: none;
                  }

                  @media (prefers-color-scheme: dark) {
                    html {
                      color-scheme: dark;
                    }
                  }

                  input:-webkit-autofill {
                    -webkit-text-fill-color: black !important;
                    border-color: black !important; /* Цвет рамки */
                    transition: background-color 1000s ease-in-out 0s; /* Для того, чтобы изменить цвет автозаполнения */
                  }
                `}</style>
                {isDesktop ? (
                    <div className={styles.pageWrapper}>
                        <div ref={page1Ref} className={styles.page1Wrapper}>
                            {/* Первый блок с фотографией и кнопками */}
                            <section className={styles.heroSection}>
                                <Image
                                    src="/img/MainImg/image.png"
                                    alt="Main image"
                                    className={styles.heroImage}
                                    layout="responsive"
                                    width={1920}  // Исходная ширина изображения
                                    height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                    quality={100}
                                />
                                <div className={styles.buttonsWrapper}>
                                    <button
                                        className={styles.button}
                                        onClick={() => handleNavigation('/women')}
                                    >
                                        Женское
                                    </button>
                                    <button
                                        className={styles.button}
                                        onClick={() => handleNavigation('/men')}
                                    >
                                        Мужское
                                    </button>
                                </div>
                            </section>

                            {/* Второй блок с градиентом и кнопкой */}
                            <section className={styles.transitionSection}>
                                <div className={styles.gradientBlock}></div>
                                <div className={styles.blackBlock}></div>
                                <div className={styles.animatedButtonContainer}>
                                    <button
                                        className={styles.animatedButton}
                                        onClick={() => scrollToSection(1)}
                                        onMouseEnter={() => setIsHoveredArrowPage1(true)} // Добавь состояние hover
                                        onMouseLeave={() => setIsHoveredArrowPage1(false)} // Убери состояние hover
                                    >
                                        Почему платформа Sellout <span className={styles.line}></span> лучшее место для
                                        шопинга
                                    </button>
                                    <div className={styles.arrowCont}>
                                        <Image src="/img/MainImg/arrow.svg" alt="Arrow" width={30} height={30}
                                               className={`${styles.arrow} ${isHoveredArrowPage1 ? styles.arrowMove : ''}`}/>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div ref={page2Ref} className={styles.page2Wrapper}>
                            <div
                                className={`${isContentPage2Visible ? styles.buttons2pageContainer : styles.invisible}`}>
                                <button
                                    onClick={() => scrollToSection(0)}
                                    className={styles.buttonPage2}>
                                    Назад
                                </button>
                                <div className={styles.animatedButtonPage2Cont}>
                                    <button
                                        onClick={() => scrollToSection(2)}
                                        className={styles.animatedButtonPage2}
                                        onMouseEnter={() => setIsHoveredArrowPage2(true)} // Добавь состояние hover
                                        onMouseLeave={() => setIsHoveredArrowPage2(false)} // Убери состояние hover
                                    >
                                        Подробнее о нас
                                    </button>
                                </div>

                                <div className={styles.arrowPage2Cont}>
                                    <Image src="/img/MainImg/arrow2.svg" alt="Arrow" width={8} height={42}
                                           className={`${styles.arrowPage2} ${isHoveredArrowPage2 ? styles.arrowMove : ''}`}/>
                                </div>
                            </div>
                            <div className={styles.page2LogoImgContainer}>
                                <Image
                                    src="/img/MainImg/imageLogoText.png"
                                    alt="Logo Text"
                                    className={`${isContentPage2Visible ? styles.animationImagePage2Logo : styles.invisible}`} // Применяем класс анимации
                                    width={100} // Ширина
                                    height={150} // Высота будет автоматически рассчитана
                                    layout="responsive" // Для правильной обработки пропорций
                                />
                            </div>
                            <div className={`${isBlocksPage2Visible ? styles.imageGridVisible : styles.invisible}`}>
                                <div className={`${isBlocksPage2Visible ? styles.logos : styles.invisible}`}>
                                    <div className={styles.logosSlide}>
                                        <Image
                                            src="/img/MainImg/manyLogos1Page2.png"
                                            alt="Image 1"
                                            className={styles.manyLogos}
                                            width={900} // Ширина
                                            height={150} // Высота будет автоматически рассчитана
                                            quality={100}
                                        />
                                        <Image
                                            src="/img/MainImg/manyLogos2Page2.png"
                                            alt="Image 1"
                                            className={styles.manyLogos}
                                            width={900} // Ширина
                                            height={150} // Высота будет автоматически рассчитана
                                            quality={100}
                                        />
                                        <Image
                                            src="/img/MainImg/manyLogos3Page2.png"
                                            alt="Image 1"
                                            className={styles.manyLogos}
                                            width={900} // Ширина
                                            height={150} // Высота будет автоматически рассчитана
                                            quality={100}
                                        />
                                        <Image
                                            src="/img/MainImg/manyLogos4Page2.png"
                                            alt="Image 1"
                                            className={styles.manyLogos}
                                            width={900} // Ширина
                                            height={150} // Высота будет автоматически рассчитана
                                            quality={100}
                                        />
                                    </div>
                                    <div className={styles.logosSlide}>
                                        <Image
                                            src="/img/MainImg/manyLogos1Page2.png"
                                            alt="Image 1"
                                            className={styles.manyLogos}
                                            width={900} // Ширина
                                            height={150} // Высота будет автоматически рассчитана
                                            quality={100}
                                        />
                                        <Image
                                            src="/img/MainImg/manyLogos2Page2.png"
                                            alt="Image 1"
                                            className={styles.manyLogos}
                                            width={900} // Ширина
                                            height={150} // Высота будет автоматически рассчитана
                                            quality={100}
                                        />
                                        <Image
                                            src="/img/MainImg/manyLogos3Page2.png"
                                            alt="Image 1"
                                            className={styles.manyLogos}
                                            width={900} // Ширина
                                            height={150} // Высота будет автоматически рассчитана
                                            quality={100}
                                        />
                                        <Image
                                            src="/img/MainImg/manyLogos4Page2.png"
                                            alt="Image 1"
                                            className={styles.manyLogos}
                                            width={900} // Ширина
                                            height={150} // Высота будет автоматически рассчитана
                                            quality={100}
                                        />
                                    </div>
                                </div>
                                <div className={`${isBlocksPage2Visible ? styles.imageGrid : styles.invisible}`}>
                                    <div
                                        className={`${styles.imageBlock} ${isBlocksPage2Visible ? styles.imageBlock1 : styles.invisible}`}
                                        style={{width: '44%', position: 'relative'}}>
                                        <Image
                                            src="/img/MainImg/image1Page2.png"
                                            alt="Image 1"
                                            className={styles.imagesPage2}
                                            style={{
                                                boxShadow: '0 0 0 1px transparent, 0 0 0 1px rgba(224, 224, 224, 0.59)', // Пустая рамка и градиентная рамка
                                                borderRadius: '5px', // Радиус рамки
                                                position: 'relative',
                                                zIndex: 2,
                                                backgroundColor: 'rgba(36, 36, 36, 0.35)', // Фон
                                                backdropFilter: 'blur(10px)',
                                            }}
                                            width={600} // Ширина
                                            height={400} // Высота будет автоматически рассчитана
                                            layout="responsive" // Для правильной обработки пропорций
                                        />
                                    </div>
                                    <div
                                        className={`${styles.imageBlock} ${isBlocksPage2Visible ? styles.imageBlock2 : styles.invisible}`}
                                        style={{width: '34%', position: 'relative'}}>
                                        <Image
                                            src="/img/MainImg/image2Page2.png"
                                            alt="Image 2"
                                            className={styles.imagesPage2}
                                            style={{
                                                boxShadow: '0 0 0 1px transparent, 0 0 0 1px rgba(224, 224, 224, 0.59)', // Пустая рамка и градиентная рамка
                                                borderRadius: '5px', // Радиус рамки
                                                position: 'relative',
                                                zIndex: 2,
                                                backgroundColor: 'rgba(36, 36, 36, 0.35)', // Фон
                                                backdropFilter: 'blur(10px)',
                                            }}
                                            width={500} // Ширина
                                            height={300} // Высота будет автоматически рассчитана
                                            layout="responsive" // Для правильной обработки пропорций
                                        />
                                    </div>
                                    <div className={styles.imageColumn} style={{width: '20%'}}>
                                        <div
                                            className={`${styles.imageBlock} ${isBlocksPage2Visible ? styles.imageBlock3 : styles.invisible}`}>
                                            <Image
                                                src="/img/MainImg/image3Page2.png"
                                                alt="Image 3"
                                                className={styles.imagesPage2}
                                                width={285} // Ширина
                                                height={214} // Высота будет автоматически рассчитана
                                                layout="responsive" // Для правильной обработки пропорций
                                            />
                                        </div>
                                        <div
                                            className={`${styles.imageBlock} ${isBlocksPage2Visible ? styles.imageBlock4 : styles.invisible}`}>
                                            <Image
                                                src="/img/MainImg/image4Page2.png"
                                                alt="Image 4"
                                                className={styles.imagesPage2}
                                                width={285} // Ширина
                                                height={54} // Высота будет автоматически рассчитана
                                                layout="responsive" // Для правильной обработки пропорций
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${isContentPage2Visible ? styles.animation1Blob1 : styles.invisible}`}>
                                <Image
                                    src="/img/MainImg/blob1.png"
                                    alt="Logo Text"
                                    width={100} // Ширина
                                    height={150} // Высота будет автоматически рассчитана
                                    layout="responsive" // Для правильной обработки пропорций
                                />
                            </div>
                            <div className={`${isContentPage2Visible ? styles.animation1Blob2 : styles.invisible}`}>
                                <Image
                                    src="/img/MainImg/blob2.png"
                                    alt="Logo Text"
                                    width={100} // Ширина
                                    height={150} // Высота будет автоматически рассчитана
                                    layout="responsive" // Для правильной обработки пропорций
                                />
                            </div>

                        </div>
                        <div className={styles.pages37Wrapper}>
                            <div className={styles.fixedHeader}>
                                {/*className={`${styles.fixedHeader} ${isHeaderVisible ? styles.fixedHeaderFixed : styles.fixedHeaderAbsolute}`}>*/}
                                <div className={styles.headerText}>ПЕРЕЙТИ К ТОВАРАМ:</div>
                                <div className={styles.buttonsHeaderGenders}>
                                    {/*<button className={styles.buttonHeaderGender}>Женское</button>*/}
                                    {/*<button className={styles.buttonHeaderGender}>Мужское</button>*/}
                                    <button
                                        className={styles.buttonHeaderGender}
                                        onClick={() => handleNavigation('/women')}
                                    >
                                        Женское
                                    </button>
                                    <button
                                        className={styles.buttonHeaderGender}
                                        onClick={() => handleNavigation('/men')}
                                    >
                                        Мужское
                                    </button>
                                </div>
                                {/*<button*/}
                                {/*    onClick={() => scrollToPreviousSection()}*/}
                                {/*    className={styles.buttonHeaderFixed}*/}
                                {/*    style={{top: '20px'}}*/}
                                {/*>*/}
                                {/*    Назад*/}
                                {/*</button>*/}
                                {/*{currentSectionIndex !== 17 && (*/}
                                {/*    <button*/}
                                {/*        onClick={() => scrollToNextSection()}*/}
                                {/*        className={styles.buttonHeaderFixed}*/}
                                {/*        style={{top: '70px'}}*/}
                                {/*    >*/}
                                {/*        Далее*/}
                                {/*    </button>*/}
                                {/*)}*/}
                                {/*<div className={styles.arrowContHeader} style={{top: '20px'}}>*/}
                                {/*    <Image src="/img/MainImg/arrow.svg" alt="Arrow" width={10} height={40}*/}
                                {/*           style={{transform: 'rotate(180deg)', cursor: 'pointer'}}*/}
                                {/*           onClick={() => scrollToPreviousSection()}*/}
                                {/*    />*/}
                                {/*</div>*/}
                                {/*{currentSectionIndex !== 17 && (*/}
                                {/*    <div className={styles.arrowContHeader} style={{top: '70px'}}>*/}
                                {/*        <Image src="/img/MainImg/arrow.svg" alt="Arrow" width={10} height={40}*/}
                                {/*               style={{cursor: 'pointer'}}*/}
                                {/*               onClick={() => scrollToNextSection()}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*)}*/}
                            </div>
                            <div ref={page3Ref} className={styles.page37Wrapper}>
                                <div className={styles.page371}>
                                    <Image src="/img/MainImg/Как работаем 1.png" alt="Img" width={6000} height={2000}
                                           className={styles.page37Img}/>
                                </div>
                            </div>
                            <div ref={page4Ref} className={styles.page37Wrapper}>
                                <div className={styles.page37}>
                                    <Image src="/img/MainImg/Как работаем 2.png" alt="Img" width={6000} height={2000}
                                           className={styles.page37Img}/>
                                </div>
                            </div>
                            <div ref={page5Ref} className={styles.page37Wrapper}>
                                <div className={styles.page37}>
                                    <Image src="/img/MainImg/Гарантии 1.png" alt="Img" width={6000} height={2000}
                                           className={styles.page37Img}/>
                                </div>
                            </div>
                            <div ref={page6Ref} className={styles.page37Wrapper}>
                                <div className={styles.page37}>
                                    <Image src="/img/MainImg/гарантии 2.png" alt="Img" width={6000} height={2000}
                                           className={styles.page37Img}/>
                                </div>
                            </div>
                            <div ref={page7Ref} className={styles.page37Wrapper}>
                                <div className={styles.page37}>
                                    <Image src="/img/MainImg/Гарантии 3.png" alt="Img" width={6000} height={2000}
                                           className={styles.page37Img}/>
                                </div>
                            </div>
                            <div ref={page8Ref} className={styles.page37Wrapper}>
                                <div className={styles.page37}>
                                    <Image src="/img/MainImg/Гарантии 4.png" alt="Img" width={6000} height={2000}
                                           className={styles.page37Img}/>
                                </div>
                            </div>
                            <div ref={page9Ref} className={styles.page37Wrapper}>
                                <div className={styles.page37}>
                                    <Image src="/img/MainImg/Гарантии 5.png" alt="Img" width={6000} height={2000}
                                           className={styles.page37Img}/>
                                </div>
                            </div>
                            <div ref={page10Ref} className={styles.page37Wrapper}>
                                <div className={styles.page37}>
                                    <Image src="/img/MainImg/Гарантии 6.png" alt="Img" width={6000} height={2000}
                                           className={styles.page37Img}/>
                                </div>
                            </div>
                            <div ref={page11Ref} className={styles.page37Wrapper}>
                                <div className={styles.page37}>
                                    <Image src="/img/MainImg/Команда 1.png" alt="Img" width={6000} height={2000}
                                           className={styles.page37Img}/>
                                </div>
                            </div>
                            <div ref={page12Ref} className={styles.page37Wrapper}>
                                <div className={styles.page37}>
                                    <Image src="/img/MainImg/Команда 2.png" alt="Img" width={6000} height={2000}
                                           className={styles.page37Img}/>
                                </div>
                            </div>
                            <div ref={page13Ref} className={styles.page37Wrapper}>
                                <div className={styles.page37}>
                                    <Image src="/img/MainImg/Команда 3.png" alt="Img" width={6000} height={2000}
                                           className={styles.page37Img}/>
                                </div>
                            </div>
                            <div ref={page14Ref} className={styles.page37Wrapper}>
                                <div className={styles.page37}>
                                    <Image src="/img/MainImg/Философия 1.png" alt="Img" width={6000} height={2000}
                                           className={styles.page37Img}/>
                                </div>
                            </div>
                            <div ref={page15Ref} className={styles.page37Wrapper}>
                                <div className={styles.page37}>
                                    <Image src="/img/MainImg/Философия 2.png" alt="Img" width={6000} height={2000}
                                           className={styles.page37Img}/>
                                </div>
                            </div>
                            <div ref={page16Ref} className={styles.page37Wrapper}>
                                <div className={styles.page37}>
                                    <Image src="/img/MainImg/Цели 1.png" alt="Img" width={6000} height={2000}
                                           className={styles.page37Img}/>
                                </div>
                            </div>
                            <div ref={page17Ref} className={styles.page37Wrapper}>
                                <div className={styles.page37}>
                                    <Image src="/img/MainImg/Цели 2.png" alt="Img" width={6000} height={2000}
                                           className={styles.page37Img}/>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={stylesMob.pageWrapper}>
                        <div ref={page1Ref} className={stylesMob.page1Wrapper}>
                            {/* Первый блок с фотографией и кнопками */}
                            <section className={stylesMob.heroSection}>
                                <Image
                                    src="/img/MainImg/mainImgMob.png"
                                    alt="Main image"
                                    className={stylesMob.heroImage}
                                    layout="responsive"
                                    width={1700}  // Исходная ширина изображения
                                    height={2140} // Исходная высота изображения (пропорции будут сохраняться)
                                    quality={100}
                                />
                                <div className={stylesMob.buttonsWrapper}>
                                    <button
                                        className={stylesMob.button}
                                        onClick={() => handleNavigation('/women')}
                                    >
                                        Женское
                                    </button>
                                    <button
                                        className={stylesMob.button}
                                        onClick={() => handleNavigation('/men')}
                                    >
                                        Мужское
                                    </button>
                                </div>

                            </section>

                            {/* Второй блок с градиентом и кнопкой */}
                            <section className={stylesMob.transitionSection}>
                                <div className={stylesMob.gradientBlock}></div>
                                <div className={stylesMob.blackBlock}></div>
                                <div className={stylesMob.animatedButtonContainer}>
                                    <button
                                        className={stylesMob.animatedButton}
                                        onClick={() => scrollToSection(1)}
                                        onMouseEnter={() => setIsHoveredArrowPage1(true)} // Добавь состояние hover
                                        onMouseLeave={() => setIsHoveredArrowPage1(false)} // Убери состояние hover
                                    >
                                        Почему платформа Sellout <span className={stylesMob.line}></span> лучшее место
                                        для
                                        шопинга
                                    </button>
                                    <div className={stylesMob.arrowCont}>
                                        <Image src="/img/MainImg/arrow.svg" alt="Arrow" width={30} height={30}
                                               className={`${stylesMob.arrow} ${isHoveredArrowPage1 ? stylesMob.arrowMove : ''}`}/>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className={stylesMob.pages27Wrapper}>
                            {/*<div*/}
                            {/*    className={`${stylesMob.fixedFooter} ${isFooterVisible ? stylesMob.fixedFooterFixed : stylesMob.fixedFooterAbsolute}`}>*/}
                            {/*    <button*/}
                            {/*        onClick={() => scrollToPreviousSection()}*/}
                            {/*        className={stylesMob.buttonFooter}*/}
                            {/*        style={{left: '30px'}}*/}
                            {/*    >*/}
                            {/*        <Image src="/img/MainImg/Arrow 39-1.svg" alt="Arrow"*/}
                            {/*               width={0.3125 * Math.max(64, 0.08 * window.innerHeight)}*/}
                            {/*               height={0.3125 * Math.max(64, 0.08 * window.innerHeight)}/>*/}
                            {/*        Назад*/}
                            {/*    </button>*/}
                            {/*    <Image src="/img/MainImg/SlogoFooter.svg" alt="Arrow"*/}
                            {/*           width={(33 / 40) * 0.625 * Math.max(64, 0.08 * window.innerHeight)}*/}
                            {/*           height={0.625 * Math.max(64, 0.08 * window.innerHeight)}/>*/}
                            {/*    {currentSectionIndex !== 25 && (*/}
                            {/*        <button*/}
                            {/*            onClick={() => scrollToNextSection()}*/}
                            {/*            className={stylesMob.buttonFooter}*/}
                            {/*            style={{right: '30px'}}*/}
                            {/*        >*/}
                            {/*            {currentSectionIndex === 3 ? "О нас" : "Далее"}*/}
                            {/*            <Image src="/img/MainImg/Arrow 39.svg" alt="Arrow"*/}
                            {/*                   width={0.3125 * Math.max(64, 0.08 * window.innerHeight)}*/}
                            {/*                   height={0.3125 * Math.max(64, 0.08 * window.innerHeight)}/>*/}
                            {/*        </button>*/}
                            {/*    )}*/}
                            {/*</div>*/}
                            <div ref={page2Ref} className={stylesMob.page2Wrapper}>
                                <div
                                    className={`${isContentPage2Visible ? stylesMob.animation1Blob1 : stylesMob.invisible}`}>
                                    <Image
                                        src="/img/MainImg/blob1.png"
                                        alt="Logo Text"
                                        width={100} // Ширина
                                        height={150} // Высота будет автоматически рассчитана
                                        layout="responsive" // Для правильной обработки пропорций
                                        style={{
                                            transform: 'rotate(-115deg)'  // Вращение на 45 градусов
                                        }}
                                    />
                                </div>
                                <div
                                    className={`${isContentPage2Visible ? stylesMob.animation1Blob2 : stylesMob.invisible}`}>
                                    <Image
                                        src="/img/MainImg/blob2.png"
                                        alt="Logo Text"
                                        width={100} // Ширина
                                        height={150} // Высота будет автоматически рассчитана
                                        layout="responsive" // Для правильной обработки пропорций
                                        style={{
                                            transform: 'rotate(-75deg)'  // Вращение на 45 градусов
                                        }}
                                    />
                                </div>
                                <div className={stylesMob.page2LogoImgContainer}>
                                    <Image
                                        src="/img/MainImg/imageLogoText.png"
                                        alt="Logo Text"
                                        className={`${isContentPage2Visible ? stylesMob.animationImagePage2Logo : stylesMob.invisible}`} // Применяем класс анимации
                                        width={100} // Ширина
                                        height={150} // Высота будет автоматически рассчитана
                                        layout="responsive" // Для правильной обработки пропорций
                                    />
                                </div>
                                <div className={`${isBlocksPage2Visible ? stylesMob.image1grid : stylesMob.invisible}`}>
                                    <Image
                                        src="/img/MainImg/image1Page2Mob.png"
                                        alt="Image 1"
                                        className={stylesMob.imagesPage2}
                                        style={{
                                            boxShadow: '0 0 0 1px transparent, 0 0 0 1px rgba(224, 224, 224, 0.59)', // Пустая рамка и градиентная рамка
                                            borderRadius: '5px', // Радиус рамки
                                            position: 'relative',
                                            zIndex: 2,
                                            backgroundColor: 'rgba(36, 36, 36, 0.35)', // Фон
                                            backdropFilter: 'blur(10px)',
                                            objectFit: 'contain'
                                        }}
                                        width={600} // Ширина
                                        height={400} // Высота будет автоматически рассчитана
                                        layout="responsive" // Для правильной обработки пропорций
                                    />
                                </div>
                                <div
                                    className={`${isBlocksPage2Visible ? stylesMob.scrollImagesPage2 : stylesMob.invisible}`}>
                                    <div
                                        className={`${isBlocksPage2Visible ? stylesMob.logosSlide : stylesMob.invisible}`}>
                                        <Image
                                            src="/img/MainImg/manyLogos1Page2.png"
                                            alt="Image 1"
                                            className={stylesMob.manyLogos}
                                            width={900} // Ширина
                                            height={150} // Высота будет автоматически рассчитана
                                            quality={100}
                                        />
                                        <Image
                                            src="/img/MainImg/manyLogos2Page2.png"
                                            alt="Image 1"
                                            className={stylesMob.manyLogos}
                                            width={900} // Ширина
                                            height={150} // Высота будет автоматически рассчитана
                                            quality={100}
                                        />
                                        <Image
                                            src="/img/MainImg/manyLogos3Page2.png"
                                            alt="Image 1"
                                            className={stylesMob.manyLogos}
                                            width={900} // Ширина
                                            height={150} // Высота будет автоматически рассчитана
                                            quality={100}
                                        />
                                        <Image
                                            src="/img/MainImg/manyLogos4Page2.png"
                                            alt="Image 1"
                                            className={stylesMob.manyLogos}
                                            width={900} // Ширина
                                            height={150} // Высота будет автоматически рассчитана
                                            quality={100}
                                        />
                                    </div>
                                    <div
                                        className={`${isBlocksPage2Visible ? stylesMob.logosSlide : stylesMob.invisible}`}>
                                        <Image
                                            src="/img/MainImg/manyLogos1Page2.png"
                                            alt="Image 1"
                                            className={stylesMob.manyLogos}
                                            width={900} // Ширина
                                            height={150} // Высота будет автоматически рассчитана
                                            quality={100}
                                        />
                                        <Image
                                            src="/img/MainImg/manyLogos2Page2.png"
                                            alt="Image 1"
                                            className={stylesMob.manyLogos}
                                            width={900} // Ширина
                                            height={150} // Высота будет автоматически рассчитана
                                            quality={100}
                                        />
                                        <Image
                                            src="/img/MainImg/manyLogos3Page2.png"
                                            alt="Image 1"
                                            className={stylesMob.manyLogos}
                                            width={900} // Ширина
                                            height={150} // Высота будет автоматически рассчитана
                                            quality={100}
                                        />
                                        <Image
                                            src="/img/MainImg/manyLogos4Page2.png"
                                            alt="Image 1"
                                            className={stylesMob.manyLogos}
                                            width={900} // Ширина
                                            height={150} // Высота будет автоматически рассчитана
                                            quality={100}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div ref={page3Ref} className={stylesMob.page3Wrapper}>
                                <div className={stylesMob.animation1Blob1}>
                                    <Image
                                        src="/img/MainImg/blob1.png"
                                        alt="Logo Text"
                                        width={100} // Ширина
                                        height={150} // Высота будет автоматически рассчитана
                                        layout="responsive" // Для правильной обработки пропорций
                                    />
                                </div>
                                <div className={stylesMob.animation1Blob2}>
                                    <Image
                                        src="/img/MainImg/blob2.png"
                                        alt="Logo Text"
                                        width={100} // Ширина
                                        height={150} // Высота будет автоматически рассчитана
                                        layout="responsive" // Для правильной обработки пропорций

                                    />
                                </div>
                                <div
                                    className={`${isContentPage2Visible ? stylesMob.page3Images : stylesMob.invisible}`}>
                                    <div className={stylesMob.image234grid}>
                                        <Image
                                            src="/img/MainImg/image2Page2Mob.png"
                                            alt="Image 1"
                                            className={stylesMob.imagesPage2}
                                            style={{
                                                boxShadow: '0 0 0 1px transparent, 0 0 0 1px rgba(224, 224, 224, 0.59)', // Пустая рамка и градиентная рамка
                                                borderRadius: '5px', // Радиус рамки
                                                position: 'relative',
                                                zIndex: 2,
                                                backgroundColor: 'rgba(36, 36, 36, 0.35)', // Фон
                                                backdropFilter: 'blur(10px)',
                                            }}
                                            width={600} // Ширина
                                            height={400} // Высота будет автоматически рассчитана
                                            layout="responsive" // Для правильной обработки пропорций
                                        />
                                    </div>
                                    <div className={stylesMob.image234grid}>
                                        <Image
                                            src="/img/MainImg/image3Page2Mob.png"
                                            alt="Image 1"
                                            className={stylesMob.imagesPage2}
                                            width={600} // Ширина
                                            height={400} // Высота будет автоматически рассчитана
                                            layout="responsive" // Для правильной обработки пропорций
                                        />
                                    </div>
                                    <div className={stylesMob.image234grid}>
                                        <Image
                                            src="/img/MainImg/image4Page2Mob.png"
                                            alt="Image 1"
                                            className={stylesMob.imagesPage2}
                                            width={600} // Ширина
                                            height={400} // Высота будет автоматически рассчитана
                                            layout="responsive" // Для правильной обработки пропорций
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={stylesMob.pages47Wrapper}>
                                <div className={stylesMob.fixedHeader}>
                                    {/*className={`${stylesMob.fixedHeader} ${isHeaderMobVisible ? stylesMob.fixedHeaderFixed : stylesMob.fixedHeaderAbsolute}`}>*/}
                                    <div className={stylesMob.headerText}>ПЕРЕЙТИ К ТОВАРАМ:</div>
                                    <div className={stylesMob.buttonsHeaderGenders}>
                                        <button
                                            className={stylesMob.buttonHeaderGender}
                                            onClick={() => handleNavigation('/women')}
                                        >
                                            Женское
                                        </button>
                                        <button
                                            className={stylesMob.buttonHeaderGender}
                                            onClick={() => handleNavigation('/men')}
                                        >
                                            Мужское
                                        </button>
                                    </div>
                                </div>
                                <div ref={page4Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page471}>
                                        <Image src="/img/MainImg/Как работаем 1 mob.png" alt="Img" width={6000}
                                               height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page5Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Как работаем 2 mob.png" alt="Img" width={6000}
                                               height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page6Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Как работаем 3 mob.png" alt="Img" width={6000}
                                               height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page7Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Гарантии 1 mob.png" alt="Img" width={6000}
                                               height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page8Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Гарантии 2 mob.png" alt="Img" width={6000}
                                               height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page9Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Гарантии 3 mob.png" alt="Img" width={6000}
                                               height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page10Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Гарантии 4 mob.png" alt="Img" width={6000}
                                               height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page11Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Гарантии 5 mob.png" alt="Img" width={6000}
                                               height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page12Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Гарантии 6 mob.png" alt="Img" width={6000}
                                               height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page13Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Гарантии 7 mob.png" alt="Img" width={6000}
                                               height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page14Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Гарантии 8 mob.png" alt="Img" width={6000}
                                               height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page15Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Команда 1 mob.png" alt="Img" width={6000} height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page16Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Команда 2 mob.png" alt="Img" width={6000} height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page17Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Команда 3 mob.png" alt="Img" width={6000} height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page18Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Команда 4 mob.png" alt="Img" width={6000} height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page19Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Философия 1 mob.png" alt="Img" width={6000}
                                               height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page20Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Философия 2 mob.png" alt="Img" width={6000}
                                               height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page21Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Философия 3 mob.png" alt="Img" width={6000}
                                               height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page22Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Философия 4 mob.png" alt="Img" width={6000}
                                               height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page23Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Философия 5 mob.png" alt="Img" width={6000}
                                               height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page24Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Цели 1 mob.png" alt="Img" width={6000} height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                                <div ref={page25Ref} className={stylesMob.page47Wrapper}>
                                    <div className={stylesMob.page47}>
                                        <Image src="/img/MainImg/Цели 2 mob.png" alt="Img" width={6000} height={2000}
                                               className={stylesMob.page47Img}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </MainLayout>
        </>

    );
}

// const Home = ({data}) => {
//     const router = useRouter()
//     const {desktopStore} = useContext(Context)
//     // const [isDesktop, setIsDesktop] = useState(true)
//
//     // useLayoutEffect(() => {
//     //     const savedGender = Cookies.get('selected_gender');
//     //     // if (savedGender) {
//     //     //     if (savedGender === "M") {
//     //     //         router.push("/men")
//     //     //     } else {
//     //     //         router.push("/women")
//     //     //     }
//     //     // }
//     //     const checkIsDesktop = () => {
//     //         const width = window.innerWidth;
//     //         setIsDesktop(width > 1200);
//     //     };
//     //     checkIsDesktop();
//     //
//     // }, []);
//
//
//     const [isSend, setIsSend] = useState(false)
//     const [show, setShow] = useState(false);
//     const handleClose = () => {
//         setShow(false)
//     };
//     const handleShow = () => {
//         setShow(true)
//         setIsSend(false)
//     };
//
//     const [currentPage, setCurrentPage] = useState('men');
//
//     const handleSwipeLeft = () => {
//         setCurrentPage('women');
//         router.push('/women');
//     };
//
//     const handleSwipeRight = () => {
//         setCurrentPage('men');
//         router.push('/men');
//     };
//
//     return (
//         <MainLayout>
//             <Head>
//                 <title>Sellout: онлайн-платформа брендовой одежды и обуви</title>
//                 <meta property="og:title" content="Sellout: онлайн-платформа брендовой одежды и обуви"/>
//                 <meta property="og:description" content="2 000 000+ лотов по лучшим ценам с гарантией оригинальности: от премиальных и лимитированных релизов до более доступных, но не менее желанных позиций"
//                 />
//
//                 <meta
//                     name="description"
//                     content="2 000 000+ лотов по лучшим ценам с гарантией оригинальности: от премиальных и лимитированных релизов до более доступных, но не менее желанных позиций"
//                 />
//                 <meta property="og:image" content="https://sellout.su/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_sq.02469b83.png&w=640&q=75"/>
//                 <meta property="og:image:width" content="640px"/>
//                 <meta property="og:image:height" content="640px"/>
//             </Head>
//             <div>
//                 {/*<div className={s.main_cont + ' custom_cont'}>*/}
//                 {/*    /!*<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>*!/*/}
//                 {/*    /!*    <Stories />*!/*/}
//                 {/*    /!*</div>*!/*/}
//                 {/*    /!*<Swipeable onSwipedLeft={handleSwipeLeft} onSwipedRight={handleSwipeRight}>*!/*/}
//                 {/*    /!*    /!*<div>*!/*!/*/}
//                 {/*    /!*    /!*    {currentPage === 'men' && <MenPage />}*!/*!/*/}
//                 {/*    /!*    /!*    {currentPage === 'women' && <WomenPage />}*!/*!/*/}
//                 {/*    /!*    /!*</div>*!/*!/*/}
//                 {/*    /!*</Swipeable>*!/*/}
//                 {/*</div>*/}
//
//                 <div className={s.cont}>
//
//                     {/*<br/>*/}
//                     {desktopStore.isDesktop ?
//                         <div>
//                             <div>
//                                 <div className={s.main}
//                                      style={{width: '50%', margin: '0 auto', padding: 0, float: 'left'}}>
//                                     <Link href="/women">
//
//                                         <Image src={kylie} alt="Description of your image"
//                                                style={{float: 'left', cursor: 'pointer'}}
//                                                layout="responsive" loading={'eager'}/></Link>
//
//                                 </div>
//
//                                 <div className={s.main}
//                                      style={{width: '50%', margin: '0 auto', padding: 0, float: 'right'}}>
//                                     <Link href="/men">
//
//                                         <Image src={manBig} alt="Description of your image"
//                                                style={{float: 'left', cursor: 'pointer'}}
//                                                layout="responsive" loading={'eager'}/></Link>
//
//                                 </div>
//                             </div>
//                             <div>
//                                 <div style={{width: '100%', margin: '0 auto', padding: 0}}>
//                                     <Link href="/about">
//                                         <Image
//                                             src={mainbig}
//                                             alt="Description of your image"
//                                             layout="responsive"
//                                             loading={'eager'}
//                                         />
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                         :
//                         <div>
//                             {/*<div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "10px", paddingBottom: "80px" }}>*/}
//                                 <div className={s.main} style={{ width: '100%', margin: '0 auto', padding: 0}}>
//                                     <Link href="/women">
//                                         <Image src={women_mob} alt="Description of your image" style={{float: 'left', cursor: 'pointer'}} layout="responsive" loading={'eager'} />
//                                     </Link>
//                                 </div>
//                                  <div className={s.main} style={{ width: '100%', margin: '0 auto', padding: 0 }}>
//                                     <Link href="/men">
//                                         <Image src={men_mob} alt="Description of your image" style={{float: 'left', cursor: 'pointer'}} layout="responsive" loading={'eager'} />
//                                     </Link>
//                                 </div>
//                             {/*</div>*/}
//
//
//                             {/*<div style={{width: '100%', margin: '0 auto', padding: 0}}>*/}
//                             {/*    <Link href="/women">*/}
//
//                             {/*        <Image src={kylieBig} alt="Description of your image"*/}
//                             {/*               style={{float: 'left', cursor: 'pointer'}}*/}
//                             {/*               layout="responsive" loading={'eager'}/>*/}
//                             {/*    </Link>*/}
//
//
//                             {/*</div>*/}
//                             {/*<div style={{width: '100%', margin: '0 auto', padding: 0}}>*/}
//                             {/*    <Link href="/men">*/}
//
//                             {/*        <Image src={manBig} alt="Description of your image"*/}
//                             {/*               style={{float: 'left', cursor: "pointer"}}*/}
//                             {/*               layout="responsive" loading={'eager'}/></Link>*/}
//
//
//                             {/*</div>*/}
//                             <div className={s.main} style={{width: '100%', margin: '0 auto', padding: 0}}>
//                                 <Link href="/about">
//                                     <Image
//                                         src={mainbigMob}
//                                         alt="Description of your image"
//                                         layout="responsive"
//                                         loading={'eager'}
//                                     />
//                                 </Link>
//                             </div>
//                         </div>}
//                     <BuyoutModal show={show} handleClose={handleClose} isSend={isSend}/>
//                     <div className={s.text_container} style={{marginTop: 0}}>
//                         <div className={s.text}>
//                             Не нашли то, что искали? <br/>
//                             Мы привезем для вас желанный лот!
//                         </div>
//                         <div className={'d-flex justify-content-center'}>
//                             <button onClick={handleShow} className={s.toggle_btn}>
//                                 Оставить заявку
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//
//             </div>
//         </MainLayout>
//     )
// };
export default observer(Home);



