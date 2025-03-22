import React from 'react';
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import AdminCard from "@/components/shared/AdminCard/AdminCard";
import s from './ProductList.module.css'
import {observer} from "mobx-react-lite";

const ProductList = ({products}) => {
    return (
        <div className={s.container}>
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
                                 colorway={el.colorway}
                                 price={el.min_price_product_unit}
                                 key={el.id}/>
                )}
            </div>
            {products.length === 0 &&
                <div className={s.nothing}>
                    <div className='text-center'>
                        Hui vam a ne tovari
                    </div>
                </div>
            }
        </div>
    );
};

export default observer(ProductList);