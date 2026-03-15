import MainLayout from "@/layout/MainLayout";
import BuyoutModal from "@/components/shared/BuyoutModal/BuyoutModal";
import s from '@/styles/Home.module.css'
import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import Head from "next/head";
import {fetchMainPage, fetchMainPage2} from "@/http/mainPageApi";
import MainImgBlock from "@/components/shared/UI/MainImgBlock/MainImgBlock";
import Link from "next/link";
import Image from "next/image";
import cookie, {parse} from "cookie";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import FirstMainBlock from "@/components/shared/UI/FirstMainBlock/FirstMainBlock";
import ComplexMainPageBlock from "@/components/shared/UI/ComplexMainPageBlock/ComplexMainPageBlock";
import {Context} from "@/context/AppWrapper";
import tempManJson from "./main_page_men.json"
import arrowNew from "@/static/icons/arrowSlider.svg";
import PromoBannerMainPageAbout from "@/components/shared/UI/PromoBannerMainPageAbout/PromoBannerMainPageAbout";
import PromoBannerMainPageOffers from "@/components/shared/UI/PromoBannerMainPageOffers/PromoBannerMainPageOffers";
import MultiSectionCirclesGrid from "@/components/shared/UI/MultiSectionCirclesGrid/MultiSectionCirclesGrid";
import PopularBrandsMainPage from "@/components/shared/UI/PopularBrandsMainPage/PopularBrandsMainPage";
import MultiSectionRecs from "@/components/shared/UI/MultiSectionRecs/MultiSectionRecs";
import MultiSectionImages from "@/components/shared/UI/MultiSectionImages/MultiSectionImages";
import Selection from "@/components/shared/UI/Selection/Selection";
import logo from "@/static/img/sellout_logo_light_blood.svg";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const page = cookies['index_page']
    const token = cookies['access_token']

    const selected_gender = "M";

    let emptyData;
    let restoredData = false;

    emptyData = tempManJson

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

    const checkCookiesExist = (Cookies_, data_) => {
        // Базовые куки
        const requiredCookies = [
            "mpM-Pos",
            "mpM-blocks",
            "mpM-topBlock",
            "mpM-updTime"
        ];

        // Добавляем куки из `data`
        data_.forEach(item => {
            if (item.blockId && ['multiSectionCircles', 'popularBrands', 'multiSectionRecs', 'multiSectionImages', 'selection'].includes(item.type)) {
                const blockId = item.blockId;

                const cookiesToCheck = item.type === "selection" ? [
                    `${blockId}-PrPos`
                ] : [
                    `${blockId}-IndArr`,
                    `${blockId}-SecPos`,
                    `${blockId}-PrPos`,
                    `${blockId}-Ind`
                ];

                requiredCookies.push(...cookiesToCheck);
            }
        });

        // Проверка всех кук
        return requiredCookies.every(cookieName => Cookies_[cookieName] !== undefined);
    };

    // Шаг 1: Если первая загрузка страницы (куки все еще пустые и нет расстановки), создаем базовую расстановку.
    if (!('mpM-updTime' in cookies) || !cookies['mpM-updTime'] || !checkCookiesExist(cookies, emptyData)) {
        arrangement = arrangementBase

        restoredData = true;
    } else if ('mpM-updTime' in cookies && Date.now() - parseInt(cookies['mpM-updTime'], 10) > 10 * 60 * 1000) {
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

            cookies[`${blockId}-Ind`] = block[0];
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
    // let data = tempManJson;

    return {props: {data, arrangement, restoredData}};
}
const Men = ({data, arrangement, restoredData}) => {
    const router = useRouter()
    const [currentData, setCurrentData] = useState(data)
    const [content, setContent] = useState(data.slice(0, 5))

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

    const blockNames = data
        .filter((el) => !['ОСНОВНЫЕ КАТЕГОРИИ', 'ДОП КАТЕГОРИИ'].includes(el.blockName))
        .map((el) => el.blockName);

    useLayoutEffect(() => {
        Cookies.set('selected_gender', "M", {expires: 2772})

        // Check if the user visited the page within the last 10 minutes
        // if (!Cookies.get('index_page')) {
        //     const tenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);
        //     Cookies.set('index_page', 1, {expires: tenMinutes});
        // }

        Cookies.set('mpM-updTime', Date.now(), {expires: 2772})
        if (restoredData) {
            // Если обновили данные (первый заход или более 10 минут прошло), то сбрасываем на ноль все позиции, сохраняем новую расстановку
            Cookies.set("mpM-Pos", JSON.stringify({}), {expires: 2772});
            Cookies.set("mpM-blocks", 2, {expires: 2772});
            Cookies.set("mpM-topBlock", encodeURIComponent('ПОПУЛЯРНЫЕ БРЕНДЫ'), {expires: 2772});
            localStorage.setItem('mpM-arr', JSON.stringify(arrangement));

            data.forEach(item => {
                if (item.blockId && ['multiSectionCircles', 'popularBrands', 'multiSectionRecs', 'multiSectionImages', 'selection'].includes(item.type)) {
                    const blockId = item.blockId;

                    // Формируем имена куков
                    const cookiesToCheck = item.type === "selection" ? [
                        `${blockId}-PrPos`
                    ] : [
                        `${blockId}-IndArr`,
                        `${blockId}-SecPos`,
                        `${blockId}-PrPos`
                    ];

                    // Проверяем наличие каждого кука и устанавливаем значение 0
                    cookiesToCheck.forEach(cookieName => {
                        Cookies.set(cookieName, 0, {expires: 0.25});
                    });

                    if (item.type !== "selection") {
                        Cookies.set(`${blockId}-Ind`, arrangement[blockId][0], {expires: 0.25});
                    }
                }
            })
        }

        // Теперь необходимо восстановить корректную расстановку внутри data согласно нашей расстановке (новая или прежняя - в любом случае будет уже лежать в локал хранилище)
        const storageArr = JSON.parse(localStorage.getItem('mpM-arr'));
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

        const arrangedData = rearrangeData(structuredClone(data), JSON.parse(localStorage.getItem('mpM-arr')));
        if (arrangedData) {
            setCurrentData(arrangedData)
            const savedBlockName = Cookies.get('mpM-topBlock') ? decodeURIComponent(Cookies.get('mpM-topBlock')) : null;
            let startIndex = blockNames.indexOf(savedBlockName);

            const initialBlock = arrangedData[startIndex + 2];
            if (initialBlock.connectedBlock) {
                const connectedIndex = blockNames.indexOf(initialBlock.connectedBlock);
                if (connectedIndex !== -1) {
                    startIndex = connectedIndex;
                }
            }

            // Формируем начальный контент (Первые 2 блока (категории основные + доп) всегда есть)
            const initialContent = [];
            initialContent.push(arrangedData[0])
            initialContent.push(arrangedData[1])
            for (let i = 0; i < 3; i++) {
                const adjustedIndex = (startIndex + i) % blockNames.length;
                const blockName = blockNames[adjustedIndex];

                // Ищем соответствующий блок в arrangedData по blockName
                const block = arrangedData.find((el) => el.blockName === blockName);
                if (block) {
                    initialContent.push(block);
                }
            }

            Cookies.set("mpM-blocks", 5, {expires: 2772});
            Cookies.set("mpM-lastBlock", encodeURIComponent(initialContent[4].blockName), {expires: 2772});

            setContent(initialContent); // Устанавливаем контент
        }
    }, []);

    const getMore = async () => {
        const token = Cookies.get('access_token')
        const page = Cookies.get('index_page') ? Cookies.get('index_page') : 1
        const tenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);
        Cookies.set('index_page', Number(page) + 1, {expires: tenMinutes})
        const gender = "M"
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
        // Отключаем автоматическое восстановление прокрутки браузером
        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        }

        // Очищаем scroll restoration перед загрузкой страницы
        window.scrollTo(0, 0);

        // Вернем scroll restoration в нормальное состояние, если нужно
        return () => {
            if (history.scrollRestoration) {
                history.scrollRestoration = 'auto';
            }
        };
    }, []);

    useEffect(() => {
        const saveScrollPosition = () => {
            const topSeenBlockName = Cookies.get('mpM-topBlock') ? decodeURIComponent(Cookies.get('mpM-topBlock')) : null;
            if (topSeenBlockName && blockRefs.current[topSeenBlockName]) {
                const block = blockRefs.current[topSeenBlockName];
                const blockRect = block.getBoundingClientRect();
                const distanceFromBottom = blockRect.bottom; // Позиция нижнего края относительно экрана

                Cookies.set("mpM-Pos", JSON.stringify({
                    blockName: encodeURIComponent(topSeenBlockName),
                    distanceFromBottom
                }), {expires: 2772});
            }

            Cookies.set('mpM-updTime', Date.now(), {expires: 2772})
        };

        const restoreScrollPosition = () => {
            const savedPosition = JSON.parse(Cookies.get("mpM-Pos"));
            if (savedPosition && typeof savedPosition === 'object' && Object.keys(savedPosition).length > 0) {
                const {blockName, distanceFromBottom} = savedPosition;
                const block = blockRefs.current[decodeURIComponent(blockName)];

                if (block) {
                    const interval = setInterval(() => {
                        const blockRect = block.getBoundingClientRect();

                        if (blockRect.height > 0) {
                            // Скроллим страницу так, чтобы блок оказался на правильной позиции
                            const scrollPosition = blockRect.bottom - distanceFromBottom;
                            window.scrollTo(0, scrollPosition);
                            clearInterval(interval);
                        }
                    }, 100);

                    // Очистка таймера на случай, если компонент размонтируется
                    return () => clearInterval(interval);
                } else {
                    // Если блока нет, ждем его появления и пытаемся снова
                    setTimeout(restoreScrollPosition, 100); // Попробуем снова через 100мс
                }
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

    const blockRefs = useRef({});

    const renderPage = () => {
        const arr = []
        content.forEach(el => {
            const blockRef = (ref) => {
                if (ref) {
                    blockRefs.current[el.blockName] = ref; // Сохраняем реф в общий массив
                }
            };

            if (el.type === "mainCategories") {
                arr.push(
                    <div>
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
                                    <div style={{width: `${(503 / 1516) * 100}vw`}} className={s.mainCategoriesCont}>
                                        <Link href={'/catalog/shoes_desktop_men'}>
                                            <Image
                                                src={el.desktopImages[0]}
                                                alt="Image 1"
                                                layout="responsive" width={519} height={357}
                                                className={s.mainCategoriesContImg}/>
                                        </Link>
                                    </div>

                                    <div style={{width: `${(278 / 1516) * 100}vw`}} className={s.mainCategoriesCont}>
                                        <Link href={'/catalog/clothes_desktop_men'}>
                                            <Image
                                                src={el.desktopImages[1]}
                                                alt="Image 2"
                                                layout="responsive" width={287} height={357}
                                                className={s.mainCategoriesContImg}/>
                                        </Link>
                                    </div>

                                    <div style={{width: `${(278 / 1516) * 100}vw`}} className={s.mainCategoriesCont}>
                                        <Link href={'/catalog/bags_desktop_men'}>
                                            <Image
                                                src={el.desktopImages[2]}
                                                alt="Image 3"
                                                layout="responsive" width={287} height={357}
                                                className={s.mainCategoriesContImg}/>
                                        </Link>
                                    </div>

                                    {/* Четвертый блок с изображением и кнопкой */}
                                    <div className={s.mainCategoriesCont4} style={{
                                        width: `${(380 / 1516) * 100}vw`,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <div style={{width: '100%'}}>
                                            <Link href={'/catalog/accessories_desktop_men'}
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
                                            height={660}
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
                                            height={660}
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
                                            height={660}
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
                                            height={660}
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
                    </div>
                )
            } else if (el.type === "extraCategories") {
                arr.push(
                    <div className={s.extraCategoriesCont}>
                        <div className={s.extraCategories} ref={scrollableContainerRef}>
                            {(desktopStore.isDesktop ? el.desktopImages : el.mobileImages).map((src, index) => (
                                <>
                                    {desktopStore.isDesktop || (index !== 0 && index !== 1) ? (
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
                                                index === 0 ? "sneakers" : "basketball",
                                                index === 0 ? ["sneakers"] : ["basketball"],
                                                index === 0 ? {"sneakers": 0} : {"basketball": 0}
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
                    <PopularBrandsMainPage el={el} gender={"M"} arrangement={arrangementFinal} key={el.blockName}
                                           ref={blockRef} dataIndex={el.blockName}></PopularBrandsMainPage>
                )
            } else if (el.type === "aboutPromoModal") {
                arr.push(
                    <PromoBannerMainPageAbout key={el.blockName} ref={blockRef}
                                              dataIndex={el.blockName}></PromoBannerMainPageAbout>
                )
            } else if (el.type === "giftsPromoModal") {
                arr.push(
                    <PromoBannerMainPageOffers key={el.blockName} ref={blockRef}
                                               dataIndex={el.blockName}></PromoBannerMainPageOffers>
                )
            } else if (el.type === "multiSectionCircles") {
                arr.push(
                    <MultiSectionCirclesGrid el={el} gender={"M"}
                                             arrangement={arrangementFinal} key={el.blockName} ref={blockRef}
                                             dataIndex={el.blockName}></MultiSectionCirclesGrid>
                )
            } else if (el.type === "multiSectionRecs") {
                arr.push(
                    <MultiSectionRecs el={el} gender={"M"} arrangement={arrangementFinal} key={el.blockName}
                                      ref={blockRef} dataIndex={el.blockName}></MultiSectionRecs>
                )
            } else if (el.type === "multiSectionImages") {
                arr.push(
                    <MultiSectionImages el={el} gender={"M"} arrangement={arrangementFinal} key={el.blockName}
                                        ref={blockRef} dataIndex={el.blockName}></MultiSectionImages>
                )
            } else if (el.type === "fullWidthImage") {
                arr.push(
                    <div key={el.blockName} ref={blockRef} data-index={el.blockName}>
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
                    </div>
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
                    }} key={el.blockName} ref={blockRef} dataIndex={el.blockName}/>
                )
            } else if (el.type === 'photo') {
                arr.push(
                    <MainImgBlock obj={el.desktop} className={s.desktop} key={el.blockName} ref={blockRef}
                                  dataIndex={el.blockName}/>
                )
                arr.push(
                    <MainImgBlock obj={el.mobile} className={s.mobile} key={el.blockName} ref={blockRef}
                                  dataIndex={el.blockName}/>
                )
            } else if (el.type === 'selection') {
                arr.push(
                    <Selection el={el} key={el.blockName} ref={blockRef} dataIndex={el.blockName}></Selection>
                )
            }
        })
        return arr
    }

    const observedBlocks = useRef([]); // Массив для всех блоков
    useEffect(() => {
        const visibilityMap = {};

        // Создаем IntersectionObserver
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const blockName = entry.target.getAttribute("data-index");
                    const isVisible = entry.isIntersecting;

                    // Обновляем состояние видимости только если оно изменилось
                    if (visibilityMap[blockName] !== isVisible) {
                        visibilityMap[blockName] = isVisible;
                    }
                });

                // Для отладки: полный словарь видимости
                // console.log("Текущее состояние видимости:", visibilityMap);

                // Находим самый верхний видимый блок
                const visibleBlocks = Object.keys(visibilityMap).filter(
                    (blockName) => visibilityMap[blockName] // Только видимые блоки
                );
                if (visibleBlocks.length > 0) {
                    const topVisibleBlock = visibleBlocks
                        .map((blockName) => ({
                            blockName,
                            top: blockRefs.current[blockName]?.getBoundingClientRect().top,
                        }))
                        .sort((a, b) => a.top - b.top)[0]; // Сортируем по позиции top

                    if (topVisibleBlock) {
                        const {blockName} = topVisibleBlock;
                        // Обновляем куки с именем верхнего блока
                        Cookies.set("mpM-topBlock", encodeURIComponent(blockName), {
                            expires: 2772,
                        });
                    }
                } else {
                    // console.log("Нет видимых блоков")
                }
            },
            {root: null, rootMargin: "0px", threshold: 0.07} // Считаем блок видимым, если хотя бы 1% его области виден
        );

        // Подключаем все блоки к наблюдению
        Object.values(blockRefs.current).forEach((block) => {
            if (block) {
                const blockName = block.getAttribute("data-index");
                visibilityMap[blockName] = false; // Изначально считаем все блоки невидимыми
                observer.observe(block);
            }
        });

        // Чистим observer при размонтировании
        return () => {
            observer.disconnect();
            observedBlocks.current = [];
        };
    }, [content]);

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
                    loadMore();
                }
            },
            {root: null, rootMargin: '100px', threshold: 0.1} // Подгрузка немного заранее
        );

        observer.observe(endOfPageRef.current);
        observerRef.current = observer;

        return () => observer.disconnect(); // Убираем наблюдатель при размонтировании
    }, [content]); // Слушаем изменения в content

    const loadMore = () => {
        const amountOfBlocksLoaded = Number(Cookies.get('mpM-blocks'))
        const lastLoadedBlock = Cookies.get('mpM-lastBlock') ? decodeURIComponent(Cookies.get('mpM-lastBlock')) : null;
        const lastIndex = blockNames.indexOf(lastLoadedBlock);

        if (amountOfBlocksLoaded < currentData.length) {
            // Формируем новые блоки
            const newBlocks = [];
            for (let i = 1; i <= Math.min(3, currentData.length - amountOfBlocksLoaded); i++) {
                const adjustedIndex = (lastIndex + i) % blockNames.length;
                const blockName = blockNames[adjustedIndex];

                // Ищем блок в arrangedData
                const block = currentData.find((el) => el.blockName === blockName);
                if (block) {
                    newBlocks.push(block);
                }
            }

            // Обновляем состояние
            setContent((prevContent) => [...prevContent, ...newBlocks]);

            Cookies.set("mpM-lastBlock", encodeURIComponent(newBlocks[newBlocks.length - 1].blockName), {expires: 2772});
            Cookies.set("mpM-blocks", Math.min(amountOfBlocksLoaded + 3, currentData.length), {expires: 2772});
        }
    }

    return (
        <MainLayout>
            <Head>
                <title>Sellout: онлайн-платформа брендовой одежды и обуви</title>
                <meta
                    name="description"
                    content="2 000 000+ лотов по лучшим ценам с гарантией оригинальности: от премиальных и лимитированных релизов до более доступных, но не менее желанных позиций"
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
                            {!desktopStore.isDesktop &&
                                <div className={s.headerM}>
                                    {/* Первая часть: Логотип и крестик */}
                                    <div className={s.headerTop}>
                                        <div className={s.logoContainer}>
                                            <Image src={logo} alt="Logo" className={s.logo} width={370}
                                                   height={50}/>
                                        </div>
                                    </div>
                                </div>
                            }

                            {renderPage()} {/* Рендерим страницы через функцию */}
                            <div ref={endOfPageRef}></div>
                            {/* Метка конца */}
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

export default Men;
