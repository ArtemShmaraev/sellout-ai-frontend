import React from 'react';
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import AdminCard from "@/components/shared/AdminCard/AdminCard";
import s from './ProductList.module.css'
import {observer} from "mobx-react-lite";

const ProductList = ({products}) => {
    return (
        <div className={s.product_list}>
            {/*<AdminCard/>*/}
            {/*<ProductCard/>*/}
            {/*<ProductCard/>*/}
            {/*<ProductCard/>*/}
            {/*<ProductCard/>*/}
            {/*<ProductCard/>*/}
            {/*<ProductCard/>*/}
            {/*<ProductCard/>*/}
            {products.map(el =>
                <ProductCard model={el.model}
                             brands={el.brands}
                             key={el.id}/>
            )}

        </div>
    );
};

export default observer(ProductList);