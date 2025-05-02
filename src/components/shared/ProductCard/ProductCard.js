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


const ProductCard = ({model, brands, colorway, price, slug, isReturn, isFastShip, isSale,
                         id, inWishlist, photosArr, cardList = false}) => {
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

    const brandsDisplay = (brands) => {
        if (!brands) {
            return 'No brand'
        }
        for (let i = 0; i < brands.length; i++) {
            if (brands[i].name === 'Yeezy') {
                return 'Adidas Yeezy'
            }
        }
        if (brands.length > 1) {
            let str = brands[0].name
            for (let i = 1; i < brands.length; i++) {
                str += ` x ${brands[i].name}`
            }
            return str
        }
        return brands[0].name
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
    return (
        <a className={cardList ? s.card_list : s.card}
           onClick={(e) => {
               e.preventDefault()
               e.stopPropagation()
               router.push(`/products/${slug}`)
           }}
           href={`/products/${slug}`}
        >
            <div className={s.icons_block}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {isSale && <div className={s.sale}>-20%</div>}
                    {isFastShip && <Image src={truck} alt="shippment" className={s.truck}/>}
                    {isReturn && <Image src={re} alt="shippment" className={s.truck}/>}
                </div>
                {userStore.isLogged
                    ?
                    <div className={s.like_block}
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            isInWishlist ? deleteFromWL() : addToWL()
                    }}>
                        <Image src={isInWishlist ? like_fill : like} alt="like" className={s.like} width={20}/>
                    </div>
                    :
                    <div onClick={e => e.stopPropagation()} className={s.like_block}>
                        <AuthModal fromWishlist={true}>
                            <Image src={isInWishlist ? like_fill : like} alt="like" className={s.like} width={20}
                            />
                        </AuthModal>
                    </div>
                }
            </div>
            {photosArr &&
                <div className={s.image_container}
                     onTouchStart={e => {
                         e.stopPropagation()
                         handleMouseEnter()
                     }}
                     onTouchEnd={e => {
                         e.stopPropagation()
                         handleMouseLeave()
                     }}
                >
                    <Image
                        style={{position: 'absolute', objectFit: 'contain'}}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        loading={'eager'}
                        fill={true}
                        className={isHovered && photos[1] ? 'opacity-0' : ''}
                        src={photos[0]} alt="shoe"/>
                    {photos[1] &&
                        <Image
                            style={{position: 'absolute', objectFit: 'contain'}}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            loading={'eager'}
                            fill={true}
                            className={isHovered ? '' : 'opacity-0'}
                            src={photos[1]} alt="shoe"/>
                    }
                </div>
            }
            <div className={s.text_block}>
                <div className={s.info}>
                    <div className={`${s.tag}`}>{brandsDisplay(brands)}</div>
                    <div className={`${s.brand}`}>{model || 'No model'}</div>
                    <div className={`${s.name}`}>{colorway}</div>
                </div>
                <div className={`${s.price_block}`}>
                    <div className={`${s.price}`}>От {price}</div>
                </div>
            </div>
        </a>
    );
};

export default ProductCard;