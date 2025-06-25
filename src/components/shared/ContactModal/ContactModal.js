import React from 'react';
import s from './ContactModal.module.css'
import {Modal} from "react-bootstrap";
import cross from '@/static/icons/x-lg.svg'
import Image from "next/image";
import headphones from '@/static/icons/headphones-circle.svg'
import Link from "next/link";
import tg from "@/static/icons/tg_black.svg";
import vk from "@/static/icons/vk_black.svg";

const ContactModal = ({isOpen, handleClose}) => {
    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            centered={true}
        >
            <Modal.Body>
                <div className={'d-flex justify-content-end'}>
                    <Image src={cross} alt='' onClick={handleClose} style={{cursor: 'pointer'}}/>
                </div>
                <div className={s.content}>
                    <Image src={headphones} alt='' width={60}/>
                    <div className={s.text_cont}>
                        <h5>Вы всегда можете написать в службу поддержки и мы будем рады вам помочь</h5>
                        <div>
                            <div>
                                Почта: <a href={'mailto:customerservice@sellout.su'}
                                   className={s.link}>customerservice@sellout.su</a>
                            </div>
                            <div>
                                WhatsApp: <a href={'https://wa.me/message/L2OINP6KNMNLA1'}
                                   target={'_blank'}
                                   className={s.link}>+7 993 896-92-27</a>
                            </div>
                            <div>
                                Telegram: <a href={'https://t.me/sellout_official'}
                                   target={'_blank'}
                                   className={s.link}>@sellout_official</a>
                            </div>
                        </div>
                        <h5>Ответы на большинство вопросов Вы найдете здесь: <Link href={'/faq'} className={s.link} onClick={handleClose}>FAQ</Link></h5>
                        <div>
                            <h5>Мы в социальных сетях:</h5>
                            <div className={s.icons_block}>
                                <a href={''}>
                                    <Image src={tg} width={50} alt="" className={s.icon}/>
                                </a>
                                <a href={''}>
                                    <Image src={vk} width={63} alt="" className={s.icon}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ContactModal;