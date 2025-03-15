import React, {useRef} from 'react';
import s from './ScrollableBlock.module.css'

const ScrollableBlock = ({children}) => {
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
            <button className={s.left} onClick={scrollLeft}>
                &lt;
            </button>
            <div className={s.scrollableContainer} ref={scrollableContainerRef}>
                {children}
            </div>
            <button className={s.right} onClick={scrollRight}>
                &gt;
            </button>
        </div>
    );
};

export default ScrollableBlock;