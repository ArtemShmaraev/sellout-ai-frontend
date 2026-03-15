import React, {useContext, useEffect, useState} from 'react';
import s from './Stage1.module.css'
import {Context} from "@/context/AppWrapper";
import {useRouter} from "next/router";
import OrderAddress from "@/components/pages/order/OrderAddress/OrderAddress";
import AddressModal from "@/components/pages/account/AddressModal/AddressModal";
import CustomRadio from "@/components/shared/UI/CustomRadio/CustomRadio";
import {observer} from "mobx-react-lite";
import InputMask from "react-input-mask";
import heart from '@/static/icons/circle_heart.svg'
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import {fetchDeliveryInfo} from "@/http/orderApi";
import ContactModal from "@/components/shared/ContactModal/ContactModal";

const Stage1 = ({addresses, userData, cart}) => {
    const router = useRouter()
    const {orderStore, userStore, desktopStore} = useContext(Context)
    const [firstname, setFirstname] = useState(userData.first_name)
    const [lastname, setLastname] = useState(userData.last_name)
    const [email, setEmail] = useState(userData.email)
    const [phone, setPhone] = useState(userData.phone_number)
    const [comment, setComment] = useState('')


    const [boxberryAddress, setBoxberryAddress] = useState(null)

    useEffect(() => {
        orderStore.setName(userData.first_name)
        orderStore.setSurname(userData.last_name)
        orderStore.setPatronymic(userData.patronymic ?? '')
        orderStore.setEmail(userData.email)
        orderStore.setPhone(userData.phone_number)
    }, [])
    const goToCart = (e) => {
        e.preventDefault()
        router.push('/cart')
    }
    const chooseType = type => {
        orderStore.setShipType(type)
        orderStore.setSelectedAddressId(null)

        if (type === 1 || type === 3) {
            setBoxberryAddress(null)
            orderStore.setPvzAddress(false)
            addresses.forEach(el => {
                if (el.is_main) {
                    orderStore.setSelectedAddressId(el.id)
                    fetchDeliveryPrice()
                }
            })
        }
    }
    useEffect(() => {
        // Создаем элемент script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//points.boxberry.ru/js/boxberry.js';

        // Добавляем элемент script в шапку сайта
        document.head.appendChild(script);

        // Функция очистки (вызывается при размонтировании компонента)
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const handleWidgetClick = () => {
        let weight = 0;
        let price = 0;
        for (const unit of cart.product_units) {
            // Ваш код обработки каждого элемента массива
            // Например, можно добавить вес каждого элемента к общему весу
            weight += unit.weight_kg * 1000
            price += unit.final_price
        }

        boxberry.open(boxberryCallback_function, '1$ed4d9abf8391dd8e8eb01f33f27e5b46', 'Москва', '', price * 1.4, weight, 0, 0, 0, 0)
        // boxberry.open(boxberryCallback_function);
    };
    const boxberryCallback_function = (res) => {
        setBoxberryAddress(res)
        if (res) {
            fetchDeliveryPrice(res)
            orderStore.setTarget(res.id)
            orderStore.setPvzAddress(res.address)
        }
    }


    const fetchDeliveryPrice = async (boxberryRes) => {
        const obj = {}
        //По МСК
        if (orderStore.shipType === 3) {
            obj.delivery_type = 0
            obj.address_id = orderStore.selectedAddressId
        }
        //До двери
        if (orderStore.shipType === 1) {
            obj.delivery_type = 2
            obj.address_id = orderStore.selectedAddressId
        }
        //Boxberry
        if (orderStore.shipType === 2) {
            obj.delivery_type = 1
            obj.target = boxberryRes.id
            obj.bxb_price = boxberryRes.price
        }
        const token = Cookies.get('access_token')
        const data = await fetchDeliveryInfo(obj, token)

        orderStore.setDeliveryPrice(data)
    }
    const [contactOpen, setContactOpen] = useState(false)
    const toggleContact = () => {
        setContactOpen(!contactOpen)
    }
    const closeContact = () => {
        setContactOpen(false)
    }

    const addSpacesToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return (
        <div>
            <div className={s.stage_block}>
                <div className={s.stage}>1. Адрес доставки</div>
                <a onClick={e => goToCart(e)}
                   className={s.link}
                >Вернуться в корзину</a>
            </div>
            <hr/>
            <div>
                <h5>Контактная информация</h5>
                <div className={s.input_block}>
                    <input type="text"
                           className={s.input}
                           placeholder={'Фамилия*'}
                           value={orderStore.surname}
                           onChange={e => orderStore.setSurname(e.target.value)}
                    />
                    <input type="text"
                           className={s.input}
                           placeholder={'Имя*'}
                           value={orderStore.name}
                           onChange={e => orderStore.setName(e.target.value)}
                    />
                    <input type="text"
                           className={s.input}
                           placeholder={'Отчество*'}
                           value={orderStore.patronymic}
                           onChange={e => orderStore.setPatronymic(e.target.value)}
                    />
                    <InputMask mask="+7 999 999-99-99" maskChar={null}
                               value={orderStore.phone}
                               onChange={e => orderStore.setPhone(e.target.value)}
                    >
                        {(inputProps) => <input {...inputProps} type="tel"
                                                placeholder="Номер*"
                                                className={s.input}
                        />}
                    </InputMask>
                    <input type="email"
                           className={s.input}
                           placeholder={'Почта*'}
                           value={orderStore.email}
                           onChange={e => orderStore.setEmail(e.target.value)}
                           style={{width: desktopStore.isDesktop ? '' : '100%'}}
                    />
                </div>
                <h5>Выберите доставку</h5>
                {/*<div onClick={() => chooseType(3)} className={s.radio}>*/}
                {/*    <CustomRadio label={'Доставка в пределах МКАД (бесплатно)'}*/}
                {/*                 normalLabel={true}*/}
                {/*                 checked={orderStore.shipType === 3}*/}
                {/*                 reversed={true}*/}
                {/*    />*/}

                {/*</div>*/}
                {/*<div>*/}
                {/*    {orderStore.shipType === 3 &&*/}
                {/*        <div className={s.address_block}>*/}
                {/*            {addresses.map(el =>*/}
                {/*                <OrderAddress*/}
                {/*                    name={el.name}*/}
                {/*                    address={el.address}*/}
                {/*                    id={el.id}*/}
                {/*                    isMain={el.is_main}*/}
                {/*                />*/}
                {/*            )}*/}
                {/*            <AddressModal newAddress={true} whiteBnt={true}/>*/}
                {/*        </div>*/}
                {/*    }*/}
                {/*</div>*/}
                <div onClick={() => chooseType(1)} className={s.radio}>
                    <CustomRadio
                        label={!orderStore.deliveryPrice || orderStore.shipType !== 1 ? `Доставка до двери: от 500₽` : orderStore.method === 1 || !orderStore.deliveryPrice.block ? `Доставка до двери: ${addSpacesToNumber(orderStore.deliveryPrice.sum_all)}₽` : `Доставка до двери: от ${addSpacesToNumber(orderStore.deliveryPrice.sum_all)}₽`}
                        normalLabel={true}
                        checked={orderStore.shipType === 1}
                        reversed={true}
                    />
                </div>
                <div>
                    {orderStore.shipType === 1 &&
                        <div className={s.address_block}>
                            {addresses.map(el =>
                                <OrderAddress
                                    name={el.name}
                                    address={el.address}
                                    id={el.id}
                                    isMain={el.is_main}
                                />
                            )}
                            <AddressModal newAddress={true} whiteBnt={true}/>
                        </div>
                    }
                </div>
                <div onClick={() => chooseType(2)} className={s.radio}>
                    <div style={{width: "fit-content"}}
                         onClick={() => {
                             if (boxberryAddress) {
                                 fetchDeliveryPrice(boxberryAddress)
                             }
                         }}
                    >
                        <CustomRadio label={!orderStore.deliveryPrice || orderStore.shipType !== 2 || !boxberryAddress ? `Доставка до ПВЗ Boxberry: от 300₽` : orderStore.method === 1 || !orderStore.deliveryPrice.block ? `Доставка до ПВЗ Boxberry: ${addSpacesToNumber(orderStore.deliveryPrice.sum_all)}₽` : `Доставка до ПВЗ Boxberry: от ${addSpacesToNumber(orderStore.deliveryPrice.sum_all)}₽`}
                                     normalLabel={true}
                                     checked={orderStore.shipType === 2}
                                     reversed={true}
                        />
                    </div>
                    {
                        orderStore.shipType === 2 &&
                        <>
                            <button onClick={handleWidgetClick} className={s.boxberry_btn}>
                                Выбрать пункт выдачи на карте
                            </button>
                            {boxberryAddress &&
                                <div>
                                    <div className={s.boxberry_text}>
                                        Вы выбрали: {boxberryAddress.address}
                                    </div>
                                    <div className={s.boxberry_text}>
                                        Режим работы: {boxberryAddress.workschedule}
                                    </div>
                                    <div className={s.boxberry_text}>
                                        Телефон: {boxberryAddress.phone}
                                    </div>
                                </div>
                            }
                        </>
                    }
                </div>
                {/*<div onClick={() => chooseType(3)} className={s.radio} style={{marginTop: 30}}>*/}
                {/*    <CustomRadio label={'Доставка до пункта самовывоза SELLOUT (бесплатно)'}*/}
                {/*                 normalLabel={true}*/}
                {/*                 checked={orderStore.shipType === 3}*/}
                {/*                 reversed={true}*/}
                {/*    />*/}
                {/*</div>*/}
            </div>
            {/*<div className={s.text_block}>*/}
            {/*    <div>*/}
            {/*        Самовывоз по адресу: ул. Профсоюзная, д.77, к. 3*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        Время: какой-то здесь текст будет*/}
            {/*    </div>*/}
            {/*</div>*/}
            {
                orderStore.deliveryPrice && orderStore.deliveryPrice.block &&
                <>
                    <div style={{marginTop: 40}}>
                        <h5>Выберите тип доставки</h5>
                        <p>Так как в вашем заказе присутствует несколько позиций,
                            прибывающих в разные даты, мы хотим предложить вам выбрать предпочитаемый тип доставки:</p>
                        <div>
                            <div className={s.radio}>
                                <CustomRadio label={`Все позиции одновременно: ${addSpacesToNumber(orderStore.deliveryPrice.sum_all)}₽`}
                                             onClick={() => {
                                                 orderStore.setMethod(1)
                                             }}
                                             checked={orderStore.method === 1}
                                             normalLabel={true}
                                             reversed={true}
                                />
                            </div>
                            <p className={s.method_text}>
                                Мы дождёмся прибытия крайнего товара из вашего заказа и отправим весь заказ целиком.
                                Благодаря этому стоимость доставки уменьшается, однако придется дожидаться всего заказа,
                                а не получать его по частям.
                            </p>
                        </div>
                        <div>
                            <div className={s.radio}>
                                <CustomRadio label={`Каждая позиция по отдельности: ${addSpacesToNumber(orderStore.deliveryPrice.sum_part)}₽`}
                                             onClick={() => {
                                                 orderStore.setMethod(2)
                                             }}
                                             checked={orderStore.method === 2}
                                             normalLabel={true}
                                             reversed={true}
                                />
                            </div>
                            <p className={s.method_text}>
                                Мы будем отправлять каждую позицию вашего заказа сразу же по прибытии к нам на
                                склад. Благодаря этому вы сможете получать части заказа сразу же, однако стоимость
                                доставки увеличится.
                            </p>
                        </div>
                    </div>
                    <hr/>
                </>
            }
            <div>
                <textarea
                    rows={3}
                    placeholder={'Комментарий к заказу (необязательно)'}
                    className={s.textarea}
                    value={orderStore.comment}
                    onChange={e => orderStore.setComment(e.target.value)}
                />
            </div>

            {desktopStore.isDesktop &&
                <div>
                    <hr/>


                    <div className={'d-flex justify-content-center'}>
                        <Image src={heart} alt='' width={85}/>
                    </div>
                    <p className={'text-center mt-2'}>
                        Мы готовы сформировать для вас индивидуальные условия отправления,
                        поэтому вы всегда можете написать нам в <span
                        style={{color: 'black', textDecoration: 'underline', cursor: 'pointer'}}
                        onClick={toggleContact}>службу поддержку</span> свой запрос и мы обязательно вам поможем!
                    </p>
                </div>}
            <ContactModal isOpen={contactOpen} handleClose={closeContact}/>
        </div>
    );
};

export default observer(Stage1);