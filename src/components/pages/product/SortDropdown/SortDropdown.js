import React, {useEffect, useRef, useState} from 'react';
import s from './SortDropdown.module.css'
import sort from '@/static/icons/sort-alpha-down.svg'
import Image from "next/image";
import {useRouter} from "next/router";

const SortDropdown = () => {
    const sorts = [
        ['По популярности', '-rel_num'],
        ['Случайная подборка', 'random'],
        ['По новизне', '-exact_date'],
        ['По возрастанию цены', 'min_price'],
        ['По убыванию цены', '-min_price']
    ]
    useEffect(() => {
        const query = {...router.query}
        const {ordering} = query
        sorts.forEach(el => {
            if (el[1] === ordering) {
                setSelectedItem(el[0])
            }
        })
        if (!selectedItem) {
            setSelectedItem(sorts[0][0])
        }
    }, [])
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const dropdownRef = useRef(null);
    const sortBy = (sort) => {
        const query = {...router.query}
        const {path} = router
        query.ordering = sort
        query.page = 1
        router.push({path, query}, undefined, {scroll: false})
    }
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectItem = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <div ref={dropdownRef}>
            <div className={s.dropdown}
                 style={isOpen ? {borderRadius: '7px 7px 0 0'} : {borderRadius: '7px'}}
            >
                <div
                    onClick={() => toggleDropdown()}
                    className={s.dropdown_toggle}
                >
                    <div className={s.dropdown_header_text}>
                        <Image src={sort} alt="" className={s.icon}/>
                        {selectedItem || 'Сортировка'}
                    </div>
                </div>
            </div>
            {isOpen && (
                <div>
                    <div className={s.dropdown_items_block}>
                        {
                            sorts.map(item =>
                                <div
                                    onClick={() => {
                                        selectItem(item[0])
                                        sortBy(item[1])
                                    }}
                                    key={item[0]}
                                    className={s.dropdown_item}
                                >
                                    <div className={s.dropdown_text}>
                                        {item[0]}
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

export default SortDropdown;