import MainLayout from "@/layout/MainLayout";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import ScrollableBlock from "@/components/shared/UI/ScrollableBlock/ScrollableBlock";
import BuyoutModal from "@/components/shared/BuyoutModal/BuyoutModal";
import s from '@/styles/Home.module.css'
import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
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

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const page = cookies['index_page']
    const token = cookies['access_token']

    const selected_gender = "M"; // Добавляем получение выбранного гендера из кук

    let data;

    // Проверяем, выбран ли гендер
    if (selected_gender) {
        if (!page) {
            // Добавляем передачу гендера в запрос на сервер
            data = await fetchMainPage(token, false, true, 1, selected_gender);
        } else {
            // Аналогично, передаем гендер в запрос
            data = await fetchMainPage(token, false, false, page, selected_gender);
        }
    } else {
        // Если гендер не выбран, возвращаем пустые данные
        data = [];
    }
    return {props: {data}};
}
const MenOld = ({data}) => {
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
        Cookies.set('selected_gender', "M", {expires: 2772})
        const savedGender = "M";
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
        const gender = "M"
        const newData = await fetchMainPage(token, true, false, Number(page) + 1, gender)
        const arr = [...(content), ...newData]
        setContent(arr)
    }
    const renderPage = () => {
        const arr = []
        content.forEach(el => {
            if (el.type === 'firstMainBlockSTOPPED' && viewVideo) {
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
                const scrollableBlockArr = []
                el.products.forEach(product => {
                    scrollableBlockArr.push(
                        <ProductCard
                            product={product}
                            key={product.id}
                            smallCard={true}
                        />
                    )
                })
                const selectionRows = el.selectionRows ? el.selectionRows : 2;
                arr.push(
                    <div className={s.collections}>
                        {el.titleBlock && (
                            <div className={'d-flex justify-content-between align-items-center ' + s.margins}
                                 style={{marginBottom: '30px'}}>
                                <div className={s.title_block}>
                                    <h3 className={s.title}>{el.title}</h3>
                                </div>
                                <div>
                                    <Link href={'/products?' + el.url} className={s.link}
                                    >{el.productsAmount ? <span>Все {el.productsAmount} моделей</span> :
                                        <span>Посмотреть все</span>}</Link>
                                </div>
                            </div>
                        )}
                        {el.titleCentered && (
                            <div className={`${s.title} + ${s.titleCentered}`}>
                                {el.title}
                            </div>
                        )}
                        <ScrollableBlock paddings={'regular'} rows={selectionRows} moreButton={true}>
                            {scrollableBlockArr}
                        </ScrollableBlock>
                        {!el.moreButton && (
                            <Link href={`/products?${el.url}`} className={`${s.linkMore} + ${s.paddings}`}>
                                <div className={s.customButton}>
                                    {el.productsAmount && el.moreButtonName
                                        ? `Посмотреть все ${el.productsAmount} ${el.moreButtonName}`
                                        : el.productsAmount
                                            ? `Посмотреть все ${el.productsAmount} моделей`
                                            : el.moreButtonName
                                                ? `Посмотреть все ${el.moreButtonName}`
                                                : 'Посмотреть все'
                                    }
                                </div>
                            </Link>
                        )}
                    </div>
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
                            {renderPage()}
                            <div className={'d-flex justify-content-center my-5'}>
                                <button onClick={getMore} className={s.more_btn}>
                                    Посмотреть ещё
                                </button>
                            </div>

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

export default MenOld;
