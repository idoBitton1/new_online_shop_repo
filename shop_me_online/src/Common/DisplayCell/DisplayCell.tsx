import React from "react";
import useStyles from "./DisplayCellStyles";

interface MyProps {
    text: string | number
}

export const DisplayCell: React.FC<MyProps> = ({text}) => {
    //styles
    const { classes } = useStyles();

    return (
        <div className={classes.cell}>
            {text}
        </div>
    );
}