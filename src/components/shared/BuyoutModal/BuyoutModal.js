import React, {useContext, useEffect, useState} from 'react';
import s from './BuyoutModal.module.css'
import {Col, Container, Form, Modal, Row} from "react-bootstrap";
import close from '@/static/icons/x-lg.svg'
import Image from 'next/image'
import InputMask from "react-input-mask";
import {Context} from "@/context/AppWrapper";
import {fetchUserInfo2} from "@/http/userApi";
import Cookies from "js-cookie";
import {buyout} from "@/http/productsApi";

const BuyoutModal = ({show, handleClose}) => {
    const [isSend, setIsSend] = useState(false)
    const {userStore} = useContext(Context)
    const [isDesktop, setIsDesktop] = useState(true)
    const [name, setName] = useState('');
    const [tg, setTg] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [link, setLink] = useState('');
    const [info, setInfo] = useState('');
    const [img, setImg] = useState(null)
    useEffect(() => {
        const token = Cookies.get('access_token')
        if (token && userStore.id) {
            const id = userStore.id
            fetchUserInfo2(token, id).then(res => {
                setName(res.first_name)
                setEmail(res.username)
                setPhone(res.phone_number)
            })
        }
    }, [userStore.isLogged])
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1200) {
            setIsDesktop(false)
        }
    }, [isDesktop])
    const send = async () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('tg_name', tg)
        formData.append('phone_number',phone)
        formData.append('email', email)
        formData.append('url', link)
        formData.append('info', info)
        formData.append('file', img)
        const res = await buyout(formData)
        setIsSend(true)
    }
    return (
        <Modal show={show}
               onHide={handleClose}
               centered={true}
               fullscreen={!isDesktop && !isSend}
        >
            {!isSend ?
                <Modal.Body className='p-4'>
                    <div className='d-flex justify-content-end'>
                        <Image src={close} alt='' className={s.close} onClick={handleClose}/>
                    </div>
                    <Modal.Header className='mb-3'>
                        <p className={s.title}>Не нашли то, что искали?
                            Оставьте заявку, и мы привезем вам желаемый товар!</p>
                    </Modal.Header>
                    <Row className='gy-4'>
                        <Col lg={12}>
                            <input type="text"
                                   placeholder={'Имя*'}
                                   className={s.input}
                                   value={name}
                                   onChange={e => setName(e.target.value)}
                            />
                        </Col>
                        <Col lg={6} sm={12}>
                            <input type="text"
                                   placeholder={'@telegram_nickname'}
                                   className={s.input}
                                   value={tg}
                                   onChange={e => setTg(e.target.value)}
                            />
                        </Col>
                        <Col lg={6} sm={12}>
                            <input type="email"
                                   placeholder={'Почта*'}
                                   className={s.input}
                                   value={email}
                                   onChange={e => setEmail(e.target.value)}
                            />
                        </Col>
                        <Col lg={12}>
                            <InputMask mask="+7 999 999-99-99" maskChar={null}
                                       placeholder={'Номер телефона*'}
                                       value={phone}
                                       onChange={e => setPhone(e.target.value)}
                            >
                                {(inputProps) => <input {...inputProps} type="tel"
                                                        className={s.input}
                                />}
                            </InputMask>
                        </Col>
                        <Col lg={12}>
                            <input type="text"
                                   placeholder={'Ссылка на товар, бренд, магазин и.т.д.'}
                                   className={s.input}
                                   value={link}
                                   onChange={e => setLink(e.target.value)}
                            />
                        </Col>
                        <Col lg={12}>
                            <Form.Label>Прикрепите фото товара</Form.Label>
                            <Form.Control type="file" multiple={false   }
                                          onChange={(e => setImg(e.target.files[0]))}
                            />
                        </Col>
                        <Col lg={12}>
                            <textarea
                                rows={isDesktop ? 3 : 4}
                                placeholder={'Укажите дополнительные сведения о товаре: наимонования/артикул/' +
                                    'размер/цвет/другие характеристики товара'}
                                className={s.textarea}
                                value={info}
                                onChange={e => setInfo(e.target.value)}
                            />
                        </Col>
                        <Col lg={12} className='d-flex justify-content-center'>
                            <button onClick={() => {
                                send()
                            }} className={s.send}>Отправить</button>
                        </Col>
                        <p className={s.description}>Нажимая кнопку “Отправить”, вы соглашаетесь на <a href="/docs/Пользовательское_соглашение_SELLOUT.pdf" className={s.link}
                        >обработку персональных данных</a></p>
                    </Row>
                </Modal.Body>
                :
                <Modal.Body className='p-4'>
                    <div className='d-flex justify-content-end'>
                        <Image src={close} alt='' className={s.close} onClick={handleClose}/>
                    </div>
                    <p className={s.title}>Спасибо за оставленную заявку!
                        Мы постараемся связаться с вами как можно скорее!</p>
                </Modal.Body>
            }
        </Modal>
    );
};

export default BuyoutModal;