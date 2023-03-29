import React from 'react'
import useStyles from './RegisterStyles';

//components
import { Header } from "../../Common/Header/Header";
import { RegisterForm } from './RegisterForm/RegisterForm';

interface MyProps {
    is_manager: boolean
}

const Register: React.FC<MyProps> = ({ is_manager }) => {
    //styles
    const { classes } = useStyles();
    
    return (
        <div>
            <Header />

            <div className={classes.register_form}>
                <h1 className={classes.headline}>
                    {is_manager ? "Become a manager" : "Create an account"}
                </h1>

                <RegisterForm is_manager={is_manager} />
            </div>
        </div>
    );
}

export default Register;
