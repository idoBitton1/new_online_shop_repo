import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    results_container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "30px"
    },

    display_flex: {
        display: "flex"
    },

    total_cost_text: {
        fontFamily: "Rubik"
    },

    confirm_btn: {
        textAlign: "center",
        marginBottom: "50px"
    }
});

export default useStyles;