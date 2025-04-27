import MainLayout from "@/layout/MainLayout";
import BigPicture from "@/components/shared/BigPicture/BigPicture";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import ScrollableBlock from "@/components/shared/UI/ScrollableBlock/ScrollableBlock";
import BuyoutModal from "@/components/shared/BuyoutModal/BuyoutModal";
import s from '@/styles/Home.module.css'
import React, {useEffect, useState} from "react";
import Head from "next/head";
import PictureBlock from "@/components/shared/UI/PictureBlock/PictureBlock";
import {fetchMainPage} from "@/http/mainPageApi";
import MainImgBlock from "@/components/shared/UI/MainImgBlock/MainImgBlock";
import {useRouter} from "next/router";

export const getServerSideProps = async (context) => {
    const content = await fetchMainPage()
    console.log(content)
    return { props: {content} }
}
export default function Home({content}) {
    const router = useRouter()
    const [isDesktop, setIsDesktop] = useState(null)
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
    const renderPage = () => {
        const arr = []
        content.forEach(el => {
            if (el.type === 'photo') {
                arr.push(
                    <MainImgBlock obj={isDesktop ? el.desktop : el.mobile}/>
                )
            } else {
                const scrollableBlockArr = []
                el.products.forEach(product => {
                    scrollableBlockArr.push(
                        <ProductCard model={product.model}
                                     id={product.id}
                                     slug={product.slug}
                                     brands={product.brands}
                                     colorway={product.colorway}
                                     price={product.min_price_product_unit}
                                     isFastShip={product.is_fast_shipping}
                                     isReturn={product.is_return}
                                     isSale={product.is_sale}
                                     inWishlist={product.in_wishlist}
                                     photosArr={product.bucket_link}
                                     key={product.id}
                        />
                    )
                })
                arr.push(
                    <div className={s.collections}>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className={s.title}>{el.title}</p>
                            <a href={'/products?' + el.url} className={s.link}
                               onClick={(e) => {
                                   e.preventDefault()
                                   router.push(`/products?${el.url}`)
                               }}
                            >Посмотреть все</a>
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
                <hr className={s.hr}/>
                <BuyoutModal/>
            </div>
        </MainLayout>
    )
}
