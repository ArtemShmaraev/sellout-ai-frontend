import React from 'react';
import CategoryDropdown from "./CategoryDropdown/CategoryDropdown";
import BrandDropdown from "./BrandDropdown/BrandDropdown";
import GenderDropdown from "./GenderDropdown/GenderDropdown";
import ColorDropdown from "./ColorDropdown/ColorDropdown";
import PriceDropdown from "./PriceDropdown/PriceDropdown";
import FastShip from "./FastShip/FastShip";
import Sale from "./Sale/Sale";
import s from './FilterDropdowns.module.css'
import CollectionsDropdown from "@/components/pages/product/FilterDropdowns/CollectionsDropdown/CollectionsDropdown";
import SizeDropdown from "@/components/pages/product/FilterDropdowns/SizeDropdown/SizeDropdown";

const FilterDropdowns = () => {
    return (
        <div>
            <div className={s.container}>
                <CategoryDropdown/>
                <BrandDropdown/>
                <CollectionsDropdown/>
                <GenderDropdown/>
                <SizeDropdown/>
                <ColorDropdown/>
                <PriceDropdown/>
                {/*<FastShip/>*/}
                {/*<Sale/>*/}
            </div>
        </div>
    );
};

export default FilterDropdowns;