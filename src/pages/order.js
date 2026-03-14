import React, {useContext, useEffect, useRef, useState} from 'react';
import s from '@/styles/Order.module.css'
import {observer} from "mobx-react-lite";
import {Context} from "@/context/AppWrapper";
import Stage1 from "@/components/pages/order/Stage1/Stage1";
import MainLayout from "@/layout/MainLayout";
import PromoInput from "@/components/pages/cart/PromoInput/PromoInput";
import Stage2 from "@/components/pages/order/Stage2/Stage2";
import {parse} from "cookie";
import jwtDecode from "jwt-decode";
import {confirmEmail, fetchAddresses, fetchUserInfo} from "@/http/userApi";
import Cookies from "js-cookie";
import {fetchCart, promoAuth, promoUnauth, useBonuses} from "@/http/cartApi";
import {useRouter} from "next/router";
import Head from "next/head";
import {checkoutOrder} from "@/http/orderApi";
import TextModal from "@/components/shared/UI/TextModal/TextModal";
import boxImg from '@/static/icons/box2.svg'
import LoyaltyFAQ from "@/components/pages/account/LoyaltyFAQ/LoyaltyFAQ";
import Link from "next/link";
import Image from "next/image";
import heart from "@/static/icons/circle_heart.svg";
import {desktopStore} from "@/store/DesktopStore";
import ContactModal from "@/components/shared/ContactModal/ContactModal";
import gift from "@/static/icons/gift-green.svg";
import green_gift from "@/static/icons/gift-green.svg";
import {Fade} from "react-bootstrap";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const {user_id} = jwtDecode(token)
    const addresses = await fetchAddresses(context.req.headers.cookie, user_id)
    const cart = await fetchCart(user_id, context.req.headers.cookie)
    const defaultPrice = cart.total_amount
    const finalPrice = cart.final_amount
    const sale = cart.total_sale
    const maxBonuses = cart.bonus + cart.promo_bonus + cart.first_order_bonus
    const currBonuses = cart.bonus_sale
    const defaultPromo = cart.promo_code ? cart.promo_code.string_representation : ''
    const skipPayment = cart.promo_code ? cart.promo_code.skip_payment : false
    const userData = await fetchUserInfo(context.req.headers.cookie, user_id)
    return {
        props: {
            cart,
            addresses,
            defaultPrice,
            finalPrice,
            sale,
            userData,
            maxBonuses,
            currBonuses,
            defaultPromo,
            skipPayment
        }
    }
}
const Order = ({
                   cart,
                   addresses,
                   defaultPrice,
                   finalPrice,
                   sale,
                   userData,
                   maxBonuses,
                   currBonuses,
                   defaultPromo,
                   skipPayment
               }) => {
    const router = useRouter()
    const {orderStore, userStore, cartStore} = useContext(Context)
    const [promo, setPromo] = useState(defaultPromo)
    const [bonuses, setBonuses] = useState(Number(currBonuses) > 0 ? currBonuses : '')
    const [defAmount, setDefAmount] = useState(defaultPrice)
    const [finAmount, setFinAmount] = useState(finalPrice)
    const [saleAmount, setSaleAmount] = useState(sale)
    const [promoRes, setPromoRes] = useState(null)
    const [verifyEmail, setVerifyEmail] = useState(false)
    const [willBonuses, setWillBonuses] = useState(maxBonuses)
    const [isSkipPayment, setIsSkipPayment] = useState(skipPayment)

    const renderStage = () => {
        const stage = orderStore.stage
        if (stage === 1) {

            return <Stage1 addresses={addresses} userData={userData} cart={cart}/>
        }
        if (stage === 2) {
            return <Stage2/>
        }
    }
    const next = () => {
        orderStore.nextStage()
    }
    const changeBonuses = (value) => {
        const maxBonuses = userData.bonuses.total_amount
        if (Number(value) <= Number(maxBonuses)) {
            setBonuses(value)
        }
    }
    const sendPromo = async (e) => {
        e.preventDefault()
        const token = Cookies.get('access_token')
        let res
        if (userStore.isLogged) {
            res = await promoAuth(promo, userStore.id, token)
            setFinAmount(res.final_amount)
            setSaleAmount(res.total_sale)
            router.push('/order', undefined, {scroll: false})
        } else {
            const cartArr = Cookies.get('cart').trim().split(' ')
            res = await promoUnauth(promo, cartArr)
        }
        if (res.status) {
            setFinAmount(res.final_amount)
            setSaleAmount(res.total_sale)
        }
        setPromoRes(res)
    }
    const spendBonuses = async (e) => {
        e.preventDefault()
        const token = Cookies.get('access_token')
        const res = await useBonuses(bonuses, token)
        setFinAmount(res.final_amount)
        setSaleAmount(res.total_sale)
    }
    const calculateFinalPrice = () => {
        if (orderStore.deliveryPrice &&
            orderStore.deliveryPrice.block &&
            orderStore.method === 2) {
            return Number(finAmount) + Number(orderStore.deliveryPrice.sum_part)
        } else if (orderStore.deliveryPrice) {
            return Number(finAmount) + Number(orderStore.deliveryPrice.sum_all)
        } else {
            return finAmount
        }
    }


    const [fillAll, setFillAll] = useState(false)
    const [fillPatronymic, setFillPatronymic] = useState(false)
    const [fillAddress, setFillAddress] = useState(false)
    const [order, setOrder] = useState({})
    const checkoutRef = useRef(null)
    const checkout = async () => {
        const orderObj = {
            email: orderStore.email,
            phone: orderStore.phone,
            surname: orderStore.surname,
            name: orderStore.name,
            patronymic: orderStore.patronymic,
            comment: orderStore.comment
        }


        const validate = () => {
            setFillPatronymic(false)
            setFillAll(false)
            setFillAddress(false)
            if (!orderObj.patronymic) {
                setFillAll(true)
                setFillPatronymic(true)
                return null
            }
            if (!orderObj.name || !orderObj.surname || !orderObj.patronymic || !orderObj.email || !orderObj.surname) {
                setFillAll(true)
                return null
            }
            if (!orderStore.shipType) {
                setFillAll(true)
                setFillAddress(true)
                return null
            }
            if (orderStore.shipType === 3 && !orderObj.address_id) {
                setFillAll(true)
                setFillAddress(true)
                return null
            }
            //До двери
            if (orderStore.shipType === 1 && !orderObj.address_id) {
                setFillAll(true)
                setFillAddress(true)
                return null
            }
            //Boxberry
            if (orderStore.shipType === 2 && !orderObj.pvz_address) {
                setFillAll(true)
                setFillAddress(true)
                return null
            }
            if (orderStore.deliveryPrice && orderStore.deliveryPrice.block && !orderStore.method) {
                setFillAll(true)
                return null
            }
            setFillPatronymic(false)
            setFillAll(false)
            setFillAddress(false)
            return true
        }


        if (orderStore.shipType === 3) {
            orderObj.delivery_type = 0
            orderObj.address_id = orderStore.selectedAddressId
            orderObj.pvz_address = false
        }
        //До двери
        if (orderStore.shipType === 1) {
            orderObj.delivery_type = 2
            orderObj.address_id = orderStore.selectedAddressId
            orderObj.pvz_address = false
        }
        //Boxberry
        if (orderStore.shipType === 2) {
            orderObj.delivery_type = 1
            orderObj.target = orderStore.target
            orderObj.pvz_address = orderStore.pvzAddress
        }
        orderObj.consolidation = true
        if (orderStore.deliveryPrice && orderStore.deliveryPrice.block) {
            orderObj.consolidation = orderStore.method !== 2;
        }
        if (!validate()) {
            return null
        }

        const token = Cookies.get('access_token')
        const id = userStore.id
        if (!userData.verify_email) {
            await confirmEmail(token, id, window.location.href)
            setVerifyEmail(true)
            return null
        }
        setVerifyEmail(false)
        const checkout = await checkoutOrder(orderObj, id, token).catch()
        Cookies.set('cart', '', {expires: 2772})
        Cookies.set('promo', '', {expires: 2772})
        const invoiceStr = JSON.stringify(checkout.invoice_data)
        checkout.invoice_data = invoiceStr
        setOrder(checkout)
        if (userData.user_status.base && !isSkipPayment) {
            setTimeout(() => {
                checkoutRef.current.submit()
            }, 100)
        } else {
            router.push(`/order/complete?id=${checkout.id}`)
        }
        // router.push(`order/complete?id=${order.id}`)
    }
    useEffect(() => {
        return () => {
            orderStore.setShipType(null)
            orderStore.setSelectedAddressId(null)
            orderStore.setMethod(null)
            orderStore.setDeliveryPrice(null)
            orderStore.setComment('')
            orderStore.setTarget('')
            orderStore.setPvzAddress('')
        }
    }, []);
    const addSpacesToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    const [contactOpen, setContactOpen] = useState(false)
    const toggleContact = () => {
        setContactOpen(!contactOpen)
    }
    const closeContact = () => {
        setContactOpen(false)
    }
    // console.log(order.final_amount)

    return (
        <MainLayout>
            <Head>
                <title>Оформление заказа</title>
            </Head>
            <div className={s.cont + ' custom_cont'}>
                <div className={s.section}>
                    <div className={s.main_block}>
                        {renderStage()}
                    </div>
                    <div className={s.promos_block}>
                        <h4>Ваш заказ:</h4>
                        <div className={s.left_right}>
                            <p className={'mb-0'}>  Cтоимость товаров:</p>
                            <p className={s.right_text}>{addSpacesToNumber(defAmount)}₽</p>
                        </div>
                        {/*<PromoInput placeholder={'Введите промокод'}*/}
                        {/*            onChange={(e) => setPromo(e.target.value)}*/}
                        {/*            value={promo}*/}
                        {/*            onClick={(e) => sendPromo(e)}*/}
                        {/*/>*/}
                        {/*{*/}
                        {/*    promoRes &&*/}
                        {/*    <p className={promoRes.status ? s.green_text : s.red_text}>*/}
                        {/*        {promoRes.message}*/}
                        {/*    </p>*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    userStore.isLogged &&*/}
                        {/*    <PromoInput placeholder={`Списать бонусы (Доступно: ${userData.bonuses.total_amount} ₽)`}*/}
                        {/*                onChange={(e) => changeBonuses(e.target.value)}*/}
                        {/*                value={bonuses}*/}
                        {/*                onClick={e => spendBonuses(e)}*/}
                        {/*    />*/}
                        {/*}*/}


                        {
                            orderStore.deliveryPrice &&
                            (

                                orderStore.deliveryPrice.block
                                    ?


                                    (orderStore.method === 1
                                        ?
                                        <div className={s.left_right}>
                                            <p className={'mb-0'}><span className={'mb-0'}>Доставка: </span><span style={{fontWeight: "500"}}>{orderStore.deliveryPrice.ship_day}</span></p><p className={s.right_text}>{addSpacesToNumber(orderStore.deliveryPrice.sum_all)}₽</p>
                                        </div>
                                        :
                                        <div className={s.left_right}>
                                            <p className={'mb-0'}><span className={'mb-0'}>Доставка: </span><span style={{fontWeight: "500"}}>{orderStore.deliveryPrice.ship_day}</span></p><p className={s.right_text}>{addSpacesToNumber(orderStore.deliveryPrice.sum_part)}₽</p>
                                        </div>)
                                    :
                                    <div className={s.left_right}>
                                        <p className={'mb-0'}><span className={'mb-0'}>Доставка: </span><span style={{fontWeight: "500"}}>{orderStore.deliveryPrice.ship_day}</span></p>
                                        <p className={s.right_text}>{addSpacesToNumber(orderStore.deliveryPrice.sum_all)}₽</p>
                                    </div>

                            )
                        }

                        {

                            Number(saleAmount) > 0 &&
                            <div className={s.left_right}>
                                <p className={'mb-0'}>Скидка: </p>
                                <p className={s.right_text}>
                                    <span
                                        className={s.bonuses}> -{addSpacesToNumber(saleAmount)}₽</span></p>
                                {/*<p className={'mb-0'}>-{addSpacesToNumber(saleAmount)}₽</p>*/}
                            </div>
                        }

                        {/*{Number(firstOrderBonus) > 0 &&*/}
                        {/*    <div className={s.left_right}>*/}
                        {/*        <p className={'mb-0'}>*/}

                        {/*            Подарок за первый заказ:*/}
                        {/*        </p>*/}
                        {/*        <p className={s.right_text}>*/}
                        {/*            <Image src={green_gift} alt='' className={s.bonus_icon}/>*/}
                        {/*            <span*/}
                        {/*                className={s.bonuses}> {addSpacesToNumber(firstOrderBonus)}₽</span>*/}
                        {/*        </p>*/}
                        {/*    </div>*/}
                        {/*    // Number(willBonuses) > 0 &&*/}
                        {/*    // <p className={'mt-2 mb-0'}>Будет начислено бонусов: {willBonuses} ₽</p>*/}
                        {/*}*/}
                        {!isNaN(Number(willBonuses)) && Number(willBonuses) > 0 &&

                            <div className={s.left_right}>
                                <p className={'mb-0'}>

                                    Всего будет начислено бонусов:
                                </p>
                                <p className={s.right_text}>
                                    <Image src={green_gift} alt='' className={s.bonus_icon}/>
                                    <span
                                        className={s.bonuses}> {addSpacesToNumber(willBonuses)}₽</span>
                                </p>
                            </div>
                            // Number(willBonuses) > 0 &&
                            // <p className={'mt-2 mb-0'}>Будет начислено бонусов: {willBonuses} ₽</p>
                        }

                        {/*{*/}
                        {/*    <p className={'mt-2 mb-0'}>*/}
                        {/*        Будет начислено <Image src={gift} alt='' className={s.bonus_icon}/> <span*/}
                        {/*        className={s.bonuses}> {willBonuses}₽</span> бонусов*/}
                        {/*    </p>*/}
                        {/*    // Number(willBonuses) > 0 &&*/}
                        {/*    // <p className={'mt-2 mb-0'}>Будет начислено бонусов: {willBonuses} ₽</p>*/}
                        {/*}*/}
                        <hr/>
                        <div className={s.left_right}>
                            <p  className={s.big_text}>Итого: </p>
                            <p className={s.big_text}>{addSpacesToNumber(calculateFinalPrice())} ₽</p></div>
                        {/*<form method="POST" action="https://sellout.server.paykeeper.ru/create/" id="payment-form"*/}
                        {/*      ref={checkoutRef}>*/}
                        {/*    <input type="hidden" name="sum" value={String(order.final_amount)}/>*/}
                        {/*    <input type="hidden" name="clientid" value={order.surname + " " + order.name}/>*/}
                        {/*    <input type="hidden" name="orderid" value={order.number?.toString()}/>*/}
                        {/*    <input type="hidden" name="service_name" value={`Заказ №${order.number?.toString()}`}/>*/}
                        {/*    <input type="hidden" name="client_email" value={order.email}/>*/}
                        {/*    <input type="hidden" name="client_phone" value={order.phone_int}/>*/}
                        {/*    <input type="hidden" name="pstype" value='sbp_default'/>*/}
                        {/*    <input type="hidden" name="user_result_callback"*/}
                        {/*           value={`https://sellout.su/api/v1/order/fact_of_payment?id=${order.id}`}/>*/}
                        {/*    <input type="hidden" name="cart" value={order.invoice_data}/>*/}
                        {/*    /!*<input type="submit" value="Перейти к оплате" />*!/*/}
                        {/*</form>*/}

                        <form method="POST" action="https://sellout.su/api/v1/order/payment" id="payment-form"
                              ref={checkoutRef}>
                            <input type="hidden" name="sum" value={String(order.final_amount)}/>
                            {/*<input type="hidden" name="sum" value={"10"} />*/}
                            <input type="hidden" name="clientid" value={order.surname + " " + order.name}/>
                            <input type="hidden" name="orderid" value={order.number?.toString()}/>
                            <input type="hidden" name="service_name" value={`Заказ №${order.number?.toString()}`}/>
                            <input type="hidden" name="client_email" value={order.email}/>
                            <input type="hidden" name="client_phone" value={order.phone_int}/>
                            <input type="hidden" name="pstype" value='sbp_default'/>
                            <input type="hidden" name="json" value='true'/>
                            <input type="hidden" name="user_result_callback"
                                   value={`https://sellout.su/api/v1/order/fact_of_payment?id=${order.id}`}/>
                            <input type="hidden" name="cart" value={order.invoice_data}/>
                            {/*<input type="submit" value="Перейти к оплате" />*/}
                        </form>


                        {/*<form*/}
                        {/*    id="payment-form"*/}
                        {/*    method="POST"*/}
                        {/*    className="application"*/}
                        {/*    acceptCharset="UTF-8"*/}
                        {/*    action="https://partner.life-pay.ru/alba/input/"*/}
                        {/*    ref={checkoutRef}*/}
                        {/*>*/}
                        {/*    <input type="hidden" name="key" defaultValue="Bar0rLan2oZV7exfoj/Z6XsApxL+i2p07q781hVigb8=" />*/}
                        {/*    <input type="hidden" name="cost" value={order.final_amount?.toString()} />*/}
                        {/*    <input type="hidden" name="name" value={`Заказ №${order.number?.toString()}`} />*/}
                        {/*    <input type="hidden" name="default_email" value={order.email} />*/}
                        {/*    <input type="hidden" name="order_id" value={order.number?.toString()} />*/}
                        {/*    <input type="hidden" name="phone_number" value={order.phone_int} />*/}
                        {/*    <input type="hidden" name="email" value={order.email} />*/}
                        {/*    <input type="hidden" name="payment_type" value="spg" />*/}
                        {/*    <input type='hidden' name='invoice_data' value={order.invoice_data} />*/}
                        {/*    <input type="hidden" name="url_success" defaultValue="https://sellout.su/api/v1/order/signature" />*/}
                        {/*    <input*/}
                        {/*        type="image"*/}
                        {/*        id="a1lite_button"*/}
                        {/*        style={{ border: '0' }}*/}
                        {/*        src="https://partner.life-pay.ru/gui/images/a1lite_buttons/button_small.png"*/}
                        {/*        value="Оплатить"*/}
                        {/*    />*/}
                        {/*</form>*/}

                        <button className={s.order_btn} onClick={checkout}>
                            {
                                (userData.user_status.base && !isSkipPayment)
                                    ?
                                    'Перейти к оплате'
                                    :
                                    'Оформить заказ'
                            }
                        </button>


                        {fillAll && fillPatronymic &&
                            <p className={'red_text'}>Заполните отчество</p>
                        }
                        {fillAll && fillAddress &&
                            <p className={'red_text'}>Выберите способ доставки</p>
                        }
                        {fillAll && !(fillPatronymic || fillAddress) &&
                            <p className={'red_text'}>Заполните все поля</p>
                        }
                        {verifyEmail &&
                            <p className={'red_text'}>Для оформления заказа подтвердите ваш Email. Письмо отправлено
                                на {userData.email}
                            </p>
                        }

                        <div className={s.questions_block}>
                            <TextModal title={'Вопросы по доставке'} img={boxImg}>
                                <div className={s.faq_block}>
                                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                    <LoyaltyFAQ
                                        title={'Какие существуют варианты доставок с нашего склада в Москве до вас?'}>
                                        При оформлении заказа вы указываете адрес и способ доставки. Мы доставляем,
                                        используя курьерскую службу Boxberry
                                        {/*, а также на данный момент доставка по*/}
                                        {/*Москве бесплатная!*/}
                                        <br/>
                                        Вы можете выбрать доставку до Пункта Выдачи Заказов (ПВЗ) Boxberry, отметив на
                                        карте нужный ПВЗ, или выбрать доставку курьером до двери.
                                        <br/>
                                        Самовывоза на данный момент нет, но скоро появится!
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Как выбрать тип доставки?'}>
                                        Если в вашем заказе присутствует несколько позиций, прибывающих в разные даты,
                                        мы предлагаем на выбор два типа доставки:
                                        <ol>
                                            <li>Доставка всех позиций одновременно - мы дождёмся прибытия крайнего
                                                товара из вашего заказа и отправим весь заказ целиком. Благодаря этому
                                                стоимость доставки уменьшается, однако придется дожидаться всего заказа,
                                                а не
                                                получать его по частям.
                                            </li>
                                            <li>Доставка каждой позиции по отдельности - Мы будем отправлять каждую
                                                позицию вашего заказа сразу же по прибытии к нам на склад. Благодаря
                                                этому вы сможете получать части заказа сразу же, однако стоимость
                                                доставки
                                                увеличится.
                                            </li>
                                        </ol>
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Как рассчитывается стоимость доставки?'}>
                                        Стоимость доставки рассчитываются автоматически на этапе оформления заказа. Она
                                        зависит от количества и веса товаров, способа и типа доставки, а также от
                                        адреса.

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Включены ли таможенные пошлины и налоги в стоимость заказа?'}>
                                        Да, цена окончательная, никаких дополнительных платежей не потребуется!
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Куда мы доставляем?'}>
                                        Мы доставляем по всей России службой курьерской доставки Boxberry. Очень скоро
                                        появится доставка в страны СНГ!
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Какая скорость доставки со склада в Москве?'}>
                                        В зависимости от вашего города доставка занимает от одного до нескольких дней
                                        после прибытия вашего заказа на наш склад в Москве. Подробнее вы сможете
                                        отслеживать на сайте или в приложении Boxberry.

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Как отслеживать доставку?'}>
                                        Как только ваш заказ приедет на наш склад в Москве и будет отправлен курьерской
                                        службой Boxberry, вам
                                        придет уведомление на почту с информацией о трек-номере отправления, а также
                                        трек-номер появится в
                                        личном кабинете в информации о вашем заказе.
                                        <br/>
                                        Отследить заказ можно по
                                        этой <a href="https://boxberry.ru/tracking-page" style={{color: 'inherit'}}
                                                target={'_blank'}>ссылке</a> или в мобильном приложении Boxberry.
                                        Отправление
                                        автоматически появляется в приложении, если авторизоваться под теми же данными,
                                        под которыми был выполнен заказ на нашем сайте.

                                    </LoyaltyFAQ>
                                </div>
                                <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}
                                                                                           className={'text-black'}
                                                                                           target={'_blank'}>FAQ</Link>
                                </h5>
                            </TextModal>
                        </div>
                        {!desktopStore.isDesktop &&
                            <div>
                                <br/>

                                <div className={'d-flex justify-content-center'}>
                                    <Image src={heart} alt='' width={85}/>
                                </div>
                                <p className={'text-center mt-2'}>
                                    Мы готовы сформировать для вас индивидуальные условия отправления,
                                    поэтому вы всегда можете написать нам в <span
                                    style={{color: 'black', textDecoration: 'underline', cursor: 'pointer'}}
                                    onClick={toggleContact}>службу поддержку</span> свой запрос и мы обязательно вам
                                    поможем!
                                </p>
                                <ContactModal isOpen={contactOpen} handleClose={closeContact}/>

                            </div>}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default observer(Order);