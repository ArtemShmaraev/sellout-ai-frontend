import React, {useEffect, useState} from 'react';
import s from './TextModal.module.css'
import {Modal} from "react-bootstrap";
import close from "@/static/icons/x-lg.svg";
import Image from 'next/image'

const TextModal = ({children, title, img}) => {
    const [show, setShow] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1000) {
            setIsDesktop(false)
        }
    }, [isDesktop])
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };
    return (
        <>
            <button
                className={s.toggle_btn}
                onClick={handleShow}
            >
                <Image src={img} alt="" className={s.icon}/>
                {title}
            </button>
            <Modal
                centered={true}
                show={show}
                onHide={handleClose}
                fullscreen={!isDesktop}
            >
                <Modal.Body>
                    <div className={s.close}>
                        <Image src={close} alt="" onClick={handleClose} style={{cursor: 'pointer'}}/>
                    </div>
                    <div className='text-center'>
                        {children}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default TextModal;