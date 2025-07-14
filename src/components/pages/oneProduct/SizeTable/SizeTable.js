import React, {useEffect, useState} from 'react';
import s from './SizeTable.module.css'
import {Modal} from "react-bootstrap";
import close from '@/static/icons/x-lg.svg'
import Image from "next/image";

const SizeTable = ({tables, photo}) => {
    const [show, setShow] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1000) {
            setIsDesktop(false)
        }
    }, [isDesktop])
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
            for (const tableKey in table) {
                rowsNameTr.push(
                    <td className={s.td}>{tableKey}</td>
                )
            }
        }
        const sizeRowsTr = <tr className={s.first_row}>{rowsNameTr}</tr>
        sizeRowsArr.push(sizeRowsTr)
        const sizesArr = Object.entries(table).map(el => el[1])

        const newTable = transposeArray(table)
        console.group()
        console.log(tables)
        console.groupEnd()
        // return []
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
        if (tables.hasOwnProperty('main_regular_table') && Object.keys(tables.main_regular_table).length) {
            const table = renderTable(tables.main_regular_table)
            tablesArr.push({
                name: tables.main_regular_table.table_name,
                title: tables.main_regular_table.table_title,
                description: tables.main_regular_table.table_description,
                table: table
            })
        }
        if (tables.hasOwnProperty('main_measurements_table') && Object.keys(tables.main_measurements_table).length) {
            const table = renderTable(tables.main_measurements_table)
            tablesArr.push({
                name: tables.main_measurements_table.table_name,
                title: tables.main_measurements_table.table_title,
                description: tables.main_measurements_table.table_description,
                table: table
            })
        }
        if (tables.hasOwnProperty('tables_recommendations') && Object.keys(tables.tables_recommendations).length) {
            const table = renderTable(tables.tables_recommendations)
            tablesArr.push({
                name: tables.tables_recommendations.table_name,
                title: tables.tables_recommendations.table_title,
                description: tables.tables_recommendations.table_description,
                table: table
            })
        }
        if (tables.hasOwnProperty('default_table') && Object.keys(tables.default_table).length) {
            const table = renderTable(tables.default_table)
            tablesArr.push({
                name: tables.default_table.table_name,
                title: tables.default_table.table_title,
                description: tables.default_table.table_description,
                table: table
            })
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
                fullscreen={!isDesktop}
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