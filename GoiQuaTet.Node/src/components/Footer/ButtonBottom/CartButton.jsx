import React from 'react';
import BaseConsumer from 'BaseComponent/BaseConsumer'
import { withStyles } from '@material-ui/core'
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Fab from '@material-ui/core/Fab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';

class CartButton extends BaseConsumer {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    consumerContent() {
        const { classes } = this.props;
        const { value } = this.state;
        const handleChange = (event, newValue) => {
            this.setState({ value: newValue })
        };

        return (
            <Fab color="secondary" aria-label="add" className={classes.margin}>
                <Badge badgeContent={4} color="primary">
                    <a><ShoppingCartIcon style={{ color: "#ED0678", fontSize: "2.5rem" }}></ShoppingCartIcon></a>
                </Badge>
            </Fab>
        );

    }
}
const styles = {
};

export default withStyles(styles)(CartButton)