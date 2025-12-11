// components/YandexMetrica.js
import { useEffect } from 'react';

const YandexMetrica = () => {
    useEffect(() => {
        window.ym(95264330, 'init', {
            ecommerce: true,
        });

        window.dataLayer = window.dataLayer || [];
    }, []);



    return null;
};

export default YandexMetrica;
export const trackViewProduct = (productDetails) => {
    window.dataLayer.push({
        "ecommerce": {
            "detail": {
                "products": [productDetails],
            },
        },
    });
};

export const trackAddToFavorites = (productDetails) => {
    window.dataLayer.push({
        "event": "addToFavorites",
        "ecommerce": {
            "currencyCode": "RUB",
            "add": {
                "products": [productDetails],
            },
        },
    });
};

export const trackAddToCart = (productDetails) => {
    window.dataLayer.push({
        "event": "addToCart",
        "ecommerce": {
            "currencyCode": "RUB",
            "add": {
                "products": [productDetails],
            },
        },
    });
};

export const trackRemoveToCart = (productDetails) => {
    window.dataLayer.push({
        "event": "removeToCart",
        "ecommerce": {
            "currencyCode": "RUB",
            "add": {
                "products": [productDetails],
            },
        },
    });
};

export const trackPurchase = (purchaseDetails) => {
    window.dataLayer.push({
        "ecommerce": {
            "purchase": {
                "actionField": purchaseDetails.actionField,
                "products": purchaseDetails.products,
            },
        },
    });
};

export const trackRemoveToFavorites = (productDetails) => {
    window.dataLayer.push({
        "event": "removeToFavorites",
        "ecommerce": {
            "remove": {
                "products": [productDetails],
            },
        },
    });
};
