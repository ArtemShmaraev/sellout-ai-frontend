// BottomNav.js
import React from 'react';
import { useRouter } from 'next/router';
import s from './BottomNav.module.css';
import CartIcon from "@/components/shared/CartIcon/CartIcon";
import sellout_icon from "@/static/icons/favicon.jpg"
import Image from "next/image";

const BottomNav = () => {
    const router = useRouter();
    const { pathname } = router;

    const isHome = pathname === '/' || pathname.startsWith('/men') || pathname.startsWith('/women');
    const isCatalog = pathname.startsWith('/products');
    const isCart = pathname.startsWith('/cart');

    const handleNavigation = (path) => {
        router.push(path);
    };

    return (
        <div className={s.bottom_nav}>
            <div
                className={`${s.nav_item} ${isHome ? s.active : ''}`}
                onClick={() => handleNavigation('/')}
            >
                <div className={s.icon_wrapper}>
                    <Image style={{borderRadius: "4px"}}  width={28} src={sellout_icon} alt="four-squares"/>
                    {/*<svg className={s.nav_icon} viewBox="0 0 24 24">*/}
                    {/*    <path d="M10 20v-6h4v6h5v-10h3L12 3 2 12h3v10z" />*/}
                    {/*</svg>*/}
                </div>
            </div>
            <div
                className={`${s.nav_item} ${isCatalog ? s.active : ''}`}
                onClick={() => handleNavigation('/products')}
            >
                <div className={s.icon_wrapper}>
                    <svg className={s.nav_icon} viewBox="0 0 28 28">
                        <svg className={s.nav_icon} viewBox="0 0 28 28">
                            <rect x="1" y="1" width="12" height="12" rx="2" ry="2" />
                            <rect x="15" y="1" width="12" height="12" rx="2" ry="2" />
                            <rect x="1" y="15" width="12" height="12" rx="2" ry="2" />
                            <rect x="15" y="15" width="12" height="12" rx="2" ry="2" />
                        </svg>

                    </svg>
                </div>
            </div>
            <div
                className={`${s.nav_item} ${isCart ? s.active : ''}`}
                onClick={() => handleNavigation('/cart')}
            >
                <div className={s.icon_wrapper}>
                    <CartIcon />
                </div>
            </div>
        </div>
    );
};

export default BottomNav;
