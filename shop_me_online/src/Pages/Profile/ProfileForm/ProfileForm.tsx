import React, { useEffect, useState } from "react";
import useStyles from "./ProfileFormStyles";

//form
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

//Apollo and graphql
import { useQuery, useMutation } from "@apollo/client"
import { _GET_USER, _CHECK_FOR_CREDIT_CARD } from "../../../Queries/Queries";
import { _UPDATE_USER_INFORMATION, _REMOVE_CREDIT_CARD } from "../../../Queries/Mutations";

//redux
import { useSelector } from 'react-redux';
import { ReduxState } from "../../../state";

//components
import { CreditCardForm } from "../../../Common/CreditCardFrom/CreditCardForm";

//material-ui
import { TextField, Button, Typography, InputAdornment } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//icons
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

//interface
import { MyFormValues } from "../../Register/RegisterForm/RegisterForm";

export const ProfileForm = () => {
    //styles
    const { classes } = useStyles();

    //redux states
    const user = useSelector((redux_state: ReduxState) => redux_state.user);
    
    //states
    const [has_credit_card, setHasCreditCard] = useState<boolean>(false);
    const [is_manager, setIsManager] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    //queries
    const { data: user_data, refetch } = useQuery(_GET_USER, {
        variables: {
            id: user.token?.user_id
        },
        onCompleted(data) {
            setIsManager(data.userById.isManager);
        }
    });
    useQuery(_CHECK_FOR_CREDIT_CARD, {
        fetchPolicy: "network-only",
        variables: {
            id: user.token?.user_id
        },
        onCompleted(data) {
            setHasCreditCard(data.checkForCreditCard);
        },
    });

    //mutations
    const [updateUserInformation, { error }] = useMutation(_UPDATE_USER_INFORMATION);
    const [removeCreditCard] = useMutation(_REMOVE_CREDIT_CARD);

    //the initial values of the form to the user information
    const initial_values: MyFormValues ={
        first_name: user_data ? user_data.userById.firstName : "",
        last_name: user_data ? user_data.userById.lastName : "",
        password: user_data ? user_data.userById.password : "",
        address: user_data ? user_data.userById.address : "",
        email: user_data ? user_data.userById.email : ""
    }

    //cvalidation schema for the form
    const validation_schema: any = Yup.object().shape({
        first_name: Yup.string().required("Required"),
        last_name: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
        address: Yup.string(),
        email: Yup.string().email().required("Required")
    });



    const onSubmit = (values: MyFormValues) => {
        //update db        
        updateUserInformation({
            variables: {
                id: user.token?.user_id,
                first_name: values.first_name,
                last_name: values.last_name,
                password: values.password,
                address: is_manager ? "" : values.address,
                email: values.email
            }
        });

        refetch();
    }

    const handleCreditCardClick = () => {
        toggleDialog();
    }

    const handleRemoveCreditCardClick = () => {
        //set to dont have credit card
        setHasCreditCard(false);

        //remove from the db
        removeCreditCard({
            variables: {
                id: user.token?.user_id
            }
        });

        //window.location.reload(); //refresh the window
    }

    const toggleDialog = () => {
        setOpen((prev) => !prev);
    }

    return (
        <>
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
                        helperText={<ErrorMessage name="first_name" />}
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
                        helperText={<ErrorMessage name="last_name" />}
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
                        helperText={<ErrorMessage name="password" />}
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
                            helperText={<ErrorMessage name="address" />}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HomeOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    }

                    { is_manager ? <></> : <br /> }

                    {
                        is_manager 
                        ? 
                        <></>
                        : 
                        (
                            has_credit_card
                            ?
                            <h3 className={classes.credit_card_text} onClick={handleRemoveCreditCardClick}>
                                <RemoveCircleOutlineOutlinedIcon /> &nbsp; remove credit card
                            </h3>
                            :
                            <h3 className={classes.credit_card_text} onClick={handleCreditCardClick}>
                                <AddCircleOutlineOutlinedIcon /> &nbsp; add credit card
                            </h3>
                        )
                    }

                    <br />
                    <br />
                    <h3 className={classes.asterisk_text}>
                        *if no data is displaying, go to another page and come back
                    </h3>

                    <br />
                    <Button type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.update_information_btn}>
                        Update Information
                    </Button>

                    <Typography className={classes.err_text}>
                        {error ? error.message : ""}
                    </Typography>
                </Form>
            )}
        </Formik>




        <Dialog open={open} onClose={toggleDialog} fullWidth>
            <DialogTitle>
                <Typography
                fontSize={25}
                borderBottom={1}
                borderColor={"lightgray"}
                gutterBottom>
                    Add credit card
                </Typography>
            </DialogTitle>

            <DialogContent>
                <CreditCardForm 
                toggleDialog={toggleDialog}
                setHasCreditCard={setHasCreditCard}
                />
            </DialogContent>
        </Dialog>
        </>
    );
}