import React, {useEffect, useState} from 'react';
import s from './AuthModal.module.css'
import {Container, Modal} from "react-bootstrap";
import close from '@/static/icons/x-lg.svg'
import RadioGroup from "../UI/RadioGroup/RadioGroup";
import CustomCheckbox from "../UI/CustoCheckbox/CustomCheckbox";
import Image from 'next/image'

const AuthModal = ({children}) => {
    const [show, setShow] = useState(false);
    const [isReg, setIsReg] = useState(true)
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
        <div>
            <button
                className={s.toggle_btn}
                onClick={handleShow}
            >
                {children}
            </button>
            <Modal show={show}
                   centered={true}
                   onHide={handleClose}
                   fullscreen={!isDesktop}
                   >
                <Modal.Body className='pt-4'>
                    <div className={s.close_block}>
                        <Image src={close} alt="" style={{cursor: 'pointer'}} onClick={handleClose}/>
                    </div>
                    <div className={s.mode_block}>
                        <button
                            className={s.mode_btn}
                            onClick={() => setIsReg(true)}
                            style={isReg ? {borderColor: "black"} : {borderColor: '#CCCCCC'}}
                        >
                            Регистрация
                        </button>
                        <button
                            className={s.mode_btn}
                            onClick={() => setIsReg(false)}
                            style={isReg ? {borderColor: '#CCCCCC'} : {borderColor: "black"}}
                        >
                            Вход
                        </button>
                    </div>
                    <div className={s.reg_block}>
                        {isReg
                            ?
                            <Container>
                                <h4 className={s.headers}>Зарегистрироваться с помощью...</h4>
                                <h4 className={s.headers}>Или зарегистрируйтесь по почте</h4>
                                <div className={s.input_block}>
                                    <label className={s.label}>Почта:</label>
                                    <input type="email" className={s.input}/>
                                    <p className={s.description}>Вам придёт письмо-подтверждение</p>
                                </div>
                                <div className={s.input_block}>
                                    <label className={s.label1}>Имя:</label>
                                    <input type="text" className={s.input}/>
                                </div>
                                <div className={s.input_block}>
                                    <label className={s.label}>Фамилия:</label>
                                    <input type="text" className={s.input}/>
                                </div>
                                <div className={s.input_block}>
                                    <label className={s.label}>Пароль:</label>
                                    <input type="password" className={s.input}/>
                                </div>
                                <div className={s.gender_block}>
                                    <label className={s.label}>Ваш пол:</label>
                                    <RadioGroup/>
                                </div>
                                <div className='d-flex mt-5'>
                                    <CustomCheckbox checked={true}
                                                    reversed={true}
                                                    labelText={'Хочу получать индивидуальные предложения и новости'}
                                                    labelClass={s.sub}
                                    />
                                </div>
                                <button className={s.reg_btn}>Зарегистрироваться</button>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, pariatur.</p>
                            </Container>
                            :
                            <Container>
                                <div className={s.input_block}>
                                    <label className={s.label}>Почта:</label>
                                    <input type="email" className={s.input}/>
                                </div>
                                <div className={s.input_block}>
                                    <label className={s.label}>Пароль:</label>
                                    <input type="password" className={s.input}/>
                                </div>
                                <button className={s.reg_btn}>Зарегистрироваться</button>
                                <div className='d-flex justify-content-center'>
                                    <a href="" className={s.forget_pass}>Забыли пароль?</a>
                                </div>
                                <h4 className={s.headers}>Войти с помощью...</h4>
                            </Container>
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AuthModal;