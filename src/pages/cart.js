import React, {useContext} from 'react';
import s from '@/styles/Cart.module.css'
import MainLayout from "@/layout/MainLayout";
import {Container} from "react-bootstrap";
import CartItem from "@/components/pages/cart/CartItem/CartItem";
import {useRouter} from "next/router";
import {parse} from "cookie";
import {fetchProductUnits} from "@/http/cartApi";
import {Context} from "@/context/AppWrapper";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import PromoInput from "@/components/pages/cart/PromoInput/PromoInput";


export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    let productUnits
    if (cookies['cart']) {
        const cartArr = cookies['cart'].trim().split(' ').map(el => Number(el))
        const obj = {
            product_unit_list: cartArr
        }
        productUnits = await fetchProductUnits(JSON.stringify(obj), token)
    } else {
        productUnits = []
    }
    return { props: {productUnits} }
}
const Cart = ({productUnits}) => {
    const router = useRouter()
    const {userStore} = useContext(Context)
    const goToProductsPage = () => {
        router.push('/products')
    }
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
                        {!productUnits.length && 'Твоя корзина пуста.'}
                        {!userStore.isLogged &&
                            <div className={s.login_block}>
                                <AuthModal>
                                    <div className={s.text_underline}>Войдите или зарегистрируйтесь,&nbsp;</div>
                                </AuthModal>
                                чтобы Ваша корзина сохранялась, а также получать специальные предложения и бонусы.
                            </div>
                        }
                    </div>
                    {!productUnits.length &&
                        <button
                            onClick={goToProductsPage}
                            className={s.shop_button}
                        >За покупками</button>
                    }
                </div>
                {
                    productUnits.length > -1 &&
                    <div className={s.main_block}>
                        <div className={s.items_block}>
                            {
                                productUnits.map((el, ind) =>
                                    <CartItem model={el.product.model}
                                              colorway={el.product.colorway}
                                              brand={el.product.is_collab ? el.product.collab : el.product.brands[0].name}
                                              price={el.final_price}
                                              productId={el.product.id}
                                              unitId={el.id}
                                              sizeId={el.size.id}
                                              cardId={ind}
                                    />
                                )
                            }
                        </div>
                        <div className={s.promos_block}>
                            <h4>Ваш заказ:</h4>
                            <p>Промежуточная стоимость: 100 ₽</p>
                            <PromoInput placeholder={'Введите промокод'}/>
                            <PromoInput placeholder={'Списать бонусы'}/>
                            <p>Суммарная скидка: 100 ₽</p>
                            <hr/>
                            <p className={s.big_text}>Промежуточный итог: 228 ₽</p>
                            <button className={s.order_btn}>Перейти к оформлению заказа</button>
                        </div>
                    </div>
                }
            </Container>
        </MainLayout>
    );
};

export default Cart;