import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    category_icon: {
        fontSize: "30px"
    },

    navigation_bar: {
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "Rubik",
        margin: "15px 7% 15px 7%"
    },

    filter_btns: {
        display: "flex"
    },

    category_style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textTransform: "none", 
        marginLeft: 3, 
        fontFamily: "Rubik",
        '&.active': {
            color: "black"
        },
        '&.inactive': {
            color: "gray"
        }
    },

    filter_btn: {
        fontSize: 17,
        fontFamily: "Rubik",
        height: "fit-content",
        padding: "10px",
        marginTop: "5px",
        marginLeft: "5px",
        backgroundColor: "#fff",
        transitionDuration: "0.4s",
        '&:hover': {
            cursor: "pointer",
            backgroundColor: "rgb(225, 225, 225)"
        }
    },

    filter_btn_icon: {
        fontSize: 17
    }
});

export default useStyles;