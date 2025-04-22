import React, {useState} from 'react';
import s from './FooterDropdown.module.css'
import Arrow from "../Arrow/Arrow";

const FooterDropdown = ({children, header}) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={s.dropdown}>
            <div onClick={() => setIsOpen(!isOpen)} className={s.toggle}>
                <h4>{header}</h4>
                <Arrow isOpen={isOpen} white={true}/>
            </div>
            {isOpen &&
                <div>
                    {children}
                </div>
            }
        </div>
    );
};

export default FooterDropdown;