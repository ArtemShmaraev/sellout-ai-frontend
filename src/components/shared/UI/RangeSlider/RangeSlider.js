import React, {useContext, useEffect, useState} from 'react';
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
    };
    const handleAfterChange = () => {
        const {pathname} = router
        const query = {...router.query}
        query.price_min = filterStore.price[0]
        query.price_max = filterStore.price[1]
        query.page = 1
        router.push({pathname, query}, undefined, {scroll: false})
        filterStore.handleScrollTo()
    };

    useEffect(() => {
        const {query} = router
        const {price_min, price_max} = query
        if (price_min && price_max) {
            filterStore.setPriceBoth([price_min, price_max])
        }
    }, [])
    return (
        <Slider
            className='slider'
            onChange={handleChange}
            onAfterChange={handleAfterChange}
            value={values}
            min={min}
            max={max}
            pearling={true}
            minDistance={100}
        />
    );
};

export default observer(RangeSlider);