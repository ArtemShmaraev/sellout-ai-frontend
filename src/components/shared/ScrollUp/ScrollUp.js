import s from './ScrollUp.module.css'
import arrow from '@/static/icons/chevron-up.svg'
import Image from "next/image";

const ScrollUp = () => {
    const click = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
    return (
        <div className={s.scroll_btn} onClick={click}>
            <Image width={30} src={arrow} alt='' className={s.icon}/>
        </div>
    );
};

export default ScrollUp;