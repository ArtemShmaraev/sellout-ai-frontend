import React, {useContext, useEffect, useState} from 'react';
import s from './SizeTable.module.css'
import {Modal} from "react-bootstrap";
import close from '@/static/icons/x-lg.svg'
import Image from "next/image";
import {Context} from "@/context/AppWrapper";

const SizeTable = ({tables, photo}) => {
    const [show, setShow] = useState(false);
    const {desktopStore} = useContext(Context)

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };
    function transposeArray(arr) {
        if (!Array.isArray(arr) || arr.length === 0) {
            return [];
        }

        const numRows = arr.length;
        const maxNumCols = Math.max(...arr.map(row => row.length));

        const result = [];

        for (let col = 0; col < maxNumCols; col++) {
            const transposedRow = [];
            for (let row = 0; row < numRows; row++) {
                transposedRow.push(arr[row][col] || ''); // Добавляем пустую строку, если элемент отсутствует
            }
            result.push(transposedRow);
        }

        return result;
    }
    const renderTable = (tableObj) => {
        let table = []
        if (tableObj.rows_order) {
            for (const el of tableObj.rows_order) {
                table.push(tableObj.values[el])
            }
        } else {
            table = Object.values(tableObj)
        }
        const sizeRowsArr = []
        let rowsNameTr = []

        if (tableObj.rows_order) {
            tableObj.rows_order.forEach(tableKey => {
                rowsNameTr.push(
                    <td className={s.td}>{tableKey}</td>
                )
            })
        } else {
            for (const tableKey in tableObj) {
                rowsNameTr.push(
                    <td className={s.td}>{tableKey}</td>
                )
            }
        }
        const sizeRowsTr = <tr className={s.first_row}>{rowsNameTr}</tr>
        sizeRowsArr.push(sizeRowsTr)

        const newTable = transposeArray(table)
        for (let i = 0; i < newTable.length; i++) {
            const trArr = []
            for (let j = 0; j < newTable[i].length; j++) {
                trArr.push(
                    <td className={s.td} width={5}>
                        {newTable[i][j]}
                    </td>
                )
            }
            sizeRowsArr.push(
                <tr className={i % 2 !== 1 ? s.tr_gray : ''}>
                    {trArr}
                </tr>
            )
        }
        return (
            <table width={'100%'} style={{marginBottom: 20}}>
                <tbody>
                {sizeRowsArr}
                </tbody>
            </table>
        )
    }

    const allTables = () => {
        const tablesArr = []
        const obj = {}
        if (Array.isArray(tables)){
            tables.forEach((table_json) => {
                const table = renderTable(table_json.table)
                tablesArr.push({
                    name: table_json.name,
                    title: table_json.title,
                    description: table_json.description,
                    table: table
                })

            });
        }
        else {
            const tables2 = tables.tables
            if (tables2.hasOwnProperty('main_regular_table') && Object.keys(tables2.main_regular_table).length) {
                const table = renderTable(tables2.main_regular_table)
                tablesArr.push({
                    name: tables2.main_regular_table.table_name,
                    title: tables2.main_regular_table.table_title,
                    description: tables2.main_regular_table.table_description,
                    table: table
                })
            }
            if (tables2.hasOwnProperty('main_measurements_table') && Object.keys(tables2.main_measurements_table).length) {
                const table = renderTable(tables2.main_measurements_table)
                tablesArr.push({
                    name: tables2.main_measurements_table.table_name,
                    title: tables2.main_measurements_table.table_title,
                    description: tables2.main_measurements_table.table_description,
                    table: table
                })
            }
            if (tables2.hasOwnProperty('tables_recommendations') && Object.keys(tables2.tables_recommendations).length) {
                const table = renderTable(tables2.tables_recommendations)
                tablesArr.push({
                    name: tables2.tables_recommendations.table_name,
                    title: tables2.tables_recommendations.table_title,
                    description: tables2.tables_recommendations.table_description,
                    table: table
                })
            }
            if (tables2.hasOwnProperty('default_table') && Object.keys(tables2.default_table).length) {
                const table = renderTable(tables2.default_table)
                tablesArr.push({
                    name: tables2.default_table.table_name,
                    title: tables2.default_table.table_title,
                    description: tables2.default_table.table_description,
                    table: table
                })
            }

        }

        return tablesArr
    }
    const [table, setTable] = useState(allTables()[0])
    return (
        <>
            <button
                className={s.toggle_btn}
                onClick={handleShow}
            >
                Таблица размеров
            </button>
            <Modal
                centered={true}
                show={show}
                onHide={handleClose}
                fullscreen={!desktopStore.isDesktop}
                dialogClassName={s.modal}
            >
                <Modal.Body>
                    <div className={s.close}>
                        <div className={s.header}>Таблица размеров</div>
                        <Image src={close} alt="" onClick={handleClose} style={{cursor: 'pointer'}}/>
                    </div>
                    <div className={s.info_block}>
                        <div className={s.img_cont}>
                            <Image src={photo} alt='' className={s.img} fill={true}
                            />
                        </div>
                        <div className={s.text_block}>
                            <div className={s.header}>{table.title}</div>
                            <div className={s.description}>{table.description}</div>
                            <div className={s.warning}>Советуем всегда перед покупкой писать в службу поддержки, и наши специалисты помогут определиться с размером!</div>
                        </div>
                    </div>
                    <div className={s.btns_block}>
                        {
                            allTables().map(el =>
                                <button className={s.btn}
                                        onClick={() => setTable(el)}
                                        style={el.name === table.name ?
                                            {borderColor: '#000', color: '#000'}
                                            :
                                            {borderColor: '#CCCCCC', color: '#CCCCCC'}}
                                >
                                    {el.name}
                                </button>
                            )
                        }
                    </div>
                    <div className={s.table_block}>
                        {
                            table?.table
                        }
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
};

export default SizeTable;