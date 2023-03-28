import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    main_headline: {
        fontSize: 25,
        borderBottom: "1px solid lightgray"
    },

    add_product_contex: {
        display: "flex",
        alignItems: "center"
    },

    product_img: {
        width: "290px",
        height: "250px",
        marginRight: "20px"
    },

    asterisk_text: {
        fontFamily: "Rubik"
    },

    product_info: {
        display: "flex",
        flexDirection: "column",
        fontFamily: "Rubik"
    },

    add_btn: {
        textTransform: "none", 
        fontWeight: "bold", 
        marginTop: 1
    },

    err_text: {
        marginTop: 2,
        fontFamily: "Rubik",
        color: "red"
    }
});

export default useStyles;