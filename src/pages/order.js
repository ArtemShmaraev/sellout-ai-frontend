import React, {useContext} from 'react';
import s from '@/styles/Order.module.css'
import {observer} from "mobx-react-lite";
import {Context} from "@/context/AppWrapper";
import Stage1 from "@/components/pages/order/Stage1/Stage1";
import MainLayout from "@/layout/MainLayout";
import {Container} from "react-bootstrap";
import PromoInput from "@/components/pages/cart/PromoInput/PromoInput";
import Stage2 from "@/components/pages/order/Stage2/Stage2";

const Order = () => {
    const {orderStore} = useContext(Context)
    const renderStage = () => {
        const stage = orderStore.stage
        if (stage === 1) {
            return <Stage1/>
        }
        if (stage === 2) {
            return <Stage2/>
        }
    }
    const next = () => {
        orderStore.nextStage()
    }
    return (
        <MainLayout>
            <Container className={s.cont}>
                <div className={s.section}>
                    <div className={s.main_block}>
                        {renderStage()}
                    </div>
                    <div className={s.promos_block}>
                        <h4>Ваш заказ:</h4>
                        <p>Промежуточная стоимость: 100 ₽</p>
                        <PromoInput placeholder={'Введите промокод'}/>
                        <PromoInput placeholder={'Списать бонусы'}/>
                        <p>Суммарная скидка: 100 ₽</p>
                        <hr/>
                        <p className={s.big_text}>Промежуточный итог: 228 ₽</p>
                        <button className={s.order_btn}
                                onClick={next}
                        >Продолжить оформление</button>
                    </div>
                </div>
            </Container>
        </MainLayout>
    );
};

export default observer(Order);