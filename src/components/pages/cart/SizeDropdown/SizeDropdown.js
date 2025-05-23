import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './SizeDropdown.module.css'
import Image from "next/image";
import truck from "@/static/icons/truck.svg";
import refund from "@/static/icons/arrow-return-left.svg";
import {Context} from "@/context/AppWrapper";
import {fetchShippings} from "@/http/productsApi";

const SizeDropdown = ({prices, productId, currentId, cardId}) => {
    const {cartStore} = useContext(Context)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const dropdownRef = useRef(null);
    useEffect(() => {
        if (prices) {
            prices.forEach(el => {
                if (el.view_size === currentId) {
                    setSelectedItem(el)
                    cartStore.setSizeId(el.view_size)
                    fetchShippings(productId, cartStore.sizeId).then(res => {
                        cartStore.cart[cardId] = res
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
        cartStore.setSizeId(item.view_size)
        const data = await fetchShippings(productId, cartStore.sizeId)
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
                                            <div className={s.icons}>{selectedItem.view_size}</div>
                                            {selectedItem.is_fast_ship && <Image src={truck} alt="" className={s.icons}/>}
                                            {selectedItem.is_return && <Image src={refund} alt="" className={s.icons}/>}
                                        </div>
                                        {
                                            selectedItem.is_sale
                                                ?
                                                <div className={s.price}>
                                                    <span className={s.crossed}>От {selectedItem.min_price_without_sale} ₽</span>
                                                    <br/>
                                                    <span className={s.sale_price}>От {selectedItem.min_price} ₽</span>
                                                </div>
                                                :
                                                <div className={s.price}>
                                                    от {selectedItem.min_price} ₽
                                                </div>
                                        }
                                    </div>
                                    :
                                    <div className={s.sold_out}>
                                        <div className={s.cross}>{selectedItem.view_size}</div>
                                        <div className={s.fs13}>
                                            <div>Распродано</div>
                                            <a className={s.link}>Сообщить о поступлении</a>
                                        </div>
                                    </div>
                            }
                        </div>
                        :
                        <div className={s.dropdown_header_text}>
                            Выберите размер
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
                                                    <div className={s.size}>{el.view_size}</div>
                                                    {el.is_fast_ship && <Image src={truck} alt="" className={s.icons}/>}
                                                    {el.is_return && <Image src={refund} alt="" className={s.icons}/>}
                                                </div>
                                                {
                                                    el.is_sale
                                                        ?
                                                        <div className={s.price}>
                                                            <span className={s.crossed}>От {el.min_price_without_sale} ₽</span>
                                                            <br/>
                                                            <span className={s.sale_price}>От {el.min_price} ₽</span>
                                                        </div>
                                                        :
                                                        <div className={s.price}>
                                                            от {el.min_price} ₽
                                                        </div>
                                                }
                                            </div>
                                            :
                                            <div className={s.sold_out}>
                                                <div className={s.cross}>{el.view_size}</div>
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