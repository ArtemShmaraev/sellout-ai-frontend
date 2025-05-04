import React from 'react';
import s from "@/styles/EmailSuccess.module.css";
import Link from "next/link";
import MainLayout from "@/layout/MainLayout";

const EmailInvalid = () => {
    return (
        <MainLayout>
            <div className={`custom_cont ${s.cont}`}>
                <div>
                    <h2 className={'text-center'}>Не удалось подтвердить email</h2>
                </div>
                <div className={'d-flex justify-content-center'}>
                    <Link href={'/'} className={s.button}>
                        На главную
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
};

export default EmailInvalid;