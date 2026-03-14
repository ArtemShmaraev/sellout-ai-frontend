import React, {useEffect, useRef, useState} from 'react';
import MainLayout from "@/layout/MainLayout";
import AccountLayout from "@/layout/AccountLayout";
import s from '@/styles/Referral.module.css'
import Image from "next/image";
import {parse} from "cookie";
import {editPromo, fetchLoyaltyInfo, fetchPromo, fetchRefData} from "@/http/userApi";
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
import {useRouter} from "next/router";
import Head from "next/head";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const loyalty = await fetchLoyaltyInfo(token)
    const fetchedPromo = await fetchPromo(token)
    const refData = await fetchRefData(token)
    return { props: {loyalty, fetchedPromo, refData} }
}
const Referral = ({loyalty, fetchedPromo, refData}) => {
    const router = useRouter()
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
    const linkRef = useRef(null)

    const handleSecondBtnClick = async () => {
        if (readOnly) {
            setReadOnly(false)
            promoRef.current.focus({focusVisible: true})
        } else {
            setReadOnly(true)
            const token = Cookies.get('access_token')
            const res = await editPromo(promo, token)
            if ('message' in res) {
                setError(res.message)
                setSaved(false)
            } else {
                setSaved(true)
                setError('')
                const {pathname} = router
                router.push({pathname}, undefined, {scroll: false})
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

    const renderTable = () => {
        const arr = [];
        const firstTrArr = [];
        let cnt = 0;

        // Определяем количество столбцов и проверяем, все ли они равны нулю
        const checkColumn = (column) => {
            return column.reduce((acc, val) => acc + val, 0) !== 0;
        };

        for (const key in refData) {
            if (key === 'promo_text' || key === 'promo_link') {
                continue;
            }
            if (refData[key]) {
                cnt++;
            }
        }

        if (refData.order_amounts && checkColumn(refData.order_amounts)) {
            firstTrArr.push(
                <td width={100 / cnt}>
                    Сумма заказа
                </td>
            );
            arr.push(refData.order_amounts);
        }
        // Проверяем другие столбцы на равенство нулю
        // И добавляем только ненулевые столбцы
        if (refData.partner_bonus_amounts && checkColumn(refData.partner_bonus_amounts)) {
            firstTrArr.push(
                <td width={100 / cnt}>
                    Вы получите бонусов
                </td>
            );
            arr.push(refData.partner_bonus_amounts);
        }
        if (refData.client_sale_amounts && checkColumn(refData.client_sale_amounts)) {
            firstTrArr.push(
                <td width={100 / cnt}>
                    Приглашенный пользователь получит скидку
                </td>
            );
            arr.push(refData.client_sale_amounts);
        }
        if (refData.client_bonus_amounts && checkColumn(refData.client_bonus_amounts)) {
            firstTrArr.push(
                <td width={100 / cnt}>
                    Приглашенный пользователь получит бонусов
                </td>
            );
            arr.push(refData.client_bonus_amounts);
        }

        const res = [
            <tr className={s.first_tr}>
                {firstTrArr}
            </tr>
        ];

        for (let i = 0; i < arr[0].length; i++) {
            const trArr = [];
            for (let j = 0; j < arr.length; j++) {
                if (j === 0) {
                    trArr.push(
                        <td>
                            {`${arr[j][i]}₽`}
                        </td>
                    );
                } else {
                    trArr.push(
                        <td>
                            {`${arr[j][i]}₽`}
                        </td>
                    );
                }
            }
            res.push(
                <tr>
                    {trArr}
                </tr>
            );
        }
        return res;
    };


    const [isDesktop, setIsDesktop] = useState(true)
    const checkIsDesktop = () => {
        const width = window.innerWidth
        if (width <= 1200) {
            setIsDesktop(false)
        } else {
            setIsDesktop(true)
        }
    }
    useEffect(() => {
        window.addEventListener("resize", checkIsDesktop);
        // Call handler right away so state gets updated with initial window size
        checkIsDesktop();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", checkIsDesktop);
    })
    const scroll = (id) => {
        const el = document.getElementById(id)
        const scrollPosition = el.offsetTop
        const num = isDesktop ? 160 : 95
        window.scrollTo({
            top: scrollPosition - num,
            behavior: 'smooth',
        });
    }
    return (
        <MainLayout>
            <Head>
                <title>Программа лояльности</title>
                <meta name="description" content="2 000 000+ лотов по лучшим ценам с гарантией оригинальности: от премиальных и лимитированных релизов до более доступных, но не менее желанных позиций"/>
            </Head>
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
                        Приглашайте ваших друзей на платформу Sellout и получайте
                        до <span className={'fw-bold'}>7000₽</span> бонусов
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
                            <p className={s.exp_text}>Получите уникальный промокод и ссылку ниже и поделитесь ими со всеми</p>
                        </div>
                        <div className={s.exp_item}>
                            <div className={s.circle}>
                                <div className={s.circle_val}>
                                    2
                                </div>
                            </div>
                            <p className={s.exp_text}>Пользователь совершает свой первый заказ по вашей ссылке или указывает при его оформлении ваш промокод</p>
                        </div>
                    </div>
                    <div className={'d-flex justify-content-center'}>
                        <div className={s.exp_item}>
                            <div className={s.circle}>
                                <div className={s.circle_val}>
                                    3
                                </div>
                            </div>
                            <p className={s.exp_text}>Вы получаете бонусы в виде рублей на свой счет,
                                а приглашенный вами пользователь может получить дополнительную скидку или бонусы!</p>
                        </div>
                    </div>
                </div>


                <div className={'text-center my-5'}>
                    <h5>Размер бонуса и скидки в зависимости от суммы заказа:</h5>
                    <hr/>
                    <table width={'100%'} className={s.referral_table}>
                        <tbody>
                        {renderTable()}
                        </tbody>
                    </table>
                </div>

                <div className={'text-center my-5'}>
                    <h5>Мы всегда готовы обсудить с вами индивидуальные условия реферальной программы,
                        оставляйте заявку <span onClick={() => scroll('request')} className={s.link}>ниже</span>,
                        и мы обязательно с вами свяжемся!</h5>
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

                <div className={'d-flex flex-column align-items-center mt-5'}>
                    <h5 className={'text-center'}>Ваша ссылка:</h5>
                    <div className={s.input_block}>
                        <input
                            placeholder={'Ссылка'}
                            className={s.textarea}
                            value={refData.promo_link}
                            // onChange={e => setPromo(e.target.value)}
                            readOnly={readOnly}
                            ref={linkRef}
                            id={'promoCopy'}
                        />
                        <div className={'d-flex justify-content-between'}>
                            <button className={s.btn2}
                                    onClick={() => copyValue(linkRef)}
                            >
                                Скопировать
                            </button>
                            {/*<button className={s.btn}*/}
                            {/*        onClick={handleSecondBtnClick}*/}
                            {/*>*/}
                            {/*    {readOnly ? 'Изменить промокод' : ' Сохранить изменения'}*/}
                            {/*</button>*/}
                        </div>
                    </div>
                </div>


                <div className={'text-center my-4'}>
                    <h5>Бонусов заработано: <span className={'green_text'}>{fetchedPromo.total_bonus}</span></h5>
                    <h5>Людей приглашено: <span className={'green_text'}>{fetchedPromo.user_count}</span></h5>
                </div>


                {
                    refData.promo_text &&
                    <div className={'text-center my-5'}>
                        <h5>Вы можете использовать заготовленный ниже текст, чтобы
                            удобнее рассказывать друзьям об акции:</h5>

                        <div className={s.text_copy} ref={textRef}
                        >
                            {refData.promo_text}
                        </div>

                        <div className={'d-flex justify-content-center'}>
                            <button className={s.btn} style={{width: 300}}
                                    onClick={() => copyValue(textRef)}
                            >
                                Скопировать
                            </button>
                        </div>
                    </div>
                }

                <div className={'mb-5'} id={'request'}>
                    <div className={'d-flex justify-content-center mb-3'}>
                        <Image src={megaphone} alt='' width={100}/>
                    </div>
                    <p className={s.exp_text}>Хотите стать амбассадором Sellout на взаимовыгодных условиях? Являетесь
                        лидером мнений, блогером, инфлюенсером или есть аудитория, для которой наш продукт может быть полезным?
                    </p>
                    <p className={s.exp_text}>Мы можем предложить вам огромную вариативность условий сотрудничества: от аффилированного маркетинга
                        с мгновенными выплатами и с использованием наших
                        статистических данных для повышения конверсии до полного спонсирования проведения маркетинговой кампании.
                    </p>
                    <p className={s.exp_text}>Оставляйте заявку даже если сомневаетесь, что охватываете достаточную аудиторию, мы поможем продвинуть ваш блог
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
                    <p className={s.exp_text}>Мы искренне стремимся создать лучший продукт на рынке. Рекомендуя Sellout всем окружающим, вы помогаете нам развиваться и улучшать платформу
                        Sellout для вас! Вы можете использовать любые инструменты привлечения клиентов будь то знакомые,
                        социальные сети, блог и.т.д. <br/> Приглашайте новых пользователей и экономьте до 100% вместе с Sellout!</p>
                </div>


                <div className={s.faq_block}>
                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                    <LoyaltyFAQ title={'Какие условия должен соблюсти пользователь, чтобы вы получили бонусы, а он скидку?'}>
                        Чтобы вы и приглашённый вами пользователь получили бонусы, ему достаточно оформить свой первый заказ по вашей ссылке или ввести ваш промокод при его оформлении.
                    </LoyaltyFAQ>
                    <LoyaltyFAQ title={'Где пользователь должен ввести ваш промокод или как вопсользоваться ссылкой?'}>
                        Приглашённый пользователь должен ввести ваш промокод в поле для промокода в корзине или на любом этапе оформления заказа. При регистрации пользователь ничего указывать не должен, достаточно ввести промокод при оформлении заказа.
                        <br/>Используя ссылку, пользователю достаточно перейти по ней на сайт, и система сама определит, что впоследиствии заказ был оформлен по этой ссылке (также при оформлении заказа пользователь увидит ваш введенный промокод в качестве подтверждения того, что все сработало).
                    </LoyaltyFAQ>
                    <LoyaltyFAQ title={'Чему равны бонусы?'}>
                        Каждый один бонус приравнивается к одному рублю! Вы можете оплачивать до 100% заказа, тем самым сводя стоимость заказа к нулю!
                    </LoyaltyFAQ>
                    <LoyaltyFAQ title={'Как воспользоваться бонусами?'}>
                        Чтобы оплатить заказ целиком или частично бонусами, в корзине или на любом этапе оформления заказа введите количество бонусов, которое хотите списать, и скидка будет автоматически применена!

                    </LoyaltyFAQ>
                    <LoyaltyFAQ title={'Как быстро после совершения покупки начисляются бонусы?'}>
                        Обратите внимание, бонусы на ваш баланс будут начислены не сразу, а по прошествии некоторого времени. Нам требуется обработать заказ, совершенный приглашенным пользователем, подтвердить корректность всех данных и после этого начислить бонусы. Если вы считаете, что бонусы слишком долго не начисляются и произошла какая-то ошибка, обязательно напишите нам и мы вам поможем!

                    </LoyaltyFAQ>
                    <LoyaltyFAQ title={'Когда сгорают бонусы?'}>
                        Бонусы действительны ровно 365 дней с момента их начисления, соответственно каждый бонус по прошествии года сгорает. Не упускайте возможность сделать цену еще более привлекательной и успевайте воспользоваться бонусами вовремя. Мы обязательно напомним вам о приближающейся дате сгорания бонусов!

                    </LoyaltyFAQ>
                    <LoyaltyFAQ title={'Можно ли вывести бонусы в виде рублей на свой счет?'}>
                        К сожалению, нет. Такая опция доступна только нашим партнерам, которые совместно с нами продвигают SELLOUT и получают за это дополнительные бонусы до 7000₽ за каждую покупку! Присоединяйтесь к нашей <span className={s.link} onClick={toggleReferral}>партнерской программе</span> и зарабатывайте вместе с нами!

                    </LoyaltyFAQ>
                </div>

                <div className={s.faq_block}>
                    <h5 className={'text-center'}>Ответы на большинство вопросов
                        вы найдете здесь: <Link href={'/faq'} className={'text-black'} target={'_blank'}>FAQ</Link></h5>
                    <h5 className={'text-center'}>Если у вас остались вопросы, вы всегда
                        можете обратиться в <span className={s.link} onClick={toggleContact}>службу поддержки</span> и мы будем
                        рады вам помочь!</h5>
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