import React, {useCallback, useContext, useEffect, useState} from 'react';
import s from './RenderBtns.module.css'
import {Context} from "@/context/AppWrapper";
import Cookies from "js-cookie";
import {observer} from "mobx-react-lite";

const RenderBtns = ({btns}) => {
    const [activeButtonId, setActiveButtonId] = useState();
    const {productStore} = useContext(Context)
    const arr = []
    let curNum = 1

    const handleClick = useCallback((id) => {
        setActiveButtonId(id);
        productStore.setShipChosen(id)
        let cart = Cookies.get('cart')
        if (!cart) {
            Cookies.set('cart', '')
        }
        cart = Cookies.get('cart').trim().split(' ')
        productStore.setText(cart, id)
    }, []);

    for (let i = 0; i < btns.length; i++) {
        if (curNum > 3) {
            curNum = 1
        }
        let className = s.white;
        if (btns[i].id === activeButtonId) {
            className = s.black;
        }
        const content = (
            <div className={`${s.content}`}>
                <div className={s.half_text}>{btns[i].delivery.name}</div>
                <div className={s.display_none}>|</div>
                <div className={s.half_text}>{btns[i].final_price} ₽</div>
            </div>
        )
        if (btns.length - 1 - i > 2) {
            arr.push(
                <button className={`${s.btn_black2} ${className}`} key={btns[i].id}
                        onClick={() => handleClick(btns[i].id)}
                >
                    {content}
                </button>
            )
            curNum++
            continue
        }
        if (btns.length % 3 !== 0 && btns.length - 1 - i === 0 && curNum === 1) {
            arr.push(
                <button className={`${s.btn_black3} ${className}`} key={btns[i].delivery.id}
                        onClick={() => handleClick(btns[i].id)}
                >
                    {content}
                </button>
            )
            curNum++
            continue
        }
        if (btns.length % 3 !== 0 && btns.length - 1 - i <= 2) {
            arr.push(
                <button className={`${s.btn_black} ${className}`} key={btns[i].id}
                        onClick={() => handleClick(btns[i].id)}
                >
                    {content}
                </button>
            )
            curNum++
        }
    }
    useEffect(() => {
        if (btns.length === 1) {
            handleClick(btns[0].id)
        }
    }, [])
    return <>{arr}</>
};

export default observer(RenderBtns);