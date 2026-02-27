import React from 'react';
import s from './CookieComponent.module.css'
import Link from "next/link";
import {desktopStore} from "@/store/DesktopStore";
import Cookies from "js-cookie";

const CookieComponent = ({isOpen, close}) => {
    const selectedGender = Cookies.get('selected_gender')

    return (
        isOpen &&
        <div className={s.modal} style={{bottom: !desktopStore.isDesktop && (selectedGender === "M" || selectedGender === "F") ? '110px' : ''}}>
            <div className={s.text}>
                <Link href={'/docs/Политика%20конфиденциальности.pdf'}
                      target={'_blank'} style={{color: "white"}}>Мы собираем Cookie.</Link>
            </div>
            <button
                className={s.btn}
                onClick={close}
            >
                Понятно
            </button>
        </div>
    );
};

export default CookieComponent;