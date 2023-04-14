import React, { useState } from "react";
import useStyles from "./TransactionsTableStyles";

//apollo and graphql
import { useQuery } from "@apollo/client";
import { _GET_TRANSACTIONS } from "../../../Queries/Queries";

//material ui
import { DataGrid, GridColDef } from '@mui/x-data-grid';

//interface
import { TransactionSecondType } from "../../Home/Home";

interface MyProps {
    setSelectedTransactions: React.Dispatch<React.SetStateAction<TransactionSecondType[]>>
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'address', headerName: 'Address', width: 130 },
    {
      field: 'ordering_time',
      headerName: 'Ordering time',
      width: 110
    },
    {
        field: 'sum',
        headerName: 'ordered_items',
        width: 120
    }
];

export const TransactionsTable: React.FC<MyProps> = ({setSelectedTransactions}) => {
    //styles
    const { classes } = useStyles();

    //states
    const [transactions, setTransactions] = useState<TransactionSecondType[]>([]);
    
    //queries
    useQuery(_GET_TRANSACTIONS, {
        fetchPolicy: "network-only",
        onCompleted(data) {
            let temp: TransactionSecondType[] = convertType(data.getTransactions.nodes);

            temp = temp.map((item) => {
                return {
                    ...item,
                    ordering_time: item.ordering_time.slice(0, -9)
                }
            });

            setTransactions([...temp]);
        }
    });

    const convertType = (objects: any[]): TransactionSecondType[] => {
        const original = objects;
        let all_transactions: TransactionSecondType[] = [];
        original.map((object: any) => all_transactions.push({
            id: object.id,
            address: object.address,
            ordering_time: object.orderingTime,
            sum: object.sum
        }));

        return all_transactions;
    }

    return (
        <div className={classes.transaction_table_container}>
            <p className={classes.table_name}>Select transactions to ship:</p>
            
            <div className={classes.table}>
            <DataGrid
            rows={transactions}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRowsData = transactions.filter((row) =>
                    selectedIDs.has(row.id)
                );

                setSelectedTransactions(selectedRowsData);
            }}
            />
            </div>
        </div>
    );
}