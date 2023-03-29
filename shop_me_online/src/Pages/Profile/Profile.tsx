import React from "react";
import useStyles from "./ProfileStyles";

//components
import { Header } from "../../Common/Header/Header";
import { ProfileForm } from "./ProfileForm/ProfileForm";

const Profile = () => {
    //styles
    const { classes } = useStyles();

    return (
        <div className={classes.profile_container}>
            <Header />

            <h1 className={classes.headline}>Profile</h1>

            <div className={classes.profile_context}>
                <ProfileForm />
            </div>
        </div>
    );
}

export default Profile;