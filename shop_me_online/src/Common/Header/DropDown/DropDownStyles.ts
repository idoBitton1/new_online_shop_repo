import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    dropdown_btn: {
        borderWidth: "1px",
        borderRadius: "30px",
        display: "inline-block",
        backgroundColor: "#fff",
        cursor: "pointer",
        transitionDuration: "0.4s",
        '&:hover':  {
            backgroundColor: "rgb(225, 225, 225)",
            boxShadow: "0px 3px 5px 0 rgba(62, 62, 62, 0.30)"
        }
    },

    icon: {
        fontSize: 40
    },

    dropdown_menu: {
        position: "absolute",
        top: "90px",
        right: "105px",
        color: "gray",
        backgroundColor: "#fff",
        boxShadow: "0px 3px 5px 0 rgba(62, 62, 62, 0.30)",
        borderRadius: "20px",
        padding: "10px 20px",
        width: "250px",
        fontFamily: "Rubik",
        '&::before':  {
            content: '""',
            position: "absolute",
            top: "-5px",
            right: "20px",
            height: "20px",
            width: "20px",
            background: "#fff",
            transform: "rotate(45deg)"
        },
        '&.active': {
            opacity: 1,
            visibility: "visible",
            transform: "translateY(0)",
            transition: "500ms ease"
        },
        '&.inactive': {
            opacity: 0,
            visibility: "hidden",
            transform: "translateY(-20px)",
            transition: "500ms ease"
        },
        '& ul li': {
            padding: "10px 0",
            borderTop: "1px solid rgba(0, 0, 0, 0.05)",
            listStyle: "none",
            '&:hover a': {
                color: "black",
                cursor: "pointer"
            }
        },
        '& h3': {
            textDecoration: "none",
            fontWeight: "normal",
            fontSize: "medium",
            marginTop: "0px",
            marginBottom: "-5px"
        }
    },

    dropdown_item: {
        display: "flex",
        margin: "10px auto",
        '& h3': {
            maxWidth: "150px",
            marginLeft: "10px",
            transition: "500ms",
            '&:hover': {
                cursor: "pointer"
            }
        }
    },

    dropdown_item_icon: {
        maxWidth: "20px",
        marginRight: "10px",
        marginTop: "2px",
        opacity: 1,
        transition: "500ms",
        '&:hover': {
            cursor: "pointer"
        }
    }
});

export default useStyles;