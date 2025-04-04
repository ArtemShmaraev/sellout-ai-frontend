import React, {useState} from 'react';
import s from './PromoInput.module.css'
import Image from "next/image";
import icon from "@/static/icons/chevron-right.svg";

const PromoInput = ({placeholder}) => {
    const [value, setValue] = useState('')
    return (
        <div>
            <div className={s.input}>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className={s.mailing}
                />
                <Image
                    className={s.icon}
                    src={icon}
                    alt="search"
                />
            </div>

        </div>
    );
};

export default PromoInput;