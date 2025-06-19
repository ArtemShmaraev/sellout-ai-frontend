import React from 'react';
import MainLayout from "@/layout/MainLayout";
import s from '@/styles/500.module.css'
import Link from "next/link";

const Error500 = () => {
    return (
        <MainLayout>
            <div className={s.cont}>
                <h1 className={'text-center'}>Кажется, произошла какая-то ошибка...</h1>
                <div className={'d-flex justify-content-center'}>
                    <Link href={'/'} className={s.link}>На главную страницу</Link>
                </div>
            </div>
        </MainLayout>
    );
};

export default Error500;