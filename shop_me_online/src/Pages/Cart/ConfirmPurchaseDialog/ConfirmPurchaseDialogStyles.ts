import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    headline: {
        fontSize: 25,
        borderBottom: "1px solid lightgray"
    },

    buttons_row: {
        display: "flex", 
        justifyContent: "space-between"
    }
});

export default useStyles;