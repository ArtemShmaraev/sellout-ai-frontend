import React, {useState} from 'react';
import s from './OrderCard.module.css'
import minus from '@/static/icons/dash-lg.svg'
import plus from '@/static/icons/plus-lg.svg'
import Image from "next/image";
import shoe from "@/static/img/shoe2.png";
import ProductBlock from "@/components/pages/account/ProductBlock/ProductBlock";

const OrderCard = ({order}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className={s.dropdown}
        >
            <div className={s.header}
                 style={isOpen ? {borderBottom: '1px solid black'} : {}}
                 onClick={toggle}
            >
                <div className={s.header_block}>
                    <div className={s.header_col}>
                        <div className={s.header_text}>
                            № {order.id}
                        </div>
                        <div className={s.header_text}>
                            Дата: {order.formatted_date}
                        </div>
                    </div>
                    <div className={s.header_col}>
                        <div className={s.header_text}>
                            Сумма: {order.final_amount}
                        </div>
                        <div className={s.header_text}>
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
            {isOpen &&
                <div className={s.details_block}>
                    <div className={s.order}>
                        {
                            order.order_units.map(el =>
                                <ProductBlock unit={el}/>
                            )
                        }
                    </div>
                    <div className={s.final_block}>
                        <div className={s.final_col}>
                            <div className={s.prices}>
                                Адрес: {order.pvz_address ? order.pvz_address: order.address.address}
                            </div>
                            <div className={s.prices}>
                                Телефон: {order.phone}
                            </div>
                            <div className={s.prices}>
                                Способо получения: {order.delivery}
                            </div>
                        </div>
                        <div className={s.final_col}>
                            <div className={s.prices}>
                                <div>Товаров на сумму:</div>
                                <div>{order.total_amount}</div>
                            </div>
                            <div className={s.prices}>
                                <div>Скидка:</div>
                                <div>{order.total_sale}</div>
                            </div>
                            <div className={s.prices}>
                                <div>Доставка:</div>
                                <div>{order.delivery_view_price}</div>
                            </div>
                            <div className={s.prices}>
                                <div>Итого:</div>
                                <div>{order.final_amount}</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default OrderCard;