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

const Stage1 = ({addresses, userData}) => {
    const router = useRouter()
    const {orderStore, userStore} = useContext(Context)
    const [firstname, setFirstname] = useState(userData.first_name)
    const [lastname, setLastname] = useState(userData.last_name)
    const [email, setEmail] = useState(userData.email)
    const [phone, setPhone] = useState(userData.phone_number)
    const [comment, setComment] = useState('')
    useEffect(() => {
        console.log(userData)
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
    const [boxberryAddress, setBoxberryAddress] = useState(null)
    const handleWidgetClick = () => {
        // boxberry.open(boxberryCallback_function, '1$ed4d9abf8391dd8e8eb01f33f27e5b46','Москва','', 0, 0,
        //     0, 0, 0, 0);
        boxberry.open(boxberryCallback_function);
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
        }
        const token = Cookies.get('access_token')
        const data = await fetchDeliveryInfo(obj, token)
        orderStore.setDeliveryPrice(data)
    }
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
                    />
                </div>
                <h5>Выберите доставку</h5>
                <div onClick={() => chooseType(3)} className={s.radio}>
                    <CustomRadio label={'Доставка в пределах МКАД (бесплатно)'}
                                 normalLabel={true}
                                 checked={orderStore.shipType === 3}
                                 reversed={true}
                    />
                </div>
                <div>
                    {orderStore.shipType === 3 &&
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
                <div onClick={() => chooseType(1)} className={s.radio}>
                    <CustomRadio label={'Доставка до двери'}
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
                        <CustomRadio label={'Доставка до пункта самовывоза Boxberry'}
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
                        <p>Так как в Вашем заказе присутствует несколько позиций,
                            прибывающих в разные даты, мы хотим предложить Вам выбрать предпочитаемый тип доставки:</p>
                        <div>
                            <div className={s.radio}>
                                <CustomRadio label={'Доставка всех позиций одновременно'}
                                             onClick={() => {
                                                 orderStore.setMethod(1)
                                             }}
                                             checked={orderStore.method === 1}
                                             normalLabel={true}
                                             reversed={true}
                                />
                            </div>
                            <p className={s.method_text}>
                                Мы дождёмся прибытия крайнего товара из Вашего заказа и отправим весь заказ целиком.
                                Благодаря этому стоимость доставки уменьшается, однако придется дожидаться всего заказа,
                                а не получать его по частям.
                            </p>
                        </div>
                        <div>
                            <div className={s.radio}>
                                <CustomRadio label={'Доставка каждой позиции по отдельности'}
                                             onClick={() => {
                                                 orderStore.setMethod(2)
                                             }}
                                             checked={orderStore.method === 2}
                                             normalLabel={true}
                                             reversed={true}
                                />
                            </div>
                            <p className={s.method_text}>
                                Мы будем отправлять каждую позицию Вашего заказа сразу же по прибытии к нам на
                                склад. Благодаря этому Вы сможете получать части заказа сразу же, однако стоимость доставки увеличится.
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
            <hr/>
            <div>
                <div className={'d-flex justify-content-center'}>
                    <Image src={heart} alt='' width={85}/>
                </div>
                <p className={'text-center mt-2'}>
                    Мы готовы сформировать для Вас индивидуальные условия отправления,
                    поэтому Вы всегда можете написать нам в <Link href={''} style={{color: 'black'}}>службу поддержку</Link> свой запрос и мы обязательно Вам поможем!
                </p>
            </div>

        </div>
    );
};

export default observer(Stage1);