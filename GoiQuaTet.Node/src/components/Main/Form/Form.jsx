import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles, Container, Box, TextField, Grid, Checkbox, FormControl, InputLabel, Select } from "@material-ui/core";
import FormInform from './FormInform';
import { TYPEINFORMCUSTOMER } from '../../../constants/constant'
import ComboItem from './ComboItem';

class Form extends BaseConsumer {
    _handleSelectChange = (event) => {
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }
    consumerContent() {
        const { classes, handleUpdateInform, informReceiver, informCustomer,cartInform,handleCheckBox } = this.props
        let comboItems="Không có sản phẩm nào!.Mời bạn tiếp tục mua hàng";
        if(cartInform.productListInCart.length>0){
            comboItems= cartInform.productListInCart.map((e,index)=>{
                return <ComboItem key={index} productItem={e} cartInform={cartInform}></ComboItem>
            })
        }
        return (
            <Container className={classes.container}>
                <Box className={classes.boxContainer}>
                    <FormInform infor={informCustomer} handleUpdateInform={handleUpdateInform} typeInputInform={TYPEINFORMCUSTOMER.CUSTOMER}></FormInform>
                    <FormInform infor={informReceiver} handleUpdateInform={handleUpdateInform} typeInputInform={TYPEINFORMCUSTOMER.RECEIVER}></FormInform>
                </Box>
                <Box className={classes.boxContainer}>
                    <Box style={{ display: "flex", width: "50%" }}>
                        <Grid item xs={3} style={{ margin: "auto" }}>
                            <h4 className={classes.Label}>Mã KHTT</h4>
                        </Grid>
                        <Grid item xs={10} style={{ margin: "auto" }}>
                            <TextField
                                size="small"
                                className={classes.formcontrol}
                                placeholder="7 chữ số"
                                variant="outlined"
                                onBlur={(e)=>{
                                   this.props.handleUpdateKHTT(e.target.value);
                                }}
                            />

                        </Grid>
                    </Box>
                    <Box style={{ display: "flex", width: "50%" }}>
                        <Grid item xs={3} style={{ margin: "auto" }}>
                            <h4 className={classes.Label}>Gửi tới tôi:</h4>
                        </Grid>
                        <Grid item xs={10} style={{ margin: "auto" }}>
                            <Checkbox
                                color="primary"
                                checked={informCustomer.isReceiver}
                                onChange={(e)=>handleCheckBox(e)}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />

                        </Grid>
                    </Box>
                </Box>
                <Box style={{ margin: "auto", width: "50%" }}>
                    <Box className={classes.selectAddProduct}>
                        <p>Chọn thêm sản phẩm vào đơn hàng</p>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel style={{ top: -4 }}>Chọn sản phẩm ....</InputLabel>
                            <Select
                                native
                                className={classes.select}
                                size="small"
                                name={'selectValue'}
                                value={""}
                                // onChange={(e) => this._handleSelectChange(e)}
                                labelWidth={150}
                            >
                                <option aria-label="None" value="" />
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box>
                    {comboItems}
                </Box>
            </Container>

        );
    }
}
var style = {
    container: {
        width: "100%",
        marginBottom: 20,
    },
    selectAddProduct: {
        border: "1px solid #e1e1e1",
        borderRadius: "15px",
        margin: 15,
        padding: 20,
        textAlign: "center",
        "& p": {
            marginTop: 0,
            color: "#8f8c8c"
        }
    },
    select: {
        height: 48,
        "& .MuiSelect-select": {
            padding: 0
        },
        "& .MuiSelect-icon": {
            borderLeft: "1px solid darkgrey"
        }
    },
    grid: {
        display: "flex",
        marginTop: 10
    },
    boxContainer: {
        display: "flex",
        width: "100%"
    },
    formcontrol: {
        marginTop: 10,
        width: 227
    },
    Label: {
        color: "#3f51b5",
    },
};
export default withStyles(style)(Form)
