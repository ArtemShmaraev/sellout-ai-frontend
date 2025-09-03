import React, {useEffect, useState} from 'react';
import s from '@/styles/AboutUs.module.css'
import MainLayout from "@/layout/MainLayout";
import howWeWork from '@/static/img/aboutUs/Как мы работаем.jpg'
import mHowWeWork from '@/static/img/aboutUs/Как мы работаем-моб.jpg'
import Image from "next/image";
import title from '@/static/img/aboutUs/Заголовок.jpg'
import mTitle from '@/static/img/aboutUs/Заголовок-моб.jpg'
import warranty from '@/static/img/aboutUs/Гарантии.png'
import mWarranty from '@/static/img/aboutUs/Гарантии-моб.jpg'
import team from '@/static/img/aboutUs/Команда.jpg'
import mTeam from '@/static/img/aboutUs/Команда-моб.jpg'
import phyl from '@/static/img/aboutUs/Философия.jpg'
import mPhyl from '@/static/img/aboutUs/Философия-моб.jpg'
import aims from '@/static/img/aboutUs/Цели.png'
import mAims from '@/static/img/aboutUs/Цели-моб.png'
import Head from "next/head";

const About = () => {
    const [isDesktop, setIsDesktop] = useState(true)
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
    return (
        <MainLayout>
            <Head>
                <title>Sellout: Про нас</title>
                <meta name="description" content="Как мы работаем и аутентифицируем, о нашей команде, философии и целях"/>
            </Head>
            <div className={[s.cont].join(' ')}>
                <Image src={isDesktop ? title : mTitle} alt='' className={s.photo}/>
                <div className={'bg-black'}>
                    <div className={['custom_cont', s.nav_block].join(' ')}>
                        <a href={'#how'} className={s.link}
                        >Как мы работаем</a>
                        <a href={'#warranty'} className={s.link}
                        >Гарантии подлинности</a>
                        <div className={s.wrap}></div>
                        <a href={'#team'} className={s.link}
                        >Наша команда</a>
                        <a href={'#phylosophy'} className={s.link}
                        >Философия</a>
                        <a href={'#aims'} className={s.link}
                        >Цели</a>
                    </div>
                </div>
                <Image src={isDesktop ? howWeWork : mHowWeWork} alt='' className={s.photo} id={'how'}/>
                <Image src={isDesktop ? warranty : mWarranty} alt='' className={s.photo} id={'warranty'}/>
                <Image src={isDesktop ? team : mTeam} alt='' className={s.photo} id={'team'}/>
                <Image src={isDesktop ? phyl : mPhyl} alt='' className={s.photo} id={'phylosophy'}/>
                <Image src={isDesktop ? aims : mAims} alt='' className={s.photo} id={'aims'}/>
            </div>
        </MainLayout>
    );
};

export default About;