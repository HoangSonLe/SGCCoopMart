import React from 'react';
import ReactDOM from 'react-dom';
import { BasePage } from 'BaseComponent/BasePage';
import BaseRouterPage from 'BaseComponent/BaseRouterPage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MainContent from '../components/Main/MainContent';
import CartCheckout from '../components/Main/Cart/CartCheckout'
import ContentPolicy from '../components/Main/ContentPolicy'
import ContentGuide from '../components/Main/ContentGuide'
import CheckOrder from '../components/Main/CheckOrder'
import MainContentWrapper from '../components/Main/MainContentWrapper'
import ContentGuideWrapper from '../components/Main/ContentGuideWrapper'
// import ContentPolicyWrapper from '../components/Main/ContentPolicyWrapper'
import {
    Route,
    // BrowserRouter as Router,
    Router,
    Switch,
    HashRouter
} from 'react-router-dom'
export default class AppRoot extends BaseRouterPage {
    constructor(props) {
        super(props);
        let cartLocal = JSON.parse(localStorage.getItem('cart'));
        this.state = {
            productList: {},
            productMenuList: {},
            cartInform: (cartLocal !== null) ? cartLocal : { productListInCart: [], totalPrice: 0, totalProduct: 0 },
            // productList:{
            //     comboInform:{},
            //     quantity:null,
            //     storeId:null,
            //     dateDeliver:null
            // }
        }
    }
    componentDidMount() {
        this.ajaxGet({
            url: '/api/combo/GetComboesAndComboTypes',
            success: (response) => {
                this.setState({
                    productList: response.Data.Comboes,
                    productMenuList: response.Data.ComboTypes
                })
            },
            error: (res) => {
                console.log("Lỗi API")
            },
        })
    }
    childrenRender() {
        console.log("approot", this.state)
        let hist = this.getHistory();
        console.log("hist", hist)
        let { productList, cartInform, productMenuList } = this.state;
        return (
            <Router history={hist}>
                <Header cartInform={cartInform}></Header>
                <Route exact path="/">
                    <MainContent cartInform={cartInform} productMenuList={productMenuList} productList={productList}></MainContent>
                </Route>
                <Route path="/huong-dan-mua-hang" component={ContentGuide} />
                <Route path="/chinh-sach-giao-hang" component={ContentPolicy} />
                <Route path="/kiem-tra-don-hang" component={CheckOrder} />
                <Route path="/dat-hang">
                    <CartCheckout cartInform={cartInform}></CartCheckout>
                </Route>
                <Footer></Footer>
            </Router>
        );
    }
}
window.renderPage = (dom) => {
    ReactDOM.render(React.createElement(AppRoot), dom);
}