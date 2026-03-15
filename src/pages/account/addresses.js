import React from 'react';
import AccountLayout from "@/layout/AccountLayout";
import MainLayout from "@/layout/MainLayout";
import s from '@/styles/Addresses.module.css'
import AddressCard from "@/components/pages/account/AddressCard/AddressCard";
import AddressModal from "@/components/pages/account/AddressModal/AddressModal";
import {parse} from "cookie";
import jwtDecode from "jwt-decode";
import {fetchAddresses} from "@/http/userApi";
import Head from "next/head";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const {user_id} = jwtDecode(token)
    const addresses = await fetchAddresses(context.req.headers.cookie, user_id)
    return { props: {addresses} }
}
const Addresses = ({addresses}) => {
    return (
        <MainLayout>
            <Head>
                <title>Мои адреса</title>
            </Head>
            <AccountLayout>
                <div className={s.cont}>
                    <h4 className={s.title}>Адреса</h4>
                    <div className={s.main_block}>
                        {
                            addresses.length > 0
                            ?
                                addresses.map(el =>
                                    <AddressCard name={el.name} address={el.address} id={el.id} is_main={el.is_main} key={el.id}/>
                                )
                                :
                                <h5>У вас пока нет сохраненных адресов</h5>
                        }
                        <AddressModal newAddress={true}/>
                    </div>
                </div>
            </AccountLayout>
        </MainLayout>
    );
};

export default Addresses;