import { gql } from "@apollo/client"

export const CREATE_USER = gql`
mutation Mutation($firstName: String!, $lastName: String!, $password: String!, $address: String!, $email: String!, $isManager: Boolean!) {
    createUser(first_name: $firstName, last_name: $lastName, password: $password, address: $address, email: $email, is_manager: $isManager) {
      id
      token
    }
  }
`;

export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

export const UPDATE_PRODUCT_QUANTITY = gql`
mutation Mutation($id: String!, $newQuantity: Int!) {
  updateProductQuantity(id: $id, new_quantity: $newQuantity) {
    id
  }
}
`;

export const ADD_PRODUCT_TO_CART = gql`
mutation Mutation($item_id: String!, $transaction_id: String!, $product_id: String!, $amount: Int!, $size: String!) {
  addProductToCart(item_id: $item_id, transaction_id: $transaction_id, product_id: $product_id, amount: $amount, size: $size) {
    item_id
  }
}
`;

export const REMOVE_PRODUCT_FROM_CART = gql`
mutation Mutation($item_id: String!) {
  removeProductFromCart(item_id: $item_id) {
    item_id
  }
}
`;

export const SET_TRANSACTION_AS_PAID = gql`
mutation Mutation($transaction_id: String!, $new_time: String!) {
  setTransactionAsPaid(transaction_id: $transaction_id, new_time: $new_time) {
    id
  }
}
`;

export const ADD_TO_WISHLIST = gql`
mutation Mutation($userId: String!, $productId: String!) {
  addToWishlist(user_id: $userId, product_id: $productId) {
    product_id
  }
}
`;

export const DELETE_PRODUCT_FROM_WISHLIST = gql`
mutation Mutation($userId: String!, $productId: String!) {
  deleteProductFromWishlist(user_id: $userId, product_id: $productId) {
    user_id
  }
}
`;

export const UPDATE_CART_PRODUCT_AMOUNT = gql`
mutation Mutation($item_id: String!, $new_amount: Int!) {
  updateCartProductAmount(item_id: $item_id, new_amount: $new_amount) {
    item_id
  }
}
`;

export const UPDATE_CART_PRODUCT_SIZE = gql`
mutation Mutation($item_id: String!, $new_size: String!) {
  updateCartProductSize(item_id: $item_id, new_size: $new_size) {
    item_id
  }
}
`;

export const UPDATE_USER_INFORMATION = gql`
mutation Mutation($id: String!, $firstName: String!, $lastName: String!, $password: String!, $address: String!, $email: String!, $isManager: Boolean!) {
  updateUserInformation(id: $id, first_name: $firstName, last_name: $lastName, password: $password, address: $address, email: $email, is_manager: $isManager) {
    id
  }
}
`;

export const ADD_CREDIT_CARD = gql`
mutation Mutation($id: String!, $creditCardNumber: String!) {
  addCreditCard(id: $id, credit_card_number: $creditCardNumber) {
    id
  }
}
`;

export const REMOVE_CREDIT_CARD = gql`
mutation Mutation($id: String!) {
  removeCreditCard(id: $id) {
    id
  }
}
`;

export const CREATE_TRANSACTION = gql`
mutation Mutation($user_id: String!, $address: String!, $paid: Boolean!, $ordering_time: String!) {
  createTransaction(user_id: $user_id, address: $address, paid: $paid, ordering_time: $ordering_time) {
    id
  }
}
`;

export const DELETE_TRANSACTION = gql`
mutation Mutation($transaction_id: String!) {
  deleteTransaction(transaction_id: $transaction_id) {
    id
  }
}
`;

export const UPDATE_PRODUCT_DETAILS = gql`
mutation Mutation($id: String!, $price: Int!, $quantity: Int!, $category: String!, $img_uploaded: Boolean!) {
  updateProductDetails(id: $id, price: $price, quantity: $quantity, category: $category, img_uploaded: $img_uploaded) {
    id
  }
}
`;

export const ADD_PRODUCT_TO_PRODUCTS = gql`
mutation Mutation($name: String!, $price: Int!, $quantity: Int!, $category: String!, $img_location: String!) {
  addProductToProducts(name: $name, price: $price, quantity: $quantity, category: $category, img_location: $img_location) {
    id
    name
    quantity
    price
    category
    img_location
  }
}
`;

///////////////////////////////////////////

export const _CREATE_USER = gql`
mutation MyMutation($id: UUID, $first_name: String!, $last_name: String!, $password: String!, $address: String!, $email: String!, $is_manager: Boolean!, $token: String!) {
  createUser(
    input: {user: {id: $id, firstName: $first_name, lastName: $last_name, password: $password, email: $email, isManager: $is_manager, address: $address, token: $token}}
  ) {
    userEdge {
      node {
        id
      }
    }
  }
}
`;

