import React from 'react';
import ReactDOM from 'react-dom';
import { BasePage } from 'BaseComponent/BasePage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ContentPolicy from '../components/Main/ContentPolicy'
export default class Policy extends BasePage {
    constructor(props) {
        super(props);
        let cartLocal = JSON.parse(localStorage.getItem('cart'));
        this.state = {
            productList: null,
            cartInform: (cartLocal !== null) ? cartLocal : { productListInCart: [], totalPrice: 0, totalProduct: 0 },
            // productList:{
            //     product:{},
            //     quantity:null,
            //     storeId:null,
            //     dateDeliver:null
            // }
        }
    }
    childrenRender() {
        let { cartInform } = this.state;
        return (
            <>
                <Header cartInform={cartInform}></Header>
                <ContentPolicy></ContentPolicy>
                <Footer></Footer>
            </>
        );
    }
}
window.renderPage = (cart) => {
    ReactDOM.render(React.createElement(Policy), cart);
}