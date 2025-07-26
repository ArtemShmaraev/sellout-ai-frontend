import React, {useContext, useState} from 'react';
import s from './SizeDropdown.module.css'
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import {Context} from "@/context/AppWrapper";
import {useRouter} from "next/router";
import SizeCategoryDropdown
    from "@/components/pages/product/FilterDropdowns/SizeDropdown/SizeCategoryDropdown/SizeCategoryDropdown";
import {observer} from "mobx-react-lite";


const SizeDropdown = () => {
    const {filterStore} = useContext(Context)
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const changeQuery = (query, filterName, filterArr) => {
        if (query[filterName]) {
            delete query[filterName]
        }
        if (filterArr.length > 1) {
            query[filterName] = [...filterArr]
        }
        if (filterArr.length === 1) {
            query[filterName] = filterArr[0]
        }
    }
    const allCategories = () => {
        const arr = []
        for (const key in filterStore.filters.size) {
            arr.push(key)
        }
        return arr
    }
    return (
        <>
            {
                allCategories().length > 0 &&
                <div>
                    <div className={s.dropdown}
                         style={isOpen ? {borderRadius: '7px 7px 0 0'} : {borderRadius: '7px'}}
                    >
                        <div
                            onClick={() => toggleDropdown()}
                            className={s.dropdown_toggle}
                        >
                            <div className={s.dropdown_toggle_text}>
                                Размер
                                <Arrow isOpen={isOpen}/>
                            </div>
                        </div>
                    </div>
                    {isOpen && (
                        <div>
                            <div className={s.dropdown_items_block}>
                                {allCategories().map(cat =>
                                    <SizeCategoryDropdown category={cat} catObj={filterStore.filters.size[cat]}/>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    );
};

export default observer(SizeDropdown);