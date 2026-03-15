import React, {useEffect, useState} from 'react';
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import AdminCard from "@/components/shared/AdminCard/AdminCard";
import s from './ProductList.module.css'
import {observer} from "mobx-react-lite";
import PromoBannerProductsPageAboutAndGuarantee
    from "@/components/shared/UI/PromoBannerProductsPageAboutAndGuarantee/PromoBannerProductsPageAboutAndGuarantee";
import PromoBannerProductsPageGiftAndRefDesktop
    from "@/components/shared/UI/PromoBannerProductsPageGiftAndRefDesktop/PromoBannerProductsPageGiftAndRefDesktop";
import PromoBannerProductsPageSocial
    from "@/components/shared/UI/PromoBannerProductsPageSocial/PromoBannerProductsPageSocial";
import {desktopStore} from "@/store/DesktopStore";
import PromoBannerProductsPageGiftMobile
    from "@/components/shared/UI/PromoBannerProductsPageGiftMobile/PromoBannerProductsPageGiftMobile";
import PromoBannerProductsPageRef from "@/components/shared/UI/PromoBannerProductsPageRef/PromoBannerProductsPageRef";
import Cookies from "js-cookie";
import PromoBannerProductsPageAnyProduct
    from "@/components/shared/UI/PromoBannerProductsPageAnyProduct/PromoBannerProductsPageAnyProduct";

const ProductList = ({products, isAdmin, showPromos=false}) => {
    const calculateCardsPerRow = () => {
        const width = window.innerWidth;
        if (width < 650) return 2; // 2 карточки в ряду
        if (width < 1210) return 3; // 3 карточки в ряду
        if (width < 1515) return 4; // 4 карточки в ряду
        if (width < 2000) return Math.floor(0.94 * width / 356);
        if (width < 2500) return Math.floor(0.8 * width / 356);
        return Math.floor(0.7 * width / 356); // 4 карточки в ряду
    };

    const [receivedWelcomeGift, setReceivedWelcomeGift] = useState('')

    useEffect(() => {
        setReceivedWelcomeGift(Cookies.get('receivedWelcomeGift'))
    }, [])

    const modifiedProductsPage = () => {
        const result = [];
        products.forEach((product, index) => {
            result.push(
                <ProductCard
                    product={product}
                    key={product.id}
                    cardList={true}
                />
            );
            const row = Math.floor(index / cardsPerRow) + 1;
            if (showPromos) {
                if (desktopStore.isDesktop) {
                    if (row === 2 && (index + 1) % cardsPerRow === 0) {
                        result.push(<PromoBannerProductsPageAnyProduct/>);
                    } else if (row === 4 && (index + 1) % cardsPerRow === 0) {
                        result.push(<PromoBannerProductsPageAboutAndGuarantee/>);
                    } else if (row === 6 && (index + 1) % cardsPerRow === 0) {
                        if (receivedWelcomeGift) {
                            result.push(<PromoBannerProductsPageRef/>);
                        } else {
                            result.push(<PromoBannerProductsPageGiftAndRefDesktop/>);
                        }
                    } else if (row === 9 && (index + 1) % cardsPerRow === 0) {
                        result.push(<PromoBannerProductsPageSocial/>);
                    }
                } else {
                    if (row === 2 && (index + 1) % cardsPerRow === 0) {
                        result.push(<PromoBannerProductsPageAnyProduct/>);
                    } else if (row === 4 && (index + 1) % cardsPerRow === 0) {
                        if (receivedWelcomeGift) {
                            result.push(<PromoBannerProductsPageAboutAndGuarantee/>);
                        } else {
                            result.push(<PromoBannerProductsPageGiftMobile/>);
                        }
                    } else if (row === 7 && (index + 1) % cardsPerRow === 0) {
                        if (receivedWelcomeGift) {
                            result.push(<PromoBannerProductsPageRef/>);
                        } else {
                            result.push(<PromoBannerProductsPageAboutAndGuarantee/>);
                        }
                    } else if (row === 10 && (index + 1) % cardsPerRow === 0) {
                        if (receivedWelcomeGift) {
                            result.push(<PromoBannerProductsPageSocial/>);
                        } else {
                            result.push(<PromoBannerProductsPageRef/>);
                        }
                    } else if (row === 14 && (index + 1) % cardsPerRow === 0) {
                        if (receivedWelcomeGift) {
                        } else {
                            result.push(<PromoBannerProductsPageSocial/>);
                        }
                    }
                }
            }
        });
        return result;
    };

    const [cardsPerRow, setCardsPerRow] = useState(0);
    const [productsPageBlocks, setProductsPageBlocks] = useState(modifiedProductsPage());

    useEffect(() => {
        const handleResize = () => {
            setCardsPerRow(calculateCardsPerRow());
        };

        // Устанавливаем значение при первом рендере
        handleResize();

        // Добавляем слушатель изменения размера окна
        window.addEventListener("resize", handleResize);

        // Убираем слушатель при размонтировании
        return () => window.removeEventListener("resize", handleResize);
    }, []);



    useEffect(() => {
        setProductsPageBlocks(modifiedProductsPage())
    }, [cardsPerRow, products, showPromos]);

    return (
        <div className={s.container}>
            <div className={s.product_list}>
                {!isAdmin
                    ? productsPageBlocks
                    :
                    products.map(el =>
                        <AdminCard
                            categories={['el.categories']}
                            lines={el.lines}
                            mainLine={'el.main_line.view_name'}
                            product={el}
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