import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    login_form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    headline: {
        fontFamily: "Arial"
    }
});

export default useStyles;