import React, { useState } from "react";
import useStyles from "./ManageProductsStyles";

//redux
import { useSelector } from 'react-redux';
import { ReduxState } from "../../state";

//components
import { Header } from "../../Common/Header/Header";
import { ProductsGrid } from "../../Common/ProductGrid/ProductsGrid";
import { NavigationBar } from "../../Common/NavigationBar/NavigationBar";
import { AddProductDialog } from "./AddProductDialog/AddProductDialog";

//custom hooks
import useGetAllProducts from "../../CustomHooks/useGetAllProducts";

const ManageProducts = () => {
    //styles
    const { classes } = useStyles();

    //states
    const [is_open, setOpen] = useState<boolean>(false);

    //redux states
    const products = useSelector((redux_state: ReduxState) => redux_state.products);

    //queries
    useGetAllProducts();

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