import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import Image from "next/image";
import s from './MultiSectionRecs.module.css'
import ScrollableBlock from "@/components/shared/UI/ScrollableBlock/ScrollableBlock";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import Link from "next/link";
import styles from "@/styles/CatalogAccessoriesDesktopMen.module.css";
import {desktopStore} from "@/store/DesktopStore";

const MultiSectionRecs = ({el}) => {
    const [centerContent, setCenterContent] = useState(false);

    useEffect(() => {
        // Функция для проверки ширины экрана
        const checkWidth = () => {
            const colWidth = 112;
            const gridWidth = el.cols * colWidth + (el.cols - 1) * 10 + 0.06 * window.innerWidth;
            setCenterContent(window.innerWidth > gridWidth);
        };

        checkWidth(); // Проверяем при загрузке
        window.addEventListener('resize', checkWidth); // Проверяем при изменении размера окна

        return () => {
            window.removeEventListener('resize', checkWidth);
        };
    }, [el.cols]);

    // Состояние для хранения индекса выбранного кружка, изначально 0 (первый кружок)
    const [selectedCircleIndex, setSelectedCircleIndex] = useState(0);

    // Генерация массива товаров для текущего выбранного кружка
    const getScrollableBlockArr = () => {
        const scrollableBlockArr = [];
        const selectedProducts = el.products[selectedCircleIndex] || []; // Получаем список продуктов для выбранной линейки
        selectedProducts.forEach(product => {
            scrollableBlockArr.push(
                <ProductCard
                    product={product}
                    key={product.id}
                    smallCard={true}
                />
            );
        });
        return scrollableBlockArr;
    };

    const selectionRows = el.selectionRowsMobile && !desktopStore.isDesktop ? el.selectionRowsMobile : 1;

    const scrollableBlockRef = useRef(null);

    useEffect(() => {
        // Прокручиваем блок товаров в начало при смене выбранного кружка
        if (scrollableBlockRef.current) {
            scrollableBlockRef.current.resetScroll();
        }

    }, [selectedCircleIndex]);

    return (
        <div style={{marginBottom: desktopStore.isDesktop ? '100px' : '50px'}}>
            <div className={s.multiSectionCirclesTitle}>{el.title}</div>
            <div className={`${s.categoriesGrid} ${s.paddings} ${centerContent ? s.centerContent : ''}`}>
                {el.recsNames.map((category, idx) => (
                    <div key={idx} className={`${s.categoryItem} ${selectedCircleIndex === idx ? s.selectedItem : ''}`}
                         onClick={() => setSelectedCircleIndex(idx)}>
                        <Image
                            src={el.desktopImages[idx]}
                            alt={category}
                            width={700}
                            height={700}
                            className={s.categoryImage}
                        />
                        <div className={s.categoryText}>
                            {category}
                        </div>
                    </div>
                ))}
            </div>
            <ScrollableBlock paddings={'regular'} rows={selectionRows} moreButton={true}
                             moreButtonUrl={`${el.recsLinks[selectedCircleIndex]}`}
                             ref={scrollableBlockRef}>
                {getScrollableBlockArr()}
            </ScrollableBlock>
            {el.moreButton && (

                <div className={s.customButton}>
                    <Link href={`${el.recsLinks[selectedCircleIndex]}`} className={`${s.linkMore}`}>
                        {
                            el.moreButtonName[selectedCircleIndex]?.startsWith("ЦЕЛИКОМ")
                                ? el.moreButtonName[selectedCircleIndex].replace(/^ЦЕЛИКОМ\s*/, '').trim() :
                                el.productsAmount[selectedCircleIndex] && el.moreButtonName[selectedCircleIndex]
                                    ? `Все ${el.productsAmount[selectedCircleIndex]} моделей ${el.moreButtonName[selectedCircleIndex]}`
                                    : el.productsAmount[selectedCircleIndex]
                                        ? `Все ${el.productsAmount[selectedCircleIndex]} моделей`
                                        : el.moreButtonName[selectedCircleIndex]
                                            ? `Все модели ${el.moreButtonName[selectedCircleIndex]}`
                                            : 'Посмотреть все'
                        }
                    </Link>
                </div>

            )}
        </div>
    );
};

export default MultiSectionRecs;
