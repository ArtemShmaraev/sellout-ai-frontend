import React, {useState, useRef, useLayoutEffect, useEffect} from 'react';
import {useSwipeable} from 'react-swipeable';
import s from './ProductDetailsMob.module.css';
import StarRating from "@/components/shared/StarRating/StarRating"; // Импортируйте ваши стили
import parseHtml from 'html-react-parser';
import Notification from "@/components/shared/Notification/Notification";
import {Navigation, Pagination, Zoom} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import Image from "next/image";
import Arrow from "@/components/shared/UI/Arrow/Arrow";

const ProductDetails = ({product}) => {
    // const [activeTab, setActiveTab] = useState(product.description ? 'description' : "characteristics");
    const [activeTab, setActiveTab] = useState("characteristics");
    // const [contentHeight, setContentHeight] = useState('auto');

    const [notification, setNotification] = useState(null);
    const [moreOpen, setMoreOpen] = useState(false)
    const swiperRef = useRef(null); // Реф для Swiper

    const [contentHeight, setContentHeight] = useState('120px');

    const contentRef = useRef(null);
    useEffect(() => {
        if (contentRef.current) {
            setContentHeight( "120px");
            setContentHeight(moreOpen ? (contentRef.current.scrollHeight + 10) + "px" : '120px');
            setTimeout(() => {
                setContentHeight(moreOpen ? (contentRef.current.scrollHeight + 10) + "px" : '120px');
            }, 400)

        }
    }, [moreOpen]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'description') {
            swiperRef.current?.swiper.slideTo(1); // Переключаем на первый слайд
        } else if (tab === 'characteristics') {
            swiperRef.current?.swiper.slideTo(0); // Переключаем на второй слайд
        }
    };


    const renderParams = () => {
        const res = [];
        res.push(
            <p className={s.characteristics}>
                Артикул:
                <span className={s.sku_text}>{product.manufacturer_sku}</span>
                <img width="18" height="18" src="https://img.icons8.com/fluency-systems-regular/48/copy--v1.png"
                     alt="copy--v1" onClick={() => copyToClipboard(product.manufacturer_sku)}/>

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
        onSwipedLeft: () => setActiveTab('description'),
        onSwipedRight: () => setActiveTab('characteristics'),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });




    const toggle_more_open = () => {
        if (moreOpen) {
            setMoreOpen(true)
        }
        setMoreOpen(!moreOpen)
    }

    const brandsDisplay = () => {
        if (product.collab) {
            return product.collab.name;
        } else {
            return product.brands[0].name;
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setNotification('Артикул скопирован');
        }, () => {
            setNotification('Не удалось скопировать артикул');
        });
    };

    const infoRef = useRef(null)
    const [infoBtn, setInfoBtn] = useState(true)
    const [fadeOutInvisible, setFadeOutInvisible] = useState(false)

    useEffect(() => {
        if (contentRef && contentRef.current.clientHeight >= 120) {
            setInfoBtn(true)
        } else {
            setInfoBtn(false)
            setFadeOutInvisible(true);
        }
    }, [moreOpen])

    return (
        <div>
            {notification && (
                <Notification
                    message={notification}
                    onClose={() => setNotification(null)}
                />
            )}
            <div

                {...handlers}
                key={product.id}
            >
                {/*<hr/>*/}

                <div>
                    <div>
                        {/*<StarRating rating={product.score_product_page} n={product.id}/>*/}
                        {/*<span itemScope itemType="https://schema.org/Brand">*/}
                        {/*    <div itemProp="name" className={s.model}>{brandsDisplay()}</div>*/}
                        {/*</span>*/}
                        {/*<div className={s.more_color}>{product.colorway}</div>*/}
                        {/*<div className={s.more_color}>{parseHtml(product.extra_name)}</div>*/}

                        <div className={s.menu} key={product.id} id={product.id}>
                            <button
                                className={`${activeTab === 'characteristics' ? s.active : s.inActive} ${!product.description ? s.fullWidth : ''}`}
                                onClick={() => handleTabClick('characteristics')}
                            >
                                Характеристики
                            </button>
                            {product.description && (
                            <button
                                className={activeTab === 'description' ? s.active : s.inActive}
                                onClick={() => handleTabClick('description')}
                            >
                                Описание
                            </button>
                        )}
                        </div>

                        <Swiper
                            ref={swiperRef} // Присваиваем реф Swiper
                            initialSlide={0}
                            modules={[Pagination, Zoom, Navigation]}
                            className={s.cont}
                            style={{
                                '--swiper-pagination-color': 'rgba(0,0,0,0.9)',
                                '--swiper-pagination-bullet-inactive-color': 'radial-gradient(circle, #000000 35%, rgba(255, 255, 255, 0) 50%)',
                                '--swiper-pagination-top': 'auto', // Убираем верхний отступ
                                '--swiper-pagination-progressbar-size': '2px',
                                '--swiper-pagination-bullet-size': '10px',
                                '--swiper-pagination-bullet-horizontal-gap': '12px',
                                // '--swiper-pagination-bullet-border-radius': '25%',
                                '--swiper-pagination-progressbar-bg-color': 'rgba(0,0,0,0.1)',
                                "--swiper-navigation-color": "rgba(0,0,0,0.5)",
                            }}
                        >
                            <SwiperSlide>

                                <div
                                    ref={contentRef}
                                    className={[s.more, moreOpen ? s.more_open : ""].join(" ")}
                                    style={{maxHeight: contentHeight}}
                                    >
                                <div className={activeTab === 'characteristics' ? s.tabActive : ''}>
                                    <div className={s.characteristicsTab}>
                                        {/*<div className={s.characteristics_title}>Характеристики товара:</div>*/}
                                        {renderParams()}
                                    </div>
                                    {/* Градиент для плавного исчезновения внизу */}
                                    <div className={`${moreOpen || fadeOutInvisible ? s.invisible : s.fadeOut}`}></div>
                                </div>
                                </div>
                                {infoBtn &&
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

                            </SwiperSlide>

                            {product.description && (
                            <SwiperSlide
                            >
                                <div
                                    ref={contentRef}
                                    className={[s.more, moreOpen ? s.more_open : ""].join(" ")}
                                    style={{maxHeight: contentHeight}}
                                >

                                    <div className={activeTab === 'description' ? s.tabActive : s.tabInactive}>
                                        <div className={s.descriptionTab}>
                                            <p className={s.description}>
                                                {product.description}
                                            </p>
                                        </div>
                                        {/* Градиент для плавного исчезновения внизу */}
                                        <div className={`${moreOpen || fadeOutInvisible ? s.invisible : s.fadeOut}`}></div>
                                    </div>
                                </div>
                                {infoBtn &&
                                <div className='d-flex justify-content-center'>
                                    <button
                                        className={s.more_btn}
                                        onClick={toggle_more_open}>
                                        <div className={s.more_text}>
                                            Подробнее
                                            <Arrow isOpen={moreOpen}/>
                                        </div>
                                    </button>
                                </div>}

                            </SwiperSlide>)}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
