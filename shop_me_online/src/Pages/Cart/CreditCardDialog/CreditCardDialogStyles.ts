import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    main_headline: {
        fontSize: 25,
        borderBottom: "1px solid lightgray"
    },

    secondary_headline: {
        fontFamily: "Rubik", 
        marginTop: -1
    }
});

export default useStyles;