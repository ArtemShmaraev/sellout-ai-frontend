import React from 'react';
import s from '@/styles/Loyalty.module.css'
import MainLayout from "@/layout/MainLayout";
import AccountLayout from "@/layout/AccountLayout";
import amethystBg from '/public/img/Amethyst.jpg'
import Image from "next/image";
import logo from '@/static/img/sellout_logo.svg'
import check from '@/static/icons/check.svg'

const Loyalty = () => {
    return (
        <MainLayout>
            <AccountLayout>
                <div className={s.cont}>
                    <h4 className={s.title}>Программа лояльноси</h4>
                    <div>
                        <h4 className={'text-center'}>Ваш статус <span className={s.amethyst_text}>Amethyst</span></h4>
                        <div className={'d-flex justify-content-center'}>
                            <div className={s.card_container}>
                                <div className={s.above_card}>
                                    <div>
                                        Всего потрачено: 34400₽
                                    </div>
                                    <div>
                                        До следующего статуса: 600₽
                                    </div>
                                </div>
                                <div className={s.card}>
                                    <Image src={amethystBg} alt='' fill={true} className={s.bg_image}/>
                                    <Image src={logo} alt='' className={s.logo} width={50}/>
                                    <div className={s.in_card_text}>
                                        <div>
                                            ****7777
                                        </div>
                                        <div>
                                            Накоплено бонусов: 70000₽
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={s.table_block}>
                            <table width={'100%'}>
                                <tbody>
                                <tr>
                                    <td>

                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.amethyst_circle}`}></div>
                                            <div className={s.amethyst_text}>Amethyst</div>
                                            <div className={s.amethyst_text}>0₽</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.sapphire_circle}`}></div>
                                            <div className={s.sapphire_text}>Sapphire</div>
                                            <div className={s.sapphire_text}>15000₽</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.emerald_circle}`}></div>
                                            <div className={s.emerald_text}>Emerald</div>
                                            <div className={s.emerald_text}>45000₽</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.ruby_circle}`}></div>
                                            <div className={s.ruby_text}>Ruby</div>
                                            <div className={s.ruby_text}>100000₽</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.diamond_circle}`}></div>
                                            <div className={s.diamond_text}>Diamond</div>
                                            <div className={s.diamond_text}>300000₽</div>
                                        </div>
                                    </td>
                                </tr>


                                <tr className={s.tr_border}>
                                    <td>
                                        Приветственный бонус
                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.amethyst_circle}`}>
                                                <Image src={check} alt='' className={s.check}/>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.sapphire_circle}`}>
                                                <Image src={check} alt='' className={s.check}/>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.emerald_circle}`}>
                                                <Image src={check} alt='' className={s.check}/>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.ruby_circle}`}>
                                                <Image src={check} alt='' className={s.check}/>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.diamond_circle}`}>
                                                <Image src={check} alt='' className={s.check}/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>


                                <tr className={s.tr_border}>
                                    <td>
                                        Подарок на день рождения
                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.amethyst_circle}`}>
                                                <Image src={check} alt='' className={s.check}/>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.sapphire_circle}`}>
                                                <Image src={check} alt='' className={s.check}/>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.emerald_circle}`}>
                                                <Image src={check} alt='' className={s.check}/>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.ruby_circle}`}>
                                                <Image src={check} alt='' className={s.check}/>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.diamond_circle}`}>
                                                <Image src={check} alt='' className={s.check}/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>


                                <tr className={s.tr_border}>
                                    <td>
                                        Бонусы за каждую позицию заказа
                                    </td>
                                    <td>
                                        <div className={s.amethyst_text}>до 250₽</div>
                                    </td>
                                    <td>
                                        <div className={s.sapphire_text}>до 500₽</div>
                                    </td>
                                    <td>
                                        <div className={s.emerald_text}>до 750₽</div>
                                    </td>
                                    <td>
                                        <div className={s.ruby_text}>до 1000₽</div>
                                    </td>
                                    <td>
                                        <div className={s.diamond_text}>до 1500₽</div>
                                    </td>
                                </tr>


                                <tr className={s.tr_border}>
                                    <td>
                                        Бесплатная доставка
                                    </td>
                                    <td>
                                        <div className={s.amethyst_text}>От 20000₽</div>
                                    </td>
                                    <td>
                                        <div className={s.sapphire_text}>От 20000₽</div>
                                    </td>
                                    <td>
                                        <div className={s.emerald_text}>От 15000₽</div>
                                    </td>
                                    <td>
                                        <div className={s.ruby_text}>От 15000₽</div>
                                    </td>
                                    <td>
                                        <div className={s.diamond_text}>От 15000₽</div>
                                    </td>
                                </tr>


                                <tr className={s.tr_border}>
                                    <td>
                                        Эксклюзивные скидки
                                    </td>
                                    <td>

                                    </td>
                                    <td>

                                    </td>
                                    <td>

                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.ruby_circle}`}>
                                                <Image src={check} alt='' className={s.check}/>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.diamond_circle}`}>
                                                <Image src={check} alt='' className={s.check}/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>


                                <tr className={s.tr_border}>
                                    <td>
                                        Ранний доступ к релизам и закрытым продажам
                                    </td>
                                    <td>

                                    </td>
                                    <td>

                                    </td>
                                    <td>

                                    </td>
                                    <td>

                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.diamond_circle}`}>
                                                <Image src={check} alt='' className={s.check}/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>


                                <tr className={s.tr_border}>
                                    <td>
                                        Приоритетное обслуживание
                                    </td>
                                    <td>

                                    </td>
                                    <td>

                                    </td>
                                    <td>

                                    </td>
                                    <td>

                                    </td>
                                    <td>
                                        <div className={s.first_row_td}>
                                            <div className={`${s.circle} ${s.diamond_circle}`}>
                                                <Image src={check} alt='' className={s.check}/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </AccountLayout>
        </MainLayout>
    );
};

export default Loyalty;