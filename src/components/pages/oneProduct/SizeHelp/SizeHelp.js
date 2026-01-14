import React, {useContext, useEffect, useState} from 'react';
import s from './SizeHelp.module.css'
import {Modal} from "react-bootstrap";
import close from "@/static/icons/x-lg.svg";
import ruller from '@/static/img/ruller.svg'
import Image from "next/image";
import {Context} from "@/context/AppWrapper";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import {useRouter} from "next/router";
import ContactModal from "@/components/shared/ContactModal/ContactModal";
import parseHtml from "html-react-parser";
import LoyaltyFAQ from "@/components/pages/account/LoyaltyFAQ/LoyaltyFAQ";
import Link from "next/link";

const SizeHelp = ({model, imgSrc, manySizes, str}) => {
    const [show, setShow] = useState(false);
    const {desktopStore} = useContext(Context)
    const {userStore} = useContext(Context)
    const router = useRouter()

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };
    const [contactOpen, setContactOpen] = useState(false)
    const toggleContact = () => {
        setContactOpen(!contactOpen)
        setShow(!s)
    }
    const closeContact = () => {
        setContactOpen(false)
        setShow(true)
    }
    return (
        <>
            <button
                className={s.toggle_btn}
                onClick={handleShow}
            >
                Помощь с выбором {manySizes ? 'размера' : 'конфигурации'}
            </button>
            <Modal
                centered={true}
                show={show}
                onHide={handleClose}
                fullscreen={!desktopStore.isDesktop}
                size={'lg'}
            >
                <Modal.Body>
                    <div className={s.close}>
                        <Image src={close} alt="" onClick={handleClose} style={{cursor: 'pointer'}}/>
                    </div>
                    {manySizes
                        ?
                        <div className={s.text_block}>
                            <Image src={ruller} alt="" className={s.ruller}/>
                            <h5 className={s.header}>Помощь с выбором подходящего размера</h5>
                            <p className={s.text}>Некоторые модели обладают специфическими размерными сетками, отличающимися от стандартных,
                                поэтому требуют тщательного подбора. Мы позаботимся,
                                чтобы вы приобрели идеальный товар!</p>
                            <div className={s.photo}>
                                <Image src={imgSrc} alt="" fill={true} style={{objectFit: 'contain'}}/>
                            </div>
                            <p className={s.description}>{model}</p>
                            <p className={s.text}>{parseHtml(str)}Чтобы мы всегда знали,
                                какой размер рекомендовать, советуем
                                заполнить в Личном Кабинете {
                                    userStore.isLogged
                                        ?
                                        <a href="/account" className={s.link}
                                           onClick={e => {
                                               e.preventDefault()
                                               router.push('/account')
                                           }}
                                        >Ваш размер.</a>
                                        :
                                        <AuthModal inline={true}>
                                            <div className={s.link}>Ваш размер</div>
                                        </AuthModal>
                                }</p>
                            <p className={s.text}>
                                На данный момент не все товары подлежат примерке и возврату, поэтому, если вы все же
                                сомневаетесь в выборе подходящего размера, советуем попробовать примерить эту же или похожую
                                модель в другом месте, а после этого приобрести у нас.
                                Если у вас остались вопросы, обращайтесь в <span className={s.link} onClick={toggleContact}>службу поддержки</span>,
                                мы обязательно вам поможем!
                                Спасибо за понимание! Приятных покупок!</p>
                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                            <div className={s.faq_block}>
                                <LoyaltyFAQ title={'В чем отличия размерных таблиц на странице товара в разделе “Размерные сетки”?'}>
                                    “Таблица бренда” - таблица, созданная самим брендом.
                                    <br/>
                                    “Таблица измерений” - таблица с замерами разных частей изделия.
                                    <br/>
                                    ”Таблица рекомендаций” - таблица с рекомендациями подходящего размера на основе измерений.
                                    <br/>
                                    ”Дополнительная таблица” - дополнительная таблица, может быть вспомогательной для основных, если там отсутствует какой-то размерный ряд.
                                    <br/>
                                    Обратите внимание, все измерения имеют некоторую погрешность и могут отличаться от действительных величин. Настоятельно
                                    рекомендуем тщательно выбирать размер! Вы всегда можете обратиться к нам и наши специалисты помогут вам с выбором подходящего
                                    размера!

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Что означают буквы W(wmns), Y, C, K около некоторых размеров?'}>
                                    У некоторых моделей обуви и изредка одежды встречаются буквы W, Y, C, K рядом с размером.
                                    Чаще всего они используются у женских и детских моделей Nike.
                                    <ul>
                                        <li>W означает Women’s - женский. Размер представлен в женской американской размерной сетке. (US-wmns)
                                        </li>
                                        <li>Y означает Youth - подростковый. Размер представлен в подростковой американской размерной сетке. На самом деле это обычный размер US. Например 7Y = 7US.</li>
                                        <li>C и K означают children и kids - детский. Размер представлен в детской американской размерной сетке. (US-kids)</li>
                                        <li>I означает infant - младенец. Размер представлен в детской американской размерной сетке. (US-kids)</li>
                                    </ul>

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Что означают буквы GS, PS, BP, TD, OG, PE, EP, SB в названиях некоторых моделей?'}>
                                    У некоторых моделей обуви встречаются буквы GS, TD, PS, BP, OG, PE, EP, SB в названии.
                                    <br/>
                                    Чаще всего они используются у моделей Nike.
                                    <ul>
                                        <li>GS означает Grade School - подростковый. Модель вероятнее подойдет девушкам и подросткам.</li>
                                        <li>PS означает Pre School - дошкольный. Модель вероятнее подойдет детям.</li>
                                        <li>BP означает Big Kids’ Pre-School - дошкольный. Модель вероятнее подойдет детям.</li>
                                        <li>
                                            TD означает Toddler - младенец. Модель вероятнее подойдет детям.</li>
                                        <li>OG означает Original - оригинальный релиз. Данная расцветка или силуэт является первозданной моделей и особо ценится.
                                        </li>
                                        <li>
                                            PE означает Player Exclusive  - версия, созданная под конкретного спортсмена.</li>
                                        <li>
                                            EP означает Engineered Performance  - модель разработана с упором на технологические и производственные решения, направленные на улучшение производительности и комфорта при занятии спортом.</li>
                                        <li>SB означает Skateboarding  - модель создана с учетом потребностей скейтеров,
                                            предоставляя дополнительные технологии и дизайн, чтобы соответствовать особенностям этого вида спорта.</li>
                                    </ul>

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Где можно примерить товар перед приобретением?'}>
                                    Вы всегда можете обратиться в службу поддержки, и наши специалисты постараются помочь вам с выбором размера и подскажут, где можно померить интересующую модель
                                    или похожую, чтобы затем заказать на нашей платформе по лучшей цене ;)
                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Где узнать больше информации о товаре?'}>
                                    Если вы хотите узнать больше о составе, комплектации и иных характеристиках товара, вы всегда можете обратиться к нам, и наши специалисты ответят на все вопросы и
                                    предоставят исчерпывающую информацию о товаре!
                                </LoyaltyFAQ>
                            </div>
                        </div>
                        :
                        <div className={s.text_block}>
                            <Image src={ruller} alt="" className={s.ruller}/>
                            <h5 className={s.header}>Помощь с выбором конфигурации</h5>
                            <div className={s.photo}>
                                <Image src={imgSrc} alt="" fill={true} style={{objectFit: 'contain'}}/>
                            </div>
                            <p className={s.description}>{model}</p>
                            <p className={s.text}>Некоторые модели представлены в разных конфигурациях. Зачастую это различные комплектации товара,
                                такие как подарочная упаковка, пыльник, брендовый пакет и.т.п. Это связано с тем, что один и тот же товар мы можем выкупить для вас из оффлайн бутика, интернет-магазина или у частного коллекционера.

                                <br/>
                                Если вы хотите подробнее узнать о конфигурации и комплектации, обратитесь в <span className={s.link} onClick={toggleContact}>службу поддержки</span>!
                            </p>
                            <div className={s.faq_block}>
                                <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                <LoyaltyFAQ title={'Где узнать больше информации о товаре?'}>
                                    Если вы хотите узнать больше о составе, комплектации и иных характеристиках товара, вы всегда можете обратиться к нам, и наши специалисты ответят на все вопросы и
                                    предоставят исчерпывающую информацию о товаре!

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Какие существуют особенности комплектаций?'}>
                                    Большинство аксессуаров продаются в разных комплектациях: с пыльниками, подарочными коробками, брендовыми пакетами, специальными упаковками. Все это зависит от того, откуда мы привозим лот: бутик бренда,
                                    интернет-магазин или покупаем у частных коллекционеров.

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Особенности конфигураций товаров Hermès'}>
                                    У многих аксессуаров бренда Hermès существуют специальные штампы, отражающие дату производства изделия, а также место и другие параметры, играющие важную роль в идентификации.
                                    <ul>
                                        <li>Штамп Y означает, что изделие было изготовлено в 2020г.</li>
                                        <li>Штамп Z означает, что изделие было изготовлено в 2021г.</li>
                                        <li>Штамп U означает, что изделие было изготовлено в 2022г.</li>
                                        <li>Штамп B означает, что изделие было изготовлено в 2023г.</li>
                                    </ul>

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Особенности конфигураций товаров Chanel'}>
                                    У многих аксессуаров бренда Chanel в комплекте присутствуют специальные голограммы, карточки или микрочипы,
                                    играющие важную роль в идентификации изделий.
                                </LoyaltyFAQ>
                            </div>
                        </div>
                    }
                </Modal.Body>
            </Modal>
            <ContactModal isOpen={contactOpen} handleClose={closeContact}/>
        </>
    );
};

export default SizeHelp;