import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    header_container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 7.5% 0px 7.5%",
        borderBottom: "1px solid lightgray"
    },

    site_name: {
        fontSize: "xx-large",
        fontFamily: "'Bebas Neue', cursive",
        '&:hover':  {
            cursor: 'pointer'
        }
    }
});

export default useStyles;