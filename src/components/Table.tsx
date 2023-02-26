import { useTable } from "react-table";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { headerState } from "../atom/header";
import useModal from "../hooks/useModal";
import Create from "./Create";

interface TableProps {
    columns: any;
    data: any;
}

export function makeTextAlignTableHeader({
    align = "left",
    value,
    accessor,
}: {
    align?:
        | "start"
        | "end"
        | "left"
        | "right"
        | "center"
        | "justify"
        | "match-parent";
    value: string;
    accessor: string;
}) {
    return {
        Header: () => <p style={{ textAlign: align }}>{value}</p>,
        accessor,
    };
}

export default function Table({ columns, data }: TableProps) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data,
            initialState: {
                hiddenColumns: ["id"],
            },
        });

    return (
        <ListWrap>
            <CustomTable {...getTableProps()}>
                <thead>
                    {headerGroups.map((header) => (
                        <tr {...header.getHeaderGroupProps()}>
                            {header.headers.map((col) => {
                                return (
                                    <th {...col.getHeaderProps()}>
                                        {col.render("Header")}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </CustomTable>
        </ListWrap>
    );
}

const ListWrap = styled.div`
    padding: 5px;
    .list__header {
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
    }
    .list__content {
        display: flex;
        flex-direction: column;
        .list__row {
            display: inline-flex;
            justify-content: space-between;
        }
    }
`;

const CustomTable = styled.table`
    width: 100%;
    .right {
        text-align: right;
    }
    .update__btn {
        color: #0582ff;
    }
    border-collapse: collapse;
    tr {
        border-bottom: 1px solid #b7b7b7;
    }
`;
