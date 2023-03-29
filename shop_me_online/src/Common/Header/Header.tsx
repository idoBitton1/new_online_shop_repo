import React from "react";
import useStyles from "./HeaderStyles";
import { useNavigate } from "react-router-dom";

//components
import { DropDown } from "./DropDown/DropDown";

export const Header = () => {
    //styles
    const { classes } = useStyles();

    //navigate
    const navigate = useNavigate();

    return (
        <header className={classes.header_container}>
            <p className={classes.site_name} onClick={() => navigate('/')}>
                shop me online
            </p>
            <DropDown />
        </header>
    )
}