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
                        <ProductCard model={el.model}
                                     id={el.id}
                                     slug={el.slug}
                                     brands={el.brands}
                                     collab={el.collab}
                                     colorway={el.colorway}
                                     price={el.price}
                                     isFastShip={el.is_fast_shipping}
                                     isReturn={el.is_return}
                                     isSale={el.is_sale}
                                     sale={el.sale_amount}
                                     inWishlist={el.in_wishlist}
                                     photosArr={el.bucket_link}
                                     key={el.id}
                                     cardList={true}
                        />
                    )
                    :
                    products.map(el =>
                        <AdminCard model={el.model}
                                   id={el.id}
                                   brands={el.brands}
                                   colorway={el.colorway}
                                   collab={el.collab}
                                   categories={el.categories}
                                   lines={el.lines}
                                   mainLine={el.main_line.view_name}
                                   price={el.min_price_product_unit}
                                   key={el.id}
                                   cardList={true}
                        />
                    )
                }
                {products.length === 0 &&
                    <div className={s.nothing}>
                        <div className='text-center'>
                            Товары по вашему запросу не найдены
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default observer(ProductList);