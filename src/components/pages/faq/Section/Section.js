import React, {useContext, useEffect, useRef, useState} from 'react';
import s from "./Section.module.css";
import Image from "next/image";
import minus from "@/static/icons/dash-lg.svg";
import plus from "@/static/icons/plus-lg.svg";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";

const Section = ({label, children, id}) => {
    const {desktopStore} = useContext(Context)
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef(null);
    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(isOpen ? contentRef.current.scrollHeight + "px" : "0");
            setTimeout(() => {
                setContentHeight(isOpen ? contentRef.current.scrollHeight + "px" : "0");
            }, 500)
        }
    }, [isOpen, desktopStore.faqCnt]);
    return (
        <div className={s.section}>
            <div id={id}>
                <hr/>
                <div className={s.toggle} onClick={toggle}>
                    <div className={s.h}>{label}</div>
                    <Image src={isOpen ? minus : plus} alt='' width={20}/>
                </div>
            </div>
            <div ref={contentRef}
                 className={[s.children, isOpen ? s.open : ""].join(" ")}
                 style={{ maxHeight: contentHeight }}>
                {children}
            </div>
        </div>
    );
};

export default observer(Section);