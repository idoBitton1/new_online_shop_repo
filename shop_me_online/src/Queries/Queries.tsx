import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
query Query {
    getAllProducts {
      id
      name
      quantity
      price
      category
      img_location
      img_uploaded
    }
  }
`;

export const GET_USER_CART_PRODUCTS = gql`
query Query($user_id: String!, $transaction_id: String!) {
  getUserCartProducts(user_id: $user_id, transaction_id: $transaction_id) {
    item_id
    product_id
    transaction_id
    amount
    size
  }
}
`;

export const GET_PRODUCT = gql`
query Query($id: String!) {
  getProduct(id: $id) {
    name
    quantity
    price
    category
    img_location
  }
}
`;

export const GET_USER_WISHLIST = gql`
query Query($userId: String!) {
  getUserWishlist(user_id: $userId) {
    user_id
    product_id
  }
}
`;

export const GET_USER = gql`
query Query($userId: String!) {
  getUser(id: $userId) {
    first_name
    last_name
    password
    address
    email
    is_manager
  }
}
`;

export const CHECK_FOR_CREDIT_CARD = gql`
query Query($id: String!) {
  checkForCreditCard(id: $id)
}
`;

export const GET_TRANSACTION_ID = gql`
query Query($user_id: String!) {
  getTransactionId(user_id: $user_id)
}
`;

export const GET_TRANSACTION = gql`
query Query($id: String!) {
  getTransaction(id: $id) {
    paid
  }
}
`;

export const GET_TRANSACTIONS = gql`
query Query {
  getTransactions {
    id
    address
    ordering_time
    sum
  }
}
`;

////////////////////////////////////////////////

//query to the algorithm server on port 8080
export const GET_MINIMUM_SHIPMENT_COST = gql`
query GetMinimumCost($all_supply: [Int!]!, $all_demand: [Int!]!, $costs_mat: [[Float!]]!) {
  getMinimumCost(all_supply: $all_supply, all_demand: $all_demand, costs_mat: $costs_mat) {
    resMat
    totalCost
  }
}
`;

////////////////////////////////////////////////

export const _GET_ALL_PRODUCTS = gql`
query MyQuery {
  allProducts {
    edges {
      node {
        id
        name
        price
        quantity
        category
        imgLocation
        imgUploaded
      }
    }
  }
}
`;

export const _GET_USER_CART_PRODUCTS = gql`
query MyQuery($id: UUID!) {
  transactionById(id: $id) {
    cartsByTransactionId {
      nodes {
        itemId
        productId
        transactionId
        amount
        size
        productByProductId {
          price
        }
      }
    }
  }
}
`;

export const _GET_PRODUCT = gql`
query MyQuery($id: UUID!) {
  productById(id: $id) {
    name
    price
    quantity
    category
    imgLocation
  }
}
`;

export const _GET_USER_WISHLIST = gql`
query MyQuery($user_id: UUID!) {
  getUserWishlist(_userId: $user_id) {
    nodes {
      userId
      productId
    }
  }
}
`;

export const _GET_USER = gql`
query MyQuery($id: UUID!) {
  userById(id: $id) {
    firstName
    lastName
    password
    address
    email
    isManager
  }
}
`;

export const _CHECK_FOR_CREDIT_CARD = gql`
query MyQuery($id: UUID!) {
  checkForCreditCard(_id: $id)
}
`;

export const _GET_TRANSACTION_ID = gql`
query MyQuery($id: UUID!) {
  getUnpaidTransaction(_userId: $id)
}
`;

export const _GET_TRANSACTION = gql`
query MyQuery($id: UUID!) {
  transactionById(id: $id) {
    paid
  }
}
`;

export const _GET_TRANSACTIONS = gql`
query MyQuery {
  getTransactions {
    nodes {
      id
      address
      orderingTime
      sum
    }
  }
}
`;

export const _GET_CART_ITEM = gql`
query MyQuery($item_id: UUID!) {
  cartByItemId(itemId: $item_id) {
    amount
    size
  }
}
`;