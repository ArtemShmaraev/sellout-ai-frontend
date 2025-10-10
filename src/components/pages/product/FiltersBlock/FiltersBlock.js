import React, {useContext, useEffect, useState} from 'react';
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
        changeQuery(query, 'material', filterStore.checkedMaterials)
        changeQuery(query, 'is_fast_ship', filterStore.checkedFastShip)
        changeQuery(query, 'is_sale', filterStore.checkedSale)
        changeQuery(query, 'q', filterStore.QActive)
        query.page = 1
        router.push({pathname, query}, undefined, {scroll: false})
    }
    const addSpacesToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    const renderPrice = () => {
        let content = []
        const query = router.query
        if (query.price_min) {
            content.push(`От ${addSpacesToNumber(query.price_min)} ₽`)
        }
        if (query.price_max) {
            content.push(`до ${addSpacesToNumber(query.price_max)} ₽`)
        }
        return (
            <div className={s.border}>
                {content.join(' ')}
                <span className={s.cross}>
                        <Image src={close} alt=''
                               onClick={() => {
                                   clearPrice()
                               }}
                        />
                </span>
            </div>
        )
    }
    const clearPrice = () => {
        filterStore.setPriceFrom('')
        filterStore.setPriceTo('')
        const query = router.query
        if (query.price_min) {
            delete query.price_min
        }
        if (query.price_max) {
            delete query.price_max
        }
        const {pathname} = router
        router.push({pathname, query}, undefined, {scroll: false})
    }
    const [showPrice, setShowPrice] = useState(false)
    useEffect(() => {
        const {query} = router
        if (query.price_min || query.price_max) {
            setShowPrice(true)
        } else {
            setShowPrice(false)
        }
    }, [router.asPath])
    return (
        <ScrollableBlock2>
            {
                showPrice &&
                renderPrice()
            }
            {filterStore.activeFilters.map(el => {
                if (el.query !== "M" && el.query !== "F" && el.query !== "K") {
                    return (
                        <div className={s.border}>
                            {el.hasOwnProperty('viewName') ? el.viewName : el.text}
                            <span className={s.cross}>
                                <Image
                                    src={close}
                                    alt=''
                                    onClick={() => {
                                        filterStore.toggleFilter(el);
                                        reloadPage();
                                    }}
                                />
                            </span>
                        </div>
                    );
                }
                return null; // Если условие не выполняется, возвращаем null или другой пустой элемент
            })}
        </ScrollableBlock2>
    );
};

export default observer(FiltersBlock);