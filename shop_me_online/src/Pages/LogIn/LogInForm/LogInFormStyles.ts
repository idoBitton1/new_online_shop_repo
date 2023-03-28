import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    sub_text: {
        color: "gray",
        fontFamily: "Rubik",
        '&:hover':  {
            cursor: 'pointer'
        }
    },

    login_btn: {
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