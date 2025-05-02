import React, {useContext, useState} from 'react';
import s from './ResetPasswordModal.module.css'
import {Modal} from "react-bootstrap";
import cross from '@/static/icons/x-lg.svg'
import Image from "next/image";
import PasswordInput from "@/components/shared/UI/PasswordInput/PasswordInput";
import {Context} from "@/context/AppWrapper";
import Cookies from "js-cookie";
import {changePassAccountPage} from "@/http/userApi";

const ResetPasswordModal = ({show, onHide}) => {
    const {userStore} = useContext(Context)
    const [oldPass, setOldPass] = useState('')
    const [newPass1, setNewPass1] = useState('')
    const [newPass2, setNewPass2] = useState('')

    const [incorrect, setIncorrect] = useState(null)
    const [diff, setDiff] = useState(false)
    const sendData = async () => {
        if (newPass1 !== newPass2) {
            setDiff(true)
            return null
        }
        setDiff(false)
        const userId = userStore.id
        const token = Cookies.get('access_token')
        try {
            await changePassAccountPage(token, userId, oldPass, newPass1)
            setIncorrect(false)
        } catch (e) {
            setIncorrect(true)
        }

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
                    <div>
                        <label className={s.label}>Старый пароль:</label>
                        <PasswordInput
                            value={oldPass}
                            onChange={(e) => setOldPass(e.target.value)}
                        />
                        <label className={s.label}>Новый пароль:</label>
                        <PasswordInput
                            value={newPass1}
                            onChange={(e) => setNewPass1(e.target.value)}
                        />
                        <label className={s.label}>Подтвердите пароль:</label>
                        <PasswordInput
                            value={newPass2}
                            onChange={(e) => setNewPass2(e.target.value)}
                        />
                    </div>
                    <div className={'d-flex justify-content-center'}>
                        <button className={s.btn}
                                onClick={sendData}
                        >Сохранить</button>
                    </div>
                    <div className={'text-center'}>
                        {
                            diff && <p className={'red_text'}>Пароли не совпадают</p>
                        }
                        {
                            incorrect === true && <p className={'red_text'}>Старый пароль указан неверно.</p>
                        }
                        {
                            incorrect === false && <p className={'green_text'}>Пароль успешно изменен</p>
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ResetPasswordModal;