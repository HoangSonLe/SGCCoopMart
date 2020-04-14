import React from 'react'
import BaseRouteWrapper from 'BaseComponent/BaseRouteWrapper'
import MainContent from './MainContent'

export default class MainContentWrapper extends BaseRouteWrapper {
    
    componentDidMount(){
        this.setData(this.props)
    }

    wrapperContent() {
        let data = this.getData();
        let {cartInform,productList,productMenuList} = this.props;
        return (
            <MainContent cartInform={cartInform} productMenuList={productMenuList} productList={productList}/>
        )
    }
}