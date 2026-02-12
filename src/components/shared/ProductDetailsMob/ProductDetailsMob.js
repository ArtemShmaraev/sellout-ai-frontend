import React, {useState, useRef, useLayoutEffect, useEffect} from 'react';
import { useSwipeable } from 'react-swipeable';
import s from './ProductDetailsMob.module.css';
import StarRating from "@/components/shared/StarRating/StarRating"; // Импортируйте ваши стили
import parseHtml from 'html-react-parser';
import Notification from "@/components/shared/Notification/Notification";
const ProductDetails = ({ product }) => {
    const [activeTab, setActiveTab] = useState(product.description ? 'description' : "characteristics");
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState('auto');
    const moreOpen = true; // Замените это на ваш реальный флаг состояния
    const [notification, setNotification] = useState(null);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const renderParams = () => {
        const res = [];
        res.push(
            <p className={s.characteristics}>
                Артикул:
                <span className={s.sku_text}>{product.manufacturer_sku}</span>
                <img width="18" height="18" src="https://img.icons8.com/fluency-systems-regular/48/copy--v1.png" alt="copy--v1"  onClick={() => copyToClipboard(product.manufacturer_sku)}/>

            </p>
        );
        res.push(
            <p className={s.characteristics}>Дата релиза:
                <span className={s.characteristics_text}>{product.approximate_date}</span>
            </p>
        );
        const paramsObj = product.parameters;
        const order = paramsObj.parameters_order;
        if (order) {
            const params = {};
            for (const param of order) {
                if (param in product.parameters.parameters) {
                    params[param] = paramsObj.parameters[param];
                }
            }

            for (const key in params) {
                res.push(
                    <p className={s.characteristics}>{key}:
                        <span className={s.characteristics_text}>{params[key].join(', ')}</span>
                    </p>
                );
            }
        } else {
            for (const key in paramsObj) {
                res.push(
                    <p className={s.characteristics}>{key}:
                        <span className={s.characteristics_text}>{paramsObj[key].join(', ')}</span>
                    </p>
                );
            }
        }
        return res;
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => setActiveTab('characteristics'),
        onSwipedRight: () => setActiveTab('description'),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    const brandsDisplay = () => {
        if (product.collab) {
            return product.collab.name;
        } else {
            return product.brands[0].name;
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setNotification('Артикул скопирован в буфер обмена');
        }, () => {
            setNotification('Не удалось скопировать артикул');
        });
    };

    return (
        <div>
            {notification && (
                <Notification
                    message={notification}
                    onClose={() => setNotification(null)}
                />
            )}
            <div
                ref={contentRef}
                className={[s.more, moreOpen ? s.more_open : ""].join(" ")}
                style={{ maxHeight: contentHeight }}
                {...handlers}
                key={product.id}
            >
                <hr />

                <div>
                    <div>
                        <StarRating rating={product.score_product_page} n={product.id} />
                        <span itemScope itemType="https://schema.org/Brand">
                            <div itemProp="name" className={s.model}>{brandsDisplay()}</div>
                        </span>
                        <div className={s.more_color}>{product.colorway}</div>
                        <div className={s.more_color}>{parseHtml(product.extra_name)}</div>

                        <div className={s.menu}
                        key={product.id}
                        id={product.id}>
                            {product.description &&
                                <button
                                className={activeTab === 'description' ? s.active : ''}
                                onClick={() => handleTabClick('description')}
                            >
                                Описание
                            </button>}
                            <button
                                className={activeTab === 'characteristics' ? s.active : ''}
                                onClick={() => handleTabClick('characteristics')}
                            >
                                Характеристики
                            </button>
                        </div>
                        {product.description &&
                        <div className={activeTab === 'description' ? s.tabActive : s.tabInactive}>
                            <div className={s.descriptionTab}>
                                <p className={s.description}>
                                    {product.description}
                                </p>
                            </div>
                        </div>}

                        <div className={activeTab === 'characteristics' ? s.tabActive : s.tabInactive}>
                            <div className={s.characteristicsTab}>
                                {/*<div className={s.characteristics_title}>Характеристики товара:</div>*/}
                                {renderParams()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
