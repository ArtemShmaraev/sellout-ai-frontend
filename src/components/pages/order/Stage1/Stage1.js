import React, {useContext, useEffect, useState} from 'react';
import s from './Stage1.module.css'
import {Context} from "@/context/AppWrapper";
import {useRouter} from "next/router";
import OrderAddress from "@/components/pages/order/OrderAddress/OrderAddress";
import AddressModal from "@/components/pages/account/AddressModal/AddressModal";
import CustomRadio from "@/components/shared/UI/CustomRadio/CustomRadio";
import {observer} from "mobx-react-lite";
import InputMask from "react-input-mask";

const Stage1 = ({addresses, userData}) => {
    const router = useRouter()
    const {orderStore, userStore} = useContext(Context)
    const [firstname, setFirstname] = useState(userData.first_name)
    const [lastname, setLastname] = useState(userData.last_name)
    const [email, setEmail] = useState(userData.email)
    const [phone, setPhone] = useState(userData.phone_number)

    const goToCart = (e) => {
        e.preventDefault()
        router.push('/cart')
    }
    const chooseType = type => {
        orderStore.setShipType(type)
        orderStore.setSelectedAddressId(null)
        if (type === 1) {
            addresses.forEach(el => {
                if (el.is_main) {
                    orderStore.setSelectedAddressId(el.id)
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
        boxberry.open(boxberryCallback);
    };
    const boxberryCallback = (res) => {
        setBoxberryAddress(res)
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
                           value={lastname}
                           onChange={e => setLastname(e.target.value)}
                    />
                    <input type="text"
                           className={s.input}
                           placeholder={'Имя*'}
                           value={firstname}
                           onChange={e => setFirstname(e.target.value)}
                    />
                    <input type="text"
                           className={s.input}
                           placeholder={'Отчество*'}
                    />
                    <InputMask mask="+7 999 999-99-99" maskChar={null}
                               value={phone}
                               onChange={e => setPhone(e.target.value)}
                    >
                        {(inputProps) => <input {...inputProps} type="tel"
                                                placeholder="Номер*"
                                                className={s.input}
                        />}
                    </InputMask>
                    <input type="email"
                           className={s.input}
                           placeholder={'Почта*'}
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <h5>Выберите доставку</h5>
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
                            <div className={s.add_address_block}>
                                <AddressModal newAddress={true} whiteBnt={true}/>
                            </div>
                        </div>
                    }
                </div>
                <div onClick={() => chooseType(2)} className={s.radio}>
                    <CustomRadio label={'Доставка до пункта самовывоза Boxberry'}
                                 normalLabel={true}
                                 checked={orderStore.shipType === 2}
                                 reversed={true}
                    />
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
                <div onClick={() => chooseType(3)} className={s.radio} style={{marginTop: 30}}>
                    <CustomRadio label={'Доставка до пункта самовывоза SELLOUT (бесплатно)'}
                                 normalLabel={true}
                                 checked={orderStore.shipType === 3}
                                 reversed={true}
                    />
                </div>
            </div>
            <div className={s.text_block}>
                <div>
                    Самовывоз по адресу: ул. Профсоюзная, д.77, к. 3
                </div>
                <div>
                    Время: какой-то здесь текст будет
                </div>
            </div>
        </div>
    );
};

export default observer(Stage1);