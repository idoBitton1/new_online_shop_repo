import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    transaction_table_container: {
        height: "400px",
        marginLeft: "10%",
        marginRight: "100px"
    },

    table_name: {
        fontFamily: "Rubik",
        fontSize: "larger"
    },

    table: {
        height: 371, 
        width: 720, 
        margin: 'auto'
    }
});

export default useStyles;