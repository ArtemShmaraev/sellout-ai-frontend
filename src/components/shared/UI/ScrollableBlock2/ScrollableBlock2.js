import React, {useEffect, useRef, useState} from 'react';
import s from './ScrollableBlock2.module.css'

const ScrollableBlock2 = ({children}) => {
    const [isShown, setIsShown] = useState(false)
    const scrollableContainerRef = useRef(null);
    const [scroll, setIsScroll] = useState(400)

    useEffect(() => {
        if (window.innerWidth <= 1000) {
            setIsScroll(100)
        }
        if (scrollableContainerRef.current) {
            const { scrollWidth, clientWidth } = scrollableContainerRef.current;
            setIsShown(scrollWidth > clientWidth);
        }
    }, []);

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
            {isShown && <button className={s.left} onClick={scrollLeft}>
                &lt;
            </button>}
            <div className={s.scrollableContainer} ref={scrollableContainerRef}>
                {children}
            </div>
            {isShown && <button className={s.right} onClick={scrollRight}>
                &gt;
            </button>}
        </div>
    );
};

export default ScrollableBlock2;