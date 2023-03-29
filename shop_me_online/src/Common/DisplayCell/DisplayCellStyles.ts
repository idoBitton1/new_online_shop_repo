import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    cell: {
        fontFamily: "Rubik",
        margin: "5px",
        width: "300px",
        height: "30px",
        overflow: "hidden",
        textAlign: "center",
        padding: "10px"
    }
});

export default useStyles;