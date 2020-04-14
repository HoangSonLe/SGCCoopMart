import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles, Container, Box, Grid } from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { formatMoney, findNameStore, createDate } from '../../../function/FunctionByMySelf'
class CheckCart extends BaseConsumer {
    consumerContent() {
        const { classes, data } = this.props
        let customerInform = data.customerInform;
        let receiverInform = data.receiverInform;
        let orderGroupList = data.cartGroup;
        console.log("orderGroupList",orderGroupList)
        let ele = "";
        ele = orderGroupList.map((i, index) => {
            let totalPriceOrder = 0;
            let item = i.map((e,index) => {
                totalPriceOrder += e.quantity * e.comboInform.combo.TotalPrice;
                return (
                    <tr key={index}>
                        <td style={{ textAlign: "left" }}>{e.comboInform.combo.Name}</td>
                        <td>{e.quantity}</td>
                        <td>{formatMoney(e.comboInform.combo.TotalPrice)}</td>
                        <td>{formatMoney(e.quantity * e.comboInform.combo.TotalPrice)}</td>
                    </tr>
                );
            })
            return (
                <Box key={index} >
                    <h4 className={classes.billHeader}>ĐƠN HÀNG #{index + 1}</h4>
                    <Box className={classes.billTop}>
                        <p>
                            <img style={{ width: 20, height: 20 }} src="/dist/contents/images/logo.png"></img>
                            Siêu thị giao hàng: {findNameStore(i[0].storeId, i[0].comboInform.storeList)}
                        </p>
                        <p><AccessTimeIcon style={{ width: 20, height: 20 }}></AccessTimeIcon>{createDate(new Date(i[0].dateDelivery))}</p>
                    </Box>
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th>Tên Combo</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                item
                            }
                        </tbody>
                    </table>
                    <Box className={classes.billBottom}>
                        <Box className={classes.billTitleBottom}>
                            <p>Tổng:</p>
                            <p>Phí vận chuyển:</p>
                            <p>THÀNH TIỀN:</p>
                            <p>Cần thanh toán trước:</p>
                        </Box>
                        <Box className={classes.billTitleBottom} style={{ marginLeft: "80px" }}>
                            <p>{formatMoney(totalPriceOrder)}</p>
                            <p>0</p>
                            <p>{formatMoney(totalPriceOrder)}</p>
                            <p>{formatMoney(totalPriceOrder / 2)}</p>
                        </Box>
                    </Box>
                </Box>
            );
        })
        let customer = (
            <Grid item xs={6}>
                <h4>Thông tin người gửi:</h4>
                <p>{customerInform.Name}</p>
                <p>{customerInform.Phone}</p>
                <p>{customerInform.Address}</p>
                <p>{customerInform.Email}</p>

            </Grid>
        );
        let receiver = "";
        if (!customerInform.isReceiver) {
            receiver = (
                <Grid item xs={6}>
                    <h4>Thông tin người nhận:</h4>
                    <p>{receiverInform.Name}</p>
                    <p>{receiverInform.Phone}</p>
                    <p>{receiverInform.Address}</p>
                    <p>{receiverInform.Email}</p>
                </Grid>
            )
        }
        else receiver = customer;
        return (
            <Container className={classes.container}>
                <Box className={classes.boxContainer}>
                    {customer}
                    {receiver}
                </Box>
                <Box >
                    <Box className={classes.top}>
                        <h2>XÁC NHẬN {Object.keys(orderGroupList).length} ĐƠN HÀNG</h2>
                        <h3>Tổng giá trị: {formatMoney(data.totalPrice)} (Miễn phí giao hàng)</h3>
                        <h3>Cần thanh toán trước {formatMoney(data.totalPrice / 2)}</h3>
                    </Box>
                    {ele}
                </Box>
            </Container>

        );
    }
}
var style = {
    container: {
        width: "100%",
        marginBottom: 20,
        fontFamily: "Roboto,sans-serif"
    },
    billHeader: {
        textDecoration: "underline",
        color: "#263aab",
        textTransform: "uppcase",
        fontStyle: "italic",
        margin: "10px"
    },
    billTop: {
        display: "flex",
        textAlign: "center",
        "& p": {
            color: "#797979",
            margin: "0 100px",
            fontSize: "16px"
        }
    },
    billBottom: {
        display: "flex",
        justifyContent: "flex-end"
    },
    billTitleBottom: {
        textAlign: "right",
        fontSize: 18,
        color: "#263aab",
        "& p:last-child": {
            fontWeight: "bold"
        }
    },
    top: {
        textAlign: "center",
        color: "#263aab"
    },
    table: {
        width: "100%",
        border: "1px solid #797979",
        marginTop: 20,
        fontSize: 18,
        textAlign: "right",
        borderCollapse: "collapse",
        "& td": {
            color: "#797979",
            border: "1px solid #797979",
            padding: 20,
        },
        "& th": {
            textAlign: "center",
            color: "#263aab",
            border: "1px solid #797979",
            padding: 20,
        }
    },
    boxContainer: {
        display: "flex",
        width: "100%",
        borderBottom: "1px solid #e1e1e1",
        "& h4": {
            textDecoration: "underline",
            color: "#67645c"
        },
        "& p": {
            color: "#797979",
            paddingLeft: 10
        }
    },
};
export default withStyles(style)(CheckCart)
