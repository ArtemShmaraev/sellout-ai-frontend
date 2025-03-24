import React, { useState, useEffect } from 'react';
import s from './ScrollUp.module.css'
import arrow from '@/static/icons/chevron-up.svg'
import Image from "next/image";
import cn from 'classnames'; // Импортируйте библиотеку 'classnames'

const ScrollUp = () => {
    const [visible, setVisible] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const checkScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollPos > currentScrollPos;

        setPrevScrollPos(currentScrollPos);
        setVisible(visible);
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, [prevScrollPos]);

    const click = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    return (
        <div className={cn(s.scroll_btn, { [s.visible]: visible })} onClick={click}>
            <Image width={30} src={arrow} alt='' className={s.icon}/>
        </div>
    );
};

export default ScrollUp;
