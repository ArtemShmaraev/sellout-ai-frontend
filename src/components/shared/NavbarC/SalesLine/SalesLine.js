import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './SalesLine.module.css'
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css'
import Link from "next/link";
import {Context} from "@/context/AppWrapper";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import OfferBetterPriceModal from "@/components/shared/OfferBetterPriceModal/OfferBetterPriceModal";
import ModalSocialNets from "@/components/shared/ModalSocialNets/ModalSocialNets";
import Cookies from "js-cookie";
import ModalGifts from "@/components/shared/ModalGifts/ModalGifts";

const SalesLine = ({toggleSocials, toggleRef, toggleGifts}) => {
    const {userStore, desktopStore} = useContext(Context)
    const [isDesktop, setIsDesktop] = useState(false)
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

    const [offerOpen, setOfferOpen] = useState(false);

    const toggleOffer = () => {
        setOfferOpen(!offerOpen);
    };

    const closeOffer = () => {
        setOfferOpen(false);
    };

    const [receivedWelcomeGift, setReceivedWelcomeGift] = useState('')

    useEffect(() => {
        setReceivedWelcomeGift(Cookies.get('receivedWelcomeGift'))
    }, [])

    return (
        <>
            {
                desktopStore.isDesktop ? (
                    <>
                        <div className={s.line}>
                            <div className={'custom_cont d-flex justify-content-center'}>
                                <Splide options={{
                                    type: 'loop',
                                    pagination: false,
                                    arrows: false,
                                    drag: false,
                                    interval: 7000,
                                    autoplay: true
                                }} className={'d-flex align-items-center'}
                                >
                                    {/*<SplideSlide className={s.splide}>*/}
                                    {/*    Бесплатная доставка от 20000₽*/}
                                    {/*</SplideSlide>*/}
                                    {!receivedWelcomeGift &&
                                        <SplideSlide className={s.splide}>
                                            <div className={s.text}>До 5000₽ в подарок</div>
                                            <button className={s.button} onClick={toggleGifts}>Получить</button>
                                        </SplideSlide>
                                    }
                                    <SplideSlide className={s.splide}>
                                        <div className={s.text}>Гарантируем лучшую цену</div>
                                        <button className={s.button} onClick={toggleOffer}>Изучить</button>
                                    </SplideSlide>
                                    <SplideSlide className={s.splide}>
                                        <div className={s.text}>Приглашай друзей и получай до 7000₽</div>
                                        <button className={s.button} onClick={toggleRef}>Изучить</button>
                                    </SplideSlide>
                                    <SplideSlide className={s.splide}>
                                        <div className={s.text}>Все розыгрыши, скидки и новости</div>
                                        <button className={s.button} onClick={toggleSocials}>Изучить</button>
                                    </SplideSlide>
                                    {/*{*/}
                                    {/*    isDesktop*/}
                                    {/*        ?*/}
                                    {/*        <SplideSlide className={s.splide}>*/}
                                    {/*            Зовите друзей на Sellout и зарабатывайте до 7000₽ за*/}
                                    {/*            каждого приведённого*/}
                                    {/*            клиента. { userStore.isLogged ?*/}
                                    {/*            <Link href={'/account/referral'} className={s.link} target={'_blank'}>Подробнее</Link>*/}
                                    {/*            :*/}
                                    {/*            <AuthModal inline={true}*/}
                                    {/*                       text={'Войдите или зарегистрируйтесь, чтобы стать участником реферальной программы и получать до 7000₽ за каждого приведённого клиента'}*/}
                                    {/*            >*/}
                                    {/*                <span className={s.link}>Подробнее</span>*/}
                                    {/*            </AuthModal>*/}
                                    {/*        }*/}
                                    {/*        </SplideSlide>*/}
                                    {/*        :*/}
                                    {/*        <SplideSlide className={s.splide} style={{fontSize: '12px', paddingTop: '2px'}}>*/}
                                    {/*            Получайте до 7000₽ за приведённого*/}
                                    {/*            клиента. { userStore.isLogged ?*/}
                                    {/*            <Link href={'/account/referral'} className={s.link} target={'_blank'}>Подробнее</Link>*/}
                                    {/*            :*/}
                                    {/*            <AuthModal inline={true} salesLine={true} text={'Войдите или зарегистрируйтесь, чтобы стать участником реферальной программы и получать до 7000₽ за каждого приведённого клиента'}>*/}
                                    {/*                <span className={s.link}>Подробнее</span>*/}
                                    {/*            </AuthModal>*/}
                                    {/*        }*/}
                                    {/*        </SplideSlide>*/}
                                    {/*}*/}
                                    {/*{*/}
                                    {/*    isDesktop*/}
                                    {/*        ?*/}
                                    {/*        <SplideSlide className={s.splide}>*/}
                                    {/*            Воспользуйтесь бесплатной доставкой по Москве! В другие города бесплатная доставка от 35000₽*/}
                                    {/*        </SplideSlide>*/}
                                    {/*        :*/}
                                    {/*        <SplideSlide className={s.splide} style={{fontSize: '9px', paddingTop: '4px'}}>*/}
                                    {/*            Бесплатная доставка по Москве! В другие города бесплатная доставка от 35000₽*/}
                                    {/*        </SplideSlide>*/}
                                    {/*}*/}
                                </Splide>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={s.promoBar}>
                        <div className={s.scrollContainer}>
                            <div className={s.promoText}>
                                {!receivedWelcomeGift &&
                                    <>
                                        До 5000₽ в подарок
                                        <button className={s.buttonMob} onClick={toggleGifts}>Получить</button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </>
                                }
                                Гарантируем лучшую цену
                                <button className={s.buttonMob} onClick={toggleOffer}>Изучить</button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Приглашай
                                друзей и получай до 7000₽
                                <button className={s.buttonMob} onClick={toggleRef}>Изучить</button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Все
                                розыгрыши,
                                скидки и новости
                                <button className={s.buttonMob} onClick={toggleSocials}>Изучить</button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                            <div className={s.promoText2}>
                                {!receivedWelcomeGift &&
                                    <>
                                        До 5000₽ в подарок
                                        <button className={s.buttonMob} onClick={toggleGifts}>Получить</button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </>
                                }
                                Гарантируем лучшую цену
                                <button className={s.buttonMob} onClick={toggleOffer}>Изучить</button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Приглашай
                                друзей и получай до 7000₽
                                <button className={s.buttonMob} onClick={toggleRef}>Изучить</button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Все
                                розыгрыши,
                                скидки и новости
                                <button className={s.buttonMob} onClick={toggleSocials}>Изучить</button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                        </div>
                    </div>
                )
            }
            <OfferBetterPriceModal show={offerOpen} onHide={closeOffer}/>
        </>
    );
};

export default SalesLine;