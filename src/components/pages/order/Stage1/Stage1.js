import React, {useContext} from 'react';
import s from './Stage1.module.css'
import {Context} from "@/context/AppWrapper";
import {useRouter} from "next/router";

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
        </div>
    );
};

export default Stage1;