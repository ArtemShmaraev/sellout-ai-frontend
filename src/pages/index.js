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
import Image from "next/image";
import {parse} from "cookie";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import NavbarC from "@/components/shared/NavbarC/NavbarC";
import NavbarNoGender from "@/components/shared/NavbarNoGender/NavbarNoGender";
import kylie from "/src/static/img/kylie.png"
import kylieBig from "/src/static/img/kylieBig.png"
import man from "/src/static/img/man.png"
import manBig from "/src/static/img/manBig.png"
import mainbig from "/src/static/img/mainbig.png"
import mainbigMob from "/src/static/img/Group 74.png"

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
    return {props: {data}}
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
        const newData = await fetchMainPage(token, true, false, Number(page) + 1)
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

    const userGender = 'a';

    return (
        <MainLayout>
            <Head>
                <title>Sellout: онлайн-платформа брендовой одежды и обуви</title>
                <meta name="description"
                      content="1'000'000+ лотов по лучшим ценам с гарантией оригинальности: от премиальных и лимитированных релизов до более доступных, но не менее желанных позиций"/>
            </Head>
            {userGender === 'M' || userGender === 'F' ? (
                <div>
                    <div className={s.cont + ' custom_cont'}>
                        {renderPage()}
                        <div className={'d-flex justify-content-center my-5'}>
                            <button onClick={getMore} className={s.more_btn}>Посмотреть ещё</button>
                        </div>
                    </div>
                    <div className={s.text_container}>
                        <div className={s.text}>
                            Не смогли найти на нашей платформе то, что искали? <br/>
                            Оставьте заявку, и мы привезем вам желаемый товар!
                        </div>
                        <div className={'d-flex justify-content-center'}>
                            <button onClick={handleShow} className={s.toggle_btn}>Оставьте заявку</button>
                        </div>
                    </div>
                    <BuyoutModal show={show} handleClose={handleClose} isSend={isSend}/>
                </div>
            ) : (
                <div>
                    {isDesktop ?
                        <div>
                            <div>
                                <div className={s.main}
                                     style={{width: '50%', margin: '0 auto', padding: 0, float: "left"}}>
                                    <a href="/about">
                                        <Image
                                            src={kylie}
                                            alt="Description of your image"
                                            style={{float: "left"}}
                                            layout="responsive"
                                            loading={'eager'}
                                        />
                                    </a>
                                </div>
                                <div style={{width: '50%', margin: '0 auto', padding: 0, float: "right"}}>
                                    <a href="/about">
                                        <Image
                                            src={man}
                                            alt="Description of your image"
                                            style={{float: "left"}}
                                            layout="responsive"
                                            loading={'eager'}
                                        />
                                    </a>
                                </div>
                            </div>
                            <div>
                                <div className={s.main} style={{width: '100%', margin: '0 auto', padding: 0}}>
                                    <a href="/about">
                                        <Image
                                            src={mainbig}
                                            alt="Description of your image"
                                            layout="responsive"
                                            loading={'eager'}
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <div style={{width: '100%', margin: '0 auto', padding: 0}}>
                                <a href="/about">
                                    <Image
                                        src={kylieBig}
                                        alt="Description of your image"
                                        layout="responsive"
                                        loading={'eager'}
                                    />
                                </a>
                            </div>
                            <div style={{width: '100%', margin: '0 auto', padding: 0}}>
                                <a href="/about">
                                    <Image
                                        src={manBig}
                                        alt="Description of your image"
                                        layout="responsive"
                                        loading={'eager'}
                                    />
                                </a>
                            </div>
                            <div className={s.main} style={{width: '100%', margin: '0 auto', padding: 0}}>
                                <a href="/about">
                                    <Image
                                        src={mainbigMob}
                                        alt="Description of your image"
                                        layout="responsive"
                                        loading={'eager'}
                                    />
                                </a>
                            </div>
                        </div>
                    }
                </div>
            )}
        </MainLayout>
    )
}
