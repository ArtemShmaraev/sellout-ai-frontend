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
// import man from "/src/static/img/photo_2024-05-03_13-40-05.jpg"
import manBig from "/src/static/img/manBig.png"
import mainbig from "/src/static/img/mainbig.png"
import mainbigMob from "/src/static/img/Group 74.png"
import men_mob from 'src/static/img/men.png'
import women_mob from "src/static/img/women.png"
import {observer} from "mobx-react-lite";
import {Context} from "@/context/AppWrapper";

export const getServerSideProps = async (context) => {

    return {props: {}};
}
const Home = ({data}) => {
    const router = useRouter()
    const {desktopStore} = useContext(Context)
    // const [isDesktop, setIsDesktop] = useState(true)

    // useLayoutEffect(() => {
    //     const savedGender = Cookies.get('selected_gender');
    //     // if (savedGender) {
    //     //     if (savedGender === "M") {
    //     //         router.push("/men")
    //     //     } else {
    //     //         router.push("/women")
    //     //     }
    //     // }
    //     const checkIsDesktop = () => {
    //         const width = window.innerWidth;
    //         setIsDesktop(width > 1200);
    //     };
    //     checkIsDesktop();
    //
    // }, []);


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
                <meta property="og:title" content="Sellout: онлайн-платформа брендовой одежды и обуви"/>
                <meta property="og:description" content="1 000 000+ лотов по лучшим ценам с гарантией оригинальности: от премиальных и лимитированных релизов до более доступных, но не менее желанных позиций"
                />

                <meta
                    name="description"
                    content="1 000 000+ лотов по лучшим ценам с гарантией оригинальности: от премиальных и лимитированных релизов до более доступных, но не менее желанных позиций"
                />
                <meta property="og:image" content="https://sellout.su/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_sq.02469b83.png&w=640&q=75"/>
                <meta property="og:image:width" content="640px"/>
                <meta property="og:image:height" content="640px"/>
            </Head>
            <div>

                <div className={s.cont_index}>

                    {/*<br/>*/}
                    {desktopStore.isDesktop ?
                        <div>
                            <div>
                                <div className={s.main}
                                     style={{width: '50%', margin: '0 auto', padding: 0, float: 'left'}}>
                                    <Link href="/women">

                                        <Image src={kylie} alt="Description of your image"
                                               style={{float: 'left', cursor: 'pointer'}}
                                               layout="responsive" loading={'eager'}/></Link>

                                </div>

                                <div className={s.main}
                                     style={{width: '50%', margin: '0 auto', padding: 0, float: 'right'}}>
                                    <Link href="/men">

                                        <Image src={manBig} alt="Description of your image"
                                               style={{float: 'left', cursor: 'pointer'}}
                                               layout="responsive" loading={'eager'}/></Link>

                                </div>
                            </div>
                            <div>
                                <div style={{width: '100%', margin: '0 auto', padding: 0}}>
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
                            {/*<div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "10px", paddingBottom: "80px" }}>*/}
                                <div className={s.main} style={{ width: '100%', margin: '0 auto', padding: 0}}>
                                    <Link href="/women">
                                        <Image src={women_mob} alt="Description of your image" style={{float: 'left', cursor: 'pointer'}} layout="responsive" loading={'eager'} />
                                    </Link>
                                </div>
                                 <div className={s.main} style={{ width: '100%', margin: '0 auto', padding: 0 }}>
                                    <Link href="/men">
                                        <Image src={men_mob} alt="Description of your image" style={{float: 'left', cursor: 'pointer'}} layout="responsive" loading={'eager'} />
                                    </Link>
                                </div>
                            {/*</div>*/}


                            {/*<div style={{width: '100%', margin: '0 auto', padding: 0}}>*/}
                            {/*    <Link href="/women">*/}

                            {/*        <Image src={kylieBig} alt="Description of your image"*/}
                            {/*               style={{float: 'left', cursor: 'pointer'}}*/}
                            {/*               layout="responsive" loading={'eager'}/>*/}
                            {/*    </Link>*/}


                            {/*</div>*/}
                            {/*<div style={{width: '100%', margin: '0 auto', padding: 0}}>*/}
                            {/*    <Link href="/men">*/}

                            {/*        <Image src={manBig} alt="Description of your image"*/}
                            {/*               style={{float: 'left', cursor: "pointer"}}*/}
                            {/*               layout="responsive" loading={'eager'}/></Link>*/}


                            {/*</div>*/}
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

            </div>
        </MainLayout>
    )
};
export default observer(Home);




