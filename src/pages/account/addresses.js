import React from 'react';
import AccountLayout from "@/layout/AccountLayout";
import MainLayout from "@/layout/MainLayout";
import s from '@/styles/Addresses.module.css'
import AddressCard from "@/components/pages/account/AddressCard/AddressCard";
const Addresses = () => {
    return (
        <MainLayout>
            <AccountLayout>
                <div style={{width: '70%'}}>
                    <h4 className={s.title}>Адреса</h4>
                    <div className={s.main_block}>
                        <AddressCard/>
                        <AddressCard/>
                        <button className={s.btn}>Добавить адрес</button>
                    </div>
                </div>
            </AccountLayout>
        </MainLayout>
    );
};

export default Addresses;