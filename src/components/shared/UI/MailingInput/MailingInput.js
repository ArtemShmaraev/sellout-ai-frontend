import React, {useState} from 'react';
import s from './MailingInput.module.css'
import icon from "@/static/icons/arrow-right.svg";
import Image from 'next/image'
import {addToMailingList} from "@/http/userApi";

const MailingInput = () => {
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidEmail(emailRegex.test(email));
        return emailRegex.test(email)
    };
    const [success, setSuccess] = useState(false)
    const sendData = async (e) => {
        e.preventDefault()
        if (!validateEmail()) {
            return null
        }
        const res = await addToMailingList(email)
        setSuccess(true)
    }
    return (
        <div>
            <form className={s.input} onSubmit={e => sendData(e)}>
                <input
                    type="text"
                    value={email}
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Ваш e-mail'
                    className={s.mailing}
                    style={{caretColor: "white"}}
                />
                <Image
                    className={s.icon}
                    src={icon}
                    alt="search"
                    onClick={e => sendData(e)}
                />
            </form>
            {!validEmail &&
                <p className={s.validate}>Некорректный формат почты</p>
            }
            {success && <p className={'green_text my-0'}>Ваша заявка отправлена</p>}
        </div>
    );
};

export default MailingInput;