import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import s from './NavbarC.module.css'
import like from '@/static/icons/heart.svg'
import person from '@/static/icons/person-circle.svg'
import cart from '@/static/icons/bag.svg'
import truck from '@/static/icons/truck.svg'
import SearchInput from "../UI/SearchInput/SearchInput";
import Megamenu from "../UI/Megamenu/Megamenu";
import Sidebar from "../Sidebar/Sidebar";
import SearchModal from "../SearchModal/SearchModal";
import AuthModal from "..//AuthModal/AuthModal";
import Image from "next/image";

const NavbarC = () => {
    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1000) {
            setIsDesktop(false)
        }
    }, [isDesktop])
    return (
        <header className={s.header}>
            <Container>
                <div className={s.row1}>
                    <div className={s.block1}>
                        {isDesktop
                            ?
                            <>
                                <p href="" className={s.links}>О нас</p>
                                <p href="" className={s.links}>Блог</p>
                                <p href="" className={s.links}>Связаться с нами</p>
                            </>
                            :
                            <>
                                <Sidebar/>
                                <SearchModal/>
                            </>
                        }
                    </div>
                    <div className={s.block}>
                        <h1 className={s.logo}>SELLOUT</h1>
                    </div>
                    <div className={s.block}>
                        <Image width={25} src={like} alt="" className={s.icons}/>
                        {isDesktop &&
                            <AuthModal>
                                <Image width={25} src={person} alt="" className={s.icons}/>
                                <div className={s.name}>Денис</div>
                            </AuthModal>
                        }
                        <Image width={25} src={cart} alt="" className={s.icons}/>
                    </div>
                </div>
                {isDesktop &&
                    <div className={s.row1}>
                        <div className={s.block1}>
                            <p href="" className={s.links}>Новинки</p>
                            <p href="" className={s.links}>Рекомендации</p>
                            <Megamenu className={s.links}>Бренды</Megamenu>
                            <Megamenu className={s.links}>Обувь</Megamenu>
                            <Megamenu className={s.links}>Одежда</Megamenu>
                            <Megamenu className={s.links}>Аксессуары</Megamenu>
                            <p href="" className={s.links}>
                                Мгновенная доставка
                                <Image src={truck} alt="" className={s.truck}/>
                            </p>
                            <p href="" className={s.links} style={{color: '#b61212'}}>Скидки</p>
                        </div>
                        <div>
                            <SearchInput/>
                        </div>
                    </div>
                }
            </Container>
        </header>
    );
};

export default NavbarC;