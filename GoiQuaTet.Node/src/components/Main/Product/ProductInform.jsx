import React from 'react';
import PropTypes from 'prop-types';
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { Box, Grid, Toolbar, TextField, Button, Container } from '@material-ui/core'
import { withStyles } from '@material-ui/core'

import { addProductInCart } from '../../../function/CartFunction'

class ProductInform extends BaseConsumer {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    _handChangeInput = (quantity) => {
        this.setState({
            value: quantity
        })
    }
    _handleAddToCart = () => {
        let { value } = this.state;
        if (value > 0) {
            let cart = addProductInCart(this.props.product, Number(this.state.value));
            console.log(cart)

            this.updateObject(this.props.cartInform, cart);
            this.success("Thêm thành công",2500)
        }
        else{
            this.sweetAlertError("Nhập số lượng")
        }
    }
    consumerContent() {
        let { value } = this.state;
        const { classes, product } = this.props;
        return (
            <Container className={classes.root}>
                <Box>
                    <Toolbar style={{ padding: 0 }}>
                        <Grid item xs={2} className={classes.grid}>
                            <img src="/dist/contents/images/Gio_qua_Tet_Co.opmart.png" className={classes.slideImage}></img>
                        </Grid>
                        <Grid item xs={7} className={classes.grid}>
                            <img src="/dist/contents/images/Gio_qua_Tet_Co.opmart.png" className={classes.Image}></img>
                        </Grid>
                        <Grid item xs={3} className={classes.grid}>
                            <Box className={classes.divProductInfo}>
                                <h3><a>{product.combo.Name}</a></h3>
                                <h4> {product.combo.TotalPrice} đ</h4>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <p style={{ color: "#22699c" }}>SỐ LƯỢNG: </p>
                                    <TextField
                                        className={classes.inputText}
                                        size="small"
                                        defaultValue={value}
                                        onChange={(e) => { this._handChangeInput(e.target.value) }}
                                        inputProps={{ min: "0", max: "999", step: "1" }}
                                        type="number"
                                        InputProps={{
                                            classes: {
                                                notchedOutline: classes.notchedOutline
                                            }
                                        }}
                                        variant="outlined"
                                    />
                                </div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ width: "240px" }}
                                    onClick={() => this._handleAddToCart()}
                                >
                                    Thêm vào giỏ
                                </Button>
                            </Box>
                        </Grid>
                    </Toolbar>
                </Box>
                <Box>
                    <small style={{ color: "#999" }}>Hình ảnh chỉ mang tính chất minh họa</small>
                    <br></br>
                    <small style={{ color: "#999" }}>Thành phần mỗi combo chỉ bao gồm những món được liệt kê trong danh sách</small>
                </Box>
            </Container>
        );
    }
}
const styles = {
    root: {
        padding: "20px"
    },
    grid: {
        textAlign: "center",
        height: "360px"
    },
    inputText: {
        display: 'block',
        margin: "10px 0 15px 10px",
        padding: "0px",
        width: "50%",

    },
    slideImage: {
        maxWidth: "120px",
        maxHeight: "110px"
    },
    Image: {
        width: "500px",
        height: "350px",
        border: "1px solid #e1e1e1",
    },
    divProductInfo: {
        textAlign: "left",
        marginTop: "10px",
        "& h3": {
            color: "#22699c",
            margin: "0 0 10px 0",
            cursor: "pointer",
            fontSize: "20px"
        },
        "& h3:hover": {
            color: "red",
        },
        "& h4": {
            color: "#bc25c4",
            margin: "0 0 10px 0"
        }
    },
    inputText: {
        margin: 0,
        padding: "0px",
        width: "60px",
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0
        }
    },
}

export default withStyles(styles)(ProductInform)