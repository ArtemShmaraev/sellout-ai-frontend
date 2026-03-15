import React, {useContext, useEffect, useState} from 'react';
import s from './TextModalDesktopProductPage.module.css'
import {Modal} from "react-bootstrap";
import close from "@/static/icons/x-lg.svg";
import Image from 'next/image'
import {Context} from "@/context/AppWrapper";

const TextModalDesktopProductPage = ({
                                         children,
                                         title,
                                         img,
                                         titleClassname,
                                         imgSize = 34,
                                         width = 'fit-content'
                                     }) => {
    const [show, setShow] = useState(false);
    const {desktopStore} = useContext(Context)
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };

    return (
        <>
            {
                !titleClassname
                    ?
                    <>
                        <button
                            className={s.toggle_btn}
                            onClick={handleShow} style={title === "Нашли дешевле?" ? {
                            width: '100%',
                            justifyContent: 'center',
                            paddingTop: '10px',
                            paddingBottom: '0'
                        } : {width: width}}>
                            {
                                title !== "Нашли дешевле?" ?
                                    <Image src={img} alt="" className={s.icon}
                                           style={{minWidth: `${imgSize}px`, marginRight: `${10 + 34 - imgSize}px`}}/>
                                    :
                                    <></>
                            }

                            <div className={s.label} style={title === "Нашли дешевле?" ? {
                                fontWeight: 700,
                                fontSize: "14px",
                                color: '#51031D',
                                textDecoration: 'underline',
                                textAlign: 'center'
                            } : title === "Гарантии оригинальности и отзывы" ? {
                                color: 'green'
                            } : {}}>
                                {title}
                            </div>
                        </button>
                    </>
                    :
                    <p className={titleClassname} onClick={handleShow}>{title}</p>
            }
            <Modal
                centered={true}
                show={show}
                onHide={handleClose}
                fullscreen={!desktopStore.isDesktop}
                size={'lg'}
            >
                <Modal.Body style={title === "Гарантии оригинальности и отзывы" ? {
                    paddingBottom: '0'
                } : {}}>
                    <div className={s.close}>
                        <Image src={close} alt="" onClick={handleClose} style={{cursor: 'pointer'}}/>
                    </div>
                    <div className={s.text_block} style={title === "Гарантии оригинальности и отзывы" ? {
                        marginBottom: '0'
                    } : {}}>
                        {children}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default TextModalDesktopProductPage;