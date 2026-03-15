import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './SizeChoice.module.css'
import truck from '@/static/icons/truck.svg'
import refund from '@/static/icons/arrow-return-left.svg'
import Image from "next/image";
import {Context} from "@/context/AppWrapper";
import {fetchShippings} from "@/http/productsApi";
import {userStore} from "@/store/UserStore";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import {Modal} from "react-bootstrap";
import {addToWaitingList} from "@/http/userApi";
import Cookies from "js-cookie";
import close from "@/static/icons/x-lg.svg";
import {useRouter} from "next/router";
import parseHtml from 'html-react-parser'
import {observer} from "mobx-react-lite";

const SizeChoice = ({prices, productId, config, manySizes, isDesktop}) => {
    const router = useRouter()
    const {productStore} = useContext(Context)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const selectItem = async (item) => {
        setSelectedItem(item);
        setIsOpen(false);
        productStore.setSizeChosen(item)
        const token = Cookies.get('access_token')
        productStore.setAnim(true)
        const ships = await fetchShippings(productId, item.size_for_api, token)
        productStore.setAnim(false)
        productStore.setShipps(ships)
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const [isShow, setIsShow] = useState(false)
    const handleClose = () => {
        setIsShow(false)
    }
    const handleOpen = () => {
        setIsShow(true)
    }
    const toWaitingList = (sizeArr) => {
        const token = Cookies.get('access_token')
        addToWaitingList(token, productId, sizeArr)
    }
    useEffect(() => {
        if (prices.length === 1) {
            productStore.setShipps([])
            productStore.setSizeChosen(prices[0])
            selectItem(prices[0])
        } else {
            setSelectedItem(null)
        }
    }, [router.asPath, prices])

    const addSpacesToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return (
        <div ref={dropdownRef} className={s.dropdown}>
            <div className={s.text}
                 onClick={toggleDropdown}
                 style={{
                     borderRadius: isOpen ? '7px 7px 0 0' : '7px',
                     fontSize: isDesktop ? '12pt' : '11pt',
                 }}>
                {
                    productStore.sizeChosen
                    ?
                        <>
                            <div className={s.size_block}>
                                <div className={s.icons}>{parseHtml(productStore.sizeChosen.view_size)}</div>
                                {productStore.sizeChosen.is_fast_shipping && <Image src={truck} alt="" className={s.icons}/>}
                                {productStore.sizeChosen.is_return && <Image src={refund} alt="" className={s.icons}/>}
                            </div>
                            {/*{*/}
                            {/*    (productStore.sizeChosen.min_price_without_sale > productStore.sizeChosen.min_price)*/}
                            {/*        ?*/}
                            {/*        <div className={s.price}>*/}
                            {/*            <span className={s.crossed}>От {addSpacesToNumber(productStore.sizeChosen.min_price_without_sale)} ₽</span>*/}
                            {/*            <span className={s.sale_price}>От {addSpacesToNumber(productStore.sizeChosen.min_price)} ₽</span>*/}
                            {/*        </div>*/}
                            {/*        :*/}
                            {/*        <div className={s.price}>*/}
                            {/*            От {addSpacesToNumber(productStore.sizeChosen.min_price)} ₽*/}
                            {/*        </div>*/}
                            {/*}*/}
                        </>
                        :
                        `Выберите ${manySizes ? 'размер' : 'конфигурацию'} ${(config && config !== 'undefined') ? `- ${config}` : ''}`
                }
            </div>
            <div className={s.dropdown_content}>
                {
                    isOpen &&
                    <div>
                        {
                            prices.map(el =>
                                el.available
                                    ?
                                    <div className={s.items}
                                         onClick={() => selectItem(el)}
                                         key={el.id}
                                    >
                                        <div className={s.size_block}>
                                            <div className={s.icons}>{parseHtml(el.view_size)}</div>
                                            {el.is_fast_shipping && <Image src={truck} alt="" className={s.icons}/>}
                                            {el.is_return && <Image src={refund} alt="" className={s.icons}/>}
                                        </div>
                                        {
                                            (el.min_price_without_sale > el.min_price)
                                            ?
                                                <div className={s.price}>
                                                    <span className={s.crossed}>От {addSpacesToNumber(el.min_price_without_sale)} ₽</span>
                                                    <span className={s.sale_price}>От {addSpacesToNumber(el.min_price)} ₽</span>
                                                </div>
                                                :
                                                <div className={s.price}>
                                                    От {addSpacesToNumber(el.min_price)} ₽
                                                </div>
                                        }
                                    </div>
                                    :
                                    <div className={s.items_not}
                                    >
                                        <div className={s.size_block}>
                                            <div className={s.crossed_text}>{parseHtml(el.view_size)}</div>
                                        </div>
                                        <div className='d-flex'>
                                            Распродано.
                                            {userStore.isLogged ?
                                                <button className={s.link}
                                                        onClick={() => {
                                                            handleOpen()
                                                            toWaitingList(el.size)
                                                        }}
                                                >Сообщить о поступлении</button>
                                                :
                                                <AuthModal inline={true}
                                                           text={'Зарегистрируйстесь, чтобы получить уведомление о поступлении'}>
                                                    <button className={s.link}>Сообщить о поступлении</button>
                                                </AuthModal>
                                            }
                                        </div>
                                    </div>
                            )
                        }
                    </div>
                }
            </div>

            <Modal
                show={isShow}
                centered={true}
                onHide={handleClose}
            >
                <Modal.Body>
                    <div className='d-flex justify-content-end'>
                        <Image src={close} alt='' onClick={handleClose}/>
                    </div>
                    <div className={'text-center'}>
                        Мы сообщим о поступлении данной позиции. Уведомление придет вам на электронную почту.
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default observer(SizeChoice);