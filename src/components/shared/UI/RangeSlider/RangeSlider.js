import React, {useContext, useState} from 'react';
import Slider from 'react-slider'
import s from './RangeSlider.module.css'
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";

const RangeSlider = ({min, max, values}) => {
    const router = useRouter()
    const {filterStore} = useContext(Context);
    const handleChange = (newValues) => {
        filterStore.setPriceBoth(newValues);
        const {pathname} = router
        const query = {...router.query}
        query.price_min = filterStore.price[0]
        query.price_max = filterStore.price[1]
        query.page = 1
        router.push({pathname, query}, undefined, {scroll: false})
    };
    return (
        <Slider
            className='slider'
            onChange={handleChange}
            value={values}
            min={min}
            max={max}
            pearling={true}
            minDistance={100}
        />
    );
};

export default observer(RangeSlider);