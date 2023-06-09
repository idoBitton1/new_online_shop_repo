import React, { useEffect, useState } from "react";
import useStyles from "./CartStyles";

//Apollo and graphql
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { _GET_USER_CART_PRODUCTS, _CHECK_FOR_CREDIT_CARD, _GET_USER, _GET_TRANSACTION_ID } from "../../Queries/Queries";
import { _CREATE_TRANSACTION, _SET_TRANSACTION_AS_PAID, _UPDATE_PRODUCT_QUANTITY } from "../../Queries/Mutations";

//redux
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState, actionsCreators } from "../../state";
import { bindActionCreators } from 'redux';

//components
import { Header } from "../../Common/Header/Header";
import { CartProductDisplay } from "./CartProductDisplay/CartProductDisplay";
import { CreditCardDialog } from "./CreditCardDialog/CreditCardDialog";
import { ConfirmPurchaseDialog } from "./ConfirmPurchaseDialog/ConfirmPurchaseDialog";

//material - ui
import { Button } from "@mui/material";

//custom hooks
import useGetAllProducts from "../../CustomHooks/useGetAllProducts";

//icons
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

//function
import { CartProduct, formatDate } from "../Home/Home";

export interface PaymentProps {
    sum_of_products: number,
    delivery: number,
    total: number,
    payment_succeed: boolean
}

