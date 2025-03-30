import React from 'react';
import s from '@/styles/Cart.module.css'
import MainLayout from "@/layout/MainLayout";
import {Container} from "react-bootstrap";
import CartItem from "@/components/pages/cart/CartItem";
import {useRouter} from "next/router";

const Cart = () => {
    const router = useRouter()
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
                <CartItem/>
            </Container>
        </MainLayout>
    );
};

export default Cart;