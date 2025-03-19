import React, {useContext, useState} from "react";
import {Context} from "@/context/AppWrapper";
import DropdownCategory from "@/components/pages/product/FilterDropdowns/Shared/DropdownCategory";

const Dropdown = ({filter, brand}) => {
    const {filterStore} = useContext(Context)

    return (
        <div style={{width: '300px'}}>
            <DropdownCategory category={filter} level={1} brand={brand}/>
        </div>
    );
};

export default Dropdown;