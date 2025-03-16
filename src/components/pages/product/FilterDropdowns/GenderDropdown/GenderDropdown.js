import React, {useContext, useState} from 'react';
import s from './GenderDropdown.module.css'
import CustomCheckbox from "@/components/shared/UI/CustoCheckbox/CustomCheckbox";
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import products from "@/pages/products";

const GenderDropdown = () => {
    const {filterStore} = useContext(Context)
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleClick = (item) => {
        item[2] = !item[2]
        const {pathname} = router
        const query = {...router.query}
        if (query.gender) {
            delete query.gender
        }
        if (filterStore.checkedGenders.length > 1) {
            query.gender = [...filterStore.checkedGenders]
        } else {
            query.gender = filterStore.checkedGenders[0]
        }
        query.page = 1
        router.push({pathname, query}, undefined, {scroll: false})
    }
    const getNewAddress1 = () => {
        const currentAddress = router.asPath
        const regex1 = /price_min=\d+/g
        const regex2 = /price_max=\d+/g
        let newAddress = currentAddress
        if (newAddress.includes('price_min')) {
            newAddress = newAddress.replace(regex1, `price_min=${filterStore.price[0]}`)
        } else {
            newAddress += `&price_min=${filterStore.price[0]}&`
        }
        if (newAddress.includes('price_max')) {
            newAddress = newAddress.replace(regex2, `price_max=${filterStore.price[1]}`)
        } else {
            newAddress += `price_max=${filterStore.price[1]}&`
        }
        if (!newAddress.includes('products?')){
            newAddress = newAddress.replace('products', 'products?page=1&')
        }
        return newAddress
    }
    return (
        <div>
            <div className={s.dropdown}
                 style={isOpen ? {borderRadius: '7px 7px 0 0'} : {borderRadius: '7px'}}
            >
                <div
                    onClick={() => toggleDropdown()}
                    className={s.dropdown_toggle}
                >
                    <div className={s.dropdown_toggle_text}>
                        Пол
                        <Arrow isOpen={isOpen}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div>
                    <div className={s.dropdown_items_block}>
                        {
                            filterStore.gender.map(item =>
                                <div
                                    key={item[0]}
                                    className={s.dropdown_item}
                                >
                                    <div className={s.dropdown_text} onClick={(e) => {
                                        e.stopPropagation()
                                        handleClick(item)
                                    }}>
                                        <CustomCheckbox
                                            labelText={item[0]}
                                            checked={item[2]}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    )
};

export default observer(GenderDropdown);