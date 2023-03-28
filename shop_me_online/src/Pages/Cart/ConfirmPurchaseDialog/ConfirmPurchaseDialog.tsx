import React from "react";
import useStyles from "./ConfirmPurchaseDialogStyles";

//material-ui
import { Dialog, DialogTitle, Typography, DialogContent, Button } from "@mui/material";

interface MyProps {
    open_confirm: boolean,
    toggleConfirmDialog: () => void,
    handlePayment: () => Promise<void>
}

export const ConfirmPurchaseDialog: React.FC<MyProps> = ({open_confirm, toggleConfirmDialog, handlePayment}) => {
    //styles
    const { classes } = useStyles();

    return(
        <Dialog open={open_confirm} onClose={toggleConfirmDialog}>
            <DialogTitle>
                <Typography gutterBottom className={classes.headline}>
                    Confirm your purchase
                </Typography>
            </DialogTitle>

            <DialogContent>
                <div className={classes.buttons_row}>
                    <Button 
                    variant="outlined"
                    color="error"
                    onClick={toggleConfirmDialog}>
                        Cancel
                    </Button>

                    <Button 
                    variant="contained"
                    color="success"
                    onClick={handlePayment}>
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}