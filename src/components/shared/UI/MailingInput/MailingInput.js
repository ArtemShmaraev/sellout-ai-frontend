import React, {useState} from 'react';
import s from './MailingInput.module.css'
import icon from "../../static/icons/arrow-right.svg";

const MailingInput = () => {
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidEmail(emailRegex.test(email));
    };
    return (
        <div>
            <div className={s.input}>
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
                />
                <img
                    className={s.icon}
                    src={icon}
                    alt="search"
                    onClick={validateEmail}
                />
            </div>
            {!validEmail &&
                <p className={s.validate}>Некорректный формат почты</p>
            }
        </div>
    );
};

export default MailingInput;