import React, {useState} from 'react';
import s from './CategoryDropdown.module.css'
import ShoesDropdown from "./ShoesDropdown/ShoesDropdown";
import Arrow from '@/components/shared/UI/Arrow/Arrow';

const CategoryDropdown = () => {
    const categories = [
        'Обувь',
        'Одежда',
        'Аксессуары'
    ]
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectItem = (item) => {
        setSelectedItem(item);
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
                        Категории
                        <Arrow isOpen={isOpen}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div>
                    <div className={s.dropdown_items_block}>
                        {
                            categories.map(item =>
                                <div
                                    onClick={() => selectItem(item)}
                                    key={item}
                                    className={s.dropdown_item}
                                >
                                    <ShoesDropdown/>
                                </div>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    )
};

export default CategoryDropdown;