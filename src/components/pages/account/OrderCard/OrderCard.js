import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './OrderCard.module.css'
import minus from '@/static/icons/dash-lg.svg'
import plus from '@/static/icons/plus-lg.svg'
import Image from "next/image";
import shoe from "@/static/img/shoe2.png";
import ProductBlock from "@/components/pages/account/ProductBlock/ProductBlock";
import {Context} from "@/context/AppWrapper";

const OrderCard = ({order}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isBeOpen, setIsBeOpen] = useState(false)
    const {desktopStore} = useContext(Context)
    // const toggle = () => {
    //     if (isOpen) {
    //         setIsOpen(false);
    //         setIsBeOpen(true);
    //         setTimeout(() => {
    //             setIsBeOpen(false);
    //         }, desktopStore.isDesktop ? 300 : 500); // Задержка в одну секунду
    //     } else {
    //         setIsOpen(true);
    //         setIsBeOpen(false);
    //     }
    // };
    const addSpacesToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    const toggle = () => {
        if (isOpen){
            setIsBeOpen(true)
        }
        setIsOpen(!isOpen)
    }

    const [contentHeight, setContentHeight] = useState('0');
    const contentRef = useRef(null);
    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(isOpen ? contentRef.current.scrollHeight + "px" : "0");
            setIsBeOpen(true)
            setTimeout(() => {
                setContentHeight(isOpen ? contentRef.current.scrollHeight + "px" : "0");
                setIsBeOpen(false)
            }, 400)

        }
    }, [isOpen]);


    return (

        <div className={s.dropdown_wrapper}>

            <div className={s.dropdown} style={{borderRadius: "7px"}}
            >
                <div className={s.header}
                     style={isOpen ? {} : {}}
                     onClick={toggle}
                >
                    <div className={s.header_block}>
                        <div className={s.header_col}>
                            <div className={`${s.header_text} ${s.num}`}>
                                № {order.number}
                            </div>
                            <div className={`${s.header_text} ${s.date}`}>
                                Дата: {order.formatted_date}
                            </div>
                        </div>
                        <div className={s.header_col2}>
                            <div className={`${s.header_text} ${s.sum}`}>
                                Сумма: {addSpacesToNumber(order.final_amount)} ₽
                            </div>
                            <div className={`${s.header_text} ${s.status}`}>
                                Статус: {order.status.name}
                            </div>
                        </div>
                    </div>
                    <div className={s.icon_block}>
                        <Image src={isOpen ? minus : plus}
                               className={s.icon}
                               width={30}
                               alt=''
                        />
                    </div>
                </div>
                <div ref={contentRef}
                     className={[s.text_block, isOpen ? s.open : ""].join(" ")}
                     style={{ maxHeight: contentHeight}}>
                    {(isOpen || isBeOpen)  && <div className={s.blackDivider}></div>}
                    <div className={s.details_block}>
                        <div className={s.order}>
                            {
                                order.order_units.map((el, ind) =>
                                    <>
                                        <ProductBlock unit={el}/>
                                        {
                                            ind !== order.order_units.length - 1 &&
                                            <hr className={s.hr}/>
                                        }
                                    </>
                                )
                            }
                        </div>
                        <div className={s.final_block}>
                            <div className={s.final_col}>
                                <div className={s.prices}>
                                    Адрес: {order.pvz_address ? order.pvz_address : order.address.address}
                                </div>
                                <div className={s.prices}>
                                    Телефон: {order.phone}
                                </div>
                                <div className={s.prices}>
                                    Способ получения: {order.delivery}
                                </div>
                            </div>
                            <div className={s.final_col}>
                                <div className={s.prices}>
                                    <div>Товаров на сумму:</div>
                                    <div>{addSpacesToNumber(order.total_amount)} ₽</div>
                                </div>
                                {
                                    Number(order.total_sale) > 0 &&
                                    <div className={s.prices}>
                                        <div>Скидка:</div>
                                        <div>{addSpacesToNumber(order.total_sale)} ₽</div>
                                    </div>
                                }
                                <div className={s.prices}>
                                    <div>Доставка:</div>
                                    <div>{addSpacesToNumber(order.delivery_view_price)} ₽</div>
                                </div>
                                <div className={s.prices}>
                                    <div>Итого:</div>
                                    <div>{addSpacesToNumber(order.final_amount)} ₽</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default OrderCard;