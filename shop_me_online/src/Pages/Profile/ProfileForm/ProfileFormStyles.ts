import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    credit_card_text: {
        display: "flex", 
        fontFamily: "Rubik",
        alignItems: "center",  
        textAlign: "left",     
        textDecoration: "none",
        fontWeight: "normal",
        fontSize: "medium",
        marginTop: "0px",
        marginBottom: "-5px",                 
        '&:hover':  {
            cursor: 'pointer'
        }
    },

    asterisk_text: {
        fontFamily: "Rubik",
        color: "GrayText", 
        textAlign: "left",
        textDecoration: "none",
        fontWeight: "normal",
        fontSize: "medium",
        marginTop: "0px",
        marginBottom: "-5px"
    },

    update_information_btn: {
        textTransform: "none", 
        fontWeight: "bold", 
        fontSize: 17, 
        marginTop: 1
    },

    err_text: {
        marginTop: 2,
        fontFamily: "Rubik",
        color: "red",
        textAlign: "left"
    }
});

export default useStyles;