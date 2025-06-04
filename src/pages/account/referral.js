import React, {useRef, useState} from 'react';
import MainLayout from "@/layout/MainLayout";
import AccountLayout from "@/layout/AccountLayout";
import s from '@/styles/Referral.module.css'
import Image from "next/image";
import {parse} from "cookie";
import {fetchLoyaltyInfo} from "@/http/userApi";
import amethystBg from "../../../public/img/Amethyst.jpg";
import logo from "@/static/img/bold_logo.svg";
import sapBg from "../../../public/img/Sap.jpg";
import whiteLogo from "@/static/img/white_bold_logo.svg";
import emeraldBg from "../../../public/img/emerald.jpg";
import rubyBg from "../../../public/img/ruby.jpg";
import diamondBg from "../../../public/img/diamond2 1 (1).jpg";
import privilegedBg from "../../../public/img/privileged.jpg";
import ffBg from "../../../public/img/ff.jpg";
import gardLogo from "@/static/img/gard_logo.svg";
import denisBg from "../../../public/img/penis.jpg";
import ClipboardJS from "clipboard";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const loyalty = await fetchLoyaltyInfo(token)
    return { props: {loyalty} }
}
const Referral = ({loyalty}) => {
    const config = {
        Amethyst: {
            img: amethystBg,
            text: 'Amethyst',
            className: s.amethyst_text,
            logo: logo,
            shadow: s.amethyst_shadow
        },
        Sapphire: {
            img: sapBg,
            text: 'Sapphire',
            className: s.sapphire_text,
            logo: whiteLogo,
            shadow: s.sapphire_shadow
        },
        Emerald: {
            img: emeraldBg,
            text: 'Emerald',
            className: s.emerald_text,
            logo: whiteLogo,
            shadow: s.emerald_shadow
        },
        Ruby: {
            img: rubyBg,
            text: 'Ruby',
            className: s.ruby_text,
            logo: whiteLogo,
            shadow: s.ruby_shadow
        },
        Diamond: {
            img: diamondBg,
            text: 'Diamond',
            className: s.diamond_text,
            logo: whiteLogo,
            shadow: s.diamond_shadow
        },
        Privileged: {
            img: privilegedBg,
            text: 'Privileged',
            className: s.privileged_text,
            logo: logo,
            shadow: s.privileged_shadow
        },
        'Friends & Family': {
            img: ffBg,
            text: 'Friends & Family',
            className: s.ff_text,
            logo: gardLogo,
            shadow: s.ff_shadow
        },
        Penis: {
            img: denisBg,
            text: 'Penis',
            className: s.ff_text,
            logo: gardLogo,
            shadow: s.ff_shadow
        }
    }
    const statusObj = config[loyalty.status_name]
    // const statusObj = config["Privileged"]

    const [promo, setPromo] = useState('PROMO')
    const [readOnly, setReadOnly] = useState(true)
    const promoRef = useRef(null)

    const handleSecondBtnClick = () => {
        if (readOnly) {
            setReadOnly(false)
            promoRef.current.focus({focusVisible: true})
        } else {
            setReadOnly(true)
        }
    }
    const copyRef = useRef(null)
    const textRef = useRef(null)
    const copyValue = async (ref) => {
        const text = ref.current.value ?? ref.current.textContent;
        await navigator.clipboard.writeText(text)

        copyRef.current.style.display = 'block'
        setTimeout(() => copyRef.current.style.display = 'none', 2000)
    }
    return (
        <MainLayout>
            <AccountLayout>
                <div className={s.cont}>
                    <h4 className={s.title}>Реферальная программа</h4>
                    <div>
                        <h4 className={'text-center'}>Ваш статус <span className={statusObj.className}>{statusObj.text}</span></h4>
                        <div className={'d-flex justify-content-center'}>
                            <div className={s.card_container}>
                                <div className={`${s.card} ${statusObj.shadow}`}>
                                    <Image src={statusObj.img} alt='' fill={true} className={s.bg_image}/>
                                    <Image src={statusObj.logo} alt='' className={s.logo} width={50}/>
                                    <div className={`${s.in_card_text} ${statusObj.text === 'Diamond' ? '' : ''}`}>
                                        <div>
                                            ****{loyalty.number_card}
                                        </div>
                                        <div>
                                            Накоплено бонусов: {loyalty.bonuses}₽
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={s.explanation_block}>
                        <h4 className={'text-center'}>
                            Приглашайте Ваших друзей на платформу Sellout и получайте
                            до <span className={'fw-bold'}>6000₽</span> бонусов
                        </h4>
                        <div className={'d-flex justify-content-center'}>
                            <div className={s.exp_item}>
                                <div className={s.circle}>
                                    <div className={s.circle_val}>
                                        ?
                                    </div>
                                </div>
                                <h5 className={'text-center'}>Как это работает?</h5>
                            </div>
                        </div>
                        <div className={'d-flex justify-content-between'}>
                            <div className={s.exp_item}>
                                <div className={s.circle}>
                                    <div className={s.circle_val}>
                                        1
                                    </div>
                                </div>
                                <p className={s.exp_text}>Получите уникальный промокод ниже и поделитесь им со всеми</p>
                            </div>
                            <div className={s.exp_item}>
                                <div className={s.circle}>
                                    <div className={s.circle_val}>
                                        2
                                    </div>
                                </div>
                                <p className={s.exp_text}>Пользователь совершает свой первый заказ и указывает при его оформлении Ваш промокод</p>
                            </div>
                        </div>
                        <div className={'d-flex justify-content-center'}>
                            <div className={s.exp_item}>
                                <div className={s.circle}>
                                    <div className={s.circle_val}>
                                        3
                                    </div>
                                </div>
                                <p className={s.exp_text}>Вы получаете бонусы в виде рублей на свой счет, а
                                    приглашенный Вами пользователь дополнительную скидку!</p>
                            </div>
                        </div>
                    </div>

                    <div className={'d-flex flex-column align-items-center'}>
                        <h5 className={'text-center'}>Ваш промокод:</h5>
                        <div className={s.input_block}>
                            <input
                                placeholder={'Промокод'}
                                className={s.textarea}
                                value={promo}
                                onChange={e => setPromo(e.target.value)}
                                readOnly={readOnly}
                                ref={promoRef}
                                id={'promoCopy'}
                            />
                            <div className={'d-flex justify-content-between'}>
                                <button className={s.btn}
                                        onClick={() => copyValue(promoRef)}
                                >
                                    Скопировать
                                </button>
                                <button className={s.btn}
                                        onClick={handleSecondBtnClick}
                                >
                                    {readOnly ? 'Изменить промокод' : ' Сохранить изменения'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={'text-center my-4'}>
                        <h5>Бонусов заработано: <span className={'green_text'}>7000₽</span></h5>
                        <h5>Людей приглашено: <span className={'green_text'}>7</span></h5>
                    </div>


                    <div className={'text-center'}>
                        <h5>Размер бонуса и скидки в зависимости от суммы заказа:</h5>
                        <hr/>
                        <table width={'100%'} className={s.referral_table}>
                            <tbody>
                            <tr className={s.first_tr}>
                                <td>
                                    Сумма заказа
                                </td>
                                <td>
                                    Вы получите бонусов
                                </td>
                                <td>
                                    Приглашенный пользователь получит скидку
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    От 3000₽
                                </td>
                                <td>
                                    500₽
                                </td>
                                <td>
                                    500₽
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    От 5000₽
                                </td>
                                <td>
                                    750₽
                                </td>
                                <td>
                                    750₽
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    От 15000₽
                                </td>
                                <td>
                                    1000₽
                                </td>
                                <td>
                                    1000₽
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    От 35000₽
                                </td>
                                <td>
                                    1250₽
                                </td>
                                <td>
                                    1250₽
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    От 70000₽
                                </td>
                                <td>
                                    2000₽
                                </td>
                                <td>
                                    2000₽
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    От 130000₽
                                </td>
                                <td>
                                    2500₽
                                </td>
                                <td>
                                    2500₽
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    От 150000₽
                                </td>
                                <td>
                                    3000₽
                                </td>
                                <td>
                                    3000₽
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={'text-center my-5'}>
                        <h5>Вы можете использовать заготовленный ниже текст, чтобы
                            удобнее рассказывать друзьям об акции:</h5>

                        <div className={s.text_copy} ref={textRef}
                        >
                            Соверши свой первый заказ на платформе Sellout и введи мой промокод
                            при оформелении заказа, чтобы получить скидку: при заказе от 3000₽ ты получишь 500₽, от 5000₽ - 750₽, от 15000₽ - 1000₽,
                            от 35000₽ - 1250₽, от 70000₽ - 2000₽, от 130000₽ - 2500₽, от 150000₽ - 3000₽ &nbsp;
                            <br/>
                            Промокод: {promo}
                        </div>

                        <div className={'d-flex justify-content-center'}>
                            <button className={s.btn} style={{width: 300}}
                                    onClick={() => copyValue(textRef)}
                            >
                                Скопировать
                            </button>
                        </div>
                    </div>
                    <div className={s.copy} ref={copyRef}>
                        Текст скопирован
                    </div>
                </div>
            </AccountLayout>
        </MainLayout>
    );
};

export default Referral;