import React, { useEffect, useState } from "react";
import useStyles from "./WishlistProductDisplayStyles";

//Apollo and graphql
import { useLazyQuery } from "@apollo/client"
import { _GET_PRODUCT } from "../../../Queries/Queries";

//redux
import { useDispatch, useSelector } from 'react-redux';
import { actionsCreators, ReduxState } from "../../../state";
import { bindActionCreators } from 'redux';

//components
import { OrderProduct } from "../../../Common/ProductGrid/ProductDisplay/OrderProductDialog/OrderProductDialog";

//material ui
import { Button } from "@mui/material";

//icons
import CloseIcon from '@mui/icons-material/Close';

//images
import default_image from "../../../Images/default.png";

//interface
import { Product } from "../../Home/Home";

interface MyProps {
    user_id: string,
    product_id: string,
    img_location: string,
    img_uploaded: boolean
}

export const WishlistProductDisplay: React.FC<MyProps> = ({ user_id, product_id, img_location, img_uploaded }) => {
    //styles
    const { classes } = useStyles();

    //redux states
    const products = useSelector((redux_state: ReduxState) => redux_state.products);
    const aws = useSelector((redux_state: ReduxState) => redux_state.aws_s3);

    //redux actions
    const dispatch = useDispatch();
    const { removeFromWishlist } = bindActionCreators(actionsCreators, dispatch);

    //states
    const [image, setImage] = React.useState<string>(default_image);
    const [open_dialog, SetOpenDialog] = useState<boolean>(false);
    const [product_info, setProductInfo] = useState<Product>({
        id: product_id,
        name: "",
        price: 0,
        quantity: 0,
        category: "",
        img_location: "",
        img_uploaded: false
    });

    //queries
    const [getProduct, { data: product_data }] = useLazyQuery(_GET_PRODUCT);


    //fetch the product image from the s3
    React.useEffect(() => {
        if (img_uploaded) {
            setImage(aws.s3.getSignedUrl('getObject', {
                Bucket: aws.bucket_name,
                Key: img_location,
                Expires: aws.signed_url_expire_seconds
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [img_uploaded]) // upadtes when changing 

    //fetch if the product_id is not null
    useEffect(() => {
        if (product_id) {
            getProduct({
                variables: {
                    id: product_id
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product_id]);

    //set the information in the variables to display it
    useEffect(() => {
        if (product_data) {
            setProductInfo((prev) => {
                return {
                    id: prev.id,
                    name: product_data.productById.name,
                    price: product_data.productById.price,
                    quantity: product_data.productById.quantity,
                    category: product_data.productById.category,
                    img_location: product_data.productById.img_location,
                    img_uploaded: product_data.productById.img_uploaded
                }
            })

            if (products.products.length !== 0) {
                let index = products.products.findIndex((product) => product.id === product_id);
                //a more accurate quantity
                setProductInfo((prev) => ({ ...prev, quantity: products.products[index].quantity }));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product_data]);

    //remove the item from the wishlist
    const handleDeleteClick = () => {
        //the delete mutation does not works with postgraphile so i did an http request
        const http_address = `http://localhost:8000/deleteFromWishlist?user_id=${user_id}&product_id=${product_id}`;
        fetch(http_address)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error! status: ${res.status}`);
                }
            })
            .catch(err => {
                if (err instanceof Error) {
                    console.log('error message: ', err.message);
                } else {
                    console.log('unexpected error: ', err);
                }
            });

        removeFromWishlist({
            user_id: user_id,
            product_id: product_id
        });
    }

    const toggleDialog = () => {
        SetOpenDialog((prev) => !prev);
    }

    return (
        <>
            <div className={classes.wishlist_product_container}>
                <div className={classes.product_info_section}>
                    <img src={image} alt="product" className={classes.product_img} />
                    <div className={classes.product_info}>
                        <p className={classes.product_name}>{product_info.name}</p>
                        <p>price for each: {product_info.price}$</p>
                        <p>Left in stock: {product_info.quantity}</p>

                        <Button variant="contained"
                            onClick={toggleDialog}>
                            Buy now
                        </Button>
                    </div>
                </div>

                <div>
                    <button className={classes.delete_btn}>
                        <CloseIcon onClick={handleDeleteClick} />
                    </button>
                </div>
            </div>

            <OrderProduct
                is_open={open_dialog}
                toggleDialog={toggleDialog}
                id={product_id}
                name={product_info.name}
                price={product_info.price}
                quantity={product_info.quantity}
                category={product_info.category}
                img_location={product_info.img_location}
                img_uploaded={product_info.img_uploaded}
            />
        </>
    )
}