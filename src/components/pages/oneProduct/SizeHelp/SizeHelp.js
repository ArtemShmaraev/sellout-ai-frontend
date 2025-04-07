import React, {useContext, useEffect, useState} from 'react';
import s from './SizeHelp.module.css'
import {Modal} from "react-bootstrap";
import close from "@/static/icons/x-lg.svg";
import ruller from '@/static/img/ruller.svg'
import Image from "next/image";
import {Context} from "@/context/AppWrapper";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import {useRouter} from "next/router";

const SizeHelp = ({model, imgSrc}) => {
    const [show, setShow] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true)
    const {userStore} = useContext(Context)
    const router = useRouter()
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
                Помощь с выбором размера
            </button>
            <Modal
                centered={true}
                show={show}
                onHide={handleClose}
                fullscreen={!isDesktop}
                size={'lg'}
            >
                <Modal.Body>
                    <div className={s.close}>
                        <Image src={close} alt="" onClick={handleClose} style={{cursor: 'pointer'}}/>
                    </div>
                    <div className={s.text_block}>
                        <Image src={ruller} alt="" className={s.ruller}/>
                        <h5 className={s.header}>Помощь с выбором подходящего размера</h5>
                        <p className={s.text}>Некоторые модели обладают специфическими размерными сетками, отличающимися от стандартных,
                            поэтому требуют тщательного подбора. Мы позаботимся,
                            чтобы Вы приобрели идеальный товар!</p>
                        <div className={s.photo}>
                            <Image src={imgSrc} alt="" fill={true} style={{objectFit: 'contain'}}/>
                        </div>
                        <p className={s.description}>{model}</p>
                        <p className={s.text}>Мы рекомендуем выбирать на 1 размер больше Вашего обычного размера. Чтобы мы всегда знали,
                            какой размер рекомендовать, советуем
                            заполнить в Личном Кабинете {
                            userStore.isLogged
                                ?
                                <a href="/account" className={s.link}
                                   onClick={e => {
                                       e.preventDefault()
                                       router.push('/account')
                                   }}
                                >Ваш размер.</a>
                                :
                                <AuthModal inline={true}>
                                    <div className={s.link}>Ваш размер</div>
                                </AuthModal>
                            }</p>
                        <p className={s.text}>
                            На данный момент не все товары подлежат примерке и возврату, поэтому, если Вы все же
                            сомневаетесь в выборе подходящего размера, советуем попробовать примерить эту же или похожую
                            модель в другом месте, а после этого приобрести у нас.
                            Если у Вас остались вопросы, обращайтесь в <a href="" className={s.link}>службу поддержки</a>,
                            мы обязательно Вам поможем!
                            Спасибо за понимание! Приятных покупок!</p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SizeHelp;