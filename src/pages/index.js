import MainLayout from "@/layout/MainLayout";
import BigPicture from "@/components/shared/BigPicture/BigPicture";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import ScrollableBlock from "@/components/shared/UI/ScrollableBlock/ScrollableBlock";
import BuyoutModal from "@/components/shared/BuyoutModal/BuyoutModal";
import s from '@/styles/Home.module.css'
import React from "react";

export default function Home() {
  return (
    <MainLayout>
        <div className={s.cont + ' custom_cont'}>
            <BigPicture/>
            <BigPicture reversed={true}/>
            <div className={s.big_pict_block}>
                <BigPicture vertical={true}/>
                <BigPicture vertical={true}/>
            </div>
            <div className={s.collections}>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className={s.title}>Кроссовки</p>
                    <a href="" className={s.link}>Посмотреть все</a>
                </div>
                <ScrollableBlock>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                </ScrollableBlock>
            </div>
            <div className={s.collections}>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className={s.title}>Хуевки</p>
                    <a href="" className={s.link}>Посмотреть все</a>
                </div>
                <ScrollableBlock>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                    <ProductCard smallCard={true}/>
                </ScrollableBlock>
            </div>
            <hr className={s.hr}/>
            <BuyoutModal/>
        </div>
    </MainLayout>
  )
}
