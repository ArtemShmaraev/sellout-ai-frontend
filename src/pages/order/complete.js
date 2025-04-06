import React, {useContext, useEffect, useState} from 'react';
import MainLayout from "@/layout/MainLayout";
import {Container} from "react-bootstrap";
import s from '@/styles/OrderComplete.module.css'
import check from '@/static/icons/check2-circle.svg'
import info from '@/static/icons/info-circle.svg'
import Image from "next/image";
import {Context} from "@/context/AppWrapper";
import CompleteCard from "@/components/pages/order/CompleteCard/CompleteCard";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";

const Complete = () => {
    const {userStore} = useContext(Context)
    const router = useRouter()

    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1200) {
            setIsDesktop(false)
        }
    }, [])
    const goToFAQ = (e) => {
        e.preventDefault()
        router.push('/faq')
    }
    return (
        <MainLayout>
            <Container className={s.cont}>
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
                        № 1337
                    </div>
                    <div className={s.header_text}>
                        Дата: 12.12.2021
                    </div>
                </div>
                <hr/>
                <CompleteCard/>
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
                        здесь: <a href="/faq" className={s.link} onClick={(e) => goToFAQ(e)}>FAQ</a>
                    </div>
                    <div>
                        Если у Вас остались вопросы, обращайтесь в <a href="" className={s.link}>службу поддержки</a>
                    </div>
                </div>
            </Container>
        </MainLayout>
    );
};

export default observer(Complete);