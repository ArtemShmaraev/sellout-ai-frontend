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
import logo from '@/static/img/sellout_logo.svg'
import {useRouter} from "next/router";
import ElasticSearchModal from "@/components/shared/ElasticSearchModal/ElasticSearchModal";

const NavbarC = () => {
    const router = useRouter()
    const goToMainPage = () => {
        router.push('/')
    }
    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1200) {
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
                        <Image className={s.logo} alt='' src={logo} height={isDesktop ? 50 : 40} onClick={goToMainPage}/>
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
                            <ElasticSearchModal/>
                        </div>
                    </div>
                }
            </Container>
        </header>
    );
};

export default NavbarC;