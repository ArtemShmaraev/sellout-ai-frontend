import React, {useContext} from 'react';
import {Dropdown} from "react-bootstrap";
import SearchInput from "../SearchInput/SearchInput";
import CustomCheckbox from "../CustoCheckbox/CustomCheckbox";
import s from './ScrollableBDropdown.module.css'
import {observer} from "mobx-react-lite";
import {Context} from "@/context/AppWrapper";

const ScrollableBDropdown = ({toggleText, isSearch = false, data}) => {
    const {adminStore} = useContext(Context)
    const handleClick = (item) => {
        adminStore.click(data, item.name)
    }
    return (
        <Dropdown>
            <Dropdown.Toggle>{toggleText}</Dropdown.Toggle>
            <Dropdown.Menu className={s.dropdown_menu}>
                {/*{*/}
                {/*    isSearch &&*/}
                {/*    <Dropdown.Item onClick={(e) => e.preventDefault()}>*/}
                {/*        <SearchInput/>*/}
                {/*    </Dropdown.Item>*/}
                {/*}*/}
                {
                    data.map(el =>
                        <Dropdown.Item onClick={(e) => {
                            e.stopPropagation()
                            handleClick(el)
                        }} key={el.name}>
                            <CustomCheckbox labelText={el.name} checked={el.state}/>
                        </Dropdown.Item>
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default observer(ScrollableBDropdown);