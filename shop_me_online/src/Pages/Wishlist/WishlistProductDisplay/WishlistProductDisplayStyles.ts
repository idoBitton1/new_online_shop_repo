import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    wishlist_product_container: {
        display: "flex",
        height: "230px",
        width: "1000px",
        marginTop: "13px",
        fontFamily: "Rubik",
        justifyContent: "space-between",
        borderBottom: "1px solid lightgray"
    },

    product_left_section: {
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

    delete_btn: {
        backgroundColor: "white",
        border: "none"
    }
});

export default useStyles;