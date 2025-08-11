import React, {useContext} from 'react';
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
import MaterialsDropdown from "@/components/pages/product/FilterDropdowns/MaterialsDropdown/MaterialsDropdown";
import {Context} from "@/context/AppWrapper";

const FilterDropdowns = () => {
    const {desktopStore} = useContext(Context)
    return (
        <div>
            <div className={s.container}
                 style={desktopStore.navbarVisible ? {top: 230} : {top: 80, maxHeight: 'calc(100vh - 80px)'}}>
                <CategoryDropdown/>
                <BrandDropdown/>
                <CollectionsDropdown/>
                <GenderDropdown/>
                <SizeDropdown/>
                <ColorDropdown/>
                <MaterialsDropdown/>
                <PriceDropdown/>
                {/*<FastShip/>*/}
                <Sale/>
            </div>
        </div>
    );
};

export default FilterDropdowns;