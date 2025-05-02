import React, {useRef, useState} from 'react';
import s from './Megamenu.module.css'
import Link from "next/link";

const Megamenu = ({children, className, label, link}) => {
    const ref = useRef(null)
    const [isShown, setIsShown] = useState(false)
    return (
        <div
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
        >
            <Link
                href={link}
                className={className}
                ref={ref}
            >
                {label}
            </Link>
            <div className={!isShown ? s.displayNone : ''}>
                <div className={s.all}
                >
                    <div className={s.megamenu}
                         ref={ref}
                    >
                        <div className={'custom_cont'}>
                            {children}
                        </div>
                    </div>
                    <div className={s.black_area}
                         onMouseEnter={() => setIsShown(false)}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Megamenu;