import React, {useContext, useEffect, useState} from 'react';
import MainLayout from "@/layout/MainLayout";
import s from '@/styles/OrderComplete.module.css'
import check from '@/static/icons/check2-circle.svg'
import info from '@/static/icons/info-circle.svg'
import Image from "next/image";
import {Context} from "@/context/AppWrapper";
import CompleteCard from "@/components/pages/order/CompleteCard/CompleteCard";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import Link from "next/link";
import {parse} from "cookie";
import {fetchOneOrder} from "@/http/userApi";


export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const {id} = context.query
    console.log(id)
    const order = await fetchOneOrder(id, token)
    console.log(order)
    return {props : {order}}
}
const Complete = ({order}) => {
    const {userStore} = useContext(Context)
    const router = useRouter()

    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1200) {
            setIsDesktop(false)
        }
    }, [])
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
                        Ваш заказ:
                    </div>
                    <div className={s.header_text}>
                        № {order.id}
                    </div>
                    <div className={s.header_text}>
                        Дата: {order.formatted_date}
                    </div>
                </div>
                <hr/>
                <CompleteCard order={order}/>
                <hr/>
                <div className={s.info_block}>
                    <Image src={info} alt='' width={isDesktop ? 80 : 40}/>
                    <div className={s.info_text}>
                        Ваш заказ успешно создан. Мы должны подтвердить Ваш заказ, обычно это происходит моментально, и
                        статус заказа в личном кабинете меняется с “Ожидает подтверждения” на “Заказ подтвержден”.
                        Как только это произойдет, Вам придет письмо на почту. Также все изменения по статусу заказа
                        Вы можете отслеживать в личном кабинете.
                    </div>
                </div>
                <hr/>
                <div className={s.info_block}>
                    <div>
                        Благодарим Вас за выбор нашего сервиса и доверие к Sellout!
                    </div>
                    <div>
                        Ответы на большинство вопросов Вы всегда можете найти
                        здесь: <Link href="/faq" className={s.link}>FAQ</Link>
                    </div>
                    <div>
                        Если у Вас остались вопросы, обращайтесь в <a href="" className={s.link}>службу поддержки</a>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default observer(Complete);