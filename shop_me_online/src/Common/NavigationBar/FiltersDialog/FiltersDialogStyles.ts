import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    main_headline: {
        fontSize: 25,
        borderBottom: "1px solid lightgray"
    },

    color_select: {
        width: 150, 
        marginRight: 3
    },

    icon: {
        marginLeft: "auto", 
        marginBottom: -5
    },

    season_select: {
        width: 120
    },

    filter_btn: {
        textTransform: "none", 
        fontWeight: "bold"
    }
});

export default useStyles;