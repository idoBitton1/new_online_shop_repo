import React, { useState } from "react";
import useStyles from "./ManageProductsStyles";

//Apollo and graphql
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../../Queries/Queries";

//redux
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState, actionsCreators } from "../../state";
import { bindActionCreators } from 'redux';

//components
import { Header } from "../../Common/Header/Header";
import { ProductsGrid } from "../../Common/ProductGrid/ProductsGrid";
import { NavigationBar } from "../../Common/NavigationBar/NavigationBar";
import { AddProductDialog } from "./AddProductDialog/AddProductDialog";

const ManageProducts = () => {
    //styles
    const { classes } = useStyles();

    //states
    const [is_open, setOpen] = useState<boolean>(false);

    //redux states
    const products = useSelector((redux_state: ReduxState) => redux_state.products);

    //redux actions
    const dispatch = useDispatch();
    const { setProducts, setFilterProducts } = bindActionCreators(actionsCreators, dispatch);

    //queries
    useQuery(GET_ALL_PRODUCTS, {
        fetchPolicy: "network-only",
        onCompleted(data) {
          setProducts(data.getAllProducts);
          setFilterProducts(data.getAllProducts);
        }
    });

    const toggleAddProductDialog = () => {
        setOpen((prev) => !prev);
    }

    return (
        <>
        <div className={classes.manage_products_container}>
            <Header />

            <div>
            <h1 className={classes.headline}> Manage products </h1>     

            <button className={classes.add_button} onClick={toggleAddProductDialog}>
                Add Product
            </button>    
            </div>       

            <div>
                <NavigationBar
                    products={products.products}
                />

                <ProductsGrid to_manage_product={true} />
            </div>
        </div>

        <AddProductDialog 
        is_open={is_open}
        toggleDialog={toggleAddProductDialog}
        />

        </>
    );
}

export default ManageProducts;