import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as productActions from 'Redux/Cart/cart.actions';

import {Grid} from 'semantic-ui-react';

import {Layout} from "UI/Layout";
import {Card as CardComponent} from './Blocks/Card';

const ProductList = ({
        products,
        cart,
        changeCountInCart,
        addToCart
    }) => {

    const onAddToCartClick = (element) => {
        const arrIndex = cart.findIndex((el) => (el.id === element.id));
        if (arrIndex === -1)
            addToCart(element);
        else
            changeCountInCart({
                arrIndex,
                value: ++cart[arrIndex].count
            });
        alert(`Product ${element.name} was added to cart`)
    }

    return (
        <Layout>
            <Grid columns='3' padded='vertically'>
                {
                    products.map((el) => {
                        return <Grid.Column key={el.id}>
                            <CardComponent
                                el={el}
                                onAddToCartClick={onAddToCartClick}
                            />
                        </Grid.Column>
                    })
                }
            </Grid>
        </Layout>
    );
}

function mapStateToProps({ product, cart }) {
    return {
        products: product.products,
        cart: cart.cart
    };
}

export default withRouter(
    connect(mapStateToProps, {...productActions})(ProductList)
);

