// BottomNav.js
import React from 'react';
import {useRouter} from 'next/router';
import s from './BottomNav.module.css';
import CartIcon from "@/components/shared/CartIcon/CartIcon";
import Image from "next/image";

import sellout_icon from "@/static/icons/favicon.jpg";

import cartNotSelected from "@/static/icons/CertMobileNavBarNotSelected.svg";
import accountNotSelected from "@/static/icons/AccountMobileNavBarNotSelected.svg";
import favouriteNotSelected from "@/static/icons/FavouriteMobileNavBarNotSelected.svg";
import homeNotSelected from "@/static/icons/HomeMobileNavBarNotSelected.svg";
import searchNotSelected from "@/static/icons/SearchMobileNavBarNotSelected.svg";

import cartSelected from "@/static/icons/CertMobileNavBarSelected.svg";
import accountSelected from "@/static/icons/AccountMobileNavBarSelected.svg";
import favouriteSelected from "@/static/icons/FavouriteMobileNavBarSelected.svg";
import homeSelected from "@/static/icons/HomeMobileNavBarSelected.svg";
import searchSelected from "@/static/icons/SearchMobileNavBarSelected.svg";

import Cookies from "js-cookie";

const BottomNav = () => {
    const router = useRouter();
    const {pathname} = router;

    const isCatalog = pathname.startsWith('/products');
    const isCart = pathname.startsWith('/cart');
    const isHome = pathname === '/' || pathname.startsWith('/men') || pathname.startsWith('/women');
    const isWishlist = pathname.startsWith('/wishlist');
    const isAccount = pathname.startsWith('/account');

    const handleNavigation = (path) => {
        router.push(path);
    };

    const handleNavigationCatalog = (path) => {
        let selected_gender = "M";
        selected_gender = Cookies.get('selected_gender');
        if (selected_gender) {
            if (selected_gender === "M") {
                router.push('/mobileMenuMen')
            } else {
                router.push('/mobileMenuWomen')
            }
        } else {
            router.push('/mobileMenuMen')
        }
        router.push(path);
    };

    return (
        <div className={s.bottom_nav}>
            <div
                className={s.nav_item}
                onClick={() => handleNavigationCatalog('/mobileMenuMen')}
            >
                <div className={s.icon_wrapper}>
                    <Image
                        width={28}
                        height={28}
                        src={search_icon}
                        alt="Search Icon"
                    />
                </div>
            </div>
            <div
                className={`${s.nav_item} ${isCart ? s.active : ''}`}
                onClick={() => handleNavigation('/cart')}
            >
                <div className={s.icon_wrapper}>
                    <Image
                        width={28}
                        height={28}
                        src={cart}
                        alt="Cart Icon"
                    />
                </div>
            </div>

            <div
                className={`${s.nav_item} ${isCatalog ? s.active : ''}`}
                onClick={() => handleNavigation('/products')}
            >
                <div className={s.icon_wrapper}>
                    <Image
                        width={28}
                        height={28}
                        src={logo}
                        alt="Catalog Icon"
                    />
                </div>
            </div>
            <div
                className={s.nav_item}
                onClick={() => handleNavigation('/favorites')}
            >
                <div className={s.icon_wrapper}>
                    <Image
                        width={28}
                        height={28}
                        src={fav}
                        alt="Favorites Icon"
                    />
                </div>
            </div>

            <div
                className={s.nav_item}
                onClick={() => handleNavigation('/profile')}
            >
                <div className={s.icon_wrapper}>
                    <Image
                        width={28}
                        height={28}
                        src={profile}
                        alt="Profile Icon"
                    />
                </div>
            </div>


        </div>
    );
};

export default BottomNav;
