import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {setProducts as onSetProducts} from "Redux/Product/product.actions";

// import ProductList from "Pages/ProductList";


function App({products, isLoader, onSetProducts}) {

    useEffect(() => {
        !products.length && onSetProducts()
    }, []);

    return (
        <div>
            I'm alive!
        </div>
    );
}

const mapStateToProps = ({product}) => {
    return {
        products: product.products,
        loader: product.isLoader,
    }
}

export default connect(mapStateToProps, {onSetProducts})(App);
