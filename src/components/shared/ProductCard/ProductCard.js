import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './ProductCard.module.css'
import like from '@/static/icons/heart.svg'
import like_fill from '@/static/icons/heart-fill.svg'
import truck from '@/static/icons/truck.svg'
import re from '@/static/icons/arrow-return-left.svg'
import Image from 'next/image'
import {useRouter} from "next/router";
import Cookies from 'js-cookie'
import {addToWishlist, removeFromWishlist} from "@/http/wishlistAPI";
import {Context} from "@/context/AppWrapper";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import Link from "next/link";
import desktop from '@/static/img/desktop_background.jpg'
import mobile from '@/static/img/mobile_background.jpg'
import {trackAddToFavorites, trackRemoveToFavorites} from "@/components/shared/YandexMetrica/YandexMetrica";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Navigation, Zoom} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import 'swiper/css/effect-fade';


const ProductCard = ({cardList = false, bigCard = false, product}) => {
    const {id, model, slug, brands, collab, colorway, price, isLoadingCard} = product
    const isFastShip = product.is_fast_shipping
    const isReturn = product.is_return
    const isSale = product.is_sale
    const sale = product.sale_amount ?? ''
    const inWishlist = product.in_wishlist
    const photosArr = product.bucket_link


    const router = useRouter()
    const [isHovered, setIsHovered] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(inWishlist)
    const {userStore, desktopStore} = useContext(Context)

    // const [desktopStore.isDesktop, setdesktopStore.isDesktop] = useState(true)
    // useEffect(() => {
    //     const width = window.innerWidth
    //     if (width <= 1200) {
    //         setdesktopStore.isDesktop(false)
    //     }
    // }, [])

    const brandsDisplay = () => {
        if (collab) {
            return collab.name
        } else {
            return brands.length ? brands[0].name : 'no brand'
        }
    }
    const [photos, setPhotos] = useState([])
    useEffect(() => {
        if (photosArr) {
            const arr = []
            for (let i = 0; i < Math.min(photosArr.length, 11); i++) {
                arr.push(photosArr[i].url)
            }
            setPhotos(arr)
        }
    }, [photosArr])

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const getProductDetail = (product) => {
        const productDetails = {
            id: product.id.toString(),
            name: `${brandsDisplay()} ${product.model} ${product.colorway}`,
            price: product.min_price,
            brand: brandsDisplay()
        };
        return productDetails;
    };

    const addToWL = async () => {
        setIsInWishlist(true)
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const data = await addToWishlist(userId, id, token)

        const {pathname, query} = router
        const productDetails = getProductDetail(product);
        trackAddToFavorites(productDetails)
        router.push({pathname, query}, undefined, {scroll: false})
    }
    const deleteFromWL = async () => {
        setIsInWishlist(false)
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const data = await removeFromWishlist(userId, id, token)
        const {pathname, query} = router
        const productDetails = getProductDetail(product);
        trackRemoveToFavorites(productDetails)
        router.push({pathname, query}, undefined, {scroll: false})
    }
    const [isLoading, setIsLoading] = useState(true)

    const sizesRef = useRef(null)
    const [sizesIsShown, setSizesIsShown] = useState(false)
    const showSizes = () => {
        if (product.available_sizes && product.available_sizes.sizes?.length) {
            setSizesIsShown(true)
        }
    }
    const hideSizes = () => {
        setSizesIsShown(false)
    }
    const handleTouchCancel = () => {
        hideSizes();
    };
    const renderSizes = () => {
        const n = desktopStore.isDesktop ? 20 : 10
        const sizes = product.available_sizes.sizes
        return sizes.length <= n ? sizes.join(', ') : `${sizes[0]} - ${sizes[sizes.length - 1]}`
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sizesRef.current && sizesRef.current.contains(event.target)) {
                if (product.available_sizes && product.available_sizes.sizes?.length) {
                    setSizesIsShown(true)
                }
            } else {
                setSizesIsShown(false)
            }
        };

        document.addEventListener('mousemove', handleClickOutside);

        return () => {
            document.removeEventListener('mousemove', handleClickOutside);
        };
    }, []);

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        // Функция для обновления ширины
        const handleResize = () => setWindowWidth(window.innerWidth);

        // Устанавливаем текущую ширину при загрузке компонента
        handleResize();

        // Добавляем слушатель изменения размера окна
        window.addEventListener('resize', handleResize);

        // Удаляем слушатель при размонтировании компонента
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const addSpacesToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    const [currentIndex, setCurrentIndex] = useState(1);
    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + photosArr.length) % photosArr.length);
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photosArr.length);
    };


    return (
        <>
            {!isLoadingCard ? (
                <Link className={cardList ? s.card_list : bigCard ? s.bigCard : s.card}
                      href={slug && slug !== "" ? `/products/${slug}` : '#'}
                      key={slug}

                >
                    <div className={s.icons_block}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            {(price.start_price > price.final_price) && price.final_price > 0 &&
                                <div className={s.sale}>
                                    -{Math.ceil(100 - (price.final_price / price.start_price) * 100)}%
                                </div>}
                            {isFastShip && <Image src={truck} alt="shippment" className={s.truck}/>}
                            {isReturn && <Image src={re} alt="shippment" className={s.truck}/>}
                        </div>
                        {userStore.isLogged
                            ?
                            <div className={s.like_block}
                                 onClick={(e) => {
                                     e.preventDefault()
                                     e.stopPropagation()
                                     isInWishlist ? deleteFromWL() : addToWL()
                                 }}>
                                <Image src={isInWishlist ? like_fill : like} alt="like" className={s.like} width={20}/>
                            </div>
                            :
                            <div onClick={e => {
                                e.preventDefault()
                                e.stopPropagation()
                            }} className={s.like_block}>
                                <AuthModal fromWishlist={true} style={{justifyContent: 'center'}}>
                                    <Image src={isInWishlist ? like_fill : like} alt="like" className={s.like}
                                           width={20}
                                    />
                                </AuthModal>
                            </div>
                        }
                    </div>
                    {/*{photosArr && photosArr.length > 0 &&*/}
                    {/*    <div className={s.image_container}*/}
                    {/*         onTouchStart={e => {*/}
                    {/*             e.stopPropagation()*/}
                    {/*             handleMouseEnter()*/}
                    {/*         }}*/}
                    {/*         onTouchEnd={e => {*/}
                    {/*             e.stopPropagation()*/}
                    {/*             handleMouseLeave()*/}
                    {/*         }}*/}
                    {/*         onMouseEnter={handleMouseEnter}*/}
                    {/*         onMouseLeave={handleMouseLeave}*/}

                    {/*    >*/}
                    {/*        <Image*/}
                    {/*            style={{ position: 'absolute', objectFit: 'contain', objectPosition: 'center bottom' }}*/}
                    {/*            loading={'eager'}*/}
                    {/*            fill={true}*/}
                    {/*            className={isHovered && photosArr[1] && desktopStore.isDesktop ? 'opacity-0' : ''}*/}
                    {/*            onLoadingComplete={() => setIsLoading(false)}*/}
                    {/*            src={photosArr[0].url}*/}
                    {/*            alt="shoe"*/}
                    {/*            sizes={'100%'}*/}
                    {/*        />*/}
                    {/*        {photosArr[1] && (*/}
                    {/*            <Image*/}
                    {/*                style={{ position: 'absolute', objectFit: 'contain', objectPosition: 'center bottom' }}*/}
                    {/*                loading={'eager'}*/}
                    {/*                fill={true}*/}
                    {/*                className={isHovered && desktopStore.isDesktop ? '' : 'opacity-0'}*/}
                    {/*                onLoadingComplete={() => setIsLoading(false)}*/}
                    {/*                src={photosArr[currentIndex].url}*/}
                    {/*                alt="shoe"*/}
                    {/*                sizes={'100%'}*/}
                    {/*            />*/}
                    {/*        )}*/}
                    {/*        <Image*/}
                    {/*            src={desktopStore.isDesktop ? desktop : mobile}*/}
                    {/*            alt=""*/}
                    {/*            className={'placeholder_img'}*/}
                    {/*            fill={true}*/}
                    {/*            style={isLoading ? {} : { opacity: 0 }}*/}
                    {/*            sizes={'100%'}*/}
                    {/*        />*/}
                    {/*        {isHovered && photosArr.length > 1 && (*/}
                    {/*            <>*/}
                    {/*                <div*/}
                    {/*                    style={{*/}
                    {/*                        position: 'absolute',*/}
                    {/*                        top: '50%',*/}
                    {/*                        left: '10px',*/}
                    {/*                        transform: 'translateY(-50%)',*/}
                    {/*                        cursor: 'pointer',*/}
                    {/*                    }}*/}
                    {/*                    onClick={handlePrevClick}*/}
                    {/*                >*/}
                    {/*                    &lt; /!* Left arrow *!/*/}
                    {/*                </div>*/}
                    {/*                <div*/}
                    {/*                    style={{*/}
                    {/*                        position: 'absolute',*/}
                    {/*                        top: '50%',*/}
                    {/*                        right: '10px',*/}
                    {/*                        transform: 'translateY(-50%)',*/}
                    {/*                        cursor: 'pointer',*/}
                    {/*                    }}*/}
                    {/*                    onClick={handleNextClick}*/}
                    {/*                >*/}
                    {/*                    &gt; /!* Right arrow *!/*/}
                    {/*                </div>*/}
                    {/*            </>*/}
                    {/*        )}*/}

                    {photosArr && photosArr.length > 0 &&
                        (!desktopStore.isDesktop
                                ?
                                <div className={s.image_container}>

                                    <Swiper
                                        className={s.swiper_container}
                                        // style={{zIndex: -1}}
                                        // id={photosArr[0].id}
                                        loop={true}
                                        pagination={{
                                            type: 'bullets',
                                            dynamicBullets: true, // Включение динамического отображения
                                            dynamicMainBullets: 2 // Количество видимых буллетов вокруг активного
                                        }}
                                        // effect={"fade"}

                                        // zoom={true}
                                        // initialSlide={0}
                                        // navigation={true}
                                        modules={[Pagination, Navigation]}
                                        // pagination={!isLoading}
                                        // className={s.cont}
                                        style={{
                                            // "--swiper-pagination-bullet-size": "8px",
                                            // "--swiper-pagination-bullet-vertical-gap": "15px",
                                            "--swiper-pagination-color": "rgb(38,38,38)",
                                            "--swiper-navigation-color": "#000",
                                            '--swiper-pagination-bullet-size': '6px',
                                            '--swiper-pagination-bullet-inactive-color': 'radial-gradient(circle, #000000 35%, rgba(255, 255, 255, 0) 50%)',
                                            // '--swiper-pagination-left': '10px',
                                            // '--swiper-pagination-right': '10px',
                                            '--swiper-pagination-bottom': '0',
                                            // '--swiper-pagination-top': '10px'

                                            // "--swiper-pagination-right": "0",

                                        }}


                                    >
                                        {photos.map((el, index) =>
                                            <SwiperSlide
                                                key={index}

                                                // className={s.photo}
                                            >
                                                {el !== "logo" &&
                                                    <Image
                                                        id="photo"
                                                        style={{
                                                            position: 'absolute',
                                                            objectFit: 'contain',
                                                            // objectPosition: "center bottom",
                                                            bottom: 0,
                                                            opacity: isLoading ? 0.4 : 1, // Начальная прозрачность в зависимости от состояния загрузки
                                                            transition: el === "logo" ? "" : 'opacity 0.4s ease', // Анимация изменения прозрачности
                                                        }}
                                                        loading={index === 0 ? "eager" : "lazy"}
                                                        fill={true}
                                                        className={''}
                                                        // onLoadingComplete={() => setIsLoading(false)}
                                                        src={el}
                                                        onLoadingComplete={() => setIsLoading(false)}
                                                        alt="shoe"
                                                        sizes={'100%'}
                                                    />
                                                }
                                            </SwiperSlide>
                                        )
                                        }
                                    </Swiper>
                                    <Image
                                        src={desktopStore.isDesktop ? desktop : mobile}
                                        alt=''
                                        className={'placeholder_img'}
                                        fill={true}
                                        style={{
                                            position: 'absolute',
                                            objectFit: 'contain',
                                            // objectPosition: "center bottom",
                                            transition: 'opacity 0.2s ease', // Анимация изменения прозрачности
                                            opacity: isLoading ? 1 : 0, // Начальная прозрачность в зависимости от состояния загрузки
                                        }}
                                        sizes={'100%'}
                                    />
                                    {/*{isLoading &&*/}
                                    {/*<Image src={mobile} alt=''*/}
                                    {/*       className={'placeholder_img'} fill={true}*/}
                                    {/*       style={{*/}
                                    {/*           position: 'absolute',*/}
                                    {/*           objectFit: 'contain',*/}
                                    {/*           objectPosition: "center bottom",*/}
                                    {/*       }}*/}
                                    {/*       sizes={'100%'}/>}*/}

                                </div>
                                :
                                <div className={s.image_container}
                                     onTouchStart={e => {
                                         e.stopPropagation()
                                         handleMouseEnter()
                                     }}
                                     onTouchEnd={e => {
                                         e.stopPropagation()
                                         handleMouseLeave()
                                     }}
                                     onMouseEnter={handleMouseEnter}
                                     onMouseLeave={handleMouseLeave}

                                >


                                    <Image
                                        style={{
                                            position: 'absolute',
                                            objectFit: 'contain',
                                            objectPosition: "center bottom"
                                        }}
                                        loading={'eager'}
                                        fill={true}
                                        className={isHovered && photos[1] && desktopStore.isDesktop ? 'opacity-0' : ''}
                                        onLoadingComplete={() => setIsLoading(false)}
                                        src={photosArr[0].url !== "logo" ? photosArr[0].url : (desktopStore.isDesktop ? desktop : mobile)}
                                        alt="shoe"
                                        sizes={'100%'}/>


                                    {photos[1] &&
                                        <Image
                                            style={{
                                                position: 'absolute',
                                                objectFit: 'contain',
                                                objectPosition: "center bottom"
                                            }}

                                            fill={true}
                                            className={isHovered && desktopStore.isDesktop ? '' : 'opacity-0'}
                                            onLoadingComplete={() => setIsLoading(false)}
                                            src={photos[1]} alt="shoe"
                                            sizes={'100%'}
                                        />
                                    }
                                    {/*{isLoading &&*/}
                                    {/*    <Image src={desktopStore.isDesktop ? desktop : mobile} alt=''*/}
                                    {/*           className={'placeholder_img'} fill={true}*/}
                                    {/*           style={{*/}
                                    {/*               position: 'absolute',*/}
                                    {/*               objectFit: 'contain',*/}
                                    {/*               objectPosition: "center bottom",*/}
                                    {/*           }}*/}
                                    {/*           sizes={'100%'}/>}*/}


                                    <Image
                                        src={desktopStore.isDesktop ? desktop : mobile}
                                        alt=''
                                        className={'placeholder_img'}
                                        fill={true}
                                        style={{
                                            position: 'absolute',
                                            objectFit: 'contain',
                                            objectPosition: "center bottom",
                                            transition: 'opacity 0.5s ease', // Анимация изменения прозрачности
                                            opacity: isLoading ? 1 : 0, // Начальная прозрачность в зависимости от состояния загрузки
                                        }}
                                        sizes={'100%'}
                                    />
                                </div>
                        )
                    }
                    <div className={bigCard ? s.text_block_big_card : s.text_block}
                         ref={sizesRef}
                    >
                        {
                            !(isHovered && desktopStore.isDesktop && (product.available_sizes && product.available_sizes.sizes?.length))
                                ?
                                <>
                                    <div className={s.info}>
                                        <div
                                            className={brandsDisplay() !== "Загрузка" ? `${s.tag}` : `${s.placeholder}`}>{brandsDisplay() !== "Загрузка" ? brandsDisplay() : ""}</div>
                                        <div
                                            className={brandsDisplay() !== "Загрузка" ? `${s.brand}` : `${s.placeholder}`}>{brandsDisplay() !== "Загрузка" ? model || '' : ""}</div>
                                        <div
                                            className={s.colorway}>{brandsDisplay() !== "Загрузка" ? colorway : ""}</div>
                                    </div>
                                </>
                                :
                                <div>
                            <span className={s.tag}>
                                Доступные размеры{product.available_sizes.filter_logo ? ` (${product.available_sizes.filter_logo})` : ''}:</span>
                                    <br/>
                                    <span style={{
                                        fontSize: '14px',
                                        lineHeight: '1.5',
                                        color: 'black',
                                        display: 'inline-block'
                                    }}>{renderSizes()}</span>
                                </div>
                        }
                        <div className={`${s.price_block}`}>
                            {
                                ((price.start_price > price.final_price) && price.final_price > 0)
                                    ?
                                    Number(price.final_price) > 0
                                        ?
                                        <div className={`${s.price}`}>

                                            {desktopStore.isDesktop ? (
                                                <div
                                                    className={`${price.final_price > 9999999 ? s.flexColumn : s.flexRow}`}>
                                            <span
                                                className={s.sale_price}>от {addSpacesToNumber(price.final_price)} ₽ &nbsp;</span>
                                                    <span
                                                        className={s.crossed}>{addSpacesToNumber(price.start_price)} ₽</span>
                                                </div>
                                            ) : windowWidth > 650 ? (
                                                <>
                                                    {/*<span style={{display: 'flex'}}><span*/}
                                                    {/*    className={s.crossed}>{addSpacesToNumber(price.start_price)} ₽</span>&nbsp;&nbsp;</span>*/}
                                                    {/*<span*/}
                                                    {/*    className={s.sale_price}>от {addSpacesToNumber(price.final_price)} ₽</span>*/}
                                                    <span
                                                        className={s.sale_price}>от {addSpacesToNumber(price.final_price)} ₽ &nbsp;</span>
                                                    <span
                                                        className={s.crossed}>{addSpacesToNumber(price.start_price)} ₽</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span
                                                        className={s.crossed}>{addSpacesToNumber(price.start_price)} ₽</span>
                                                    <span
                                                        className={s.sale_price}>от {addSpacesToNumber(price.final_price)} ₽</span>
                                                </>
                                            )}
                                        </div>
                                        :
                                        <div className={`${s.price}`}>
                                            Нет в наличии
                                        </div>
                                    :
                                    Number(price.final_price) === 1
                                        ?
                                        <div className={`${s.placeholder}`}>

                                        </div>
                                        :
                                        <div className={`${s.price}`}>
                                            {
                                                Number(price.final_price) > 0
                                                    ?
                                                    `от ${addSpacesToNumber(price.final_price)} ₽`
                                                    :
                                                    'Нет в наличии'
                                            }
                                        </div>
                            }
                        </div>
                    </div>
                </Link>
            ) : (
                <div className={cardList ? s.card_list : bigCard ? s.bigCard : s.card}
                     key={slug}
                >
                    {photosArr && photosArr.length > 0 &&
                        (!desktopStore.isDesktop
                                ?
                                <div className={s.image_container}>
                                    <Image
                                        src={desktopStore.isDesktop ? desktop : mobile}
                                        alt=''
                                        className={'placeholder_img'}
                                        fill={true}
                                        style={{
                                            position: 'absolute',
                                            objectFit: 'contain',
                                            // objectPosition: "center bottom",
                                            transition: 'opacity 0.2s ease', // Анимация изменения прозрачности
                                            opacity: 1, // Начальная прозрачность в зависимости от состояния загрузки
                                        }}
                                        sizes={'100%'}
                                    />
                                </div>
                                :
                                <div className={s.image_container}
                                     onTouchStart={e => {
                                         e.stopPropagation()
                                         handleMouseEnter()
                                     }}
                                     onTouchEnd={e => {
                                         e.stopPropagation()
                                         handleMouseLeave()
                                     }}
                                     onMouseEnter={handleMouseEnter}
                                     onMouseLeave={handleMouseLeave}

                                >
                                    <Image
                                        src={desktopStore.isDesktop ? desktop : mobile}
                                        alt=''
                                        className={'placeholder_img'}
                                        fill={true}
                                        style={{
                                            position: 'absolute',
                                            objectFit: 'contain',
                                            objectPosition: "center bottom",
                                            transition: 'opacity 0.5s ease', // Анимация изменения прозрачности
                                            opacity: 1, // Начальная прозрачность в зависимости от состояния загрузки
                                        }}
                                        sizes={'100%'}
                                    />
                                </div>
                        )
                    }
                    <div className={s.text_block}
                    >
                        <div className={s.skeleton}></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard;


//     return (
//
//         <Link className={cardList ? s.card_list : s.card}
//               href={`/products/${slug}`}
//
//         >
//             <div className={s.icons_block}>
//                 <div style={{display: 'flex', alignItems: 'center'}}>
//                     {(isSale && price.start_price > price.final_price) && price.final_price > 0 && <div className={s.sale}>
//                         -{Math.ceil(100 - (price.final_price / price.start_price) * 100)}%
//                     </div>}
//                     {isFastShip && <Image src={truck} alt="shippment" className={s.truck}/>}
//                     {isReturn && <Image src={re} alt="shippment" className={s.truck}/>}
//                 </div>
//                 {userStore.isLogged
//                     ?
//                     <div className={s.like_block}
//                          onClick={(e) => {
//                              e.preventDefault()
//                              e.stopPropagation()
//                              isInWishlist ? deleteFromWL() : addToWL()
//                          }}>
//                         <Image src={isInWishlist ? like_fill : like} alt="like" className={s.like} width={20}/>
//                     </div>
//                     :
//                     <div onClick={e => {
//                         e.preventDefault()
//                         e.stopPropagation()
//                     }} className={s.like_block}>
//                         <AuthModal fromWishlist={true}>
//                             <Image src={isInWishlist ? like_fill : like} alt="like" className={s.like} width={20}
//                             />
//                         </AuthModal>
//                     </div>
//                 }
//             </div>
//             {photosArr && photosArr.length > 0 &&
//                 // <div
//                 //     className={`image-container ${isHovered && 'flipped'}`}
//                 //     onTouchStart={e => {
//                 //         e.stopPropagation()
//                 //         handleMouseEnter()
//                 //     }}
//                 //     onTouchEnd={e => {
//                 //         e.stopPropagation()
//                 //         handleMouseLeave()
//                 //     }}
//                 //     onMouseEnter={handleMouseEnter}
//                 //     onMouseLeave={handleMouseLeave}
//                 //     style={{
//                 //         // perspective: '1000px',
//                 //         width: '100%', // Укажите ширину и высоту карточки по вашему выбору
//                 //         height: '100%',
//                 //         position: 'relative',
//                 //         transformStyle: 'preserve-3d',
//                 //         // transition: 'transform 5s',
//                 //         // transform: isHovered ? 'rotateY(90deg)' : 'rotateY(0deg)',
//                 //     }}
//                 // >
//                 //     <div
//                 //
//                 //         style={{
//                 //             width: '100%',
//                 //             height: '100%',
//                 //             transformStyle: 'preserve-3d',
//                 //             transition: 'transform 0.5s',
//                 //             transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
//                 //         }}
//                 //     >
//                 //         {/* Ваш текущий код изображения здесь */}
//                 //         <Image
//                 //             style={{
//                 //                 position: 'absolute',
//                 //                 objectFit: 'contain',
//                 //                 objectPosition: 'center bottom',
//                 //                 width: '100%',
//                 //                 height: '100%',
//                 //             }}
//                 //             loading={'eager'}
//                 //             fill={true}
//                 //             className={isHovered && photos[1] && desktopStore.isDesktop ? 'opacity-0' : ''}
//                 //             onLoadingComplete={() => setIsLoading(false)}
//                 //             src={photosArr[0].url}
//                 //             alt="shoe"
//                 //         />
//                 //         {/* Здесь может быть другое содержимое обратной стороны карточки */}
//                 //         {photos[1] && (
//                 //             <Image
//                 //                 style={{
//                 //                     position: 'absolute',
//                 //                     objectFit: 'contain',
//                 //                     objectPosition: 'center bottom',
//                 //                     width: '100%',
//                 //                     height: '100%',
//                 //                     transform: 'scaleX(-1)'
//                 //                 }}
//                 //                 loading={'eager'}
//                 //                 fill={true}
//                 //                 className={isHovered && desktopStore.isDesktop ? '' : 'opacity-0'}
//                 //                 onLoadingComplete={() => setIsLoading(false)}
//                 //                 src={photos[1]}
//                 //                 alt="shoe"
//                 //             />
//                 //         )}
//                 //     </div>
//                 // </div>
//                 <div className={`image-container ${isHovered && 'flipped'}`}
//                      onTouchStart={e => {
//                          e.stopPropagation()
//                          handleMouseEnter()
//                      }}
//                      onTouchEnd={e => {
//                          e.stopPropagation()
//                          handleMouseLeave()
//                      }}
//                      onMouseEnter={handleMouseEnter}
//                      onMouseLeave={handleMouseLeave}
//
//                 >
//                     <Image
//                         style={{position: 'absolute', objectFit: 'contain', objectPosition: "center bottom"}}
//                         loading={'eager'}
//                         fill={true}
//                         className={isHovered && photos[1] && desktopStore.isDesktop ? 'opacity-0' : ''}
//                         onLoadingComplete={() => setIsLoading(false)}
//                         src={photosArr[0].url} alt="shoe"
//                         sizes={'100%'}
//                     />
//                     {photos[1] &&
//                         <Image
//                             style={{position: 'absolute', objectFit: 'contain', objectPosition: "center bottom"}}
//                             loading={'eager'}
//                             fill={true}
//                             className={isHovered && desktopStore.isDesktop? '' : 'opacity-0'}
//                             onLoadingComplete={() => setIsLoading(false)}
//                             src={photos[1]} alt="shoe"
//                             sizes={'100%'}
//                         />
//                     }
//                     <Image src={desktopStore.isDesktop ? desktop : mobile} alt=''
//                            className={'placeholder_img'} fill={true}
//                            style={isLoading ? {} : {opacity: 0}}
//                            sizes={'100%'}
//                     />
//                 </div>
//             }
//             <div className={s.text_block}
//                  ref={sizesRef}
//
//             >
//                 {
//                     !(isHovered && desktopStore.isDesktop && (product.available_sizes && product.available_sizes.sizes?.length))
//                         ?
//                         <>
//                             <div className={s.info}>
//                                 <div className={`${s.tag}`}>{brandsDisplay()}</div>
//                                 <div className={`${s.brand}`}>{model || 'No model'}</div>
//                                 <div className={`${s.name}`}>{colorway}</div>
//                             </div>
//
//
//
//                         </>
//                         :
//                         <div className={'text-black'}>
//                             <span className={'fw-bold'}>
//                                 Доступныe размеры{product.available_sizes.filter_logo ? ` (${product.available_sizes.filter_logo})` : ''}:</span>
//                             <br/>
//                             {renderSizes()}
//                         </div>
//                 }
//                 <div className={`${s.price_block}`}>
//                     {
//                         (isSale && price.start_price > price.final_price)
//                             ?
//                             Number(price.final_price) > 0
//                                 ?
//                                 <div className={`${s.price}`}>
//
//                                     <span className={s.sale_price}>от {addSpacesToNumber(price.final_price)} ₽ &nbsp;</span>
//                                     {!desktopStore.isDesktop && <br/>}
//                                     <span className={s.crossed}>{addSpacesToNumber(price.start_price)} ₽</span>
//                                     {/*<br/>*/}
//
//                                 </div>
//                                 :
//                                 <div className={`${s.price}`}>
//                                     Нет в наличии
//                                 </div>
//                             :
//                             <div className={`${s.price}`}>
//                                 {
//                                     Number(price.final_price) > 0
//                                         ?
//                                         `от ${addSpacesToNumber(price.final_price)} ₽`
//                                         :
//                                         'Нет в наличии'
//                                 }
//                             </div>
//                     }
//                 </div>
//             </div>
//         </Link>
//     );
// };
//
// export default ProductCard;