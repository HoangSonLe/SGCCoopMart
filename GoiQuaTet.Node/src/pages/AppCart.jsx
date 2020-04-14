import React from 'react';
import ReactDOM from 'react-dom';
import { BasePage } from 'BaseComponent/BasePage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import CartCheckout from '../components/Main/Cart/CartCheckout'
export default class AppRoot extends BasePage {
    constructor(props){
        super(props);
        let cartLocal = JSON.parse(localStorage.getItem('cart'));
        this.state={
            productList:null,
            cartInform : (cartLocal !== null) ? cartLocal : { productListInCart: [], totalPrice: 0, totalProduct: 0 },
        }
    }
    childrenRender() {
        let {cartInform} = this.state;
        return (
            <>
                <Header cartInform={cartInform}></Header>
                <CartCheckout cartInform={cartInform}></CartCheckout>
                <Footer></Footer>
            </>
        );
    }
}
window.renderPage = (dom) => {
    ReactDOM.render(React.createElement(AppRoot), dom);
}