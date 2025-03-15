import React from 'react';
import s from './Recommendations.module.css'
import ProductCard from "../ProductCard/ProductCard";
import ScrollableBlock from "../UI/ScrollableBlock/ScrollableBlock";

const Recommendations = () => {
    return (
        <>
            <hr/>
            <p className={s.title}>Рекомендации</p>
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
                <ProductCard/>
                <ProductCard/>
            </ScrollableBlock>
            <hr/>
        </>
    );
};

export default Recommendations;