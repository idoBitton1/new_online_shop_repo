import React from "react";
import useStyles from "./DisplayColumnStyles";

//components
import { DisplayCell } from "../../../../Common/DisplayCell/DisplayCell";

interface MyProps {
    column_values: string[] | number[]
}

export const DisplayColumn: React.FC<MyProps> = ({column_values}) => {
    //styles
    const { classes } = useStyles();

    return (
        <div className={classes.display_flex_column}>
            {
                column_values !== undefined
                ?
                column_values.map((value, i) => <DisplayCell text={value} key={i} />)
                :
                <></>
            }
        </div>
    );
}