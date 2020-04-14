import React from 'react';
import BaseConsumer from 'BaseComponent/BaseConsumer'
import Home from './Home/Home'
import Product from './Product/Product';
class MainContent extends BaseConsumer {
    consumerContent() {
        let { productList, cartInform, productMenuList } = this.props;
        return (
            <>
                <Home></Home>
                <Product
                    cartInform={cartInform}
                    productList={productList}
                    productMenuList={productMenuList}
                >
                </Product>
            </>
        );

    }
}
export default MainContent