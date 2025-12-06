import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './SizeDropdown.module.css'
import Image from "next/image";
import truck from "@/static/icons/truck.svg";
import refund from "@/static/icons/arrow-return-left.svg";
import {Context} from "@/context/AppWrapper";
import {fetchShippings} from "@/http/productsApi";
import Cookies from "js-cookie";
import parseHtml from 'html-react-parser'
import {useRouter} from "next/router";

const SizeDropdown = ({prices, productId, currentId, cardId, manySizes}) => {
    const {cartStore} = useContext(Context)
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const dropdownRef = useRef(null);
    useEffect(() => {
        if (prices) {
            const token = Cookies.get('access_token')
            prices.forEach(el => {
                if (el.size_for_api === currentId) {
                    setSelectedItem(el)
                    cartStore.setSizeId(el.size_for_api)
                    fetchShippings(productId, cartStore.sizeId, token).then(res => {
                        cartStore.cart[cardId] = res
                        router.push('/cart', undefined, {scroll: false})
                    })
                }
            })
        }
    }, [prices])
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectItem = async (item) => {
        setSelectedItem(item);
        setIsOpen(false);
        cartStore.setSizeId(item.size_for_api)
        const token = Cookies.get('access_token')
        const data = await fetchShippings(productId, cartStore.sizeId, token)
        cartStore.cart[cardId] = data
        cartStore.setIsShipChosen(false)
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
    const addSpacesToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');


    return (
        <div ref={dropdownRef}>
            <div className={s.dropdown}
                 style={isOpen ? {borderRadius: '7px 7px 0 0'} : {borderRadius: '7px'}}
            >
                <div
                    onClick={() => toggleDropdown()}
                    className={s.dropdown_toggle}
                >
                    {selectedItem ?
                        <div className={s.dropdown_header_text}>
                            {
                                selectedItem.available
                                    ?
                                    <div className='d-flex justify-content-between align-items-center w-100'>
                                        <div className='d-flex align-items-center'>
                                            <div className={s.size}>{parseHtml(selectedItem.view_size)}</div>
                                            {selectedItem.is_fast_ship && <Image src={truck} alt="" className={s.icons}/>}
                                            {selectedItem.is_return && <Image src={refund} alt="" className={s.icons}/>}
                                        </div>
                                        {/*{*/}
                                        {/*    (selectedItem.min_price_without_sale > selectedItem.min_price)*/}
                                        {/*        ?*/}
                                        {/*        <div className={s.price}>*/}
                                        {/*            <span className={s.crossed}>От {addSpacesToNumber(selectedItem.min_price_without_sale)} ₽</span>*/}
                                        {/*            <br/>*/}
                                        {/*            <span className={s.sale_price}>От {addSpacesToNumber(selectedItem.min_price)} ₽</span>*/}
                                        {/*        </div>*/}
                                        {/*        :*/}
                                        {/*        <div className={s.price}>*/}
                                        {/*            От {addSpacesToNumber(selectedItem.min_price)} ₽*/}
                                        {/*        </div>*/}
                                        {/*}*/}
                                    </div>
                                    :
                                    <div className={s.sold_out}>
                                        <div className={s.cross}>{parseHtml(selectedItem.view_size)}</div>
                                        <div className={s.fs13}>
                                            <div>Распродано</div>
                                            <a className={s.link}>Сообщить о поступлении</a>
                                        </div>
                                    </div>
                            }
                        </div>
                        :
                        <div className={s.dropdown_header_text}>
                            Выберите {manySizes ? 'размер' : 'конфигурацию'}
                        </div>
                    }
                </div>
            </div>
            {isOpen && (
                <div>
                    <div className={s.dropdown_items_block}>
                        {
                            prices.map((el, ind) =>
                                <button key={el.size.id}
                                        className={ind !== prices.length-1 ? s.dropdown_item : s.dropdown_item2}
                                        onClick={() => selectItem(el)}
                                        disabled={!el.available}
                                >
                                    {
                                        el.available
                                        ?
                                            <div className='d-flex justify-content-between align-items-center w-100'>
                                                <div className='d-flex align-items-center'>
                                                    <div className={s.size}>{parseHtml(el.view_size)}</div>
                                                    {el.is_fast_ship && <Image src={truck} alt="" className={s.icons}/>}
                                                    {el.is_return && <Image src={refund} alt="" className={s.icons}/>}
                                                </div>
                                                {
                                                    (el.min_price_without_sale > el.min_price)
                                                        ?
                                                        <div className={s.price}>
                                                            <span className={s.crossed}>От {addSpacesToNumber(el.min_price_without_sale)} ₽</span>
                                                            <br/>
                                                            <span className={s.sale_price}>От {addSpacesToNumber(el.min_price)} ₽</span>
                                                        </div>
                                                        :
                                                        <div className={s.price}>
                                                            От {addSpacesToNumber(el.min_price)} ₽
                                                        </div>
                                                }
                                            </div>
                                            :
                                            <div className={s.sold_out}>
                                                <div className={s.cross}>{parseHtml(el.view_size)}</div>
                                                <div className={s.fs13}>
                                                    <div>Распродано</div>
                                                    <a className={s.link}>Сообщить о поступлении</a>
                                                </div>
                                            </div>
                                    }
                                </button>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default SizeDropdown;