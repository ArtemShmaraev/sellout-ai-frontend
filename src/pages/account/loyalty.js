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
    return (
        <MainLayout>
            <AccountLayout>
                <div className={s.cont}>
                    <h4 className={s.title}>Программа лояльноси</h4>
                    <div>
                        <h4 className={'text-center'}>Ваш статус <span className={statusObj.className}>{statusObj.text}</span></h4>
                        <div className={'d-flex justify-content-center'}>
                            <div className={s.card_container}>
                                <div className={s.above_card}>
                                    <div>
                                        Всего потрачено: {loyalty.total}₽
                                    </div>
                                    <div>
                                        До следующего статуса: {loyalty.until_next_status}₽
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
                                            Накоплено бонусов: {loyalty.bonuses}₽
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
                                        {userStore.firstName}, спасибо за постоянную поддержку Sellout’a! Мы рады, что Вы всегда были и
                                        остаетесь частью нашей семьи и являетесь обладателем статуса <span className={s.ff_text}>Friends & Family</span> У Вас есть доступ
                                        к уникальным ценовым предложениям, а также к ограниченному ассортименту. Мы уже рассчитали цену,
                                        учтя по-максимуму все скидки, бонусы и подарки! Вы
                                        по-прежнему можете накапливать баллы, приглашая
                                        людей по нашей <Link href={'/'} className={'text-decoration-underline text-black'}>реферальной программе</Link>
                                    </div>
                                    <Image src={info} alt='' width={90}/>
                                    <div>
                                        Обратите внимание, совершая покупки на Sellout со статусом <span className={s.ff_text}>Friends & Family</span> Вы обязуетесь
                                        не передавать третьим лицам доступ к Вашему аккаунту и совершать покупки исключительно
                                        для личных нужд, не связанных с осуществлением предпринимательской деятельности.
                                    </div>
                                </div>
                            }
                            {
                                statusObj.text === 'Privileged' &&
                                <div className={s.ff_block}>
                                    <Image src={privilegedIcon} alt='' width={90}/>
                                    <div>
                                        {userStore.firstName}, поздравляем, Вы стали обладателем статуса <span className={s.privileged_text}>Privileged</span>! У Вас
                                        есть доступ к уникальным ценовым предложениям, а также к ограниченному ассортименту.
                                        Мы уже рассчитали цену, учтя по-максимуму все скидки, бонусы и подарки, поэтому Вам больше
                                        не будут начисляться баллы за каждый заказ.
                                        Однако Вы по-прежнему можете накапливать баллы, приглашая людей по
                                        нашей <Link href={'/'} className={'text-decoration-underline text-black'}>реферальной программе</Link>
                                    </div>
                                    <Image src={info} alt='' width={90}/>
                                    <div>
                                        Обратите внимание, совершая покупки на Sellout со статусом <span className={s.ff_text}>Friends & Family</span> Вы обязуетесь
                                        не передавать третьим лицам доступ к Вашему аккаунту и совершать покупки исключительно
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
                            можете обратиться в <span className={s.link} onClick={toggleContact}>службу поддержки</span> и мы будем
                            рады Вам помочь!</h5>
                    </div>
                </div>

                <ContactModal isOpen={contactOpen} handleClose={closeContact}/>
            </div>
        </MainLayout>
    );
};

export default Loyalty;