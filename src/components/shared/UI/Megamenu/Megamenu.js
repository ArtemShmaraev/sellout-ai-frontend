import React, {useRef, useState} from 'react';
import s from './Megamenu.module.css'

const Megamenu = ({children, className, label}) => {
    const ref = useRef(null)
    const [isShown, setIsShown] = useState(false)
    return (
        <div>
            <p
                className={className}
                ref={ref}
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
            >
                {label}
            </p>
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