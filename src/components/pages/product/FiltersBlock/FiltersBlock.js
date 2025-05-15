import React, {useContext} from 'react';
import s from './FiltersBlock.module.css'
import ScrollableBlock2 from "@/components/shared/UI/ScrollableBlock2/ScrollableBlock2";
import {Context} from "@/context/AppWrapper";
import close from '@/static/icons/x-lg-copy.svg'
import Image from "next/image";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";

const FiltersBlock = () => {
    const {filterStore} = useContext(Context)
    const router = useRouter()
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

        changeQuery(query, 'gender', filterStore.checkedGendersQuery)
        changeQuery(query, 'category', filterStore.checkedCategory)
        changeQuery(query, 'line', filterStore.checkedLine)
        changeQuery(query, 'collab', filterStore.checkedCollectionsQuery)
        changeQuery(query, 'size', filterStore.checkedSize)
        changeQuery(query, 'color', filterStore.checkedColorsQuery)
        changeQuery(query, 'materials', filterStore.checkedMaterials)
        changeQuery(query, 'is_fast_ship', filterStore.checkedFastShip)
        changeQuery(query, 'is_sale', filterStore.checkedSale)
        changeQuery(query, 'q', filterStore.QActive)
        query.page = 1
        router.push({pathname, query}, undefined, {scroll: false})
    }
    return (
        <ScrollableBlock2>
            {filterStore.activeFilters.map(el =>
                <div className={s.border}>
                    {el.text}
                    <span className={s.cross}>
                        <Image src={close} alt=''
                               onClick={() => {
                                   filterStore.toggleFilter(el)
                                   reloadPage()
                               }}
                        />
                    </span>
                </div>
            )}
        </ScrollableBlock2>
    );
};

export default observer(FiltersBlock);