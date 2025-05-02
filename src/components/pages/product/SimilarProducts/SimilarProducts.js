import React from 'react';
import s from "./SimilarProducts.module.css"
import ScrollableBlock from "@/components/shared/UI/ScrollableBlock/ScrollableBlock";
import ProductCard from "@/components/shared/ProductCard/ProductCard";

const SimilarProducts = ({products}) => {
    return (
        <div>
            <p className={s.title}>Похожие товары</p>
            <ScrollableBlock>
                {
                    products.map(el =>
                        <ProductCard model={el.model}
                                     id={el.id}
                                     slug={el.slug}
                                     brands={el.brands}
                                     collab={el.collab}
                                     colorway={el.colorway}
                                     price={el.min_price_product_unit}
                                     isFastShip={el.is_fast_shipping}
                                     isReturn={el.is_return}
                                     isSale={el.is_sale}
                                     inWishlist={el.in_wishlist}
                                     photosArr={el.bucket_link}
                                     key={el.id}
                        />
                    )
                }
            </ScrollableBlock>
            <hr/>
        </div>
    );
};

export default SimilarProducts;