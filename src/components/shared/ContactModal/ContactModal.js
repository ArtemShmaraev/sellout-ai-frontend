import React from 'react';
import s from './ContactModal.module.css'
import {Modal} from "react-bootstrap";
import cross from '@/static/icons/x-lg.svg'
import Image from "next/image";
import headphones from '@/static/icons/headphones-circle.svg'
import Link from "next/link";
import tg from "@/static/icons/tg_black.svg";
import vk from "@/static/icons/vk_black.svg";
import inst_star from "@/static/icons/instagram_star.svg";
import igBlack from "@/static/icons/igImg.svg";
import tgBlack from "@/static/icons/tg_black.svg";

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
                        <h5>Вы всегда можете написать в службу поддержки, и мы будем рады вам помочь!</h5>
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
                        <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'} className={s.link} onClick={handleClose} target={'_blank'}>FAQ</Link></h5>
                        <div>
                            <h5>Мы в социальных сетях:</h5>
                            <div className={s.icons_block}>
                                <div className={s.socialsCont}>
                                    <a style={{height: '45px'}}>
                                        <Image src={igBlack} height={40} alt="" className={s.icon}/>
                                    </a>
                                    <span className={s.mainSocialsText}>
                                                  Запретграм: <br/> @sellout_platform
                                            </span>
                                </div>

                                <div className={s.socialsCont}>
                                    <a href={'https://t.me/selloutsu'} style={{height: '37px'}}>
                                        <Image src={tgBlack} height={37} alt="" className={s.icon}/>
                                    </a>
                                    <span className={s.mainSocialsText}>
                                                  Телеграм: <br/>
                                                  @<a href="https://t.me/selloutsu" className={s.linkTgSocials}>
                                                    selloutsu
                                                  </a>
                                            </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ContactModal;