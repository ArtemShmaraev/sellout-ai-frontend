import React, {useEffect} from 'react';
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import AdminCard from "@/components/shared/AdminCard/AdminCard";
import s from './ProductList.module.css'
import {observer} from "mobx-react-lite";

const ProductList = ({products, isAdmin}) => {
    return (
        <div className={s.container}>
            <div className={s.product_list}>
                {!isAdmin
                ?
                    products.map(el =>
                        <ProductCard
                                     product={el}
                                     key={el.id}
                                     cardList={true}
                        />
                    )
                    :
                    products.map(el =>
                        <AdminCard
                                   categories={['el.categories']}
                                   lines={el.lines}
                                   mainLine={'el.main_line.view_name'}
                                   product={el}
                                   key={el.id}
                                   cardList={true}
                        />
                    )
                }
                {products.length === 0 &&
                    <div className={s.nothing}>
                        <div className='text-center'>
                            Товары по Вашему запросу не найдены
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default observer(ProductList);