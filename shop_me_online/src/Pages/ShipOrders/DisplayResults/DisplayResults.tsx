import React, { useState } from "react";
import useStyles from "./DisplayResultsStyles";

//Apollo and graphql
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../../../Queries/Mutations";

//components
import { DisplayCell } from "../../../Common/DisplayCell/DisplayCell";
import { DisplayColumn } from "./DisplayColumn/DisplayColumn";

//interface
import { Result, Warehouse } from "../ShipOrders";
import { TransactionSecondType } from "../../Home/Home";
import { Button } from "@mui/material";

interface MyProps extends Result {
    selected_transactions: TransactionSecondType[],
    selected_warehouses: Warehouse[]
}

export const DisplayResults: React.FC<MyProps> = ({result_matrix, total_cost, selected_transactions, selected_warehouses}) => {
    //styles
    const { classes } = useStyles();

    //states
    const [reduced_transactions, setReducedTransactions] = useState<TransactionSecondType[]>(
        selected_transactions.filter((transaction, i) => {
            return selected_transactions.indexOf(transaction) === i;
        })
    );

    //mutations
    const [deleteTransaction] = useMutation(DELETE_TRANSACTION);


    //delete the selected transactions 
    const handleConfirm = () => {
        selected_transactions.map((transaction) => {
            deleteTransaction({
                variables: {
                    transaction_id: transaction.id
                }
            });

            return transaction;
        });

        window.location.reload(); //refresh
    }

    return (
        <>
        <div className={classes.results_container}>
            <div className="result_table">
                <div className={classes.display_flex}>
                    <DisplayCell text={""} />
                    {selected_warehouses.map((warehouse, i) => <DisplayCell text={warehouse.name} key={i} />)}
                </div>

                <div className={classes.display_flex}>
                    <DisplayColumn column_values={reduced_transactions.map((transaction) => transaction.address)} />             
                    {
                        result_matrix.map((value, i) => {
                            return <DisplayColumn column_values={value} key={i} />
                        })
                    }
                </div>
            </div>

            <h2 className={classes.total_cost_text}>total cost: {total_cost}</h2>
        </div>

        <div className={classes.confirm_btn}>
            <Button
            variant="contained"
            onClick={handleConfirm}>
                Confirm
            </Button>
        </div>
        </>
    );
}