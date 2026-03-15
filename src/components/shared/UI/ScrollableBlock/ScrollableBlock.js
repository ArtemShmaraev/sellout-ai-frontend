import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import s from './ScrollableBlock.module.css'
import arrowNew from "@/static/icons/arrowSlider.svg";
import arrow from '@/static/icons/chevron-right.svg'
import Image from "next/image";
import styles from "@/styles/CatalogAccessoriesDesktopMen.module.css";
import {desktopStore} from "@/store/DesktopStore";
import more from "@/static/icons/moreIcon.svg";
import Link from "next/link";

const ScrollableBlock = forwardRef(({
                                        children,
                                        paddings = 'none',
                                        rows = 1,
                                        moreButton = false,
                                        moreButtonText = "Посмотреть все",
                                        moreButtonUrl = "",
                                        resetScrollToBeginning = false
                                    }, ref) => {
    const scrollableContainerRef = useRef(null);
    const scroll = 1100
    const scrollLeft = () => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTo({
                left: scrollableContainerRef.current.scrollLeft - scroll,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTo({
                left: scrollableContainerRef.current.scrollLeft + scroll,
                behavior: 'smooth',
            });
        }
    };

    // Добавляем функцию для сброса прокрутки к началу
    const resetScroll = () => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTo({
                left: 0,
                behavior: 'smooth',
            });
        }
    };

    const setScroll = (scrollLeftPosition) => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTo({
                left: scrollLeftPosition,
                behavior: 'smooth',
            });
        }
    };

    useImperativeHandle(ref, () => ({
        resetScroll,
        setScroll,
        getScroll
    }));

    const getScroll = () => {
        return scrollableContainerRef.current?.scrollLeft || 0;
    };

    const paddingClass = paddings === 'regular' ? s.paddingRegular : '';
    const snapPaddingClass = paddings === 'regular' ? s.snapPaddingRegular : '';

    const [noArrows, setNoArrows] = useState(true);  // По умолчанию стрелки скрыты

    useEffect(() => {
        const handleResize = () => {
            if (scrollableContainerRef.current) {
                const scrollableWidth = scrollableContainerRef.current.scrollWidth;
                const visibleWidth = scrollableContainerRef.current.clientWidth;
                // Если содержимое шире контейнера, показываем стрелки
                if (scrollableWidth > visibleWidth) {
                    setNoArrows(false); // Показать стрелки
                } else {
                    setNoArrows(true);  // Скрыть стрелки
                }
            }
        };

        if (resetScrollToBeginning) {
            resetScroll()
        }

        // Вызываем проверку при загрузке и при изменении размера окна
        handleResize();
        window.addEventListener('resize', handleResize);

        // Очистка обработчика при размонтировании компонента
        return () => window.removeEventListener('resize', handleResize);
    }, [children]);

    // Оставляем товары, кратные числу рядов
    const adjustedArr = children.slice(0, Math.floor(children.length / rows) * rows);

    // Разбиваем детей на столбцы, каждый содержит `rows` элементов
    const columns = Array.from({length: Math.ceil(adjustedArr.length / rows)}, (_, colIndex) => {
        return adjustedArr.slice(colIndex * rows, colIndex * rows + rows);
    });

    // // Сохранение позиции прокрутки
    // useEffect(() => {
    //     if (!blockId) {
    //         console.error("blockId проп обязателен для сохранения состояния прокрутки.");
    //         return;
    //     }
    //
    //     const container = scrollableContainerRef.current;
    //     let isRestoringScroll = true; // Флаг, чтобы игнорировать сохранение позиции во время восстановления
    //
    //     // Восстанавливаем сохранённую прокрутку
    //     const savedScroll = sessionStorage.getItem(`scrollPosition-${blockId}`);
    //     if (savedScroll && container) {
    //         container.scrollLeft = parseInt(savedScroll, 10);
    //     }
    //
    //     // Функция для сохранения текущей позиции прокрутки
    //     const saveScrollPosition = () => {
    //         if (!isRestoringScroll && container) {
    //             sessionStorage.setItem(`scrollPosition-${blockId}`, container.scrollLeft);
    //             console.log(sessionStorage.getItem(`scrollPosition-${blockId}`))
    //         }
    //     };
    //
    //     // Устанавливаем обработчик прокрутки
    //     container?.addEventListener('scroll', saveScrollPosition);
    //
    //     // После восстановления позиции выключаем режим восстановления
    //     const resetRestoration = setTimeout(() => {
    //         isRestoringScroll = false;
    //     }, 100); // Достаточно времени для завершения восстановления
    //
    //     // Очистка обработчиков
    //     return () => {
    //         clearTimeout(resetRestoration);
    //         container?.removeEventListener('scroll', saveScrollPosition);
    //     };
    // }, [blockId]);


    return (
        <div className={s.scrollableBlock}>
            <div className={`${s.scrollableContainer} ${paddingClass} ${snapPaddingClass}`}
                 ref={scrollableContainerRef}>
                {columns.map((column, colIndex) => (
                    <div key={colIndex} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        scrollSnapAlign: colIndex === 0 || desktopStore.isDesktop ? 'start' : 'center',
                        flexShrink: 0
                    }}>
                        {column.map((child, rowIndex) => (
                            <div style={{flexShrink: 0}} key={rowIndex}>
                                {child}
                            </div>
                        ))}
                    </div>
                ))}
                {moreButton === true &&
                    <>
                        <Link href={`${moreButtonUrl}`} className={s.moreLines}>
                            <div>
                                <Image
                                    src={more} // Путь к изображению лупы
                                    alt="Search Icon"
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={s.moreLinesText}>
                                {moreButtonText}
                            </div>
                        </Link>
                        {!desktopStore.isDesktop &&
                            <div style={{flexShrink: 0, width: '0px'}}/>
                        }
                        {/* Добавляем пустышку */}
                    </>
                }
            </div>

            {!noArrows && desktopStore.isDesktop &&
                <button className={s.leftNew} onClick={scrollLeft} style={{zIndex: 2}}>
                    <Image src={arrowNew} alt='' style={{transform: 'rotate(180deg)'}}/>
                </button>
            }
            {!noArrows && desktopStore.isDesktop &&
                <button className={s.rightNew} onClick={scrollRight} style={{zIndex: 2}}>
                    <Image src={arrowNew} alt=''/>
                </button>
            }
        </div>
    );
});

export default ScrollableBlock;