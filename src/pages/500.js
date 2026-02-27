import React, {useEffect, useState} from 'react';
import MainLayout from "@/layout/MainLayout";
import s from '@/styles/500.module.css'
import Link from "next/link";
import Cookies from "js-cookie";

const Error500 = () => {
    const [selectedGender, setSelectedGender] = useState("any")
    useEffect(() => {
        if (Cookies.get('selected_gender')) {
            setSelectedGender(Cookies.get('selected_gender'))
        }
    }, []);
    return (
        <MainLayout>
            <div className={s.cont}>
                <h1 className={'text-center'}>Кажется, произошла какая-то ошибка...</h1>
                <div className={'d-flex justify-content-center'}>
                    <Link href={selectedGender === 'M' ? '/men' : selectedGender === 'F' ? '/women' : '/'}
                          className={s.link}>На главную страницу</Link>
                </div>
            </div>
        </MainLayout>
    );
};

export default Error500;