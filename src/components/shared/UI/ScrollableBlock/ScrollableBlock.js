import React, {useRef} from 'react';
import s from './ScrollableBlock.module.css'
import arrow from '@/static/icons/chevron-right.svg'
import Image from "next/image";

const ScrollableBlock = ({children, noArrows = false}) => {
    const scrollableContainerRef = useRef(null);
    const scroll = 400

    const scrollLeft = () => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTo({
                left: scrollableContainerRef.current.scrollLeft - scroll,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTo({
                left: scrollableContainerRef.current.scrollLeft + scroll,
                behavior: 'smooth',
            });
        }
    };
    return (
        <div className={s.scrollableBlock}>
            <button className={s.left} onClick={scrollLeft} style={noArrows && {display: 'none'}}>
                <Image src={arrow} alt='' style={{transform: 'rotate(180deg) translateY(2px)'}} className={s.img}/>
            </button>
            <div className={s.scrollableContainer} ref={scrollableContainerRef}>
                {children}
            </div>
            <button className={s.right} onClick={scrollRight} style={noArrows && {display: 'none'}}>
                <Image src={arrow} alt='' className={s.img}/>
            </button>
        </div>
    );
};

export default ScrollableBlock;