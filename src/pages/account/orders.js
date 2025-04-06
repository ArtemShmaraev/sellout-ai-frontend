import React from 'react';
import MainLayout from "@/layout/MainLayout";
import AccountLayout from "@/layout/AccountLayout";
import s from '@/styles/AccountOrders.module.css'
import OrderCard from "@/components/pages/account/OrderCard/OrderCard";

const Orders = () => {
    return (
        <MainLayout>
            <AccountLayout>
                <div className={s.cont}>
                    <OrderCard/>
                </div>
            </AccountLayout>
        </MainLayout>
    );
};

export default Orders;