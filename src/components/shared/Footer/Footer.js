import React, {useEffect, useState} from 'react';
import s from './Footer.module.css'
import {Col, Container, Row} from "react-bootstrap";
import tg from '@/static/icons/telegram.png'
import MailingInput from "../UI/MailingInput/MailingInput";
import FooterDropdown from "../UI/FooterDropdown/FooterDropdown";
import Image from 'next/image'

const Footer = () => {
    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1000) {
            setIsDesktop(false)
        }
    }, [isDesktop])
    return (
        <footer className={s.footer}>
            <Container>
                {isDesktop
                    ?
                    <Row>
                        <Col lg={4}>
                            <h4>Sellout</h4>
                            <a href="" className={s.footer_link}>О нас</a>
                            <a href="" className={s.footer_link}>Блог</a>
                            <a href="" className={s.footer_link}>Контакты</a>
                        </Col>
                        <Col lg={4}>
                            <h4>Помощь</h4>
                            <a href="" className={s.footer_link}>Как мы работаем?</a>
                            <a href="" className={s.footer_link}>Гарантии</a>
                            <a href="" className={s.footer_link}>Оплата</a>
                            <a href="" className={s.footer_link}>Возврат</a>
                        </Col>
                        <Col lg={4}>
                            <h4>Остались вопросы?</h4>
                            <a href="" className={s.footer_link}>FAQ</a>
                            <p className={s.footer_text}>Или свяжитесь с нами</p>
                            <p className={s.footer_text}>Почта: support@sellout.su</p>
                            <p className={s.footer_text}>Телефон: +7(916)114-92-27</p>
                        </Col>
                    </Row>
                    :
                    <>
                        <FooterDropdown header={'Sellout'}>
                            <a href="" className={s.footer_link}>О нас</a>
                            <a href="" className={s.footer_link}>Блог</a>
                            <a href="" className={s.footer_link}>Контакты</a>
                        </FooterDropdown>
                        <FooterDropdown header={'Помощь'}>
                            <a href="" className={s.footer_link}>Как мы работаем?</a>
                            <a href="" className={s.footer_link}>Гарантии</a>
                            <a href="" className={s.footer_link}>Оплата</a>
                            <a href="" className={s.footer_link}>Возврат</a>
                        </FooterDropdown>
                        <FooterDropdown header={'Остались вопросы?'}>
                            <a href="" className={s.footer_link}>FAQ</a>
                            <p className={s.footer_text}>Или свяжитесь с нами</p>
                            <p className={s.footer_text}>Почта: support@sellout.su</p>
                            <p className={s.footer_text}>Телефон: +7(916)114-92-27</p>
                        </FooterDropdown>
                    </>
                }
                <Row>
                    <Col lg={4}>
                        <h4 className={s.row2}>Мы в социальных сетях:</h4>
                        <div className={s.icons_block}>
                            <Image src={tg} width={30} alt="" className={s.icon}/>
                            <Image src={tg} width={30} alt="" className={s.icon}/>
                            <Image src={tg} width={30} alt="" className={s.icon}/>
                        </div>
                    </Col>
                    <Col lg={8}>
                        <h4 className={s.row2}>Подпишитесь на рассылку, чтобы быть в курсе новых поступлений и акций:</h4>
                        <MailingInput/>
                    </Col>
                </Row>
            </Container>
            <hr/>
            <Container>
                <div className={s.footer_bottom}>
                    <div>
                        <p className={s.footer_text}>&#9400; SELLOUT, 2023</p>
                    </div>
                    <div className={s.footer_bottom}>
                        <a href="" className={s.dark_links}>Публичная оферта</a>
                        <a href="" className={s.dark_links}>Политика конфидециальности</a>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;