export const _LOGIN_USER = gql`
mutation MyMutation($email: String!, $password: String!) {
  loginUser(input: {_email: $email, _password: $password}) {
    userData {
      id
      email
      isManager
    }
  }
}
`;

export const _CHECK_REGISTER_INFORMATION = gql`
mutation MyMutation($first_name: String!, $last_name: String!, $password: String!, $address: String!, $is_manager: Boolean!) {
  checkRegisterInformation(
    input: {firstName: $first_name, lastName: $last_name, password: $password, address: $address, isManager: $is_manager}
  ) {
    clientMutationId
  }
}
`;

export const _UPDATE_PRODUCT_QUANTITY = gql`
mutation MyMutation($id: UUID!, $quantity: Int!) {
  updateProductById(input: {productPatch: {quantity: $quantity}, id: $id}) {
    clientMutationId
  }
}
`;

export const _ADD_PRODUCT_TO_CART = gql`
mutation MyMutation($item_id: UUID!, $transaction_id: UUID!, $product_id: UUID!, $amount: Int!, $size: String!) {
  createCart(
    input: {cart: {itemId: $item_id, transactionId: $transaction_id, productId: $product_id, amount: $amount, size: $size}}
  ) {
    cartEdge {
      node {
        itemId
      }
    }
  }
}
`;

export const _REMOVE_PRODUCT_FROM_CART = gql`
mutation MyMutation($item_id: UUID!) {
  deleteCartByItemId(input: {itemId: $item_id}) {
    clientMutationId
    deletedCartId
  }
}
`;

export const _SET_TRANSACTION_AS_PAID = gql`
mutation MyMutation($id: UUID!, $ordering_time: Datetime!) {
  setTransactionAsPaid(input: {_id: $id, _newTime: $ordering_time}) {
    clientMutationId
  }
}
`;

export const _ADD_TO_WISHLIST = gql`
mutation MyMutation($user_id: UUID!, $product_id: UUID!) {
  createWishlist(input: {wishlist: {userId: $user_id, productId: $product_id}}) {
    clientMutationId
  }
}
`;

export const _UPDATE_CART_PRODUCT_AMOUNT = gql`
mutation MyMutation($item_id: UUID!, $amount: Int!) {
  updateCartByItemId(input: {cartPatch: {amount: $amount}, itemId: $item_id}) {
    clientMutationId
  }
}
`;

export const _UPDATE_CART_PRODUCT_SIZE = gql`
mutation MyMutation($item_id: UUID!, $size: String!) {
  updateCartByItemId(input: {cartPatch: {size: $size}, itemId: $item_id}) {
    clientMutationId
  }
}
`;

export const _UPDATE_USER_INFORMATION = gql`
mutation MyMutation($id: UUID!, $first_name: String!, $last_name: String!, $password: String!, $email: String!, $address: String!) {
  updateUserById(
    input: {userPatch: {firstName: $first_name, lastName: $last_name, password: $password, email: $email, address: $address}, id: $id}
  ) {
    clientMutationId
  }
}
`;

export const _ADD_CREDIT_CARD = gql`
mutation MyMutation($id: UUID!, $credit_card_number: String!) {
  updateUserById(input: {userPatch: {creditCardNumber: $credit_card_number}, id: $id}) {
    clientMutationId
  }
}
`;

export const _REMOVE_CREDIT_CARD = gql`
mutation MyMutation($id: UUID!) {
  deleteCreditCard(input: {_id: $id}) {
    clientMutationId
  }
}
`;

export const _CREATE_TRANSACTION = gql`
mutation MyMutation($user_id: UUID!, $address: String!, $ordering_time: Datetime!) {
  createTransaction(
    input: {transaction: {address: $address, paid: false, orderingTime: $ordering_time, userId: $user_id}}
  ) {
    transaction {
      id
    }
  }
}
`;

export const _DELETE_TRANSACTION = gql`
mutation MyMutation($id: UUID!) {
  deleteTransactionById(input: {id: $id}) {
    clientMutationId
    deletedTransactionId
  }
}
`;

export const _UPDATE_PRODUCT_DETAILS = gql`
mutation MyMutation($id: UUID!, $price: Float!, $quantity: Int!, $category: String!, $img_uploaded: Boolean!) {
  updateProductById(
    input: {productPatch: {price: $price, quantity: $quantity, category: $category, imgUploaded: $img_uploaded}, id: $id}
  ) {
    clientMutationId
  }
}
`;

export const _ADD_PRODUCT_TO_PRODUCTS = gql`
mutation MyMutation($name: String!, $price: Float!, $quantity: Int!, $category: String!, $img_location: String!) {
  createProduct(
    input: {product: {name: $name, quantity: $quantity, price: $price, category: $category, imgLocation: $img_location}}
  ) {
    product {
      id
      name
      quantity
      price
      category
      imgLocation
      imgUploaded
    }
  }
}
`;