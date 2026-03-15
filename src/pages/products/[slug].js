import React, {useContext, useEffect, useRef, useState} from 'react';
import s from '@/styles/OneProductPage.module.css'
import truck from '@/static/icons/truck.svg'
import refund from '@/static/icons/arrow-return-left.svg'
import returnImg from '@/static/icons/arrow-return-left.svg'
import like from '@/static/icons/heart.svg'
import like_fill from '@/static/icons/heart-fill.svg'
import SizeTable from "@/components/pages/oneProduct/SizeTable/SizeTable";
import SizeHelp from "@/components/pages/oneProduct/SizeHelp/SizeHelp";
import SizeChoice from "@/components/pages/oneProduct/SizeChoice/SizeChoice";
import HowToChoose from "@/components/pages/oneProduct/HowToChoose/HowToChoose";
import TextModal from "@/components/shared/UI/TextModal/TextModal";
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import Image from 'next/image'
import {
    fetchOneProduct,
    fetchOneProductFull,
    fetchPrices,
    fetchProductsByArray,
    fetchShippings,
    fetchSimilarProducts,
    updateOneProduct,
    fetchProductsPage
} from "@/http/productsApi";
import MainLayout from "@/layout/MainLayout";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import Cookies from "js-cookie";
import {addToWishlist, removeFromWishlist} from "@/http/wishlistAPI";
import {parse} from "cookie";
import RenderBtns from "@/components/pages/oneProduct/RenderBtns/RenderBtns";
import {addToCart} from "@/http/cartApi";
import {addLastSeen, fetchLastSeen2, fetchUserInfo} from "@/http/userApi";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import Compilation from "@/components/shared/Compilation/Compilation";
import InvisibleCaptcha from "@/components/shared/CaptchaYandex/Captcha"
import '@splidejs/react-splide/css'
import Head from "next/head";
import gift from '@/static/icons/gift-green.svg'
import how from '@/static/icons/question-circle.svg'
import warranty from '@/static/icons/shield-check.svg'
import payment from '@/static/icons/credit-card.svg'
import {useRouter} from "next/router";
import parseHtml from 'html-react-parser'
import change from "@/static/icons/arrow-down-up.svg";
import map from "@/static/img/map.jpg";
import LoyaltyFAQ from "@/components/pages/account/LoyaltyFAQ/LoyaltyFAQ";
import gift_gard from "@/static/icons/gift-gard.svg";
import first from "@/static/icons/first.svg";
import shareIcon from "@/static/icons/icons8-поделиться.svg"
import shareGif from "@/static/icons/icons8-поделиться.gif"
import good from "@/static/icons/good.svg";
import friend from "@/static/icons/friend.svg";
import birth from "@/static/icons/happybirthday.svg";
import smile from "@/static/icons/emoji-smile 1.svg";
import giftModal from "@/static/icons/gift.svg";
import headphones from "@/static/icons/headphones-circle.svg";
import tg from "@/static/icons/tg_black.svg";
import vk from "@/static/icons/vk_black.svg";
import cashStack from "@/static/icons/cash-stack.svg";
import cashStack1 from "@/static/icons/cash-stack 1.svg";
import twoArrows from "@/static/icons/two_arrowsNew.svg";
import ffIcon from '@/static/icons/ff.png'
import selloutIcon from '@/static/icons/selloutIcon.png'
import ImgSlider from "@/components/pages/oneProduct/ImgSlider/ImgSlider";
import shield from "@/static/icons/shield-check 1.svg";
import patch from "@/static/icons/patch-check 1.svg";
import personCheck from "@/static/icons/person-check 1.svg";
import file from '@/static/icons/file-earmark-check 1.svg'
import creditCard from '@/static/icons/credit-card 2.svg'
import aboutUs from '@/static/icons/aboutus.svg'
import aboutUs2 from '@/static/icons/aboutus2.svg'
import HowWeWorkModal from "@/components/shared/HowWeWorkModal/HowWeWorkModal";
import {
    trackAddToCart,
    trackAddToFavorites,
    trackRemoveToFavorites,
    trackViewProduct,
} from "@/components/shared/YandexMetrica/YandexMetrica";
import TreeLine from "@/components/pages/oneProduct/TreeLines/TreeLine";
import BreadcrumbC from "@/components/shared/BreadcrumbC/BreadcrumbC";
import StarRating from "@/components/shared/StarRating/StarRating";
import * as PropTypes from "prop-types";
import ProductDetailsMob from "@/components/shared/ProductDetailsMob/ProductDetailsMob";
import Notification from "@/components/shared/Notification/Notification";
import ProductList from "@/components/pages/product/ProductList/ProductList";
import TextModalDesktopProductPage
    from "@/components/shared/UI/TextModalDesktopProductPage/TextModalDesktopProductPage";
import igBlack from "@/static/icons/igImg.svg";
import tgBlack from "@/static/icons/tg_black.svg";
import imgUs3 from "@/static/img/Гарантии 1.png";
import imgUs4 from "@/static/img/гарантии 2.png";
import imgUs5 from "@/static/img/Гарантии 3.png";
import imgUs6 from "@/static/img/Гарантии 4.png";
import imgUs7 from "@/static/img/Гарантии 5.png";
import imgUs8 from "@/static/img/Гарантии 6.png";
import productPageMainPageLinkWomen from "@/static/img/productPageMainPageLinkWomen.png";
import productPageMainPageLinkMen from "@/static/img/productPageMainPageLinkMen.png";
import productPageMainPageLinkAny from "@/static/img/productPageMainPageLinkAny.png";
import productPageMainPageLinkWomenMob from "@/static/img/productPageMainPageLinkWomenMob.png";
import productPageMainPageLinkMenMob from "@/static/img/productPageMainPageLinkMenMob.png";
import productPageMainPageLinkAnyMob from "@/static/img/productPageMainPageLinkAnyMob.png";
import productPageMainPageArrow from "@/static/img/productPageMainPageArrow.svg";
import imgUs4Mob from "@/static/img/Гарантии 1 mob.png";
import imgUs5Mob from "@/static/img/Гарантии 2 mob.png";
import imgUs6Mob from "@/static/img/Гарантии 3 mob.png";
import imgUs7Mob from "@/static/img/Гарантии 4 mob.png";
import imgUs8Mob from "@/static/img/Гарантии 5 mob.png";
import imgUs9Mob from "@/static/img/Гарантии 6 mob.png";
import imgUs10Mob from "@/static/img/Гарантии 7 mob.png";
import imgUs11Mob from "@/static/img/Гарантии 8 mob.png";
import arrow from "@/static/icons/chevron-right-grey.svg";
import ProductPageMobileInfoModal from "@/components/shared/ProductPageMobileInfoModal/ProductPageMobileInfoModal";
import ContactModal from "@/components/shared/ContactModal/ContactModal";
import similarBrands from '@/static/jsons/similarBrands.json'
import similarLines from '@/static/jsons/similarLines.json'
import similarCategories from '@/static/jsons/similarCategories.json'
import ModalRef from "@/components/shared/ModalRef/ModalRef";
import ModalGifts from "@/components/shared/ModalGifts/ModalGifts";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '');
    const token = cookies['access_token'];
    const captcha_token = cookies['captcha_token'];


    // Получение IP-адреса пользователя из заголовка X-Forwarded-For
    const ip = context.req.headers['x-forwarded-for'] || context.req.connection.remoteAddress;


    const product = await fetchOneProduct(context.params.slug, token, ip);
    const productFull = await fetchOneProductFull(context.params.slug, token, ip);
    if (product === "Товар не найден") {

        return {
            notFound: true, // Это устанавливает статус код 404
        };
    }
    const {id} = product;
    const prices = await fetchPrices(id, token);

    let userData = {}
    if (token) {
        const {user_id} = jwtDecode(token)
        userData = await fetchUserInfo(context.req.headers.cookie, user_id)
    }
    // return {
    //     notFound: true, // Это устанавливает статус код 404
    // };

    // Передача IP-адреса в качестве пропса
    return {props: {product, productFull, prices, ip, userData}};
};


