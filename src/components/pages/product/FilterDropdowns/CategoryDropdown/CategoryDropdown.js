import React, {useContext, useRef, useState} from 'react';
import s from './CategoryDropdown.module.css'
import SubcategoryDropdown from "@/components/pages/product/FilterDropdowns/CategoryDropdown/SubcategoryDropdown/SubcategoryDropdown";
import Arrow from '@/components/shared/UI/Arrow/Arrow';
import Dropdown from "@/components/pages/product/FilterDropdowns/Shared/Dropdown";
import {Context} from "@/context/AppWrapper";

const CategoryDropdown = () => {
    const {filterStore} = useContext(Context)
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null)
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className={s.dropdown}
                 style={isOpen ? {borderRadius: '7px 7px 0 0'} : {borderRadius: '7px'}}
                 ref={ref}
            >
                <div
                    onClick={() => toggleDropdown()}
                    className={s.dropdown_toggle}
                >
                    <div className={s.dropdown_toggle_text}>
                        Категории
                        <Arrow isOpen={isOpen}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <Dropdown filter={filterStore.filters.category} />
            )}
        </div>
    )
};

export default CategoryDropdown;