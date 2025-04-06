import React, {useContext} from 'react';
import s from './Stage2.module.css'
import {Context} from "@/context/AppWrapper";
import {useRouter} from "next/router";

const Stage2 = () => {
    const router = useRouter()
    const {orderStore} = useContext(Context)
    const previous = () => {
        orderStore.previousStage()
    }
    const goToCart = (e) => {
        e.preventDefault()
        router.push('/cart')
    }
    return (
        <div>
            <div className={s.stage_block}>
                <div className={s.stage}>2. Способ доставки</div>
                <div>
                    <a onClick={previous}
                       className={s.link}
                    >Вернуться назад</a>
                    <a onClick={e => goToCart(e)}
                       className={s.link}
                    >Вернуться в корзину</a>
                </div>
            </div>
            <hr/>
        </div>
    );
};

export default Stage2;