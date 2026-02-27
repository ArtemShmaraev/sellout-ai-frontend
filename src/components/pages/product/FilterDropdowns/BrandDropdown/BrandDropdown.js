import React, {useContext, useEffect, useState} from 'react';
import s from './BrandDropdown.module.css'
import SearchInput from "@/components/shared/UI/SearchInput/SearchInput";
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import Dropdown from "@/components/pages/product/FilterDropdowns/Shared/Dropdown";
import {Context} from "@/context/AppWrapper";
import {fetchFilter} from "@/http/productsApi";
import {useRouter} from "next/router";

const BrandDropdown = () => {
    const {filterStore} = useContext(Context)
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const [query, setQuery] = useState("");
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            filterStore.setLineQ(query)
            searchBrand(query)
        }, 200);
        return () => clearTimeout(timeOutId);
    }, [query]);
    const searchBrand = async (value) => {
        let newTree
        if (value) {
            newTree = await fetchFilter(`tree_line?q=${value}`)
        } else {
            newTree = await fetchFilter(`tree_line`)
        }
        filterStore.fillLines(newTree)
        filterStore.deactivateFilters(filterStore.filters)
        filterStore.reactivateFilters(router.query)
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
                        Бренд
                        <Arrow isOpen={isOpen}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className={s.scroll}>
                    <div className={s.dropdown_items_block}>
                        <div
                            className={s.dropdown_input}
                        >
                            <div className={s.dropdown_text}>
                                <SearchInput w100={true}
                                             value={query}
                                             onChange={e => setQuery(e.target.value)}
                                             placeholder="Поиск среди 1'000+ брендов"
                                />
                            </div>
                        </div>
                    </div>
                    <Dropdown filter={filterStore.filters.line} brand={true}/>
                </div>
            )}
        </div>
    )
};

export default BrandDropdown;