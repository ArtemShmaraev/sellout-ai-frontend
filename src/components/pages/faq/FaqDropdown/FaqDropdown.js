import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './FaqDropdown.module.css'
import minus from '@/static/icons/dash-lg.svg'
import plus from '@/static/icons/plus-lg.svg'
import Image from "next/image";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";

const FaqDropdown = ({label, children}) => {
    const {desktopStore} = useContext(Context)
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
        desktopStore.incrementFaqCnt()
    }
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef(null);
    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(isOpen ? contentRef.current.scrollHeight + "px" : "0");
        }
    }, [isOpen]);
    return (
        <>
            <div className={s.toggle} onClick={toggle}>
                <div>{label}</div>
                <Image src={isOpen ? minus : plus} alt='' width={20}/>
            </div>
            <div ref={contentRef}
               className={[s.text_block, isOpen ? s.open : ""].join(" ")}
               style={{ maxHeight: contentHeight }}>
                {children}
                <hr/>
            </div>
        </>
    );
};

export default observer(FaqDropdown);