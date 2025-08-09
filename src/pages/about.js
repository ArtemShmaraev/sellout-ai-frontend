import React from 'react';
import s from '@/styles/AboutUs.module.css'
import MainLayout from "@/layout/MainLayout";
import howWeWork from '@/static/img/aboutUs/Как мы работаем.png'
import Image from "next/image";
import title from '@/static/img/aboutUs/Заголовок.png'
import warranty from '@/static/img/aboutUs/Гарантии.png'

const About = () => {
    return (
        <MainLayout>
            <div className={[s.cont].join(' ')}>
                <Image src={title} alt='' className={s.photo}/>
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
                <Image src={howWeWork} alt='' className={s.photo} id={'how'}/>
                <Image src={warranty} alt='' className={s.photo} id={'warranty'}/>
            </div>
        </MainLayout>
    );
};

export default About;