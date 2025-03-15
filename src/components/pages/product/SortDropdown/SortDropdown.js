import React, {useEffect, useRef, useState} from 'react';
import s from './SortDropdown.module.css'
import sort from '@/static/icons/sort-alpha-down.svg'
import Image from "next/image";

const SortDropdown = () => {
    const sorts = [
        'Наши рекомендации',
        'По популярности',
        'По новизне',
        'По возрастанию цены',
        'По убыванию цены'
    ]
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const dropdownRef = useRef(null);
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
                                    onClick={() => selectItem(item)}
                                    key={item}
                                    className={s.dropdown_item}
                                >
                                    <div className={s.dropdown_text}>
                                        {item}
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