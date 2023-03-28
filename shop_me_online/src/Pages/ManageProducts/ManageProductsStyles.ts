import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    manage_products_container: {
        textAlign: "center"
    },

    headline: {
        fontFamily: "Arial"
    },

    add_button: {
        fontSize: "17px",
        fontFamily: "Rubik",
        height: "fit-content",
        padding: "10px",
        backgroundColor: "#fff",
        transitionDuration: "0.4s",
        '&:hover':  {
            cursor: 'pointer',
            backgroundColor: "rgb(225, 225, 225)"
        }
    }
});

export default useStyles;