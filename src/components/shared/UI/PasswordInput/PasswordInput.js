import React, {useRef, useState} from 'react';
import s from './PasswordInput.module.css'
import Image from "next/image";
import eye from "@/static/icons/eye.svg";
import eyeCrossed from "@/static/icons/eye-slash.svg";

const PasswordInput = ({value, onChange, type="current-password"}) => {
    const [passShown, setPassShown] = useState(false)
    const ref = useRef(null)
    const changeVisibility = (e) => {
        e.preventDefault()
        setPassShown(!passShown)
        ref.current.focus()
    }
    return (
        <div className={s.block}>
            <input type={passShown ? 'text' : 'password'} className={s.input}
                   value={value}
                   onChange={onChange}
                   ref={ref}
                   name={type} autoComplete={type}
            />
            <Image src={passShown ? eye : eyeCrossed}
                   alt={'Показать/скрыть пароль'}
                   className={s.eye}
                   width={20}
                   onClick={(e) => changeVisibility(e)}
            />
        </div>
    );
};

export default PasswordInput;