StarRating.propTypes = {rating: PropTypes.number};
const OneProductPage = ({product, productFull, prices, ip, userData}) => {
    const router = useRouter()
    const [moreOpen, setMoreOpen] = useState(false)
    const [bonuses, setBonuses] = useState(`До ${product.price.bonus}`)
    const [notification, setNotification] = useState(null);

    const [compilations, setCompilations] = useState([])
    const [lastSeen, setLastSeen] = useState([])
    const [recProducts, setRecProducts] = useState([]);
    const [isLoadingRecProducts, setIsLoadingRecProducts] = useState(false);

    const {productStore, userStore, cartStore, desktopStore} = useContext(Context)

    useEffect(() => {
        productStore.clearAll()
        if (prices.length === 1) {
            productStore.setShipps([])
            productStore.setSizeChosen(prices[0])
        }
    }, [router.asPath])

    const observerRef = useRef(null);

    const generateQueryForRecommendations = (productFull) => {
        const query = {};

        const getProbabilityOutcome = (probabilities) => {
            const random = Math.random() * 100;
            let cumulative = 0;
            for (const [outcome, probability] of probabilities) {
                cumulative += probability;
                if (random <= cumulative) return outcome;
            }
        };

        const getRandomElements = (arr, count) => {
            const shuffled = arr.slice().sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        };

        const currentLine = productFull.main_line?.full_eng_name?.replace(/_$/, '');

        if (currentLine && similarLines[currentLine]) {
            // 3 варианта с вероятностями
            const outcome = getProbabilityOutcome([
                ['variant1', 85],
                ['variant2', 10],
                ['variant3', 5]
            ]);

            if (outcome === 'variant1') {
                const lines = [...similarLines[currentLine], currentLine];
                query.line = Array.from(new Set(getRandomElements(lines, 5 + Math.floor(Math.random() * 7))));
                query.category = ['sneakers'];
            } else if (outcome === 'variant2') {
                const categoryName = productFull.categories?.[productFull.categories.length - 1]?.eng_name;
                if (categoryName && similarCategories[categoryName]) {
                    const extendedCategories = similarCategories[categoryName].concat(Array(5).fill(categoryName));
                    query.category = Array.from(new Set(getRandomElements(extendedCategories, 3 + Math.floor(Math.random() * 8))));
                } else {
                    query.category = [categoryName];
                }

                const brandName = productFull.brands?.[0]?.query_name;
                if (brandName && similarBrands[brandName]) {
                    const brandOutcome = getProbabilityOutcome([['brandSet', 80], ['randomBrands', 20]]);
                    if (brandOutcome === 'brandSet') {
                        const lines = [...similarBrands[brandName], brandName];
                        query.line = Array.from(new Set(getRandomElements(lines, 7 + Math.floor(Math.random() * 7))));
                    } else {
                        query.line = getRandomElements(Object.keys(similarBrands), 5);
                    }
                } else {
                    // Если brandName отсутствует или его нет в similarBrands
                    const brandFallbackOutcome = getProbabilityOutcome([['currentBrand', 50], ['randomBrands', 50]]);
                    if (brandFallbackOutcome === 'currentBrand' && brandName) {
                        query.line = [brandName];
                    } else {
                        query.line = getRandomElements(Object.keys(similarBrands), 5);
                    }
                }
            } else if (outcome === 'variant3') {
                query.page = Math.floor(Math.random() * 77) + 1;
            }
        } else {
            // Нет линейки, другие кейсы
            const outcome = getProbabilityOutcome([['brandCategory', 85], ['randomPage', 15]]);
            if (outcome === 'brandCategory') {
                const categoryName = productFull.categories?.[productFull.categories.length - 1]?.eng_name;
                if (categoryName && similarCategories[categoryName]) {
                    const extendedCategories = similarCategories[categoryName].concat(Array(5).fill(categoryName));
                    query.category = Array.from(new Set(getRandomElements(extendedCategories, 5 + Math.floor(Math.random() * 8))));
                } else {
                    query.category = [categoryName];
                }

                const brandName = productFull.brands?.[0]?.query_name;
                if (brandName && similarBrands[brandName]) {
                    const brandOutcome = getProbabilityOutcome([['brandSet', 80], ['randomBrands', 20]]);
                    if (brandOutcome === 'brandSet') {
                        const lines = [...similarBrands[brandName], brandName];
                        query.line = Array.from(new Set(getRandomElements(lines, 7 + Math.floor(Math.random() * 7))));
                    } else {
                        query.line = getRandomElements(Object.keys(similarBrands), 7);
                    }
                } else {
                    // Если brandName отсутствует или его нет в similarBrands
                    const brandFallbackOutcome = getProbabilityOutcome([['currentBrand', 50], ['randomBrands', 50]]);
                    if (brandFallbackOutcome === 'currentBrand' && brandName) {
                        query.line = [brandName];
                    } else {
                        query.line = getRandomElements(Object.keys(similarBrands), 7);
                    }
                }
            } else if (outcome === 'randomPage') {
                query.page = Math.floor(Math.random() * 77) + 1;
            }
        }

        return query;
    };

    const fetchMoreProducts = async () => {
        const url = generateQueryForRecommendations(productFull);
        const gender = Cookies.get('selected_gender');
        const token = Cookies.get('access_token')

        if (gender && !("gender" in url)) {
            const loadingProductsData = desktopStore.isDesktop ? [
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
            ] : [
                {
                    "id": -1,
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
                    "id": -2,
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
            setRecProducts((prev) => [...prev, ...loadingProductsData]);
            fetchProductsPage({...url, gender}, token).then(res => {
                const shuffledProducts = desktopStore.isDesktop ? res.results.sort(() => Math.random() - 0.5) : res.results.sort(() => Math.random() - 0.5).slice(0, 14);
                setRecProducts((prev) => {
                    // Удаляем заглушечные данные и добавляем новые
                    const filteredProducts = prev.filter(product => !loadingProductsData.includes(product));
                    return [...filteredProducts, ...shuffledProducts];
                });
            })
        } else {
            const loadingProductsData = desktopStore.isDesktop ? [
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
            ] : [
                {
                    "id": -1,
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
                    "id": -2,
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
            setRecProducts((prev) => [...prev, ...loadingProductsData]);
            fetchProductsPage(url, token).then(res => {
                const shuffledProducts = desktopStore.isDesktop ? res.results.sort(() => Math.random() - 0.5) : res.results.sort(() => Math.random() - 0.5).slice(0, 14);
                setRecProducts((prev) => {
                    // Удаляем заглушечные данные и добавляем новые
                    const filteredProducts = prev.filter(product => !loadingProductsData.includes(product));
                    return [...filteredProducts, ...shuffledProducts];
                });
            });
        }
    };

    useEffect(() => {
        const token = Cookies.get('access_token')
        fetchSimilarProducts(product.id, token).then(res => {
            setCompilations(res)
        })


        if (token) {
            const {user_id} = jwtDecode(token)
            fetchLastSeen2(token, user_id).then(res => setLastSeen(res))
        } else {
            let arr
            if (Cookies.get('last_seen')) {
                arr = Cookies.get('last_seen').trim().split(' ')
                if (arr[0] !== '') {
                    fetchProductsByArray(arr, token).then(res => setLastSeen(res))
                }
            }
        }

        const url = generateQueryForRecommendations(productFull); // Формируем query
        const gender = Cookies.get('selected_gender');
        if (gender && !("gender" in url)) {
            const loadingProductsData = desktopStore.isDesktop ? [
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
            ] : [
                {
                    "id": -1,
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
                    "id": -2,
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
            setRecProducts(loadingProductsData);
            fetchProductsPage({...url, gender}, token).then(res => {
                // setRecProducts(res.results)
                const shuffledProducts = desktopStore.isDesktop ? res.results.sort(() => Math.random() - 0.5) : res.results.sort(() => Math.random() - 0.5).slice(0, 14);
                setRecProducts(shuffledProducts);
            })
        } else {
            const loadingProductsData = desktopStore.isDesktop ? [
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
            ] : [
                {
                    "id": -1,
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
                    "id": -2,
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
            setRecProducts(loadingProductsData);
            fetchProductsPage(url, token).then(res => {
                // setRecProducts(res.results)
                const shuffledProducts = desktopStore.isDesktop ? res.results.sort(() => Math.random() - 0.5) : res.results.sort(() => Math.random() - 0.5).slice(0, 14);
                setRecProducts(shuffledProducts);
            });
        }
    }, [router.asPath])

    useEffect(() => {
        // Обзервер для отслеживания последнего элемента
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isLoadingRecProducts) {
                    setIsLoadingRecProducts(true);
                    fetchMoreProducts().finally(() => {
                        setIsLoadingRecProducts(false);
                    });
                }
            },
            {threshold: 0.5}
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [fetchMoreProducts, isLoadingRecProducts]);


    useEffect(() => {
        const checkIsBot = () => {
            const userAgent = window.navigator.userAgent;
            const botRegex = /bot|crawler|spider|googlebot|/i;
            return botRegex.test(userAgent)
        }
        if (!product.actual_platform_price) {
            const token = Cookies.get('access_token')
            const {slug} = router.query
            const interval = setInterval(() => {
                console.log('load')
                updateOneProduct(slug, token)
                    .then(product => {
                        if (product.actual_platform_price) {
                            console.log('ok')
                            clearInterval(interval)
                            const chosenSize = productStore.sizeChosen
                            if (chosenSize) {
                                fetchShippings(product.id, chosenSize.size_for_api, token)
                                    .then(ships => {
                                        productStore.setShipps(ships)
                                        productStore.setAnim(true)
                                        setTimeout(() => {
                                            productStore.setAnim(false)
                                        }, 1000)
                                    })
                            }
                            fetchPrices(product.id, token).then((prices) => {
                                const {view_size} = chosenSize
                                if (view_size) {
                                    let foundSelected = false
                                    prices.forEach(el => {
                                        if (el.view_size === view_size) {
                                            productStore.setSizeChosen(el)
                                            foundSelected = true
                                        }
                                    })
                                    if (!foundSelected) {
                                        productStore.setSizeChosen(null)
                                    }
                                }
                                router.push(`${router.asPath}`, undefined, {scroll: false})
                            })
                        }
                    })
                    .catch(err => console.log(err))
            }, 4000)

            return () => {
                clearInterval(interval)
                productStore.setAnim(false)
            }
        }
    }, [router.asPath])
    const changeBonusesString = (value) => {
        setBonuses(value)
    }
    const brandsDisplay = () => {
        if (product.collab) {
            return product.collab.name
        } else {
            return product.brands[0].name
        }
    }
    const clickBrand = () => {
        const query = {}
        if (product.collab) {
            query.collab = product.collab.query_name
        } else {
            query.line = product.brands[0].query_name
        }
        return {
            pathname: '/products',
            query: query
        }
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setNotification('Артикул скопирован');
        }, () => {
            setNotification('Не удалось скопировать артикул');
        });
    };
    const renderParams = () => {
        const res = []
        res.push(
            <p className={s.characteristics}>
                Артикул:
                <span className={s.characteristics_text}> {product.manufacturer_sku}</span>
                <img style={{cursor: "pointer"}} width="19" height="19"
                     src="https://img.icons8.com/fluency-systems-regular/48/copy--v1.png" alt="copy--v1"
                     onClick={() => copyToClipboard(product.manufacturer_sku)}/>

            </p>
        );
        res.push(
            <p className={s.characteristics}>Дата релиза:
                <span className={s.characteristics_text}>{product.approximate_date}</span>
            </p>
        )
        const paramsObj = product.parameters
        const order = paramsObj.parameters_order
        if (order) {
            const params = {}
            for (const param of order) {
                if (param in product.parameters.parameters) {
                    params[param] = paramsObj.parameters[param]
                }
            }

            for (const key in params) {
                res.push(
                    <p className={s.characteristics}>{key}:
                        <span className={s.characteristics_text}>{params[key].join(', ')}</span>
                    </p>
                )
            }
        } else {
            for (const key in paramsObj) {
                res.push(
                    <p className={s.characteristics}>{key}:
                        <span className={s.characteristics_text}>{paramsObj[key].join(', ')}</span>
                    </p>
                )
            }
        }
        return res
    }


    const [isInWishlist, setIsInWishlist] = useState(product.in_wishlist)
    useEffect(() => {
        setIsInWishlist(product.in_wishlist)
    }, [router.asPath])


    const addToWL = async () => {
        setIsInWishlist(true)
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const data = await addToWishlist(userId, product.id, token)
        const productDetails = getProductDetail(product);
        trackAddToFavorites(productDetails)


    }
    const deleteFromWL = async () => {
        setIsInWishlist(false)
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const data = await removeFromWishlist(userId, product.id, token)
        const productDetails = getProductDetail(product);
        trackRemoveToFavorites(productDetails)

    }
    const cartAdd = async () => {
        let cart = Cookies.get('cart')
        Cookies.set('cart', cart + ' ' + productStore.shipChosen, {expires: 2772})
        const arr = Cookies.get('cart').trim().split(' ')
        productStore.setText(arr, productStore.shipChosen)
        if (userStore.isLogged) {
            const token = Cookies.get('access_token')
            const userId = userStore.id
            const data = await addToCart(userId, productStore.shipChosen, token)
        }
        const priceAsString = String(product.price.final_price);
        const productIdAsString = String(product.id);
        const productDetails = getProductDetail(product);
        trackAddToCart(productDetails)

        window._tmr = window._tmr || [];
        window._tmr.push({
            type: "reachGoal",
            id: 3470916,
            value: priceAsString, // Замените "VALUE" на необходимое значение
            goal: "addToCart",
            params: {product_id: productIdAsString} // Замените "PRODUCT_ID" на необходимое значение
        });
        cartStore.setCartCnt(cartStore.cartCnt + 1)
    }

    useEffect(() => {
        if (userStore.isLogged) {
            const token = Cookies.get('access_token')
            const userId = userStore.id
            addLastSeen(token, userId, product.id)
        }
        if (!Cookies.get('last_seen')) {
            Cookies.set('last_seen', '', {expires: 2772})
        }
        let currArr = Cookies.get('last_seen').trim().split(' ')
        const id = String(product.id)
        if (currArr.includes(id)) {
            let ind = currArr.indexOf(id)
            currArr.splice(ind, 1)
        } else {
            if (currArr.length > 7) {
                currArr.pop()
            }
        }
        currArr.unshift(id)
        const newStr = currArr.join(' ')
        Cookies.set('last_seen', newStr, {expires: 2772})
    }, [router.asPath])

    const shouldRenderBonuses = () => {
        return Number(product.price.bonus) > 0;
    }
    const hasOneTable = () => {
        let bool = false
        console.log(product.size_table_platform)
        console.log(Array.isArray(product.size_table_platform))
        if (Array.isArray(product.size_table_platform)) {
            bool = product.size_table_platform.some(
                (item) =>
                    item.table && // Убедимся, что ключ `table` существует
                    typeof item.table === 'object' && // Проверяем, что `table` — объект
                    Object.keys(item.table).length > 0 // Убедимся, что объект не пустой
            );
        } else {
            Object.values(product.size_table_platform.tables).forEach(table => {
                if (Object.keys(table).length > 0) {
                    bool = true
                }
            })
        }

        return bool
    }

    const toggle_more_open = () => {
        if (moreOpen) {
            setMoreOpen(true)
        }
        setMoreOpen(!moreOpen)
    }

    const [contentHeight, setContentHeight] = useState(desktopStore.isDesktop ? '145px' : "250px");
    const contentRef = useRef(null);
    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(moreOpen ? contentRef.current.scrollHeight + "px" : desktopStore.isDesktop ? '145px' : "250px");
            setTimeout(() => {
                setContentHeight(moreOpen ? contentRef.current.scrollHeight + "px" : desktopStore.isDesktop ? '145px' : "250px");
            }, 400)

        }
    }, [moreOpen]);
    const infoRef = useRef(null)
    const [infoBtn, setInfoBtn] = useState(true)
    const [fadeOutInvisible, setFadeOutInvisible] = useState(false)

    useEffect(() => {
        setMoreOpen(false)
        if (contentRef && contentRef.current.clientHeight > 144) {
            setInfoBtn(true)
        } else {
            setInfoBtn(false)
            setFadeOutInvisible(true);
        }
    }, [router.asPath])

    const [receivedWelcomeGift, setReceivedWelcomeGift] = useState('')

    useEffect(() => {
        setReceivedWelcomeGift(Cookies.get('receivedWelcomeGift'))
    }, [])


    // useEffect(() => {
    //     setInfoBtn(false)
    //     setMoreOpen(true)
    //     setTimeout(() => {
    //         if (contentRef && contentRef.current.clientHeight > 200) {
    //             setInfoBtn(true)
    //         }
    //         setMoreOpen(false)
    //     }, 200)
    // }, [router.asPath])
    function changeBrowserColor(color) {
        // Для Chrome, Firefox, Opera на Android
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', color);
        }

        // Для Safari на iOS (к сожалению, не все цвета поддерживаются)
        const statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
        if (statusBarMeta) {
            // Изменение цвета status-bar на iOS
            statusBarMeta.setAttribute('content', 'black-translucent'); // ограниченные возможности
        }

        // Для Microsoft Edge
        const msNavbuttonMeta = document.querySelector('meta[name="msapplication-navbutton-color"]');
        if (msNavbuttonMeta) {
            msNavbuttonMeta.setAttribute('content', color);
        }
    }

    const [howOpen, setHowOpen] = useState(false)
    const [infoOpen, setInfoOpen] = useState(false)
    const toggleHow = () => {
        setHowOpen(!howOpen)
        setTimeout(() => {
            changeBrowserColor("#000000")
        }, 10)
    }
    const closeHow = () => {
        setHowOpen(false)
        changeBrowserColor("#ffffff")
    }
    const toggleInfoModal = () => {
        setInfoOpen(!infoOpen)
    }
    const closeInfoModal = () => {
        setInfoOpen(false)
    }
    const addSpacesToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');


    const getProductDetail = (product) => {
        return {
            id: product.id.toString(),
            name: `${brandsDisplay()} ${product.model} ${product.colorway}`,
            price: product.min_price,
            brand: brandsDisplay()
        };
    };

    useEffect(() => {
        trackViewProduct(getProductDetail(product))
    }, [product.id]);

    const [selectedGender, setSelectedGender] = useState("any")

    useEffect(() => {
        if (Cookies.get('selected_gender')) {
            setSelectedGender(Cookies.get('selected_gender'))
        }
        // Проверяем, что скрипт еще не добавлен
        if (!document.getElementById('boxberry-script')) {
            // Создаем элемент script

            // Преобразуем значения в строки, если они ожидаются как строки
            const priceAsString = String(product.price.final_price);
            const productIdAsString = String(product.id);

            // Отправляем событие goal tracking при загрузке компонента
            window._tmr = window._tmr || [];
            window._tmr.push({
                type: "reachGoal",
                id: 3470916,
                value: priceAsString,
                goal: "viewProduct",
                params: {product_id: productIdAsString}
            });

            // Функция очистки (вызывается при размонтировании компонента)
        }
    }, []); // Пустой массив зависимостей гарантирует выполнение эффекта только один раз при монтировании компонента

    const productPageMainPageLinkImage = selectedGender === "any" ? productPageMainPageLinkAny : selectedGender === "M" ? productPageMainPageLinkMen : productPageMainPageLinkWomen
    const productPageMainPageLinkImageMob = selectedGender === "any" ? productPageMainPageLinkAnyMob : selectedGender === "M" ? productPageMainPageLinkMenMob : productPageMainPageLinkWomenMob

    const [isClicked, setIsClicked] = useState(false);

    const handleShareClick = () => {
        navigator.clipboard.writeText(`https://sellout.su/products/${product.slug}`).then(() => {
            setNotification('Ссылка скопирована');
        }, () => {
            setNotification('Не удалось скопировать ссылку');
        });

        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
        }, 300);  // Duration of the animation
    };

    const renderParametersForMobBlock = () => {
        const params = [];

        // Добавляем Артикул, если он есть
        if (product.manufacturer_sku) {
            params.push(
                <div className={s.parameter} key="Артикул">
                    <div className={s.parameterName}>Артикул</div>
                    <div className={s.parameterValue}>{product.manufacturer_sku}</div>
                </div>
            );
            params.push(<div className={s.verticalLine} key="Артикул"></div>);
        }

        // Добавляем Дату релиза, если она есть
        if (product.approximate_date) {
            params.push(
                <div className={s.parameter} key="Дата релиза">
                    <div className={s.parameterName}>Дата релиза</div>
                    <div className={s.parameterValue}>{product.approximate_date}</div>
                </div>
            );
            params.push(<div className={s.verticalLine} key="Дата релиза"></div>);
        }

        // Получаем остальные параметры
        const paramsObj = product.parameters;
        const order = paramsObj.parameters_order;

        if (order) {
            // Идем по порядку из order
            for (const param of order) {
                if (param in paramsObj.parameters) {
                    const value = paramsObj.parameters[param].join(', ');
                    params.push(
                        <div className={s.parameter} key={param}>
                            <div className={s.parameterName}>{param}</div>
                            <div className={s.parameterValue}>{value}</div>
                        </div>
                    );
                    params.push(<div className={s.verticalLine} key={`${param}-line`}></div>);
                }
            }
        } else {
            // Идем по всем параметрам, если порядок не указан
            for (const key in paramsObj.parameters) {
                const value = paramsObj.parameters[key].join(', ');
                params.push(
                    <div className={s.parameter} key={key}>
                        <div className={s.parameterName}>{key}</div>
                        <div className={s.parameterValue}>{value}</div>
                    </div>
                );
                params.push(<div className={s.verticalLine} key={`${key}-line`}></div>);
            }
        }

        // Убираем последнюю вертикальную линию, если есть параметры
        if (params.length > 0 && params[params.length - 1].type === 'div') {
            params.pop();
        }

        return params;
    };

    const [contactOpen, setContactOpen] = useState(false);
    const toggleContact = () => {
        setContactOpen(!contactOpen);
    };

    const closeContact = () => {
        setContactOpen(false);
    };

    const [giftsModalOpen, setGiftsModalOpen] = useState(false);

    const toggleGifts = () => {
        setGiftsModalOpen((prev) => !prev);
        document.body.classList.add('body-scroll-clip')
    };

    const handleGiftsModalClose = () => {
        setGiftsModalOpen(false); // Закрытие модалки извне
        document.body.classList.remove('body-scroll-clip')
    };

    return (
        <MainLayout>
            <Head>
                <title>{`Заказать ${brandsDisplay()} ${product.model} ${product.colorway} по выгодной цене на Sellout!`}</title>
                <meta property="og:image" content={product.bucket_link[0].url}/>
                <meta property="og:image:width" content="640px"/>
                <meta property="og:image:height" content="410px"/>
                <meta property="og:title"
                      content={`Заказать ${brandsDisplay()} ${product.model} ${product.colorway} по выгодной цене на Sellout!`}/>
                <meta property="og:description"
                      content={`Оригинал ${brandsDisplay()} ${product.model} ${product.colorway} можно заказать прямо сейчас. Выгодные цены и бонусы ждут вас. Сделайте свой шаг в мир моды.`}/>

                {/*<meta name={'description'} content={`Закажите ${brandsDisplay()} ${product.model} ${product.colorway} в интернет-магазине SELLOUT. Выгодные цены. Доставка по всей России. Бонусы к первому заказу.`}/>*/}
                <meta name={'description'}
                      content={`Оригинал ${brandsDisplay()} ${product.model} ${product.colorway} можно заказать прямо сейчас. Выгодные цены и бонусы ждут вас. Сделайте свой шаг в мир моды.`}/>
            </Head>
            {/*<InvisibleCaptcha isValidToken={product.is_valid_captcha_token}/>*/}
            <div className={s.container}>
                {notification && (
                    <Notification
                        message={notification}
                        onClose={() => setNotification(null)}
                    />
                )}
                <div className={s.row + ' custom_cont'} itemScope itemType="https://schema.org/Product">

                    <meta itemProp="description"
                          content={`Оригинал ${brandsDisplay()} ${product.model} ${product.colorway} можно заказать прямо сейчас. Выгодные цены и бонусы ждут вас. Сделайте свой шаг в мир моды.`}/>

                    <div className={s.col1}>

                        {/*{desktopStore.isDesktop && <BreadcrumbC list={product.list_lines}/>}*/}
                        {!desktopStore.isDesktop &&
                            <div style={{position: "relative", marginTop: '10px'}}>
                                <div itemProp="name">
                                    <div itemProp="brand">
                                        <Link href={clickBrand()} className={s.brand}>{brandsDisplay()}</Link>
                                    </div>
                                    <div className={s.model} itemProp="model">{product.model}</div>
                                    <div className={s.color}>{product.colorway}</div>
                                </div>
                                <div className={s.iconContainer}>
                                    <StarRating rating={product.score_product_page} n={product.id}/>
                                </div>
                                {/*<div className={s.iconContainer}>*/}
                                {/*    <Image*/}
                                {/*        src={shareIcon}*/}
                                {/*        alt="Share"*/}
                                {/*        className={isClicked ? `${s.shareIcon} ${s.clicked}` : s.shareIcon}*/}
                                {/*        onClick={handleShareClick}*/}
                                {/*    />*/}
                                {/*</div>*/}
                            </div>
                        }
                        {
                            product.bucket_link.length > 1
                                ?
                                <div className={s.slider}>
                                    {/*<Splide aria-label="My Favorite Images"*/}
                                    {/*        options={{*/}
                                    {/*            type: 'loop',*/}
                                    {/*            pagination: false,*/}
                                    {/*            paginationKeyboard: true,*/}
                                    {/*            keyboard: true,*/}
                                    {/*            focus: 'center',*/}
                                    {/*            speed: isDesktop ? 800 : 400*/}
                                    {/*        }}*/}
                                    {/*        hasTrack={false}*/}
                                    {/*>*/}
                                    {/*    <SplideTrack>*/}
                                    {/*        {*/}
                                    {/*            product.bucket_link.map(el =>*/}
                                    {/*                <SplideSlide className={s.photo} key={el.id}>*/}
                                    {/*                    <Image src={el.url}*/}
                                    {/*                           alt={`${brandsDisplay()} ${product.model} ${product.colorway}`}*/}
                                    {/*                           fill={true}*/}
                                    {/*                           loading={'eager'}*/}
                                    {/*                           style={{objectFit: 'contain'}}*/}
                                    {/*                    />*/}
                                    {/*                </SplideSlide>*/}
                                    {/*            )*/}
                                    {/*        }*/}
                                    {/*    </SplideTrack>*/}
                                    {/*    <div className="splide__arrows">*/}
                                    {/*        <button className="splide__arrow splide__arrow--prev">*/}
                                    {/*            <Image src={left} alt='' width={20}/>*/}
                                    {/*        </button>*/}
                                    {/*        <button className="splide__arrow splide__arrow--next" ref={buttonRef}>*/}
                                    {/*            <Image src={right} alt='' width={20}/>*/}
                                    {/*        </button>*/}
                                    {/*    </div>*/}
                                    {/*</Splide>*/}
                                    <div className={s.photo}>
                                        <ImgSlider photos={product.bucket_link} key={router.asPath}/>
                                    </div>
                                </div>
                                :
                                <div className={s.slider}
                                >
                                    <div className={s.photo}>
                                        <Image src={product.bucket_link[0].url}
                                               itemProp="image"
                                               alt={`${brandsDisplay()} ${product.model} ${product.colorway}`}
                                               fill={true}
                                               loading={'eager'}
                                               style={{objectFit: 'contain'}}
                                        />
                                    </div>
                                </div>

                        }
                        {!desktopStore.isDesktop &&
                            <>
                                {
                                    prices.length > 0 &&
                                    <div style={{marginBottom: '20px'}}>
                                        <span itemProp="offers" itemScope itemType="https://schema.org/Offer"
                                              className={(product.price.start_price > product.price.final_price) ? s.price_sale : s.price_default}
                                        >
                                            <span>от </span><span>{addSpacesToNumber(product.price.final_price)}</span><span>₽</span>


                                            {product.is_fast_shipping &&
                                                <Image src={truck} alt="" className={s.icons}/>}
                                            {product.is_return && <Image src={refund} alt="" className={s.icons}/>}
                                            <meta itemProp="price" content={product.price.final_price}/>
                                            <meta itemProp="priceCurrency" content="RUB"/>
                                            <meta itemProp="availability" content="OnlineOnly"/>
                                        </span>
                                        {(product.price.start_price > product.price.final_price) &&
                                            <span className={s.price_default}
                                                  style={{
                                                      textDecoration: 'line-through',
                                                      fontSize: '17px'
                                                  }}> {addSpacesToNumber(product.price.start_price)} ₽
                                            </span>
                                        }

                                        <br/>
                                        {
                                            shouldRenderBonuses() &&
                                            <p className={s.bonuses_block}>
                                                <Image src={gift} alt='' className={s.bonus_icon}/> <span
                                                className={s.bonuses}> {bonuses}₽</span> бонусов
                                                в подарок!
                                            </p>
                                        }
                                        {
                                            userData && userData.user_status && !userData.user_status.base &&
                                            <div className={s.privText}>
                                                <Image src={ffIcon} alt=''
                                                       width={100}
                                                       height={80}
                                                       className={s.priv_icon}
                                                />
                                                <div>
                                                    <span className={s.privTextPart}>{userStore.firstName}, привилегии и максимальная скидка уже учтены!<br/>Однако сейчас цена на сайте может отличаться от лучшего предложения, поэтому напишите&nbsp;
                                                        {userData.personalManager && userData.personalManager === "Марк Фельдман" ? (
                                                            <a href={'https://t.me/markermann'} target={'_blank'}
                                                               style={{
                                                                   textDecoration: 'underline',
                                                                   cursor: 'pointer',
                                                                   color: '#83052F'
                                                               }}>Марку</a>
                                                        ) : (
                                                            <span onClick={toggleContact} style={{
                                                                textDecoration: 'underline',
                                                                cursor: 'pointer'
                                                            }}>нам</span>
                                                        )}, и, может, мы подберем еще более приятную цену!)</span>
                                                </div>

                                            </div>
                                        }
                                    </div>
                                }
                                {
                                    prices.length > 0 &&
                                    <div className={s.modals_block}>
                                        {
                                            hasOneTable() &&
                                            <SizeTable tables={product.size_table_platform}
                                                       photo={product.bucket_link[0].url} key={product.id}/>
                                        }
                                        {/*<SizeHelp model={`${brandsDisplay()} ${product.model}`}*/}
                                        {/*          imgSrc={product.bucket_link[0].url} manySizes={product.has_many_sizes}*/}
                                        {/*          str={product.size_table_platform?.size_fit_recommendation ?? ''}/>*/}
                                    </div>
                                }
                                {
                                    prices.length > 0
                                        ?
                                        <SizeChoice prices={prices} productId={product.id}
                                                    config={product.size_row_name} manySizes={product.has_many_sizes}
                                                    isDesktop={desktopStore.isDesktop}/>
                                        :
                                        <p className={s.grey_text}>Товара нет в наличии</p>
                                }
                                {
                                    productStore.sizeChosen &&
                                    <>
                                        <div className={s.btn_group}>
                                            <RenderBtns btns={productStore.shipps} changeBonuses={changeBonusesString}/>
                                        </div>
                                        <div className={s.taxIncludedText}>Таможенные пошлины и другие комиссии включены
                                            в стоимость
                                        </div>
                                    </>
                                }
                                {
                                    productStore.sizeChosen &&
                                    <div className={s.how}>
                                        <HowToChoose/>
                                    </div>}
                                <div className={s.btn_group}>
                                    <button className={s.cart_btn}
                                            disabled={!productStore.shipChosen || productStore.text[0] === 'У'}
                                            onClick={cartAdd}
                                    >
                                        {productStore.text}
                                    </button>
                                    {
                                        userStore.isLogged
                                            ?
                                            <button className={s.fav_btn}
                                                    onClick={() => {
                                                        isInWishlist ? deleteFromWL() : addToWL()
                                                    }}
                                            >
                                                <div className={s.icon_block} key={router.asPath}>
                                                    <Image src={isInWishlist ? like_fill : like} alt=""
                                                           style={{width: '22px', height: '22px'}}/>
                                                    {/*<div>{isInWishlist ? 'В избранном' : 'В избранное'}</div>*/}
                                                </div>
                                            </button>
                                            :
                                            <div className={s.fav_btn}>
                                                <AuthModal fromWishlist={true}>
                                                    <div className={s.icon_block}>
                                                        <Image src={like} alt="" style={{
                                                            width: '22px',
                                                            height: '22px',
                                                            marginLeft: '12px'
                                                        }}/>
                                                        {/*<Image src={like} alt="" style={{ width: '22px', height: '22px'}}/>*/}
                                                        {/*<div>В избранное</div>*/}
                                                    </div>
                                                </AuthModal>
                                            </div>
                                    }
                                </div>

                                <TextModalDesktopProductPage title={'Нашли дешевле?'}>
                                    <Image src={cashStack1} alt='' width={80}/>
                                    <h4 className={'my-3'}>Нашли тот же товар дешевле?</h4>
                                    <div className={s.arrows_section} style={{marginLeft: -5}}>
                                        <Image src={ffIcon} alt='' width={100}/>
                                        <div className={s.arrows_block}>
                                            <div>
                                                Информация о конкуренте
                                            </div>
                                            <div className={s.arrows_cont}>
                                                <Image src={twoArrows} alt='' fill={true} className={s.arrow_img}/>
                                            </div>
                                            <div>
                                                Лучшая цена
                                            </div>
                                        </div>
                                        <Image src={selloutIcon} alt='' width={70}/>
                                    </div>
                                    <p className={s.text}>
                                        Пришлите информацию о предложении конкурента, а мы гарантированно подберем для
                                        вас более выгодное!
                                    </p>
                                    <div className='d-flex flex-row align-items-center justify-content-between'
                                         style={{marginBottom: '30px'}}>
                                        {/* Telegram */}
                                        <a
                                            href='https://t.me/sellout_official'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className={`${s.button} mb-3`}
                                            style={{
                                                backgroundColor: '#24A1DE',
                                                color: '#fff',
                                                width: '48%',
                                                textAlign: 'center',
                                                padding: '10px 0',
                                                borderRadius: '5px',
                                                textDecoration: 'none'
                                            }}>
                                            Телеграм
                                        </a>

                                        {/* WhatsApp */}
                                        <a
                                            href='https://wa.me/message/L2OINP6KNMNLA1'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className={`${s.button} mb-3`}
                                            style={{
                                                backgroundColor: '#128c7e',
                                                color: '#fff',
                                                width: '48%',
                                                textAlign: 'center',
                                                padding: '10px 0',
                                                borderRadius: '5px',
                                                textDecoration: 'none'
                                            }}>
                                            WhatsApp
                                        </a>
                                    </div>
                                    <p className={s.text}>
                                        Мы стараемся держать лидирующую позицию на российском рынке брендовой одежды и
                                        обуви, поэтому тщательно мониторим конкурентов и стремимся предлагать нашим
                                        клиентам
                                        лучшие цены! Одна из наших ключевых ценностей - это самые выгодные цены на
                                        широчайший ассортимент брендовой, стильной, премиальной одежды, обуви и
                                        аксессуаров.
                                        Поэтому если вы нашли более низкую цену у наших конкурентов, <span
                                        style={{fontWeight: '600'}}>причем речь не
                                        только о крупнейших российских сетях и премиальных бутиках, но и о любых
                                        сервисах, магазинах из любых стран</span>, смело пишите нам, и мы
                                        обязательно сделаем для вас наилучшее предложение!

                                    </p>
                                    <div className={s.faq_block}>
                                        <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                        <LoyaltyFAQ
                                            title={'Цена в другом месте слишком низкая, и вы думаете, что там продают подделки, что делать?'}>
                                            Да, если цена разительно ниже нашей, то это явный признак неоригинального
                                            товара, однако все равно присылайте нам, где вы наткнулись на подозрительное
                                            предложения, а мы в свою очередь расскажем вам и объективно докажем,
                                            является ли
                                            данный магазин магазином подделок. Не стесняйтесь писать нам об этом, быть
                                            может, наши опытные специалисты
                                            уберегут вас от покупки подделки!

                                        </LoyaltyFAQ>
                                        <LoyaltyFAQ
                                            title={'Куда присылать информацию о том, что вы нашли более выгодное предложение?'}>
                                            Вы можете написать нам любым удобным для вас способом и прислать в любом
                                            формате
                                            информацию о предложении конкурентов: ссылка, контакы в соц. сетях, скриншот
                                            и.т.д.
                                            <br/>
                                            Наши контакты:
                                            <div>
                                                <div>
                                                    Почта: <a href={'mailto:customerservice@sellout.su'}
                                                              className={'text-black'}>customerservice@sellout.su</a>
                                                </div>
                                                <div>
                                                    WhatsApp: <a href={'https://wa.me/message/L2OINP6KNMNLA1'}
                                                                 target={'_blank'}
                                                                 className={'text-black'}>+7 993 896-92-27</a>
                                                </div>
                                                <div>
                                                    Telegram: <a href={'https://t.me/sellout_official'}
                                                                 target={'_blank'}
                                                                 className={'text-black'}>@sellout_official</a>
                                                </div>
                                            </div>
                                        </LoyaltyFAQ>
                                    </div>
                                    <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}
                                                                                               className={s.link}
                                                                                               target={'_blank'}>FAQ</Link>
                                    </h5>
                                </TextModalDesktopProductPage>
                                <hr style={{marginTop: '10px', color: '#51031D', opacity: '1'}}/>
                                {!receivedWelcomeGift &&
                                    <div className={`${s.promoBanner} ${selectedGender === "F" ? s.womenBanner : ''}`}>
                                        <span className={s.promoText}>До 5000₽ в подарок</span>
                                        <button className={s.promoButton} onClick={toggleGifts}>Получить</button>
                                    </div>
                                }
                                <button
                                    className={s.how_btn}
                                    onClick={toggleHow}
                                >
                                    <Image src={aboutUs2} alt="" className={s.icon_about_us}/>
                                    <div className={s.label}>
                                        Откуда у нас выбор из 2’000’000+ товаров и
                                        выгоднейшие цены: на 30-70% ниже всех в РФ
                                    </div>
                                </button>
                                <TextModalDesktopProductPage title={'Гарантии оригинальности и отзывы'} img={warranty}>
                                    <Image src={shield} alt='' width={60}/>
                                    <h4 className={'my-3'}>Гарантии оригинальности и качества</h4>
                                    <p className={s.text}>
                                        На SELLOUT продаются только 100% оригинальные и новые вещи. Мы бережно относимся
                                        к своей репутации и не допускаем подделок. Мы сотрудничаем только с проверенными
                                        бутиками, магазинами и продавцами. Каждый товар перед отправкой покупателю
                                        проходит тщательные проверки на оригинальность и качество. Наша команда состоит
                                        из специалистов, которые уже более 5 лет занимаются проверкой подлинности
                                        одежды, обуви и прочих аксессуаров, а также использует передовые технологии
                                        искусственного интеллекта, чтобы исключить человеческий фактор.

                                    </p>
                                    <h5 className={'mb-3 mt-5'}>Вы можете найти нас во всех соц. сетях и посмотреть
                                        отзывы, подробнее прочитать <Link href={'/about'} className={s.link}
                                                                          target={'_blank'}>про нашу компанию</Link>, а
                                        также изучить отзывы на интернет ресурсах:</h5>
                                    <div className={s.icons_block}>
                                        <div className={s.socialsCont}>
                                            <a style={{height: '45px'}}>
                                                <Image src={igBlack} height={45} alt="" className={s.icon}/>
                                            </a>
                                            <span className={s.mainSocialsText}>
                                                  Запретграм: <br/> @sellout_platform
                                            </span>
                                        </div>

                                        <div className={s.socialsCont}>
                                            <a href={'https://t.me/selloutsu'} style={{height: '45px'}}>
                                                <Image src={tgBlack} height={45} alt="" className={s.icon}/>
                                            </a>
                                            <span className={s.mainSocialsText}>
                                                  Телеграм: <br/>
                                                  @<a href="https://t.me/selloutsu" className={s.linkTgSocials}>
                                                    selloutsu
                                                  </a>
                                            </span>
                                        </div>
                                    </div>
                                    <div className={s.icons_block}>
                                        <iframe
                                            src="https://www.yandex.ru/sprav/widget/rating-badge/108238948174?type=rating&theme=dark"
                                            width="150" height="50" frameBorder="0"></iframe>
                                        {/*<a id="zoon_widget_210x40_dark"*/}
                                        {/*   href="https://zoon.ru/service/657ee85a79a80027cf0274d7/">*/}
                                        {/*    <img src="https://zoon.ru/wg/210x40/657ee85a79a80027cf0274d7/dark/"*/}
                                        {/*         alt="Интернет-магазин Sellout" title="Интернет-магазин Sellout"*/}
                                        {/*         width="210" height="40"/>*/}
                                        {/*</a>*/}
                                    </div>
                                    <Image src={patch} alt='' width={60} className={'mt-3'}/>
                                    <h5 className={'my-3'}>Какие этапы проверки проходит каждый товар?</h5>
                                    <Image src={personCheck} alt='' width={60}/>
                                    <h5 className={'my-3'}>Проверка партнера</h5>
                                    <p className={s.text}>
                                        Перед тем как оказаться на платформе SELLOUT, мы тщательно проверяем наших
                                        контрагентов. Мы работаем только с крупнейшими международными ресурсами с
                                        многомиллиардными оборотами и годами проверенными продавцами, а также частными
                                        коллекционерами, деятелями искусства и моды и публичными персонами.

                                    </p>
                                    <Image src={file} alt='' width={60}/>
                                    <h5 className={'my-3'}>Многоэтапная проверка</h5>
                                    <p className={s.text}>
                                        Несмотря на надёжность каждого партнера, мы дополнительно проверяем каждый товар
                                        по прибытии к нам на склад. Мы можем запросить дополнительную проверку у
                                        независимых экспертов, если сомневаемся в оригинальности товара. Лишь после
                                        этого мы приложим к товару сертификат подлинности и сопутствующий комплект,
                                        подтверждающий оригинальность (пломбы, наклейки и.т.д) и отправим вам заказ!

                                    </p>
                                    <Image src={creditCard} alt='' width={60}/>
                                    <h5 className={'my-3'}>Безопасная оплата</h5>
                                    <p className={s.text}>
                                        Деньги на вашем счету замораживаются и списываются лишь после того, как ваш
                                        заказ повторно успешно пройдет все проверки на оригинальность и качество! В ином
                                        случае деньги будут незамедлительно разморожены и станут доступными на вашем
                                        счете.
                                    </p>
                                    <div className={s.faq_block}>
                                        <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                        <LoyaltyFAQ
                                            title={'Что делать, если сомневаетесь в оригинальности или качестве?'}>
                                            Если вы считаете, что вам привезли подделку или бракованный товар, можете
                                            смело обращаться в службу поддержки, и мы разберемся в вашей ситуации. Мы
                                            проведем ряд дополнительных проверок, а также призовем независимых экспертов
                                            для вынесения объективного вердикта. Мы настоятельно рекомендуем фиксировать
                                            на видео факт получения и вскрытия заказа, чтобы избежать двояких ситуаций!
                                            Согласно нашим правилам, за попытку продажи через платформу Sellout
                                            неоригинального товара следуют большие штрафы, конфискация товара и отказ от
                                            сотрудничества с партнером. Торговля контрафактом карается законом, наша
                                            компания занимается исключительно легальным и прозрачным бизнесом.

                                        </LoyaltyFAQ>
                                    </div>
                                    <h5 style={{marginBottom: '30px'}}>Ответы на большинство вопросов вы найдете
                                        здесь: <Link href={'/faq'}
                                                     className={s.link}
                                                     target={'_blank'}>FAQ</Link>
                                    </h5>
                                    <div className={s.page2}>
                                        <Image src={imgUs4Mob} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                    <div className={s.page2}>
                                        <Image src={imgUs5Mob} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                    <div className={s.page2}>
                                        <Image src={imgUs6Mob} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                    <div className={s.page2}>
                                        <Image src={imgUs7Mob} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                    <div className={s.page2}>
                                        <Image src={imgUs8Mob} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                    <div className={s.page2}>
                                        <Image src={imgUs9Mob} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                    <div className={s.page2}>
                                        <Image src={imgUs10Mob} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                    <div className={s.page2}>
                                        <Image src={imgUs11Mob} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                </TextModalDesktopProductPage>
                                <div className={s.containerParamsMob} onClick={toggleInfoModal}>
                                    {/* Верхняя часть */}
                                    <div className={s.section}>
                                        <span>Доставка&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Оплата&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Возврат&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Бонусы&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Вопросы&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Изменилась цена?</span>
                                    </div>
                                    {/* Линия по центру */}
                                    <div className={s.centerLine}></div>
                                    {/* Нижняя часть (пока такая же) */}
                                    {/* Нижняя часть с параметрами */}
                                    <div className={s.parametersSection}>
                                        <span className={s.parametersTitle}>Параметры:</span>

                                        <div className={s.parametersContainer}>
                                            {renderParametersForMobBlock()}
                                        </div>
                                    </div>
                                    <Image src={arrow} alt='' className={s.arrowParamsMob}/>
                                </div>
                                <TreeLine list={product.list_lines}/>
                                <Link href={selectedGender === "any" ? "/" : selectedGender === "M" ? "/men" : "/women"}
                                      className={s.containerMain}>
                                    <Image
                                        src={productPageMainPageLinkImageMob}
                                        alt=""
                                        className={s.image}
                                        layout="responsive"
                                        width={700} // Укажите нужную ширину
                                        height={400} // Укажите нужную высоту
                                    />
                                </Link>
                            </>
                        }
                        {desktopStore.isDesktop &&
                            <TreeLine list={product.list_lines}/>}
                        {desktopStore.isDesktop
                            ?
                            <div ref={contentRef}
                                 className={[s.more, moreOpen ? s.more_open : ""].join(" ")}
                                 style={{maxHeight: contentHeight}}>

                                {/*<div className={s.more} style={moreOpen ? {height: 'fit-content'} : {height: desktopStore.isDesktop ? '145px': "175px"}}*/}
                                {/*     ref={contentRef}>*/}
                                <div className={s.row}>
                                    <div className={s.col60}>
                                        <span itemScope itemType="https://schema.org/Brand">
                                        <div itemProp="name" className={s.model}>{brandsDisplay()}</div>
                                    </span>

                                        <div className={s.more_color}>{product.colorway}</div>
                                        <div className={s.more_color}>{parseHtml(product.extra_name)}</div>
                                        <p className={s.description}>
                                            {product.description}
                                        </p>
                                    </div>
                                    <div className={s.col40}>
                                        <div className={s.characteristics_title}>Характеристики товара:</div>
                                        {renderParams()}
                                    </div>
                                </div>

                                {/* Градиент для плавного исчезновения внизу */}
                                <div className={`${moreOpen || fadeOutInvisible ? s.invisible : s.fadeOut}`}></div>
                            </div>
                            :
                            <div ref={contentRef}></div>
                            // <div ref={contentRef}
                            //      className={s.more_open}
                            // >
                            //     <ProductDetailsMob key={product.id} product={product} ref={contentRef}
                            //                        style={{maxHeight: contentHeight}}></ProductDetailsMob></div>
                        }

                        {
                            desktopStore.isDesktop && infoBtn &&
                            <div className='d-flex justify-content-center'>
                                <button
                                    className={s.more_btn}
                                    onClick={toggle_more_open}>
                                    <div className={s.more_text}>
                                        Подробнее
                                        <Arrow isOpen={moreOpen}/>
                                    </div>
                                </button>
                            </div>
                        }
                    </div>
                    <div className={s.col2}>
                        {desktopStore.isDesktop &&
                            <>
                                <div>
                                    <StarRating rating={product.score_product_page} n={product.id}/>
                                    <div itemProp="name">
                                        <Link href={clickBrand()} className={s.brand}
                                        >{brandsDisplay()}</Link>
                                        <div className={s.model}>{product.model}</div>
                                        <div className={s.color}>{product.colorway}</div>
                                    </div>
                                </div>
                                {
                                    prices.length > 0 &&
                                    <div style={{marginBottom: '30px'}}>
                                        {(product.price.start_price > product.price.final_price) &&
                                            <div className={s.price_default}
                                                 style={{textDecoration: 'line-through', fontSize: '17px'}}>
                                                {addSpacesToNumber(product.price.start_price)} ₽
                                            </div>
                                        }
                                        <div itemProp="offers" itemScope itemType="https://schema.org/Offer"
                                             className={(product.price.start_price > product.price.final_price) ? s.price_sale : s.price_default}
                                        >
                                            <span> от </span><span>{addSpacesToNumber(product.price.final_price)} </span><span>₽</span>


                                            {product.is_fast_shipping &&
                                                <Image src={truck} alt="" className={s.icons}/>}
                                            {product.is_return && <Image src={refund} alt="" className={s.icons}/>}
                                            <meta itemProp="price" content={product.price.final_price}/>
                                            <meta itemProp="priceCurrency" content="RUB"/>
                                            <meta itemProp="availability" content="OnlineOnly"/>
                                        </div>
                                        {
                                            shouldRenderBonuses() &&
                                            <p className={s.bonuses_block}>
                                                <Image src={gift} alt='' className={s.bonus_icon}/> <span
                                                className={s.bonuses}> {bonuses}₽</span> бонусов
                                                в подарок!
                                            </p>
                                        }
                                        {
                                            userData && userData.user_status && !userData.user_status.base &&
                                            <div className={s.privText}>
                                                <Image src={ffIcon} alt=''
                                                       width={100}
                                                       height={80}
                                                       className={s.priv_icon}
                                                />
                                                <div>
                                                    <span className={s.privTextPart}>{userStore.firstName}, привилегии и максимальная скидка уже учтены!<br/>Однако сейчас цена на сайте может отличаться от лучшего предложения, поэтому напишите&nbsp;
                                                        {userData.personalManager && userData.personalManager === "Марк Фельдман" ? (
                                                            <a href={'https://t.me/markermann'} target={'_blank'}
                                                               style={{
                                                                   textDecoration: 'underline',
                                                                   cursor: 'pointer',
                                                                   color: '#83052F'
                                                               }}>Марку</a>
                                                        ) : (
                                                            <span onClick={toggleContact} style={{
                                                                textDecoration: 'underline',
                                                                cursor: 'pointer'
                                                            }}>нам</span>
                                                        )}, и, может, мы подберем еще более приятную цену!)</span>
                                                </div>

                                            </div>
                                        }
                                    </div>
                                }
                                {
                                    prices.length > 0 &&
                                    <div className={s.modals_block}>
                                        {
                                            hasOneTable() &&
                                            <SizeTable tables={product.size_table_platform}
                                                       photo={product.bucket_link[0].url}/>
                                        }

                                        <SizeHelp model={`${brandsDisplay()} ${product.model}`}
                                                  imgSrc={product.bucket_link[0].url} manySizes={product.has_many_sizes}
                                                  str={product.size_table_platform?.size_fit_recommendation ?? ''}
                                        />
                                    </div>
                                }
                                {
                                    prices.length > 0
                                        ?
                                        <SizeChoice prices={prices} productId={product.id}
                                                    config={product.size_row_name} manySizes={product.has_many_sizes}
                                                    isDesktop={desktopStore.isDesktop}/>
                                        :
                                        <p className={s.grey_text}>Товара нет в наличии</p>
                                }
                                {
                                    productStore.shipps.length > 0 &&
                                    <>
                                        <div className={s.btn_group}>
                                            <RenderBtns btns={productStore.shipps} changeBonuses={changeBonusesString}/>
                                        </div>
                                        <div className={s.taxIncludedText}>Таможенные пошлины и другие комиссии включены
                                            в стоимость
                                        </div>
                                    </>
                                }
                                {productStore.sizeChosen &&
                                    <div className={s.how}>
                                        <HowToChoose/>
                                    </div>}

                                <div className={s.btn_group}>
                                    <button className={s.cart_btn2}
                                            disabled={!productStore.shipChosen || productStore.text[0] === 'У'}
                                            onClick={cartAdd}
                                    >
                                        {productStore.text}
                                    </button>
                                    {
                                        userStore.isLogged
                                            ?
                                            <button className={s.fav_btn2}
                                                    onClick={() => {
                                                        isInWishlist ? deleteFromWL() : addToWL()
                                                    }}
                                            >
                                                <div className={s.icon_block}>
                                                    <Image src={isInWishlist ? like_fill : like} alt=""
                                                           className={s.icons} style={{width: '27px', height: '27px'}}/>
                                                </div>
                                            </button>
                                            :
                                            <div className={s.fav_btn2}>
                                                <AuthModal fromWishlist={true}>
                                                    <div className={s.icon_block}>
                                                        <Image src={like} alt="" className={s.icons}
                                                               style={{width: '27px', height: '27px'}}/>
                                                    </div>
                                                </AuthModal>
                                            </div>
                                    }
                                </div>
                                <TextModalDesktopProductPage title={'Нашли дешевле?'}>
                                    <Image src={cashStack1} alt='' width={80}/>
                                    <h4 className={'my-3'}>Нашли тот же товар дешевле?</h4>
                                    <div className={s.arrows_section} style={{marginLeft: -5}}>
                                        <Image src={ffIcon} alt='' width={100}/>
                                        <div className={s.arrows_block}>
                                            <div>
                                                Информация о конкуренте
                                            </div>
                                            <div className={s.arrows_cont}>
                                                <Image src={twoArrows} alt='' fill={true} className={s.arrow_img}/>
                                            </div>
                                            <div>
                                                Лучшая цена
                                            </div>
                                        </div>
                                        <Image src={selloutIcon} alt='' width={80}/>
                                    </div>
                                    <p className={s.text}>
                                        Пришлите информацию о предложении конкурента, а мы гарантированно подберем для
                                        вас более выгодное!
                                    </p>
                                    <div className='d-flex flex-row align-items-center justify-content-between'
                                         style={{marginBottom: '30px'}}>
                                        {/* Telegram */}
                                        <a
                                            href='https://t.me/sellout_official'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className={`${s.button} mb-3`}
                                            style={{
                                                backgroundColor: '#24A1DE',
                                                color: '#fff',
                                                width: '48%',
                                                textAlign: 'center',
                                                padding: '10px 0',
                                                borderRadius: '5px',
                                                textDecoration: 'none'
                                            }}>
                                            Телеграм
                                        </a>

                                        {/* WhatsApp */}
                                        <a
                                            href='https://wa.me/message/L2OINP6KNMNLA1'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className={`${s.button} mb-3`}
                                            style={{
                                                backgroundColor: '#128c7e',
                                                color: '#fff',
                                                width: '48%',
                                                textAlign: 'center',
                                                padding: '10px 0',
                                                borderRadius: '5px',
                                                textDecoration: 'none'
                                            }}>
                                            WhatsApp
                                        </a>
                                    </div>
                                    <p className={s.text}>
                                        Мы стараемся держать лидирующую позицию на российском рынке брендовой одежды и
                                        обуви, поэтому тщательно мониторим конкурентов и стремимся предлагать нашим
                                        клиентам
                                        лучшие цены! Одна из наших ключевых ценностей - это самые выгодные цены на
                                        широчайший ассортимент брендовой, стильной, премиальной одежды, обуви и
                                        аксессуаров.
                                        Поэтому если вы нашли более низкую цену у наших конкурентов, <span
                                        style={{fontWeight: '600'}}>причем речь не
                                        только о крупнейших российских сетях и премиальных бутиках, но и о любых
                                        сервисах, магазинах из любых стран</span>, смело пишите нам, и мы
                                        обязательно сделаем для вас наилучшее предложение!

                                    </p>
                                    <div className={s.faq_block}>
                                        <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                        <LoyaltyFAQ
                                            title={'Цена в другом месте слишком низкая, и вы думаете, что там продают подделки, что делать?'}>
                                            Да, если цена разительно ниже нашей, то это явный признак неоригинального
                                            товара, однако все равно присылайте нам, где вы наткнулись на подозрительное
                                            предложения, а мы в свою очередь расскажем вам и объективно докажем,
                                            является ли
                                            данный магазин магазином подделок. Не стесняйтесь писать нам об этом, быть
                                            может, наши опытные специалисты
                                            уберегут вас от покупки подделки!

                                        </LoyaltyFAQ>
                                        <LoyaltyFAQ
                                            title={'Куда присылать информацию о том, что вы нашли более выгодное предложение?'}>
                                            Вы можете написать нам любым удобным для вас способом и прислать в любом
                                            формате
                                            информацию о предложении конкурентов: ссылка, контакы в соц. сетях, скриншот
                                            и.т.д.
                                            <br/>
                                            Наши контакты:
                                            <div>
                                                <div>
                                                    Почта: <a href={'mailto:customerservice@sellout.su'}
                                                              className={'text-black'}>customerservice@sellout.su</a>
                                                </div>
                                                <div>
                                                    WhatsApp: <a href={'https://wa.me/message/L2OINP6KNMNLA1'}
                                                                 target={'_blank'}
                                                                 className={'text-black'}>+7 993 896-92-27</a>
                                                </div>
                                                <div>
                                                    Telegram: <a href={'https://t.me/sellout_official'}
                                                                 target={'_blank'}
                                                                 className={'text-black'}>@sellout_official</a>
                                                </div>
                                            </div>
                                        </LoyaltyFAQ>
                                    </div>
                                    <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}
                                                                                               className={s.link}
                                                                                               target={'_blank'}>FAQ</Link>
                                    </h5>
                                </TextModalDesktopProductPage>
                                <hr className={'my-2'} style={{color: '#51031D', opacity: '1'}}/>
                                {!receivedWelcomeGift &&
                                    <div className={`${s.promoBanner} ${selectedGender === "F" ? s.womenBanner : ''}`}>
                                        <span className={s.promoText}>До 5000₽ в подарок</span>
                                        <button className={s.promoButton} onClick={toggleGifts}>Получить</button>
                                    </div>
                                }
                                <button
                                    className={s.how_btn}
                                    onClick={toggleHow}
                                >
                                    <Image src={aboutUs2} alt="" className={s.icon_about_us}/>
                                    <div className={s.label}>
                                        Откуда у нас широчайший ассортимент: 2’000’000+ товаров и самые выгодные цены в
                                        РФ: на 30-70% ниже большинства?
                                    </div>
                                </button>
                                <TextModalDesktopProductPage title={'Гарантии оригинальности и отзывы'} img={warranty}>
                                    <Image src={shield} alt='' width={60}/>
                                    <h4 className={'my-3'}>Гарантии оригинальности и качества</h4>
                                    <p className={s.text}>
                                        На SELLOUT продаются только 100% оригинальные и новые вещи. Мы бережно относимся
                                        к
                                        своей репутации и не допускаем подделок. Мы сотрудничаем только с проверенными
                                        бутиками, магазинами и продавцами. Каждый товар перед отправкой покупателю
                                        проходит
                                        тщательные проверки на оригинальность и качество. Наша команда состоит из
                                        специалистов, которые уже более 5 лет занимаются проверкой подлинности одежды,
                                        обуви
                                        и прочих аксессуаров, а также использует передовые технологии искусственного
                                        интеллекта, чтобы исключить человеческий фактор.

                                    </p>
                                    <h5 className={'mb-3 mt-5'}>Вы можете найти нас во всех соц. сетях и посмотреть
                                        отзывы,
                                        подробнее прочитать <Link href={'/about'} className={s.link} target={'_blank'}>про
                                            нашу компанию</Link>, а также изучить отзывы на интернет ресурсах</h5>
                                    <div className={s.icons_block}>
                                        <div className={s.socialsCont}>
                                            <a style={{height: '45px'}}>
                                                <Image src={igBlack} height={45} alt="" className={s.icon}/>
                                            </a>
                                            <span className={s.mainSocialsText}>
                                                  Запретграм: <br/> @sellout_platform
                                            </span>
                                        </div>

                                        <div className={s.socialsCont}>
                                            <a href={'https://t.me/selloutsu'} style={{height: '45px'}}>
                                                <Image src={tgBlack} height={45} alt="" className={s.icon}/>
                                            </a>
                                            <span className={s.mainSocialsText}>
                                                  Телеграм: <br/>
                                                  @<a href="https://t.me/selloutsu" className={s.linkTgSocials}>
                                                    selloutsu
                                                  </a>
                                            </span>
                                        </div>

                                        <iframe
                                            src="https://www.yandex.ru/sprav/widget/rating-badge/108238948174?type=rating&theme=dark"
                                            width="150" height="50" frameBorder="0"></iframe>
                                        {/*<a id="zoon_widget_210x40_dark"*/}
                                        {/*   href="https://zoon.ru/service/657ee85a79a80027cf0274d7/">*/}
                                        {/*    <img src="https://zoon.ru/wg/210x40/657ee85a79a80027cf0274d7/dark/"*/}
                                        {/*         alt="Интернет-магазин Sellout" title="Интернет-магазин Sellout"*/}
                                        {/*         width="210" height="40"/>*/}
                                        {/*</a>*/}
                                    </div>
                                    <Image src={patch} alt='' width={60} className={'mt-3'}/>
                                    <h5 className={'my-3'}>Какие этапы проверки проходит каждый товар?</h5>
                                    <Image src={personCheck} alt='' width={60}/>
                                    <h5 className={'my-3'}>Проверка партнера</h5>
                                    <p className={s.text}>
                                        Перед тем как оказаться на платформе SELLOUT, мы тщательно проверяем наших
                                        контрагентов. Мы работаем только с крупнейшими международными ресурсами с
                                        многомиллиардными оборотами и годами проверенными продавцами, а также частными
                                        коллекционерами, деятелями искусства и моды и публичными персонами.

                                    </p>
                                    <Image src={file} alt='' width={60}/>
                                    <h5 className={'my-3'}>Многоэтапная проверка</h5>
                                    <p className={s.text}>
                                        Несмотря на надёжность каждого партнера, мы дополнительно проверяем каждый товар
                                        по
                                        прибытии к нам на склад. Мы можем запросить дополнительную проверку у
                                        независимых
                                        экспертов, если сомневаемся в оригинальности товара. Лишь после этого мы
                                        приложим к
                                        товару сертификат подлинности и сопутствующий комплект, подтверждающий
                                        оригинальность (пломбы, наклейки и.т.д) и отправим вам заказ!

                                    </p>
                                    <Image src={creditCard} alt='' width={60}/>
                                    <h5 className={'my-3'}>Безопасная оплата</h5>
                                    <p className={s.text}>
                                        Деньги на вашем счету замораживаются и списываются лишь после того, как ваш
                                        заказ
                                        повторно успешно пройдет все проверки на оригинальность и качество! В ином
                                        случае
                                        деньги будут незамедлительно разморожены и станут доступными на вашем счете.
                                    </p>
                                    <div className={s.faq_block}>
                                        <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                        <LoyaltyFAQ
                                            title={'Что делать, если сомневаетесь в оригинальности или качестве?'}>
                                            Если вы считаете, что вам привезли подделку или бракованный товар, можете
                                            смело
                                            обращаться в службу поддержки, и мы разберемся в вашей ситуации. Мы проведем
                                            ряд
                                            дополнительных проверок, а также призовем независимых экспертов для
                                            вынесения
                                            объективного вердикта. Мы настоятельно рекомендуем фиксировать на видео факт
                                            получения и вскрытия заказа, чтобы избежать двояких ситуаций! Согласно нашим
                                            правилам, за попытку продажи через платформу Sellout неоригинального товара
                                            следуют большие штрафы, конфискация товара и отказ от сотрудничества с
                                            партнером. Торговля контрафактом карается законом, наша компания занимается
                                            исключительно легальным и прозрачным бизнесом.

                                        </LoyaltyFAQ>
                                    </div>
                                    <h5 style={{marginBottom: '70px'}}>Ответы на большинство вопросов вы найдете
                                        здесь: <Link href={'/faq'}
                                                     className={s.link}
                                                     target={'_blank'}>FAQ</Link>
                                    </h5>
                                    <div className={s.page2}>
                                        <Image src={imgUs3} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                    <div className={s.page2}>
                                        <Image src={imgUs4} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                    <div className={s.page2}>
                                        <Image src={imgUs5} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                    <div className={s.page2}>
                                        <Image src={imgUs6} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                    <div className={s.page2}>
                                        <Image src={imgUs7} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                    <div className={s.page2}>
                                        <Image src={imgUs8} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                </TextModalDesktopProductPage>
                                <div style={{display: 'flex'}}>
                                    <TextModalDesktopProductPage width={'30%'} title={'Доставка'} img={truck}>
                                        <Image src={truck} alt='' width={60}/>
                                        <h4 className={'my-3'}>Доставка</h4>
                                        <p className={s.text}>
                                            Обратите внимание, на кнопке на странице товара указано количество дней,
                                            необходимое для доставки от
                                            продавца до нашего склада в Москве. Доставка со склада занимает от 1 дня в
                                            зависимости вашего от местоположения.<br/><br/>Мы собираем десятки миллионов
                                            предложений со всего мира: от различных бутиков,
                                            магазинов и частных коллекционеров. В связи с этим мы можем предложить вам
                                            разные
                                            условия доставки: от самых быстрых до более длительных и при этом выгодных.
                                            Выбрав
                                            размер или конфигурацию товара, вам предстоит выбрать срок доставки и
                                            соответствующую цену. Обычно мы укладываемся сильно раньше, чем указанный
                                            крайний
                                            срок, однако мы берем время с запасом, чтобы учесть все непредвиденные
                                            обстоятельства.

                                        </p>
                                        <div className={s.faq_block}>
                                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                            <LoyaltyFAQ
                                                title={'Какие существуют варианты доставок с нашего склада в Москве до вас?'}>
                                                При оформлении заказа вы указываете адрес и способ доставки. Мы
                                                доставляем,
                                                используя курьерскую службу Boxberry
                                                {/*, а также на данный момент доставка*/}
                                                {/*по*/}
                                                {/*Москве бесплатная!*/}
                                                <br/>
                                                Вы можете выбрать доставку до Пункта Выдачи Заказов (ПВЗ) Boxberry,
                                                отметив
                                                на
                                                карте нужный ПВЗ, или выбрать доставку курьером до двери.
                                                <br/>
                                                Самовывоза на данный момент нет, но скоро появится!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Как рассчитывается стоимость доставки?'}>
                                                Стоимость доставки рассчитываются автоматически на этапе оформления
                                                заказа.
                                                Она
                                                зависит от количества и веса
                                                товаров, способа и типа доставки, а также от адреса.

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Куда мы доставляем?'}>
                                                Мы доставляем по всей России службой курьерской доставки Boxberry. Очень
                                                скоро
                                                появится доставка в страны СНГ!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Какая скорость доставки со склада в Москве?'}>
                                                В зависимости от вашего города доставка занимает
                                                от одного до нескольких дней после прибытия вашего заказа на наш склад в
                                                Москве.
                                                Подробнее вы сможете отслеживать на сайте или в приложении Boxberry.

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Как отслеживать доставку?'}>
                                                Как только ваш заказ приедет на наш склад в Москве и будет отправлен
                                                курьерской
                                                службой Boxberry, вам
                                                придет уведомление на почту с информацией о трек-номере отправления, а
                                                также
                                                трек-номер появится в
                                                личном кабинете в информации о вашем заказе.
                                                <br/>
                                                Отследить заказ можно по
                                                этой <a href="https://boxberry.ru/tracking-page"
                                                        className={'text-black'}
                                                        target={'_blank'}>ссылке</a> или в мобильном приложении
                                                Boxberry.
                                                Отправление
                                                автоматически появляется в приложении, если авторизоваться под теми
                                                же данными, под которыми был выполнен заказ на нашем сайте.

                                            </LoyaltyFAQ>
                                        </div>
                                    </TextModalDesktopProductPage>
                                    <TextModalDesktopProductPage width={'30%'} title={'Оплата'} img={payment}>
                                        <Image src={payment} alt='' width={60}/>
                                        <h4 className={'my-3'}>Оплата</h4>
                                        <p className={s.text}>
                                            При оплате товара средства с вашей карты замораживаются эквайрингом, а не
                                            списываются. Далее мы должны подтвердить ваш заказ, провести дополнительный
                                            ряд
                                            проверок, если требуется, и только после этого деньги поступят к нам. Обычно
                                            подтверждение заказа происходит в кратчайшие сроки. Обо всех изменениях
                                            статуса
                                            заказа вы можете получать уведомления удобным для вас способом, а также
                                            следить
                                            за
                                            ними в личном кабинете. В случае, если заказ не удастся подтвердить, вся
                                            сумма
                                            будет
                                            незамедлительно разморожена и снова станет доступной на вашем счету.

                                        </p>
                                        <div className={s.faq_block}>
                                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                            <LoyaltyFAQ title={'Безопасная оплата'}>
                                                При оплате заказа банковской картой, обработка платежа (включая ввод
                                                номера
                                                карты) происходит на защищенной странице процессинговой системы, которая
                                                прошла
                                                международную сертификацию. Это значит, что Ваши конфиденциальные данные
                                                (реквизиты карты, регистрационные данные и др.) не поступают в
                                                интернет-магазин,
                                                их обработка полностью защищена и никто, в том числе наш
                                                интернет-магазин,
                                                не
                                                может получить персональные и банковские данные клиента. При работе с
                                                карточными
                                                данными применяется стандарт защиты информации, разработанный
                                                международными
                                                платёжными системами Visa и Masterсard-Payment Card Industry Data
                                                Security
                                                Standard (PCI DSS), что обеспечивает безопасную обработку реквизитов
                                                Банковской
                                                карты Держателя. Применяемая технология передачи данных гарантирует
                                                безопасность
                                                по сделкам с Банковскими картами путем использования протоколов Secure
                                                Sockets
                                                Layer (SSL), Verifiedby Visa, Secure Code, и закрытых банковских сетей,
                                                имеющих
                                                высшую степень защиты.
                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Какие есть способы оплаты?'}>
                                                Мы принимаем всевозможные способы оплаты: МИР, Visa, Mastercard, СБП.
                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Безопасность данных'}>
                                                Мы собираем и не разглашаем третьим лицам конфиденциальную информацию.
                                                Более
                                                подробно с политикой обработки персональных данных можно
                                                ознакомиться <a href="/docs/Политика%20конфиденциальности.pdf"
                                                                target={"_blank"}
                                                                className={'text-black'}>
                                                здесь</a>
                                                <br/>
                                                Все платежи проходят через интернет-эквайринг с использованием защиты
                                                3d-secure.
                                                <br/>
                                                Интернет-эквайринг защищен всеми нужными протоколами и имеет
                                                сертификации
                                                для
                                                создания безопасной связи между доменами при оплате. Более того,
                                                интернет-эквайринг позволяет отслеживать данные по каждой транзакции
                                                (пункт
                                                товара, сумма транзакции, статус транзакции, данные покупателя) и
                                                вовремя
                                                заподозрить вредоносные операции со стороны сотрудников, покупателей или
                                                сторонних людей (мошенников).
                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ
                                                title={'Включены ли таможенные пошлины и налоги в стоимость заказа?'}>
                                                Да, цена окончательная, никаких дополнительных платежей не потребуется!
                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Возврат средств в случае отмены заказа'}>
                                                В большинстве случаев средства при оплате не списываются, а
                                                замораживаются
                                                на
                                                вашем счете и списываются лишь после окончательного подтверждения
                                                заказа.
                                                Если
                                                нам не удастся подтвердить заказ, то деньги моментально разморозятся и
                                                вернутся
                                                на ваш счет. Вам для этого ничего делать не потребуется. Если деньги уже
                                                списались с вашего счета, то при отмене заказа деньги вернутся в течение
                                                3-10
                                                рабочих дней в зависимости от банка.

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Правила возврата средств при частичной отмене заказа'}>
                                                В большинстве случаев средства при оплате не списываются, а
                                                замораживаются
                                                на
                                                вашем счете и списываются лишь после окончательного подтверждения
                                                заказа.
                                                Если
                                                нам не удастся подтвердить заказ частично, то часть денег, которая
                                                подлежит
                                                возврату, моментально разморозится и вернется на ваш счет. Вам для этого
                                                ничего
                                                делать не потребуется. Если деньги уже списались с вашего счета, то при
                                                частичной отмене заказа часть денег вернется в течение 3-10 рабочих дней
                                                в
                                                зависимости от банка.
                                                <br/>
                                                Оплата за ту часть заказа, которая успешна подтверждена, будет списана с
                                                вашего
                                                счета.
                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Возможна ли оплата криптовалютой?'}>
                                                На сайте не предусмотрена оплата криптовалютой. В Российской Федерации
                                                запрещено
                                                принимать цифровые деньги.
                                            </LoyaltyFAQ>
                                        </div>
                                    </TextModalDesktopProductPage>
                                    <TextModalDesktopProductPage title={'Изменилась цена?'} img={change} imgSize={30}>
                                        <Image src={change} alt='' width={60}/>
                                        <h4 className={'my-3'}>Почему изменилась цена или модель оказалась
                                            распроданной?</h4>
                                        <div className={s.img_cont}>
                                            <Image src={map} alt='' className={s.img} fill={true}/>
                                        </div>
                                        <p className={s.text}>
                                            Многие представленные модели являются лимитированными и находятся в наличии
                                            в
                                            ограниченном количестве, поэтому может произойти такое, что кто-то другой
                                            купит
                                            эту
                                            позицию и данное ценовое предложение перестанет быть доступным. Мы собираем
                                            десятки
                                            миллионов предложений со всего мира, поэтому даже в короткие промежутки
                                            времени
                                            цена
                                            может меняться. В том числе на цену могут сказываться прочие внешние
                                            факторы, не
                                            зависящие от нас, такие как курс, стоимость доставки и многое другое.

                                        </p>
                                        <div className={s.faq_block}>
                                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                            <LoyaltyFAQ title={'После чего цена меняться не будет?'}>
                                                После того, как вы оформите заказ, цена для вас будет зафиксирована и
                                                никаким
                                                изменениям не подлежит. Добавление товара в корзину или избранное, к
                                                сожалению,
                                                не позволяет нам зафиксировать цену по объективным причинам. Мы
                                                стараемся в
                                                каждый момент времени предлагать вам наилучшую цену из возможных и
                                                делать
                                                ваш
                                                шопинг с нами еще более удобным и выгодным, поэтому не откладывайте ваши
                                                покупки
                                                на потом, чтобы не упустить приятные цены!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Как часто могут меняться цены?'}>
                                                Цена может не меняться как на протяжении долгого времени, так и
                                                постоянно
                                                оставаться волатильной. Она может как повыситься, так и понизиться.
                                                Вскоре
                                                мы
                                                добавим возможность следить за изменением цен, а также получать
                                                уведомления
                                                о
                                                появлении более выгодного предложения на интересующий вас лот!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Почему модель оказалась распроданной?'}>
                                                Так как многие размещенные на нашей платформе лоты являются
                                                коллекционными и
                                                редкими, может произойти такое, что какой-то конкретный размер или вся
                                                модель
                                                пропадет из наличия, поэтому не откладывайте свои покупки, чтобы успеть
                                                приобрести желанную модель!

                                            </LoyaltyFAQ>
                                        </div>
                                        <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}
                                                                                                   className={s.link}
                                                                                                   target={'_blank'}>FAQ</Link>
                                        </h5>
                                    </TextModalDesktopProductPage>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <TextModalDesktopProductPage width={'30%'} title={'Бонусы'} img={giftModal}
                                                                 imgSize={32}>
                                        <Image src={gift_gard} alt='' width={80}/>
                                        <h4 className={'my-3'}>Получайте бонусы</h4>
                                        <div className={'d-flex justify-content-evenly'} style={{marginBottom: '20px'}}>
                                            <div className={s.point_block}>
                                                <Image src={first} alt='' width={60}/>
                                                <div>за первый заказ</div>
                                                <div className={s.line}/>
                                                до 5000 ₽
                                            </div>
                                            <div className={s.point_block}>
                                                <Image src={good} alt='' width={60}/>
                                                <div>за каждый товар</div>
                                                <div className={s.line}/>
                                                до 1500 ₽
                                            </div>
                                        </div>
                                        <div className={'d-flex justify-content-evenly'}>
                                            <div className={s.point_block}>
                                                <Image src={friend} alt='' width={60}/>
                                                <div>за приглашенного друга</div>
                                                <div className={s.line}/>
                                                до 7000 ₽
                                            </div>
                                            <div className={s.point_block}>
                                                <Image src={birth} alt='' width={60}/>
                                                <div>на день рождения</div>
                                                <div className={s.line}/>
                                                1000 ₽
                                            </div>
                                        </div>
                                        <div className={'d-block'}>
                                            <Image src={smile} alt='' width={60}/>
                                            <div className={'my-3'}>И оплачивайте ими 100% от стоимости заказа!</div>
                                        </div>
                                        <p className={s.text}>
                                            Мы стараемся всячески благодарить вас за покупки на платформе SELLOUT,
                                            поэтому
                                            за
                                            каждую совершенную покупку мы будем начислять вам бонусы в соответствии с
                                            вашим
                                            статусом. Конкретное число бонусов за каждый товар вы сможете увидеть на
                                            странице
                                            товара, а также в корзине. Также мы дарим 1000 бонусных рублей за первую
                                            покупку
                                            и
                                            на ваш день рождения и регулярно начисляем бонусы в честь различных
                                            праздников!

                                        </p>
                                        <div className={s.faq_block}>
                                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                            <LoyaltyFAQ title={'Чему равны бонусы?'}>
                                                Каждый один бонус приравнивается к одному рублю! Вы можете оплачивать до
                                                100%
                                                заказа, тем самым сводя стоимость заказа к нулю!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Как воспользоваться бонусами?'}>
                                                Чтобы оплатить заказ целиком или частично бонусами, в корзине или на
                                                любом
                                                этапе
                                                оформления заказа введите количество бонусов, которое хотите списать, и
                                                скидка
                                                будет автоматически применена!
                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ
                                                title={'Как быстро после совершения покупки начисляются бонусы?'}>
                                                Обратите внимание, бонусы на ваш баланс будут начислены не сразу, а по
                                                прошествии некоторого времени. Нам требуется обработать заказ,
                                                подтвердить
                                                корректность всех данных и после этого начислить бонусы. Если вы
                                                считаете,
                                                что
                                                бонусы слишком долго не начисляются и произошла какая-то ошибка,
                                                обязательно
                                                напишите нам и мы вам поможем!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ
                                                title={'Как получить бонусы по реферальной программе, приглашая друзей?'}>
                                                Реферальная программа - это специальная возможность для вас поделиться
                                                удовлетворением от покупок с друзьями и получить взамен уникальные
                                                бонусы
                                                размером до 7000₽! Просто пригласите своих знакомых стать частью нашего
                                                сообщества, и вы оба сможете наслаждаться эксклюзивными преимуществами,
                                                такими
                                                как скидки и бонусы, созданными специально для участников нашей
                                                реферальной
                                                программы. Благодарим за доверие и ваш вклад в наше расширяющееся
                                                сообщество!
                                                Подробнее про реферальную программу
                                                смотрите <Link href={'/faq'} style={{color: 'inherit'}}>здесь</Link>
                                            </LoyaltyFAQ>
                                        </div>

                                        <div className={s.faq_block}>
                                            <h5 className={`text-center ${s.questions_text}`}>Ответы на большинство
                                                вопросов
                                                вы найдете здесь: <Link href={'/faq'} className={'text-black'}
                                                                        target={'_blank'}>FAQ</Link></h5>
                                            <h5 className={`text-center ${s.questions_text}`}>Если у вас остались
                                                вопросы,
                                                вы
                                                всегда
                                                можете обратиться в службу поддержки и мы будем
                                                рады вам помочь!</h5>
                                        </div>
                                    </TextModalDesktopProductPage>
                                    <TextModalDesktopProductPage width={'30%'} title={'Возврат'} img={returnImg}>
                                        <Image src={refund} alt='' width={60}/>
                                        <h4 className={'my-3'}>Возврат</h4>
                                        <p className={s.text}>
                                            Многие представленные на нашей платформе товары выкупаются специально под
                                            вас у
                                            частных продавцов, коллекционеров или из разных иностранных бутиков и
                                            магазинов,
                                            поэтому мы не способны предложить вам возврат товара после подтверждения
                                            заказа
                                            на
                                            все позиции.
                                        </p>
                                        <p className={s.text} style={{color: '#057e48'}}>
                                            Если вам необходимо посмотреть товар вживую, померить, определиться с
                                            размером и так далее, обязательно <span onClick={toggleContact} style={{
                                            textDecoration: 'underline',
                                            cursor: 'pointer'
                                        }}>напишите нам</span> и мы оперативно найдем решения: подберем индивидуально
                                            для вас другие предложения с возможностью примерки/возврата, подскажем по
                                            размеру или где можно посмотреть товар вживую :)
                                        </p>
                                        <p className={s.text}>
                                            Вскоре некоторые позиции будут подлежать
                                            возврату, в
                                            том
                                            числе даже эксклюзивные коллекции. Они будут помечены
                                            значком <Image src={returnImg} alt={''}/>. Обращаем внимание, что по
                                            правилам
                                            зарубежных продавцов, возврат
                                            возможен в течение 7 - 30 календарных дней с момента поставки товара на
                                            зарубежный
                                            склад. Однако срок доставки
                                            заказов от склада за рубежом до получателя в РФ может быть больше в связи с
                                            ограничениями
                                            и особенностями международной логистики. Кроме того, условия возврата могут
                                            быть
                                            связаны с
                                            особенностями законов страны, из которой товар был для вас выкуплен.
                                            Несмотря на
                                            это, SELLOUT
                                            всячески содействует по организации возврата товаров. В случае обнаружения
                                            брака
                                            или
                                            ненадлежащего качества вам необходимо связаться с нами для решения проблемы.
                                            Мы
                                            постоянно стремимся увеличить ассортимент товаров, подлежащих возврату,
                                            чтобы ваши покупки с нами стали еще более удобными!
                                        </p>
                                        <div className={s.faq_block}>
                                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                            <LoyaltyFAQ title={'Что делать, если пришел не тот товар?'}>
                                                Если вам пришёл поврежденный или несоответствующий заказу товар,
                                                откажитесь
                                                от
                                                него при получении и свяжитесь с нами для выяснения обстоятельств и
                                                урегулирования вопроса. Также мы настоятельно рекомендуем снимать
                                                процесс
                                                вскрытия товара, чтобы избежать
                                                недопониманий!
                                                <ul>
                                                    <li>Попросите у сотрудника «акт несоответствия», заполните его и
                                                        сфотографируйте.
                                                    </li>
                                                    <li>Верните товар сотруднику службы доставки и приложите к нему акт.
                                                    </li>
                                                    <li>Незамедлительно напишите нам в службу поддержки по электронному
                                                        адресу <a href={'mailto:customerservice@sellout.su'}
                                                                  className={'text-black'}>customerservice@sellout.su</a>,
                                                        прикрепите к письму фотографию акта несоответствия и укажите
                                                        проблему.
                                                    </li>
                                                    <li>Проверка заявления и возврат денежных средств осуществляются в
                                                        срок
                                                        до
                                                        10 календарных дней с момента отказа от товара при получении.
                                                    </li>
                                                </ul>
                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Что делать с неподошедшим товаром?'}>
                                                Мы искренне стараемся помочь вам в такой ситуации, поэтому обязательно
                                                напишите
                                                нам, если вам не подошел товар. Мы попробуем продать его через нашу
                                                платформу и
                                                иные каналы продажи на особых условиях для вас, и, возможно, вам даже
                                                удастся
                                                заработать!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Можно ли вернуть только часть заказа?'}>
                                                На частичный возврат товаров распространяются точно такие же правила,
                                                как и
                                                описано выше.
                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Как быстро вернутся деньги за возврат?'}>
                                                В большинстве случаев средства при оплате не списываются, а
                                                замораживаются
                                                на
                                                вашем счете и списываются лишь после окончательного подтверждения
                                                заказа.
                                                Если
                                                нам не удастся подтвердить заказ или придется его вернуть, то деньги
                                                моментально
                                                разморозятся и вернутся на ваш счет. Вам для этого ничего делать не
                                                потребуется.
                                                Если деньги уже списались с вашего счета, то при отмене или возврате
                                                заказа
                                                деньги вернутся в течение 3-10 рабочих дней в зависимости от банка.

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Можно ли отказаться от заказа до его получения?'}>
                                                Это возможно только в том случае, если заказ еще не был подтвержден и
                                                передан в
                                                обработку. Сообщите о своем желании отказаться от заказа как можно
                                                скорее на
                                                нашу почту <a href={'mailto:customerservice@sellout.su'}
                                                              className={'text-black'}>customerservice@sellout.su</a>
                                            </LoyaltyFAQ>
                                        </div>
                                        <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}
                                                                                                   className={s.link}
                                                                                                   target={'_blank'}>FAQ</Link>
                                        </h5>
                                    </TextModalDesktopProductPage>
                                    <TextModalDesktopProductPage title={'Остались вопросы?'} img={how}>
                                        <div className={s.content}>
                                            <Image src={headphones} alt='' width={60}/>
                                            <div className={s.text_cont}>
                                                <h5>Если у вас остались вопросы в том числе по данному товару, вы всегда
                                                    можете
                                                    написать в службу поддержки, и мы будем рады вам помочь!</h5>
                                                <div>
                                                    <div>
                                                        Почта: <a href={'mailto:customerservice@sellout.su'}
                                                                  className={s.link}>customerservice@sellout.su</a>
                                                    </div>
                                                    <div>
                                                        WhatsApp: <a href={'https://wa.me/message/L2OINP6KNMNLA1'}
                                                                     target={'_blank'}
                                                                     className={s.link}>+7 993 896-92-27</a>
                                                    </div>
                                                    <div>
                                                        Telegram: <a href={'https://t.me/sellout_official'}
                                                                     target={'_blank'}
                                                                     className={s.link}>@sellout_official</a>
                                                    </div>
                                                </div>
                                                <div className={s.faq_block}>
                                                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                                    <LoyaltyFAQ
                                                        title={'Что делать, если у выбранного товара отсутствует ваш размер?'}>
                                                        Так как многие представленные на нашей платформе товары являются
                                                        лимитированными, некоторые размеры
                                                        товара могут отсутствовать. Однако не стоит отчаиваться, вы
                                                        всегда
                                                        можете написать нам в службу поддержки, и мы постараемся найти
                                                        желанный лот в вашем размере или предложить похожий товар в
                                                        качестве
                                                        альтернативы!

                                                    </LoyaltyFAQ>
                                                    <LoyaltyFAQ
                                                        title={'Можно ли оформить заказ, позвонив или написав нам?'}>
                                                        Да, вы всегда можете написать нам в службу поддержки, и мы
                                                        поможем
                                                        вам и
                                                        выбрать, и оформить заказ.
                                                        Вы также можете написать нам, какой товар ищете, и мы сами
                                                        найдем
                                                        его
                                                        для вас и предложим к заказу!

                                                    </LoyaltyFAQ>
                                                    <LoyaltyFAQ title={'Где узнать больше информации о товаре?'}>
                                                        Если вы хотите узнать больше о составе, комплектации и иных
                                                        характеристиках товара, вы всегда можете обратиться к нам, и
                                                        наши
                                                        специалисты ответят на все вопросы и
                                                        предоставят исчерпывающую информацию о товаре!

                                                    </LoyaltyFAQ>
                                                    <LoyaltyFAQ title={'Можно ли примерить товар перед приобретением?'}>
                                                        К сожалению, на данный момент услуга примерки товара недоступна.
                                                        Мы
                                                        собираем предложения со всего мира, поэтому предоставить
                                                        возможность
                                                        примерить товар перед покупкой не получится. Мы ежедневно
                                                        работаем
                                                        над
                                                        тем, чтобы улучшить сервис и сделать примерку осуществимой!
                                                        Однако
                                                        вы
                                                        можете самостоятельно посетить другой магазин или бутик бренда и
                                                        примерить интересующую модель или похожую, чтобы
                                                        определиться с размером, а затем заказать на нашей платформе по
                                                        лучшей
                                                        цене ;)

                                                    </LoyaltyFAQ>
                                                    <LoyaltyFAQ
                                                        title={'Где можно примерить товар перед приобретением?'}>
                                                        Вы всегда можете обратиться в службу поддержки, и наши
                                                        специалисты
                                                        постараются помочь вам с выбором размера и подскажут, где можно
                                                        померить
                                                        интересующую модель
                                                        или похожую, чтобы затем заказать на нашей платформе по лучшей
                                                        цене
                                                        ;)

                                                    </LoyaltyFAQ>
                                                </div>
                                                <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}
                                                                                                           className={s.link}
                                                                                                           target={'_blank'}>FAQ</Link>
                                                </h5>
                                                <div>
                                                    <h5>Мы в социальных сетях:</h5>
                                                    <div className={s.icons_block}>
                                                        <div className={s.socialsCont}>
                                                            <a style={{height: '45px'}}>
                                                                <Image src={igBlack} height={40} alt=""
                                                                       className={s.icon}/>
                                                            </a>
                                                            <span className={s.mainSocialsText}>
                                                  Запретграм: <br/> @sellout_platform
                                            </span>
                                                        </div>

                                                        <div className={s.socialsCont}>
                                                            <a href={'https://t.me/selloutsu'} style={{height: '37px'}}>
                                                                <Image src={tgBlack} height={37} alt=""
                                                                       className={s.icon}/>
                                                            </a>
                                                            <span className={s.mainSocialsText}>
                                                  Телеграм: <br/>
                                                  @<a href="https://t.me/selloutsu" className={s.linkTgSocials}>
                                                    selloutsu
                                                  </a>
                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TextModalDesktopProductPage>
                                </div>

                                <Link href={selectedGender === "any" ? "/" : selectedGender === "M" ? "/men" : "/women"}
                                      className={s.containerMain}>
                                    <Image
                                        src={productPageMainPageLinkImage}
                                        alt=""
                                        className={s.image}
                                        layout="responsive"
                                        width={700} // Укажите нужную ширину
                                        height={400} // Укажите нужную высоту
                                    />
                                    <div className={s.textWrapper}>
                                        <span className={s.textMain}>Перейти на главную</span>
                                        <div className={s.arrowCont}>
                                            <Image
                                                src={productPageMainPageArrow}
                                                alt=""
                                                className={s.arrow}
                                                width={24} // Задайте ширину стрелки
                                                height={24} // Задайте высоту стрелки
                                            />
                                        </div>

                                    </div>
                                </Link>
                            </>
                        }

                        {/*{!desktopStore.isDesktop &&*/}
                        {/*    <div className={s.link_block}>*/}
                        {/*        <TextModal title={'Нашли тот же товар дешевле?'} img={cashStack}>*/}
                        {/*            <Image src={cashStack1} alt='' width={80}/>*/}
                        {/*            <h4 className={'my-3'}>Нашли тот же товар дешевле?</h4>*/}
                        {/*            <div className={s.arrows_section} style={{marginLeft: -5}}>*/}
                        {/*                <Image src={ffIcon} alt='' width={100}/>*/}
                        {/*                <div className={s.arrows_block}>*/}
                        {/*                    <div>*/}
                        {/*                        Информация о конкуренте*/}
                        {/*                    </div>*/}
                        {/*                    <div className={s.arrows_cont}>*/}
                        {/*                        <Image src={twoArrows} alt='' fill={true} className={s.arrow_img}/>*/}
                        {/*                    </div>*/}
                        {/*                    <div>*/}
                        {/*                        Лучшая цена*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*                <Image src={selloutIcon} alt='' width={70}/>*/}
                        {/*            </div>*/}
                        {/*            <p className={s.text}>*/}
                        {/*                Мы стараемся держать лидирующую позицию на российском рынке брендовой одежды и*/}
                        {/*                обуви, поэтому тщательно мониторим конкурентов и стремимся предлагать нашим*/}
                        {/*                клиентам*/}
                        {/*                лучшие цены! Одна из наших ключевых ценностей - это самые выгодные цены на*/}
                        {/*                широчайший ассортимент брендовой, стильной, премиальной одежды, обуви и*/}
                        {/*                аксессуаров.*/}
                        {/*                Поэтому если вы нашли более низкую цену у наших конкурентов, причем речь не*/}
                        {/*                только о крупнейших российских сетях и премиальных бутиках, но и о любых*/}
                        {/*                сервисах, магазинах из любых стран, смело пишите нам, и мы*/}
                        {/*                обязательно сделаем для вас наилучшее предложение!*/}

                        {/*            </p>*/}
                        {/*            <div className={s.faq_block}>*/}
                        {/*                <h5 className={'text-center'}>Часто задаваемые вопросы</h5>*/}
                        {/*                <LoyaltyFAQ*/}
                        {/*                    title={'Цена в другом месте слишком низкая, и вы думаете, что там продают подделки, что делать?'}>*/}
                        {/*                    Да, если цена разительно ниже нашей, то это явный признак неоригинального*/}
                        {/*                    товара, однако все равно присылайте нам, где вы наткнулись на подозрительное*/}
                        {/*                    предложения, а мы в свою очередь расскажем вам и объективно докажем,*/}
                        {/*                    является ли*/}
                        {/*                    данный магазин магазином подделок. Не стесняйтесь писать нам об этом, быть*/}
                        {/*                    может, наши опытные специалисты*/}
                        {/*                    уберегут вас от покупки подделки!*/}

                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ*/}
                        {/*                    title={'Куда присылать информацию о том, что вы нашли более выгодное предложение?'}>*/}
                        {/*                    Вы можете написать нам любым удобным для вас способом и прислать в любом*/}
                        {/*                    формате*/}
                        {/*                    информацию о предложении конкурентов: ссылка, контакы в соц. сетях, скриншот*/}
                        {/*                    и.т.д.*/}
                        {/*                    <br/>*/}
                        {/*                    Наши контакты:*/}
                        {/*                    <div>*/}
                        {/*                        <div>*/}
                        {/*                            Почта: <a href={'mailto:customerservice@sellout.su'}*/}
                        {/*                                      className={'text-black'}>customerservice@sellout.su</a>*/}
                        {/*                        </div>*/}
                        {/*                        <div>*/}
                        {/*                            WhatsApp: <a href={'https://wa.me/message/L2OINP6KNMNLA1'}*/}
                        {/*                                         target={'_blank'}*/}
                        {/*                                         className={'text-black'}>+7 993 896-92-27</a>*/}
                        {/*                        </div>*/}
                        {/*                        <div>*/}
                        {/*                            Telegram: <a href={'https://t.me/sellout_official'}*/}
                        {/*                                         target={'_blank'}*/}
                        {/*                                         className={'text-black'}>@sellout_official</a>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                </LoyaltyFAQ>*/}
                        {/*            </div>*/}
                        {/*            <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}*/}
                        {/*                                                                       className={s.link}*/}
                        {/*                                                                       target={'_blank'}>FAQ</Link>*/}
                        {/*            </h5>*/}
                        {/*        </TextModal>*/}
                        {/*        <TextModal title={'Нужно узнать больше о товаре или остались другие вопросы?'}*/}
                        {/*                   img={how}>*/}
                        {/*            <div className={s.content}>*/}
                        {/*                <Image src={headphones} alt='' width={60}/>*/}
                        {/*                <div className={s.text_cont}>*/}
                        {/*                    <h5>Если у вас остались вопросы в том числе по данному товару, вы всегда*/}
                        {/*                        можете*/}
                        {/*                        написать в службу поддержки, и мы будем рады вам помочь!</h5>*/}
                        {/*                    <div>*/}
                        {/*                        <div>*/}
                        {/*                            Почта: <a href={'mailto:customerservice@sellout.su'}*/}
                        {/*                                      className={s.link}>customerservice@sellout.su</a>*/}
                        {/*                        </div>*/}
                        {/*                        <div>*/}
                        {/*                            WhatsApp: <a href={'https://wa.me/message/L2OINP6KNMNLA1'}*/}
                        {/*                                         target={'_blank'}*/}
                        {/*                                         className={s.link}>+7 993 896-92-27</a>*/}
                        {/*                        </div>*/}
                        {/*                        <div>*/}
                        {/*                            Telegram: <a href={'https://t.me/sellout_official'}*/}
                        {/*                                         target={'_blank'}*/}
                        {/*                                         className={s.link}>@sellout_official</a>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                    <div className={s.faq_block}>*/}
                        {/*                        <h5 className={'text-center'}>Часто задаваемые вопросы</h5>*/}
                        {/*                        <LoyaltyFAQ*/}
                        {/*                            title={'Что делать, если у выбранного товара отсутствует ваш размер?'}>*/}
                        {/*                            Так как многие представленные на нашей платформе товары являются*/}
                        {/*                            лимитированными, некоторые размеры*/}
                        {/*                            товара могут отсутствовать. Однако не стоит отчаиваться, вы всегда*/}
                        {/*                            можете написать нам в службу поддержки, и мы постараемся найти*/}
                        {/*                            желанный лот в вашем размере или предложить похожий товар в качестве*/}
                        {/*                            альтернативы!*/}

                        {/*                        </LoyaltyFAQ>*/}
                        {/*                        <LoyaltyFAQ*/}
                        {/*                            title={'Можно ли оформить заказ, позвонив или написав нам?'}>*/}
                        {/*                            Да, вы всегда можете написать нам в службу поддержки, и мы поможем*/}
                        {/*                            вам и*/}
                        {/*                            выбрать, и оформить заказ.*/}
                        {/*                            Вы также можете написать нам, какой товар ищете, и мы сами найдем*/}
                        {/*                            его*/}
                        {/*                            для вас и предложим к заказу!*/}

                        {/*                        </LoyaltyFAQ>*/}
                        {/*                        <LoyaltyFAQ title={'Где узнать больше информации о товаре?'}>*/}
                        {/*                            Если вы хотите узнать больше о составе, комплектации и иных*/}
                        {/*                            характеристиках товара, вы всегда можете обратиться к нам, и наши*/}
                        {/*                            специалисты ответят на все вопросы и*/}
                        {/*                            предоставят исчерпывающую информацию о товаре!*/}

                        {/*                        </LoyaltyFAQ>*/}
                        {/*                        <LoyaltyFAQ title={'Можно ли примерить товар перед приобретением?'}>*/}
                        {/*                            К сожалению, на данный момент услуга примерки товара недоступна. Мы*/}
                        {/*                            собираем предложения со всего мира, поэтому предоставить возможность*/}
                        {/*                            примерить товар перед покупкой не получится. Мы ежедневно работаем*/}
                        {/*                            над*/}
                        {/*                            тем, чтобы улучшить сервис и сделать примерку осуществимой! Однако*/}
                        {/*                            вы*/}
                        {/*                            можете самостоятельно посетить другой магазин или бутик бренда и*/}
                        {/*                            примерить интересующую модель или похожую, чтобы*/}
                        {/*                            определиться с размером, а затем заказать на нашей платформе по*/}
                        {/*                            лучшей*/}
                        {/*                            цене ;)*/}

                        {/*                        </LoyaltyFAQ>*/}
                        {/*                        <LoyaltyFAQ title={'Где можно примерить товар перед приобретением?'}>*/}
                        {/*                            Вы всегда можете обратиться в службу поддержки, и наши специалисты*/}
                        {/*                            постараются помочь вам с выбором размера и подскажут, где можно*/}
                        {/*                            померить*/}
                        {/*                            интересующую модель*/}
                        {/*                            или похожую, чтобы затем заказать на нашей платформе по лучшей цене*/}
                        {/*                            ;)*/}

                        {/*                        </LoyaltyFAQ>*/}
                        {/*                    </div>*/}
                        {/*                    <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}*/}
                        {/*                                                                               className={s.link}*/}
                        {/*                                                                               target={'_blank'}>FAQ</Link>*/}
                        {/*                    </h5>*/}
                        {/*                    <div>*/}
                        {/*                        <h5>Мы в социальных сетях:</h5>*/}
                        {/*                        <div className={s.icons_block}>*/}
                        {/*                            <a href={'https://t.me/selloutsu'}>*/}
                        {/*                                <Image src={tg} width={50} alt="" className={s.icon}/>*/}
                        {/*                            </a>*/}
                        {/*                            <a href={'https://vk.com/sellout_official'}>*/}
                        {/*                                <Image src={vk} width={63} alt="" className={s.icon}/>*/}
                        {/*                            </a>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </TextModal>*/}
                        {/*        <button*/}
                        {/*            className={s.how_btn}*/}
                        {/*            onClick={toggleHow}*/}
                        {/*        >*/}
                        {/*            <Image src={aboutUs} alt="" className={s.icon_about_us}/>*/}
                        {/*            <div className={s.label}>*/}
                        {/*                Как мы работаем?*/}
                        {/*            </div>*/}
                        {/*        </button>*/}
                        {/*        <hr className={'my-2'}/>*/}
                        {/*        <TextModal title={'Гарантии оригинальности и отзывы'} img={warranty}>*/}
                        {/*            <Image src={shield} alt='' width={60}/>*/}
                        {/*            <h4 className={'my-3'}>Гарантии оригинальности и качества</h4>*/}
                        {/*            <p className={s.text}>*/}
                        {/*                На SELLOUT продаются только 100% оригинальные и новые вещи. Мы бережно относимся*/}
                        {/*                к*/}
                        {/*                своей репутации и не допускаем подделок. Мы сотрудничаем только с проверенными*/}
                        {/*                бутиками, магазинами и продавцами. Каждый товар перед отправкой покупателю*/}
                        {/*                проходит*/}
                        {/*                тщательные проверки на оригинальность и качество. Наша команда состоит из*/}
                        {/*                специалистов, которые уже более 5 лет занимаются проверкой подлинности одежды,*/}
                        {/*                обуви*/}
                        {/*                и прочих аксессуаров, а также использует передовые технологии искусственного*/}
                        {/*                интеллекта, чтобы исключить человеческий фактор.*/}

                        {/*            </p>*/}
                        {/*            <h5 className={'mb-3 mt-5'}>Вы можете найти нас во всех соц. сетях и посмотреть*/}
                        {/*                отзывы,*/}
                        {/*                подробнее прочитать <Link href={'/about'} className={s.link} target={'_blank'}>про*/}
                        {/*                    нашу компанию</Link>, а также изучить отзывы на интернет ресурсах</h5>*/}
                        {/*            <div className={s.icons_block}>*/}
                        {/*                <a href={'https://t.me/selloutsu'}>*/}
                        {/*                    <Image src={tg} width={50} alt="" className={s.icon}/>*/}
                        {/*                </a>*/}
                        {/*                <a href={'https://vk.com/sellout_official'}>*/}
                        {/*                    <Image src={vk} width={63} alt="" className={s.icon}/>*/}
                        {/*                </a>*/}
                        {/*                /!*<a href={'https://www.instagram.com/sellout.su'}>*!/*/}
                        {/*                /!*    <Image src={inst_star} width={50} alt="" className={s.icon}/>*!/*/}
                        {/*                /!*</a>*!/*/}
                        {/*            </div>*/}
                        {/*            <div className={s.icons_block}>*/}
                        {/*                <iframe*/}
                        {/*                    src="https://www.yandex.ru/sprav/widget/rating-badge/108238948174?type=rating&theme=dark"*/}
                        {/*                    width="150" height="50" frameBorder="0"></iframe>*/}
                        {/*                <a id="zoon_widget_210x40_dark"*/}
                        {/*                   href="https://zoon.ru/service/657ee85a79a80027cf0274d7/">*/}
                        {/*                    <img src="https://zoon.ru/wg/210x40/657ee85a79a80027cf0274d7/dark/"*/}
                        {/*                         alt="Интернет-магазин Sellout" title="Интернет-магазин Sellout"*/}
                        {/*                         width="210" height="40"/>*/}
                        {/*                </a>*/}
                        {/*            </div>*/}
                        {/*            <Image src={patch} alt='' width={60} className={'mt-3'}/>*/}
                        {/*            <h5 className={'my-3'}>Какие этапы проверки проходит каждый товар?</h5>*/}
                        {/*            <Image src={personCheck} alt='' width={60}/>*/}
                        {/*            <h5 className={'my-3'}>Проверка партнера</h5>*/}
                        {/*            <p className={s.text}>*/}
                        {/*                Перед тем как оказаться на платформе SELLOUT, мы тщательно проверяем наших*/}
                        {/*                контрагентов. Мы работаем только с крупнейшими международными ресурсами с*/}
                        {/*                многомиллиардными оборотами и годами проверенными продавцами, а также частными*/}
                        {/*                коллекционерами, деятелями искусства и моды и публичными персонами.*/}

                        {/*            </p>*/}
                        {/*            <Image src={file} alt='' width={60}/>*/}
                        {/*            <h5 className={'my-3'}>Многоэтапная проверка</h5>*/}
                        {/*            <p className={s.text}>*/}
                        {/*                Несмотря на надёжность каждого партнера, мы дополнительно проверяем каждый товар*/}
                        {/*                по*/}
                        {/*                прибытии к нам на склад. Мы можем запросить дополнительную проверку у*/}
                        {/*                независимых*/}
                        {/*                экспертов, если сомневаемся в оригинальности товара. Лишь после этого мы*/}
                        {/*                приложим к*/}
                        {/*                товару сертификат подлинности и сопутствующий комплект, подтверждающий*/}
                        {/*                оригинальность (пломбы, наклейки и.т.д) и отправим вам заказ!*/}

                        {/*            </p>*/}
                        {/*            <Image src={creditCard} alt='' width={60}/>*/}
                        {/*            <h5 className={'my-3'}>Безопасная оплата</h5>*/}
                        {/*            <p className={s.text}>*/}
                        {/*                Деньги на вашем счету замораживаются и списываются лишь после того, как ваш*/}
                        {/*                заказ*/}
                        {/*                повторно успешно пройдет все проверки на оригинальность и качество! В ином*/}
                        {/*                случае*/}
                        {/*                деньги будут незамедлительно разморожены и станут доступными на вашем счете.*/}
                        {/*            </p>*/}
                        {/*            <div className={s.faq_block}>*/}
                        {/*                <h5 className={'text-center'}>Часто задаваемые вопросы</h5>*/}
                        {/*                <LoyaltyFAQ*/}
                        {/*                    title={'Что делать, если сомневаетесь в оригинальности или качестве?'}>*/}
                        {/*                    Если вы считаете, что вам привезли подделку или бракованный товар, можете*/}
                        {/*                    смело*/}
                        {/*                    обращаться в службу поддержки, и мы разберемся в вашей ситуации. Мы проведем*/}
                        {/*                    ряд*/}
                        {/*                    дополнительных проверок, а также призовем независимых экспертов для*/}
                        {/*                    вынесения*/}
                        {/*                    объективного вердикта. Мы настоятельно рекомендуем фиксировать на видео факт*/}
                        {/*                    получения и вскрытия заказа, чтобы избежать двояких ситуаций! Согласно нашим*/}
                        {/*                    правилам, за попытку продажи через платформу Sellout неоригинального товара*/}
                        {/*                    следуют большие штрафы, конфискация товара и отказ от сотрудничества с*/}
                        {/*                    партнером. Торговля контрафактом карается законом, наша компания занимается*/}
                        {/*                    исключительно легальным и прозрачным бизнесом.*/}

                        {/*                </LoyaltyFAQ>*/}
                        {/*            </div>*/}
                        {/*            <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}*/}
                        {/*                                                                       className={s.link}*/}
                        {/*                                                                       target={'_blank'}>FAQ</Link>*/}
                        {/*            </h5>*/}
                        {/*        </TextModal>*/}
                        {/*        <TextModal title={'Доставка, оплата, возврат'} img={payment}>*/}
                        {/*            <Image src={truck} alt='' width={60}/>*/}
                        {/*            <h4 className={'my-3'}>Доставка</h4>*/}
                        {/*            <p className={s.text}>*/}
                        {/*                Обратите внимание, на кнопке на странице товара указано количество дней,*/}
                        {/*                необходимое для доставки от*/}
                        {/*                продавца до нашего склада в Москве. Доставка со склада занимает от 1 дня в*/}
                        {/*                зависимости вашего от местоположения.<br/><br/>Мы собираем десятки миллионов*/}
                        {/*                предложений со всего мира: от различных бутиков,*/}
                        {/*                магазинов и частных коллекционеров. В связи с этим мы можем предложить вам*/}
                        {/*                разные*/}
                        {/*                условия доставки: от самых быстрых до более длительных и при этом выгодных.*/}
                        {/*                Выбрав*/}
                        {/*                размер или конфигурацию товара, вам предстоит выбрать срок доставки и*/}
                        {/*                соответствующую цену. Обычно мы укладываемся сильно раньше, чем указанный*/}
                        {/*                крайний*/}
                        {/*                срок, однако мы берем время с запасом, чтобы учесть все непредвиденные*/}
                        {/*                обстоятельства.*/}

                        {/*            </p>*/}
                        {/*            <div className={s.faq_block}>*/}
                        {/*                <h5 className={'text-center'}>Часто задаваемые вопросы</h5>*/}
                        {/*                <LoyaltyFAQ*/}
                        {/*                    title={'Какие существуют варианты доставок с нашего склада в Москве до вас?'}>*/}
                        {/*                    При оформлении заказа вы указываете адрес и способ доставки. Мы доставляем,*/}
                        {/*                    используя курьерскую службу Boxberry, а также на данный момент доставка по*/}
                        {/*                    Москве бесплатная!*/}
                        {/*                    <br/>*/}
                        {/*                    Вы можете выбрать доставку до Пункта Выдачи Заказов (ПВЗ) Boxberry, отметив*/}
                        {/*                    на*/}
                        {/*                    карте нужный ПВЗ, или выбрать доставку курьером до двери.*/}
                        {/*                    <br/>*/}
                        {/*                    Самовывоза на данный момент нет, но скоро появится!*/}

                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ title={'Как рассчитывается стоимость доставки?'}>*/}
                        {/*                    Стоимость доставки рассчитываются автоматически на этапе оформления заказа.*/}
                        {/*                    Она*/}
                        {/*                    зависит от количества и веса*/}
                        {/*                    товаров, способа и типа доставки, а также от адреса.*/}

                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ title={'Куда мы доставляем?'}>*/}
                        {/*                    Мы доставляем по всей России службой курьерской доставки Boxberry. Очень*/}
                        {/*                    скоро*/}
                        {/*                    появится доставка в страны СНГ!*/}

                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ title={'Какая скорость доставки со склада в Москве?'}>*/}
                        {/*                    В зависимости от вашего города доставка занимает*/}
                        {/*                    от одного до нескольких дней после прибытия вашего заказа на наш склад в*/}
                        {/*                    Москве.*/}
                        {/*                    Подробнее вы сможете отслеживать на сайте или в приложении Boxberry.*/}

                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ title={'Как отслеживать доставку?'}>*/}
                        {/*                    Как только ваш заказ приедет на наш склад в Москве и будет отправлен*/}
                        {/*                    курьерской*/}
                        {/*                    службой Boxberry, вам*/}
                        {/*                    придет уведомление на почту с информацией о трек-номере отправления, а также*/}
                        {/*                    трек-номер появится в*/}
                        {/*                    личном кабинете в информации о вашем заказе.*/}
                        {/*                    <br/>*/}
                        {/*                    Отследить заказ можно по*/}
                        {/*                    этой <a href="https://boxberry.ru/tracking-page" className={'text-black'}*/}
                        {/*                            target={'_blank'}>ссылке</a> или в мобильном приложении Boxberry.*/}
                        {/*                    Отправление*/}
                        {/*                    автоматически появляется в приложении, если авторизоваться под теми*/}
                        {/*                    же данными, под которыми был выполнен заказ на нашем сайте.*/}

                        {/*                </LoyaltyFAQ>*/}
                        {/*            </div>*/}


                        {/*            <Image src={payment} alt='' width={60}/>*/}
                        {/*            <h4 className={'my-3'}>Оплата</h4>*/}
                        {/*            <p className={s.text}>*/}
                        {/*                При оплате товара средства с вашей карты замораживаются эквайрингом, а не*/}
                        {/*                списываются. Далее мы должны подтвердить ваш заказ, провести дополнительный ряд*/}
                        {/*                проверок, если требуется, и только после этого деньги поступят к нам. Обычно*/}
                        {/*                подтверждение заказа происходит в кратчайшие сроки. Обо всех изменениях статуса*/}
                        {/*                заказа вы можете получать уведомления удобным для вас способом, а также следить*/}
                        {/*                за*/}
                        {/*                ними в личном кабинете. В случае, если заказ не удастся подтвердить, вся сумма*/}
                        {/*                будет*/}
                        {/*                незамедлительно разморожена и снова станет доступной на вашем счету.*/}

                        {/*            </p>*/}
                        {/*            <div className={s.faq_block}>*/}
                        {/*                <h5 className={'text-center'}>Часто задаваемые вопросы</h5>*/}
                        {/*                <LoyaltyFAQ title={'Безопасная оплата'}>*/}
                        {/*                    При оплате заказа банковской картой, обработка платежа (включая ввод номера*/}
                        {/*                    карты) происходит на защищенной странице процессинговой системы, которая*/}
                        {/*                    прошла*/}
                        {/*                    международную сертификацию. Это значит, что Ваши конфиденциальные данные*/}
                        {/*                    (реквизиты карты, регистрационные данные и др.) не поступают в*/}
                        {/*                    интернет-магазин,*/}
                        {/*                    их обработка полностью защищена и никто, в том числе наш интернет-магазин,*/}
                        {/*                    не*/}
                        {/*                    может получить персональные и банковские данные клиента. При работе с*/}
                        {/*                    карточными*/}
                        {/*                    данными применяется стандарт защиты информации, разработанный международными*/}
                        {/*                    платёжными системами Visa и Masterсard-Payment Card Industry Data Security*/}
                        {/*                    Standard (PCI DSS), что обеспечивает безопасную обработку реквизитов*/}
                        {/*                    Банковской*/}
                        {/*                    карты Держателя. Применяемая технология передачи данных гарантирует*/}
                        {/*                    безопасность*/}
                        {/*                    по сделкам с Банковскими картами путем использования протоколов Secure*/}
                        {/*                    Sockets*/}
                        {/*                    Layer (SSL), Verifiedby Visa, Secure Code, и закрытых банковских сетей,*/}
                        {/*                    имеющих*/}
                        {/*                    высшую степень защиты.*/}
                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ title={'Какие есть способы оплаты?'}>*/}
                        {/*                    Мы принимаем всевозможные способы оплаты: МИР, Visa, Mastercard, СБП.*/}
                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ title={'Безопасность данных'}>*/}
                        {/*                    Мы собираем и не разглашаем третьим лицам конфиденциальную информацию. Более*/}
                        {/*                    подробно с политикой обработки персональных данных можно*/}
                        {/*                    ознакомиться <a href="/docs/Политика%20конфиденциальности.pdf"*/}
                        {/*                                    target={"_blank"}*/}
                        {/*                                    className={'text-black'}>*/}
                        {/*                    здесь</a>*/}
                        {/*                    <br/>*/}
                        {/*                    Все платежи проходят через интернет-эквайринг с использованием защиты*/}
                        {/*                    3d-secure.*/}
                        {/*                    <br/>*/}
                        {/*                    Интернет-эквайринг защищен всеми нужными протоколами и имеет сертификации*/}
                        {/*                    для*/}
                        {/*                    создания безопасной связи между доменами при оплате. Более того,*/}
                        {/*                    интернет-эквайринг позволяет отслеживать данные по каждой транзакции (пункт*/}
                        {/*                    товара, сумма транзакции, статус транзакции, данные покупателя) и вовремя*/}
                        {/*                    заподозрить вредоносные операции со стороны сотрудников, покупателей или*/}
                        {/*                    сторонних людей (мошенников).*/}
                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ*/}
                        {/*                    title={'Включены ли таможенные пошлины и налоги в стоимость заказа?'}>*/}
                        {/*                    Да, цена окончательная, никаких дополнительных платежей не потребуется!*/}
                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ title={'Возврат средств в случае отмены заказа'}>*/}
                        {/*                    В большинстве случаев средства при оплате не списываются, а замораживаются*/}
                        {/*                    на*/}
                        {/*                    вашем счете и списываются лишь после окончательного подтверждения заказа.*/}
                        {/*                    Если*/}
                        {/*                    нам не удастся подтвердить заказ, то деньги моментально разморозятся и*/}
                        {/*                    вернутся*/}
                        {/*                    на ваш счет. Вам для этого ничего делать не потребуется. Если деньги уже*/}
                        {/*                    списались с вашего счета, то при отмене заказа деньги вернутся в течение*/}
                        {/*                    3-10*/}
                        {/*                    рабочих дней в зависимости от банка.*/}

                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ title={'Правила возврата средств при частичной отмене заказа'}>*/}
                        {/*                    В большинстве случаев средства при оплате не списываются, а замораживаются*/}
                        {/*                    на*/}
                        {/*                    вашем счете и списываются лишь после окончательного подтверждения заказа.*/}
                        {/*                    Если*/}
                        {/*                    нам не удастся подтвердить заказ частично, то часть денег, которая подлежит*/}
                        {/*                    возврату, моментально разморозится и вернется на ваш счет. Вам для этого*/}
                        {/*                    ничего*/}
                        {/*                    делать не потребуется. Если деньги уже списались с вашего счета, то при*/}
                        {/*                    частичной отмене заказа часть денег вернется в течение 3-10 рабочих дней в*/}
                        {/*                    зависимости от банка.*/}
                        {/*                    <br/>*/}
                        {/*                    Оплата за ту часть заказа, которая успешна подтверждена, будет списана с*/}
                        {/*                    вашего*/}
                        {/*                    счета.*/}
                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ title={'Возможна ли оплата криптовалютой?'}>*/}
                        {/*                    На сайте не предусмотрена оплата криптовалютой. В Российской Федерации*/}
                        {/*                    запрещено*/}
                        {/*                    принимать цифровые деньги.*/}
                        {/*                </LoyaltyFAQ>*/}
                        {/*            </div>*/}


                        {/*            <Image src={refund} alt='' width={60}/>*/}
                        {/*            <h4 className={'my-3'}>Возврат</h4>*/}
                        {/*            <p className={s.text}>*/}
                        {/*                Многие представленные на нашей платформе товары выкупаются специально под вас у*/}
                        {/*                частных продавцов, коллекционеров или из разных иностранных бутиков и магазинов,*/}
                        {/*                поэтому мы не способны предложить вам возврат товара после подтверждения заказа*/}
                        {/*                на*/}
                        {/*                все позиции. Однако есть ряд моделей, которые вскоре будут подлежать возврату, в*/}
                        {/*                том*/}
                        {/*                числе даже некоторые эксклюзивные коллекции. Они будут помечены*/}
                        {/*                значком <Image src={returnImg} alt={''}/>. Обращаем внимание, что по правилам*/}
                        {/*                зарубежных продавцов, возврат*/}
                        {/*                возможен в течение 7 - 30 календарных дней с момента поставки товара на*/}
                        {/*                зарубежный*/}
                        {/*                склад. Однако срок доставки*/}
                        {/*                заказов от склада за рубежом до получателя в РФ может быть больше в связи с*/}
                        {/*                ограничениями*/}
                        {/*                и особенностями международной логистики. Кроме того, условия возврата могут быть*/}
                        {/*                связаны с*/}
                        {/*                особенностями законов страны, из которой товар был для вас выкуплен. Несмотря на*/}
                        {/*                это, SELLOUT*/}
                        {/*                всячески содействует по организации возврата товаров. В случае обнаружения брака*/}
                        {/*                или*/}
                        {/*                ненадлежащего качества вам необходимо связаться с нами для решения проблемы. Мы*/}
                        {/*                постоянно стремимся увеличить ассортимент товаров, подлежащих возврату,*/}
                        {/*                чтобы ваши покупки с нами стали еще более удобными!*/}

                        {/*            </p>*/}
                        {/*            <div className={s.faq_block}>*/}
                        {/*                <h5 className={'text-center'}>Часто задаваемые вопросы</h5>*/}
                        {/*                <LoyaltyFAQ title={'Что делать, если пришел не тот товар?'}>*/}
                        {/*                    Если вам пришёл поврежденный или несоответствующий заказу товар, откажитесь*/}
                        {/*                    от*/}
                        {/*                    него при получении и свяжитесь с нами для выяснения обстоятельств и*/}
                        {/*                    урегулирования вопроса. Также мы настоятельно рекомендуем снимать процесс*/}
                        {/*                    вскрытия товара, чтобы избежать*/}
                        {/*                    недопониманий!*/}
                        {/*                    <ul>*/}
                        {/*                        <li>Попросите у сотрудника «акт несоответствия», заполните его и*/}
                        {/*                            сфотографируйте.*/}
                        {/*                        </li>*/}
                        {/*                        <li>Верните товар сотруднику службы доставки и приложите к нему акт.*/}
                        {/*                        </li>*/}
                        {/*                        <li>Незамедлительно напишите нам в службу поддержки по электронному*/}
                        {/*                            адресу <a href={'mailto:customerservice@sellout.su'}*/}
                        {/*                                      className={'text-black'}>customerservice@sellout.su</a>,*/}
                        {/*                            прикрепите к письму фотографию акта несоответствия и укажите*/}
                        {/*                            проблему.*/}
                        {/*                        </li>*/}
                        {/*                        <li>Проверка заявления и возврат денежных средств осуществляются в срок*/}
                        {/*                            до*/}
                        {/*                            10 календарных дней с момента отказа от товара при получении.*/}
                        {/*                        </li>*/}
                        {/*                    </ul>*/}
                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ title={'Что делать с неподошедшим товаром?'}>*/}
                        {/*                    Мы искренне стараемся помочь вам в такой ситуации, поэтому обязательно*/}
                        {/*                    напишите*/}
                        {/*                    нам, если вам не подошел товар. Мы попробуем продать его через нашу*/}
                        {/*                    платформу и*/}
                        {/*                    иные каналы продажи на особых условиях для вас, и, возможно, вам даже*/}
                        {/*                    удастся*/}
                        {/*                    заработать!*/}

                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ title={'Можно ли вернуть только часть заказа?'}>*/}
                        {/*                    На частичный возврат товаров распространяются точно такие же правила, как и*/}
                        {/*                    описано выше.*/}
                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ title={'Как быстро вернутся деньги за возврат?'}>*/}
                        {/*                    В большинстве случаев средства при оплате не списываются, а замораживаются*/}
                        {/*                    на*/}
                        {/*                    вашем счете и списываются лишь после окончательного подтверждения заказа.*/}
                        {/*                    Если*/}
                        {/*                    нам не удастся подтвердить заказ или придется его вернуть, то деньги*/}
                        {/*                    моментально*/}
                        {/*                    разморозятся и вернутся на ваш счет. Вам для этого ничего делать не*/}
                        {/*                    потребуется.*/}
                        {/*                    Если деньги уже списались с вашего счета, то при отмене или возврате заказа*/}
                        {/*                    деньги вернутся в течение 3-10 рабочих дней в зависимости от банка.*/}

                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ title={'Можно ли отказаться от заказа до его получения?'}>*/}
                        {/*                    Это возможно только в том случае, если заказ еще не был подтвержден и*/}
                        {/*                    передан в*/}
                        {/*                    обработку. Сообщите о своем желании отказаться от заказа как можно скорее на*/}
                        {/*                    нашу почту <a href={'mailto:customerservice@sellout.su'}*/}
                        {/*                                  className={'text-black'}>customerservice@sellout.su</a>*/}
                        {/*                </LoyaltyFAQ>*/}
                        {/*            </div>*/}
                        {/*            <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}*/}
                        {/*                                                                       className={s.link}*/}
                        {/*                                                                       target={'_blank'}>FAQ</Link>*/}
                        {/*            </h5>*/}

                        {/*        </TextModal>*/}
                        {/*        <TextModal title={'Бонусы'} img={giftModal}>*/}
                        {/*            <Image src={gift_gard} alt='' width={80}/>*/}
                        {/*            <h4 className={'my-3'}>Получайте бонусы</h4>*/}
                        {/*            <div className={'d-flex justify-content-evenly'}>*/}
                        {/*                <div className={s.point_block}>*/}
                        {/*                    <Image src={first} alt='' width={60}/>*/}
                        {/*                    <div>за первый заказ</div>*/}
                        {/*                    <div className={s.line}/>*/}
                        {/*                    1000 ₽*/}
                        {/*                </div>*/}
                        {/*                <div className={s.point_block}>*/}
                        {/*                    <Image src={good} alt='' width={60}/>*/}
                        {/*                    <div>за каждый товар</div>*/}
                        {/*                    <div className={s.line}/>*/}
                        {/*                    до 1500 ₽*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*            <div className={'d-flex justify-content-evenly'}>*/}
                        {/*                <div className={s.point_block}>*/}
                        {/*                    <Image src={friend} alt='' width={60}/>*/}
                        {/*                    <div>за приглашенного друга</div>*/}
                        {/*                    <div className={s.line}/>*/}
                        {/*                    до 3000 ₽*/}
                        {/*                </div>*/}
                        {/*                <div className={s.point_block}>*/}
                        {/*                    <Image src={birth} alt='' width={60}/>*/}
                        {/*                    <div>на день рождения</div>*/}
                        {/*                    <div className={s.line}/>*/}
                        {/*                    1000 ₽*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*            <div className={'d-block'}>*/}
                        {/*                <Image src={smile} alt='' width={60}/>*/}
                        {/*                <div className={'my-3'}>И оплачивайте ими 100% от стоимости заказа!</div>*/}
                        {/*            </div>*/}
                        {/*            <p className={s.text}>*/}
                        {/*                Мы стараемся всячески благодарить вас за покупки на платформе SELLOUT, поэтому*/}
                        {/*                за*/}
                        {/*                каждую совершенную покупку мы будем начислять вам бонусы в соответствии с вашим*/}
                        {/*                статусом. Конкретное число бонусов за каждый товар вы сможете увидеть на*/}
                        {/*                странице*/}
                        {/*                товара, а также в корзине. Также мы дарим 1000 бонусных рублей за первую покупку*/}
                        {/*                и*/}
                        {/*                на ваш день рождения и регулярно начисляем бонусы в честь различных праздников!*/}

                        {/*            </p>*/}
                        {/*            <div className={s.faq_block}>*/}
                        {/*                <h5 className={'text-center'}>Часто задаваемые вопросы</h5>*/}
                        {/*                <LoyaltyFAQ title={'Чему равны бонусы?'}>*/}
                        {/*                    Каждый один бонус приравнивается к одному рублю! Вы можете оплачивать до*/}
                        {/*                    100%*/}
                        {/*                    заказа, тем самым сводя стоимость заказа к нулю!*/}

                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ title={'Как воспользоваться бонусами?'}>*/}
                        {/*                    Чтобы оплатить заказ целиком или частично бонусами, в корзине или на любом*/}
                        {/*                    этапе*/}
                        {/*                    оформления заказа введите количество бонусов, которое хотите списать, и*/}
                        {/*                    скидка*/}
                        {/*                    будет автоматически применена!*/}
                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ title={'Как быстро после совершения покупки начисляются бонусы?'}>*/}
                        {/*                    Обратите внимание, бонусы на ваш баланс будут начислены не сразу, а по*/}
                        {/*                    прошествии некоторого времени. Нам требуется обработать заказ, подтвердить*/}
                        {/*                    корректность всех данных и после этого начислить бонусы. Если вы считаете,*/}
                        {/*                    что*/}
                        {/*                    бонусы слишком долго не начисляются и произошла какая-то ошибка, обязательно*/}
                        {/*                    напишите нам и мы вам поможем!*/}

                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ*/}
                        {/*                    title={'Как получить бонусы по реферальной программе, приглашая друзей?'}>*/}
                        {/*                    Реферальная программа - это специальная возможность для вас поделиться*/}
                        {/*                    удовлетворением от покупок с друзьями и получить взамен уникальные бонусы*/}
                        {/*                    размером до 7000₽! Просто пригласите своих знакомых стать частью нашего*/}
                        {/*                    сообщества, и вы оба сможете наслаждаться эксклюзивными преимуществами,*/}
                        {/*                    такими*/}
                        {/*                    как скидки и бонусы, созданными специально для участников нашей реферальной*/}
                        {/*                    программы. Благодарим за доверие и ваш вклад в наше расширяющееся*/}
                        {/*                    сообщество!*/}
                        {/*                    Подробнее про реферальную программу*/}
                        {/*                    смотрите <Link href={'/faq'} style={{color: 'inherit'}}>здесь</Link>*/}
                        {/*                </LoyaltyFAQ>*/}
                        {/*            </div>*/}

                        {/*            <div className={s.faq_block}>*/}
                        {/*                <h5 className={`text-center ${s.questions_text}`}>Ответы на большинство вопросов*/}
                        {/*                    вы найдете здесь: <Link href={'/faq'} className={'text-black'}*/}
                        {/*                                            target={'_blank'}>FAQ</Link></h5>*/}
                        {/*                <h5 className={`text-center ${s.questions_text}`}>Если у вас остались вопросы,*/}
                        {/*                    вы*/}
                        {/*                    всегда*/}
                        {/*                    можете обратиться в службу поддержки и мы будем*/}
                        {/*                    рады вам помочь!</h5>*/}
                        {/*            </div>*/}
                        {/*        </TextModal>*/}

                        {/*        <TextModal title={'Почему изменилась цена или модель оказалась распроданной?'}*/}
                        {/*                   img={change}>*/}
                        {/*            <Image src={change} alt='' width={60}/>*/}
                        {/*            <h4 className={'my-3'}>Почему изменилась цена или модель оказалась*/}
                        {/*                распроданной?</h4>*/}
                        {/*            <div className={s.img_cont}>*/}
                        {/*                <Image src={map} alt='' className={s.img} fill={true}/>*/}
                        {/*            </div>*/}
                        {/*            <p className={s.text}>*/}
                        {/*                Многие представленные модели являются лимитированными и находятся в наличии в*/}
                        {/*                ограниченном количестве, поэтому может произойти такое, что кто-то другой купит*/}
                        {/*                эту*/}
                        {/*                позицию и данное ценовое предложение перестанет быть доступным. Мы собираем*/}
                        {/*                десятки*/}
                        {/*                миллионов предложений со всего мира, поэтому даже в короткие промежутки времени*/}
                        {/*                цена*/}
                        {/*                может меняться. В том числе на цену могут сказываться прочие внешние факторы, не*/}
                        {/*                зависящие от нас, такие как курс, стоимость доставки и многое другое.*/}

                        {/*            </p>*/}
                        {/*            <div className={s.faq_block}>*/}
                        {/*                <h5 className={'text-center'}>Часто задаваемые вопросы</h5>*/}
                        {/*                <LoyaltyFAQ title={'После чего цена меняться не будет?'}>*/}
                        {/*                    После того, как вы оформите заказ, цена для вас будет зафиксирована и*/}
                        {/*                    никаким*/}
                        {/*                    изменениям не подлежит. Добавление товара в корзину или избранное, к*/}
                        {/*                    сожалению,*/}
                        {/*                    не позволяет нам зафиксировать цену по объективным причинам. Мы стараемся в*/}
                        {/*                    каждый момент времени предлагать вам наилучшую цену из возможных и делать*/}
                        {/*                    ваш*/}
                        {/*                    шопинг с нами еще более удобным и выгодным, поэтому не откладывайте ваши*/}
                        {/*                    покупки*/}
                        {/*                    на потом, чтобы не упустить приятные цены!*/}

                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ title={'Как часто могут меняться цены?'}>*/}
                        {/*                    Цена может не меняться как на протяжении долгого времени, так и постоянно*/}
                        {/*                    оставаться волатильной. Она может как повыситься, так и понизиться. Вскоре*/}
                        {/*                    мы*/}
                        {/*                    добавим возможность следить за изменением цен, а также получать уведомления*/}
                        {/*                    о*/}
                        {/*                    появлении более выгодного предложения на интересующий вас лот!*/}

                        {/*                </LoyaltyFAQ>*/}
                        {/*                <LoyaltyFAQ title={'Почему модель оказалась распроданной?'}>*/}
                        {/*                    Так как многие размещенные на нашей платформе лоты являются коллекционными и*/}
                        {/*                    редкими, может произойти такое, что какой-то конкретный размер или вся*/}
                        {/*                    модель*/}
                        {/*                    пропадет из наличия, поэтому не откладывайте свои покупки, чтобы успеть*/}
                        {/*                    приобрести желанную модель!*/}

                        {/*                </LoyaltyFAQ>*/}
                        {/*            </div>*/}
                        {/*            <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}*/}
                        {/*                                                                       className={s.link}*/}
                        {/*                                                                       target={'_blank'}>FAQ</Link>*/}
                        {/*            </h5>*/}
                        {/*        </TextModal>*/}


                        {/*        /!*<QuestionsDropdown/>*!/*/}
                        {/*    </div>*/}
                        {/*}*/}
                    </div>
                </div>
                {desktopStore.isDesktop &&
                    <hr className={s.margins}/>}
                {!desktopStore.isDesktop && compilations.map(el =>
                    <>
                        <Compilation arr={el.products} title={'Похожие товары'} paddings={'regular'}
                                     rows={1} key={product.id}/>
                    </>
                )}
                {!desktopStore.isDesktop && lastSeen.length > 0 &&
                    <>
                        <Compilation arr={lastSeen} title={'Ранее просмотренные'} paddings={'regular'}
                                     key={product.id}/>
                    </>
                }
                {!desktopStore.isDesktop && recProducts && recProducts.length > 0 &&
                    <div className={'custom_cont'}>
                        <h3 className={s.similar_title}>Рекомендации</h3>
                        <ProductList products={recProducts} isAdmin={false} key={product.id}/>
                        <div ref={observerRef}/>
                    </div>
                }
                {desktopStore.isDesktop && compilations.map(el =>
                    <Compilation arr={el.products} title={el.name} paddings={'regular'} key={product.id}/>
                )}
                {desktopStore.isDesktop && recProducts && recProducts.length > 0 &&
                    <Compilation arr={recProducts} title={'Рекомендации'} paddings={'regular'}
                                 resetScrollToBeginning={true}/>
                }
                {desktopStore.isDesktop && lastSeen.length > 0 &&
                    <Compilation arr={lastSeen} title={'Ранее просмотренные'} paddings={'regular'} key={product.id}/>
                }
            </div>
            <HowWeWorkModal show={howOpen} onHide={closeHow}/>
            <ProductPageMobileInfoModal show={infoOpen} onHide={closeInfoModal} product={product}/>
            <ContactModal isOpen={contactOpen} handleClose={closeContact}/>
            <ModalGifts show={giftsModalOpen} onClose={handleGiftsModalClose}/>
        </MainLayout>
    );
};

export default observer(OneProductPage);