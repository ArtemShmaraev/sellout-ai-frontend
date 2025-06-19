import React, {useState} from 'react';
import s from "./Section.module.css";
import Image from "next/image";
import minus from "@/static/icons/dash-lg.svg";
import plus from "@/static/icons/plus-lg.svg";

const Section = ({label, children, id}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <div id={id}>
                <hr/>
                <div className={s.toggle} onClick={toggle}>
                    <div className={s.h}>{label}</div>
                    <Image src={isOpen ? minus : plus} alt='' width={20}/>
                </div>
            </div>
            {
                isOpen &&
                <div>
                    {children}
                </div>
            }
        </>
    );
};

export default Section;