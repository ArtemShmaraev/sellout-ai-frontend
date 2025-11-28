import React from 'react';
import s from './CookieComponent.module.css'
import Link from "next/link";

const CookieComponent = ({isOpen, close}) => {
    return (
        isOpen &&
        <div className={s.modal}>
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