import React, {useRef, useState} from 'react';
import MainLayout from "@/layout/MainLayout";
import AccountLayout from "@/layout/AccountLayout";
import s from '@/styles/Referral.module.css'
import Image from "next/image";
import {parse} from "cookie";
import {editPromo, fetchLoyaltyInfo, fetchPromo} from "@/http/userApi";
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
import megaphone from '@/static/img/megaphone.svg'
import heart from '@/static/icons/circle_heart.svg'
import LoyaltyFAQ from "@/components/pages/account/LoyaltyFAQ/LoyaltyFAQ";
import Link from "next/link";
import ContactModal from "@/components/shared/ContactModal/ContactModal";
import Cookies from "js-cookie";
import ReferralModal from "@/components/pages/account/ReferralModal/ReferralModal";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const loyalty = await fetchLoyaltyInfo(token)
    const fetchedPromo = await fetchPromo(token)
    return { props: {loyalty, fetchedPromo} }
}
const Referral = ({loyalty, fetchedPromo}) => {
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
    const [promo, setPromo] = useState(fetchedPromo.string_representation)
    const [readOnly, setReadOnly] = useState(true)
    const promoRef = useRef(null)

    const handleSecondBtnClick = async () => {
        if (readOnly) {
            setReadOnly(false)
            promoRef.current.focus({focusVisible: true})
        } else {
            setReadOnly(true)
            const token = Cookies.get('access_token')
            const res = await editPromo(promo, token)
            console.log(res)
            if ('message' in res) {
                setError(res.message)
                setSaved(false)
            } else {
                setSaved(true)
                setError('')
            }
        }
    }
    const copyRef = useRef(null)
    const textRef = useRef(null)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState('')

    const [showCopyBlock, setShowCopyBlock] = useState(false)
    const copyValue = async (ref) => {
        const text = ref.current.value ?? ref.current.textContent;
        await navigator.clipboard.writeText(text)

        setShowCopyBlock(true)
        setTimeout(() => setShowCopyBlock(false), 2000)
    }

    const [contactOpen, setContactOpen] = useState(false)
    const toggleContact = () => {
        setContactOpen(!contactOpen)
    }
    const closeContact = () => {
        setContactOpen(false)
    }

    const [referralOpen, setReferralOpen] = useState(false)
    const toggleReferral = () => {
        setReferralOpen(!referralOpen)
    }
    const closeReferral = () => {
        setReferralOpen(false)
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
                </div>
            </AccountLayout>
            <div className={'custom_cont'}>
                <div className={s.explanation_block}>
                    <h4 className={'text-center mb-4'}>
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
                        {saved && <p className={'green_text text-center'}>Изменения сохранены</p>}
                        {error && <p className={'red_text text-center'}>{error}</p>}
                    </div>
                </div>
                <div className={'text-center my-4'}>
                    <h5>Бонусов заработано: <span className={'green_text'}>{fetchedPromo.total_bonus}</span></h5>
                    <h5>Людей приглашено: <span className={'green_text'}>{fetchedPromo.user_count}</span></h5>
                </div>


                <div className={'text-center'}>
                    <h5>Размер бонуса и скидки в зависимости от суммы заказа:</h5>
                    <hr/>
                    <table width={'100%'} className={s.referral_table}>
                        <tbody>
                        <tr className={s.first_tr}>
                            <td width={'33%'}>
                                Сумма заказа
                            </td>
                            <td width={'33%'}>
                                Вы получите бонусов
                            </td>
                            <td width={'33%'}>
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

                <div className={'mb-5'}>
                    <div className={'d-flex justify-content-center mb-3'}>
                        <Image src={megaphone} alt='' width={100}/>
                    </div>
                    <p className={s.exp_text}>Хотите стать амбассадором Sellout на взаимовыгодных условиях? Являетесь
                        лидером мнений, блогером, инфлюенсером или есть аудитория, для которой наш продукт может быть полезным?
                    </p>
                    <p className={s.exp_text}>Мы можем предложить Вам огромную вариативность условий сотрудничества: от аффилированного маркетинга
                        с мгновенными выплатами и с использованием наших
                        статистических данных для повышения конверсии до полного спонсирования проведения маркетинговой кампании.
                    </p>
                    <p className={s.exp_text}>Оставляйте заявку даже если сомневаетесь, что охватываете достаточную аудиторию, мы поможем продвинуть Ваш блог
                        за счет коллаборации. Свяжитесь с нами, и мы обязательно
                        договоримся о партнерстве.
                    </p>
                    <div className={'d-flex justify-content-center'}>
                        <button className={s.btn_black} onClick={toggleReferral}>Оставить заявку</button>
                    </div>
                </div>

                <div className={'mb-5'}>
                    <div className={'d-flex justify-content-center mb-3'}>
                        <Image src={heart} alt='' width={100}/>
                    </div>
                    <p className={s.exp_text}>Мы искренне стремимся создать лучший продукт на рынке. Рекомендуя Sellout всем окружающим, Вы помогаете нам развиваться и улучшать платформу
                        Sellout для Вас! Вы можете использовать любые инструменты привлечения клиентов будь то знакомые,
                        социальные сети, блог и.т.д. <br/> Приглашайте новых пользователей и экономьте до 100% вместе с Sellout!</p>
                </div>


                <div className={s.faq_block}>
                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                    <LoyaltyFAQ title={'Какие условия должен соблюсти пользователь, чтобы Вы получили бонусы, а он скидку?'}>
                        Чтобы Вы и приглашённый Вами пользователь получили бонусы, ему достаточно ввести Ваш промокод при оформлении своего первого заказа.

                    </LoyaltyFAQ>
                    <LoyaltyFAQ title={'Где пользователь должен ввести Ваш промокод?'}>
                        Приглашённый пользователь должен ввести Ваш промокод в поле для промокода в корзине или на любом этапе оформления заказа. При регистрации пользователь ничего указывать не должен и ни по каким специальным ссылкам переходить необязательно. Достаточно ввести промокод и пользователь получит свою скидку, а Вы бонусы.

                    </LoyaltyFAQ>
                    <LoyaltyFAQ title={'Чему равны бонусы?'}>
                        Каждый один бонус приравнивается к одному рублю! Вы можете оплачивать до 100% заказа, тем самым сводя стоимость заказа к нулю!
                    </LoyaltyFAQ>
                    <LoyaltyFAQ title={'Как воспользоваться бонусами?'}>
                        Чтобы оплатить заказ целиком или частично бонусами, в корзине или на любом этапе оформления заказа введите количество бонусов, которое хотите списать, и скидка будет автоматически применена!

                    </LoyaltyFAQ>
                    <LoyaltyFAQ title={'Как быстро после совершения покупки начисляются бонусы?'}>
                        Обратите внимание, бонусы на Ваш баланс будут начислены не сразу, а по прошествии некоторого времени. Нам требуется обработать заказ, совершенный приглашенным пользователем, подтвердить корректность всех данных и после этого начислить бонусы. Если Вы считаете, что бонусы слишком долго не начисляются и произошла какая-то ошибка, обязательно напишите нам и мы Вам поможем!

                    </LoyaltyFAQ>
                    <LoyaltyFAQ title={'Когда сгорают бонусы?'}>
                        Бонусы действительны ровно 365 дней с момента их начисления, соответственно каждый бонус по прошествии года сгорает. Не упускайте возможность сделать цену еще более привлекательной и успевайте воспользоваться бонусами вовремя. Мы обязательно напомним Вам о приближающейся дате сгорания бонусов!

                    </LoyaltyFAQ>
                    <LoyaltyFAQ title={'Можно ли вывести бонусы в виде рублей на свой счет?'}>
                        К сожалению, нет. Такая опция доступна только нашим партнерам, которые совместно с нами продвигают SELLOUT и получают за это дополнительные бонусы до 6000₽ за каждую покупку! Присоединяйтесь к нашей партнерской программе и зарабатывайте вместе с нами!

                    </LoyaltyFAQ>
                </div>

                <div className={s.faq_block}>
                    <h5 className={'text-center'}>Ответы на большинство вопросов
                        Вы найдете здесь: <Link href={'/faq'} className={'text-black'}>FAQ</Link></h5>
                    <h5 className={'text-center'}>Если у Вас остались вопросы, Вы всегда
                        можете обратиться в <span className={s.link} onClick={toggleContact}>службу поддержки</span> и мы будем
                        рады Вам помочь!</h5>
                </div>

                {
                    showCopyBlock &&
                    <div className={s.copy} ref={copyRef}>
                        Текст скопирован
                    </div>
                }
            </div>
            <ReferralModal isOpen={referralOpen} handleClose={closeReferral}/>
            <ContactModal isOpen={contactOpen} handleClose={closeContact}/>
        </MainLayout>
    );
};

export default Referral;