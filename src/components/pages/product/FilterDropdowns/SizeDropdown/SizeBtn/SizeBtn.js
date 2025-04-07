import React from 'react';
import s from './SizeBtn.module.css'

const SizeBtn = ({text, query, state, onClick}) => {
    return (
        <button className={`${s.btn} ${state ? s.btn_active : s.btn_default}`}
                onClick={onClick}
        >
            {text}
        </button>
    );
};

export default SizeBtn;