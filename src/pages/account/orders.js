import React, {useState} from 'react';
import MainLayout from "@/layout/MainLayout";
import AccountLayout from "@/layout/AccountLayout";
import s from '@/styles/AccountOrders.module.css'
import OrderCard from "@/components/pages/account/OrderCard/OrderCard";
import Head from "next/head";
import {parse} from "cookie";
import jwtDecode from "jwt-decode";
import {fetchUserOrders} from "@/http/userApi";
import Link from "next/link";
import LoyaltyFAQ from "@/components/pages/account/LoyaltyFAQ/LoyaltyFAQ";
import ContactModal from "@/components/shared/ContactModal/ContactModal";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const {user_id} = jwtDecode(token)
    const orders = await fetchUserOrders(user_id, token)
    return { props: {orders} }
}
const Orders = ({orders}) => {
    const [contactOpen, setContactOpen] = useState(false)
    const toggleContact = () => {
        setContactOpen(!contactOpen)
    }
    const closeContact = () => {
        setContactOpen(false)
    }
    return (
        <MainLayout>
            <Head>
                <title>Мои заказы</title>
            </Head>
            <AccountLayout>
                <div className={s.cont}>
                    <h4 className={s.title}>Ваши заказы</h4>
                    <div className={s.orders_block}>
                        {
                            orders.length > 0
                                ?
                                <div className={s.cards_block}>
                                    {
                                        orders.map(el =>
                                            <OrderCard order={el}/>
                                        )
                                    }
                                </div>
                                :
                                <>
                                    <h5 className={'text-center'}>У вас пока нет заказов</h5>
                                    <div className={'d-flex justify-content-center mt-3'}>
                                        <Link href={'/products'} className={s.link}>За покупками</Link>
                                    </div>
                                </>
                        }
                    </div>
                    <div className={s.faq_block}>
                        <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                        <LoyaltyFAQ title={'Что означает каждый из статусов заказа?'}>
                            Если в вашем заказе несколько позиций, то у разных товаров может быть разный статус. Например часть заказа уже приехала в РФ, а часть еще в пути. В связи с этим у каждого заказа есть совокупный статус, а у каждой позиции заказа есть свой отдельный статус.
                            <br/>
                            Подробнее про статусы каждой позиции заказа:
                            <ol>
                                <li>“Заказ принят” - ваш заказ успешно принят и ожидает отправления</li>
                                <li>“В пути до международного склада” и “В пути до московского склада” - товар на пути до наших складов за границей или в Москве. </li>
                                <li>“Прибыл в Москву” - товар прибыл на наш склад в Москве и готовится к отправке до вас</li>
                                <li>“Передан в службу доставки по России” - товар передан в курьерскую службу доставки и ему присвоен трек-номер</li>
                                <li>“Доставлен” - товар доставлен до вас</li>
                                <li>“Отменен” - заказ по какой-то причине отменен. В таком случае мы
                                    обязательно свяжемся с вами и уточним причины произошедшего и дальнейшие действия!</li>
                            </ol>
                            Весь заказ помимо выше перечисленных может иметь следующие статусы:
                            <ul>
                                <li>“Частично передан в службу доставки по России” и “Частично прибыл в Москву” - это означает, что часть товаров в заказе уже передана в курьерскую службу доставки и ей присвоены трек-номера или часть товаров уже прибыли в Москву. Подробнее про статус
                                    каждой позиции заказа вы можете посмотреть в деталях заказа так же в личном кабинете.</li>
                            </ul>
                        </LoyaltyFAQ>
                        <LoyaltyFAQ title={'Как быстро обрабатываются заказы?'}>
                            После успешной оплаты заказа ваш заказ получает статус “Принят”. Мы стремимся как можно быстрее обрабатывать заказы, обычно это происходят в течение нескольких часов,
                            после чего ваш заказ получает статус “В пути”.
                        </LoyaltyFAQ>
                        <LoyaltyFAQ title={'Как получить трек номер посылки?'}>
                            Как только мы отправим ваш заказ курьерской службой по России, мы присвоим ему трек-номер. Информацию о трек-номере вы всегда сможете найти в деталях заказа, а также мы пришлем вам письмо на почту с трек-номером.

                        </LoyaltyFAQ>
                        <LoyaltyFAQ title={'Почему мой заказ отменили?'}>
                            Так как многие представленные на нашей платформе товары являются лимитированными и коллекционными лотами, их количество весьма ограничено. Вследствие чего заказанную вами позицию могут выкупить буквально за мгновение до вас, и поэтому нам придется отменить ваш заказ. Также может оказаться, что предложение продавца стало неактуальным и мы не способны выкупить у него выбранный лот по указанной цене. Мы всячески стремимся минимизировать случаи технических ошибок, ведущих к отменам заказа. Надеемся на ваше понимание, мы стараемся предоставить вам самые выгодные цены, собирая миллионы предложений со всего мира!
                            <br/>
                            Не переживайте, в случае отмены мы свяжемся с вами как можно скорее и решим, что делать: заменить товар, сделать частичную или полную отмену заказа. В случае отмены средства, как правило, возвращаются моментально!

                        </LoyaltyFAQ>
                    </div>
                    <div className={s.faq_block}>
                        <h5 className={`text-center ${s.questions_text}`}>Ответы на большинство вопросов
                            вы найдете здесь: <Link href={'/faq'} className={'text-black'} target={'_blank'}>FAQ</Link></h5>
                        <h5 className={`text-center ${s.questions_text}`}>Если у вас остались вопросы, вывсегда
                            можете обратиться в <span className={s.link_text} onClick={toggleContact}>службу поддержки</span> и мы будем
                            рады вам помочь!</h5>
                    </div>
                </div>
            </AccountLayout>
            <ContactModal handleClose={closeContact} isOpen={contactOpen}/>
        </MainLayout>
    );
};

export default Orders;