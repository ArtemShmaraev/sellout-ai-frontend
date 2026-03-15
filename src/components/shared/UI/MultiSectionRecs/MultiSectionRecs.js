import React, {forwardRef, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import Image from "next/image";
import s from './MultiSectionRecs.module.css'
import ScrollableBlock from "@/components/shared/UI/ScrollableBlock/ScrollableBlock";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import Link from "next/link";
import styles from "@/styles/CatalogAccessoriesDesktopMen.module.css";
import {desktopStore} from "@/store/DesktopStore";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {fetchProductsForMainPage} from "@/http/mainPageApi";

const MultiSectionRecs = forwardRef(({el, gender, arrangement, dataIndex="none"}, ref) => {
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

    const scrollableBlockRef = useRef(null);
    const scrollableContainerRef = useRef(null);

    useEffect(() => {
        // Прокручиваем блок товаров в начало при смене выбранного кружка
        if (scrollableBlockRef.current && resetSelectedCircle) {
            scrollableBlockRef.current.resetScroll();
        }

    }, [selectedCircleIndex]);

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
        <div style={{marginBottom: desktopStore.isDesktop ? '100px' : '50px'}} data-index={dataIndex} ref={ref}>
            <div className={s.multiSectionCirclesTitle}>{el.title}</div>
            <div className={`${s.categoriesGrid} ${s.paddings} ${centerContent ? s.centerContent : ''}`} ref={scrollableContainerRef}
                 style={{
                     gridTemplateColumns: `repeat(${el.recsNames.length}, 112px)`,
                 }}
            >
                {el.recsNames.map((category, idx) => (
                    <div key={idx} className={`${s.categoryItem} ${selectedCircleIndex === idx ? s.selectedItem : ''}`}
                         onClick={() => chooseCircle(idx)}>
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
});

export default MultiSectionRecs;
