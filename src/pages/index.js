import MainLayout from "@/layout/MainLayout";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import ScrollableBlock from "@/components/shared/UI/ScrollableBlock/ScrollableBlock";
import BuyoutModal from "@/components/shared/BuyoutModal/BuyoutModal";
import s from '@/styles/Home.module.css'
import React, {useEffect, useState} from "react";
import Head from "next/head";
import {fetchMainPage, fetchMore} from "@/http/mainPageApi";
import MainImgBlock from "@/components/shared/UI/MainImgBlock/MainImgBlock";
import {useRouter} from "next/router";
import Link from "next/link";

export const getServerSideProps = async (context) => {
    const userAgent = context.req.headers['user-agent'];
    const data = await fetchMainPage()
    return { props: {data} }
}
export default function Home({data}) {
    const [content, setContent] = useState(data)
    const router = useRouter()
    const [isDesktop, setIsDesktop] = useState(true)
    const checkIsDesktop = () => {
        const width = window.innerWidth
        if (width <= 1200) {
            setIsDesktop(false)
        } else {
            setIsDesktop(true)
        }
    }
    useEffect(() => {
        window.addEventListener("resize", checkIsDesktop);
        // Call handler right away so state gets updated with initial window size
        checkIsDesktop();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", checkIsDesktop);
    })
    const getMore = async () => {
        const newData = await fetchMore()
        const oldData = content
        const arr = [...oldData, ...newData]
        setContent(arr)
    }
    const renderPage = () => {
        const arr = []
        content.forEach(el => {
            if (el.type === 'photo') {
                arr.push(
                    <MainImgBlock obj={el.desktop} className={s.desktop}/>
                )
                arr.push(
                    <MainImgBlock obj={el.mobile} className={s.mobile}/>
                )
            } else {
                const scrollableBlockArr = []
                el.products.forEach(product => {
                    scrollableBlockArr.push(
                        <ProductCard model={product.model}
                                     id={product.id}
                                     slug={product.slug}
                                     brands={product.brands}
                                     collab={el.collab}
                                     colorway={product.colorway}
                                     price={product.min_price_product_unit}
                                     isFastShip={product.is_fast_shipping}
                                     isReturn={product.is_return}
                                     isSale={product.is_sale}
                                     inWishlist={product.in_wishlist}
                                     photosArr={product.bucket_link}
                                     key={product.id}
                                     smallCard={true}
                        />
                    )
                })
                arr.push(
                    <div className={s.collections}>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className={s.title_block}>
                                <h3 className={s.title}>{el.title}</h3>
                            </div>
                            <div>
                                <Link href={'/products?' + el.url} className={s.link}
                                >Посмотреть все</Link>
                            </div>
                        </div>
                        <ScrollableBlock>
                            {scrollableBlockArr}
                        </ScrollableBlock>
                    </div>
                )
            }
        })
        return arr
    }
    return (
        <MainLayout>
            <Head>
                <title>SELLOUT</title>
            </Head>
            <div className={s.cont + ' custom_cont'}>
                {renderPage()}
                <div className={'d-flex justify-content-center my-5'}>
                    <button onClick={getMore} className={s.more_btn}>Посмотреть ещё</button>
                </div>
                <hr className={s.hr}/>
                <BuyoutModal/>
            </div>
        </MainLayout>
    )
}
