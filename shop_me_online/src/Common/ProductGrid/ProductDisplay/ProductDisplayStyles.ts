import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    product_container: {
        fontFamily: "Rubik",
        letterSpacing: "-0.5px"
    },

    product_img: {
        width: "100%",
        borderRadius: "15px",
        aspectRatio: "1.3 / 1",
        cursor: "pointer",
        transitionDuration: "0.4s",
        '&:hover': {
            transform: "scale(1.1)"
        }
    },

    product_details: {
        display: "flex",
        justifyContent: "space-between",
        padding: "0px 5px 0px 5px"
    },

    product_price: {
        paddingLeft: "5px",
        marginTop: "-5px"
    },

    out_of_stock_text: {
        color: "red",
        marginTop: "-5px"
    }
});

export default useStyles;