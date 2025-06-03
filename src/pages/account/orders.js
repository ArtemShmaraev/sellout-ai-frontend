import React from 'react';
import MainLayout from "@/layout/MainLayout";
import AccountLayout from "@/layout/AccountLayout";
import s from '@/styles/AccountOrders.module.css'
import OrderCard from "@/components/pages/account/OrderCard/OrderCard";
import Head from "next/head";
import {parse} from "cookie";
import jwtDecode from "jwt-decode";
import {fetchUserOrders} from "@/http/userApi";
import Link from "next/link";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const {user_id} = jwtDecode(token)
    const orders = await fetchUserOrders(user_id, token)
    return { props: {orders} }
}
const Orders = ({orders}) => {
    console.log(orders)
    return (
        <MainLayout>
            <Head>
                <title>Мои заказы</title>
            </Head>
            <AccountLayout>
                <div className={s.cont}>
                    <h4 className={s.title}>Ваши заказы</h4>
                    {
                        orders.length > 0
                        ?
                            <div className={s.cards_block}>
                                {
                                    orders.map(el =>
                                        <OrderCard order={el}/>
                                    )
                                }
                            </div>
                            :
                            <>
                                <h5 className={'text-center'}>У вас пока нет заказов</h5>
                                <div className={'d-flex justify-content-center mt-3'}>
                                    <Link href={'/products'} className={s.link}>За покупками</Link>
                                </div>
                            </>
                    }
                </div>
            </AccountLayout>
        </MainLayout>
    );
};

export default Orders;