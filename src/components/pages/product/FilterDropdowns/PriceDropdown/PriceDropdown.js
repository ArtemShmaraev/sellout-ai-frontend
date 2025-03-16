import React, {useContext, useState} from 'react';
import s from './PriceDropdown.module.css'
import RangeSlider from "@/components/shared/UI/RangeSlider/RangeSlider";
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";

const PriceDropdown = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const {filterStore} = useContext(Context)
    const handleFrom = (e) => {
        filterStore.setPriceFrom(e.target.value)
        const {pathname} = router
        const query = {...router.query}
        query.price_min = filterStore.price[0]
        query.price_max = filterStore.price[1]
        query.page = 1
        router.push({pathname, query}, undefined, {scroll: false})
    }
    const handleTo = (e) => {
        filterStore.setPriceTo(e.target.value)
        const {pathname} = router
        const query = {...router.query}
        query.price_min = filterStore.price[0]
        query.price_max = filterStore.price[1]
        query.page = 1
        router.push({pathname, query}, undefined, {scroll: false})
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
                        Цена
                        <Arrow isOpen={isOpen}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className={s.dropdown_text}>
                    <div className={s.input_group}>
                        <div className='d-flex align-items-center'>
                            <label htmlFor="From">От</label>
                            <input type="number" id='From'
                                   className={s.dropdown_input}
                                   value={filterStore.price[0]}
                                   onChange={(e) => handleFrom(e)}
                            />
                        </div>
                        <div className='d-flex align-items-center'>
                            <label htmlFor="To">До</label>
                            <input type="number" id='To'
                                   className={s.dropdown_input}
                                   value={filterStore.price[1]}
                                   onChange={(e) => handleTo(e)}
                            />
                        </div>
                    </div>
                    <RangeSlider min={100} max={1000000} values={filterStore.price}/>
                    <div
                        style={{width: '270px'}}
                        className='d-flex justify-content-between mt-2'
                    >
                        <div>
                            От 100 Р
                        </div>
                        <div>
                            До 100 000 Р
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default observer(PriceDropdown);