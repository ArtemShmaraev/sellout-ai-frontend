import MainLayout from "@/layout/MainLayout";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import ScrollableBlock from "@/components/shared/UI/ScrollableBlock/ScrollableBlock";
import BuyoutModal from "@/components/shared/BuyoutModal/BuyoutModal";
import s from '@/styles/Home.module.css'
import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import Head from "next/head";
import {fetchMainPage, fetchMore} from "@/http/mainPageApi";
import MainImgBlock from "@/components/shared/UI/MainImgBlock/MainImgBlock";
import Link from "next/link";
import Image from "next/image";
import {parse} from "cookie";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {selectedGender, setSelectedGender} from "@/layout/MainLayout";
import FirstMainBlock from "@/components/shared/UI/FirstMainBlock/FirstMainBlock";
import ComplexMainPageBlock from "@/components/shared/UI/ComplexMainPageBlock/ComplexMainPageBlock";
import {observer} from "mobx-react-lite";
import {Context} from "@/context/AppWrapper";
import {desktopStore} from "@/store/DesktopStore";
import tempWomenJson from "./temp_main_women_desktop.json"
import arrowNew from "@/static/icons/arrowSlider.svg";
import styles from "@/styles/CatalogBrandsMobileMen.module.css";
import more from "@/static/icons/moreIcon.svg";
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

    let data;

    data = tempWomenJson

    return {props: {data}};
}
const Women = ({data}) => {
    // const {desktopStore} = useContext(Context)
    const router = useRouter()
    const [content, setContent] = useState(data)

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

    useLayoutEffect(() => {
        Cookies.set('selected_gender', "F", {expires: 2772})
        const savedGender = "F";
        // setSelectedGender(savedGender);

        // Check if the user visited the page within the last 10 minutes
        if (!Cookies.get('index_page')) {
            const tenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);
            Cookies.set('index_page', 1, {expires: tenMinutes});
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
            Cookies.set("homeScrollPositionWomen", window.scrollY.toString(), { expires: 0.25 });
        };

        const restoreScrollPosition = () => {
            const savedPosition = Cookies.get("homeScrollPositionWomen");
            if (savedPosition) {
                window.scrollTo(0, parseInt(savedPosition, 10));
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
        console.log(content)
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
                                            <Link href={'/catalog/accessories_desktop_women'} className={s.mainCategoriesCont}>
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
                                        <Link href={desktopStore.isDesktop ? el.categoryLinksDesktop[index] : el.categoryLinksMobile[index]}>
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
                    <PopularBrandsMainPage el={el} gender={"F"}></PopularBrandsMainPage>
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
                    <MultiSectionCirclesGrid el={el} gender={"F"}></MultiSectionCirclesGrid>
                )
            } else if (el.type === "multiSectionRecs") {
                arr.push(
                    <MultiSectionRecs el={el} gender={"F"}></MultiSectionRecs>
                )
            } else if (el.type === "multiSectionImages") {
                arr.push(
                    <MultiSectionImages el={el} gender={"F"}></MultiSectionImages>
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
