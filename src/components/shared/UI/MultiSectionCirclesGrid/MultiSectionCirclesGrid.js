import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import Image from "next/image";
import s from './MultiSectionCirclesGrid.module.css'
import ScrollableBlock from "@/components/shared/UI/ScrollableBlock/ScrollableBlock";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import Link from "next/link";
import {desktopStore} from "@/store/DesktopStore";
import arrowNew from "@/static/icons/arrowSlider.svg";

const MultiSectionCirclesGrid = ({el}) => {
    const [centerContent, setCenterContent] = useState(false);

    useEffect(() => {
        // Функция для проверки ширины экрана
        const checkWidth = () => {
            const colWidth = Math.max(100, Math.min(window.innerWidth * 0.0555, 105));
            const gridWidth = el.cols * colWidth + (el.cols - 1) * 17 + 40;
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

    const [noArrows, setNoArrows] = useState(true);  // По умолчанию стрелки скрыты

    useEffect(() => {
        const handleResize = () => {
            if (scrollableContainerRef.current) {
                const scrollableWidth = scrollableContainerRef.current.scrollWidth;
                const visibleWidth = scrollableContainerRef.current.clientWidth;

                // Если содержимое шире контейнера, показываем стрелки
                if (scrollableWidth > visibleWidth && desktopStore.isDesktop) {
                    setNoArrows(false); // Показать стрелки
                } else {
                    setNoArrows(true);  // Скрыть стрелки
                }
            }
        };

        // Вызываем проверку при загрузке и при изменении размера окна
        handleResize();
        window.addEventListener('resize', handleResize);

        // Очистка обработчика при размонтировании компонента
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollableContainerRef = useRef(null);
    const scroll = 800
    const scrollLeft = (ref) => {
        if (ref.current) {
            ref.current.scrollTo({
                left: ref.current.scrollLeft - scroll,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = (ref) => {
        if (ref.current) {
            ref.current.scrollTo({
                left: ref.current.scrollLeft + scroll,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div style={{marginBottom: desktopStore.isDesktop ? '100px' : '50px'}}>
            <div className={s.multiSectionCirclesTitle}>{el.title}</div>
            <div style={{position: 'relative'}}>
                <div
                    className={`${s.multiSectionCirclesGridRow} ${s.paddings} ${centerContent ? s.centerContent : ''}`}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${el.cols}, max(100px, min(5.55vw, 105px)))`,
                        gridTemplateRows: `repeat(${el.rows}, auto)`,
                        marginBottom: noArrows ? desktopStore.isDesktop ? '30px' : '15px' : '50px'
                    }}
                    ref={scrollableContainerRef}
                >
                    {Array.from({length: el.rows * el.cols}).map((_, idx) => (
                        <div key={idx} className={s.multiSectionCirclesCircle}>
                            <div className={`${s.circle1} ${selectedCircleIndex === idx ? s.selectedCircle : ''}`}
                                 onClick={() => setSelectedCircleIndex(idx)}>
                                <Image
                                    src={el.desktopImages[idx]}
                                    alt="Brand Image"
                                    className={s.circleImage1}
                                    width={700}
                                    height={700}
                                    layout="responsive"
                                    quality={100}
                                />
                            </div>
                            <div className={s.circleText1}>{el.circleNames[idx]}</div>
                        </div>
                    ))}
                </div>
                {!noArrows && desktopStore.isDesktop &&
                    <button className={s.leftNew} onClick={() => scrollLeft(scrollableContainerRef)}
                            style={{zIndex: 2}}>
                        <Image src={arrowNew} alt='' style={{transform: 'rotate(180deg)'}}/>
                    </button>
                }
                {!noArrows && desktopStore.isDesktop &&
                    <button className={s.rightNew} onClick={() => scrollRight(scrollableContainerRef)}
                            style={{zIndex: 2}}>
                        <Image src={arrowNew} alt=''/>
                    </button>
                }
            </div>
            <ScrollableBlock paddings={'regular'} rows={selectionRows} moreButton={true}
                             moreButtonUrl={`${el.circleLinks[selectedCircleIndex]}`}
                             ref={scrollableBlockRef}>
                {getScrollableBlockArr()}
            </ScrollableBlock>
            {el.moreButton && (
                <div className={s.customButton}>
                    <Link href={`${el.circleLinks[selectedCircleIndex]}`}
                          className={`${s.linkMore}`}>
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

export default MultiSectionCirclesGrid;
