import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    ship_orders_container: {
        textAlign: "center"
    },

    headline: {
        fontFamily: "Arial"
    },

    ship_orders_context: {
        display: "flex",
        flexDirection: "column"
    },

    tables: {
        display: "flex"
    },

    show_result_btn: {
        width: "fit-content", 
        alignSelf: "center", 
        marginTop: "5%"
    }
});

export default useStyles;