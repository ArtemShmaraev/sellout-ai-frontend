import React, {useState} from 'react';
import MainLayout from "@/layout/MainLayout";
import s from '@/styles/Account.module.css'
import AccountLayout from "@/layout/AccountLayout";
import {DatePicker} from "rsuite";

const Account = () => {
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    return (
        <MainLayout>
            <AccountLayout>
                <div style={{width: '70%'}}>
                    <h4 className={s.title}>Личные данные</h4>
                    <div className={s.row}>
                        <div className={s.half_row}>
                            <input type="text"
                                   className={s.input}
                                   placeholder={'Имя*'}
                                   value={firstname}
                                   onChange={e => setFirstname(e.target.value)}
                            />
                        </div>
                        <div className={s.half_row}>
                            <input type="text"
                                   className={s.input}
                                   placeholder={'Фамилия*'}
                                   value={lastname}
                                   onChange={e => setLastname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={s.row}>
                        <input type="email"
                               className={s.input}
                               placeholder={'Почта*'}
                               value={email}
                               onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={s.row}>
                        <input type="phone"
                               className={s.input}
                               placeholder={'Номер телефона*'}
                               value={phone}
                               onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <div className={s.row}>
                        <div className={s.half_row}>
                            <DatePicker appearance="default"
                                        placeholder="Дата рождения"
                                        block={true}
                                        editable={true}
                                        className={s.datepicker}
                            />
                        </div>
                    </div>
                </div>
            </AccountLayout>
        </MainLayout>
    );
};

export default Account;