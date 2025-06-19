import {useContext, useState} from "react";
import s from './DropdownCategory.module.css'
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import CustomCheckbox from "@/components/shared/UI/CustoCheckbox/CustomCheckbox";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";

const DropdownCategory = ({ category, level = 0 , brand = false}) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState({});
    const {filterStore} = useContext(Context)
    const handleToggle = (key) => {
        setIsOpen((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
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
        changeQuery(query, 'category', filterStore.checkedCategory)
        changeQuery(query, 'line', filterStore.checkedLine)
        query.page = 1
        router.push({pathname, query}, undefined, {scroll: false})
    }
    const handleClick = (item) => {
        filterStore.toggleFilter(item)
        reloadPage()
    }
    const checkIsShow = (d) => {
        if (d.hasOwnProperty('is_show')) {
            return !d.is_show
        } else {
            for (const dKey in d) {
                return checkIsShow(d[dKey])
            }
        }
    }

    const renderCategory = (category, level) => {
        if (!category.hasOwnProperty('text')) {
            const dropdowns = [];
            for (const key in category) {
                if (!category[key].hasOwnProperty('text')) {
                    if (brand && checkIsShow(category[key])) {
                        continue
                    }
                    dropdowns.push(
                        <div key={key}>
                            <div onClick={() => handleToggle(key)}
                                 className={s.dropdown_toggle}
                            >
                                <div className={s.dropdown_toggle_text}>
                                    <div style={{ transform: `translateX(${15 * level}px)` }}>{key}</div>
                                    <Arrow isOpen={isOpen[key]}/>
                                </div>
                            </div>
                            {isOpen[key] && renderCategory(category[key], level + 1)}
                        </div>
                    );
                } else {
                    if (category[key].hasOwnProperty('is_show') && !category[key].is_show) {
                        continue
                    }
                    dropdowns.push(
                        <div className={s.dropdown_item}
                             onClick={() => handleClick(category[key])}
                        >
                            <div
                                key={key}
                                style={{ marginLeft: `${15 * level}px` }}
                                className={s.dropdown_item_text}
                            >
                                <CustomCheckbox labelText={category[key].text} checked={category[key].state}/>
                            </div>
                        </div>
                    );
                }
            }
            return dropdowns;
        }
        return (
            <div style={{ marginLeft: `${15 * level}px`, color: 'red' }}>
                {category.text}
            </div>
        );
    };
    const arr = renderCategory(category, level)
    if (brand) {
        const brand424 = arr.shift()
        arr.splice(12, 0, brand424)
    }

    return arr
};
export default observer(DropdownCategory)