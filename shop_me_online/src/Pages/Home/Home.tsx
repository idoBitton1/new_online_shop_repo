import React, { useEffect } from 'react';
//import './App.css';

//Apollo and graphql
import { useLazyQuery, useMutation } from "@apollo/client"
import { _GET_TRANSACTION_ID, _GET_USER } from "../../Queries/Queries";
import { _CREATE_TRANSACTION } from '../../Queries/Mutations';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { actionsCreators, ReduxState } from "../../state";
import { bindActionCreators } from 'redux';

//components
import { Header } from "../../Common/Header/Header";
import { NavigationBar } from '../../Common/NavigationBar/NavigationBar';
import { ProductsGrid } from '../../Common/ProductGrid/ProductsGrid';

//custom hooks
import useGetAllProducts from '../../CustomHooks/useGetAllProducts';

export interface Product {
  id: string,
  name: string,
  price: number,
  quantity: number,
  category: string,
  img_location: string,
  img_uploaded: boolean
}

export interface Transaction { 
  id: string
  user_id: string,
  address: string,
  ordering_time: string,
  delivery_fee: number,
  paid: boolean
}

export interface TransactionSecondType { 
  id: string
  address: string,
  ordering_time: string,

  
  sum: number
}

export interface CartProduct { 
  item_id: string,
  transaction_id: string,
  product_id: string,
  amount: number,
  size: string
}

export interface Wishlist {
  user_id: string,
  product_id: string
}

function Home() {
  //redux states
  const user = useSelector((redux_state: ReduxState) => redux_state.user);
  const products = useSelector((redux_state: ReduxState) => redux_state.products);
  const transaction_id = useSelector((redux_state: ReduxState) => redux_state.transaction_id);
  
  //redux actions
  const dispatch = useDispatch();
  const { setTransactionId } = bindActionCreators(actionsCreators, dispatch);

  //queries
  useGetAllProducts();
  const [getTransactionId, { data: transaction_data }] = useLazyQuery(_GET_TRANSACTION_ID, {
    fetchPolicy: "network-only"
  });
  const [getAddress, { data: address_data }] = useLazyQuery(_GET_USER, {
    fetchPolicy: "network-only"
  });

  //mutations
  const [createTransaction] = useMutation(_CREATE_TRANSACTION, {
    onCompleted(data) { 
      //if created a new one, set the new transaction id to the redux state
      setTransactionId(data.createTransaction.transaction.id);
    }
  });


  //wait for the user to connect
  useEffect(() => {
    if(user.token && !transaction_id) {
      //get the address of the user
      getAddress({
        variables: {
          id: user.token.user_id
        }
      });
      
      //get the transaction of the user when he is connecting
      getTransactionId({
        variables: {
          id: user.token.user_id
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token, transaction_id]);
  
  //when all the information that is needed is here, check if the user has an open transaction
  useEffect(() => {
    if(!user.token?.is_manager && transaction_data && address_data) {
      //if the user already has an open transaction, get it
      if(transaction_data.getUnpaidTransaction) { 
        setTransactionId(transaction_data.getUnpaidTransaction);
      }
      //if not, create a new one
      else { 
        //format today
        const formatted_now = formatDate();

        createTransaction({
          variables: {
            user_id: user.token?.user_id,
            address: address_data.userById.address,
            ordering_time: formatted_now
          }
        });

        //window.location.reload(); //refresh
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction_data, address_data]);

  return (
    <div>
      <Header />
      <NavigationBar
        products={products.products}
      />
      <ProductsGrid to_manage_product={false} />
    </div>
  );
}

export const formatDate = (): string => {
  const today: Date = new Date();
  const yyyy: number = today.getFullYear();
  let mm: number = today.getMonth() + 1; // Months start at 0
  let dd: number = today.getDate();

  let ddd: string = `${dd}`;
  let mmm: string = `${mm}`;
  if (dd < 10) ddd = '0' + dd;
  if (mm < 10) mmm = '0' + mm;

  const formatted_today: string = yyyy + '/' + mmm + '/' + ddd;
  return formatted_today;
}

export default Home;
