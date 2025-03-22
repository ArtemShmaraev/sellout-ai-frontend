import React, {useContext, useRef, useState} from 'react';
import s from './CategoryDropdown.module.css'
import SubcategoryDropdown from "@/components/pages/product/FilterDropdowns/CategoryDropdown/SubcategoryDropdown/SubcategoryDropdown";
import Arrow from '@/components/shared/UI/Arrow/Arrow';
import Dropdown from "@/components/pages/product/FilterDropdowns/Shared/Dropdown";
import {Context} from "@/context/AppWrapper";

const CategoryDropdown = () => {
    const {filterStore} = useContext(Context)
    const [isOpen, setIsOpen] = useState(false);
    const toggleRef  = useRef(null)
    const toggleDropdown = () => {
        if (!isOpen) setDropdownWidth(toggleRef.current.offsetWidth);
        setIsOpen(!isOpen);
    };
    const [dropdownWidth, setDropdownWidth] = useState(0);

    return (
        <div>
            <div className={s.dropdown}
                 style={isOpen ? {borderRadius: '7px 7px 0 0'} : {borderRadius: '7px'}}
            >
                <div
                    onClick={() => toggleDropdown()}
                    className={s.dropdown_toggle}
                    ref={toggleRef}
                >
                    <div className={s.dropdown_toggle_text}>
                        Категории
                        <Arrow isOpen={isOpen}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <Dropdown filter={filterStore.filters.category} width={dropdownWidth}/>
            )}
        </div>
    )
};

export default CategoryDropdown;