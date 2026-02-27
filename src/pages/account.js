import React, {useContext, useEffect, useState} from 'react';
import MainLayout from "@/layout/MainLayout";
import s from '@/styles/Account.module.css'
import AccountLayout from "@/layout/AccountLayout";
import {Context} from "@/context/AppWrapper";
import InputMask from 'react-input-mask';
import {confirmEmail, editUserInfo, fetchSizeInfo, fetchUserInfo, getSizeTable, sendSizeInfo} from "@/http/userApi";
import {parse} from "cookie";
import jwtDecode from "jwt-decode";
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import SizeDropdown from "@/components/pages/account/SizeDropdown/SizeDropdown";
import Cookies from "js-cookie";
import Head from "next/head";
import ResetPasswordModal from "@/components/pages/account/ResetPasswordModal/ResetPasswordModal";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const {user_id} = jwtDecode(token)
    const userData = await fetchUserInfo(context.req.headers.cookie, user_id)
    const sizeTable = await getSizeTable(context.req.headers.cookie)
    const sizeInfo = await fetchSizeInfo(context.req.headers.cookie)
    return { props: {userData, sizeTable, sizeInfo} }
}
const Account = ({userData, sizeTable, sizeInfo}) => {
    const {userStore} = useContext(Context)
    const [firstname, setFirstname] = useState(userData.first_name)
    const [lastname, setLastname] = useState(userData.last_name)
    const [email, setEmail] = useState(userData.email)
    const [phone, setPhone] = useState(userData.phone_number)
    const [weight, setWeight] = useState(sizeInfo.weight)
    const [height, setHeight] = useState(sizeInfo.height)
    const [birthday, setBirthday] = useState(userData.formatted_happy_birthday_date)
    const handleChangeNumber = (e) => {
        const inputPhoneNumber = e.target.value;
        setPhone(inputPhoneNumber);
    };


    const [genderOpen, setGenderOpen] = useState(false)
    const [selectedGender, setSelectedGender] = useState()
    const genders = [
        ['Мужской', 'M','male'],
        ['Женский', 'F','female'],
    ]
    useEffect(() => {
        genders.forEach(el => {
            if (userData.gender && userData.gender.name === el[1]) {
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
    const [sent, setSent] = useState(false)
    const [emailChanged, setEmailChanged] = useState(false)
    const [emailBusy, setEmailBusy] = useState(false)
    const sendData = async () => {
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
        setSent(true)
        const obj = {
            first_name: firstname,
            last_name: lastname,
            email,
            username: email,
            phone
        }
        if (selectedGender) {
            obj.gender = selectedGender[2]
            userStore.setGender(selectedGender[2])
        }
        if (birthday) {
            obj.date = birthday
        }
        const token = Cookies.get('access_token')
        try {
            const changeRes = await editUserInfo(token, userStore.id, obj)
            setEmailBusy(false)
        } catch (e) {
            setEmailBusy(true)
        }
        if (email !== userData.email) {
            setEmailChanged(true)
            await confirmEmail(token, userStore.id, window.location.href)
        }
    }
    const checkIsNum = (str) => {
        return !isNaN(str)
    }
    const changeWeight = async (value) => {
        if (checkIsNum(value)) {
            setWeight(value)
            const token = Cookies.get('access_token')
            const obj = {}
            obj.weight = value
            const res = await sendSizeInfo(token, JSON.stringify(obj))
        }
    }
    const changeHeight = async (value) => {
        if (checkIsNum(value)) {
            setHeight(value)
            const token = Cookies.get('access_token')
            const obj = {}
            obj.height = value
            const res = await sendSizeInfo(token, JSON.stringify(obj))
        }
    }
    const [passModalShown, setPassModalShown] = useState(false)
    const closeModal = () => {
        setPassModalShown(false)
    }
    const toggleModal = () => {
        setPassModalShown(!passModalShown)
    }
    return (
        <MainLayout>
            <Head>
                <title>Личный кабинет</title>
            </Head>
            <AccountLayout>
                <div className={s.cont}>
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
                                     style={genderOpen ? {borderBottom: '1px solid black'} : {}}
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
                            <InputMask mask="99.99.9999" maskChar={'_'}
                                       value={birthday}
                                       onChange={e => setBirthday(e.target.value)}
                            >
                                {(inputProps) => <input {...inputProps} type="text"
                                                        placeholder="Дата рождения"
                                                        className={s.input}
                                />}
                            </InputMask>
                        </div>
                    </div>
                    <button className={s.black_btn}
                            onClick={sendData}
                    >Сохранить изменения</button>
                    {!validEmail && <div className={s.red_text}>Некорректный формат почты</div>}
                    {fillLines && <div className={s.red_text}>Заполните все поля</div>}
                    {sent && <div className={'green_text text-center'}>Именения успешно сохранены</div>}
                    {emailChanged && <div className={'green_text text-center'}>Пиьсмо подтверждение было выслано на новую почту</div>}
                    {emailBusy && <div className={s.red_text}>Заполните все поля</div>}
                    <div className={'d-flex justify-content-center mt-2'}>
                        <button onClick={toggleModal} className={s.change_pass_btn}>
                            Изменить пароль
                        </button>
                    </div>
                    <ResetPasswordModal show={passModalShown} onHide={closeModal}/>

                    <div className={s.text_block}>
                        <div className={s.text_size}>
                            <h5 className={s.header}>Укажите ваши размеры</h5>
                            <p className={'text-center'}>Вы можете указать свои размеры, чтобы мы искали для вас
                                специальные предложения в ваших размерах,
                                помогали с выбором размера на конкретные модели, а также упрощали
                                процесс покупок на нашей платформе!</p>
                        </div>
                    </div>
                    <div className={s.size_block}>

                        <div className={s.col_dropdown}>
                            <h5>Обувь</h5>
                            <SizeDropdown catObj={sizeTable.size_tables[0]} typeIsShoes={true} currSizeId={sizeInfo.shoes_size}/>
                        </div>
                        <div className={s.col_dropdown}>
                            <h5>Одежда</h5>
                            <SizeDropdown catObj={sizeTable.size_tables[1]} typeIsShoes={false} currSizeId={sizeInfo.clothes_size}/>
                        </div>
                        <div className={s.col_input}>
                            <div>
                                <h5>Рост</h5>
                                <input
                                    className={s.size_input}
                                    onChange={e => changeHeight(e.target.value)}
                                    value={height}
                                />
                            </div>
                            <div style={{marginTop: 30}}>
                                <h5>Вес</h5>
                                <input
                                    className={s.size_input}
                                    onChange={e => changeWeight(e.target.value)}
                                    value={weight}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </AccountLayout>
        </MainLayout>
    );
};

export default Account;