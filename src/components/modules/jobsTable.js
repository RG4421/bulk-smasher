import React from "react";
import PropTypes from 'prop-types'
import { useTable } from "react-table";
import '../../styles/table.css';

const JobsTable = ({ tableData }) => {

    const data = tableData
    const columns = [
        {
            Header: "Date",
            accessor: "date",
        },
        {
            Header: "ID",
            accessor: "_id"
        },
        {
            Header: "Operator Type",
            accessor: "operatorType"
        },
        {
            Header: "Operator Name",
            accessor: "selectValue"
        },
        {
            Header: "File Size",
            accessor: "fileSize"
        },
        {
            Header: "Status",
            accessor: "status"
        },
    ]

    const tableInstance = useTable({
        columns,
        data
    })

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow
    } = tableInstance

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
};

JobsTable.propTypes = {
    tableData: PropTypes.array.isRequired
}

export default JobsTable