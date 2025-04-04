import React, {useContext, useEffect, useState} from 'react';
import s from './CartItem.module.css'
import Image from "next/image";
import shoe from '@/static/img/shoe2.png'
import SizeDropdown from "@/components/pages/cart/SizeDropdown/SizeDropdown";
import {fetchPrices} from "@/http/productsApi";
import ShipDropdown from "@/components/pages/cart/ShipDropdown/ShipDropdown";
import close from '@/static/icons/x-lg.svg'
import {Context} from "@/context/AppWrapper";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import {userStore} from "@/store/UserStore";
import {removeFromCart} from "@/http/cartApi";

const CartItem = ({model, colorway, brand, price, productId, unitId, sizeId, cardId,
                  }) => {
    const [prices, setPrices] = useState([])
    const {cartStore} = useContext(Context)
    const router = useRouter()
    useEffect(() => {
        fetchPrices(productId).then(res => {
            setPrices(res)
        })
        cartStore.ships[cardId] = unitId
    }, [])
    const deleteFromCart = async () => {
        const currCart = Cookies.get('cart').trim().split(' ').map(el => Number(el))
        const newCart = currCart.filter(el => el !== cartStore.ships[cardId])
        Cookies.set('cart', newCart.join(' '))
        router.push('/cart', undefined, {scroll: false})
        if (userStore.isLogged) {
            const data = await removeFromCart(userStore.id, cartStore.ships[cardId], Cookies.get('access_token'))
        }
    }
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
                <div>
                    <Image src={close} alt='' className={s.icon}
                           onClick={deleteFromCart}
                    />
                </div>
            </div>
        </div>
    );
};

export default CartItem;