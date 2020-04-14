import React from 'react';
import BaseConsumer from 'BaseComponent/BaseConsumer'

import { Popover, Badge } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import CartContent from '../Cart/CartContent';

class Cart extends BaseConsumer {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false
        }
    }
    _handlePopoverOpen = (event) => {
        this.setState({
            open: true,
            anchorEl: event.currentTarget
        })
    }
    _handlePopoverClose = () => {
        this.setState({
            open: false,
            anchorEl: null
        })
    }
    consumerContent() {

        const { cartInform } = this.props;
        const { anchorEl, open } = this.state;
        return (
            <>
                <Badge
                    badgeContent={cartInform !== null ? cartInform.totalProduct : 0}
                    color="primary"
                    onClick={(e) => { this._handlePopoverOpen(e) }}
                >
                    <a><ShoppingCartIcon style={{ color: "#ED0678", fontSize: "2.5rem" }}></ShoppingCartIcon></a>
                </Badge>
                <Popover
                    style={{ maxHeight: 500 }}
                    id="mouse-over-popover"
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: -200,
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={() => this._handlePopoverClose()}
                >
                    <CartContent cartInform={cartInform} style={{ width: "200px" }}></CartContent>
                </Popover>
            </>
        );

    }
}
export default Cart