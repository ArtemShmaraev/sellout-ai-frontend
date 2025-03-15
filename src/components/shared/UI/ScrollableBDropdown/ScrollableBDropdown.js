import React from 'react';
import {Dropdown} from "react-bootstrap";
import SearchInput from "../SearchInput/SearchInput";
import CustomCheckbox from "../CustoCheckbox/CustomCheckbox";
import s from './ScrollableBDropdown.module.css'

const ScrollableBDropdown = ({toggleText, isSearch = false}) => {
    return (
        <Dropdown>
            <Dropdown.Toggle>{toggleText}</Dropdown.Toggle>
            <Dropdown.Menu className={s.dropdown_menu}>
                {
                    isSearch &&
                    <Dropdown.Item onClick={(e) => e.preventDefault()}>
                        <SearchInput/>
                    </Dropdown.Item>
                }
                <Dropdown.Item onClick={(e) => e.stopPropagation()}>
                    <CustomCheckbox labelText={'Что-то'}/>
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => e.stopPropagation()}>
                    <CustomCheckbox labelText={'Что-то'}/>
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => e.stopPropagation()}>
                    <CustomCheckbox labelText={'Что-то'}/>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ScrollableBDropdown;