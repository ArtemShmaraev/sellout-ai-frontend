import React, {useEffect, useState} from 'react';
import s from './HowWeWorkModal.module.css'
import {Modal} from "react-bootstrap";
import img from '@/static/img/Как мы работае-модалка.png'
import Image from "next/image";
import close from "@/static/icons/x-lg.svg";
import Link from "next/link";

const HowWeWorkModal = ({show, onHide}) => {
    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1000) {
            setIsDesktop(false)
        }
    }, [isDesktop])
    return (
        <Modal
            centered={true}
            show={show}
            onHide={onHide}
            fullscreen={!isDesktop}
            size={'lg'}
            contentClassName={s.p0}
        >
            <Modal.Body style={{padding: 0}}>
                <div className={s.close}>
                    <Image src={close} alt="" onClick={onHide} style={{cursor: 'pointer'}}/>
                </div>
                <Image src={img} alt='' className={s.img}/>
                <div className={s.text}>
                    Подробнее читайте в разделе <Link href={'/about'} className={s.link}>О нас</Link>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default HowWeWorkModal;