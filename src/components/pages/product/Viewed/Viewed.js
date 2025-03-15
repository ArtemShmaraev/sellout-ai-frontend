import React from 'react';
import s from './Viewed.module.css'
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import ScrollableBlock from "@/components/shared/UI/ScrollableBlock/ScrollableBlock";

const Viewed = () => {
    return (
        <div>
            <p className={s.title}>Ранее просмотренные</p>
            <ScrollableBlock>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </ScrollableBlock>
            <hr/>
        </div>
    );
};

export default Viewed;