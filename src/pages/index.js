import MainLayout from "@/layout/MainLayout";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import ScrollableBlock from "@/components/shared/UI/ScrollableBlock/ScrollableBlock";
import BuyoutModal from "@/components/shared/BuyoutModal/BuyoutModal";
import s from '@/styles/Home.module.css'
import React, {useEffect, useState} from "react";
import Head from "next/head";
import {fetchMainPage, fetchMore} from "@/http/mainPageApi";
import MainImgBlock from "@/components/shared/UI/MainImgBlock/MainImgBlock";
import Link from "next/link";
import {parse} from "cookie";
import Cookies from "js-cookie";
import {useRouter} from "next/router";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const page = cookies['index_page']
    const token = cookies['access_token']
    let data
    if (!page) {
        data = await fetchMainPage(token, false, true, 1)
    } else {
        data = await fetchMainPage(token, false, false, page)
    }
    return { props: {data} }
}
export default function Home({data}) {
    const router = useRouter()
    const [content, setContent] = useState(data)
    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        if (!Cookies.get('index_page')) {
            const tenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);
            Cookies.set('index_page', 1, {expires: tenMinutes})
        }
    }, [])
    const checkIsDesktop = () => {
        const width = window.innerWidth
        if (width <= 1200) {
            setIsDesktop(false)
        } else {
            setIsDesktop(true)
        }
    }
    useEffect(() => {
        window.addEventListener("resize", checkIsDesktop);
        // Call handler right away so state gets updated with initial window size
        checkIsDesktop();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", checkIsDesktop);
    })
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
        const newData = await fetchMainPage(token, true, false, Number(page)+1)
        const arr = [...(content), ...newData]
        setContent(arr)
    }
    const renderPage = () => {
        const arr = []
        content.forEach(el => {
            if (el.type === 'photo') {
                arr.push(
                    <MainImgBlock obj={el.desktop} className={s.desktop}/>
                )
                arr.push(
                    <MainImgBlock obj={el.mobile} className={s.mobile}/>
                )
            } else {
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
                                >Посмотреть все</Link>
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
                <title>Sellout - Онлайн-платформа для ценителей стиля: уникальная брендовая одежда и обувь</title>
                <meta name="description" content="Инновационная онлайн-платформа, предлагающая широчайший ассортимент брендовой одежды и обуви, аксессуаров и прочих товаров. У нас Вы сможете найти как лимитированные и труднодоступные модели и коллекции, так и отобранные нашими стилистами товары со всего мира."/>
            </Head>
            <div className={s.cont + ' custom_cont'}>
                {renderPage()}
                <div className={'d-flex justify-content-center my-5'}>
                    <button onClick={getMore} className={s.more_btn}>Посмотреть ещё</button>
                </div>
            </div>
            <div className={s.text_container}>
                <div className={s.text}>
                    Не смогли найти на нашей платформе то, что искали? <br/>
                    Оставьте заявку, и мы привезем Вам желаемый товар!
                </div>
                <div className={'d-flex justify-content-center'}>
                    <button onClick={handleShow} className={s.toggle_btn}>Оставьте заявку</button>
                </div>
            </div>
            <BuyoutModal show={show} handleClose={handleClose} isSend={isSend}/>
        </MainLayout>
    )
}
