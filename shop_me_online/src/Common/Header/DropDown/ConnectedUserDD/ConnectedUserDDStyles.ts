import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
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