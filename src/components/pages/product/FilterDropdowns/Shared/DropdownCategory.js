import {useContext, useState} from "react";
import s from './DropdownCategory.module.css'
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import CustomCheckbox from "@/components/shared/UI/CustoCheckbox/CustomCheckbox";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";

const DropdownCategory = ({ category, level = 0 }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState({});
    const {filterStore} = useContext(Context)
    const handleToggle = (key) => {
        setIsOpen((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };
    const reloadPage = () => {
        const {pathname} = router
        const query = {...router.query}


        if (query.categories) {
            delete query.categories
        }
        if (filterStore.checkedCategory.length > 1) {
            query.categories = [...filterStore.checkedCategory]
        } else {
            query.categories = filterStore.checkedCategory[0]
        }


        if (query.lines) {
            delete query.lines
        }
        if (filterStore.checkedLine.length > 1) {
            query.lines = [...filterStore.checkedLine]
        } else {
            query.lines = filterStore.checkedLine[0]
        }


        query.page = 1
        router.push({pathname, query}, undefined, {scroll: false})
    }
    const handleClick = (item) => {
        filterStore.toggleFilter(item)
        reloadPage()
    }

    const renderCategory = (category, level) => {
        if (!category.hasOwnProperty('text')) {
            const dropdowns = [];
            for (const key in category) {
                if (!category[key].hasOwnProperty('text')) {
                    dropdowns.push(
                        <div key={key} style={{ marginLeft: `${15 * level}px` }}>
                            <div onClick={() => handleToggle(key)}
                                 className={s.dropdown_toggle}
                            >
                                <div className={s.dropdown_toggle_text}>
                                    {key}
                                    <Arrow isOpen={isOpen[key]}/>
                                </div>
                            </div>
                            {isOpen[key] && renderCategory(category[key], level + 1)}
                        </div>
                    );
                } else {
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

    return renderCategory(category, level);
};
export default observer(DropdownCategory)