import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import s from "./PassEmailModal.module.css";
import Image from "next/image";
import cross from "@/static/icons/x-lg.svg";
import {sendPassEmail} from "@/http/userApi";

const PassEmailModal = ({show, onHide, defEmail}) => {
    const [email, setEmail] = useState(defEmail)
    const [sentEmail, setSentEmail] = useState('')
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const [validEmail, setValidEmail] = useState(true);
    const [sent, setSent] = useState(false);
    const sendData = async (e) => {
        e.preventDefault()
        if (!validateEmail()) {
            setValidEmail(false)
            return null
        }
        setValidEmail(true)
        await sendPassEmail(email)
        setSentEmail(email)
        setSent(true)
    }
    return (
        <div>
            <Modal
                show={show}
                onHide={onHide}
                centered={true}
            >
                <Modal.Body>
                    <div className={s.close_block}>
                        <Image src={cross} alt='' onClick={onHide} className={s.cross}/>
                    </div>
                    <div className={'text-center'}>
                        <h4>Забыли пароль?</h4>
                        <p>Мы отправим письмо на указанную почту для восстановления пароля</p>
                    </div>
                    <form onSubmit={(e) => sendData(e)}>
                        <label className={s.label}>Почта</label>
                        <input className={s.input}
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className={'d-flex justify-content-center'}>
                            <button className={s.btn}
                                    type={'submit'}
                            >Отправить</button>
                        </div>
                        {!validEmail &&
                            <div className={'red_text text-center mt-2'}>Некорректный формат почты</div>
                        }
                        {sent &&
                            <div className={'green_text text-center mt-2'}>Письмо отправлено на почту {sentEmail}</div>
                        }
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default PassEmailModal;