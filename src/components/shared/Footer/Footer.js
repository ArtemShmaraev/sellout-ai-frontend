import React, {useEffect, useState} from 'react';
import s from './Footer.module.css'
import {Col, Row} from "react-bootstrap";
import tg from '@/static/icons/tg.svg'
import vk from '@/static/icons/vk.svg'
import MailingInput from "../UI/MailingInput/MailingInput";
import FooterDropdown from "../UI/FooterDropdown/FooterDropdown";
import Image from 'next/image'
import Link from "next/link";
import visa from '@/static/icons/payment/visa.svg'
import mastercard from '@/static/icons/payment/mastercard.svg'
import mir from '@/static/icons/payment/mir.svg'
import ContactModal from "@/components/shared/ContactModal/ContactModal";
import TextModal from "@/components/shared/UI/TextModal/TextModal";
import how from "@/static/icons/question-circle.svg";
import warranty from "@/static/icons/warranty.svg";
import payment from "@/static/icons/payment.svg";
import ret from "@/static/icons/return.svg";
import refund from "@/static/icons/arrow-return-left.svg";

const Footer = () => {
    const [isDesktop, setIsDesktop] = useState(true)
    const checkIsDesktop = () => {
        const width = window.innerWidth
        if (width <= 1200) {
            setIsDesktop(false)
        } else {
            setIsDesktop(true)
        }
    }
    useEffect(() => {
        window.addEventListener("resize", checkIsDesktop);
        // Call handler right away so state gets updated with initial window size
        checkIsDesktop();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", checkIsDesktop);
    })
    const [contactOpen, setContactOpen] = useState(false)
    const toggleContact = () => {
        setContactOpen(!contactOpen)
    }
    const closeContact = () => {
        setContactOpen(false)
    }
    return (
        <footer className={s.footer}>
            <div className={'custom_cont'}>
                {isDesktop
                    ?
                    <Row>
                        <Col lg={4} className={s.footer_col}>
                            <h4>Sellout</h4>
                            <div>
                                <Link href="" className={s.footer_link}>О нас</Link>
                            </div>
                            <div>
                                <Link href="" className={s.footer_link}>Блог</Link>
                            </div>
                            <div>
                                <span className={s.footer_link}
                                onClick={toggleContact}
                                >Контакты</span>
                            </div>
                        </Col>
                        <Col lg={4} className={s.footer_col}>
                            <h4>Помощь</h4>
                            <TextModal title={'Как мы работаем?'} img={how} titleClassname={s.footer_link}>
                                <p>SELLOUT - инновационная онлайн-платформа, предлагающая широчайший ассортимент
                                    брендовой одежды и обуви, аксессуаров и прочих товаров. У нас Вы сможете найти как лимитированные и
                                    труднодоступные модели и коллекции, так и отобранные нашими стилистами товары со всего мира.
                                    Мы сотрудничаем только с проверенными бутиками, магазинами и продавцами,
                                    а также сами проводим проверку на оригинальность. Только после этого мы доставляем Ваш заказ. </p>
                                <p>
                                    Подробнее Вы можете прочитать в разделе <Link href="" className={s.link}>О нас</Link>
                                </p>
                            </TextModal>
                            <TextModal title={'Гарантии оригинальности и качества'} img={warranty} titleClassname={s.footer_link}>
                                <>
                                    <p>
                                        SELLOUT продает только 100% оригинальные и новые вещи
                                    </p>
                                    <p>
                                        Мы бережно относимся к своей репутации и не допускаем подделок
                                    </p>
                                    <p>
                                        Мы сотрудничаем только с проверенными бутиками, магазинами и продавцами. Каждый товар перед отправкой покупателю
                                        проходит тщательные проверки на оригинальность и качество. Наша команда состоит из специалистов, которые
                                        уже более 5 лет занимаются проверкой подлинности одежды, обуви и
                                        прочих аксессуаров, а также использует передовые технологии искусственного интеллекта, чтобы исключить человеческий фактор.
                                    </p>
                                </>
                            </TextModal>
                            <TextModal title={'Оплата'} img={payment} titleClassname={s.footer_link}>
                                <p>
                                    При оплате товара средства на Вашей карте замораживаются, а не списываются. Далее мы должны подтвердить
                                    Ваш заказ, провести дополнительный ряд проверок, если требуется, и только после этого деньги с Вашего счета
                                    будут списаны. Обычно подтверждение заказа происходит в кратчайшие сроки. Обо всех изменениях статуса заказа
                                    Вы можете получать уведомления удобным для Вас способом, а также следить
                                    за ними в Личном Кабинете. В случае, если заказ не удастся подтвердить, вся сумма будет незамедлительно разморожена.
                                    Подробнее про правила оплаты читайте <Link href="/faq" className={s.link}>тут</Link>
                                </p>
                            </TextModal>
                            <TextModal title={'Возврат'} img={ret} titleClassname={s.footer_link}>
                                <p>
                                    Многие представленные на нашей платформе товары выкупаются специально под Вас у частных продавцов,
                                    коллекционеров или из разных иностранных бутиков и магазинов, поэтому мы не
                                    способны предложить Вам возврат товара после подтверждения заказа на все позиции.
                                    Однако есть ряд моделей, которые подлежат возврату. Они помечены
                                    значком <Image src={refund} alt=""/>. Мы уже предоставляем возврат даже на некоторые
                                    эксклюзивные коллекции и постоянно стремимися увеличить ассортимент товаров, подлежащих возврату,
                                    чтобы Ваши покупки с нами стали еще более удобными!
                                    Подробнее про правила возврата читайте <Link href="/faq" className={s.link}>тут</Link>
                                </p>
                            </TextModal>
                        </Col>
                        <Col lg={4} className={s.footer_col}>
                            <h4>Остались вопросы?</h4>
                            <div>
                                <Link href="/faq" className={s.footer_link}>Ответы на большинство из них: FAQ</Link>
                            </div>
                            <div>
                                <p className={s.footer_text}>Или напишите нам:</p>
                            </div>
                            <div>
                                <a href={'mailto:customerservice@sellout.su'}
                                   className={s.footer_link}>Почта: customerservice@sellout.su</a>
                            </div>
                            <div>
                                <a href={'https://wa.me/message/L2OINP6KNMNLA1'}
                                   target={'_blank'}
                                   className={s.footer_link}>WhatsApp: +7 993 896-92-27</a>
                            </div>
                            <div>
                                <a href={'https://t.me/sellout_official'}
                                   target={'_blank'}
                                   className={s.footer_link}>Telegram: @sellout_official</a>
                            </div>
                        </Col>
                    </Row>
                    :
                    <>
                        <FooterDropdown header={'Sellout'}>
                            <div>
                                <Link href="/faq" className={s.footer_link}>О нас</Link>
                            </div>
                            <div>
                                <Link href="" className={s.footer_link}>Блог</Link>
                            </div>
                            <div>
                                <span className={s.footer_link}
                                      onClick={toggleContact}
                                >Контакты</span>
                            </div>
                        </FooterDropdown>
                        <FooterDropdown header={'Помощь'}>
                            <TextModal title={'Как мы работаем?'} img={how} titleClassname={s.footer_link}>
                                <p>SELLOUT - инновационная онлайн-платформа, предлагающая широчайший ассортимент
                                    брендовой одежды и обуви, аксессуаров и прочих товаров. У нас Вы сможете найти как лимитированные и
                                    труднодоступные модели и коллекции, так и отобранные нашими стилистами товары со всего мира.
                                    Мы сотрудничаем только с проверенными бутиками, магазинами и продавцами,
                                    а также сами проводим проверку на оригинальность. Только после этого мы доставляем Ваш заказ. </p>
                                <p>
                                    Подробнее Вы можете прочитать в разделе <Link href="/faq" className={s.link}>О нас</Link>
                                </p>
                            </TextModal>
                            <TextModal title={'Гарантии оригинальности и качества'} img={warranty} titleClassname={s.footer_link}>
                                <>
                                    <p>
                                        SELLOUT продает только 100% оригинальные и новые вещи
                                    </p>
                                    <p>
                                        Мы бережно относимся к своей репутации и не допускаем подделок
                                    </p>
                                    <p>
                                        Мы сотрудничаем только с проверенными бутиками, магазинами и продавцами. Каждый товар перед отправкой покупателю
                                        проходит тщательные проверки на оригинальность и качество. Наша команда состоит из специалистов, которые
                                        уже более 5 лет занимаются проверкой подлинности одежды, обуви и
                                        прочих аксессуаров, а также использует передовые технологии искусственного интеллекта, чтобы исключить человеческий фактор.
                                    </p>
                                </>
                            </TextModal>
                            <TextModal title={'Оплата'} img={payment} titleClassname={s.footer_link}>
                                <p>
                                    При оплате товара средства на Вашей карте замораживаются, а не списываются. Далее мы должны подтвердить
                                    Ваш заказ, провести дополнительный ряд проверок, если требуется, и только после этого деньги с Вашего счета
                                    будут списаны. Обычно подтверждение заказа происходит в кратчайшие сроки. Обо всех изменениях статуса заказа
                                    Вы можете получать уведомления удобным для Вас способом, а также следить
                                    за ними в Личном Кабинете. В случае, если заказ не удастся подтвердить, вся сумма будет незамедлительно разморожена.
                                    Подробнее про правила оплаты читайте <Link href="/faq" className={s.link}>тут</Link>
                                </p>
                            </TextModal>
                            <TextModal title={'Возврат'} img={ret} titleClassname={s.footer_link}>
                                <p>
                                    Многие представленные на нашей платформе товары выкупаются специально под Вас у частных продавцов,
                                    коллекционеров или из разных иностранных бутиков и магазинов, поэтому мы не
                                    способны предложить Вам возврат товара после подтверждения заказа на все позиции.
                                    Однако есть ряд моделей, которые подлежат возврату. Они помечены
                                    значком <Image src={refund} alt=""/>. Мы уже предоставляем возврат даже на некоторые
                                    эксклюзивные коллекции и постоянно стремимися увеличить ассортимент товаров, подлежащих возврату,
                                    чтобы Ваши покупки с нами стали еще более удобными!
                                    Подробнее про правила возврата читайте <Link href="/faq" className={s.link}>тут</>
                                </p>
                            </TextModal>
                        </FooterDropdown>
                        <FooterDropdown header={'Остались вопросы?'}>
                            <div>
                                <Link href="/faq" className={s.footer_link}>Ответы на большинство из них: FAQ</Link>
                            </div>
                            <div>
                                <p className={s.footer_text}>Или напишите нам:</p>
                            </div>
                            <div>
                                <a href={'mailto:customerservice@sellout.su'}
                                   className={s.footer_link}>Почта: customerservice@sellout.su</a>
                            </div>
                            <div>
                                <a href={'https://wa.me/message/L2OINP6KNMNLA1'}
                                   target={'_blank'}
                                   className={s.footer_link}>WhatsApp: +7 993 896-92-27</a>
                            </div>
                            <div>
                                <a href={'https://t.me/sellout_official'}
                                   target={'_blank'}
                                   className={s.footer_link}>Telegram: @sellout_official</a>
                            </div>
                        </FooterDropdown>
                    </>
                }
                <Row className={'w-100'}>
                    <Col lg={4}>
                        <div className={s.social_media}>
                            <h4 className={s.row2}>Мы в социальных сетях:</h4>
                            <div className={s.icons_block}>
                                <a href={''}>
                                    <Image src={tg} width={30} alt="" className={s.icon}/>
                                </a>
                                <a href={''}>
                                    <Image src={vk} width={38} alt="" className={s.icon}/>
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col lg={8} >
                        <h4 className={s.row2}>Подпишитесь на рассылку, чтобы быть в курсе новых поступлений и акций:</h4>
                        <MailingInput/>
                    </Col>
                </Row>
            </div>
            <hr/>
            <div className={'custom_cont'}>
                <div className={s.footer_bottom}>
                    <div>
                        <p className={s.footer_text}>&#9400; SELLOUT, 2023</p>
                    </div>
                    <div className={s.footer_bottom}>
                        <a href="/docs/Агентский%20договор%20SELLOUT.pdf" target={"_blank"}
                           className={s.dark_links}>
                            Агентский договор</a>
                        <a href="/docs/Пользовательское_соглашение_SELLOUT.pdf" target={"_blank"}
                           className={s.dark_links}>
                            Пользовательское соглашение</a>
                        <a href="/docs/Политика%20конфиденциальности.pdf" target={"_blank"}
                           className={s.dark_links}>
                            Политика конфиденциальности</a>
                    </div>
                </div>
                <div className={s.payment_block}>
                    <Image src={mastercard} alt=''/>
                    <Image src={visa} alt=''/>
                    <Image src={mir} alt=''/>
                </div>
            </div>
            <ContactModal isOpen={contactOpen} handleClose={closeContact}/>
        </footer>
    );
};

export default Footer;