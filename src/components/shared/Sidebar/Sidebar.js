import React, {useContext, useState} from 'react';
import s from './Sidebar.module.css'
import list from '@/static/icons/list2.svg'
import close from '@/static/icons/x-lg.svg'
import person from '@/static/icons/person-circle.svg'
import arrow from '@/static/icons/chevron-right.svg'
import tg from "@/static/icons/telegram.png";
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

const Sidebar = () => {
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
    const sections = {
        brands: <Brand/>,
        clothes: <Clothes/>,
        shoes: <Shoes/>,
        accessories: <Accessories/>
    }
    const handleClose = () => {
        setIsMenuOpen(false)
        setIsSectionOpen(false)
    }

    const queryGender = userStore.gender ? 'gender=' + userStore.gender[0].toUpperCase() : ''
    return (
        <>
            <button className={s.toggle_btn}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <Image width={22} src={list} alt="" className={s.list_icon}/>
            </button>
            {isMenuOpen &&
                <div className={s.sidebar}>
                    <div className={s.sidebar_header}>
                        <Link href={'/'}>
                            <Image alt='' src={logo} height={25}/>
                        </Link>
                        <Image src={close} alt="" onClick={handleClose}/>
                    </div>
                    {
                        userStore.isLogged
                        ?
                            <Link href={'/account'} className={s.auth_block}>
                                <div className={s.person_block}>
                                    <Image width={25} src={person} alt="" className={s.person_icon}/>
                                    <div>{userStore.firstName}</div>
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
                                        <div>Войдите</div>
                                    </div>
                                    <div>
                                        <Image src={arrow} alt=""/>
                                    </div>
                                </div>
                            </AuthModal>

                    }
                    <hr/>
                    {
                        !isSectionOpen
                        ?
                            <div>
                                <a className={s.section_block}
                                   href={`/products?new=true&${queryGender}`}
                                >
                                    <div>Новинки</div>
                                    <Image src={arrow} alt=""/>
                                </a>
                                <a className={s.section_block}
                                   href={`/products?recommendations=true&${queryGender}`}
                                >
                                    <div>Рекомендации</div>
                                    <Image src={arrow} alt=""/>
                                </a>
                                <div className={s.section_block}
                                     onClick={() => {
                                         setIsSectionOpen(true)
                                         setCurrSection(sections.brands)
                                     }}
                                >
                                    <div>Бренды</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                     onClick={() => {
                                         setIsSectionOpen(true)
                                         setCurrSection(sections.shoes)
                                     }}
                                >
                                    <div>Обувь</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                     onClick={() => {
                                         setIsSectionOpen(true)
                                         setCurrSection(sections.clothes)
                                     }}
                                >
                                    <div>Одежда</div>
                                    <Image src={arrow} alt=""/>
                                </div>
                                <div className={s.section_block}
                                     onClick={() => {
                                         setIsSectionOpen(true)
                                         setCurrSection(sections.accessories)
                                     }}
                                >
                                    <div>Аксессуары</div>
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
                                <a className={s.section_block}
                                   href={`/products?${queryGender}`}
                                >
                                    <div>Все товары</div>
                                    <Image src={arrow} alt=""/>
                                </a>
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
                                {
                                    currSection
                                }
                            </div>
                    }
                    <div className={s.sidebar_footer}>
                        <div className={s.col}>
                            <Link href="" className={s.sidebar_links}>О нас</Link>
                            <Link href="" className={s.sidebar_links}>Блог</Link>
                            <Link href="" className={s.sidebar_links}>Контакты</Link>
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
                            <Link href="" className={s.sidebar_links}>Как мы работаем?</Link>
                            <Link href="" className={s.sidebar_links}>Гарантии</Link>
                            <Link href="" className={s.sidebar_links}>Оплата</Link>
                            <Link href="" className={s.sidebar_links}>Возврат</Link>
                        </div>
                        <div className={s.col}>
                            <h4 className='text-white'>Остались вопросы?</h4>
                            <Link href={'/faq'} className={s.sidebar_links}>FAQ</Link>
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

export default observer(Sidebar);