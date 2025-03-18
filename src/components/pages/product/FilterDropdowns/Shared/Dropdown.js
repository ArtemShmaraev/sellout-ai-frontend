import React, {useContext, useState} from "react";
import s from './Dropdown.module.css'
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import {Context} from "@/context/AppWrapper";
import DropdownCategory from "@/components/pages/product/FilterDropdowns/Shared/DropdownCategory";

const Dropdown = () => {
    const {filterStore} = useContext(Context)
    console.log(filterStore.filters.gender)

    return (
        <div>
            <DropdownCategory category={filterStore.filters.category}/>
        </div>
    );
};

export default Dropdown;