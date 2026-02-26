import React, {useContext, useEffect, useState} from 'react';
import s from "./HowToChoose.module.css"
import {Modal} from "react-bootstrap";
import close from "@/static/icons/x-lg.svg";
import truck from "@/static/icons/truck.svg";
import refund from "@/static/icons/arrow-return-left.svg";
import Image from "next/image";
import map from "@/static/img/map.jpg";
import globe from '@/static/icons/globe.svg'
import LoyaltyFAQ from "@/components/pages/account/LoyaltyFAQ/LoyaltyFAQ";
import Link from "next/link";
import {Context} from "@/context/AppWrapper";

const HowToChoose = () => {
    const [show, setShow] = useState(false);
    const {desktopStore} = useContext(Context)

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };
    return (
        <>
            <button
                className={s.toggle_btn}
                onClick={handleShow}
            >
                Как выбрать срок доставки и цену?
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
                    <div className={s.text_block}>
                        <div>
                            <Image src={globe} alt='' width={70}/>
                        </div>
                        <h4 className={'my-3'}>Как выбрать срок доставки и цену?</h4>
                        <p className={s.bold_text} style={{fontSize: 16, fontStyle: 'italic'}}>
                            Обратите внимание, на кнопке указан срок доставки до нашего склада в Москве. Доставка со
                            склада занимает от 1 дня в зависимости от вашего местоположения и рассчитывается на этапе оформления заказа.

                        </p>
                        <p className={s.text}>
                            Мы стараемся предоставить вам как можно больший ассортимент на всевозможных условиях,
                            поэтому собираем предложения от разных продавцов, варирующихся по срокам доставки и цене.
                        </p>
                        <div className={s.img_cont}>
                            <Image src={map} alt='' className={s.img} fill={true}/>
                        </div>
                        <p className={s.bold_text}>
                            Мы уже работаем с
                        </p>
                        <div className={s.block}>
                            <div className={s.square}>
                                <div className={s.circe}>
                                    <div className={s.circe_text}>10+</div>
                                </div>
                                <div className={s.gard_text}>
                                    Странами
                                </div>
                            </div>
                            <div className={s.square}>
                                <div className={s.circe}>
                                    <div className={s.circe_text}>50+</div>
                                </div>
                                <div className={s.gard_text}>
                                    Бутиками
                                </div>
                            </div>
                            <div className={s.square}>
                                <div className={s.circe}>
                                    <div className={s.circe_text}>500+</div>
                                </div>
                                <div className={s.gard_text}>
                                    Продавцами
                                </div>
                            </div>
                        </div>
                        <p className={s.bold_text}>
                            и собираем
                        </p>
                        <div className={s.big_square}>
                            <div className={s.big_circe}>
                                <div className={s.circe_text}>30 млн.+</div>
                            </div>
                            <div className={s.gard_text}>
                                Предложений со всего мира
                            </div>
                        </div>
                        <p className={s.bold_text}>
                            Поэтому один и тот же лот мы способны привезти вам за разное время и как следствие по разной
                            цене. Мы предлагаем как наиболее быстрые варианты, так и наиболее выгодные!

                        </p>
                        <p className={s.bold_text}>
                            С развитием платформы SELLOUT наш собственный склад постоянно пополняется, поэтому мы можем
                            предоставлять самые выгодные условия с мгновенной доставкой на все большее количество
                            товаров.

                        </p>

                        <div className={s.faq_block}>
                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                            <LoyaltyFAQ title={'Почему более быстрый вариант доставки стоит меньше?'}>
                                Обычно чем меньше срок доставки, тем и дороже предложение, ведь это говорит об
                                использовании
                                экспресс доставки и индивидуальном подходе, однако может сложиться так, что при меньшем
                                сроке доставки
                                цена будет ниже, например, если продавец из России хочет поскорее продать свой товар.
                                Такое бывает, и это означает, что вам определенно повезло!

                            </LoyaltyFAQ>
                            <LoyaltyFAQ title={'Почему разные размеры сильно отличаются в цене?'}>
                                Многие представленные лоты на нашей платформе являются лимитированными и коллекционными,
                                то
                                есть выпускаются в ограниченном количестве и раскупаются за считанные секунды. За счет
                                этого на
                                некоторые размеры образуется повышенный спрос и они могут стоить в несколько раз дороже
                                других. В
                                таких ситуациях советуем вам рассмотреть
                                ту же модель в соседних размерах, порой они стоят сильно дешевле!

                            </LoyaltyFAQ>
                            <LoyaltyFAQ title={'Включены ли таможенные пошлины и налоги в стоимость заказа?'}>
                                Да, цена окончательная, никаких дополнительных платежей не потребуется!

                            </LoyaltyFAQ>
                        </div>
                        <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}
                                                                                   className={'text-black'}
                                                                                   target={'_blank'}>FAQ</Link></h5>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default HowToChoose;