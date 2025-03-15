import React, {useState} from 'react';
import Slider from 'react-slider'
import s from './RangeSlider.module.css'

const RangeSlider = ({min, max}) => {
    const [values, setValues] = useState([min, max])
    return (
        <Slider
            className='slider'
            onChange={setValues}
            value={values}
            min={min}
            max={max}
            pearling={true}
            minDistance={100}
        />
    );
};

export default RangeSlider;