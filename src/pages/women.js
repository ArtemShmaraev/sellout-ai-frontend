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

import kylie from "/src/static/img/kylie.png"
import kylieBig from "/src/static/img/kylieBig.png"
import man from "/src/static/img/man.png"
import manBig from "/src/static/img/manBig.png"
import mainbig from "/src/static/img/mainbig.png"
import mainbigMob from "/src/static/img/Group 74.png"
import {selectedGender, setSelectedGender} from "@/layout/MainLayout";
import FirstMainBlock from "@/components/shared/UI/FirstMainBlock/FirstMainBlock";
import ComplexMainPageBlock from "@/components/shared/UI/ComplexMainPageBlock/ComplexMainPageBlock";
import {observer} from "mobx-react-lite";
import {Context} from "@/context/AppWrapper";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const page = cookies['index_page']
    const token = cookies['access_token']

    const selected_gender = cookies['selected_gender']; // Добавляем получение выбранного гендера из кук

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
const Women = ({data}) => {
    const {desktopStore} = useContext(Context)
    const router = useRouter()
    const [content, setContent] = useState(data)
    const [isDesktop, setIsDesktop] = useState(true)
    const [showGenderModal, setShowGenderModal] = useState(false);

    useLayoutEffect(() => {
        const checkIsDesktop = () => {
            const width = window.innerWidth;
            setIsDesktop(width > 1200);
        };
        checkIsDesktop();

        window.addEventListener('resize', checkIsDesktop);
        return () => {
            window.removeEventListener('resize', checkIsDesktop);
        };

    }, []);


    useEffect(() => {
        // Check if the gender is already selected in cookies
        const savedGender = Cookies.get('selected_gender');
        if (savedGender) {
            // Gender is already selected, you can use it as needed
            setSelectedGender(savedGender);
            setShowGenderModal(false);
        } else {
            // Gender is not selected, show the gender selection modal
            setShowGenderModal(true);
        }

        // Check if the user visited the page within the last 10 minutes
        if (!Cookies.get('index_page')) {
            const tenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);
            Cookies.set('index_page', 1, {expires: tenMinutes});
        }
    }, []);

    const handleGenderSelection = async (gender) => {
        // Сохраняем выбранный гендер в куках
        Cookies.set('selected_gender', gender, {expires: 2772});

        // Отправляем запрос на сервер с выбранным гендером
        const page = Cookies.get('index_page');
        const token = Cookies.get('access_token');
        const newData = await fetchMainPage(token, false, !page, page || 1, gender);

        // Обновляем состояние компонента новыми данными
        setContent(newData);

        // Закрываем модальное окно
        setShowGenderModal(false);
    };

    // useEffect(() => {
    //     if (Cookies.get('selected_gender')) {
    //         handleGenderSelection(Cookies.get('selected_gender'))
    //     }
    // }, [desktopStore.showGenderModal])


    // Пустой массив зависимостей, чтобы useEffect вызывался только один раз

    // useEffect(() => {
    //     window.addEventListener("resize", checkIsDesktop);
    //     // Call handler right away so state gets updated with initial window size
    //     checkIsDesktop();
    //     // Remove event listener on cleanup
    //     return () => window.removeEventListener("resize", checkIsDesktop);
    // })

    // const [isPageReloaded, setIsPageReloaded] = useState(false);
    //
    // useEffect(() => {
    //     // Проверяем, была ли страница перезагружена, проверяя, есть ли объект performance в браузере
    //     if (typeof window !== 'undefined' && window.performance) {
    //         const navigation = window.performance.getEntriesByType('navigation')[0];
    //         if (navigation.type === 'reload') {
    //             setIsPageReloaded(true);
    //             const fiveHours = new Date(new Date().getTime() + 300 * 60 * 1000);
    //             Cookies.set('index_page', 1, {expires: fiveHours})
    //             router.push('/')
    //         }
    //     }
    // }, []);
    const getMore = async () => {
        const token = Cookies.get('access_token')
        const page = Cookies.get('index_page') ? Cookies.get('index_page') : 1
        const tenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);
        Cookies.set('index_page', Number(page) + 1, {expires: tenMinutes})
        const gender = Cookies.get('selected_gender')
        const newData = await fetchMainPage(token, true, false, Number(page) + 1, gender)
        const arr = [...(content), ...newData]
        setContent(arr)
    }
    const renderPage = () => {
        const arr = []
        content.forEach(el => {
            if (el.type === 'firstMainBlockSTOPPED') {
                arr.push(
                    <FirstMainBlock obj={{
                        "leftSmallVideo": el.leftSmallVideo,
                        "rightSmallVideo": el.rightSmallVideo,
                        "bigVideo": el.bigVideo
                    }}/>
                )
            } else if (el.type === 'complexMainPageBlock') {
                arr.push(
                    <ComplexMainPageBlock obj={{
                        "title": el.title,
                        "fullWidthImage": el.fullWidthImage,
                        "imagesInRowAmount": el.imagesInRowAmount,
                        "imagesInRow": el.imagesInRow,
                        "productsBlocks": el.productsBlocks,
                        "productsSelection": el.productsSelection,
                        "videosInRowAmount": el.videosInRowAmount,
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
                arr.push(
                    <div className={s.collections}>
                        <div className='d-flex justify-content-between align-items-center my-5'>
                            <div className={s.title_block}>
                                <h3 className={s.title}>{el.title}</h3>
                            </div>
                            <div>
                                <Link href={'/products?' + el.url} className={s.link}
                                >{el.productsAmount ? <span>Все {el.productsAmount} моделей</span> : <span>Посмотреть все</span>}</Link>
                            </div>
                        </div>
                        <ScrollableBlock>
                            {scrollableBlockArr}
                        </ScrollableBlock>
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
                    content="1'000'000+ лотов по лучшим ценам с гарантией оригинальности: от премиальных и лимитированных релизов до более доступных, но не менее желанных позиций"
                />
            </Head>
            <div>
                {!(Cookies.get('selected_gender') === 'M' || Cookies.get('selected_gender') === 'F') ? (
                        <div>
                            {isDesktop ?
                                <div>
                                    <div>
                                        <div className={s.main}
                                             style={{width: '50%', margin: '0 auto', padding: 0, float: 'left'}}>

                                            <Image src={kylie} alt="Description of your image"
                                                   style={{float: 'left', cursor: 'pointer'}}
                                                   layout="responsive" loading={'eager'} onClick={() => {
                                                handleGenderSelection('F')
                                            }}/>

                                        </div>

                                        <div className={s.main}
                                             style={{width: '50%', margin: '0 auto', padding: 0, float: 'right'}}>

                                            <Image src={man} alt="Description of your image"
                                                   style={{float: 'left', cursor: 'pointer'}}
                                                   layout="responsive" loading={'eager'} onClick={() => {
                                                handleGenderSelection('M')
                                            }}/>

                                        </div>
                                    </div>
                                    <div>
                                        <div className={s.main} style={{width: '100%', margin: '0 auto', padding: 0}}>
                                            <Link href="/about">
                                                <Image
                                                    src={mainbig}
                                                    alt="Description of your image"
                                                    layout="responsive"
                                                    loading={'eager'}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div style={{width: '100%', margin: '0 auto', padding: 0}}>

                                        <Image src={kylieBig} alt="Description of your image"
                                               style={{float: 'left', cursor: 'pointer'}}
                                               layout="responsive" loading={'eager'}
                                               onClick={() => handleGenderSelection('F')}/>


                                    </div>
                                    <div style={{width: '100%', margin: '0 auto', padding: 0}}>

                                        <Image src={manBig} alt="Description of your image"
                                               style={{float: 'left', cursor: "pointer"}}
                                               layout="responsive" loading={'eager'}
                                               onClick={() => handleGenderSelection('M')}/>


                                    </div>
                                    <div className={s.main} style={{width: '100%', margin: '0 auto', padding: 0}}>
                                        <Link href="/about">
                                            <Image
                                                src={mainbigMob}
                                                alt="Description of your image"
                                                layout="responsive"
                                                loading={'eager'}
                                            />
                                        </Link>
                                    </div>
                                </div>}
                            <BuyoutModal show={show} handleClose={handleClose} isSend={isSend}/>
                            <div className={s.text_container} style={{marginTop: 0}}>
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
                    )
                    :
                    <div>
                        <div className={s.cont + ' custom_cont'}>
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
                }
            </div>
        </MainLayout>
    )
};

export default Women;
