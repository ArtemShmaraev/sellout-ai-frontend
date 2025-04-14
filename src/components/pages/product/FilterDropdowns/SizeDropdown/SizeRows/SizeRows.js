import React, {useContext, useEffect, useRef, useState} from 'react';
import {useRouter} from "next/router";
import s from './SizeRows.module.css'
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import SizeBtn from "@/components/pages/product/FilterDropdowns/SizeDropdown/SizeBtn/SizeBtn";
import eu from "@/static/icons/countries/eu.svg";
import ru from "@/static/icons/countries/ru.svg";
import us from "@/static/icons/countries/us.svg";
import uk from "@/static/icons/countries/uk.svg";
import jp from "@/static/icons/countries/jp.svg";
import cn from "@/static/icons/countries/cn.svg";
import int from "@/static/icons/countries/int.svg";
import fr from "@/static/icons/countries/fr.svg";
import it from "@/static/icons/countries/it.svg";
import size from "@/static/icons/countries/size.svg";
import {Context} from "@/context/AppWrapper";
import Image from "next/image";
import {observer} from "mobx-react-lite";

const SizeRows = ({catObj, cat}) => {
    const router = useRouter()
    const {filterStore} = useContext(Context)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null)
    const [icon, setIcon] = useState(null)
    const flags = {
        EU: eu,
        RU: ru,
        US: us,
        UK: uk,
        JP: jp,
        CN: cn,
        INT: int,
        FR: fr,
        IT: it,
        SIZE: size
    }
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const dropdownRef  = useRef(null)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    useEffect(() => {
        for (const rowKey in catObj) {
            const row = catObj[rowKey]
            for (const sizeKey in row) {
                if (row[sizeKey].isMain) {
                    setSelectedRow(rowKey)
                    setIcon(row[sizeKey].logo)
                    break
                }
            }
        }
    }, [])
    const toggleRef  = useRef(null)
    const rowToggle = () => {
        if (!isOpen) setDropdownWidth(toggleRef.current.offsetWidth);
        setIsOpen(!isOpen)
    }
    const [dropdownWidth, setDropdownWidth] = useState(0);
    const getRows = () => {
        const arr = []
        for (const rowKey in catObj) {
            let row = catObj[rowKey]
            let icon
            for (const sizeKey in row) {
                icon = row[sizeKey].logo
                break
            }
            arr.push(

                <div
                    className={s.row_item}
                    style={{width: dropdownWidth}}
                >
                    <div className={s.row_text} onClick={(e) => {
                        e.stopPropagation()
                        setSelectedRow(rowKey)
                        setIsOpen(false)
                        setIcon(icon)
                    }}>
                        <Image src={flags[icon]} alt='' width={25} className={s.icon}/>
                        {rowKey}
                    </div>
                </div>
            )
        }
        return arr
    }
    const checkSize = (size) => {
        filterStore.toggleFilter(size)
        reloadPage()
    }
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
        changeQuery(query, 'size', filterStore.checkedSize)
        query.page = 1
        router.push({pathname, query}, undefined, {scroll: false})
    }
    return (
        <div style={{marginLeft: '15px'}}>
            <div className={s.row_dropdown}
                 style={isOpen ? {borderRadius: '7px 7px 0 0'} : {borderRadius: '7px'}}
                 ref={dropdownRef}
            >
                <div
                    onClick={() => rowToggle()}
                    className={s.row_toggle}
                    ref={toggleRef}
                >
                    <div className={s.dropdown_toggle_text}>
                        <div className={'d-flex align-items-center'}>
                            <Image src={flags[icon]} alt='' width={25} className={s.icon}/>
                            {selectedRow || 'Выберите ряд'}
                        </div>
                        <Arrow isOpen={isOpen}/>
                    </div>
                </div>
            </div>
            {isOpen &&
                <div>
                    <div className={s.row_block}>
                        {
                            getRows()
                        }
                    </div>
                </div>
            }
            {selectedRow &&
                <div className={s.btn_block}>
                    {
                        filterStore.getSizes(cat, selectedRow).map(size =>
                            <SizeBtn
                                text={size.text}
                                query={size.query}
                                state={size.state}
                                onClick={() => checkSize(size)}
                            />
                        )
                    }
                </div>
            }
        </div>
    );
};

export default observer(SizeRows);