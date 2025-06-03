import React, {useState} from 'react';
import s from './PromoInput.module.css'
import Image from "next/image";
import icon from "@/static/icons/chevron-right.svg";

const PromoInput = ({value, placeholder, onChange,onClick}) => {
    return (
        <div>
            <div className={s.input}>
                <form onSubmit={onClick}>
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={s.mailing}
                    />
                    <button className={s.button} type={'submit'}>
                        <Image
                            src={icon}
                            alt="search"
                        />
                    </button>
                </form>
            </div>

        </div>
    );
};

export default PromoInput;