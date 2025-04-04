import React from 'react';
import s from '@/styles/Cart.module.css'
import MainLayout from "@/layout/MainLayout";
import {Container} from "react-bootstrap";
import CartItem from "@/components/pages/cart/CartItem/CartItem";
import {useRouter} from "next/router";
import {parse} from "cookie";
import jwtDecode from "jwt-decode";
import {fetchProductUnits} from "@/http/cartApi";


export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const cartArr = cookies['cart'].trim().split(' ').map(el => Number(el))
    const obj = {
        product_unit_list: cartArr
    }
    const productUnits = await fetchProductUnits(JSON.stringify(obj))
    return { props: {productUnits} }
}
const Cart = ({productUnits}) => {
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
            </Container>
        </MainLayout>
    );
};

export default Cart;