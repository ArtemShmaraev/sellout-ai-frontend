import React, {useEffect, useState} from 'react';
import s from './AuthModal.module.css'
import {Container, Modal} from "react-bootstrap";
import close from '@/static/icons/x-lg.svg'
import RadioGroup from "../UI/RadioGroup/RadioGroup";
import CustomCheckbox from "../UI/CustoCheckbox/CustomCheckbox";
import Image from 'next/image'
import {userStore} from "@/store/UserStore";
import {login, registration} from "@/http/userApi";

const AuthModal = ({children}) => {
    const [show, setShow] = useState(false);
    const [isReg, setIsReg] = useState(true)
    const [isDesktop, setIsDesktop] = useState(true)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [isMailingList, setIsMailingList] = useState(true)

    const [validEmail, setValidEmail] = useState(true);

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidEmail(emailRegex.test(email));
    };

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
    const reg = async () => {
        validateEmail()
        if (!validEmail) {
            return false
        }
        const data = {
            username: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            gender: userStore.gender,
            is_mailing_list: isMailingList
        }
        console.log(JSON.stringify(data))
        const tokens = await registration(JSON.stringify(data))
        console.log(tokens)
    }
    const log = async () => {
        const data = {
            username: email,
            password: password,
        }
        const tokens = await login(JSON.stringify(data))
        console.log(tokens)
    }
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
                                    <input type="email" className={s.input}
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                                    {!validEmail &&
                                        <p className={s.validate}>Некорректный формат почты</p>
                                    }
                                    <p className={s.description}>Вам придёт письмо-подтверждение</p>
                                </div>
                                <div className={s.input_block}>
                                    <label className={s.label1}>Имя:</label>
                                    <input type="text" className={s.input}
                                           value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className={s.input_block}>
                                    <label className={s.label}>Фамилия:</label>
                                    <input type="text" className={s.input}
                                           value={lastName}
                                           onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className={s.input_block}>
                                    <label className={s.label}>Пароль:</label>
                                    <input type="password" className={s.input}
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className={s.gender_block}>
                                    <label className={s.label}>Ваш пол:</label>
                                    <RadioGroup/>
                                </div>
                                <div className='d-flex mt-5' onClick={() => setIsMailingList(!isMailingList)}>
                                    <CustomCheckbox checked={isMailingList}
                                                    reversed={true}
                                                    labelText={'Хочу получать индивидуальные предложения и новости'}
                                                    labelClass={s.sub}
                                    />
                                </div>
                                <button className={s.reg_btn} onClick={reg}>Зарегистрироваться</button>
                            </Container>
                            :
                            <Container>
                                <div className={s.input_block}>
                                    <label className={s.label}>Почта:</label>
                                    <input type="email" className={s.input}
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={s.input_block}>
                                    <label className={s.label}>Пароль:</label>
                                    <input type="password" className={s.input}
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                    />
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