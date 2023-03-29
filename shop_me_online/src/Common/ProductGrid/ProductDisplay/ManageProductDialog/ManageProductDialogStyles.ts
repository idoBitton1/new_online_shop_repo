import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    main_headline: {
        fontSize: 25,
        borderBottom: "1px solid lightgray"
    },

    buying_container: {
        display: "flex"
    },

    image_section: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    product_img: {
        width: "290px",
        height: "250px",
        marginRight: "20px"
    },

    checkbox_row: {
        display: "flex"
    },

    checkbox_text: {
        fontFamily: "Rubik"
    },

    product_info: {
        display: "flex",
        flexDirection: "column",
        fontFamily: "Rubik"
    },

    update_btn: {
        textTransform: "none", 
        fontWeight: "bold", 
        marginTop: 15
    },

    err_text: {
        marginTop: 2,
        fontFamily: "Rubik",
        color: "red"
    },
});

export default useStyles;