import React, {useContext, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import Image from "next/image";
import cross from "@/static/icons/x-lg.svg";
import s from "./ReferralModal.module.css";
import megaphone from "@/static/img/megaphone.svg";
import Cookies from "js-cookie";
import {addPartner, fetchUserInfo2} from "@/http/userApi";
import {Context} from "@/context/AppWrapper";

const ReferralModal = ({isOpen, handleClose}) => {
    const {userStore} = useContext(Context)

    const [name, setName] = useState('');
    const [tg, setTg] = useState('');
    const [email, setEmail] = useState('');
    const [promoting, setPromoting] = useState('')
    const [partnership, setPartnership] = useState('')
    useEffect(() => {
        const token = Cookies.get('access_token')
        if (token && userStore.id) {
            const id = userStore.id
            fetchUserInfo2(token, id).then(res => {
                setName(res.first_name)
                setEmail(res.email)
            })
        }
    }, [userStore.isLogged])
    const [success,setSuccess] = useState(false)
    const sendData = async (e) => {
        e.preventDefault()
        const obj = {
            email: email,
            name: name,
            tg: tg,
            chanels: promoting,
            other: partnership
        }
        const token = Cookies.get('access_token')
        const res = await addPartner(obj, token)
        setSuccess(true)
    }
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
                    <Image src={megaphone} alt='' width={80}/>
                    <div className={s.text_cont}>
                        <h5>Заполните заявку и станьте нашим партнером</h5>
                        <form onSubmit={e => sendData(e)}>
                            <input
                                className={s.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={'Имя*'}
                            />
                            <div className={s.two_inputs}>
                                <input
                                    className={s.input}
                                    value={tg}
                                    onChange={(e) => setTg(e.target.value)}
                                    placeholder={'@telegram_nickname'}
                                />
                                <input
                                    className={s.input}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={'Почта*'}
                                />
                            </div>
                            <textarea
                                rows={3}
                                placeholder={'Укажите все каналы продвижения, которые ' +
                                    'планируете использовать, в удобном вам формате (соц. сети, блог, сообщества и.т.д)'}
                                className={s.textarea}
                                value={promoting}
                                onChange={e => setPromoting(e.target.value)}
                            />
                            <textarea
                                rows={3}
                                placeholder={'Расскажите, как вы видите наше партнерство (необязательно)'}
                                className={s.textarea}
                                value={partnership}
                                onChange={e => setPartnership(e.target.value)}
                            />
                            <button className={s.btn} type={'submit'}>Отправить</button>
                            {success && <p className={'green_text text-center'}>Ваша заявка отправлена</p>}
                            <p>Нажимая кнопку “Отправить”, вы соглашаетесь
                                на <a href={'/docs/Политика%20конфиденциальности.pdf'} target={'_blank'}
                                      className={'text-black'}>обработку персональных данных</a></p>
                        </form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ReferralModal;