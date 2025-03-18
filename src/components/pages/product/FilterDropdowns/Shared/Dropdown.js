import React, {useContext, useState} from "react";
import {Context} from "@/context/AppWrapper";
import DropdownCategory from "@/components/pages/product/FilterDropdowns/Shared/DropdownCategory";

const Dropdown = ({filter}) => {
    const {filterStore} = useContext(Context)

    return (
        <div style={{width: '300px'}}>
            <DropdownCategory category={filter} level={1}/>
        </div>
    );
};

export default Dropdown;