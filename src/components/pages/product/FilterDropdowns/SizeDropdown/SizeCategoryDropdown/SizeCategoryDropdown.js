import React, {useContext, useEffect, useRef, useState} from 'react';
import s from './SizeCategoryDropdown.module.css'
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import {Context} from "@/context/AppWrapper";
import SizeBtn from "@/components/pages/product/FilterDropdowns/SizeDropdown/SizeBtn/SizeBtn";
import {useRouter} from "next/router";

const SizeCategoryDropdown = ({category}) => {
    const router = useRouter()
    const {filterStore} = useContext(Context)
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const getRows = () => {
        const arr = []
        const table = filterStore.filters.size[category]
        for (const key in table) {
            arr.push(key)
        }
        return arr
    }
    const [rowOpen, setRowOpen] = useState(false)


    const [selectedRow, setSelectedRow] = useState(null)
    const selectRow = (row) => {
        setSelectedRow(row)
        setRowOpen(false)
    }


    const toggleRef  = useRef(null)
    const rowToggle = () => {
        if (!rowOpen) setDropdownWidth(toggleRef.current.offsetWidth);
        setRowOpen(!rowOpen)
    }
    const [dropdownWidth, setDropdownWidth] = useState(0);


    const dropdownRef  = useRef(null)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setRowOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    const checkSize = (size) => {
        filterStore.toggleFilter(size)
        reloadPage()
    }
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
        changeQuery(query, 'size', filterStore.checkedSize)
        query.page = 1
        router.push({pathname, query}, undefined, {scroll: false})
    }
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
            {isOpen && (
                <div style={{marginLeft: '15px'}}>
                    <div className={s.row_dropdown}
                         style={rowOpen ? {borderRadius: '7px 7px 0 0'} : {borderRadius: '7px'}}
                         ref={dropdownRef}
                    >
                        <div
                            onClick={() => rowToggle()}
                            className={s.row_toggle}
                            ref={toggleRef}
                        >
                            <div className={s.dropdown_toggle_text}>
                                {selectedRow || 'Выберите ряд'}
                                <Arrow isOpen={rowOpen}/>
                            </div>
                        </div>
                    </div>
                    {rowOpen &&
                        <div>
                            <div className={s.row_block}>
                                {
                                    getRows().map((item, ind) =>
                                        <div
                                            key={item}
                                            className={s.row_item}
                                            style={
                                            ind === getRows().length-1
                                                ? {borderRadius: '0 0 7px 7px', width: dropdownWidth}
                                                : {width: dropdownWidth}
                                        }
                                        >
                                            <div className={s.row_text} onClick={(e) => {
                                                e.stopPropagation()
                                                selectRow(item)
                                            }}>
                                                {item}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    }
                    {selectedRow &&
                        <div className={s.btn_block}>
                            {
                                filterStore.getSizes(category, selectedRow).map(size =>
                                    <SizeBtn
                                        text={size.text}
                                        query={size.query}
                                        state={size.state}
                                        onClick={() => checkSize(size)}
                                    />
                                )
                            }
                        </div>
                    }
                </div>
            )}
        </div>
    );
};

export default SizeCategoryDropdown;