import React, {useState} from 'react';
import s from './PriceDropdown.module.css'
import RangeSlider from "@/components/shared/UI/RangeSlider/RangeSlider";
import Arrow from "@/components/shared/UI/Arrow/Arrow";
const ColorDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
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
                            <input type="text" id='From' className={s.dropdown_input}/>
                        </div>
                        <div className='d-flex align-items-center'>
                            <label htmlFor="To">До</label>
                            <input type="text" id='To' className={s.dropdown_input}/>
                        </div>
                    </div>
                    <RangeSlider min={100} max={100000}/>
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

export default ColorDropdown;