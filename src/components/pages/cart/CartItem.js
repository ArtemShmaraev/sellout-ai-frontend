import React from 'react';
import s from './CartItem.module.css'
import Image from "next/image";
import shoe from '@/static/img/shoe2.png'

const CartItem = () => {
    return (
        <div>
            <hr/>
            <div className={s.row}>
                <div className={s.col1}>
                    <Image src={shoe} alt=''/>
                </div>
                <div className={s.col}>
                    <div>
                        <div className={s.brand}>Бренд</div>
                        <div>Модель</div>
                        <div>Расцветка</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;