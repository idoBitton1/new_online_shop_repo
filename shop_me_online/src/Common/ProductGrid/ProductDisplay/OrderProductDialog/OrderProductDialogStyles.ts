import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    main_headline: {
        fontSize: 25,
        borderBottom: "1px solid lightgray"
    },

    buying_container: {
        display: "flex"
    },

    buying_img: {
        width: "290px",
        height: "250px",
        marginRight: "20px"
    },

    buying_info: {
        display: "flex",
        flexDirection: "column",
        fontFamily: "Rubik"
    },
    
    select_amount: {
        display: "flex",
        alignItems: "center"
    },

    select_amount_dd: {
        marginLeft: 10       
    },

    select_size: {
        marginBottom: 20
    },

    btns_row: {
        display: "flex"
    },

    add_to_cart_btn: {
        textTransform: "none", 
        marginRight: 1, 
        fontWeight: "bold"
    },

    add_to_wishlist_btn: {
        textTransform: "none", 
        fontWeight: "bold"
    },

    error_text: {
        color: "red",
        fontFamily: "Rubik"
    }
});

export default useStyles;