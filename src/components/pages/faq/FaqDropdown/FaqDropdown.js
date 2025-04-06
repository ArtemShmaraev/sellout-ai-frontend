import React, {useState} from 'react';
import s from './FaqDropdown.module.css'
import minus from '@/static/icons/dash-lg.svg'
import plus from '@/static/icons/plus-lg.svg'
import Image from "next/image";

const FaqDropdown = ({label, children}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <div className={s.toggle} onClick={toggle}>
                <div>{label}</div>
                <Image src={isOpen ? minus : plus} alt='' width={20}/>
            </div>
            {
                isOpen &&
                <div className={s.text_block}>
                    {children}
                </div>
            }
        </>
    );
};

export default FaqDropdown;