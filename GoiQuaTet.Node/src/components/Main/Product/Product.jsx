import React from 'react';
import BaseConsumer from 'BaseComponent/BaseConsumer';
import Pagination from '@material-ui/lab/Pagination';
import { Container } from '@material-ui/core';

import ProductItem from '../Product/ProductItem';
import ProductMenu from './ProductMenu';
import { PAGE_INDEX_DEFAULT } from '../../../constants/constant'

class Product extends BaseConsumer {
    constructor(props) {
        super(props);
        this.state = {
            comboTypeIndex: 0
        }
    }
    _handleClickProductMenu = (comboTypeIndex) => {
        this.setState({ comboTypeIndex: comboTypeIndex })
        this._getDataProduct(PAGE_INDEX_DEFAULT, this.props.productMenuList[comboTypeIndex].Id)
    }
    _getDataProduct = (pageIndex, typeProduct, stringSearch) => {
        let data = {
            typeProduct: typeProduct,
            index: pageIndex,
            PageSize: 15,
            stringSearch: stringSearch
        }
        this.ajaxGet({
            url: '/api/combo/GetComboes/',
            data: data,
            success: (res) => {
                console.log(res.Data)
                this.updateObject(this.props.productList, res.Data);// quản lí state chung
            },
            error: (res) => {
                console.log("Lỗi API")
            },
        });
    }
    _handleSearch = (stringSearch) => {
        console.log("search", stringSearch)
        let { comboTypeIndex } = this.state;
        this._getDataProduct(PAGE_INDEX_DEFAULT, this.props.productMenuList[comboTypeIndex].Id, stringSearch);
    }
    _onChangePage = (e, pageIndex) => {
        let { comboTypeIndex } = this.state;
        this._getDataProduct(pageIndex, this.props.productMenuList[comboTypeIndex].Id, "");
    };
    consumerContent() {
        let { productList, cartInform, productMenuList } = this.props;
        let ele = '';
        let pagination = "";
        if (productList !== undefined && productList !== null && Object.keys(productList).length > 0) {
            ele = productList.comboInformList.map((e,index) => {
                return (
                    <ProductItem
                        cartInform={cartInform}
                        key={index}
                        product={e}
                    >
                    </ProductItem>
                );
            });
            pagination = <Pagination style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
                count={productList.MaxPage}
                color="primary"
                page={productList.PageIndex}
                onChange={(e, value) => { this._onChangePage(e, value) }} />
        }
        return (
            <>
                <Container><ProductMenu productMenuList={productMenuList} handleSearch={this._handleSearch} handleClickProductMenu={this._handleClickProductMenu}></ProductMenu></Container>
                <Container>
                    {ele}
                </Container>
                <Container>{pagination}</Container>
            </>
        );

    }
}
export default Product