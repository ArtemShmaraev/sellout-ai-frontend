import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
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
import {
    trackAddToFavorites,
    trackRemoveToCart,
    trackRemoveToFavorites
} from "@/components/shared/YandexMetrica/YandexMetrica";
import green_gift from "@/static/icons/gift-green.svg";

const CartItem = ({model, colorway, brand, price, productId, unitId, sizeId, cardId, imgSrc, slug, inWL, product,
                  available, bonus}) => {
    const [prices, setPrices] = useState([])
    const {cartStore, userStore} = useContext(Context)
    const router = useRouter()
    useEffect(() => {
        const token = Cookies.get('access_token')
        fetchPrices(productId, token).then(res => {
            setPrices(res)
        })
        cartStore.ships[cardId] = unitId
    // }, [])
    }, [Cookies.get('cart'), price])



    const getProductDetail = (product) => {
        const productDetails = {
            id: product.id.toString(),
            name: `${brand} ${product.model} ${product.colorway}`,
            price: product.min_price,
            brand: brand
        };
        return productDetails;
    };

    const [isDeleted, setIsDeleted] = useState(false)



    const deleteFromCart = async () => {
        setIsDeleted(true);

        // Сохраняем текущее положение скролла
        // const scrollY = window.scrollY;

        const currCart = Cookies.get('cart').trim().split(' ').filter(el => el !== ' ' && el !== '').map(el => Number(el));
        const newCart = currCart.filter(el => el !== cartStore.ships[cardId]);
        Cookies.set('cart', newCart.join(' '), { expires: 2772 });
        if (userStore.isLogged) {
            const data = await removeFromCart(userStore.id, cartStore.ships[cardId], Cookies.get('access_token'));
        }
        cartStore.setCartCnt(newCart.length);
        const productDetails = getProductDetail(product);
        trackRemoveToCart(productDetails);

        // Устанавливаем положение скролла обратно после удаления
        // window.scrollTo(0, scrollY);

        router.push('/cart', undefined, { scroll: false });
    }
    const [isInWishlist, setIsInWishlist] = useState(inWL)



    const addToWL = async () => {
        setIsInWishlist(true)
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const data = await addToWishlist(userId, productId, token)
        const productDetails = getProductDetail(product);
        trackAddToFavorites(productDetails)

    }
    const deleteFromWL = async () => {
        setIsInWishlist(false)
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const data = await removeFromWishlist(userId, productId, token)
        const productDetails = getProductDetail(product);
        trackRemoveToFavorites(productDetails)

    }
    // if (!product.available_flag || !available) {
    //     console.group(brand, model)
    //     console.log([available, product.available_flag])
    //     console.groupEnd()
    // }
    const addSpacesToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');


    return (
        <div key={unitId} className={isDeleted ? `${s.row} ${s.slideOut}` : ""} >

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
                            <div className={s.tag}>{brand}</div>
                            <div className={s.model}>{model}</div>
                            <div className={s.colorway}>{colorway}</div>
                        </div>
                    </div>

                    <div className={s.col_dropdown}>
                        <div className={s.dropdowns}>
                            <div className={s.brand}>Размер</div>
                            {
                                product.available_flag &&
                                <SizeDropdown prices={prices} productId={productId} currentId={sizeId}
                                              cardId={cardId} manySizes={product.has_many_sizes}/>
                            }
                            <div className={s.number_block}>
                                <div className={s.brand}>Доставка</div>
                                {
                                    product.available_flag &&
                                    <ShipDropdown cardId={cardId} unitId={unitId}/>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={`${s.col}`}>
                        <div className={s.dropdowns}>
                            <div className={s.brand}>Цена</div>
                            <div className={s.text}>{addSpacesToNumber(price)} ₽</div>
                        </div>
                        <div className={s.ship_block}>
                            <div className={s.brand}></div>
                            <div className={s.text}></div>
                        </div>
                        {
                            Number(bonus) > 0 &&
                            <>
                                <div className={s.brand}>Начислено бонусов:</div>
                                <p className={'mt-2 mb-0'}>

                                    <Image src={green_gift} alt='' className={s.bonus_icon}/> <span
                                    className={s.bonuses}> {bonus}₽</span>
                                </p>
                                {/*<div className={s.text}>{addSpacesToNumber(bonus)} ₽</div>*/}
                            </>
                        }
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
            {
                !available && (
                    product.available_flag
                        ?
                        <p className={'text-center red_text'}>К сожалению, данное предложение распродано, выберите другое</p>
                        :
                        <p className={'text-center red_text'}>К сожалению, данный товар распродан, удалите его из корзины
                            <br/>
                            Вы можете добавить товар в избранное, и мы уведомим вас, как только он появится в наличии!
                        </p>
                )
            }
        </div>
    );
};

export default observer(CartItem);