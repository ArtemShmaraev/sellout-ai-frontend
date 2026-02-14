import React, { useState } from 'react';
import s from './PromoBanner.module.css';
import green_gift from "@/static/icons/gift-green.svg";
import Image from "next/image";
import AuthModal from "@/components/shared/AuthModal/AuthModal";

const PromoBanner = ({ isOpen, close }) => {
    const [closing, setClosing] = useState(false);

    const handleClose = () => {
        setClosing(true);
        setTimeout(close, 300); // Длительность должна совпадать с длительностью анимации
    };

    return (
        isOpen && (
            <div className={`${s.promo_banner} ${closing ? s.closing : ''}`}>
                <button className={s.close_btn} onClick={handleClose}>✖</button>
                <div className={s.text_container}>
                    <p className={s.textp}>
                        <span className={s.text}>1000</span>
                        <Image src={green_gift} alt='' className={s.bonus_icon}/>
                        <span className={s.text}>бонусов к заказу</span>
                    </p>
                    <p className={s.textp}>
                        <span className={s.text}>за регистрацию</span>
                    </p>
                </div>
                <AuthModal style={{ width: "110px" }} order={true}>
                    <button className={s.register_btn}>Получить</button>
                </AuthModal>
            </div>
        )
    );
};

export default PromoBanner;
