import React, {useContext, useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import s from "./ShipDropdown.module.css";
import {Context} from "@/context/AppWrapper";
import Cookies from "js-cookie";
import {addToCart, removeFromCart} from "@/http/cartApi";

const ShipDropdown = ({cardId, unitId}) => {
    const {cartStore, userStore} = useContext(Context)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [inCartArr, setInCartArr] = useState([])
    const dropdownRef = useRef(null);
    useEffect(() => {
        let changed = false
        if (cartStore.cart[cardId]) {
            const cart = Cookies.get('cart').trim().split(' ').map(el => Number(el))
            const arr = []
            cartStore.cart[cardId].forEach(el => {
                if (el.id === unitId) {
                    setSelectedItem(el)
                    changed = true
                }
                if (cart.includes(el.id)) {
                    arr.push(el.id)
                }
            })
            setInCartArr(arr)
            if (!changed) {
                setSelectedItem(null)
            }
        }
    }, [cartStore.cart[cardId]])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const selectItem = async (item) => {
        const currCart = Cookies.get('cart').trim().split(' ').map(el => Number(el))
        let currId
        selectedItem ? currId = selectedItem.id : currId = unitId
        const newCart = currCart.map(el => {
            if (el === currId) {
                console.log('ok')
                return item.id
            }
            return el
        })
        Cookies.set('cart', newCart.join(' '))
        setSelectedItem(item)
        setIsOpen(false);
        cartStore.ships[cardId] = item.id
        if (userStore.isLogged) {
            await removeFromCart(userStore.id, currId, Cookies.get('access_token'))
            await addToCart(userStore.id, item.id, Cookies.get('access_token'))
        }
    }
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
                            {`${selectedItem.delivery.name} | ${selectedItem.final_price} ₽`}
                        </div>
                        :
                        <div className={s.dropdown_header_text}>
                            Выберите доставку
                        </div>
                    }
                </div>
            </div>
            {isOpen && (
                <div>
                    <div className={s.dropdown_items_block}>
                        {
                            cartStore.cart[cardId].map((el, ind) =>
                                <button className={ind !== cartStore.cart[cardId].length-1 ? s.dropdown_item : s.dropdown_item2}
                                        onClick={() => selectItem(el)}
                                        key={el.id}
                                        disabled={inCartArr.includes(el.id)}
                                >
                                    <div>{el.delivery.name} | {el.final_price} ₽</div>
                                    <div>{inCartArr.includes(el.id) && 'Уже в корзине'}</div>
                                </button>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default observer(ShipDropdown);