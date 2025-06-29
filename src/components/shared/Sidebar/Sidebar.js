import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './Sidebar.module.css'
import list from '@/static/icons/list2.svg'
import close from '@/static/icons/x-lg.svg'
import person from '@/static/icons/person-circle.svg'
import arrow from '@/static/icons/chevron-right.svg'
import tg from "@/static/icons/tg.svg";
import AuthModal from "../AuthModal/AuthModal";
import Image from "next/image";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import logo from "@/static/img/sellout_logo.svg";
import headerJson from "@/components/shared/NavbarC/header.json";
import Brand from './Sections/Brand'
import Clothes from "@/components/shared/Sidebar/Sections/Clothes";
import Shoes from "@/components/shared/Sidebar/Sections/Shoes";
import Accessories from "@/components/shared/Sidebar/Sections/Аccessories";
import Link from "next/link";
import vk from "@/static/icons/vk.svg";
import ContactModal from "@/components/shared/ContactModal/ContactModal";
import TextModal from "@/components/shared/UI/TextModal/TextModal";
import how from "@/static/icons/question-circle.svg";
import warranty from "@/static/icons/warranty.svg";
import payment from "@/static/icons/payment.svg";
import ret from "@/static/icons/return.svg";
import refund from "@/static/icons/arrow-return-left.svg";
import Adidas from "@/components/shared/Sidebar/Sections/Adidas";
import {fetchFilter} from "@/http/productsApi";
import NewBalance from "@/components/shared/Sidebar/Sections/NewBalance";
import Nike from "@/components/shared/Sidebar/Sections/Nike";
import Jordan from "@/components/shared/Sidebar/Sections/Jordan";
import Bags from "@/components/shared/Sidebar/Sections/Bags";

