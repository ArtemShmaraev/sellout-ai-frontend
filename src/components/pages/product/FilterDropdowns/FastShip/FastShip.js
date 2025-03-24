import React, {useContext} from 'react';
import icon from '@/static/icons/truck.svg'
import s from './FastShip.module.css'
import CustomCheckbox from "@/components/shared/UI/CustoCheckbox/CustomCheckbox";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";

const FastShip = () => {
    const {filterStore} = useContext(Context)
    const router = useRouter()
    const reloadPage = () => {
        const {pathname} = router
        const query = {...router.query}
        if (query.hasOwnProperty('is_fast_ship')) {
            delete query.is_fast_ship
        }
        if (filterStore.filters.is_fast_ship.state) {
            query.is_fast_ship = 'is_fast_ship'
        }
        query.page = 1
        router.push({pathname, query}, undefined, {scroll: false})
    }
    const handleClick = () => {
        filterStore.toggleFilter(filterStore.filters.is_fast_ship)
        reloadPage()
    }
    return (
        <div className={s.sale}
             onClick={(e) => {
                 e.stopPropagation()
                 handleClick()
             }}
        >
            <CustomCheckbox
                labelText={'Мгновенная доставка'}
                reversed={true}
                labelClass={s.text}
                imgSrc={icon}
                spaceBetween={true}
                checked={filterStore.filters.is_fast_ship.state}
            />
        </div>
    );
};

export default observer(FastShip);