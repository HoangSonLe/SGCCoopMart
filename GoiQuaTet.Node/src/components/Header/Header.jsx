import React from 'react';
import BaseConsumer from 'BaseComponent/BaseConsumer'
import {
    withStyles,
    Grid, AppBar,
    Toolbar,
    Tab
} from '@material-ui/core'

import PersonIcon from '@material-ui/icons/Person';

import Cart from '../Main/Cart/Cart'

import { NavLink } from 'react-router-dom'
class Header extends BaseConsumer {
    consumerContent() {
        const { classes, cartInform } = this.props;
        const isActive = (path, match, location) => !!(match || path === location.pathname);
        return (
            <AppBar position="static" style={{ background: "#fff" }}>
                <Toolbar style={{ padding: 0 }}>
                    <Grid item xs={1} style={{ maxWidth: 80 }} >
                        <img src="/dist/contents/images/LeftCorner.png" alt=""></img>
                    </Grid>
                    <Grid item xs={2} style={{ maxWidth: 200 }} >
                        {/* <NavLink style={{ cursor: "pointer" }} exact to='/'><img src="/dist/contents/images/LogoCoop.png" alt="Logo"></img></NavLink> */}
                        <a
                            style={{ cursor: "pointer" }}
                            onClick={() => { this.goTo("/") }}
                            >
                            <img src="/dist/contents/images/LogoCoop.png" alt="Logo">
                            </img>
                        </a>
                    </Grid>
                    <Grid item xs={10} className={classes.middleHeader}>
                        <Grid item xs={11} className={classes.gridNavLink}>
                            <a
                                className={classes.divNavLink}
                                onClick={() => { this.goTo("/huong-dan-mua-hang") }}
                            >Hướng dẫn mua hàng</a>
                            <a
                                className={classes.divNavLink}
                                onClick={() => { this.goTo("/chinh-sach-giao-hang") }}
                            >Chính sách giao hàng</a>
                            <a
                                className={classes.divNavLink}
                                onClick={() => { this.goTo("/kiem-tra-don-hang") }}
                            >Kiểm tra đơn hàng</a>
                            {/* <NavLink className={classes.divNavLink} activeStyle={{color: '#133C8B',borderBottom:"3px solid red"}}  isActive={isActive.bind(this, '/huong-dan-mua-hang')} to="/huong-dan-mua-hang">Hướng dẫn mua hàng</NavLink>
                            <NavLink className={classes.divNavLink} activeStyle={{color: '#133C8B' ,borderBottom:"3px solid red"}}  isActive={isActive.bind(this, '/chinh-sach-giao-hang')} to="/chinh-sach-giao-hang">Chính sách giao hàng</NavLink>
                            <NavLink className={classes.divNavLink} activeStyle={{color: '#133C8B' ,borderBottom:"3px solid red"}}  isActive={isActive.bind(this, '/kiem-tra-don-hang')} to="/kiem-tra-don-hang">Kiểm tra đơn hàng</NavLink> */}
                        </Grid>

                        <Grid item xs={1} style={{ maxWidth: 80 }} className={classes.cartBox}>
                            <Cart cartInform={cartInform}></Cart>
                            <a><PersonIcon color="action" className={classes.iconLogin} ></PersonIcon></a>
                        </Grid>
                    </Grid>
                    <Grid item xs={1} style={{ maxWidth: 80 }}  >
                        <img src="/dist/contents/images/RightCorner.png" alt="Logo"></img>
                    </Grid>
                </Toolbar>
            </AppBar>
        );

    }
}
const styles = {
    gridNavLink: {
        display: "flex",
        justifyContent: "flex-end",
        maxHeight: 55,
        marginTop: 17
    },
    divNavLink: {
        fontFamily: "Roboto,sans-serif",
        fontSize: 18,
        lineHeight: "30px",
        fontWeight: 600,
        padding: "10px 18px",
        textTransform: "uppercase",
        textDecoration: "none",
        color: "#607cb3",
        textAlign: 'center',
        cursor: "pointer"
    },
    iconLogin: {
        padding: "10px 0px 5px",
        position: "absolute",
        fontSize: "2rem",
        '&:hover': {
            color: "black"
        }
    },
    cartBox: {
        maxHeight: 55,
        margin: "10px 10px 0 10px"
    },
    middleHeader: {
        background: "url('/dist/Contents/images/MiddleHeader.png')",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "flex-end",
        height: 100
    },
};

export default withStyles(styles)(Header)