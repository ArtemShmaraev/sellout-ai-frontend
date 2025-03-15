import React, {useEffect, useState} from 'react';
import s from './BuyoutModal.module.css'
import {Col, Container, Form, Modal, Row} from "react-bootstrap";

const BuyoutModal = () => {
    const [isSend, setIsSend] = useState(false)
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
        setIsSend(false)
    };
    return (
        <Container style={{margin: '35px 0'}}>
            <div className={s.text_container}>
                <div className={s.text}>
                    Не смогли найти на нашей платформе то, что искали?
                    Оставьте заявку, и мы привезем Вам желаемый товар!
                </div>
                <button onClick={handleShow} className={s.toggle_btn}>Оставьте заявку</button>
            </div>

            <Modal show={show}
                   onHide={handleClose}
                   centered={true}
                   fullscreen={!isDesktop && !isSend}
            >
                {!isSend ?
                    <Modal.Body className='p-4'>
                        <div className='d-flex justify-content-end' onClick={handleClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path
                                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                        </div>
                        <Modal.Header className='mb-3'>
                            <p className={s.title}>Не смогли найти на нашей платформе то, что искали?
                                Оставьте заявку, и мы привезем Вам желаемый товар!</p>
                        </Modal.Header>
                        <Row className='gy-4'>
                            <Col lg={12}>
                                <input type="text"
                                       placeholder={'Фамилия Имя'}
                                       className={s.input}
                                />
                            </Col>
                            <Col lg={6} sm={12}>
                                <input type="text"
                                       placeholder={'@telegram_nickname'}
                                       className={s.input}
                                />
                            </Col>
                            <Col lg={6} sm={12}>
                                <input type="email"
                                       placeholder={'Почта'}
                                       className={s.input}
                                />
                            </Col>
                            <Col lg={12}>
                                <input type="text"
                                       placeholder={'Ссылка на товар'}
                                       className={s.input}
                                />
                            </Col>
                            <Col lg={12}>
                                <Form.Label>Прикрепите фото товара</Form.Label>
                                <Form.Control type="file"/>
                            </Col>
                            <Col lg={12}>
                            <textarea
                                rows={isDesktop ? 3 : 4}
                                placeholder={'Укажите дополнительные сведения о товаре: наимонования/артикул/' +
                                    'размер/цвет/другие характеристики товара'}
                                className={s.textarea}
                            />
                            </Col>
                            <Col lg={12}>
                                <p className={s.description}>Нажимая кнопку попку похуй <a href="">Ссылка</a></p>
                            </Col>
                            <Col lg={12} className='d-flex justify-content-center'>
                                <button onClick={() => setIsSend(true)} className={s.toggle_btn}>Отправить</button>
                            </Col>
                        </Row>
                    </Modal.Body>
                    :
                    <Modal.Body className='p-4'>
                        <div className='d-flex justify-content-end' onClick={handleClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path
                                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                        </div>
                        <p className={s.title}>Спасибо за оставленную заявку!
                            Мы постараемся связаться с Вами как можно скорее!</p>
                    </Modal.Body>
                }
            </Modal>
        </Container>
    );
};

export default BuyoutModal;