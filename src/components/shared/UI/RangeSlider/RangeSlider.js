import React, {useContext, useState} from 'react';
import Slider from 'react-slider'
import s from './RangeSlider.module.css'
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";

const RangeSlider = ({min, max, values}) => {
    const {filterStore} = useContext(Context);
    const handleChange = (newValues) => {
        filterStore.setPriceBoth(newValues);
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