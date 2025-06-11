import React, {useContext, useEffect, useState} from 'react';
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


const ProductCard = ({cardList = false, product}) => {
    const {id, model, slug, brands, collab, colorway, price} = product
    const isFastShip = product.is_fast_shipping
    const isReturn = product.is_return
    const isSale = product.is_sale
    const sale = product.sale_amount ?? ''
    const inWishlist = product.in_wishlist
    const photosArr = product.bucket_link


    const {userStore} = useContext(Context)
    const router = useRouter()
    const [isHovered, setIsHovered] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(inWishlist)

    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1200) {
            setIsDesktop(false)
        }
    }, [])

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
            for (let i = 0; i < photosArr.length; i++) {
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

    const addToWL = async () => {
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const data = await addToWishlist(userId, id, token)
        setIsInWishlist(true)
        const {pathname, query} = router
        router.push({pathname, query}, undefined, {scroll: false})
    }
    const deleteFromWL = async () => {
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const data = await removeFromWishlist(userId, id, token)
        setIsInWishlist(false)
        const {pathname, query} = router
        router.push({pathname, query}, undefined, {scroll: false})
    }
    const [isLoading, setIsLoading] = useState(true)

    const [sizesIsShown, setSizesIsShown] = useState(false)
    const showSizes = (e) => {
        e.preventDefault()
        if (product.available_sizes && product.available_sizes.sizes) {
            setSizesIsShown(true)
        }
    }
    const hideSizes = (e) => {
        e.preventDefault()
        if (product.available_sizes && product.available_sizes.sizes) {
            setSizesIsShown(false)
        }
    }
    const renderSizes = () => {
        if (product.available_sizes && product.available_sizes.sizes) {
            const sizes = product.available_sizes.sizes
            return sizes.length <= 25 ? sizes.join(', ') : `${sizes[0]} - ${sizes[sizes.length - 1]}`
        }
    }
    return (
        <Link className={cardList ? s.card_list : s.card}
           href={`/products/${slug}`}
        >
            <div className={s.icons_block}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {isSale && <div className={s.sale}>
                        -{Math.ceil(100 - (price.final_price/price.start_price) * 100)}%
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
                        <AuthModal fromWishlist={true}>
                            <Image src={isInWishlist ? like_fill : like} alt="like" className={s.like} width={20}
                            />
                        </AuthModal>
                    </div>
                }
            </div>
            {photosArr && photosArr.length > 0 &&
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
                        style={{position: 'absolute', objectFit: 'contain', objectPosition: "center bottom"}}
                        loading={'eager'}
                        fill={true}
                        className={isHovered && photos[1] ? 'opacity-0' : ''}
                        onLoadingComplete={() => setIsLoading(false)}
                        src={photosArr[0].url} alt="shoe"
                        sizes={'100%'}
                    />
                    {photos[1] &&
                        <Image
                            style={{position: 'absolute', objectFit: 'contain', objectPosition: "center bottom"}}
                            loading={'eager'}
                            fill={true}
                            className={isHovered ? '' : 'opacity-0'}
                            onLoadingComplete={() => setIsLoading(false)}
                            src={photos[1]} alt="shoe"
                            sizes={'100%'}
                        />
                    }
                    <Image src={isDesktop ? desktop : mobile} alt=''
                           className={'placeholder_img'} fill={true}
                           style={isLoading ? {} : {opacity: 0}}
                           sizes={'100%'}
                    />
                </div>
            }
            <div className={s.text_block}
                 onMouseEnter={showSizes}
                 onMouseLeave={hideSizes}
                 onTouchStart={showSizes}
                 onTouchEnd={hideSizes}
            >
                {
                    !sizesIsShown
                        ?
                        <>
                            <div className={s.info}>
                                <div className={`${s.tag}`}>{brandsDisplay()}</div>
                                <div className={`${s.brand}`}>{model || 'No model'}</div>
                                <div className={`${s.name}`}>{colorway}</div>
                            </div>
                            <div className={`${s.price_block}`}>
                                {
                                    isSale
                                        ?
                                        <div className={`${s.price}`}>
                                            <span className={s.crossed}>От {price.start_price} ₽</span>
                                            <span className={s.sale_price}>От {price.final_price} ₽</span>
                                        </div>
                                        :
                                        <div className={`${s.price}`}>От {price.final_price} ₽</div>
                                }
                            </div>
                        </>
                        :
                        <div className={'text-black'}>
                            <span className={'fw-bold'}>Доступные размеры {`(${product.available_sizes.filter_logo})`}:</span>
                            <br/>
                            {renderSizes()}
                        </div>
                }
            </div>
        </Link>
    );
};

export default ProductCard;