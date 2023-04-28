import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    products_grid: {
        display: "grid",
        gap: "2rem",
        gridTemplateColumns: "repeat(4, minmax(15rem, 1fr))",
        padding: "10px",
        margin: "0px 6% 0px 6%"
    }
});

export default useStyles;