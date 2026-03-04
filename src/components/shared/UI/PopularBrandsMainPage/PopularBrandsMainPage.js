import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import Image from "next/image";
import s from './PopularBrandsMainPage.module.css'
import ScrollableBlock from "@/components/shared/UI/ScrollableBlock/ScrollableBlock";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import Link from "next/link";
import more from "@/static/icons/moreIcon.svg";
import arrowNew from "@/static/icons/arrowSlider.svg";
import {desktopStore} from "@/store/DesktopStore";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {fetchProductsForMainPage} from "@/http/mainPageApi";
import {fetchSimilarProducts} from "@/http/productsApi";

const PopularBrandsMainPage = ({el}) => {
    const blockId = el.blockId;

    // Состояние для хранения индекса выбранного кружка, изначально 0 (первый кружок)
    const [selectedCircleIndex, setSelectedCircleIndex] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [resetSelectedCircle, setResetSelectedCircle] = useState(false);

    useLayoutEffect(() => {
        const initialSelectedCircleIndex = Number(Cookies.get(`multiSectionedBlock-${blockId}-SelectedSection`) || 0);
        setSelectedCircleIndex(initialSelectedCircleIndex);
        setTimeout(() => {
            setResetSelectedCircle(true);
        }, 100)
    }, []);

    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get('access_token')
        let sP = el.products[selectedCircleIndex] || [];
        if (!sP || sP.length === 0) {
            fetchProductsForMainPage(el.brandsLinks[selectedCircleIndex], token).then(res => {
                setSelectedProducts(res)
            })
        } else {
            setSelectedProducts(sP);
        }

    }, [selectedCircleIndex])

    // Генерация массива товаров для текущего выбранного кружка
    const getScrollableBlockArr = () => {
        const scrollableBlockArr = [];
        // let selectedProducts = el.products[selectedCircleIndex] || []; // Получаем список продуктов для выбранной линейки
        // if (!selectedProducts || selectedProducts.length === 0) {
        //     selectedProducts = await fetchProductsForMainPage(el.brandsLinks[selectedCircleIndex]);
        //     el.products[selectedCircleIndex] = selectedProducts;
        // }

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

        // Вызываем проверку при загрузке и при изменении размера окна
        handleResize();
        window.addEventListener('resize', handleResize);

        // Очистка обработчика при размонтировании компонента
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollableContainerRef = useRef(null);
    const scroll = 1200
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

    const scrollableBlockRef = useRef(null);

    useEffect(() => {
        // Прокручиваем блок товаров в начало при смене выбранного кружка
        if (scrollableBlockRef.current && resetSelectedCircle) {
            scrollableBlockRef.current.resetScroll();
        }
    }, [selectedCircleIndex]);

    useEffect(() => {
        const saveSelectedSectionAndScrollPositions = () => {
            setSelectedCircleIndex((prevIndex) => {
                Cookies.set(`multiSectionedBlock-${blockId}-SelectedSection`, prevIndex, {expires: 0.25});
                return prevIndex;
            });

            if (scrollableContainerRef.current) {
                const scrollLeft = scrollableContainerRef.current.scrollLeft;
                Cookies.set(`multiSectionedBlock-${blockId}-SectionsContainerPosition`, scrollLeft, {expires: 0.25});
            }

            if (scrollableBlockRef.current) {
                const scrollLeft = scrollableBlockRef.current.getScroll();
                Cookies.set(`multiSectionedBlock-${blockId}-ProductsBlockPosition`, scrollLeft, {expires: 0.25});
            }

        };

        const restoreScrollPosition = () => {
            const SectionsContainerPosition = Cookies.get(`multiSectionedBlock-${blockId}-SectionsContainerPosition`);
            const ProductsBlockPosition = Cookies.get(`multiSectionedBlock-${blockId}-ProductsBlockPosition`);

            if (SectionsContainerPosition && scrollableContainerRef.current) {
                scrollableContainerRef.current.scrollLeft = parseInt(SectionsContainerPosition, 10);
            }
            if (ProductsBlockPosition && scrollableBlockRef.current) {
                scrollableBlockRef.current.setScroll(parseInt(ProductsBlockPosition, 10));
            }
        };

        // Восстанавливаем позицию при загрузке страницы
        // restoreScrollPosition();

        restoreScrollPosition();

        // Сохраняем позицию перед уходом со страницы
        router.events.on("routeChangeStart", saveSelectedSectionAndScrollPositions);

        // Убираем обработчик при размонтировании компонента
        return () => {
            router.events.off("routeChangeStart", saveSelectedSectionAndScrollPositions);
        };
    }, [router]);


    return (
        <div className={s.brandsSection}>
            <div
                className={s.brandsTitle}>{desktopStore.isDesktop ? `Популярные лоты` : ``} {desktopStore.isDesktop ? el.brandsNamesDesktop[selectedCircleIndex] : el.brandsNamesMobile[selectedCircleIndex]}</div>
            <div style={{position: 'relative', marginBottom: desktopStore.isDesktop ? '70px' : '20px'}}>
                <div className={`${s.brandsGridCont} ${s.paddings}`} ref={scrollableContainerRef}>
                    <div className={s.brandsGrid}>
                        {Array.from({length: el.brandsAmount}).map((_, idx) => (
                            <div key={idx} className={s.brandCircle}>
                                <div className={`${s.circle1} ${selectedCircleIndex === idx ? s.selectedCircle : ''}`}
                                     onClick={() => setSelectedCircleIndex(idx)}>
                                    <Image
                                        src={el.desktopImages[idx]}
                                        alt="Brand Image"
                                        className={s.circleImage}
                                        width={700}
                                        height={700}
                                        layout="responsive"
                                        quality={100}
                                    />
                                </div>
                                {/*<div className={s.circleText}>{el.productsAmount[idx]}</div>*/}
                            </div>
                        ))}
                    </div>
                    <div className={s.moreLines}>
                        <div>
                            <Link href={"/brands"}>
                                <Image
                                    src={more} // Путь к изображению лупы
                                    alt="Search Icon"
                                    width={50}
                                    height={50}
                                />
                            </Link>
                        </div>
                        <div className={s.moreLinesText}>
                            Все 1000+ брендов
                        </div>
                    </div>
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
                             moreButtonUrl={`${el.brandsLinks[selectedCircleIndex]}`}
                             ref={scrollableBlockRef}>
                {getScrollableBlockArr()}
            </ScrollableBlock>
            {el.moreButton && (
                <div className={s.customButton}>
                    <Link href={`${el.brandsLinks[selectedCircleIndex]}`} className={`${s.linkMore}`}>
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

export default PopularBrandsMainPage;
