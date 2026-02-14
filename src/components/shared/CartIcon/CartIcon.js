import React, {useContext} from 'react';
import cart from "@/static/icons/bag.svg";
import s from "./CartIcon.module.css"
import Image from "next/image";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import Link from "next/link";

const CartIcon = () => {
    const {cartStore} = useContext(Context)
    return (
        <Link className={s.icons} href={'/cart'}>
            <Image width={24}  src={cart} alt=""/>
            {
                cartStore.cartCnt > 0 &&
                <div className={s.circle}>
                    {cartStore.cartCnt}
                </div>
            }
        </Link>
    );
};

export default observer(CartIcon);