import React, {useContext, useEffect, useState} from 'react';
import MainLayout from "@/layout/MainLayout";
import s from '@/styles/OrderComplete.module.css'
import check from '@/static/icons/check2-circle.svg'
import info from '@/static/icons/info.svg'
import Image from "next/image";
import {Context} from "@/context/AppWrapper";
import CompleteCard from "@/components/pages/order/CompleteCard/CompleteCard";
import {observer} from "mobx-react-lite";
import Link from "next/link";
import {parse} from "cookie";
import {fetchOneOrder, fetchUserInfo} from "@/http/userApi";
import ContactModal from "@/components/shared/ContactModal/ContactModal";
import LoyaltyFAQ from "@/components/pages/account/LoyaltyFAQ/LoyaltyFAQ";
import heart from '@/static/icons/circle_heart.svg'
import jwtDecode from "jwt-decode";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const {id} = context.query
    const order = await fetchOneOrder(id, token)
    const {user_id} = jwtDecode(token)
    const userData = await fetchUserInfo(context.req.headers.cookie, user_id)
    return {props : {order, userData}}
}
const Complete = ({order, userData}) => {
    const {userStore, cartStore} = useContext(Context)

    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1200) {
            setIsDesktop(false)
        }
    }, [])
    const [contactOpen, setContactOpen] = useState(false)
    const toggleContact = () => {
        setContactOpen(!contactOpen)
    }
    const closeContact = () => {
        setContactOpen(false)
    }
    useEffect(() => {
        cartStore.setCartCnt(0)
    }, [userStore.isLogged])
    return (
        <MainLayout>
            <div className={s.cont + ' custom_cont'}>
                <div className={s.thanks_block}>
                    <Image  src={check} alt='' width={isDesktop ? 80 : 40}/>
                    <div>
                        {userStore.firstName}, спасибо за заказ!
                    </div>
                </div>
                <div className={s.header}>
                    <div className={s.header_text}>
                        Ваш заказ: № {order.number}
                    </div>
                    <div className={s.header_text}>
                        Дата: {order.formatted_date}
                    </div>
                </div>
                <hr/>
                <CompleteCard order={order}/>
                <hr/>
                {/*<div className={s.info_block}>*/}
                {/*    <Image src={info} alt='' width={isDesktop ? 80 : 40}/>*/}
                {/*    <div className={s.info_text}>*/}
                {/*        Ваш заказ успешно создан. Мы должны подтвердить ваш заказ, обычно это происходит моментально, и*/}
                {/*        статус заказа в личном кабинете меняется с “Ожидает подтверждения” на “Заказ подтвержден”.*/}
                {/*        Как только это произойдет, вам придет письмо на почту. Также все изменения по статусу заказа*/}
                {/*        Вы можете отслеживать в <Link href="/account/orders" className={s.link}>личном кабинете</Link>.*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<hr/>*/}
                <div className={s.faq_block}>
                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                    <LoyaltyFAQ title={'Как быстро обрабатываются заказы?'}>
                        После успешной оплаты заказа ваш заказ получает статус “Принят”. Мы стремимся как можно быстрее обрабатывать заказы, обычно это происходят в течение нескольких часов, после чего ваш заказ получает статус “В пути”. Подробнее про статусы заказов читайте ниже.

                    </LoyaltyFAQ>
                    <LoyaltyFAQ title={'Что делать, если не пришло письмо-подтверждение на указанную почту?'}>
                        Пожалуйста, проверьте спам или другие папки с письмами. Если вы считаете, что произошла какая-то ошибка или вы указали неверную почту, незамедлительно обратитесь в службу поддержки, и мы обязательно вам поможем!

                    </LoyaltyFAQ>
                    <LoyaltyFAQ title={'Где отслеживать изменения статуса заказа?'}>
                        Следить за статусом заказа вы всегда можете в своем личном кабинете в разделе “Заказы”, а также об изменениях статуса заказа мы будем сообщать вам на указанную почту!

                    </LoyaltyFAQ>
                </div>
                {
                    !userData.user_status.base &&
                    <div className={s.info_block}>
                        <Image src={info} alt='' width={isDesktop ? 80 : 40} className={s.icon}/>
                        <div>
                            Мы свяжемся с вами по указанному контакту: {userData.extra_contact} для подтверждения и оплаты заказа!
                            <br/>
                            Обычно это занимает не более 24 часов. Если по какой-то причине мы долго вам не пишем,
                            <br/>
                            просьба обратиться в <span className={s.link} onClick={toggleContact}>службу поддержки</span>
                        </div>
                    </div>
                }
                <div className={s.info_block}>
                    <Image src={heart} alt='' width={isDesktop ? 80 : 40} className={s.icon}/>
                    <div>
                        Благодарим вас за выбор нашего сервиса и доверие к Sellout!
                    </div>
                    <div>
                        Ответы на большинство вопросов вы всегда можете найти
                        здесь: <Link href="/faq" className={s.link}>FAQ</Link>
                    </div>
                    <div>
                        Если у вас остались вопросы, обращайтесь в <span className={s.link} onClick={toggleContact}>службу поддержки</span>
                    </div>
                </div>
            </div>
            <ContactModal isOpen={contactOpen} handleClose={closeContact}/>
        </MainLayout>
    );
};

export default observer(Complete);