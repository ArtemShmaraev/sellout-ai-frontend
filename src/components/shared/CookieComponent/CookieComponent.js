import React from 'react';
import s from './CookieComponent.module.css'

const CookieComponent = ({isOpen, close}) => {
    return (
        isOpen &&
        <div className={s.modal}>
            <div className={s.text}>
                Мы собираем Cookie.
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