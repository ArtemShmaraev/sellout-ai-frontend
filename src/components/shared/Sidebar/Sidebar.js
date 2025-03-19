import React, {useState} from 'react';
import s from './Sidebar.module.css'
import list from '@/static/icons/list.svg'
import close from '@/static/icons/x-lg.svg'
import person from '@/static/icons/person-circle.svg'
import arrow from '@/static/icons/chevron-right.svg'
import truck from '@/static/icons/truck.svg'
import tg from "@/static/icons/telegram.png";
import AuthModal from "../AuthModal/AuthModal";
import Image from "next/image";

const Sidebar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSectionOpen, setIsSectionOpen] = useState(false)
    const handleClose = () => {
        setIsMenuOpen(false)
        setIsSectionOpen(false)
    }
    return (
        <>
            <button className={s.toggle_btn}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <Image width={30} src={list} alt="" className={s.list_icon}/>
            </button>
            {isMenuOpen &&
                <div className={s.sidebar}>
                    <div className={s.sidebar_header}>
                        <h2>SELLOUT</h2>
                        <Image src={close} alt="" onClick={handleClose}/>
                    </div>
                    <AuthModal>
                        <div className={s.auth_block}>
                            <div className={s.person_block}>
                                <Image width={25} src={person} alt="" className={s.person_icon}/>
                                <div>Denis</div>
                            </div>
                            <div>
                                <Image src={arrow} alt=""/>
                            </div>
                        </div>
                    </AuthModal>
                    <hr/>
                    {
                        !isSectionOpen
                        ?
                            <div>
                                <div className={s.section_block}
                                >
                                    <div>Новинки</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                >
                                    <div>Рекомендации</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                     onClick={() => setIsSectionOpen(true)}
                                >
                                    <div>Бренды</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                     onClick={() => setIsSectionOpen(true)}
                                >
                                    <div>Обувь</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                     onClick={() => setIsSectionOpen(true)}
                                >
                                    <div>Одежда</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                     onClick={() => setIsSectionOpen(true)}
                                >
                                    <div>Аксессуары</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                >
                                    <div>
                                        Мгновенная доставка
                                        <Image src={truck} alt="" className={s.truck}/>
                                    </div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                >
                                    <div className={s.sale}>Скидки</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                            </div>
                            :
                            <div className={s.section_container}>
                                <div>
                                    <button
                                        className={s.back_btn}
                                        onClick={() => setIsSectionOpen(false)}
                                    >
                                        <Image src={arrow} alt="" className={s.back_icon}/>
                                        <div>
                                            Назад
                                        </div>
                                    </button>
                                </div>
                                <div>
                                    <div className={s.col}>
                                        <h4>Заголовок</h4>
                                        <p>Что то</p>
                                        <p>Что то</p>
                                        <p>Что то</p>
                                        <p>Что то</p>
                                    </div>
                                    <div className={s.col}>
                                        <h4>Заголовок</h4>
                                        <p>Что то</p>
                                        <p>Что то</p>
                                        <p>Что то</p>
                                        <p>Что то</p>
                                    </div>
                                </div>
                            </div>
                    }
                    <div className={s.sidebar_footer}>
                        <div className={s.col}>
                            <a href="" className={s.sidebar_links}>О нас</a>
                            <a href="" className={s.sidebar_links}>Блог</a>
                            <a href="" className={s.sidebar_links}>Контакты</a>
                        </div>
                        <div className={s.col}>
                            <h4 className='text-white'>Мы в социальных сетях:</h4>
                            <div className={s.icons_block}>
                                <Image src={tg} width={30} alt="" className={s.icon}/>
                                <Image src={tg} width={30} alt="" className={s.icon}/>
                                <Image src={tg} width={30} alt="" className={s.icon}/>
                            </div>
                        </div>
                        <div className={s.col}>
                            <h4 className='text-white'>Помощь</h4>
                            <a href="" className={s.sidebar_links}>Как мы работаем?</a>
                            <a href="" className={s.sidebar_links}>Гарантии</a>
                            <a href="" className={s.sidebar_links}>Оплата</a>
                            <a href="" className={s.sidebar_links}>Возврат</a>
                        </div>
                        <div className={s.col}>
                            <h4 className='text-white'>Остались вопросы?</h4>
                            <a href="" className={s.sidebar_links}>FAQ</a>
                            <p className={s.sidebar_text}>Или свяжитесь с нами</p>
                            <p className={s.sidebar_text}>Почта: support@sellout.su</p>
                            <p className={s.sidebar_text}>Телефон: +7(916)114-92-27</p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Sidebar;