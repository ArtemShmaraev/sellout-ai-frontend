import React, {useEffect, useState} from 'react';
import s from './OfferBetterPriceModal.module.css'
import {Modal} from "react-bootstrap";
import Image from "next/image";
import close from "@/static/icons/x-lg.svg";
import {desktopStore} from "@/store/DesktopStore";
import cashStack1 from "@/static/icons/cash-stack 1.svg";
import ffIcon from "@/static/icons/ff.png";
import twoArrows from "@/static/icons/two_arrowsNew.svg";
import selloutIcon from "@/static/icons/selloutIcon.png";
import LoyaltyFAQ from "@/components/pages/account/LoyaltyFAQ/LoyaltyFAQ";
import Link from "next/link";

const OfferBetterPriceModal = ({show, onHide}) => {
    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1000) {
            setIsDesktop(false)
        }
    }, [isDesktop])

    // const [isBlocksPage2Visible, setIsBlocksPage2Visible] = useState(false);
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setIsBlocksPage2Visible(true);
    //     }, 5000); // Время, соответствующее длительности анимации логотипа
    //
    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <Modal
            centered={true}
            show={show}
            onHide={onHide}
            fullscreen={!desktopStore.isDesktop}
            size={'lg'}
        >
            <Modal.Body>
                <div className={s.close}>
                    <Image src={close} alt="" onClick={onHide} style={{cursor: 'pointer'}}/>
                </div>
                <div className={s.text_block}>
                    <Image src={cashStack1} alt='' width={80}/>
                    <h4 className={'my-3'}>Нашли тот же товар дешевле?</h4>
                    <div className={s.arrows_section} style={{marginLeft: -5}}>
                        <Image src={ffIcon} alt='' width={100}/>
                        <div className={s.arrows_block}>
                            <div>
                                Информация о конкуренте
                            </div>
                            <div className={s.arrows_cont}>
                                <Image src={twoArrows} alt='' fill={true} className={s.arrow_img}/>
                            </div>
                            <div>
                                Лучшая цена
                            </div>
                        </div>
                        <Image src={selloutIcon} alt='' width={70}/>
                    </div>
                    <p className={s.text}>
                        Пришлите информацию о предложении конкурента, а мы гарантированно подберем для
                        вас более выгодное!
                    </p>
                    <div className='d-flex flex-row align-items-center justify-content-between'
                         style={{marginBottom: '30px'}}>
                        {/* Telegram */}
                        <a
                            href='https://t.me/sellout_official'
                            target='_blank'
                            rel='noopener noreferrer'
                            className={`${s.button} mb-3`}
                            style={{
                                backgroundColor: '#24A1DE',
                                color: '#fff',
                                width: '48%',
                                textAlign: 'center',
                                padding: '10px 0',
                                borderRadius: '5px',
                                textDecoration: 'none'
                            }}>
                            Телеграм
                        </a>

                        {/* WhatsApp */}
                        <a
                            href='https://wa.me/message/L2OINP6KNMNLA1'
                            target='_blank'
                            rel='noopener noreferrer'
                            className={`${s.button} mb-3`}
                            style={{
                                backgroundColor: '#128c7e',
                                color: '#fff',
                                width: '48%',
                                textAlign: 'center',
                                padding: '10px 0',
                                borderRadius: '5px',
                                textDecoration: 'none'
                            }}>
                            WhatsApp
                        </a>
                    </div>
                    <p className={s.text}>
                        Мы стараемся держать лидирующую позицию на российском рынке брендовой одежды и
                        обуви, поэтому тщательно мониторим конкурентов и стремимся предлагать нашим
                        клиентам
                        лучшие цены! Одна из наших ключевых ценностей - это самые выгодные цены на
                        широчайший ассортимент брендовой, стильной, премиальной одежды, обуви и
                        аксессуаров.
                        Поэтому если вы нашли более низкую цену у наших конкурентов, <span
                        style={{fontWeight: '600'}}>причем речь не
                                        только о крупнейших российских сетях и премиальных бутиках, но и о любых
                                        сервисах, магазинах из любых стран</span>, смело пишите нам, и мы
                        обязательно сделаем для вас наилучшее предложение!

                    </p>
                    <div className={s.faq_block}>
                        <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                        <LoyaltyFAQ
                            title={'Цена в другом месте слишком низкая, и вы думаете, что там продают подделки, что делать?'}>
                            Да, если цена разительно ниже нашей, то это явный признак неоригинального
                            товара, однако все равно присылайте нам, где вы наткнулись на подозрительное
                            предложения, а мы в свою очередь расскажем вам и объективно докажем,
                            является ли
                            данный магазин магазином подделок. Не стесняйтесь писать нам об этом, быть
                            может, наши опытные специалисты
                            уберегут вас от покупки подделки!

                        </LoyaltyFAQ>
                        <LoyaltyFAQ
                            title={'Куда присылать информацию о том, что вы нашли более выгодное предложение?'}>
                            Вы можете написать нам любым удобным для вас способом и прислать в любом
                            формате
                            информацию о предложении конкурентов: ссылка, контакы в соц. сетях, скриншот
                            и.т.д.
                            <br/>
                            Наши контакты:
                            <div>
                                <div>
                                    Почта: <a href={'mailto:customerservice@sellout.su'}
                                              className={'text-black'}>customerservice@sellout.su</a>
                                </div>
                                <div>
                                    WhatsApp: <a href={'https://wa.me/message/L2OINP6KNMNLA1'}
                                                 target={'_blank'}
                                                 className={'text-black'}>+7 993 896-92-27</a>
                                </div>
                                <div>
                                    Telegram: <a href={'https://t.me/sellout_official'}
                                                 target={'_blank'}
                                                 className={'text-black'}>@sellout_official</a>
                                </div>
                            </div>
                        </LoyaltyFAQ>
                    </div>
                    <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}
                                                                               className={s.link}
                                                                               target={'_blank'}>FAQ</Link>
                    </h5>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default OfferBetterPriceModal;