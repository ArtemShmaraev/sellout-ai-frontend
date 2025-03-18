import React, {useContext} from 'react';
import s from './FiltersBlock.module.css'
import ScrollableBlock2 from "@/components/shared/UI/ScrollableBlock2/ScrollableBlock2";
import {Context} from "@/context/AppWrapper";
import close from '@/static/icons/x-lg.svg'
import Image from "next/image";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";

const FiltersBlock = () => {
    const {filterStore} = useContext(Context)
    const router = useRouter()
    const reloadPage = () => {
        const {pathname} = router
        const query = {...router.query}
        if (query.gender) {
            delete query.gender
        }
        if (filterStore.checkedGendersQuery.length > 1) {
            query.gender = [...filterStore.checkedGendersQuery]
        } else {
            query.gender = filterStore.checkedGendersQuery[0]
        }
        if (query.category) {
            delete query.category
        }
        if (filterStore.checkedCategory.length > 1) {
            query.category = [...filterStore.checkedCategory]
        } else {
            query.category = filterStore.checkedCategory[0]
        }
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