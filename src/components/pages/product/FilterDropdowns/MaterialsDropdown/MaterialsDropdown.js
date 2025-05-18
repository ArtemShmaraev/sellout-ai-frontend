import React, {useContext, useState} from 'react';
import {Context} from "@/context/AppWrapper";
import {useRouter} from "next/router";
import s from "@/components/pages/product/FilterDropdowns/ColorDropdown/ColorDropdown.module.css";
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import CustomCheckbox from "@/components/shared/UI/CustoCheckbox/CustomCheckbox";

const MaterialsDropdown = () => {
    const {filterStore} = useContext(Context)
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
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
        changeQuery(query, 'material', filterStore.checkedMaterials)
        query.page = 1
        router.push({pathname, query}, undefined, {scroll: false})
    }
    const handleClick = (item) => {
        filterStore.toggleFilter(item)
        reloadPage()
    }

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
                        Материал
                        <Arrow isOpen={isOpen}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div>
                    <div className={s.dropdown_items_block}>
                        {
                            filterStore.materials.map(item =>
                                <div
                                    key={item.query}
                                    className={s.dropdown_item}
                                >
                                    <div className={s.dropdown_text} onClick={(e) => {
                                        e.stopPropagation()
                                        handleClick(item)
                                    }}>
                                        <CustomCheckbox
                                            labelText={item.text}
                                            checked={item.state}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaterialsDropdown;