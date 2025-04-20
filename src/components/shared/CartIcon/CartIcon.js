import React, {useContext} from 'react';
import {useRouter} from "next/router";
import cart from "@/static/icons/bag.svg";
import s from "./CartIcon.module.css"
import Image from "next/image";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";

const CartIcon = () => {
    const router = useRouter()
    const {cartStore} = useContext(Context)
    const goToCart = () => {
        router.push('/cart')
    }
    return (
        <div className={s.icons} onClick={goToCart}>
            <Image width={25} src={cart} alt=""/>
            {
                cartStore.cartCnt > 0 &&
                <div className={s.circle}>
                    {cartStore.cartCnt}
                </div>
            }
        </div>
    );
};

export default observer(CartIcon);