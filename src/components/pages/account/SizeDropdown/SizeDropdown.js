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

const SizeDropdown = ({catObj}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null)
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
        </div>
    );
};

export default SizeDropdown;