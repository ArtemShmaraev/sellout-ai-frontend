import React, {useState} from 'react';
import s from './LoyaltyFAQ.module.css'
import arrow from '@/static/icons/chevron-up-black.svg'
import Image from "next/image";

const LoyaltyFaq = ({children, title}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <div className={s.toggle} onClick={toggle}>
                {title}
                <Image src={arrow} alt='' width={25}
                       style={!isOpen ? {transform: 'rotate(180deg)'} : {}}/>
            </div>
            {isOpen &&
                <div className={s.text}>
                    {children}
                </div>
            }
        </>
    );
};

export default LoyaltyFaq;