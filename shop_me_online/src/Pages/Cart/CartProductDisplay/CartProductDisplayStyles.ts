import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    cart_product_container: {
        display: "flex",
        height: "230px",
        marginTop: "13px",
        marginLeft: "20%",
        borderBottom: "1px solid lightgray"
    },

    product_info_section: {
        display: "flex",
        textAlign: "left"
    },

    product_info: {
        display: "flex", 
        flexDirection: "column"
    },

    product_img: {
        width: "250px",
        marginRight: "20px"
    },

    product_name: {
        fontWeight: "bold",
        marginBottom: "-5px"
    },

    order_info: {
        width: "450px",
        marginLeft: "70px"
    },

    order_info_headline: {
        fontWeight: "bold",
        marginBottom: "-10px"
    },

    product_property: {
        display: "flex"
    },

    product_property_select: {
        marginTop: 0.5
    },

    change_text: {
        marginLeft: "10px",
        marginRight: "10px",
        textDecoration: "underline",
        '&:hover':  {
            cursor: 'pointer'
        }
    },

    error_text: {
        color: "red"
    },
    
    delete_btn: {
        backgroundColor: "white",
        border: "none",
        alignSelf: "flex-start",
        '&:hover':  {
            cursor: 'pointer'
        }
    }
});

export default useStyles;