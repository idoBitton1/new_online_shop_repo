import React, { useState } from "react";
import useStyles from "./ManageProductDialogStyles";

//form
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

//Apollo and graphql
import { useMutation } from "@apollo/client";
import { UPDATE_PRODUCT_DETAILS } from "../../../../Queries/Mutations";

//redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionsCreators, ReduxState } from '../../../../state';

//material ui
import { SelectChangeEvent } from "@mui/material/Select";
import { Dialog, DialogContent, DialogTitle, Typography, OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox, Button, TextField } from '@mui/material';

//images
import default_image from "../../../../Images/default.png";

interface MyProps {
    is_open: boolean,
    toggleDialog: () => void,
    id: string,
    name: string,
    quantity: number,
    price: number,
    category: string,
    img_location: string,
    img_uploaded: boolean
}

interface MyFormValues {
    price: number,
    quantity: number
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const categories: string[] = [
    "shoes",
    "shirts",
    "shorts",
    "jackets",
    "coats",
    "dresses",
    "bags",
    "black",
    "blue",
    "green",
    "spring",
    "summer",
    "autumn",
    "winter"
];

export const ManageProductDialog: React.FC<MyProps> = ({is_open, toggleDialog, id, name, quantity, price, category, img_location, img_uploaded}) => {
    //styles
    const { classes } = useStyles();
    
    //states
    const [category_array, setCategoryArray] = useState<string[]>(category.split("#"));
    const [is_image_uploaded, setIsImageUploaded] = useState<boolean>(img_uploaded);
    const [image, setImage] = React.useState<string>(default_image);
    const [err_text, setErrText] = useState<string>("");

    //redux states
    const aws = useSelector((redux_state: ReduxState) => redux_state.aws_s3);

    //redux actions
    const dispatch = useDispatch();
    const { updateProductDetails } = bindActionCreators(actionsCreators, dispatch);

    //mutations
    const [updateProductDetailsM] = useMutation(UPDATE_PRODUCT_DETAILS);

    const handleChange = (event: SelectChangeEvent<typeof category_array>) => {
        const { target: { value } } = event;

        setCategoryArray(
          // On autofill we get a stringified value.
          typeof value === "string" ? value.split(",") : value
        );
    };

    //the initial values of the form
    const initial_values: MyFormValues = {
        price: price,
        quantity: quantity
    };

    //the validation schema 
    const validation_schema: any = Yup.object().shape({
        price: Yup.number().min(0, "Must be bigger than 0").required("Required"),
        quantity: Yup.number().min(0, "Must be bigger than 0").required("Required")
    });

    //fetch the product image from the s3
    React.useEffect(() => {
        if(img_uploaded) {
            setImage(aws.s3.getSignedUrl('getObject', {
                Bucket: aws.bucket_name,
                Key: img_location,
                Expires: aws.signed_url_expire_seconds
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [img_uploaded]) // upadtes when changing 

    const onSubmit = (values: MyFormValues) => {
        if(category_array.length === 0) { //if no categories has been chosen
            setErrText("select categories");
            return;
        }

        const full_category: string = formatCategories();

        //update price localy
        updateProductDetails({
            id: id,
            new_price: values.price,
            new_quantity: values.quantity,
            new_categories: full_category,
            is_image_uploaded: is_image_uploaded
        });

        //update the db
        updateProductDetailsM({
            variables: {
                id: id,
                price: values.price,
                quantity: values.quantity,
                category: full_category,
                img_uploaded: is_image_uploaded        
            }
        });

        //close the dialog
        closeDialog();
    }

    const closeDialog = () => {
        //clear the error text
        setErrText("");

        //close the dialog
        toggleDialog();
    }

    const formatCategories = (): string => {
        let full_category: string = "";

        for(let i=0; i < category_array.length; i++)
            full_category += `#${category_array[i]}`;
        
        return full_category.slice(1);
    }

    return (
        <Dialog open={is_open} onClose={closeDialog} fullWidth>
            <DialogTitle>
                <Typography gutterBottom className={classes.main_headline}>
                    {`Update ${name} details`}
                </Typography>
            </DialogTitle>

            <DialogContent>
            <div className={classes.buying_container}>
                <div className={classes.image_section}>
                    <img src={image} alt={name} className={classes.product_img} />

                    <div className={classes.checkbox_row}>
                        <Checkbox
                        checked={is_image_uploaded}
                        onChange={(e) => setIsImageUploaded(e.target.checked)}
                        inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <p className={classes.checkbox_text}>is image uploaded?</p>
                    </div>
                </div>

                <div className={classes.product_info}>
                <Formik 
                initialValues={initial_values}
                validationSchema={validation_schema}
                onSubmit={onSubmit}
                >
                    {(props) => (
                    <Form>
                        <Field as={TextField} name="price"
                        label="price"
                        variant="outlined"
                        type="number"
                        value={props.values.price}
                        onChange={props.handleChange}
                        margin="normal"
                        helperText={<ErrorMessage name="price" />}
                        />

                        <Field as={TextField} name="quantity"
                        label="quantity"
                        variant="outlined"
                        type="number"
                        value={props.values.quantity}
                        onChange={props.handleChange}
                        margin="normal"
                        helperText={<ErrorMessage name="quantity" />}
                        />

                        <FormControl sx={{ marginTop: 2, width: 225 }}>
                        <InputLabel>categories</InputLabel>
                        <Select
                        id="multiple_checkbox"
                        multiple
                        value={category_array}
                        onChange={handleChange}
                        input={<OutlinedInput label="categories" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                        >
                        {categories.map((name) => (
                            <MenuItem key={name} value={name}>
                            <Checkbox checked={category_array.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                        </Select>
                        </FormControl>

                        <Button type="submit"
                        color="primary"
                        variant="contained"
                        fullWidth
                        className={classes.update_btn}>
                            Update
                        </Button>
                        
                        <Typography className={classes.err_text}>
                            {err_text ? err_text : ""}
                        </Typography>
                    </Form>
                    )}
                </Formik>
                </div>
            </div>
            </DialogContent>
        </Dialog>
    );
}