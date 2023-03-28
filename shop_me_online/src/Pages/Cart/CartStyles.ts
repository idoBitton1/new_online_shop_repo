import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    cart_container: {
        textAlign: "center"
    },

    headline: {
        fontFamily: "Arial"
    },

    cart_context: {
        display: "flex",
        paddingLeft: "7%",
        paddingRight: "15%",
        textAlign: "left",
        fontFamily: "Rubik"
    },

    summary_container: {
        width: "250px",
        height: "200px"
    },

    summary_text: {
        fontWeight: "bold"
    },

    summary_field: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "-10px"
    },

    total_field: {
        display: "flex",
        justifyContent: "space-between",
        borderTop: "1px solid lightgray"
    },

    payment_succeeded: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "lightgreen",
        border: "3px solid green",
        width: "250px",
        height: "100px",
        borderRadius: "10px",
        marginTop: "30px",
        marginLeft: "-13px",
        padding: "10px"
    },

    success_icon: {
        color: "green",
        fontSize: 40
    },

    success_text: {
        color: "green"
    },

    cart_items: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    error_text: {
        color: "red",
        fontFamily: "Rubik"
    }
});

export default useStyles;