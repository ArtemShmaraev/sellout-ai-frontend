import React, {useContext, useState} from 'react';
import s from './BrandDropdown.module.css'
import SearchInput from "@/components/shared/UI/SearchInput/SearchInput";
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import Dropdown from "@/components/pages/product/FilterDropdowns/Shared/Dropdown";
import {Context} from "@/context/AppWrapper";

const BrandDropdown = () => {
    const {filterStore} = useContext(Context)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectItem = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
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
                        Бренд
                        <Arrow isOpen={isOpen}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className={s.scroll}>
                    <div className={s.dropdown_items_block}>
                        <div
                            className={s.dropdown_input}
                        >
                            <div className={s.dropdown_text}>
                                <SearchInput w100={true}/>
                            </div>
                        </div>
                    </div>
                    <Dropdown filter={filterStore.filters.line} brand={true}/>
                </div>
            )}
        </div>
    )
};

export default BrandDropdown;