import React from "react"
import useStyles from "./LogInStyles";

//components
import { Header } from '../../Components/Header/Header';
import { LogInForm } from "./LogInForm/LogInForm";

const LogIn = () => {
    //styles
    const { classes } = useStyles();

    return (
        <div>
            <Header />

            <div className={classes.login_form}>
                <h1 className={classes.headline}> Welcome back </h1>
                <LogInForm />
            </div>
        </div>
    );
}

export default LogIn;