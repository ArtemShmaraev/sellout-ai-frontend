import React from 'react';
import s from '@/styles/Loyalty.module.css'
import MainLayout from "@/layout/MainLayout";
import AccountLayout from "@/layout/AccountLayout";
import amethystBg from '/public/img/Amethyst.jpg'
import Image from "next/image";
import logo from '@/static/img/sellout_logo.svg'
import check from '@/static/icons/check.svg'
import LoyaltyFAQ from "@/components/pages/account/LoyaltyFAQ/LoyaltyFAQ";
import Link from "next/link";

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



                    <div className={s.faq_block}>
                        <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                        <LoyaltyFAQ title={'Как получить новый статус?'}>
                            Чтобы перейти на следующий уровень, Вам необходимо совершить
                            покупки на платформе Sellout на определенную сумму. Конкретные значения указаны выше.
                        </LoyaltyFAQ>
                        <LoyaltyFAQ title={'Как начисляются бонусы за каждую покупку?'}>
                            При совершении заказа Вам будут начислены бонусы за каждую единицу товара в заказе. Количество начисляемых
                            бонусов зависит от Вашего статуса и будет расти по мере достижения следующих уровней! Также Вы можете
                            получать до 6000₽ бонусами, участвуя в нашей реферальной программе и приглашая Ваших друзей на нашу платформу!
                        </LoyaltyFAQ>
                        <LoyaltyFAQ title={'Как тратить накопленные бонусы?'}>
                            Вы можете списывать накопленные бонусы при оформлении заказа. В корзине или на любом этапе оформления заказа у Вас
                            будет возможность ввести число бонусов, которое Вы хотите списать и оплатить ими до 100% стоимости заказа!
                        </LoyaltyFAQ>
                        <LoyaltyFAQ title={'Когда сгорают бонусы?'}>
                            Бонусы сгорают ровно спустя 365 дней со дня их начисления,
                            поэтому успейте их потратить вовремя. Мы обязательно напомним Вам о приближающейся дате сгорания бонусов!
                        </LoyaltyFAQ>
                    </div>

                    <div className={s.faq_block}>
                        <h5 className={'text-center'}>Ответы на большинство вопросов
                            Вы найдете здесь: <Link href={'/faq'} className={'text-black'}>FAQ</Link></h5>
                        <h5 className={'text-center'}>Если у Вас остались вопросы, Вы всегда
                            можете обратиться в <Link href={''} className={'text-black'}>службу поддержки</Link> и мы будем
                            рады Вам помочь!</h5>
                    </div>
                </div>
            </AccountLayout>
        </MainLayout>
    );
};

export default Loyalty;