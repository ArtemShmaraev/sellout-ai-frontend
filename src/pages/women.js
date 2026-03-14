import MainLayout from "@/layout/MainLayout";
import BuyoutModal from "@/components/shared/BuyoutModal/BuyoutModal";
import s from '@/styles/Home.module.css'
import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import Head from "next/head";
import {fetchMainPage, fetchMainPage2, fetchMore} from "@/http/mainPageApi";
import MainImgBlock from "@/components/shared/UI/MainImgBlock/MainImgBlock";
import Link from "next/link";
import Image from "next/image";
import {parse} from "cookie";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import FirstMainBlock from "@/components/shared/UI/FirstMainBlock/FirstMainBlock";
import ComplexMainPageBlock from "@/components/shared/UI/ComplexMainPageBlock/ComplexMainPageBlock";
import {Context} from "@/context/AppWrapper";
import tempWomenJson from "./main_page_women.json"
import arrowNew from "@/static/icons/arrowSlider.svg";
import PromoBannerMainPageAbout from "@/components/shared/UI/PromoBannerMainPageAbout/PromoBannerMainPageAbout";
import PromoBannerMainPageOffers from "@/components/shared/UI/PromoBannerMainPageOffers/PromoBannerMainPageOffers";
import MultiSectionCirclesGrid from "@/components/shared/UI/MultiSectionCirclesGrid/MultiSectionCirclesGrid";
import PopularBrandsMainPage from "@/components/shared/UI/PopularBrandsMainPage/PopularBrandsMainPage";
import MultiSectionRecs from "@/components/shared/UI/MultiSectionRecs/MultiSectionRecs";
import MultiSectionImages from "@/components/shared/UI/MultiSectionImages/MultiSectionImages";
import Selection from "@/components/shared/UI/Selection/Selection";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const page = cookies['index_page']
    const token = cookies['access_token']

    const selected_gender = "F"; // Добавляем получение выбранного гендера из кук

    let emptyData;
    let restoredData = false;

    emptyData = tempWomenJson

    // Шаг 0: Создание списков allComplexBlockIds и allBlockIds
    const allComplexBlockIds = {};
    const allBlockIds = [];

    emptyData.forEach(item => {
        if (item.blockId) {
            allBlockIds.push(item.blockId);
        }

        if (['multiSectionCircles', 'popularBrands', 'multiSectionRecs', 'multiSectionImages'].includes(item.type)) {
            const key = 'brandsLinks' in item ? 'brandsLinks' :
                'circleLinks' in item ? 'circleLinks' :
                    'recsLinks' in item ? 'recsLinks' : null;
            if (key) {
                allComplexBlockIds[item.blockId] = item[key].length;
            }
        }
    });

    // Итоговая расстановка (может остаться пустой, если не в первый раз заходим на страницу и не происходит сброса положений (не прошло более 15 минут с последнего захода)
    let arrangement = {};

    // Базовая расстановка: 0:0, 1:1 итд
    let arrangementBase = {};
    Object.keys(allComplexBlockIds).forEach(blockId => {
        arrangementBase[blockId] = {};
        for (let i = 0; i < allComplexBlockIds[blockId]; i++) {
            arrangementBase[blockId][i] = i;
        }
    });

    // Шаг 1: Если первая загрузка страницы (куки все еще пустые и нет расстановки), создаем базовую расстановку.
    if (!('mainPageWomen-lastTimeUpdated' in cookies) || !cookies['mainPageWomen-lastTimeUpdated']) {
        arrangement = arrangementBase

        restoredData = true;
    } else if ('mainPageWomen-lastTimeUpdated' in cookies && Date.now() - parseInt(cookies['mainPageWomen-lastTimeUpdated'], 10) > 10 * 60 * 1000) {
        // Если уже не первый раз заходим, но прошло более 10 минут с последнего захода на главную, то меняем расстановку и передаем флаг о сбросе значенийю
        restoredData = true;

        // 1. Рандомизация расстановки
        Object.keys(arrangementBase).forEach(blockId => {
            const block = arrangementBase[blockId];
            const keys = Object.keys(block);
            const values = keys.map(key => block[key]);

            // Алгоритм Фишера-Йетса для перемешивания значений
            for (let i = values.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [values[i], values[j]] = [values[j], values[i]]; // Перемешиваем значения
            }

            // Создаем новый объект с перемешанными значениями для каждого блока
            const newBlock = {};
            keys.forEach((key, index) => {
                newBlock[key] = values[index]; // Создаем новый объект с перемешанными значениями
            });

            arrangement[blockId] = newBlock; // Сохраняем рандомизированные значения для текущего blockId
        });

        // 2. Обновление словаря cookies, заменяя значения для соответствующих блоков
        Object.keys(arrangement).forEach(blockId => {
            const block = arrangement[blockId];

            cookies[`multiSectionedBlock-${blockId}-SelectedSection`] = block[0];
        });
    }

    // Функция для преобразования объекта в строку cookie
    const cookiesToString = (cookies) => {
        return Object.keys(cookies)
            .map(key => `${key}=${cookies[key]}`) // создаем строку вида "ключ=значение"
            .join('; '); // соединяем все пары ключ=значение через ";"
    };

    // Преобразуем объект в строку cookie
    const cookieString = cookiesToString(cookies);

    let data = await fetchMainPage2(cookieString, selected_gender)
    // let data = tempWomenJson;

    return {props: {data, arrangement, restoredData}};
}
const Women = ({data, arrangement, restoredData}) => {
    // const {desktopStore} = useContext(Context)
    const router = useRouter()
    const [currentData, setCurrentData] = useState(data.slice(0, 3))
    const [content, setContent] = useState(data.slice(0, 3))

    const {desktopStore} = useContext(Context)
    const [viewVideo, setViewVideo] = useState(false)

    const checkIsViewVideo = () => {
        const width = window.innerWidth
        if (width <= 1200) {
            setViewVideo(false)
        } else {
            setViewVideo(true)
        }

    }


    useEffect(() => {

        window.addEventListener('resize', checkIsViewVideo);
        checkIsViewVideo();


        // // Убираем обработчик события при размонтировании компонента
        return () => {
            window.removeEventListener('resize', checkIsViewVideo);
        };
    }, [])

    const [arrangementFinal, setArrangementFinal] = useState({});

    useLayoutEffect(() => {
        Cookies.set('selected_gender', "F", {expires: 2772})
        const savedGender = "F";
        // setSelectedGender(savedGender);

        // Check if the user visited the page within the last 10 minutes
        if (!Cookies.get('index_page')) {
            const tenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);
            Cookies.set('index_page', 1, {expires: tenMinutes});
        }

        Cookies.set('mainPageWomen-lastTimeUpdated', Date.now(), {expires: 2772})
        if (restoredData) {
            // Если обновили данные (первый заход или более 15 минут прошло), то сбрасываем на ноль все позиции, сохраняем новую расстановку
            Cookies.set("homeScrollPositionWomen", 0, {expires: 2772});
            Cookies.set("mainPageWomen-AmountOfBlocksLoaded", 0, {expires: 2772});
            localStorage.setItem('mainPageWomen-Arrangement', JSON.stringify(arrangement));

            data.forEach(item => {
                if (item.blockId && ['multiSectionCircles', 'popularBrands', 'multiSectionRecs', 'multiSectionImages', 'selection'].includes(item.type)) {
                    const blockId = item.blockId;

                    // Формируем имена куков
                    const cookiesToCheck = item.type === "selection" ? [
                        `multiSectionedBlock-${blockId}-ProductsBlockPosition`
                    ] : [
                        `multiSectionedBlock-${blockId}-SelectedSectionCurrentArrangement`,
                        `multiSectionedBlock-${blockId}-SectionsContainerPosition`,
                        `multiSectionedBlock-${blockId}-ProductsBlockPosition`
                    ];

                    // Проверяем наличие каждого кука и устанавливаем значение 0
                    cookiesToCheck.forEach(cookieName => {
                        Cookies.set(cookieName, 0, {expires: 2772});
                    });

                    if (item.type !== "selection") {
                        Cookies.set(`multiSectionedBlock-${blockId}-SelectedSection`, arrangement[blockId][0], {expires: 2772});
                    }
                }
            })
        }

        // // Теперь необходимо восстановить корректную расстановку внутри data согласно нашей расстановке (новая или прежняя - в любом случае будет уже лежать в локал хранилище)
        const storageArr = JSON.parse(localStorage.getItem('mainPageWomen-Arrangement'));
        setArrangementFinal({...storageArr});

        const rearrangeData = (data, arrangement) => {
            return data.map(item => {
                // Проверяем, есть ли blockId и если он есть, то ищем в расстановке для этого blockId
                if (item.blockId && arrangement[item.blockId]) {
                    const blockArrangement = arrangement[item.blockId];

                    // Перемешиваем все ключи с массивами в соответствии с расстановкой
                    const keysToRearrange = [
                        'desktopImages',
                        'mobileImages',
                        'productsAmount',
                        'brandsLinks',
                        'brandsNamesDesktop',
                        'brandsNamesMobile',
                        'products',
                        'moreButtonName',
                        'circleNames',
                        'circleLinks',
                        'recsNames',
                        'recsLinks',
                        'moreButtons',
                        'titleName',
                        'moreButtonNameNoModel'
                    ];

                    // Перебираем все ключи и выполняем перестановку значений
                    keysToRearrange.forEach(key => {
                        if (Array.isArray(item[key])) {
                            // Проверяем, что длина массива в item[key] совпадает с длиной в arrangement для данного blockId
                            if (item[key].length === Object.keys(blockArrangement).length) {
                                // Новый порядок элементов на основе расстановки
                                item[key] = item[key].map((_, index) => item[key][blockArrangement[index]]);
                            }
                        }
                    });
                }
                return item;
            });
        };

        const arrangedData = rearrangeData(structuredClone(data), JSON.parse(localStorage.getItem('mainPageWomen-Arrangement')));
        if (arrangedData) {
            setCurrentData(arrangedData)
            if (Cookies.get('mainPageWomen-AmountOfBlocksLoaded') && Cookies.get('mainPageWomen-AmountOfBlocksLoaded') !== '0') {
                const amountOfBlocksLoaded = Number(Cookies.get('mainPageWomen-AmountOfBlocksLoaded'))
                setContent(arrangedData.slice(0, amountOfBlocksLoaded))
            } else {
                setContent(arrangedData.slice(0, 10))
                Cookies.set("mainPageWomen-AmountOfBlocksLoaded", 10, {expires: 2772});
            }
        }
    }, []);

    const getMore = async () => {
        const token = Cookies.get('access_token')
        const page = Cookies.get('index_page') ? Cookies.get('index_page') : 1
        const tenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);
        Cookies.set('index_page', Number(page) + 1, {expires: tenMinutes})
        const gender = "F"
        const newData = await fetchMainPage(token, true, false, Number(page) + 1, gender)
        const arr = [...(content), ...newData]
        setContent(arr)
    }

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

    useEffect(() => {
        const saveScrollPosition = () => {
            // Сохраняем позицию прокрутки в cookie на 7 дней
            Cookies.set("homeScrollPositionWomen", window.scrollY.toString(), {expires: 2772});
        };

        const restoreScrollPosition = () => {
            const savedPosition = Cookies.get("homeScrollPositionWomen");
            if (savedPosition) {
                const interval = setInterval(() => {
                    if (document.body.scrollHeight >= parseInt(savedPosition, 10)) {
                        window.scrollTo(0, parseInt(savedPosition, 10));
                        clearInterval(interval);
                    }
                }, 100);

                // Очистка таймера на случай, если компонент размонтируется
                return () => clearInterval(interval);
            }
        };

        // Восстанавливаем позицию при загрузке страницы
        restoreScrollPosition();

        // Сохраняем позицию перед уходом со страницы
        router.events.on("routeChangeStart", saveScrollPosition);
        window.addEventListener('beforeunload', saveScrollPosition)

        // Убираем обработчик при размонтировании компонента
        return () => {
            router.events.off("routeChangeStart", saveScrollPosition);
            window.removeEventListener('beforeunload', saveScrollPosition)
        };
    }, [router]);

    const scrollableContainerRef = useRef(null);
    const scrollableContainerRef2 = useRef(null);
    const scroll = 1200

    const scrollLeft = (ref) => {
        if (ref.current) {
            ref.current.scrollTo({
                left: ref.current.scrollLeft - scroll,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = (ref) => {
        if (ref.current) {
            ref.current.scrollTo({
                left: ref.current.scrollLeft + scroll,
                behavior: 'smooth',
            });
        }
    };

    const handleOpenSideBar = (sectionName, openedSectionsList, scrollPosition) => {
        desktopStore.setCurrentSection(sectionName); // Устанавливаем текущую секцию
        desktopStore.setOpenedSections(openedSectionsList); // Задаем список открытых секций
        desktopStore.setScrollPosition(scrollPosition); // Устанавливаем позиции скролла
        desktopStore.setMobileSideBar(true); // Открываем сайдбар
    }

    const renderPage = () => {
        const arr = []
        content.forEach(el => {
            if (el.type === "mainCategories") {
                arr.push(
                    <>
                        {
                            desktopStore.isDesktop ? (
                                <div style={{
                                    display: 'flex',
                                    width: '100%',
                                    alignItems: 'start',
                                    justifyContent: 'space-between'
                                }}
                                     className={s.mainCategoriesContCont}>

                                    {/* Первые три блока с изображениями */}
                                    <div style={{width: `${(381 / 1516) * 100}vw`}} className={s.mainCategoriesCont}>
                                        <Link href={'/catalog/shoes_desktop_women'}>
                                            <Image
                                                src={el.desktopImages[0]}
                                                alt="Image 1"
                                                layout="responsive" width={519} height={357}
                                                className={s.mainCategoriesContImg}/>
                                        </Link>
                                    </div>

                                    <div style={{width: `${(357 / 1516) * 100}vw`}} className={s.mainCategoriesCont}>
                                        <Link href={'/catalog/clothes_desktop_women'}>
                                            <Image
                                                src={el.desktopImages[1]}
                                                alt="Image 2"
                                                layout="responsive" width={287} height={357}
                                                className={s.mainCategoriesContImg}/>
                                        </Link>
                                    </div>

                                    <div style={{width: `${(357 / 1516) * 100}vw`}} className={s.mainCategoriesCont}>
                                        <Link href={'/catalog/bags_desktop_women'}>
                                            <Image
                                                src={el.desktopImages[2]}
                                                alt="Image 3"
                                                layout="responsive" width={287} height={357}
                                                className={s.mainCategoriesContImg}/>
                                        </Link>
                                    </div>

                                    {/* Четвертый блок с изображением и кнопкой */}
                                    <div className={s.mainCategoriesCont4} style={{
                                        width: `${(363 / 1516) * 100}vw`,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <div style={{width: '100%'}}>
                                            <Link href={'/catalog/accessories_desktop_women'}
                                                  className={s.mainCategoriesCont}>
                                                <Image
                                                    src={el.desktopImages[3]}
                                                    alt="Image 4" layout="responsive" width={393} height={500}/>
                                            </Link>
                                        </div>
                                        <Link href={'/products'} className={s.mainCategoriesButton}>
                                            Все товары: 2'000'000+ лотов
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className={s.mainCats}>
                                    <div className={s.mainCatsRow}>
                                        <Image
                                            src={el.mobileImages[0]}
                                            alt="Brand Image"
                                            className={s.mainCat}
                                            width={642}
                                            height={627}
                                            quality={100}
                                            onClick={() => handleOpenSideBar(
                                                "shoes",
                                                ["shoes"],
                                                {"shoes": 0}
                                            )}
                                        />
                                        <Image
                                            src={el.mobileImages[1]}
                                            alt="Brand Image"
                                            className={s.mainCat}
                                            width={642}
                                            height={627}
                                            quality={100}
                                            onClick={() => handleOpenSideBar(
                                                "clothes",
                                                ["clothes"],
                                                {"clothes": 0}
                                            )}
                                        />
                                    </div>
                                    <div className={s.mainCatsRow}>
                                        <Image
                                            src={el.mobileImages[2]}
                                            alt="Brand Image"
                                            className={s.mainCat}
                                            width={642}
                                            height={594}
                                            quality={100}
                                            onClick={() => handleOpenSideBar(
                                                "bags",
                                                ["bags"],
                                                {"bags": 0}
                                            )}
                                        />
                                        <Image
                                            src={el.mobileImages[3]}
                                            alt="Brand Image"
                                            className={s.mainCat}
                                            width={642}
                                            height={594}
                                            quality={100}
                                            onClick={() => handleOpenSideBar(
                                                "accessories",
                                                ["accessories"],
                                                {"accessories": 0}
                                            )}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </>
                )
            } else if (el.type === "extraCategories") {
                arr.push(
                    <div className={s.extraCategoriesCont}>
                        <div className={s.extraCategories} ref={scrollableContainerRef}>
                            {(desktopStore.isDesktop ? el.desktopImages : el.mobileImages).map((src, index) => (
                                <>
                                    {desktopStore.isDesktop || index !== 0 ? (
                                        <Link
                                            href={desktopStore.isDesktop ? el.categoryLinksDesktop[index] : el.categoryLinksMobile[index]}>
                                            <Image
                                                src={src}
                                                alt={`Image ${index + 4}`}
                                                width={700}
                                                height={230}
                                                quality={100}
                                                className={s.extraCategoriesImg}
                                            />
                                        </Link>
                                    ) : (
                                        <Image
                                            src={src}
                                            alt={`Image ${index + 4}`}
                                            width={700}
                                            height={230}
                                            quality={100}
                                            className={s.extraCategoriesImg}
                                            onClick={() => handleOpenSideBar(
                                                "sneakers",
                                                ["sneakers"],
                                                {"sneakers": 0}
                                            )}
                                        />
                                    )}
                                </>
                            ))}
                        </div>

                        {!noArrows && desktopStore.isDesktop &&
                            <button className={s.leftNew} onClick={() => scrollLeft(scrollableContainerRef)}
                                    style={{zIndex: 2}}>
                                <Image src={arrowNew} alt='' style={{transform: 'rotate(180deg)'}}/>
                            </button>
                        }
                        {!noArrows && desktopStore.isDesktop &&
                            <button className={s.rightNew} onClick={() => scrollRight(scrollableContainerRef)}
                                    style={{zIndex: 2}}>
                                <Image src={arrowNew} alt=''/>
                            </button>
                        }
                    </div>
                )
            } else if (el.type === "popularBrands") {
                arr.push(
                    <PopularBrandsMainPage el={el} gender={"F"} arrangement={arrangementFinal}></PopularBrandsMainPage>
                )
            } else if (el.type === "aboutPromoModal") {
                arr.push(
                    <PromoBannerMainPageAbout></PromoBannerMainPageAbout>
                )
            } else if (el.type === "giftsPromoModal") {
                arr.push(
                    <PromoBannerMainPageOffers></PromoBannerMainPageOffers>
                )
            } else if (el.type === "multiSectionCircles") {
                arr.push(
                    <MultiSectionCirclesGrid el={el} gender={"F"}
                                             arrangement={arrangementFinal}></MultiSectionCirclesGrid>
                )
            } else if (el.type === "multiSectionRecs") {
                arr.push(
                    <MultiSectionRecs el={el} gender={"F"} arrangement={arrangementFinal}></MultiSectionRecs>
                )
            } else if (el.type === "multiSectionImages") {
                arr.push(
                    <MultiSectionImages el={el} gender={"F"} arrangement={arrangementFinal}></MultiSectionImages>
                )
            } else if (el.type === "fullWidthImage") {
                arr.push(
                    <>
                        {el.title &&
                            <div className={s.newProductsTitle}>{el.title}</div>
                        }
                        <div style={{width: '100%', marginBottom: `${el.marginBottom}`}}>
                            {el.imageLink &&
                                <Link href={el.imageLink}>
                                    <Image
                                        src={desktopStore.isDesktop ? el.imageUrlDesktop : el.imageUrlMobile}
                                        alt={`Image`}
                                        width={1600}
                                        height={300}
                                        quality={100}
                                        style={{width: '100%', height: 'auto'}}
                                        className={s.fullWidthImg}
                                    />
                                </Link>
                            }
                            {!el.imageLink &&
                                <Image
                                    src={desktopStore.isDesktop ? el.imageUrlDesktop : el.imageUrlMobile}
                                    alt={`Image`}
                                    width={1600}
                                    height={300}
                                    quality={100}
                                    style={{width: '100%', height: 'auto'}}
                                />
                            }
                        </div>
                    </>
                )
            } else if (el.type === 'firstMainBlockSTOPPED' && viewVideo) {
                arr.push(
                    <FirstMainBlock obj={{
                        "leftImages": el.leftImages,
                        "rightImages": el.rightImages,
                        "bigImage": el.bigImage
                    }}/>
                )
            } else if (el.type === 'complexMainPageBlock') {
                arr.push(
                    <ComplexMainPageBlock obj={{
                        "title": el.title,
                        "fullWidthImage": el.fullWidthImage,
                        "noMargin": el.hasOwnProperty('noMargin'),
                        "imagesInRowAmount": el.imagesInRowAmount,
                        "imagesInRow": el.imagesInRow,
                        "productsBlocks": el.productsBlocks,
                        "productsSelection": el.productsSelection,
                        "videosInRowAmount": el.videosInRowAmount,
                        "slidesInVideo": el.hasOwnProperty('slidesInVideo') ? el.slidesInVideo : 0,
                        "videosInRow": el.videosInRow
                    }}/>
                )
            } else if (el.type === 'photo') {
                arr.push(
                    <MainImgBlock obj={el.desktop} className={s.desktop}/>
                )
                arr.push(
                    <MainImgBlock obj={el.mobile} className={s.mobile}/>
                )
            } else if (el.type === 'selection') {
                arr.push(
                    <Selection el={el}></Selection>
                )
            }
        })
        return arr
    }
    const [isSend, setIsSend] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
        setIsSend(false)
    };

    const observerRef = useRef(null); // Реф для отслеживания конца списка
    const endOfPageRef = useRef(null); // Реф для конца страницы (списка)

    useEffect(() => {
        if (!endOfPageRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    console.log("VOT TAK BLYAA")
                    loadMore();
                }
            },
            { root: null, rootMargin: '100px', threshold: 0.1 } // Подгрузка немного заранее
        );
        console.log("AOAOAOOAOA")

        observer.observe(endOfPageRef.current);
        observerRef.current = observer;

        return () => observer.disconnect(); // Убираем наблюдатель при размонтировании
    }, [content]); // Слушаем изменения в content

    const loadMore = () => {
        const amountOfBlocksLoaded = Number(Cookies.get('mainPageWomen-AmountOfBlocksLoaded'))
        if (amountOfBlocksLoaded < currentData.length) {
            setContent(currentData.slice(0, amountOfBlocksLoaded + 5))
            Cookies.set("mainPageWomen-AmountOfBlocksLoaded", amountOfBlocksLoaded + 5, {expires: 2772});
        }
    }

    return (
        <MainLayout>
            <Head>
                <title>Sellout: онлайн-платформа брендовой одежды и обуви</title>
                <meta
                    name="description"
                    content="1 000 000+ лотов по лучшим ценам с гарантией оригинальности: от премиальных и лимитированных релизов до более доступных, но не менее желанных позиций"
                />
                <meta property="og:image"
                      content="https://sellout.su/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_sq.02469b83.png&w=640&q=75"/>
                <meta property="og:image:width" content="640px"/>
                <meta property="og:image:height" content="640px"/>
            </Head>
            <div>


                <div>
                    <div className={s.cont}>
                        <>
                            {/* Your existing code for rendering the main content */}
                            {renderPage()}
                            <div ref={endOfPageRef}></div> {/* Метка конца */}
                            {/*<div className={'d-flex justify-content-center my-5'}>*/}
                            {/*    <button onClick={getMore} className={s.more_btn}>*/}
                            {/*        Посмотреть ещё*/}
                            {/*    </button>*/}
                            {/*</div>*/}

                            <BuyoutModal show={show} handleClose={handleClose} isSend={isSend}/>
                        </>
                    </div>
                    <div className={s.text_container}>
                        <div className={s.text}>
                            Не нашли то, что искали? <br/>
                            Мы привезем для вас желанный лот!
                        </div>
                        <div className={'d-flex justify-content-center'}>
                            <button onClick={handleShow} className={s.toggle_btn}>
                                Оставить заявку
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </MainLayout>
    )
};

export default Women;
