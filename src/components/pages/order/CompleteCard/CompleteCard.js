import React from 'react';
import Image from "next/image";
import shoe from "@/static/img/shoe2.png";
import s from './CompleteCard.module.css'

const CompleteCard = () => {
    return (
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
                                    <div className={s.brand}>Доставка</div>
                                    <div className={s.text}>10 дней</div>
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
            <hr/>
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
    );
};

export default CompleteCard;