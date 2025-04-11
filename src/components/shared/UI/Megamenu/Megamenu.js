import React, {useRef, useState} from 'react';
import s from './Megamenu.module.css'
import {useRouter} from "next/router";

const Megamenu = ({children, className, label, link}) => {
    const router = useRouter()
    const ref = useRef(null)
    const [isShown, setIsShown] = useState(false)
    const clickLabel = (e) => {
        e.preventDefault()
        router.push(link)
    }
    return (
        <div>
            <a
                href={link}
                className={className}
                ref={ref}
                onClick={(e) => clickLabel(e)}
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
            >
                {label}
            </a>
            {isShown &&
                <div className={s.all}
                >
                    <div className={s.megamenu}
                         ref={ref}
                         onMouseEnter={() => setIsShown(true)}
                         onMouseLeave={() => setIsShown(false)}
                    >
                        <div className={'custom_cont'}>
                            {children}
                        </div>
                    </div>
                    <div className={s.black_area}
                         onMouseEnter={() => setIsShown(false)}
                    ></div>
                </div>
            }
        </div>
    );
};

export default Megamenu;