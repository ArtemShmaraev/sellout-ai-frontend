import {parse} from "cookie";
import MainLayout from "@/layout/MainLayout";
import jwtDecode from "jwt-decode";
import {fetchWishlist} from "@/http/wishlistAPI";
import s from '@/styles/Wishlist.module.css'
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import React, {useContext} from "react";
import {Context} from "@/context/AppWrapper";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import {useRouter} from "next/router";
import {observer} from "mobx-react-lite";
import Recommendations from "@/components/shared/Recommendations/Recommendations";
import Head from "next/head";
import Link from "next/link";
import {desktopStore} from "@/store/DesktopStore";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    let wishlist
    try {
        const {user_id} = jwtDecode(token)
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
            <Head>
                <title>Избранное</title>
            </Head>
            <div className={'custom_cont'} style={{marginTop: desktopStore.isDesktop ? '130px' : '20px', marginBottom: '50px'}}>
                <h3>Избранное</h3>
                {
                    wishlist.length > 0 &&
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
                                        <Link href={'/products'} className={s.button}
                                        >За покупками</Link>
                                    </div>
                                }
                                {wishlist.map(el =>
                                    <ProductCard
                                                 product={el}
                                                 cardList={true}
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

            </div>
        </MainLayout>
    );
};

export default observer(Wishlist);