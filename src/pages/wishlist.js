import {parse} from "cookie";
import MainLayout from "@/layout/MainLayout";
import {Container} from "react-bootstrap";
import jwtDecode from "jwt-decode";
import {fetchWishlist} from "@/http/wishlistAPI";
import s from '@/styles/Wishlist.module.css'
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import React, {useContext} from "react";
import {Context} from "@/context/AppWrapper";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import {useRouter} from "next/router";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const {user_id} = jwtDecode(token)
    let wishlist
    try {
        wishlist = await fetchWishlist(user_id , context.req.headers.cookie)
    } catch (e) {
        wishlist = []
    }
    return { props: {wishlist} }
}

const Wishlist = ({wishlist}) => {
    const {userStore} = useContext(Context)
    const router = useRouter()
    const goToProductPage = () => {
        router.push('/products')
    }
    function formOfWord(num) {
        let form = "товаров";
        if (num % 10 === 1 && num % 100 !== 11) {
            form = "товар";
        } else if (
            num % 10 >= 2 &&
            num % 10 <= 4 &&
            (num % 100 < 10 || num % 100 >= 20)
        ) {
            form = "товара";
        }
        return `${num} ${form}`;
    }

    return (
        <MainLayout>
            <Container style={{marginTop: '130px'}}>
                <h3>Избранное</h3>
                {
                    wishlist.length &&
                    <p>{formOfWord(wishlist.length)}</p>
                }
                <div className={s.wishlist_cont}>
                    {
                        userStore.isLogged
                        ?
                            <>
                                {
                                    !wishlist.length &&
                                    <div>
                                        <p className={s.empty_text}>Ваш список избранного пуст</p>
                                        <button className={s.button}
                                                onClick={goToProductPage}
                                        >За покупками</button>
                                    </div>
                                }
                                {wishlist.map(el =>
                                    <ProductCard model={el.model}
                                                 id={el.id}
                                                 slug={el.slug}
                                                 brands={el.brands}
                                                 colorway={el.colorway}
                                                 price={el.min_price_product_unit}
                                                 isFastShip={el.is_fast_shipping}
                                                 isReturn={el.is_return}
                                                 isSale={el.is_sale}
                                                 inWishlist={el.in_wishlist}
                                                 key={el.id}/>
                                )}
                            </>
                            :
                            <div>
                                <p className={s.empty_text}>Войдите или зарегистрируйтесь, чтобы посмотреть список избранного </p>
                                <AuthModal>
                                    <div className={s.button}>Войти / Зарегистрироваться</div>
                                </AuthModal>
                            </div>
                    }
                </div>
            </Container>
        </MainLayout>
    );
};

export default Wishlist;