import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import s from './NavbarC.module.css'
import like from '@/static/icons/heart.svg'
import person from '@/static/icons/person-circle.svg'
import cart from '@/static/icons/bag.svg'
import truck from '@/static/icons/truck.svg'
import Megamenu from "../UI/Megamenu/Megamenu";
import Sidebar from "../Sidebar/Sidebar";
import SearchModal from "../SearchModal/SearchModal";
import AuthModal from "..//AuthModal/AuthModal";
import Image from "next/image";
import logo from '@/static/img/sellout_logo.svg'
import {useRouter} from "next/router";
import ElasticSearchModal from "@/components/shared/ElasticSearchModal/ElasticSearchModal";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import picture from "@/static/img/shoe2.png";

const NavbarC = () => {
    const {userStore} = useContext(Context)
    const router = useRouter()
    const goToMainPage = () => {
        router.push('/')
    }
    const goToWishlist = () => {
        router.push('/wishlist')
    }
    const goToFastShip = () => {
        const query = {}
        query.is_fast_ship = 'is_fast_ship'
        router.push(
            {
                pathname: '/products',
                query: query
            }
        )
    }
    const goToSale = () => {
        const query = {}
        query.is_sale = 'is_sale'
        router.push(
            {
                pathname: '/products',
                query: query
            }
        )
    }
    const goToAccount = () => {
        router.push('/account')
    }
    const goToCart = () => {
        router.push('/cart')
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
                        <Image className={s.logo} alt='' src={logo} height={isDesktop ? 40 : 25} onClick={goToMainPage}/>
                    </div>
                    <div className={s.block}>
                        <Image width={25} src={like} alt="" className={s.icons} onClick={goToWishlist}/>
                        {isDesktop &&
                        userStore.isLogged
                            ?
                            <div onClick={goToAccount} className={s.auth_block}>
                                <Image width={25} src={person} alt="" className={s.icons}/>
                                <div className={s.name}>{userStore.firstName}</div>
                            </div>
                            :
                            isDesktop &&
                            <AuthModal>
                                <Image width={25} src={person} alt="" className={s.icons}/>
                                <div className={s.name}>Войдите</div>
                            </AuthModal>
                        }
                        <Image width={25} src={cart} alt="" className={s.icons} onClick={goToCart}/>
                    </div>
                </div>
                {isDesktop &&
                    <div className={s.row1}>
                        <div className={s.block1}>
                            <p href="" className={s.links}>Новинки</p>
                            <p href="" className={s.links}>Рекомендации</p>
                            <Megamenu className={s.links} label={'Бренды'}>
                                <Row>
                                    <Col lg={3}>
                                        <h4 className={s.h_text}>Популярные</h4>
                                        <div
                                            onClick={() => router.push('/products?line=все_adidas')}
                                            className={s.megamenu_links}
                                        >
                                            adidas</div>
                                        <div
                                            onClick={() => router.push('/products?line=converse')}
                                            className={s.megamenu_links}
                                        >
                                            Converse</div>
                                        <div
                                            onClick={() => router.push('/products?line=fear_of_god')}
                                            className={s.megamenu_links}
                                        >
                                            Fear of God</div>
                                        <div
                                            onClick={() => router.push('/products?line=все_jordan')}
                                            className={s.megamenu_links}
                                        >
                                            Jordan</div>
                                        <div
                                            onClick={() => router.push('/products?line=все_new_balance')}
                                            className={s.megamenu_links}
                                        >
                                            New Balance</div>
                                        <div
                                            onClick={() => router.push('/products?line=все_nike')}
                                            className={s.megamenu_links}
                                        >
                                            Nike</div>
                                        <div
                                            onClick={() => router.push('/products?line=off-white')}
                                            className={s.megamenu_links}
                                        >
                                            Off-White</div>
                                        <div
                                            onClick={() => router.push('/products?line=puma')}
                                            className={s.megamenu_links}
                                        >
                                            Puma</div>
                                    </Col>
                                    <Col lg={3}>
                                        <div
                                            onClick={() => router.push('/products?line=supreme')}
                                            className={s.megamenu_links}
                                        >
                                            Supreme</div>
                                        <div
                                            onClick={() => router.push('/products?line=the_north_face')}
                                            className={s.megamenu_links}
                                        >
                                            The North Face</div>
                                        <div
                                            onClick={() => router.push('/products?line=vans')}
                                            className={s.megamenu_links}
                                        >
                                            Vans</div>
                                        <div
                                            onClick={() => router.push('/products?line=travis_scott')}
                                            className={s.megamenu_links}
                                        >
                                            Travis Scott</div>
                                    </Col>
                                    <Col lg={3}>
                                        <h4 className={s.h_text}>Коллаборации</h4>
                                        <div
                                            onClick={() => router.push('/products?collab=adidas_yeezy')}
                                            className={s.megamenu_links}
                                        >
                                            adidas Yeezy</div>
                                        <div
                                            onClick={() => router.push('/products?collab=Off-White')}
                                            className={s.megamenu_links}
                                        >
                                            Nike x Off-White</div>
                                        <div
                                            onClick={() => router.push('/products?collab=adidas_yeezy')}
                                            className={s.megamenu_links}
                                        >
                                            adidas Yeezy</div>
                                        <div
                                            onClick={() => router.push('/products?collab=adidas_yeezy')}
                                            className={s.megamenu_links}
                                        >
                                            adidas Yeezy</div>
                                        <div
                                            onClick={() => router.push('/products?line=все_new_balance')}
                                            className={s.megamenu_links}
                                        >
                                            New Balance</div>
                                        <div
                                            onClick={() => router.push('/products?line=все_nike')}
                                            className={s.megamenu_links}
                                        >
                                            Nike</div>
                                        <div
                                            onClick={() => router.push('/products?line=off-white')}
                                            className={s.megamenu_links}
                                        >
                                            Off-White</div>
                                        <div
                                            onClick={() => router.push('/products?line=puma')}
                                            className={s.megamenu_links}
                                        >
                                            Puma</div>
                                    </Col>
                                    <Col lg={3} className={s.pic_block}>
                                        <Col lg={6}>
                                            <div className={s.img_col}>
                                                <Image src={picture} alt=""/>
                                                <a href="" onClick={()=> router.push('/brands')}>Посмотреть все...</a>
                                            </div>
                                        </Col>
                                    </Col>
                                </Row>
                            </Megamenu>
                            <Megamenu className={s.links} label={'Обувь'}>
                                <Row>
                                    <Col lg={3}>
                                        <h4 className={s.h_text}>Заголовок</h4>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                    </Col>
                                    <Col lg={3}>
                                        <h4 className={s.h_text}>Заголовок</h4>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                    </Col>
                                    <Col lg={6} className={s.pic_block}>
                                        <Col lg={6}>
                                            <div className={s.img_col}>
                                                <Image src={picture} alt=""/>
                                                <a href="">Посмотреть все...</a>
                                            </div>
                                        </Col>
                                    </Col>
                                </Row>
                            </Megamenu>
                            <Megamenu className={s.links} label={'Одежда'}>
                                <Row>
                                    <Col lg={3}>
                                        <h4 className={s.h_text}>Заголовок</h4>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                    </Col>
                                    <Col lg={3}>
                                        <h4 className={s.h_text}>Заголовок</h4>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                    </Col>
                                    <Col lg={6} className={s.pic_block}>
                                        <Col lg={6}>
                                            <div className={s.img_col}>
                                                <Image src={picture} alt=""/>
                                                <a href="">Посмотреть все...</a>
                                            </div>
                                        </Col>
                                    </Col>
                                </Row>
                            </Megamenu>
                            <Megamenu className={s.links} label={'Аксессуары'}>
                                <Row>
                                    <Col lg={3}>
                                        <h4 className={s.h_text}>Заголовок</h4>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                    </Col>
                                    <Col lg={3}>
                                        <h4 className={s.h_text}>Заголовок</h4>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                        <div>Что то</div>
                                    </Col>
                                    <Col lg={6} className={s.pic_block}>
                                        <Col lg={6}>
                                            <div className={s.img_col}>
                                                <Image src={picture} alt=""/>
                                                <a href="">Посмотреть все...</a>
                                            </div>
                                        </Col>
                                    </Col>
                                </Row>
                            </Megamenu>
                            <p href="" className={s.links}
                               onClick={goToFastShip}
                            >
                                Мгновенная доставка
                                <Image src={truck} alt="" className={s.truck}/>
                            </p>
                            <p href="" className={s.links} style={{color: '#b61212'}}
                               onClick={goToSale}
                            >Скидки</p>
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

export default observer(NavbarC);