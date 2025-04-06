import React, {useState} from 'react';
import s from './OrderCard.module.css'
import minus from '@/static/icons/dash-lg.svg'
import plus from '@/static/icons/plus-lg.svg'
import Image from "next/image";
import shoe from "@/static/img/shoe2.png";

const OrderCard = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className={s.dropdown}
        >
            <div className={s.header}
                 style={isOpen ? {borderBottom: '1px solid black'} : {}}
            >
                <div className={s.header_block}>
                    <div className={s.header_col}>
                        <div className={s.header_text}>
                            № Заказа
                        </div>
                        <div className={s.header_text}>
                            Дата: 18.10.2003
                        </div>
                    </div>
                    <div className={s.header_col}>
                        <div className={s.header_text}>
                            Сумма: 228
                        </div>
                        <div className={s.header_text}>
                            Статус: доставлен
                        </div>
                    </div>
                </div>
                <div className={s.icon_block}>
                    <Image src={isOpen ? minus : plus}
                           className={s.icon}
                           width={30}
                           alt=''
                           onClick={toggle}
                    />
                </div>
            </div>
            {isOpen &&
                <div className={s.details_block}>
                    <div className={s.order}>
                        <div className={s.row}>
                            <div className={s.col1}>
                                <Image src={shoe} alt='' className={s.img}/>
                            </div>
                            <div className={s.inner_row}>
                                <div className={s.col}>
                                    <div>
                                        <div className={s.brand}>brand</div>
                                        <div className={s.text}>model</div>
                                        <div className={s.text}>colorway</div>
                                    </div>
                                </div>
                                <div className={s.col}>
                                    <div className={s.dropdowns}>
                                        <div className={s.brand}>Размер</div>
                                        <div className={s.text}>5 US</div>
                                        <div className={s.number_block}>
                                            <div className={s.brand}>Статус</div>
                                            <div className={s.text}>В пути</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={s.col}>
                                    <div className={s.dropdowns}>
                                        <div className={s.brand}>Цена</div>
                                        <div className={s.text}>price ₽</div>
                                    </div>
                                    <div className={s.ship_block}>
                                        <div className={s.brand}>Количество</div>
                                        <div className={s.text}>1</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.final_block}>
                        <div className={s.final_col}>
                            <div className={s.prices}>
                                Адрес: адрес
                            </div>
                            <div className={s.prices}>
                                Телефон: +7 933 444 32 32
                            </div>
                            <div className={s.prices}>
                                Способо получения: самовывоз
                            </div>
                        </div>
                        <div className={s.final_col}>
                            <div className={s.prices}>
                                <div>Товаров на сумму:</div>
                                <div>228</div>
                            </div>
                            <div className={s.prices}>
                                <div>Скидка:</div>
                                <div>228</div>
                            </div>
                            <div className={s.prices}>
                                <div>Доставка:</div>
                                <div>228</div>
                            </div>
                            <div className={s.prices}>
                                <div>Итого:</div>
                                <div>228</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default OrderCard;