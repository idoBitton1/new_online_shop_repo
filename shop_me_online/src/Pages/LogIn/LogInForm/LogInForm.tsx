import React, { useEffect } from "react";
import useStyles from "./LogInFormStyles";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

//form
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

//Apollo and graphql
import { useMutation } from "@apollo/client"
import { _LOGIN_USER } from "../../../Queries/Mutations";

//redux
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionsCreators } from '../../../state';

//material-ui
import { TextField, Button, Typography, InputAdornment } from '@mui/material';

//icons
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

interface MyFormValues {
    email: string,
    password: string
}

export const LogInForm = () => {
    //styles
    const { classes } = useStyles();

    //navigation
    const navigate = useNavigate();

    //redux actions
    const dispatch = useDispatch();
    const { login } = bindActionCreators(actionsCreators, dispatch);

    //mutations
    const [loginUser, { data, error }] = useMutation(_LOGIN_USER, {
        onCompleted: async(data) => {
            const data_path = data.loginUser.userData[0];

            const http_address = `http://localhost:8000/getToken?id=${data_path.id}&email=${data_path.email}&isManager=${data_path.isManager}`;

            try {
                const response = await fetch(http_address);
            
                if (!response.ok) {
                  throw new Error(`Error! status: ${response.status}`);
                }
      
                const result = await response.json();

                localStorage.setItem("token", result);
                login(result);
              } 
              catch (error) {
                if (error instanceof Error) {
                    console.log('error message: ', error.message);
                } else {
                    console.log('unexpected error: ', error);
                }
            }
        } //after logging, connect the user
    });

    
    //the initial values of the form
    const initial_values: MyFormValues = {
        email: "",
        password: ""
    };

    //the validation schema 
    const validation_schema: any = Yup.object().shape({
        email: Yup.string().email().required("Required")
    });

    //after submiting the form
    const onSubmit = async (values: MyFormValues) => {

        //login the user
        try {
            const { email, password } = values;

            await loginUser({
                variables: {
                    email: email,
                    password: password
                }
            });
        } catch (err: any) {
            console.error(err.message);
            return; //dont continue
        }

        //if logined successfully, navigate back to the home page
        navigate('/')
    }

    return (
        <Formik
            initialValues={initial_values}
            validationSchema={validation_schema}
            onSubmit={onSubmit}
        >
            {(props) => (
                <Form>
                    <Field as={TextField} name="email"
                        label="email"
                        variant="outlined"
                        type="email"
                        value={props.values.email}
                        onChange={props.handleChange}
                        margin="normal"
                        fullWidth
                        helperText={<ErrorMessage name="email" />}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailOutlinedIcon />
                              </InputAdornment>
                            )
                        }}
                    />

                    <Field as={TextField} name="password"
                        label="password"
                        variant="outlined"
                        type="password"
                        value={props.values.password}
                        onChange={props.handleChange}
                        margin="normal"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockOutlinedIcon />
                              </InputAdornment>
                            )
                        }}
                    />

                    <br />
                    <br />
                    <h3 className={classes.sub_text} onClick={() => navigate('/register')}>
                        don't have an account?
                    </h3>
                    <br />
                    <h3 className={classes.sub_text} onClick={() => navigate('/registerManager')}>
                        become a manager
                    </h3>

                    <br />
                    <Button type="submit"
                        color="primary"
                        fullWidth
                        variant="contained"
                        className={classes.login_btn}>
                        Log in
                    </Button>
                    
                    <Typography className={classes.err_text}>
                        {error ? error.message : ""}
                    </Typography>
                </Form>
            )}
        </Formik>
    )
}