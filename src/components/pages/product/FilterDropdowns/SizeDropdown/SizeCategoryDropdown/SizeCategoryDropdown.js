import React, {useState} from 'react';
import s from './SizeCategoryDropdown.module.css'
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import SizeRows from "@/components/pages/product/FilterDropdowns/SizeDropdown/SizeRows/SizeRows";
import {observer} from "mobx-react-lite";

const SizeCategoryDropdown = ({category, catObj}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div style={{marginLeft: '15px'}}>
            <div className={s.dropdown}
                 style={isOpen ? {borderRadius: '7px 7px 0 0'} : {borderRadius: '7px'}}
            >
                <div
                    onClick={() => toggleDropdown()}
                    className={s.dropdown_toggle}
                >
                    <div className={s.dropdown_toggle_text}>
                        {category}
                        <Arrow isOpen={isOpen}/>
                    </div>
                </div>
            </div>
            {isOpen &&
                <SizeRows catObj={catObj} cat={category}/>
            }
        </div>
    );
};

export default observer(SizeCategoryDropdown);