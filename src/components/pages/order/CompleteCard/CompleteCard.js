import React from 'react';
import Image from "next/image";
import shoe from "@/static/img/shoe2.png";
import s from './CompleteCard.module.css'
import ProductBlock from "@/components/pages/account/ProductBlock/ProductBlock";

const CompleteCard = ({order}) => {
    const addSpacesToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return (
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
            <hr/>
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
                            <div>{order.total_sale} ₽</div>
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
    )
        ;
};

export default CompleteCard;