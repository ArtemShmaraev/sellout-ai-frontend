import React, {useEffect, useState} from 'react';
import s from './SizeTable.module.css'
import {Modal} from "react-bootstrap";
import close from '@/static/icons/x-lg.svg'
import Image from "next/image";

const SizeTable = () => {
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
                Размерная сетка
            </button>
            <Modal
                centered={true}
                show={show}
                onHide={handleClose}
                fullscreen={!isDesktop}
            >
                <Modal.Body>
                    <div className={s.close}>
                        <div className={s.header}>Таблица размеров</div>
                        <Image src={close} alt="" onClick={handleClose} style={{cursor: 'pointer'}}/>
                    </div>
                    <div className={s.header}>Jordan</div>
                    <div className={s.header}>Сбер молодцы</div>
                    <div className={s.table_block}>
                        <table>
                            <tbody>
                            <tr>
                                <td className={s.td}>UK</td>
                                <td className={s.td}>UK</td>
                                <td className={s.td}>UK</td>
                                <td className={s.td}>UK</td>
                                <td className={s.td}>UK</td>
                                <td className={s.td}>UK</td>
                                <td className={s.td}>UK</td>
                            </tr>
                            <tr className={s.tr_gray}>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                            </tr>
                            <tr>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                            </tr>
                            <tr className={s.tr_gray}>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                            </tr>
                            <tr>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                            </tr>
                            <tr className={s.tr_gray}>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                            </tr>
                            <tr>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                            </tr>
                            <tr className={s.tr_gray}>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                            </tr>
                            <tr>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                            </tr>
                            <tr className={s.tr_gray}>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                            </tr>
                            <tr>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                            </tr>
                            <tr className={s.tr_gray}>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                            </tr>
                            <tr>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                                <td className={s.td}>9</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
};

export default SizeTable;