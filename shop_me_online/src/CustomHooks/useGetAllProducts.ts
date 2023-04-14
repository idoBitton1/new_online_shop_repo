//Apollo and graphql
import { useQuery } from "@apollo/client"
import { _GET_ALL_PRODUCTS } from "../Queries/Queries";

//redux
import { useDispatch } from 'react-redux';
import { actionsCreators } from "../state";
import { bindActionCreators } from 'redux';

//interfaces
import { Product } from "../Pages/Home/Home";

const useGetAllProducts = () => {
    //redux actions
    const dispatch = useDispatch();
    const { setFilterProducts, setProducts } = bindActionCreators(actionsCreators, dispatch);

    useQuery(_GET_ALL_PRODUCTS, {
        fetchPolicy: "network-only",
        onCompleted(data) {
          const original = data.allProducts.edges;
          let all_products: Product[] = [];
          original.map((product: any) => all_products.push({
            id: product.node.id,
            name: product.node.name,
            price: product.node.price,
            quantity: product.node.quantity,
            category: product.node.category,
            img_location: product.node.imgLocation,
            img_uploaded: product.node.imgUploaded
          }));
          
          setProducts(all_products);
          setFilterProducts(all_products);
        },
    });
}

export default useGetAllProducts