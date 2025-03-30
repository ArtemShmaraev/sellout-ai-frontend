import React, {useContext, useState} from 'react';
import s from './ProductCard.module.css'
import shoe from '@/static/img/shoe.png'
import shoe2 from '@/static/img/shoe2.png'
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
                         id, inWishlist, smallCard}) => {
    const {userStore} = useContext(Context)
    const router = useRouter()
    const [isHovered, setIsHovered] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(inWishlist)
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
    }
    const deleteFromWL = async () => {
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const data = await removeFromWishlist(userId, id, token)
        setIsInWishlist(false)
    }
    return (
        <div className={smallCard ? s.sm_card : s.card} onClick={() => router.push(`products/${slug}`)}>
            <div className={s.icons_block}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {isSale && <div className={s.sale}>-20%</div>}
                    {isFastShip && <Image src={truck} alt="shippment" className={s.truck}/>}
                    {isReturn && <Image src={re} alt="shippment" className={s.truck}/>}
                </div>
                {userStore.isLogged
                    ?
                    <Image src={isInWishlist ? like_fill : like} alt="like" className={s.like}
                           onClick={(e) => {
                               e.stopPropagation()
                               isInWishlist ? deleteFromWL() : addToWL()
                           }}
                    />
                    :
                    <div onClick={e => e.stopPropagation()}>
                        <AuthModal fromWishlist={true}>
                            <Image src={isInWishlist ? like_fill : like} alt="like" className={s.like}
                            />
                        </AuthModal>
                    </div>
                }
            </div>
            <Image
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={smallCard ? s.sm_img : s.img}
                src={isHovered ? shoe2 : shoe} alt="shoe"/>
            <div className={s.text_block}>
                <div className={s.tag}>{brandsDisplay(brands)}</div>
                <div className={s.brand}>{model || 'No model'}</div>
                <div className={s.name}>{colorway}</div>
                <div className={s.price}>От {price}</div>
            </div>
        </div>
    );
};

export default ProductCard;