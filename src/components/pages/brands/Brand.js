import React, {useContext, useState} from 'react';
import s from './Brand.module.css'
import Image from "next/image";
import like from "@/static/icons/heart.svg";
import Cookies from "js-cookie";
import {Context} from "@/context/AppWrapper";
import {addToFavouriteBrands, deleteFavouriteBrands} from "@/http/wishlistAPI";
import like_fill from "@/static/icons/heart-fill.svg";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import {useRouter} from "next/router";

const Brand = ({name, inWL, brandId, query}) => {
    const router = useRouter()
    const {userStore} = useContext(Context)
    const [isInWishlist, setIsInWishlist] = useState(inWL)
    const addToFB = async () => {
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const data = await addToFavouriteBrands(userId, brandId, token)
        setIsInWishlist(true)
    }
    const deleteFromFB = async () => {
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const data = await deleteFavouriteBrands(userId, brandId, token)
        setIsInWishlist(false)
    }
    return (
        <div className={s.brand} key={brandId}>
            {userStore.isLogged
                ?
                <Image src={isInWishlist ? like_fill : like} alt="like" className={s.like}
                       onClick={(e) => {
                           e.stopPropagation()
                           isInWishlist ? deleteFromFB() : addToFB()
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
            <a href={`/products?line=${query}`}
               className={s.brand_link}
               onClick={(e) => {
                   e.preventDefault()
                   router.push(`/products?line=${query}`)
               }}
            >{name}</a>
        </div>
    );
};

export default Brand;