import React from 'react';
import MainLayout from "@/layout/MainLayout";
import s from "@/styles/EmailSuccess.module.css";
import Link from "next/link";

const EmailSuccess = () => {
    return (
        <MainLayout>
            <div className={`custom_cont ${s.cont}`}>
                <div>
                    <h2 className={'text-center'}>Email успешно подтвержден</h2>
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

export default EmailSuccess;