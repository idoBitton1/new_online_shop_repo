import React from "react";
import useStyles from "./ProductsGridStyles";

//redux
import { useSelector } from 'react-redux';
import { ReduxState } from "../../state";

//components
import { ProductDisplay } from "./ProductDisplay/ProductDisplay";

interface MyProps {
    to_manage_product: boolean
}

export const ProductsGrid: React.FC<MyProps> = ({to_manage_product}) => {
    //styles
    const { classes } = useStyles();

    //redux states
    const products = useSelector((redux_state: ReduxState) => redux_state.products);

    return (
        <div className={classes.products_grid}>
            {
                products.filtered_products.map((product, i) => {
                    return (
                        <ProductDisplay
                        key={i}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        quantity={product.quantity}
                        category={product.category === undefined ? "" : product.category}
                        img_location={product.img_location}
                        img_uploaded={product.img_uploaded}
                        to_manage_product={to_manage_product}
                        />
                    )
                })
            }
        </div>
    )
}