import React, {useContext} from 'react';
import s from '@/styles/Cart.module.css'
import MainLayout from "@/layout/MainLayout";
import {Container} from "react-bootstrap";
import CartItem from "@/components/pages/cart/CartItem/CartItem";
import {useRouter} from "next/router";
import {parse} from "cookie";
import {fetchCart, fetchCartPrice, fetchProductUnits} from "@/http/cartApi";
import {Context} from "@/context/AppWrapper";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import PromoInput from "@/components/pages/cart/PromoInput/PromoInput";
import jwtDecode from "jwt-decode";


export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    let productUnits
    const cartArr = cookies['cart'].trim().split(' ').map(el => Number(el))
    if (cookies['cart']) {
        const obj = {
            product_unit_list: cartArr
        }
        productUnits = await fetchProductUnits(JSON.stringify(obj), token)
    } else {
        productUnits = []
    }
    let defaultPrice
    let finalPrice
    if (token) {
        const {user_id} = jwtDecode(token)
        const cart = await fetchCart(user_id, context.req.headers.cookie)
        defaultPrice = cart.total_amount
        finalPrice = cart.final_amount
        productUnits = cart
    } else {
        const res = await fetchCartPrice(cartArr)
        defaultPrice = res.total_amount
        finalPrice = defaultPrice
    }
    return { props: {productUnits, defaultPrice, finalPrice} }
}
const Cart = ({productUnits, defaultPrice, finalPrice}) => {
    const router = useRouter()
    const {userStore} = useContext(Context)
    const goToProductsPage = () => {
        router.push('/products')
    }
    console.log(productUnits)
    return (
        <MainLayout>
            <Container className={s.cont}>
                <div className={s.title_block}>
                    <h3>Корзина</h3>
                    <a onClick={goToProductsPage}
                       className={s.link}
                    >Продолжить покупки</a>
                </div>
                <div>
                    <div>

                        {!(userStore.isLogged ? productUnits.product_units.length : productUnits.length) && 'Твоя корзина пуста.'}
                        {!userStore.isLogged &&
                            <div className={s.login_block}>
                                <AuthModal>
                                    <div className={s.text_underline}>Войдите или зарегистрируйтесь,&nbsp;</div>
                                </AuthModal>
                                чтобы Ваша корзина сохранялась, а также получать специальные предложения и бонусы.
                            </div>
                        }
                    </div>
                    {!(userStore.isLogged ? productUnits.product_units.length : productUnits.length) &&
                        <button
                            onClick={goToProductsPage}
                            className={s.shop_button}
                        >За покупками</button>
                    }
                </div>
                {
                    (userStore.isLogged ? productUnits.product_units.length : productUnits.length) > -1 &&
                    <div className={s.main_block}>
                        <div className={s.items_block}>
                            { userStore.isLogged
                                ?
                                productUnits.product_units.map((el, ind) =>
                                    <CartItem model={el.product.model}
                                              colorway={el.product.colorway}
                                              brand={el.product.is_collab ? el.product.collab.name : el.product.brands[0].name}
                                              price={el.final_price}
                                              productId={el.product.id}
                                              unitId={el.id}
                                              sizeId={el.good_size_platform}
                                              cardId={ind}
                                              imgSrc={el.product.bucket_link[0].url}
                                              slug={el.product.slug}
                                    />
                                )
                                :
                                productUnits.map((el, ind) =>
                                    <CartItem model={el.product.model}
                                              colorway={el.product.colorway}
                                              brand={el.product.is_collab ? el.product.collab.name : el.product.brands[0].name}
                                              price={el.final_price}
                                              productId={el.product.id}
                                              unitId={el.id}
                                              sizeId={el.good_size_platform}
                                              cardId={ind}
                                              imgSrc={el.product.bucket_link[0].url}
                                              slug={el.product.slug}
                                    />
                                )
                            }
                        </div>
                        <div className={s.promos_block}>
                            <h4>Ваш заказ:</h4>
                            <p>Cтоимость: {defaultPrice} ₽</p>
                            <PromoInput placeholder={'Введите промокод'}/>
                            <PromoInput placeholder={'Списать бонусы'}/>
                            <p>Суммарная скидка: 100 ₽</p>
                            <hr/>
                            <p className={s.big_text}>Промежуточный итог: {finalPrice} ₽</p>
                            <button className={s.order_btn}>Перейти к оформлению заказа</button>
                        </div>
                    </div>
                }
            </Container>
        </MainLayout>
    );
};

export default Cart;