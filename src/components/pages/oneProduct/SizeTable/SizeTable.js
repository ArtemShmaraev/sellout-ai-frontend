import React, {useEffect, useState} from 'react';
import s from './SizeTable.module.css'
import {Modal} from "react-bootstrap";
import close from '@/static/icons/x-lg.svg'
import Image from "next/image";

const SizeTable = ({tables}) => {
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
    const renderTable = (table) => {
        const sizeRowsArr = []
        const rowsNameTr = []
        for (const tableKey in table) {
            rowsNameTr.push(
                <td className={s.td}>{tableKey}</td>
            )
        }
        const sizeRowsTr = <tr>{rowsNameTr}</tr>
        sizeRowsArr.push(sizeRowsTr)
        const sizesArr = Object.values(table)

        const newTable = transposeArray(sizesArr)

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
        if (tables.hasOwnProperty('main_regular_table')) {
            const table = renderTable(tables.main_regular_table)
            tablesArr.push(table)
        }
        if (tables.hasOwnProperty('main_measurements_table')) {
            const table = renderTable(tables.main_measurements_table)
            tablesArr.push(table)
        }
        if (tables.hasOwnProperty('tables_recommendations')) {
            const table = renderTable(tables.tables_recommendations)
            tablesArr.push(table)
        }
        if (tables.hasOwnProperty('default_table')) {
            const table = renderTable(tables.default_table)
            tablesArr.push(table)
        }
        return tablesArr
    }
    return (
        <>
            <button
                className={s.toggle_btn}
                onClick={handleShow}
            >
                Размерная сетка
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
                    <div className={s.header}>Jordan</div>
                    <div className={s.header}>Сбер молодцы</div>
                    <div className={s.table_block}>
                        {
                            allTables()
                        }
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
};

export default SizeTable;