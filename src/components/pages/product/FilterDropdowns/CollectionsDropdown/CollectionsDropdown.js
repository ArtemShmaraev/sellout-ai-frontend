import React, {useContext, useEffect, useState} from 'react';
import s from './CollectionsDropdown.module.css'
import CustomCheckbox from "@/components/shared/UI/CustoCheckbox/CustomCheckbox";
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import {Context} from "@/context/AppWrapper";
import {useRouter} from "next/router";
import SearchInput from "@/components/shared/UI/SearchInput/SearchInput";
import {fetchFilter} from "@/http/productsApi";
import {observer} from "mobx-react-lite";

const CollectionsDropdown = () => {
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
        changeQuery(query, 'collab', filterStore.checkedCollectionsQuery)
        query.page = 1
        router.push({pathname, query}, undefined, {scroll: false})
    }
    const handleClick = (item) => {
        filterStore.toggleFilter(item)
        reloadPage()
    }
    const [query, setQuery] = useState("");
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            filterStore.setCollabQ(query)
            searchCollab(query)
        }, 200);
        return () => clearTimeout(timeOutId);
    }, [query]);
    const searchCollab = async (value) => {
        let newTree
        if (value) {
            newTree = await fetchFilter(`collabs?q=${value}`)
        } else {
            newTree = await fetchFilter(`collabs`)
        }
        filterStore.fillCollections(newTree)
        filterStore.deactivateFilters(filterStore.filters)
        filterStore.reactivateFilters(router.query)
    }
    const renderCollesctions = () => {
        const res = []
        filterStore.collections.forEach(item => {
                if (item.is_show) {
                    res.push(
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
            }
        )
        return res
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
                        Коллаборации
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
                                             placeholder="Поиск среди коллабораций"
                                />
                            </div>
                        </div>
                        {
                            renderCollesctions()
                        }
                    </div>
                </div>
            )}
        </div>
    )
};

export default observer(CollectionsDropdown);