import React, {useContext} from 'react';
import s from "./Sale.module.css";
import CustomCheckbox from "@/components/shared/UI/CustoCheckbox/CustomCheckbox";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";

const Sale = () => {
    const {filterStore} = useContext(Context)
    const router = useRouter()
    const reloadPage = () => {
        const {pathname} = router
        const query = {...router.query}
        if (query.hasOwnProperty('is_sale')) {
            delete query.is_sale
        }
        if (filterStore.filters.is_sale.state) {
            query.is_sale = 'is_sale'
        }
        query.page = 1
        router.push({pathname, query}, undefined, {scroll: false})
    }
    const handleClick = () => {
        filterStore.toggleFilter(filterStore.filters.is_sale)
        reloadPage()
    }
    return (
        <div className={s.sale + ' d-flex align-items-center'}
             onClick={(e) => {
                 e.stopPropagation()
                 handleClick()
             }}
        >
            <CustomCheckbox
                labelText={'Скидка'}
                reversed={true}
                labelClass={s.text}
                spaceBetween={true}
                checked={filterStore.filters.is_sale.state}
            />
        </div>
    );
};

export default observer(Sale);