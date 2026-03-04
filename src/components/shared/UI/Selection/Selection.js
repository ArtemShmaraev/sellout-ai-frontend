import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import s from './Selection.module.css'
import ScrollableBlock from "@/components/shared/UI/ScrollableBlock/ScrollableBlock";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import Link from "next/link";
import {desktopStore} from "@/store/DesktopStore";
import Cookies from "js-cookie";
import {useRouter} from "next/router";

const Selection = ({el}) => {
    const blockId = el.blockId;

    const router = useRouter()

    useEffect(() => {
        const saveScrollPositions = () => {

            if (scrollableBlockRef.current) {
                const scrollLeft = scrollableBlockRef.current.getScroll();
                Cookies.set(`multiSectionedBlock-${blockId}-ProductsBlockPosition`, scrollLeft, {expires: 0.25});
            }

        };

        const restoreScrollPosition = () => {
            const ProductsBlockPosition = Cookies.get(`multiSectionedBlock-${blockId}-ProductsBlockPosition`);

            if (ProductsBlockPosition && scrollableBlockRef.current) {
                scrollableBlockRef.current.setScroll(parseInt(ProductsBlockPosition, 10));
            }
        };

        restoreScrollPosition();

        // Сохраняем позицию перед уходом со страницы
        router.events.on("routeChangeStart", saveScrollPositions);

        // Убираем обработчик при размонтировании компонента
        return () => {
            router.events.off("routeChangeStart", saveScrollPositions);
        };
    }, [router]);

    const selectionRows = el.selectionRowsMobile && !desktopStore.isDesktop ? el.selectionRowsMobile : 1;

    const scrollableBlockRef = useRef(null);

    const scrollableBlockArr = []
    el.products.forEach(product => {
        scrollableBlockArr.push(
            <ProductCard
                product={product}
                key={product.id}
                smallCard={true}
            />
        )
    })

    return (
        <div className={`${s.collections} ${!el.moreButton ? s.limitedMargin : ''}`}>
            {el.titleBlock && (
                <div className={'d-flex justify-content-between align-items-center ' + s.margins}
                     style={{marginBottom: '30px'}}>
                    <div className={s.title_block}>
                        <h3 className={s.title}>{el.title}</h3>
                    </div>
                    <div>
                        <Link href={'/products?' + el.url} className={s.link}
                        >{el.productsAmount ? <span>Все {el.productsAmount} моделей</span> :
                            <span>Посмотреть все</span>}</Link>
                    </div>
                </div>
            )}
            {el.titleCentered && (
                <div className={`${s.title} + ${s.titleCentered}`}>
                    {el.title}
                </div>
            )}
            <ScrollableBlock paddings={'regular'} rows={selectionRows} moreButton={el.moreButton}
                             moreButtonUrl={`${el.url}`} ref={scrollableBlockRef}>
                {scrollableBlockArr}
            </ScrollableBlock>
            {el.moreButton && (
                <div className={s.customButton}>
                    <Link href={`${el.url}`}
                          className={`${s.linkMore} + ${s.paddings}`}>
                        {
                            el.moreButtonName?.startsWith("ЦЕЛИКОМ")
                                ? el.moreButtonName.replace(/^ЦЕЛИКОМ\s*/, '').trim() :
                                el.productsAmount && el.moreButtonName
                                    ? `Все ${el.productsAmount} ${!el.moreButtonNameNoModel ? 'моделей' : ''} ${el.moreButtonName}`
                                    : el.productsAmount
                                        ? `Все ${el.productsAmount} моделей`
                                        : el.moreButtonName
                                            ? `Посмотреть все ${el.moreButtonName}`
                                            : 'Посмотреть все'
                        }
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Selection;
