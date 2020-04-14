import React from 'react';
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles, Box, Fab, Tooltip } from '@material-ui/core'

import VisibilityIcon from '@material-ui/icons/Visibility';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import ProductModal from './ProductModal';

import { addProductInCart } from '../../../function/CartFunction'
import { formatMoney } from '../../../function/FunctionByMySelf';
class ProductItem extends BaseConsumer {
    _handleClickDetail = (id) => {
        // this.ajaxGet({
        //     url: '/api/combo/GetCombo/',
        //     data: { id: id },
        //     success: (response) => {
        //         let product = response.Data;
        //         this.openModal(() => {
        //             return ({
        //                 title: "THÔNG TIN SẢN PHẨM",
        //                 body: <ProductModal product={product}></ProductModal>, // nội dung
        //                 otherProps: {
        //                     slideDirection: "left", // or "right", "down", "up", phía xuất hiện và biến mất của modal
        //                     freeSize: false,// false, nếu true thì kích thước modal sẽ tuỳ thuộc vào body
        //                 }
        //             })
        //         })
        //     },
        //     error: (res) => {
        //         console.log("Lỗi API")
        //     },
        // })
        this.openModal(() => {
            return ({
                title: "THÔNG TIN SẢN PHẨM",
                body: <ProductModal cartInform={this.props.cartInform} product={this.props.product}></ProductModal>, // nội dung
                otherProps: {
                    slideDirection: "left", // or "right", "down", "up", phía xuất hiện và biến mất của modal
                    freeSize: false,// false, nếu true thì kích thước modal sẽ tuỳ thuộc vào body
                }
            })
        })

    }
    _handleClickAddToCart = (product, q) => {
        let cart = addProductInCart(product, q);
        this.updateObject(this.props.cartInform, cart);
        this.success("Thêm thành công",2500)
    }
    consumerContent() {
        const { classes, product } = this.props;
        let point = product.storeGroupList.map((e, index) => {
            return <span key={index}>{e + " "}</span>;
        });
        return (
            <Box className={classes.divProduct}>
                <Box style={{ position: "absolute", background: "#fff", borderRadius: "10px", }}>
                    <div className={classes.divProductImage}>
                        <img src="/dist/contents/images/Gio_qua_Tet_Co.opmart.png" className={classes.Image}></img>
                        <div className={classes.divProductButton}>
                            <Tooltip title="Xem chi tiết" placement="top" >
                                <Fab size="small" className={classes.divIconImage} onClick={() => { this._handleClickDetail(product.combo.Id) }}>
                                    <VisibilityIcon className={classes.iconImage} />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="Thêm vào giỏ" placement="top">
                                <Fab size="small" className={classes.divIconImage} onClick={() => { this._handleClickAddToCart(product, 1) }}>
                                    <ShoppingCartIcon className={classes.iconImage} />
                                </Fab>
                            </Tooltip>
                        </div>
                    </div>
                    <Box className={classes.divProductInfo}>
                        <h3 className={classes.h3}><a>{product.combo.Name}</a></h3>
                        <h4>{formatMoney(product.combo.TotalPrice)}</h4>
                    </Box>
                </Box>
                <div className={classes.cover}>
                    <div className={classes.ribbon}>
                        {point}
                    </div>
                    <div className={classes.coverTop}></div>
                    <div className={classes.coverRight}></div>
                </div>
            </Box>
        );

    }
}
const styles = {
    divProduct: {
        width: "214.4px",
        display: "inline-block",
        margin: 15,
        height: 285,
        position: "relative",
        transition: "0.3s ease",
        borderRadius: "10px",
        border: "1px solid #e1e1e1",
        boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.15), -6px -6px 12px 0 rgba(255, 255, 255, 0.1)",
        "&:hover": {
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            opacity: 0.85,
            // top: -15,
            transform: "scale(1.06)"
        }
    },
    divProductImage: {
        position: "relative",
        height: 210,
        minHeight: 150
    },
    Image: {
        width: "100%",
        // border: "1px solid #e1e1e1",
        borderRadius: "10px",

    },
    divIconImage: {
        margin: "0 5px",
        opacity: 0.5,
        background: 'rgba(0,0,0,.5)',
        "&:hover": {
            opacity: 1,
            background: '#384145',
        }
    },
    iconImage: {
        color: "#fff",
        opacity: 0.9,
    },
    divProductButton: {
        position: "absolute",
        top: "173px",
        left: "10px"
    },

    divProductInfo: {
        textAlign: "center",
        marginTop: "10px",
        "& h4": {
            color: "#bc25c4",
            margin: "0 0 10px 0"
        },

    },
    h3: {
        color: "#22699c",
        margin: "0 0 10px 0",
        cursor: "pointer",
        fontSize: "17px",
        height: "20px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "100%",
        "&:hover": {
            color: "red",
        },
    },
    box: {
        position: "relative",
        top: 200,
        left: 200,
        width: 500,
        height: 300,
        background: "black"
    },
    cover: {
        width: 200,
        height: 100,
        position: "absolute",
        right: 0
    },
    ribbon: {
        borderBottom: "30px solid #7ca6ff",
        borderLeft: "30px solid transparent",
        borderRight: " 30px solid transparent",
        height: 0,
        width: "75%",
        textAlign: "center",
        transform: "rotate(45deg)",
        position: "relative",
        left: 46,
        top: 36,
        zIndex: 2,
        fontFamily: "Roboto",
        color: "#fff",
        fontSize: 13
    },

    coverTop: {
        background: "blue",
        width: 36,
        height: 55,
        position: "absolute",
        left: 66,
        top: -12,
        zIndex: -1
    },
    coverRight: {
        position: "absolute",
        background: "blue",
        width: 26,
        height: 26,
        right: -14,
        bottom: -36,
        zIndex: -1
    }
}
export default withStyles(styles)(ProductItem)