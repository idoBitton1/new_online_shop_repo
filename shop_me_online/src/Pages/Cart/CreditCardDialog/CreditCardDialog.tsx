import React from "react";
import useStyles from "./CreditCardDialogStyles";

//components
import { CreditCardForm } from "../../../Components/Forms/CreditCardForm";

//material-ui
import { Dialog, DialogTitle, Typography, DialogContent } from "@mui/material";

interface MyProps {
    open_credit_card: boolean,
    toggleCreditCardDialog: () => void,
    setHasCreditCard: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreditCardDialog: React.FC<MyProps> = ({open_credit_card, setHasCreditCard, toggleCreditCardDialog}) => {
    //styles
    const { classes } = useStyles();

    return (
        <Dialog open={open_credit_card} onClose={toggleCreditCardDialog} fullWidth>
            <DialogTitle>
                <Typography gutterBottom className={classes.main_headline}>
                    Add credit card
                </Typography>
            </DialogTitle>

            <DialogContent>
                <p className={classes.secondary_headline}>
                    seems like you dont have a credit card set...
                </p>
                <CreditCardForm 
                toggleDialog={toggleCreditCardDialog}
                setHasCreditCard={setHasCreditCard}
                />
            </DialogContent>
        </Dialog>
    );
}