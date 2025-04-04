import React, {useEffect, useState} from 'react';
import s from './CartItem.module.css'
import Image from "next/image";
import shoe from '@/static/img/shoe2.png'
import SizeDropdown from "@/components/pages/cart/SizeDropdown/SizeDropdown";
import {fetchPrices} from "@/http/productsApi";
import ShipDropdown from "@/components/pages/cart/ShipDropdown/ShipDropdown";

const CartItem = ({model, colorway, brand, price, productId, unitId, sizeId, cardId,
                  }) => {
    const [prices, setPrices] = useState([])
    useEffect(() => {
        fetchPrices(productId).then(res => {
            setPrices(res)
        })
    }, [])
    return (
        <div>
            <hr/>
            <div className={s.row}>
                <div className={s.col1}>
                    <Image src={shoe} alt=''/>
                </div>
                <div className={s.col}>
                    <div>
                        <div className={s.brand}>{brand}</div>
                        <div>{model}</div>
                        <div>{colorway}</div>
                    </div>
                </div>
                <div className={s.col}>
                    <div>
                        <div className={s.brand}>Цена</div>
                        <div>{price} ₽</div>
                    </div>
                    <div className={s.ship_block}>
                        <div className={s.brand}>Доставка</div>
                        <ShipDropdown cardId={cardId} unitId={unitId}/>
                    </div>
                </div>
                <div className={s.col}>
                    <div>
                        <div className={s.brand}>Размер</div>
                        <SizeDropdown prices={prices} productId={productId} currentId={sizeId} cardId={cardId}/>
                        <div className={s.number_block}>
                            <div className={s.brand}>Количество</div>
                            <div>1</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;