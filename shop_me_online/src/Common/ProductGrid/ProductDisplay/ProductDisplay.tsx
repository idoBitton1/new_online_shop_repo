import React, { useState, useEffect } from "react";
import useStyles from "./ProductDisplayStyles";

//redux
import { useSelector } from 'react-redux';
import { ReduxState } from "../../../state";

//components
import { OrderProduct } from "./OrderProductDialog/OrderProductDialog";
import { ManageProductDialog } from "./ManageProductDialog/ManageProductDialog";

//interface
import { Product } from "../../../Pages/Home/Home";

//images
import default_image from "../../../Images/default.png";

interface MyProps extends Product {
    to_manage_product: boolean
}

export const ProductDisplay: React.FC<MyProps> = ({ id, name, price, quantity, category, img_location, img_uploaded, to_manage_product }) => {
    //styles
    const { classes } = useStyles();
    
    //states
    const [image, setImage] = React.useState<string>(default_image);
    const [open_dialog, setOpenDialog] = useState<boolean>(false);

    //redux states
    const aws = useSelector((redux_state: ReduxState) => redux_state.aws_s3);

    //fetch the product image from the s3
    useEffect(() => {
        if(img_location && img_uploaded) {
            setImage(aws.s3.getSignedUrl('getObject', {
                Bucket: aws.bucket_name,
                Key: img_location,
                Expires: aws.signed_url_expire_seconds
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [img_location, img_uploaded]) // upadtes when changing 

    const toggleDialog = () => {
        setOpenDialog((prev) => !prev);
    }

    return (
        <>
            <div className={classes.product_container} onClick={toggleDialog}>
                <img src={image} alt={name} className={classes.product_img} />

                <div className={classes.product_details}>
                    <p>{name}</p>
                    <p>Left: {quantity}</p>
                </div>

                <div className={classes.product_details}>
                    <p className={classes.product_price}>{price}$</p>
                    <p className={classes.out_of_stock_text}>
                        {quantity === 0 ? "*out of stock" : ""}
                    </p>
                </div>
            </div>

            {/* the dialog */}
            {
                to_manage_product
                ?
                <ManageProductDialog
                is_open={open_dialog}
                toggleDialog={toggleDialog}
                id={id}
                name={name}
                price={price}
                quantity={quantity}
                category={category}
                img_location={img_location}
                img_uploaded={img_uploaded}
                />
                :
                <OrderProduct 
                is_open={open_dialog}
                toggleDialog={toggleDialog}
                id={id}
                name={name}
                price={price}
                quantity={quantity}
                category={category}
                img_location={img_location}
                img_uploaded={img_uploaded}
                />
            }
        </>
    )
}