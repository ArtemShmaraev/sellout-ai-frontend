import React, {useContext, useState} from 'react';
import s from './ColorDropdown.module.css'
import CustomCheckbox from "@/components/shared/UI/CustoCheckbox/CustomCheckbox";
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import {Context} from "@/context/AppWrapper";
import {useRouter} from "next/router";

const ColorDropdown = () => {
    const {filterStore} = useContext(Context)
    const router = useRouter()
    const gender = [
        'Красный',
        'Красный',
        'Красный'
    ]
    const [isOpen, setIsOpen] = useState(false);
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
    const reloadPage = () => {
        const {pathname} = router
        const query = {...router.query}
        changeQuery(query, 'color', filterStore.checkedColorsQuery)
        query.page = 1
        router.push({pathname, query}, undefined, {scroll: false})
    }
    const handleClick = (item) => {
        filterStore.toggleFilter(item)
        reloadPage()
    }

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
                        Цвет
                        <Arrow isOpen={isOpen}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div>
                    <div className={s.dropdown_items_block}>
                        {
                            filterStore.color.map(item =>
                                <div
                                    key={item.query}
                                    className={s.dropdown_item}
                                >
                                    <div className={s.dropdown_text} onClick={(e) => {
                                        e.stopPropagation()
                                        handleClick(item)
                                    }}>
                                        <CustomCheckbox
                                            labelText={item.text}
                                            checked={item.state}
                                            color={item.hex}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    )
};

export default ColorDropdown;