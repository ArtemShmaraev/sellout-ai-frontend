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
                                <Link href="" className={s.footer_link}>Контакты</Link>
                            </div>
                        </Col>
                        <Col lg={4} className={s.footer_col}>
                            <h4>Помощь</h4>
                            <div>
                                <Link href="" className={s.footer_link}>Как мы работаем?</Link>
                            </div>
                            <div>
                                <Link href="" className={s.footer_link}>Гарантии</Link>
                            </div>
                            <div>
                                <Link href="" className={s.footer_link}>Оплата</Link>
                            </div>
                            <div>
                                <Link href="" className={s.footer_link}>Возврат</Link>
                            </div>
                        </Col>
                        <Col lg={4} className={s.footer_col}>
                            <h4>Остались вопросы?</h4>
                            <div>
                                <Link href="/faq" className={s.footer_link}>FAQ</Link>
                            </div>
                            <div>
                                <p className={s.footer_text}>Или свяжитесь с нами:</p>
                            </div>
                            <div>
                                <a href={'mailto:customerservice@sellout.su'}
                                   className={s.footer_link}>Почта: customerservice@sellout.su</a>
                            </div>
                            <div>
                                <a href={'https://wa.me/message/L2OINP6KNMNLA1'}
                                   target={'_blank'}
                                   className={s.footer_link}>WhatsApp: написать</a>
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
                                <Link href="" className={s.footer_link}>О нас</Link>
                            </div>
                            <div>
                                <Link href="" className={s.footer_link}>Блог</Link>
                            </div>
                            <div>
                                <Link href="" className={s.footer_link}>Контакты</Link>
                            </div>
                        </FooterDropdown>
                        <FooterDropdown header={'Помощь'}>
                            <div>
                                <Link href="" className={s.footer_link}>Как мы работаем?</Link>
                            </div>
                            <div>
                                <Link href="" className={s.footer_link}>Гарантии</Link>
                            </div>
                            <div>
                                <Link href="" className={s.footer_link}>Оплата</Link>
                            </div>
                            <div>
                                <Link href="" className={s.footer_link}>Возврат</Link>
                            </div>
                        </FooterDropdown>
                        <FooterDropdown header={'Остались вопросы?'}>
                            <div>
                                <Link href="/faq" className={s.footer_link}>FAQ</Link>
                            </div>
                            <div>
                                <p className={s.footer_text}>Или свяжитесь с нами:</p>
                            </div>
                            <div>
                                <a href={'mailto:customerservice@sellout.su'}
                                   className={s.footer_link}>Почта: customerservice@sellout.su</a>
                            </div>
                            <div>
                                <a href={'https://wa.me/message/L2OINP6KNMNLA1'}
                                   target={'_blank'}
                                   className={s.footer_link}>WhatsApp: написать</a>
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
        </footer>
    );
};

export default Footer;