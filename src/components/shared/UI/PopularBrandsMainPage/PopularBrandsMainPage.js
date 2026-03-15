import React, {forwardRef, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
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

const PopularBrandsMainPage = forwardRef(({el, gender, arrangement, dataIndex = "none"}, ref) => {
    const blockId = el.blockId;

    // Состояние для хранения индекса выбранного кружка, изначально 0 (первый кружок)
    const [selectedCircleIndex, setSelectedCircleIndex] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [resetSelectedCircle, setResetSelectedCircle] = useState(false);
    const isReset = useRef(false)

    useLayoutEffect(() => {
        const initialSelectedCircleIndex = Number(Cookies.get(`${blockId}-IndArr`) || 0);
        setSelectedCircleIndex(initialSelectedCircleIndex);
        setSelectedProducts(el.products[initialSelectedCircleIndex] || [])
        setTimeout(() => {
            setResetSelectedCircle(true);
        }, 100)
    }, []);

    useEffect(() => {
        if (el.products[selectedCircleIndex].length > 0) {
            setSelectedProducts(el.products[selectedCircleIndex])
        }
    }, [el.products, arrangement]);

    const router = useRouter()

    const loadingProductsData = [
        {
            "id": 0,
            "in_wishlist": false,
            "price": {},
            "model": "",
            "colorway": "",
            "slug": "",
            "is_collab": false,
            "isLoadingCard": true,
            "collab": {},
            "brands": [],
            "bucket_link": [
                {
                    "url": "https://cdn.poizon.com/pro-img/origin-img/20220731/3172a4d75f3640359af53986920d284b.jpg"
                }
            ],
            "is_sale": false,
            "available_sizes": {
                "sizes": [],
                "filter_logo": ""
            }
        },
        {
            "id": 0,
            "in_wishlist": false,
            "price": {},
            "model": "",
            "colorway": "",
            "slug": "",
            "is_collab": false,
            "isLoadingCard": true,
            "collab": {},
            "brands": [],
            "bucket_link": [
                {
                    "url": "https://cdn.poizon.com/pro-img/origin-img/20220731/3172a4d75f3640359af53986920d284b.jpg"
                }
            ],
            "is_sale": false,
            "available_sizes": {
                "sizes": [],
                "filter_logo": ""
            }
        },
        {
            "id": 0,
            "in_wishlist": false,
            "price": {},
            "model": "",
            "colorway": "",
            "slug": "",
            "is_collab": false,
            "isLoadingCard": true,
            "collab": {},
            "brands": [],
            "bucket_link": [
                {
                    "url": "https://cdn.poizon.com/pro-img/origin-img/20220731/3172a4d75f3640359af53986920d284b.jpg"
                }
            ],
            "is_sale": false,
            "available_sizes": {
                "sizes": [],
                "filter_logo": ""
            }
        },
        {
            "id": 0,
            "in_wishlist": false,
            "price": {},
            "model": "",
            "colorway": "",
            "slug": "",
            "is_collab": false,
            "isLoadingCard": true,
            "collab": {},
            "brands": [],
            "bucket_link": [
                {
                    "url": "https://cdn.poizon.com/pro-img/origin-img/20220731/3172a4d75f3640359af53986920d284b.jpg"
                }
            ],
            "is_sale": false,
            "available_sizes": {
                "sizes": [],
                "filter_logo": ""
            }
        },
        {
            "id": 0,
            "in_wishlist": false,
            "price": {},
            "model": "",
            "colorway": "",
            "slug": "",
            "is_collab": false,
            "isLoadingCard": true,
            "collab": {},
            "brands": [],
            "bucket_link": [
                {
                    "url": "https://cdn.poizon.com/pro-img/origin-img/20220731/3172a4d75f3640359af53986920d284b.jpg"
                }
            ],
            "is_sale": false,
            "available_sizes": {
                "sizes": [],
                "filter_logo": ""
            }
        },
        {
            "id": 0,
            "in_wishlist": false,
            "price": {},
            "model": "",
            "colorway": "",
            "slug": "",
            "is_collab": false,
            "isLoadingCard": true,
            "collab": {},
            "brands": [],
            "bucket_link": [
                {
                    "url": "https://cdn.poizon.com/pro-img/origin-img/20220731/3172a4d75f3640359af53986920d284b.jpg"
                }
            ],
            "is_sale": false,
            "available_sizes": {
                "sizes": [],
                "filter_logo": ""
            }
        }
    ]

    // Генерация массива товаров для текущего выбранного кружка
    const getScrollableBlockArr = () => {
        const scrollableBlockArr = [];
        // const selectedProducts = el.products[selectedCircleIndex] || []; // Получаем список продуктов для выбранной линейки
        selectedProducts.forEach(product => {
            scrollableBlockArr.push(
                <ProductCard
                    product={product}
                    key={product.id}
                    bigCard={el.bigCard && !desktopStore.isDesktop}
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
                Cookies.set(`${blockId}-Ind`, arrangement[blockId][prevIndex], {expires: 0.25});
                Cookies.set(`${blockId}-IndArr`, prevIndex, {expires: 0.25});
                return prevIndex;
            });

            if (scrollableContainerRef.current) {
                const scrollLeft = Math.floor(scrollableContainerRef.current.scrollLeft);
                Cookies.set(`${blockId}-SecPos`, scrollLeft, {expires: 0.25});
            }

            if (scrollableBlockRef.current) {
                const scrollLeft = Math.floor(scrollableBlockRef.current.getScroll());
                Cookies.set(`${blockId}-PrPos`, scrollLeft, {expires: 0.25});
            }

        };

        const restoreScrollPosition = () => {
            const SectionsContainerPosition = Cookies.get(`${blockId}-SecPos`);
            const ProductsBlockPosition = Cookies.get(`${blockId}-PrPos`);

            if (SectionsContainerPosition && scrollableContainerRef.current && selectedProducts.length && !isReset.current) {
                scrollableContainerRef.current.scrollLeft = parseInt(SectionsContainerPosition, 10);
            }
            if (ProductsBlockPosition && scrollableBlockRef.current && selectedProducts.length && !isReset.current) {
                scrollableBlockRef.current.setScroll(parseInt(ProductsBlockPosition, 10));
                isReset.current = true
            }
        };

        // Восстанавливаем позицию при загрузке страницы
        // restoreScrollPosition();

        restoreScrollPosition();

        // Сохраняем позицию перед уходом со страницы
        router.events.on("routeChangeStart", saveSelectedSectionAndScrollPositions);
        window.addEventListener('beforeunload', saveSelectedSectionAndScrollPositions)

        // Убираем обработчик при размонтировании компонента
        return () => {
            router.events.off("routeChangeStart", saveSelectedSectionAndScrollPositions);
            window.removeEventListener('beforeunload', saveSelectedSectionAndScrollPositions)
        };
    }, [router, selectedProducts]);

    const chooseCircle = async (idx) => {
        setSelectedCircleIndex(idx)
        if (el.products[idx] && el.products[idx].length > 0) {
            setSelectedProducts(el.products[idx])
        } else {
            setSelectedProducts(loadingProductsData)
            const data = await fetchProductsForMainPage(blockId, arrangement[blockId][idx], gender)
            setSelectedProducts(data)
        }
    }


    return (
        <div className={s.brandsSection} data-index={dataIndex} ref={ref}>
            <div
                className={s.brandsTitle}>{desktopStore.isDesktop ? `Популярные лоты` : ``} {desktopStore.isDesktop ? el.brandsNamesDesktop[selectedCircleIndex] : el.brandsNamesMobile[selectedCircleIndex]}</div>
            <div style={{position: 'relative', marginBottom: desktopStore.isDesktop ? '70px' : '20px'}}>
                <div className={`${s.brandsGridCont} ${s.paddings}`} ref={scrollableContainerRef}>
                    <div className={s.brandsGrid}>
                        {Array.from({length: el.brandsAmount}).map((_, idx) => (
                            <div key={idx} className={s.brandCircle}>
                                <div className={`${s.circle1} ${selectedCircleIndex === idx ? s.selectedCircle : ''}`}
                                     onClick={() => chooseCircle(idx)}>
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
});

export default PopularBrandsMainPage;
