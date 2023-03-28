import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    profile_container: {
        textAlign: "center"
    },

    headline: {
        fontFamily: "Arial"
    },

    profile_context: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
});

export default useStyles;