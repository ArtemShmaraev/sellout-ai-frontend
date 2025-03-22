import React, {useEffect, useState} from 'react';
import s from "./HowToChoose.module.css"
import {Modal} from "react-bootstrap";
import close from "@/static/icons/x-lg.svg";
import truck from "@/static/icons/truck.svg";
import refund from "@/static/icons/arrow-return-left.svg";

const HowToChoose = () => {
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
                Как выбрать срок доставки и цену?
            </button>
            <Modal
                centered={true}
                show={show}
                onHide={handleClose}
                fullscreen={!isDesktop}
            >
                <Modal.Body>
                    <div className={s.close}>
                        <img src={close} alt="" onClick={handleClose} style={{cursor: 'pointer'}}/>
                    </div>
                    <div className='text-center'>
                        <p className={s.text}>
                            Мы стараемся предоставить Вам как можно больший ассортимент на
                            всевозможных условиях, поэтому собираем предложения от разных продавцов,
                            варирующихся по срокам доставки и цене.
                        </p>
                        <p className={s.text}>
                            Самая быстрая доставка <img src={truck} alt="" className={s.icons}/> занимает от нескольких минут до 3 дней
                            в зависимости от вашего места проживания. По Москве обычно доставка в течение дня. Так как
                            для обеспечения такой скорости мы стараемся выкупать позиции у частных продавцов, как правило, цена выше.
                            Однако с развитием платформы SELLOUT наш склад постоянно пополняется, поэтому мы можем предоставлять самые
                            выгодные условия на все большее количество товаров. При этом
                            мы одни из немногих, кто может на таких условиях предоставить возврат даже на лимитированные товары
                            <img src={refund} alt="" className={s.icons}/>
                        </p>
                        <p className={s.text}>
                            Также существуют более длительные варианты доставок, однако
                            по более низким ценам. Наша команда ищет для Вас лучшее предложение со всего мира, оптимизируя все издержки.
                        </p>
                        <p className={s.text}>
                            Обратите внимание, некоторые модели нельзя заказать в количестве более, чем одной штуки за раз, в силу лимтированности.
                            Если Вы хотите приобрести несколько одинаковых товаров, разбейте их на разные заказы или обратитесь к нам и мы Вам поможем.
                        </p>
                        <p className={s.small_text}>Подробнее про доставку смотрите <a href="" className={s.link}>тут</a></p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default HowToChoose;