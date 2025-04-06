import React, {useContext} from 'react';
import s from './Stage1.module.css'
import {Context} from "@/context/AppWrapper";
import {useRouter} from "next/router";
import OrderAddress from "@/components/pages/order/OrderAddress/OrderAddress";
import AddressModal from "@/components/pages/account/AddressModal/AddressModal";

const Stage1 = () => {
    const router = useRouter()
    const {orderStore} = useContext(Context)

    const goToCart = (e) => {
        e.preventDefault()
        router.push('/cart')
    }
    return (
        <div>
            <div className={s.stage_block}>
                <div className={s.stage}>1. Адрес доставки</div>
                <a onClick={e => goToCart(e)}
                   className={s.link}
                >Вернуться в корзину</a>
            </div>
            <hr/>
            <div>
                <OrderAddress isPickup={true} checked={true}/>
            </div>
            <div className={s.add_address_block}>
                <AddressModal newAddress={true} whiteBnt={true}/>
            </div>
        </div>
    );
};

export default Stage1;