import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    sub_text: {
        color: "gray",
        fontFamily: "Rubik",
        textDecoration: "none",
        fontWeight: "normal",
        fontSize: "medium",
        marginTop: "0px",
        marginBottom: "-5px",
        '&:hover':  {
            cursor: 'pointer'
        }
    },

    register_btn: {
        textTransform: "none", 
        fontWeight: "bold", 
        fontSize: 17, 
        marginTop: 1
    },

    err_text: {
        marginTop: 2,
        fontFamily: "Rubik",
        color: "red"
    }
});

export default useStyles;