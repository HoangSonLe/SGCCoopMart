import React from 'react';
import { NavLink } from 'react-router-dom'

import BaseConsumer from 'BaseComponent/BaseConsumer'

import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles, Box, Button, IconButton, Container } from '@material-ui/core'

import ButtonCart from './ButtonCart';

import { changeQuantityProductInCart } from '../../../function/CartFunction'
import { formatMoney } from '../../../function/FunctionByMySelf'

class CartContent extends BaseConsumer {
    _changeQuantityProduct = (comboInform, quantity) => {
        let cart = changeQuantityProductInCart(comboInform, quantity);
        (cart.totalProduct != 0) ? cart : {}
        this.updateObject(this.props.cartInform, cart);
    }
    _handleDeleteCart = () => {
        localStorage.removeItem("cart")
        let cart = { productListInCart: [], totalPrice: 0, totalProduct: 0 }
        this.updateObject(this.props.cartInform, cart);
    }
    consumerContent() {
        let { classes, cartInform } = this.props;

        let ele = <h3>Chưa có sản phẩm nào trong giỏ hàng</h3>;

        if (cartInform.productListInCart.length > 0) {
            ele = cartInform.productListInCart.map((item,index) => {
                return (
                    <Container key={index} className={classes.productInform}>
                        <img src="/dist/contents/images/Gio_qua_Tet_Co.opmart.png" className={classes.Image}></img>
                        <Box>
                            <h3>{item.comboInform.combo.Name}</h3>
                            <p>{formatMoney(item.comboInform.combo.TotalPrice)}</p>
                            <ButtonCart productCartItem={item} cartInform={cartInform}></ButtonCart>
                        </Box>
                        <IconButton aria-label="delete" style={{ margin: "auto" }} onClick={() => this._changeQuantityProduct(item.comboInform, -Number(item.quantity))}>
                            <DeleteIcon />
                        </IconButton>
                    </Container>
                );
            })
            ele.push(
                <Box key={"njdncdjsknckjdnckjnsjknd123456432432342"}>
                    <Container className={classes.totalPrice}>
                        <h3>Tổng tiền:</h3>
                        <Box>
                            <h3>{formatMoney(cartInform.totalPrice)}</h3>
                            <i>(Chưa tính phí ship và phụ kiện)</i>
                        </Box>
                    </Container>
                    <Container className={classes.productInform}>
                        <Button variant="contained" color="secondary" style={{ marginRight: 50 }} onClick={()=>this._handleDeleteCart()}>
                            HỦY GIỎ HÀNG
                    </Button>
                        <Button variant="contained" color="primary" >
                           <a className={classes.link} onClick={()=>this.goTo("/dat-hang")}>ĐẶT HÀNG</a>
                           {/* <NavLink className={classes.link} to="/dat-hang">ĐẶT HÀNG</NavLink> */}
                    </Button>
                    </Container>
                </Box>
            )
        }
        return (
            <Box className={classes.root}>
                {ele}
            </Box>
        );

    }
}
const styles = {
    root: {
        width: '100%',
        maxWidth: 360,
    },
    Image: {
        width: 100,
        height: 130,
        marginRight: 10,
    },
    totalPrice: {
        textAlign: "right",
        display: "flex",
        paddingBottom: "10px",
        minWidth: 300,
        maxWidth: 400,
    },
    productInform: {
        display: "flex",
        paddingBottom: "10px",
        minWidth: 300,
        maxWidth: 400,
        borderBottom: "1px solid #e1e1e1",
        "&:last-child": {
            borderBottom: "none"
        }
    },
    link:{
        color:"#fff",
        textDecoration:"none"
    }
}
export default withStyles(styles)(CartContent)