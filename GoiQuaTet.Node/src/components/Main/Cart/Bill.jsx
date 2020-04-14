import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles, Container, Box } from "@material-ui/core/";
import { formatMoney } from '../../../function/FunctionByMySelf'
import BillContent from './BillContent'
class Bill extends BaseConsumer {
    consumerContent() {
        let { classes, billInformList } = this.props;
        let ele="Lỗi";
        let totalPrice = 0;
        let emailCustomer = "";
        (billInformList== null || billInformList== undefined) ? billInformList=[]: null;
        console.log(billInformList)
        ele = billInformList.map((e, index) => {
            totalPrice+=e.order.TotalPrice;
            emailCustomer = e.order.CustomerEmail;
            return <BillContent key={index} bill={e} index={index} ></BillContent>
        })
        
        return (
            <Container className={classes.container}>
                <Box className={classes.header}>
                        <p>BẠN ĐÃ ĐẶT THÀNH CÔNG {billInformList.length} ĐƠN HÀNG</p>
                        <p>Tổng số tiền cần thanh toán trước : {formatMoney(totalPrice/2)}</p>
                        <p>Thông tin về các đơn hàng đã được gửi về email: {emailCustomer}</p>
                    </Box>
                {ele}
            </Container>
        );
    }
}
const style = {
    container: {
        margin: "30px 0",
        padding: 0,
        fontFamily: "Roboto,sans-serif",
        "& h3": {
            marginBottom: 5
        }
    },
    header: {
        textAlign: "center",
        color: "#423a3a",
    }
}
export default withStyles(style)(Bill)

