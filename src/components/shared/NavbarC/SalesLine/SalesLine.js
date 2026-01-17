import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './SalesLine.module.css'
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css'
import Link from "next/link";
import {Context} from "@/context/AppWrapper";
import AuthModal from "@/components/shared/AuthModal/AuthModal";

const SalesLine = () => {
    const {userStore} = useContext(Context)
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
    return (
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
                    <SplideSlide className={s.splide}>
                        1000₽ в подарок за первый заказ
                    </SplideSlide>
                    {
                        isDesktop
                            ?
                            <SplideSlide className={s.splide}>
                                Зовите друзей на Sellout и зарабатывайте до 7000₽ за
                                каждого приведённого
                                клиента. { userStore.isLogged ?
                                <Link href={'/account/referral'} className={s.link} target={'_blank'}>Подробнее</Link>
                                :
                                <AuthModal inline={true}
                                           text={'Войдите или зарегистрируйтесь, чтобы стать участником реферальной программы и получать до 7000₽ за каждого приведённого клиента'}
                                >
                                    <span className={s.link}>Подробнее</span>
                                </AuthModal>
                            }
                            </SplideSlide>
                            :
                            <SplideSlide className={s.splide} style={{fontSize: '12px', paddingTop: '2px'}}>
                                Получайте до 7000₽ за приведённого
                                клиента. { userStore.isLogged ?
                                <Link href={'/account/referral'} className={s.link} target={'_blank'}>Подробнее</Link>
                                :
                                <AuthModal inline={true} salesLine={true}>
                                    <span className={s.link}>Подробнее</span>
                                </AuthModal>
                            }
                            </SplideSlide>
                    }
                    {
                        isDesktop
                            ?
                            <SplideSlide className={s.splide}>
                                Воспользуйтесь бесплатной доставкой по Москве! В другие города бесплатная доставка от 35000₽
                            </SplideSlide>
                            :
                            <SplideSlide className={s.splide} style={{fontSize: '9px', paddingTop: '4px'}}>
                                Бесплатная доставка по Москве! В другие города бесплатная доставка от 35000₽
                            </SplideSlide>
                    }
                </Splide>
            </div>
        </div>
    );
};

export default SalesLine;