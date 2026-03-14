import React, {useContext, useState} from 'react';
import s from '@/styles/Loyalty.module.css'
import MainLayout from "@/layout/MainLayout";
import AccountLayout from "@/layout/AccountLayout";
import amethystBg from '/public/img/Amethyst.jpg'
import sapBg from '/public/img/Sap.jpg'
import emeraldBg from '/public/img/emerald.jpg'
import rubyBg from '/public/img/ruby.jpg'
import diamondBg from '/public/img/diamond2 1 (1).jpg'
import privilegedBg from '/public/img/privileged.jpg'
import ffBg from '/public/img/ff.jpg'
import denisBg from '/public/img/penis.jpg'
import Image from "next/image";
import logo from '@/static/img/bold_logo.svg'
import whiteLogo from '@/static/img/white_bold_logo.svg'
import gardLogo from '@/static/img/gard_logo.svg'
import check from '@/static/icons/check.svg'
import question from '@/static/icons/question.svg'
import LoyaltyFAQ from "@/components/pages/account/LoyaltyFAQ/LoyaltyFAQ";
import Link from "next/link";
import {parse} from "cookie";
import {fetchLoyaltyInfo} from "@/http/userApi";
import ffIcon from '@/static/icons/ff.png'
import privilegedIcon from '@/static/icons/privileged.svg'
import info from '@/static/icons/info.svg'
import {Context} from "@/context/AppWrapper";
import ContactModal from "@/components/shared/ContactModal/ContactModal";
import Head from "next/head";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const loyalty = await fetchLoyaltyInfo(token)
    return { props: {loyalty} }
}
const Loyalty = ({loyalty}) => {
    const {userStore} = useContext(Context)
    const config = {
        Amethyst: {
            img: amethystBg,
            text: 'Amethyst',
            className: s.amethyst_text,
            logo: logo,
            shadow: s.amethyst_shadow
        },
        Sapphire: {
            img: sapBg,
            text: 'Sapphire',
            className: s.sapphire_text,
            logo: whiteLogo,
            shadow: s.sapphire_shadow
        },
        Emerald: {
            img: emeraldBg,
            text: 'Emerald',
            className: s.emerald_text,
            logo: whiteLogo,
            shadow: s.emerald_shadow
        },
        Ruby: {
            img: rubyBg,
            text: 'Ruby',
            className: s.ruby_text,
            logo: whiteLogo,
            shadow: s.ruby_shadow
        },
        Diamond: {
            img: diamondBg,
            text: 'Diamond',
            className: s.diamond_text,
            logo: whiteLogo,
            shadow: s.diamond_shadow
        },
        Privileged: {
            img: privilegedBg,
            text: 'Privileged',
            className: s.privileged_text,
            logo: logo,
            shadow: s.privileged_shadow
        },
        'Friends & Family': {
            img: ffBg,
            text: 'Friends & Family',
            className: s.ff_text,
            logo: gardLogo,
            shadow: s.ff_shadow
        },
        Penis: {
            img: denisBg,
            text: 'Penis',
            className: s.ff_text,
            logo: gardLogo,
            shadow: s.ff_shadow
        }
    }
    const statusObj = config[loyalty.status_name]
    // const statusObj = config["Privileged"]

    const [contactOpen, setContactOpen] = useState(false)
    const toggleContact = () => {
        setContactOpen(!contactOpen)
    }
    const closeContact = () => {
        setContactOpen(false)
    }
    const addSpacesToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return (
        <MainLayout>
            <Head>
                <title>Программа лояльности</title>
                <meta name="description" content="2 000 000+ лотов по лучшим ценам с гарантией оригинальности: от премиальных и лимитированных релизов до более доступных, но не менее желанных позиций"/>
            </Head>
            <AccountLayout>
                <div className={s.cont}>
                    <h4 className={s.title}>Программа лояльности</h4>
                    <div>
                        <h4 className={'text-center'}>Ваш статус <span className={statusObj.className}>{statusObj.text}</span></h4>
                        <div className={'d-flex justify-content-center'}>
                            <div className={s.card_container}>
                                <div className={s.above_card}>
                                    <div>
                                        Всего потрачено: {addSpacesToNumber(loyalty.total)} ₽
                                    </div>
                                    <div>
                                        До следующего статуса: {addSpacesToNumber(loyalty.until_next_status)} ₽
                                    </div>
                                </div>
                                <div className={`${s.card} ${statusObj.shadow}`}>
                                    <Image src={statusObj.img} alt='' fill={true} className={s.bg_image}/>
                                    <Image src={statusObj.logo} alt='' className={s.logo} width={50}/>
                                    <div className={`${s.in_card_text} ${statusObj.text === 'Diamond' ? '' : ''}`}>
                                        <div>
                                            ****{loyalty.number_card}
                                        </div>
                                        <div>
                                            Накоплено бонусов: {addSpacesToNumber(loyalty.bonuses)} ₽
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AccountLayout>
            <div className={'custom_cont'}>
                <div>
                    <div>
                        <div className={s.table_block}>
                            {
                                statusObj.text === 'Friends & Family' &&
                                <div className={s.ff_block}>
                                    <Image src={ffIcon} alt='' width={120} style={{marginRight: '-25px'}}/>
                                    <div>
                                        {userStore.firstName}, спасибо за постоянную поддержку Sellout’a! Мы рады, что вы всегда были и
                                        остаетесь частью нашей семьи и являетесь обладателем статуса <span className={s.ff_text}>Friends & Family</span> У вас есть доступ
                                        к уникальным ценовым предложениям, а также к ограниченному ассортименту. Мы уже рассчитали цену,
                                        учтя по-максимуму все скидки, бонусы и подарки! Вы
                                        по-прежнему можете накапливать баллы, приглашая
                                        людей по нашей <Link href={'/'} className={'text-decoration-underline text-black'}>реферальной программе</Link>
                                    </div>
                                    <Image src={info} alt='' width={90}/>
                                    <div>
                                        Обратите внимание, совершая покупки на Sellout со статусом <span className={s.ff_text}>Friends & Family</span> Вы обязуетесь
                                        не передавать третьим лицам доступ к вашему аккаунту и совершать покупки исключительно
                                        для личных нужд, не связанных с осуществлением предпринимательской деятельности.
                                    </div>
                                </div>
                            }
                            {
                                statusObj.text === 'Privileged' &&
                                <div className={s.ff_block}>
                                    <Image src={privilegedIcon} alt='' width={90}/>
                                    <div>
                                        {userStore.firstName}, поздравляем, вы стали обладателем статуса <span className={s.privileged_text}>Privileged</span>! У вас
                                        есть доступ к уникальным ценовым предложениям, а также к ограниченному ассортименту.
                                        Мы уже рассчитали цену, учтя по-максимуму все скидки, бонусы и подарки, поэтому вам больше
                                        не будут начисляться баллы за каждый заказ.
                                        Однако вы по-прежнему можете накапливать баллы, приглашая людей по
                                        нашей <Link href={'/'} className={'text-decoration-underline text-black'}>реферальной программе</Link>
                                    </div>
                                    <Image src={info} alt='' width={90}/>
                                    <div>
                                        Обратите внимание, совершая покупки на Sellout со статусом <span className={s.privileged_text}>Privileged</span> Вы обязуетесь
                                        не передавать третьим лицам доступ к вашему аккаунту и совершать покупки исключительно
                                        для личных нужд, не связанных с осуществлением предпринимательской деятельности.
                                    </div>
                                </div>
                            }

                            {
                                (statusObj.text !== 'Privileged' && statusObj.text !== 'Friends & Family') &&
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
                                                <div className={s.sapphire_text}>30000₽</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={s.first_row_td}>
                                                <div className={`${s.circle} ${s.emerald_circle}`}></div>
                                                <div className={s.emerald_text}>Emerald</div>
                                                <div className={s.emerald_text}>50000₽</div>
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
                                        <td>
                                            <div className={s.first_row_td}>
                                                <div className={`${s.circle} ${s.privileged_circle}`}></div>
                                                <div className={s.privileged_text}>Privileged</div>
                                                <div className={s.privileged_text}>?</div>
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
                                        <td>
                                            <div className={s.first_row_td}>
                                                <div className={`${s.circle} ${s.privileged_circle}`}>
                                                    <Image src={question} alt='' className={s.check}/>
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
                                        <td>
                                            <div className={s.first_row_td}>
                                                <div className={`${s.circle} ${s.privileged_circle}`}>
                                                    <Image src={question} alt='' className={s.check}/>
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
                                        <td>
                                            <div className={s.first_row_td}>
                                                <div className={`${s.circle} ${s.privileged_circle}`}>
                                                    <Image src={question} alt='' className={s.check}/>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>


                                    <tr className={s.tr_border}>
                                        <td>
                                            Бесплатная доставка
                                        </td>
                                        <td>
                                            <div className={s.amethyst_text}>От 35000₽</div>
                                        </td>
                                        <td>
                                            <div className={s.sapphire_text}>От 30000₽</div>
                                        </td>
                                        <td>
                                            <div className={s.emerald_text}>От 25000₽</div>
                                        </td>
                                        <td>
                                            <div className={s.ruby_text}>От 20000₽</div>
                                        </td>
                                        <td>
                                            <div className={s.diamond_text}>От 15000₽</div>
                                        </td>
                                        <td>
                                            <div className={s.first_row_td}>
                                                <div className={`${s.circle} ${s.privileged_circle}`}>
                                                    <Image src={question} alt='' className={s.check}/>
                                                </div>
                                            </div>
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
                                        <td>
                                            <div className={s.first_row_td}>
                                                <div className={`${s.circle} ${s.privileged_circle}`}>
                                                    <Image src={question} alt='' className={s.check}/>
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
                                        <td>
                                            <div className={s.first_row_td}>
                                                <div className={`${s.circle} ${s.privileged_circle}`}>
                                                    <Image src={question} alt='' className={s.check}/>
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
                                        <td>
                                            <div className={s.first_row_td}>
                                                <div className={`${s.circle} ${s.privileged_circle}`}>
                                                    <Image src={question} alt='' className={s.check}/>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            }
                        </div>

                    </div>



                    <div className={s.faq_block}>
                        <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                        <LoyaltyFAQ title={'Что такое программа лояльности?'}>
                            Программа лояльности – это наш специальный механизм благодарности для наших постоянных клиентов. Участие в программе позволяет вам получать дополнительные преимущества и бонусы за каждую покупку или другие формы взаимодействия с нашим брендом. Это может включать в себя эксклюзивные скидки, бонусные баллы, подарки и другие приятные сюрпризы. Мы ценим ваш выбор, и наша программа лояльности создана, чтобы делать ваш опыт шопинга у нас еще более выгодным и приятным!

                        </LoyaltyFAQ>
                        <LoyaltyFAQ title={'Как получать следующий статус программы лояльности?'}>
                            Для перехода на следующий этап достаточно совершить покупок на определенную сумму, подробнее читайте в личном кабинете в разделе “программа лояльности”.

                        </LoyaltyFAQ>
                        <LoyaltyFAQ title={'За что начисляются бонусы?'}>
                            Мы стараемся всячески благодарить вас за покупки на платформе SELLOUT, поэтому за каждую совершенную покупку мы будем начислять вам бонусы в соответствии с вашим статусом. Конкретное число бонусов за каждый товар вы сможете увидеть на странице товара, а также в корзине. Также мы дарим 1000 бонусных рублей за первую покупку и на ваш день рождения и регулярно начисляем бонусы в честь различных праздников!

                        </LoyaltyFAQ>
                        <LoyaltyFAQ title={'Чему равны бонусы?'}>
                            Каждый один бонус приравнивается к одному рублю! Вы можете оплачивать до 100% заказа, тем самым сводя стоимость заказа к нулю!

                        </LoyaltyFAQ>
                        <LoyaltyFAQ title={'Как воспользоваться бонусами?'}>
                            Чтобы оплатить заказ целиком или частично бонусами, в корзине или на любом этапе оформления заказа введите количество бонусов, которое хотите списать, и скидка будет автоматически применена!
                        </LoyaltyFAQ>
                        <LoyaltyFAQ title={'Как быстро после совершения покупки начисляются бонусы?'}>
                            Обратите внимание, бонусы на ваш баланс будут начислены не сразу, а по прошествии некоторого времени. Нам требуется обработать заказ, подтвердить корректность всех данных и после этого начислить бонусы. Если вы считаете, что бонусы слишком долго не начисляются и произошла какая-то ошибка, обязательно напишите нам и мы вам поможем!

                        </LoyaltyFAQ>
                        <LoyaltyFAQ title={'Когда сгорают бонусы?'}>
                            Бонусы действительны ровно 365 дней с момента их начисления, соответственно каждый бонус по прошествии года сгорает. Не упускайте возможность сделать цену еще более привлекательной и успевайте воспользоваться бонусами вовремя. Мы обязательно напомним вам о приближающейся дате сгорания бонусов!

                        </LoyaltyFAQ>
                        <LoyaltyFAQ title={'Можно ли вывести бонусы в виде рублей на свой счет?'}>
                            К сожалению, нет. Такая опция доступна только нашим партнерам, которые совместно с нами продвигают SELLOUT и получают за это дополнительные бонусы до 7000₽ за каждую покупку! Присоединяйтесь к нашей <Link href={'/account/referral'} className={'text-black'}>партнерской программе</Link> и зарабатывайте вместе с нами!

                        </LoyaltyFAQ>
                        <LoyaltyFAQ title={'В чем заключается приветственный бонус?'}>
                            Мы дарим нашим новым клиентам 1000₽ бонусами за совершение своего первого заказа!
                        </LoyaltyFAQ>
                    </div>

                    <div className={s.faq_block}>
                        <h5 className={`text-center ${s.questions_text}`}>Ответы на большинство вопросов
                            вы найдете здесь: <Link href={'/faq'} className={'text-black'} target={'_blank'}>FAQ</Link></h5>
                        <h5 className={`text-center ${s.questions_text}`}>Если у вас остались вопросы, вы всегда
                            можете обратиться в <span className={s.link} onClick={toggleContact}>службу поддержки</span> и мы будем
                            рады вам помочь!</h5>
                    </div>
                </div>

                <ContactModal isOpen={contactOpen} handleClose={closeContact}/>
            </div>
        </MainLayout>
    );
};

export default Loyalty;