const Cart = () => {
    //styles
    const { classes } = useStyles();

    //redux states
    const user = useSelector((redux_state: ReduxState) => redux_state.user);
    const cart = useSelector((redux_state: ReduxState) => redux_state.cart);
    const products = useSelector((redux_state: ReduxState) => redux_state.products);
    const transaction_id = useSelector((redux_state: ReduxState) => redux_state.transaction_id);

    //redux actions
    const dispatch = useDispatch();
    const { setCart, updateSupply, setTransactionId } = bindActionCreators(actionsCreators, dispatch);

    //const value
    const delivery_price = 30;

    //states
    const [payment_information, setPaymentInformation] = useState<PaymentProps>({
        sum_of_products: 0,
        delivery: delivery_price,
        total: 0,
        payment_succeed: false
    });
    const [has_credit_card, setHasCreditCard] = useState<boolean>(false);
    const [open_credit_card, setOpenCreditCard] = useState<boolean>(false);
    const [open_confirm, setOpenConfirm] = useState<boolean>(false);
    const [err_text, setErrText] = useState<string>("");

    //queries
    const [getTransactionId] = useLazyQuery(_GET_TRANSACTION_ID, {
        fetchPolicy: "network-only",
        onCompleted(data) {
            setTransactionId(data.getUnpaidTransaction);
        },
    });
    //get the user's address
    const { data: address_data } = useQuery(_GET_USER, {
        fetchPolicy: "network-only",
        variables: {
            id: user.token?.user_id
        }
    });
    //get all products, because the cart products dont hold the same information as the 
    //regular products is holding (such as the price, img_location)
    useGetAllProducts();
    //when the info comes back, set the information in the cart redux state
    const [getCartProducts] = useLazyQuery(_GET_USER_CART_PRODUCTS, {
        fetchPolicy: "network-only",
        onCompleted(data) {        
            const data_arr = data.transactionById.cartsByTransactionId.nodes;
            //sum the total amount of the products
            let total_price = 0;
            for(let i=0; i<data_arr.length; i++) {
                total_price += data_arr[i].productByProductId.price * data_arr[i].amount;
            }
            setPaymentInformation((prev) => ({...prev, sum_of_products: total_price, total: total_price + payment_information.delivery}));
            //set the products as the cart
            setCart(convertType(data_arr));
        },
    });
    //checks if the user has a credit card set
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
    //update the quantity of an item  
    const [updateProductQuantity] = useMutation(_UPDATE_PRODUCT_QUANTITY);
    //sets the transaction as paid
    const [setTransactionAsPaid] = useMutation(_SET_TRANSACTION_AS_PAID);
    //create a transaction
    const [createTransaction] = useMutation(_CREATE_TRANSACTION, {
        onCompleted(data) { 
          //if created a new one, set the new transaction id to the redux state
          setTransactionId(data.createTransaction.transaction.id);
        }
    });


    //when the user is connecting, fetch his cart information
    useEffect(() => {
        if (user.token && transaction_id) {
            getCartProducts({
                variables: {
                    id: transaction_id
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.token, transaction_id]);

    //if the user is connected and the transaction id wasnt fetched yet
    useEffect(() => {
        if (user.token && !transaction_id) {
            //so fetch it
            getTransactionId({
                variables: {
                    id: user.token.user_id
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.token]);

    //change the total with every change in the amount of one of the fields 
    useEffect(() => {
        setPaymentInformation((prev) => ({...prev, total: payment_information.sum_of_products + payment_information.delivery}));
    }, [payment_information.sum_of_products]);

    //the function of the pay button click
    const handlePayment = async() => {
        //check that the selected products are in stock
        for(let i = 0; i < cart.length; i++) {
            let index_of_product = products.products.findIndex((product) => product.id === cart[i].product_id);
            if (products.products[index_of_product].quantity < cart[i].amount) {
                setErrText("not enough in stock");
                return;
            }
        }

        //type declare
        type temp_cart_type = {
            product_id: string,
            amount: number
        }

        //sums for each product in the cart his amount
        let temp_cart: temp_cart_type[] = [];
        for(let i = 0; i < cart.length; i++) {
            //if already sumed his amount, skip him
            if(temp_cart.findIndex((item) => item.product_id === cart[i].product_id) !== -1)
                continue;
            let sum = 0;
            //sum only the amount of the current item
            cart.filter((item) => item.product_id === cart[i].product_id).map((item) => {
                sum += item.amount;
            });
            temp_cart.push({product_id: cart[i].product_id, amount: sum});
        }
        
        //updates the products arrays quantities
        for(let i = 0; i< temp_cart.length; i++) {
            orderProduct(temp_cart[i].amount, temp_cart[i].product_id);
        }

        //set the transaction as paid
        const formatted_now = formatDate();
        setTransactionAsPaid({
            variables: {
                id: transaction_id,
                ordering_time: formatted_now
            }
        });

        //create a new transaction after the prev transaction was paid
        createTransaction({
            variables: {
                user_id: user.token?.user_id,
                address: address_data.userById.address,
                ordering_time: formatted_now
            }
        });

        //update the payment variables
        setPaymentInformation((prev) => {
            return {
                ...prev,
                payment_succeed: true,
                sum_of_products: 0,
                delivery: 0
            }
        });

        toggleConfirmDialog();
    }

    //updates the products arrays quantities (all the products that are bought)
    const orderProduct = async(amount: number, product_id: string) => {
        //finds the quantity of the product
        const product_index = products.products.findIndex((product) => product.id === product_id);
        const quantity = products.products[product_index].quantity;

        //update both arrays
        updateSupply({
            id: product_id,
            amount: amount
        });

        //update db
        try {
            await updateProductQuantity({
                variables: {
                    id: product_id,
                    quantity: quantity - amount
                }
            });
        } catch (err: any) {
            console.error(err.message);
        }
    }

    //converts the type of the object that comes from the postgraphile api because 
    //it comes without the '_' between words
    const convertType = (objects: any[]): CartProduct[] => {
        const original = objects;
        let all_products: CartProduct[] = [];
        original.map((product: any) => all_products.push({
            item_id: product.itemId, 
            transaction_id: product.transactionId,
            product_id: product.productId,
            amount: product.amount,
            size: product.size
        }));

        return all_products;
    }

    const toggleCreditCardDialog = () => {
        setOpenCreditCard((prev) => !prev);
    }

    const toggleConfirmDialog = () => {
        setOpenConfirm((prev) => !prev);
    }

    return (
        <>
        <div className={classes.cart_container}>
            <Header />

            <h1 className={classes.headline}> Your Cart </h1>

            <div className={classes.cart_context}>
                <div>
                    <div className={classes.summary_container}>
                        <p className={classes.summary_text}>Summary</p>

                        <div className={classes.summary_field}>
                            <p>Subtotal</p>
                            <p>{payment_information.sum_of_products}$</p>
                        </div>
                        <div className={classes.summary_field}>
                            <p>Delivery</p>
                            <p>{payment_information.delivery}$</p>
                        </div>
                        <div className={classes.total_field}>
                            <p>Total</p>
                            <p>{payment_information.total}$</p>
                        </div>
                        
                        {/** check if the user has a credit card */}
                        <Button variant="contained"
                        onClick={!has_credit_card ? toggleCreditCardDialog : toggleConfirmDialog}                       
                        fullWidth>
                            Pay
                        </Button>

                        <p className={classes.error_text}>{err_text ? err_text : ""}</p>   
                    </div>

                    {
                        payment_information.payment_succeed
                        ?
                        <div className={classes.payment_succeeded}>
                            <CheckCircleRoundedIcon className={classes.success_icon} />
                            <h2 className={classes.success_text}>Payment Succeed</h2>
                        </div>
                        :
                        <></>
                    }
                </div>

                <div className={classes.cart_items}>
                    {
                        payment_information.payment_succeed
                        ?
                        <></>
                        :
                        //render all the products in the cart
                        cart.map((cart_product, i) => {
                            if(products.products.length === 0) return;

                            const product_index = products.products.findIndex((product) => product.id === cart_product.product_id);
                            const img_location = products.products[product_index].img_location;
                            const img_uploaded = products.products[product_index].img_uploaded;

                            return (
                                <CartProductDisplay
                                    item_id={cart_product.item_id}
                                    product_id={cart_product.product_id}
                                    img_location={img_location}
                                    img_uploaded={img_uploaded}
                                    setPaymentInformation={setPaymentInformation}
                                    key={i}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </div>



        {/* add credit card dialog */}
        <CreditCardDialog 
        open_credit_card={open_credit_card} 
        setHasCreditCard={setHasCreditCard} 
        toggleCreditCardDialog={toggleCreditCardDialog} 
        />


        {/* confirm purchase */}
        <ConfirmPurchaseDialog 
        open_confirm={open_confirm} 
        toggleConfirmDialog={toggleConfirmDialog}
        handlePayment={handlePayment}
        />

        </>
    )
}

export default Cart;