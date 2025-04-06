import React from 'react';
import AccountLayout from "@/layout/AccountLayout";
import MainLayout from "@/layout/MainLayout";
import s from '@/styles/Addresses.module.css'
import AddressCard from "@/components/pages/account/AddressCard/AddressCard";
import AddressModal from "@/components/pages/account/AddressModal/AddressModal";
const Addresses = () => {
    return (
        <MainLayout>
            <AccountLayout>
                <div className={s.cont}>
                    <h4 className={s.title}>Адреса</h4>
                    <div className={s.main_block}>
                        <AddressCard/>
                        <AddressCard/>
                        <AddressModal newAddress={true}/>
                    </div>
                </div>
            </AccountLayout>
        </MainLayout>
    );
};

export default Addresses;