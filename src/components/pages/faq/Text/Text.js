import React from 'react';
import s from './Text.module.css'

const Text = ({title, children}) => {
    return (
        <div>
            <div className={s.h}>{title}</div>
            <p className={s.text_block}>{children}</p>
        </div>
    );
};

export default Text;