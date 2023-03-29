import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    cvc: {
        marginLeft: "7.6%"
    },

    add_card_btn: {
        textTransform: "none", 
        fontWeight: "bold", 
        fontSize: 17, 
        marginTop: 1
    },

    err_text: {
        marginTop: 2,
        fontFamily: "Rubik",
        color: "red",
        '&.active': {
            color: "green"
        },
        '&.inactive': {
            color: "red"
        }
    }
});

export default useStyles;