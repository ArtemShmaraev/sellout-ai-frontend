import React, {useEffect, useRef, useState} from 'react';
import s from './SizeDropdown.module.css'
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
import Image from "next/image";
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import SizeBtn from "@/components/pages/product/FilterDropdowns/SizeDropdown/SizeBtn/SizeBtn";
import {sendSizeInfo} from "@/http/userApi";
import Cookies from "js-cookie";

const SizeDropdown = ({catObj, typeIsShoes, currSizeId}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null)
    const [rowId, setRowId] = useState(null)
    const [icon, setIcon] = useState(null)
    const [dropdownWidth, setDropdownWidth] = useState(0);
    const dropdownRef = useRef(null)
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
    useEffect(() => {
        const rowArr = catObj.size_rows
        rowArr.forEach(row => {
            if (row.is_main) {
                setRowId(row.id)
                setSelectedRow(row.filter_name)
                setIcon(row.filter_logo)
            }
        })
    }, [])
    const toggleRef = useRef(null)
    const rowToggle = () => {
        if (!isOpen) setDropdownWidth(toggleRef.current.offsetWidth);
        setIsOpen(!isOpen)
    }
    const getRows = () => {
        const arr = []
        const rowArr = catObj.size_rows
        rowArr.map(row => {
            arr.push(

                <div
                    className={s.row_item}
                    style={{width: dropdownWidth}}
                >
                    <div className={s.row_text} onClick={(e) => {
                        e.stopPropagation()
                        setRowId(row.id)
                        setSelectedRow(row.filter_name)
                        setIsOpen(false)
                        setIcon(row.filter_logo)
                    }}>
                        <Image src={flags[row.filter_logo]} alt='' width={25} className={s.icon}/>
                        {row.filter_name}
                    </div>
                </div>
            )
        })
        return arr
    }
    const [selectedBtnId, setSelectedBtnId] = useState(currSizeId)
    const getSizeBtns = () => {
        const res = []
        const sizeRowArr = catObj.size_rows
        for (let i = 0; i < sizeRowArr.length; i++) {
            if (sizeRowArr[i].filter_name === selectedRow) {
                const sizesArr = sizeRowArr[i].sizes
                sizesArr.forEach(size => {
                    if (size.size !== 'Один размер') {
                        res.push({
                            id: size.id[0],
                            text: size.size,
                        })
                    }
                })
                break
            }
        }
        return res
    }
    const selectSize = async (id) => {
        const token = Cookies.get('access_token')
        setSelectedBtnId(id)
        const obj = {}
        if (typeIsShoes) {
            obj.preferred_shoes_size_row = String(rowId)
            obj.shoes_size = id
        } else {
            obj.preferred_clothes_size_row = String(rowId)
            obj.clothes_size = id
        }
        const res = await sendSizeInfo(token, JSON.stringify(obj))
    }
    return (
        <div>
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
            {
                selectedRow &&
                getSizeBtns().map(el =>
                    <SizeBtn text={el.text}
                             onClick={() => selectSize(el.id)}
                             state={el.id == selectedBtnId}
                    />
                )
            }
        </div>
    );
};

export default SizeDropdown;