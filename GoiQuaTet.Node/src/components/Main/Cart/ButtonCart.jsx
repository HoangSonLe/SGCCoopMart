import React from 'react';
import BaseConsumer from 'BaseComponent/BaseConsumer'
import { withStyles,ButtonGroup,Button,TextField } from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { changeQuantityProductInCart } from '../../../function/CartFunction'

class ButtonCart extends BaseConsumer {
    _changeQuantityProduct = (quantity) => {
        let cart = changeQuantityProductInCart(this.props.productCartItem.comboInform, quantity);
        this.updateObject(this.props.cartInform, cart);
    }
    _handChangeInput = (quantity) => {
        (quantity !== '') ? this._changeQuantityProduct(quantity - this.props.productCartItem.quantity) : null;
    }
    consumerContent() {
        let { classes, productCartItem } = this.props;
        return (
            <ButtonGroup size="small" color="primary" aria-label="outlined primary button group">
                <Button onClick={() => this._handChangeInput(productCartItem.quantity - 1)}>
                    <RemoveIcon></RemoveIcon>
                </Button>
                <Button style={{ padding: 0 }}>
                    <TextField
                        className={classes.inputText}
                        size="small"
                        value={productCartItem.quantity}
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
                </Button>
                <Button onClick={() => this._handChangeInput(productCartItem.quantity + 1)}>
                    <AddIcon></AddIcon>
                </Button>
            </ButtonGroup>
        );

    }
}
const styles = {
    inputText: {
        margin: 0,
        padding: "0px",
        width: "60px",
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0
        }
    },
    notchedOutline: {
        padding: 0,
        border: "none",
    },
}
export default withStyles(styles)(ButtonCart)