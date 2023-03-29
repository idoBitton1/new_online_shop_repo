import React from "react";
import useStyles from "./DisconnectedUserDDStyles";
import { useNavigate } from "react-router-dom";

//icons
import { CiLogin } from 'react-icons/ci';
import { FiUserPlus } from 'react-icons/fi';

export const DisconnectedUserDD = () => {
    //styles
    const { classes } = useStyles();

    //navigate
    const navigate = useNavigate();

    return (
        <>
            <li className={classes.dropdown_item} onClick={() => navigate('/register')}>
                <FiUserPlus className={classes.dropdown_item_icon} />
                <h3 className={classes.register_text}>Register</h3>
            </li>
            <li className={classes.dropdown_item} onClick={() => navigate('/registerManager')}>
                <FiUserPlus className={classes.dropdown_item_icon} />
                <h3>Become a manager</h3>
            </li>
            <li className={classes.dropdown_item} onClick={() => navigate('/login')}>
                <CiLogin className={classes.dropdown_item_icon} />
                <h3>Log in</h3>
            </li>
        </>
    )
}