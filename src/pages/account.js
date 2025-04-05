import React, {useContext, useEffect, useState} from 'react';
import MainLayout from "@/layout/MainLayout";
import s from '@/styles/Account.module.css'
import AccountLayout from "@/layout/AccountLayout";
import {DatePicker} from "rsuite";
import {Context} from "@/context/AppWrapper";
import InputMask from 'react-input-mask';
import {fetchUserInfo} from "@/http/userApi";
import {parse} from "cookie";
import jwtDecode from "jwt-decode";
import Arrow from "@/components/shared/UI/Arrow/Arrow";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const {user_id} = jwtDecode(token)
    const userData = await fetchUserInfo(context.req.headers.cookie, user_id)
    return { props: { userData } }
}
const Account = ({userData}) => {
    const {userStore} = useContext(Context)
    const [firstname, setFirstname] = useState(userData.first_name)
    const [lastname, setLastname] = useState(userData.last_name)
    const [email, setEmail] = useState(userData.email)
    const [phone, setPhone] = useState()
    const handleChangeNumber = (e) => {
        const inputPhoneNumber = e.target.value;
        setPhone(inputPhoneNumber);
    };


    const [genderOpen, setGenderOpen] = useState(false)
    const [selectedGender, setSelectedGender] = useState()
    const genders = [
        ['Мужской', 'M'],
        ['Женский', 'F'],
    ]
    useEffect(() => {
        genders.forEach(el => {
            if (userData.gender.name === el[1]) {
                setSelectedGender(el)
            }
        })
    }, [])

    const toggleGender = () => {
        setGenderOpen(!genderOpen)
    }
    const handleClick = (item) => {
        setSelectedGender(item)
        setGenderOpen(false)
    }
    const [fillLines, setFillLines] = useState(false)
    const checkFilling = () => {
        return !(!firstname || !lastname || !email);
    }
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const [validEmail, setValidEmail] = useState(true);
    const sendData = () => {
        if (!checkFilling()) {
            setFillLines(true)
            return false
        }
        setFillLines(false)
        if (!validateEmail()) {
            setValidEmail(false)
            return false
        }
        setValidEmail(true)
    }
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
                        <InputMask mask="+7 999 999-99-99" maskChar={null}
                                   value={phone}
                                   onChange={e => handleChangeNumber(e)}
                        >
                            {(inputProps) => <input {...inputProps} type="tel"
                                                    placeholder="Номер*"
                                                    className={s.input}
                            />}
                        </InputMask>
                    </div>
                    <div className={s.row}>
                        <div className={s.half_row}>
                            <div className={s.dropdown}>
                                <div className={s.toggle}
                                     onClick={toggleGender}
                                >
                                    <div className={s.text}>
                                        <div>{selectedGender ? selectedGender[0]: 'Пол'}</div>
                                        <Arrow isOpen={genderOpen}/>
                                    </div>
                                </div>
                                {genderOpen &&
                                    <div>
                                        {genders.map(el =>
                                            <div
                                                key={el[1]}
                                                className={s.toggle}
                                                onClick={() => handleClick(el)}
                                            >
                                                <div className={s.text}>
                                                    {el[0]}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={s.half_row}>
                            <DatePicker appearance="default"
                                        placeholder="Дата рождения"
                                        block={true}
                                        editable={true}
                                        className={s.datepicker}
                            />
                        </div>
                    </div>
                    {!validEmail && <div className={s.red_text}>Некорректный формат почты</div>}
                    {fillLines && <div className={s.red_text}>Заполните все поля</div>}
                    <button className={s.black_btn}
                            onClick={sendData}
                    >Сохранить изменения</button>
                </div>
            </AccountLayout>
        </MainLayout>
    );
};

export default Account;