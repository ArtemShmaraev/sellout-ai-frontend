import React, {useContext, useEffect, useState} from 'react';
import s from './CartItem.module.css'
import Image from "next/image";
import SizeDropdown from "@/components/pages/cart/SizeDropdown/SizeDropdown";
import {fetchPrices} from "@/http/productsApi";
import ShipDropdown from "@/components/pages/cart/ShipDropdown/ShipDropdown";
import close from '@/static/icons/x-lg.svg'
import {Context} from "@/context/AppWrapper";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import {removeFromCart} from "@/http/cartApi";
import {addToWishlist, removeFromWishlist} from "@/http/wishlistAPI";
import like_fill from "@/static/icons/heart-fill.svg";
import like from "@/static/icons/heart.svg";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import {observer} from "mobx-react-lite";

const CartItem = ({model, colorway, brand, price, productId, unitId, sizeId, cardId, imgSrc, slug, inWL
                  }) => {
    const [prices, setPrices] = useState([])
    const {cartStore, userStore} = useContext(Context)
    const router = useRouter()
    useEffect(() => {
        const token = Cookies.get('access_token')
        fetchPrices(productId, token).then(res => {
            setPrices(res)
            console.log(res)
        })
        cartStore.ships[cardId] = unitId
    }, [Cookies.get('cart')])
    const deleteFromCart = async () => {
        const currCart = Cookies.get('cart').trim().split(' ').filter(el => el !== ' ' && el !== '').map(el => Number(el))
        const newCart = currCart.filter(el => el !== cartStore.ships[cardId])
        Cookies.set('cart', newCart.join(' '), {expires: 2772})
        if (userStore.isLogged) {
            const data = await removeFromCart(userStore.id, cartStore.ships[cardId], Cookies.get('access_token'))
        }
        cartStore.setCartCnt(newCart.length)
        router.push('/cart', undefined, {scroll: false})
    }
    const [isInWishlist, setIsInWishlist] = useState(inWL)
    const addToWL = async () => {
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const data = await addToWishlist(userId, productId, token)
        setIsInWishlist(true)
    }
    const deleteFromWL = async () => {
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const data = await removeFromWishlist(userId, productId, token)
        setIsInWishlist(false)
    }
    return (
        <div key={unitId}>
            <hr/>
            <div className={s.row}>
                <div className={s.col1}>
                    <div className={s.img}>
                        <Image src={imgSrc} fill={true} alt=''
                               style={{objectFit: 'contain', cursor: 'pointer'}}
                               onClick={() => router.push(`/products/${slug}`)}
                        />
                    </div>
                </div>
                <div className={s.inner_row}>
                    <div className={s.col}>
                        <div>
                            <div className={s.brand}>{brand}</div>
                            <div className={s.text}>{model}</div>
                            <div className={s.text}>{colorway}</div>
                        </div>
                    </div>
                    <div className={s.col_dropdown}>
                        <div className={s.dropdowns}>
                            <div className={s.brand}>Размер</div>
                            <SizeDropdown prices={prices} productId={productId} currentId={sizeId} cardId={cardId}/>
                            <div className={s.number_block}>
                                <div className={s.brand}>Доставка</div>
                                <ShipDropdown cardId={cardId} unitId={unitId}/>
                            </div>
                        </div>
                    </div>
                    <div className={`${s.col}`}>
                        <div className={s.dropdowns}>
                            <div className={s.brand}>Цена</div>
                            <div className={s.text}>{price} ₽</div>
                        </div>
                        <div className={s.ship_block}>
                            <div className={s.brand}>Количество</div>
                            <div className={s.text}>1</div>
                        </div>
                        {userStore.isLogged
                            ?
                            <div className={s.like_block}
                                 onClick={(e) => {
                                     e.stopPropagation()
                                     isInWishlist ? deleteFromWL() : addToWL()
                                 }}>
                                <Image src={isInWishlist ? like_fill : like} alt="like" className={s.like}
                                />
                                <div>{isInWishlist ? 'В избранном' : 'В избранное'}</div>
                            </div>
                            :
                            <div onClick={e => e.stopPropagation()}>
                                <AuthModal fromWishlist={true}>
                                    <div className={s.like_block}>
                                        <Image src={isInWishlist ? like_fill : like} alt="like" className={s.like}
                                        />
                                        <div>{isInWishlist ? 'В избранном' : 'В избранное'}</div>
                                    </div>
                                </AuthModal>
                            </div>
                        }
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

export default observer(CartItem);