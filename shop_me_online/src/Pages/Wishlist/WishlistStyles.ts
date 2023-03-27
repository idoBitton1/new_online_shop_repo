import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    wishlist_container: {
        textAlign: "center"
    },

    wishlist_context: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    headline: {
        fontFamily: "Arial"
    }
});

export default useStyles;