const Sidebar = ({photos}) => {
    const header = headerJson
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSectionOpen, setIsSectionOpen] = useState(false)
    const {userStore} = useContext(Context)
    const router = useRouter()
    const [currSection, setCurrSection] = useState()
    // const sections = {
    //     'Бренды': {},
    //     'Обувь': {},
    //     'Одежда': {},
    //     'Аксессуары': {},
    // }
    // useEffect(() => {
    //     sections["Бренды"]['Популярные бренды'] = header["Популярные бренды"]
    //     sections["Бренды"]['Коллаборации'] = header["Коллаборации"]
    //     sections["Обувь"]['Популярные линейки обуви'] = header["Популярные линейки обуви"]
    //     sections["Обувь"]['Популярные категории обуви'] = header["Популярные категории обуви"]
    //     sections["Обувь"]['Популярные бренды обуви'] = header["Популярные бренды обуви"]
    //     sections["Одежда"]['Популярные бренды одежды'] = header["Популярные бренды одежды"]
    //     sections["Одежда"]['Популярные бренды одежды'] = header["Популярные бренды одежды"]
    //     sections["Аксессуары"]['Популярные бренды аксессуаров'] = header["Популярные бренды аксессуаров"]
    // }, [])
    // const renderSection = () => {
    //     let gender = 'any'
    //     let genderQuery = ''
    //     if (userStore.isLogged) {
    //         gender = userStore.gender
    //         genderQuery = 'gender=' + gender[0].toUpperCase()
    //     }
    //     let res = []
    //     const obj = sections[currSection]
    //     for (const key in obj) {
    //         const name = obj[key].name
    //         const linksArr = obj[key][gender]
    //         const arr = []
    //         arr.push(
    //             <h4>{name}</h4>
    //         )
    //         linksArr.forEach(el => {
    //             arr.push(
    //                 <a href={}
    //             )
    //         })
    //
    //     }
    // }
    const sidebarRef = useRef(null)
    const sectionRef = useRef(null)
    const handleClose = () => {
        setIsMenuOpen(false)
        setIsSectionOpen(false)
        document.body.classList.remove('body-scroll-clip')
    }
    const [filters, setFilters] = useState(null)
    useEffect(() => {
        fetchFilter('tree_line').then(res => setFilters(res))
    }, [])
    const sections = {
        brands: <Brand photo={photos.brand} handleClose={handleClose}/>,
        clothes: <Clothes photo={photos.clothes} handleClose={handleClose}/>,
        shoes: <Shoes photo={photos.shoes} handleClose={handleClose}/>,
        accessories: <Accessories photo={photos.accessories} handleClose={handleClose}/>,
        bags: <Bags photo={photos.bags} handleClose={handleClose}/>,
        adidas: <Adidas filters={filters} handleClose={handleClose}/>,
        newBalance: <NewBalance filters={filters} handleClose={handleClose}/>,
        nike: <Nike filters={filters} handleClose={handleClose}/>,
        jordan: <Jordan filters={filters} handleClose={handleClose}/>,
    }

    const queryGender = userStore.gender ? {gender: userStore.gender[0].toUpperCase()} : {}

    const [contactOpen, setContactOpen] = useState(false)
    const toggleContact = () => {
        setContactOpen(!contactOpen)
    }
    const closeContact = () => {
        setContactOpen(false)
    }
    useEffect(() => {
        return () => {
            document.body.classList.remove('body-scroll-clip')
        }
    }, [])
    return (
        <>
            <button className={s.toggle_btn}
                    onClick={() => {
                        if (!isMenuOpen) {
                            document.body.classList.add('body-scroll-clip')
                        } else {
                            document.body.classList.remove('body-scroll-clip')
                        }
                        setIsMenuOpen(!isMenuOpen)
                    }}
            >
                <Image width={22} src={list} alt="" className={s.list_icon}/>
            </button>
            {isMenuOpen &&
                <div className={s.sidebar} ref={sidebarRef}>
                    <div className={s.header_block}>
                        <div className={s.sidebar_header}>
                            <Link href={'/'} onClick={handleClose}>
                                <Image alt='' src={logo} height={25}/>
                            </Link>
                            <Image src={close} alt="" onClick={handleClose}/>
                        </div>
                        {
                            userStore.isLogged
                                ?
                                <Link href={'/account'} className={s.auth_block}
                                      onClick={handleClose}
                                >
                                    <div className={s.person_block}>
                                        <Image width={25} src={person} alt="" className={s.person_icon}/>
                                        <div className={'text-black'}>{userStore.firstName}</div>
                                    </div>
                                    <div>
                                        <Image src={arrow} alt=""/>
                                    </div>
                                </Link>
                                :
                                <AuthModal>
                                    <div className={s.auth_block}>
                                        <div className={s.person_block}>
                                            <Image width={25} src={person} alt="" className={s.person_icon}/>
                                            <div className={'text-black'}>Войдите</div>
                                        </div>
                                        <div>
                                            <Image src={arrow} alt=""/>
                                        </div>
                                    </div>
                                </AuthModal>

                        }
                        <hr/>
                    </div>
                    {
                        !isSectionOpen
                        ?
                            <div>
                                <Link className={s.section_block}
                                      href={{
                                          pathname: '/products',
                                          query: {...queryGender}
                                      }}
                                      onClick={handleClose}
                                >
                                    <div>Все товары</div>
                                    <Image src={arrow} alt=""/>
                                </Link>
                                <Link className={s.section_block}
                                      href={{
                                          pathname: '/products',
                                          query: {new: true, ...queryGender}
                                      }}
                                      onClick={handleClose}
                                >
                                    <div>Новинки</div>
                                    <Image src={arrow} alt=""/>
                                </Link>
                                <Link className={s.section_block}
                                      href={{
                                          pathname: '/products',
                                          query: {recommendations: true, ...queryGender}
                                      }}
                                      onClick={handleClose}
                                >
                                    <div>Рекомендации</div>
                                    <Image src={arrow} alt=""/>
                                </Link>
                                <div className={s.section_block}
                                     onClick={() => {
                                         setIsSectionOpen(true)
                                         setCurrSection(sections.brands)
                                         sidebarRef.current.scrollTo(0, 0)
                                     }}
                                >
                                    <div>Бренды</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                     onClick={() => {
                                         setIsSectionOpen(true)
                                         setCurrSection(sections.shoes)
                                         sidebarRef.current.scrollTo(0, 0)
                                     }}
                                >
                                    <div>Обувь</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                     onClick={() => {
                                         setIsSectionOpen(true)
                                         setCurrSection(sections.clothes)
                                         sidebarRef.current.scrollTo(0, 0)
                                     }}
                                >
                                    <div>Одежда</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                     onClick={() => {
                                         setIsSectionOpen(true)
                                         setCurrSection(sections.bags)
                                         sidebarRef.current.scrollTo(0, 0)
                                     }}
                                >
                                    <div>Сумки</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                     onClick={() => {
                                         setIsSectionOpen(true)
                                         setCurrSection(sections.accessories)
                                         sidebarRef.current.scrollTo(0, 0)
                                     }}
                                >
                                    <div>Аксессуары</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                     onClick={() => {
                                         setIsSectionOpen(true)
                                         setCurrSection(sections.adidas)
                                         sidebarRef.current.scrollTo(0, 0)
                                     }}
                                >
                                    <div>adidas</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                     onClick={() => {
                                         setIsSectionOpen(true)
                                         setCurrSection(sections.jordan)
                                         sidebarRef.current.scrollTo(0, 0)
                                     }}
                                >
                                    <div>Jordan</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                     onClick={() => {
                                         setIsSectionOpen(true)
                                         setCurrSection(sections.newBalance)
                                         sidebarRef.current.scrollTo(0, 0)
                                     }}
                                >
                                    <div>New Balance</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                     onClick={() => {
                                         setIsSectionOpen(true)
                                         setCurrSection(sections.nike)
                                         sidebarRef.current.scrollTo(0, 0)
                                     }}
                                >
                                    <div>Nike</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                {/*<div className={s.section_block} onClick={goToFastShip}*/}
                                {/*>*/}
                                {/*    <div>*/}
                                {/*        Мгновенная доставка*/}
                                {/*        <Image src={truck} alt="" className={s.truck}/>*/}
                                {/*    </div>*/}
                                {/*    <Image src={arrow} alt=""/>*/}
                                {/*</div>*/}
                                {/*<div className={s.section_block} onClick={goToSale}*/}
                                {/*>*/}
                                {/*    <div className={s.sale}>Скидки</div>*/}
                                {/*    <Image src={arrow} alt=""/>*/}
                                {/*</div>*/}
                            </div>
                            :
                            <div className={s.section_container} ref={sectionRef}>
                                <div className={s.back_cont}>
                                    <button
                                        className={s.back_btn}
                                        onClick={() => {
                                            sidebarRef.current.scrollTo(0, 0)
                                            setIsSectionOpen(false)
                                        }}
                                    >
                                        <Image src={arrow} alt="" className={s.back_icon}/>
                                        <div>
                                            Назад
                                        </div>
                                    </button>
                                </div>
                                <div style={{marginTop: 30, position: "relative"}}>
                                    {
                                        currSection
                                    }
                                </div>
                            </div>
                    }
                    <div className={s.sidebar_footer}>
                        <div className={s.col}>
                            <Link href="" className={s.sidebar_links} onClick={handleClose} target={'_blank'}>О нас</Link>
                            <Link href="" className={s.sidebar_links} onClick={handleClose} target={'_blank'}>Блог</Link>
                            <span className={s.sidebar_links}
                                  onClick={toggleContact}
                            >Контакты</span>
                        </div>
                        <div className={s.col}>
                            <div className={s.social_media}>
                                <h4 className={'text-white'}>Мы в социальных сетях:</h4>
                                <div className={s.icons_block}>
                                    <a href={''}>
                                        <Image src={tg} width={30} alt="" className={s.icon}/>
                                    </a>
                                    <a href={''}>
                                        <Image src={vk} width={38} alt="" className={s.icon}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className={s.col}>
                            <h4 className='text-white'>Помощь</h4>
                            <TextModal title={'Как мы работаем?'} img={how} titleClassname={s.footer_link}>
                                <p>SELLOUT - инновационная онлайн-платформа, предлагающая широчайший ассортимент
                                    брендовой одежды и обуви, аксессуаров и прочих товаров. У нас Вы сможете найти как лимитированные и
                                    труднодоступные модели и коллекции, так и отобранные нашими стилистами товары со всего мира.
                                    Мы сотрудничаем только с проверенными бутиками, магазинами и продавцами,
                                    а также сами проводим проверку на оригинальность. Только после этого мы доставляем Ваш заказ. </p>
                                <p>
                                    Подробнее Вы можете прочитать в разделе <Link href="/faq" className={s.link} onClick={handleClose} target={'_blank'}>О нас</Link>
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
                                    Подробнее про правила оплаты читайте <Link href="/faq" className={s.link} onClick={handleClose} target={'_blank'}>тут</Link>
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
                                    Подробнее про правила возврата читайте <Link href="/faq" className={s.link} onClick={handleClose} target={'_blank'}>тут</Link>
                                </p>
                            </TextModal>
                        </div>
                        <div className={s.col}>
                            <h4 className='text-white'>Остались вопросы?</h4>
                            <Link href={'/faq'} className={s.sidebar_links} onClick={handleClose} target={'_blank'}>Ответы на большинство из них: FAQ</Link>
                            <p className={s.sidebar_text}>Или напишите нам</p>
                            <a href={'mailto:customerservice@sellout.su'}
                               className={s.footer_link}>Почта: customerservice@sellout.su</a>
                            <a href={'https://wa.me/message/L2OINP6KNMNLA1'}
                               target={'_blank'}
                               className={s.footer_link}>WhatsApp: +7 993 896-92-27</a>
                            <a href={'https://t.me/sellout_official'}
                               target={'_blank'}
                               className={s.footer_link}>Telegram: @sellout_official</a>
                        </div>
                    </div>
                </div>
            }
            <ContactModal isOpen={contactOpen} handleClose={closeContact}/>
        </>
    );
};

export default observer(Sidebar);