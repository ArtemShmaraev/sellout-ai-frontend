import React, {useState} from 'react';
import s from './CustomRadio.module.css'

const CustomRadio = ({checked = false, label, onClick, margin = 0,
                         normalLabel = false, reversed=false}) => {
    return (
        <div className={`${s.radio}`} onClick={onClick} style={reversed ? {flexDirection: 'row-reverse'} : {}}>
            <label className={normalLabel ? s.normal_label : s.label}>{label}</label>
            <div className={s.big} style={{marginRight: `${margin}px`}}>
                {checked &&
                    <div className={s.small}></div>
                }
            </div>
        </div>
    );
};

export default CustomRadio;