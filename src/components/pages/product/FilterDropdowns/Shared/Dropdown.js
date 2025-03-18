import React, {useContext, useState} from "react";
import s from './Dropdown.module.css'
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import {Context} from "@/context/AppWrapper";

const Dropdown = () => {
    const {filterStore} = useContext(Context)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectItem = (item) => {
        setSelectedItem(item);
    };
    const renderCategory = (category, level = 0) => {
        if (!category.hasOwnProperty('text')) {
            const dropdowns = [];
            for (const key in category) {
                if (!category[key].hasOwnProperty('text')) {
                    dropdowns.push(
                        <div key={key} style={{ marginLeft: `${20 * level}px` }}>
                            <h4>Dropdown {key}</h4>
                            {renderCategory(category[key], level + 1)}
                        </div>
                    );
                } else {
                    dropdowns.push(
                        <div key={key} style={{ marginLeft: `${20 * level}px` }}>
                            {category[key].text}
                        </div>
                    );
                }
            }
            return dropdowns;
        }
        return (
            <div style={{ marginLeft: `${20 * level}px`, color: 'red' }}>
                {category.text}
            </div>
        );
    };


    return (
        <div>
            {renderCategory(filterStore.filters.category)}
        </div>
    );
};

export default Dropdown;