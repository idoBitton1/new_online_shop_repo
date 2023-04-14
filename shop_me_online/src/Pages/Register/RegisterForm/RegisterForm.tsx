import React, { useEffect } from "react";
import useStyles from "./RegisterFormStyles";
import { useNavigate } from "react-router-dom";
import * as uuid from 'uuid';

//form
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

//Apollo and graphql
import { useMutation } from "@apollo/client"
import { _CREATE_USER, _CHECK_REGISTER_INFORMATION } from "../../../Queries/Mutations";

//redux
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionsCreators } from '../../../state';

//material-ui
import { TextField, Button, Typography, InputAdornment } from '@mui/material';

//icons
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

interface MyProps {
    is_manager: boolean
}

export interface MyFormValues {
    first_name: string,
    last_name: string,
    password: string,
    address: string,
    email: string
}

export const RegisterForm: React.FC<MyProps> = ({ is_manager }) => {
    //styles
    const { classes } = useStyles();

    //navigation
    const navigate = useNavigate();

    //redux actions
    const dispatch = useDispatch();
    const { login } = bindActionCreators(actionsCreators, dispatch);

    //mutations
    const [checkRegisterInformation, { error: register_info_error }] = useMutation(_CHECK_REGISTER_INFORMATION);
    const [createUser, { error: register_error }] = useMutation(_CREATE_USER);

    //the initial values of the form
    const initial_values: MyFormValues = {
        first_name: "",
        last_name: "",
        password: "",
        address: "",
        email: ""
    };

    //validation schema for the form
    const validation_schema: any = Yup.object().shape({
        email: Yup.string().email().required("Required")
    });



    const onSubmit = async (values: MyFormValues) => {
        const { first_name, last_name, password, address, email } = values;
        let token;

        //create an id
        const my_id = uuid.v4();

        await checkRegisterInformation({
            variables: {
                first_name: first_name,
                last_name: last_name,
                password: password,
                address: address,
                is_manager: is_manager
            }
        });

        //if an error occured, return
        if (register_info_error) {
            return;
        }

        //get the token
        const http_address = `http://localhost:8000/getToken?id=${my_id}&email=${email}&isManager=${is_manager}`;

        try {
            const response = await fetch(http_address);

            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }

            token = await response.json();

            localStorage.setItem("token", token);
            login(token);
          } 
          catch (error) {
            if (error instanceof Error) {
                console.log('error message: ', error.message);
            } else {
                console.log('unexpected error: ', error);
            }
        }      

        try {
            await createUser({
                variables: {
                    id: my_id,
                    first_name: first_name,
                    last_name: last_name,
                    password: password,
                    address: address,
                    email: email,
                    is_manager: is_manager,
                    token: token
                }
            });
        } catch (err: any) {
            console.error(err.message);
            return; //dont continue
        }

        //if registered successfully, navigate back to the home page
        navigate('/');
    }

    return (
        <Formik
            initialValues={initial_values}
            validationSchema={validation_schema}
            onSubmit={onSubmit}
        >
            {(props) => (
                <Form>
                    <Field as={TextField} name="first_name"
                        label="first name"
                        variant="outlined"
                        value={props.values.first_name}
                        onChange={props.handleChange}
                        margin="normal"
                        sx={{ marginRight: 1 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PermIdentityOutlinedIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                    <Field as={TextField} name="last_name"
                        label="last name"
                        variant="outlined"
                        value={props.values.last_name}
                        onChange={props.handleChange}
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PermIdentityOutlinedIcon />
                                </InputAdornment>
                            )
                        }}
                    />

                    <br />
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

                    <br />
                    {
                        is_manager
                            ?
                            <></>
                            :
                            <Field as={TextField} name="address"
                                label="address"
                                variant="outlined"
                                value={props.values.address}
                                onChange={props.handleChange}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HomeOutlinedIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                    }

                    {is_manager ? <></> : <br />}
                    <br />
                    <h3 className={classes.sub_text} onClick={() => navigate('/login')}>
                        already have an account?
                    </h3>

                    <br />
                    <Button type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.register_btn}>
                        Register
                    </Button>

                    <Typography className={classes.err_text}>
                        {register_info_error ? register_info_error.message : ""}
                    </Typography>

                    <Typography className={classes.err_text}>
                        {register_error ? register_error.message : ""}
                    </Typography>
                </Form>
            )}
        </Formik>

    );
}