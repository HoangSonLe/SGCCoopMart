import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles, Container, Box, TextField, FormControl, InputLabel, Select } from "@material-ui/core";
//material ui icon
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import MessageIcon from '@material-ui/icons/Message';
//
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { formatMoney } from '../../../function/FunctionByMySelf'
import { 
    changeQuantityProductInCart, 
    changeInformProductItem, 
    findProductItemInLocal 
} from '../../../function/CartFunction'

class ComboItem extends BaseConsumer {
    constructor(props) {
        super(props);
        let itemEdited = findProductItemInLocal(this.props.productItem.comboInform);
        this.state = {
            dateDelivery: (itemEdited !== undefined && itemEdited.dateDelivery !== null) ? new Date(itemEdited.dateDelivery) : new Date(Date.now()),
            storeId: (itemEdited !== undefined && itemEdited.storeId !== null) ? itemEdited.storeId : "",
            note: itemEdited !== undefined ? itemEdited.note : null
        }
    }
    // hàm cập nhật inform
    _changeInformCartItem = (date, storeId, note) => {
        let data = {
            comboInform: this.props.productItem.comboInform,
            storeId: storeId,
            dateDelivery: date,
            note: note
        }
        console.log("data", data)
        let cart = changeInformProductItem(data);
        this.updateObject(this.props.cartInform, cart);

    }
    //change quantity
    _changeQuantityProduct = (quantity) => {
        let cart = changeQuantityProductInCart(this.props.productItem.comboInform, quantity);
        this.updateObject(this.props.cartInform, cart);
    }

    //Hàm sự kiện thay đổi cart item
    //thay đổi ngày cho từng sản phẩm
    _handleDateChange = (date) => {
        this.setState({
            dateDelivery: date
        });
        this._changeInformCartItem(date, this.state.storeId, this.state.note);
    }
    //thay đổi ghi chú cho từng sản phẩm
    _handleNoteChange = (e) => {
        this._changeInformCartItem(this.state.dateDelivery, this.state.storeId, this.state.note);
    }
    //thay đổi cửa hàng
    _handStoreChange = (e) => {
        this.setState({
            storeId: e.target.value
        });
        this._changeInformCartItem(this.state.dateDelivery, e.target.value, this.state.note);
    }
    //thay đổi số lượng sản phẩm
    _handChangeInput = (quantity) => {
        (quantity !== '') ? this._changeQuantityProduct(quantity - this.props.productItem.quantity) : null;
    }


    consumerContent() {
        const { classes, productItem, cartInform } = this.props
        let { dateDelivery, note, storeId } = this.state
        let optionList = "";
        if (productItem.comboInform.storeList.length > 0) {
            optionList = productItem.comboInform.storeList.map((e, index) => {
                return <option key={index} value={e.Id}>{e.Name}</option>
            })
        }
        return (
            <>
                <Container className={classes.container}>
                    <Box className={classes.boxLeft}>
                        <Box style={{ display: "flex" }}>
                            <CheckBoxIcon color="primary" />
                            <h3 style={{ margin: "0 10px 0" }}>{productItem.comboInform.combo.Name}</h3>
                        </Box>
                        <img style={{ width: 300, height: 270, margin: 10 }} src="/dist/contents/images/Gio_qua_Tet_Co.opmart.png"></img>
                    </Box>
                    <Box className={classes.boxRight}>
                        <Box className={classes.boxItem}>
                            <LocalAtmIcon color="disabled" className={classes.icon} />
                            <TextField
                                className={classes.inputText}
                                size="small"
                                value={productItem.quantity}
                                onChange={(e) => { this._handChangeInput(e.target.value) }}
                                inputProps={{ min: "0", max: "999", step: "1" }}
                                type="number"
                                variant="outlined"
                            />
                            <p>x {formatMoney(productItem.comboInform.combo.TotalPrice)}</p>
                        </Box>
                        <Box className={classes.boxItem}>
                            <img className={classes.icon} src="/dist/contents/images/logo.png" />
                            <FormControl fullWidth variant="outlined" >
                                <InputLabel style={{ top: -4 }}>Chọn cửa hàng ....</InputLabel>
                                <Select
                                    native
                                    className={classes.select}
                                    size="small"
                                    value={storeId}
                                    onChange={(e) => this._handStoreChange(e)}
                                    labelWidth={150}
                                >
                                    <option aria-label="None" value="" />
                                    {optionList}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box className={classes.boxItem}>
                            <AccessTimeIcon className={classes.icon} color="disabled" />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    value={dateDelivery}
                                    onChange={(e) => this._handleDateChange(e)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Box>
                        <Box className={classes.boxItem}>
                            <MessageIcon className={classes.icon} color="disabled" />
                            <TextField
                                className={classes.note}
                                label="Lời chúc"
                                multiline
                                rows="3"
                                variant="outlined"
                                value={note !== null ? note : ''}
                                onChange={(e) => this.setState({ note: e.target.value })}
                                onBlur={() => this._handleNoteChange()}
                            />
                        </Box>
                    </Box>
                </Container>
                <hr width="70%" />
                {/* <Container className={classes.container}>
                        
                </Container> */}
            </>

        );
    }
}
var style = {
    container: {
        width: "100%",
        margin: "0",
        display: "flex",
    },
    boxLeft: {
        width: 400,
    },
    boxRight: {
        width: 600,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1
    },
    boxItem: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        margin: "5px 0"
    },
    icon: {
        marginRight: 15,
        width: 25,
        height: 25
    },
    inputText: {
        padding: "0px",
        width: "60px",
        margin: "0 10px",
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0
        }
    },
    select: {
        height: 48,
        width: "90%",
        "& .MuiSelect-select": {
            padding: 10
        },
        "& .MuiSelect-icon": {
            borderLeft: "1px solid darkgrey"
        }
    },
    note: {
        width: "86%"
    }

};
export default withStyles(style)(ComboItem)
