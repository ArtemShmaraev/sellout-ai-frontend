import React, {useContext, useEffect, useState} from 'react';
import s from './AuthModal.module.css'
import {Container, Modal} from "react-bootstrap";
import close from '@/static/icons/x-lg.svg'
import RadioGroup from "../UI/RadioGroup/RadioGroup";
import CustomCheckbox from "../UI/CustoCheckbox/CustomCheckbox";
import Image from 'next/image'
import {login, registration} from "@/http/userApi";
import {updateCartFromCookies} from "@/http/cartApi";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import eye from '@/static/icons/eye.svg'
import eyeCrossed from '@/static/icons/eye-slash.svg'
import InputMask from "react-input-mask";
import {Context} from "@/context/AppWrapper";

const AuthModal = ({children, style = {}, fromWishlist = false, inline = false, order = false}) => {
    const router = useRouter()
    const {userStore, cartStore} = useContext(Context)

    const [show, setShow] = useState(false);
    const [isReg, setIsReg] = useState(true)
    const [isDesktop, setIsDesktop] = useState(true)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState()
    const [isMailingList, setIsMailingList] = useState(true)

    const [emailBusy, setEmailBusy] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [validEmail, setValidEmail] = useState(true);
    const [passShown, setPassShown] = useState(false)

    const handleChangeNumber = (e) => {
        const inputPhoneNumber = e.target.value;
        setPhone(inputPhoneNumber);
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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
        if (!validateEmail()) {
            setValidEmail(false);
            return false
        }
        setValidEmail(true);
        const data = {
            username: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            gender: userStore.gender,
            is_mailing_list: isMailingList
        }
        try {
            const res = await registration(JSON.stringify(data))
            setEmailBusy(false)
            const cookieCart = Cookies.get('cart')
            let cartFromBack
            if (cookieCart) {
                cartFromBack = await updateCartFromCookies(cookieCart, res.user_id, res.access)
            } else {
                cartFromBack = await updateCartFromCookies('', res.user_id, res.access)
            }
            cartStore.setCartCnt(cartFromBack.length)
            let newStr = ''
            cartFromBack.forEach(el => newStr += el + ' ')
            Cookies.set('cart', newStr)
            await router.push({pathname: router.pathname, query: router.query}, undefined, {scroll: false})
            userStore.setIsLogged(true)
            userStore.setId(res.user_id)
            userStore.setUsername(res.username)
            userStore.setFirstName(res.first_name)
            userStore.setLastName(res.last_name)
            userStore.setAccessToken(res.access)
            userStore.setGender(res.gender)
            setShow(false)
        } catch (e) {
            setEmailBusy(true)
        }
    }
    const log = async () => {
        if (!validateEmail()) {
            setValidEmail(false);
            return false
        }
        setValidEmail(true);
        const data = {
            username: email,
            password: password,
        }
        try {
            const res = await login(JSON.stringify(data))
            setWrong(false)
            const cookieCart = Cookies.get('cart')
            let cartFromBack
            if (cookieCart) {
                cartFromBack = await updateCartFromCookies(cookieCart, res.user_id, res.access)
            } else {
                cartFromBack = await updateCartFromCookies('', res.user_id, res.access)
            }
            cartStore.setCartCnt(cartFromBack.length)
            let newStr = ''
            cartFromBack.forEach(el => newStr += el + ' ')
            Cookies.set('cart', newStr)
            await router.push({pathname: router.pathname, query: router.query}, undefined, {scroll: false})
            userStore.setIsLogged(true)
            userStore.setId(res.user_id)
            userStore.setUsername(res.username)
            userStore.setFirstName(res.first_name)
            userStore.setLastName(res.last_name)
            userStore.setAccessToken(res.access)
            userStore.setGender(res.gender)
            setShow(false)
        } catch (e) {
            setWrong(true)
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        isReg ? await reg() : await log()
    };
    const changeVisibility = () => {
        setPassShown(!passShown)
    }
    return (
        <div>
            <button
                className={s.toggle_btn}
                onClick={handleShow}
                style={inline ? {display: 'inline', ...style} : style}
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
                    {
                        fromWishlist &&
                        <div className='text-center'>
                            Войдите или зарегистрируйтесь, чтобы добавлять товары в список избранного
                        </div>
                    }
                    {
                        order &&
                        <div className='text-center'>
                            Войдите или зарегистрируйтесь, чтобы оформить заказ
                        </div>
                    }
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
                    <form className={s.reg_block} onSubmit={e => handleSubmit(e)}>
                        {isReg
                            ?
                            <Container>
                                <h4 className={s.headers}>Зарегистрироваться с помощью...</h4>
                                <h4 className={s.headers}>Или зарегистрируйтесь по почте</h4>
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
                                    <label className={s.label}>Номер телефона</label>
                                    <InputMask mask="+7 999 999-99-99" maskChar={null}
                                               value={phone}
                                               onChange={e => handleChangeNumber(e)}
                                    >
                                        {(inputProps) => <input {...inputProps} type="tel"
                                                                className={s.input}
                                        />}
                                    </InputMask>
                                </div>
                                <div className={s.input_block}>
                                    <label className={s.label}>Почта:</label>
                                    <input type="email" className={s.input}
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                                    {!validEmail &&
                                        <p className={s.validate}>Некорректный формат почты</p>
                                    }
                                    {emailBusy &&
                                        <p className={s.validate}>Пользователь с таким email уже существует</p>
                                    }
                                    <p className={s.description}>Вам придёт письмо-подтверждение</p>
                                </div>
                                <div className={s.input_block}>
                                    <label className={s.label}>Пароль:</label>
                                    <div>
                                        <input type={passShown ? 'text' : 'password'} className={s.input_pass}
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <Image src={passShown ? eye : eyeCrossed}
                                               alt={'Показать/скрыть пароль'}
                                               className={s.eye}
                                               width={20}
                                               onClick={changeVisibility}
                                        />
                                    </div>
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
                                <button className={s.reg_btn} onClick={(e) => handleSubmit(e)} type={'submit'}>Зарегистрироваться</button>
                            </Container>
                            :
                            <Container>
                                <div className={s.input_block}>
                                    <label className={s.label}>Почта:</label>
                                    <input type="email" className={s.input}
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {!validEmail &&
                                        <p className={s.validate}>Некорректный формат почты</p>
                                    }
                                </div>
                                <div className={s.input_block}>
                                    <label className={s.label}>Пароль:</label>
                                    <div>
                                        <input type={passShown ? 'text' : 'password'} className={s.input_pass}
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <Image src={passShown ? eye : eyeCrossed}
                                               alt={'Показать/скрыть пароль'}
                                               className={s.eye}
                                               width={20}
                                               onClick={changeVisibility}
                                        />
                                    </div>
                                </div>
                                <button className={s.reg_btn} onClick={(e) => handleSubmit(e)} type={"submit"}>Войти</button>
                                {wrong &&
                                    <p className={s.validate}>Неверный логин или пароль</p>
                                }
                                <div className='d-flex justify-content-center'>
                                    <a href="" className={s.forget_pass}>Забыли пароль?</a>
                                </div>
                                <h4 className={s.headers}>Войти с помощью...</h4>
                            </Container>
                        }
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AuthModal;