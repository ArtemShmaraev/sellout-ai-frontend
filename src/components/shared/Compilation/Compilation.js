import React from 'react';
import s from './Compilation.module.css'
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import ScrollableBlock from "@/components/shared/UI/ScrollableBlock/ScrollableBlock";

const Compilation = ({arr, title, paddings='none', rows=1, resetScrollToBeginning=false}) => {
    return (
        <div>
            <h3 className={`${s.title} ${paddings === 'regular' ? s.margins : ''}`}>{title}</h3>
            <ScrollableBlock paddings={paddings} rows={rows} resetScrollToBeginning={resetScrollToBeginning}>
                {
                    arr.map(el =>
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
                                     product={el}
                                     key={el.id}
                        />
                    )
                }
            </ScrollableBlock>
        </div>
    );
};

export default Compilation;