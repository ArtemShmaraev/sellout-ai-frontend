import React, {useCallback, useContext, useEffect, useState} from 'react';
import s from './RenderBtns.module.css'
import {Context} from "@/context/AppWrapper";
import Cookies from "js-cookie";
import {observer} from "mobx-react-lite";

const RenderBtns = ({btns, changeBonuses}) => {
    const [activeButtonId, setActiveButtonId] = useState();
    const {productStore, userStore, cartStore, desktopStore} = useContext(Context)
    const arr = []
    let curNum = 1

    const handleClick = useCallback((id, bonuses) => {
        setActiveButtonId(id);
        productStore.setShipChosen(id)
        let cart = Cookies.get('cart')
        if (!cart) {
            Cookies.set('cart', '', {expires: 2772})
        }
        cart = Cookies.get('cart').trim().split(' ')

        productStore.setText(cart, id)
        changeBonuses(bonuses)
    }, []);
    const addSpacesToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');



    const renderBtns = (buttons) => {
        const rows = [];
        let currentRow = [];
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            const content = (
                <div className={`${s.content}`}>
                    <div className={s.half_text}>{button.delivery_view}</div>
                    <div className={s.display_none}>|</div>
                    {
                        (button.start_price > button.final_price)
                        ?
                            <div className={s.half_text}>
                                {desktopStore.isDesktop &&
                                    <>
                                        <span className={s.crossed}>{addSpacesToNumber(button.start_price)} ₽</span>
                                        <br/>
                                        <span className={s.sale_price}>{addSpacesToNumber(button.final_price)} ₽</span>
                                    </>}
                                {!desktopStore.isDesktop &&
                                    <>
                                        <span className={s.crossed} style={{marginRight: '10px'}}>{addSpacesToNumber(button.start_price)} ₽</span>
                                        <span className={s.sale_price}>{addSpacesToNumber(button.final_price)} ₽</span>
                                    </>}
                            </div>
                            :
                            <div className={s.half_text}>{addSpacesToNumber(button.final_price)} ₽</div>
                    }
                </div>
            )
            let buttonWidth = '49%';
            let lastRow = buttons.length - 1 - i < 1
            if (lastRow) {
                if (buttons.length -1 - i === 0 && currentRow.length === 0) {
                    buttonWidth = '100%';
                }
            }

            currentRow.push(
                <button
                    key={i}
                    style={{ width: buttonWidth }}
                    className={`${s.btn} ${productStore.shipChosen === button.id ? s.black : s.white}`}
                    onClick={() => handleClick(button.id, button.bonus)}
                >
                    {content}
                    {
                        productStore.anim &&
                        <div className={[s.anim, productStore.shipChosen === button.id ? s.black_anim : s.white_anim].join(' ')}/>
                    }
                </button>
            );

            if (currentRow.length === 2 || i === buttons.length - 1) {
                rows.push(
                    <div key={rows.length} className={s.row}>
                        {currentRow}
                    </div>
                );
                currentRow = [];
            }
        }
        return rows
    }
    useEffect(() => {
        if (btns.length === 1) {
            handleClick(btns[0].id, btns[0].bonus)
        }
    }, [productStore.shipps])
    return (
        <div className={`w-100`}>
            {renderBtns(btns)}
        </div>
    )
};

export default observer(RenderBtns);