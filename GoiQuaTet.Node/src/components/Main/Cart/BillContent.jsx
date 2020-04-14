import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles, Container, Box } from "@material-ui/core/";
import { formatMoney } from '../../../function/FunctionByMySelf'
class BillContent extends BaseConsumer {
    consumerContent() {
        let { classes, bill, index } = this.props;
        let table = bill.comboOrderList.map((i, index) => {
            return (
                <tr key={index}>
                    <td style={{ textAlign: "left" }}>{i.comboName}</td>
                    <td>{i.orderCombo.Note}</td>
                    <td>{i.orderCombo.Quantity}</td>
                    <td>{formatMoney(i.orderCombo.UnitPrice)}</td>
                </tr>
            )
        })
        return (
            <Box>
                <h3>Đơn hàng #{index + 1} (mã: {bill.order.Id})</h3>
                <Box className={classes.billContainer}>
                    <p>Chào {bill.order.CustomerName}</p>
                    <p>Đơn hàng {bill.order.Id} vừa được tạo.</p>
                    <p>Thông tin đơn hàng:</p>
                    <p style={{ textDecoration: "underline", fontWeight: "bold" }}>Người đặt hàng:</p>
                    <Box className={classes.Inform}>
                        <p>{bill.order.CustomerName}</p>
                        <p>123 Nguyễn Đình Chiểu, Tân An , Long An</p>
                        <p>{bill.order.CustomerPhone} - {bill.order.CustomerEmail}</p>
                    </Box>
                    <p style={{ textDecoration: "underline", fontWeight: "bold" }}>Người nhận hàng:</p>
                    <Box className={classes.Inform}>
                        <p>{bill.order.ReceiverName}</p>
                        <p>123 Nguyễn Đình Chiểu, Tân An , Long An</p>
                        <p>{bill.order.ReceiverPhone} - {bill.order.ReceiverEmail}</p>
                    </Box>
                    <p style={{ textDecoration: "underline", fontWeight: "bold" }}>Siêu thị giao hàng:</p>
                    <Box className={classes.Inform}>
                        <p>Tên: {bill.store.Name}</p>
                        <p style={{ fontWeight: "bold" }}>Địa chỉ: {bill.store.ContactInfo}</p>
                    </Box>
                    <p style={{ textDecoration: "underline", fontWeight: "bold" }}>Ghi chú khách hàng:</p>
                    <Box className={classes.Inform}>
                        <p>{bill.order.Note}</p>
                    </Box>
                    <p style={{ textDecoration: "underline", fontWeight: "bold" }}>Chi tiết sản phẩm:</p>
                    <Box className={classes.Inform}>
                        <table className={classes.table}>
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Ghi chú</th>
                                    <th>Số lượng</th>
                                    <th>Đơn giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {table}
                            </tbody>
                        </table>
                    </Box>
                    <Box className={classes.header}>
                        <p>Tổng tiền: {formatMoney(bill.order.TotalPrice)}</p>
                        <p style={{ textDecoration: "underline", fontWeight: "bold", display: "inline" }}>Số tiền cần đặt cột</p>
                        <p style={{ marginLeft: "10px", display: "inline" }}>{formatMoney(Number(bill.order.TotalPrice / 2))}</p>
                    </Box>
                    <p>Quý khách vui lòng thanh toán đơn hàng bằng 1 trong 2 cách sau:</p>
                    <p>1: Thanh toán online</p>
                    <p>Thông tin chuyển khoản: {bill.store.Name}</p>
                    <p>STK: {bill.store.AccountInfo}</p>
                    <p>Nội dung chuyển khoản: MÃ ĐƠN HÀNG - HỌ TÊN KHÁCH ĐẶT HÀNG - SĐT ĐẶT HÀNG</p>
                    <p>**** Quý khách vui lòng ghi rõ nội dung yêu cầu trong chuyển khoản</p>
                    <p>2: Thanh toán trực tiếp</p>
                    <p>Thanh toán tại quầy dịch vụ của bất kỳ siêu thị nào của hệ thống CoopMart trên toàn quốc.</p>
                </Box>
            </Box>
        )
    }
}
const style = {

    header: {
        textAlign: "center",
        color: "#423a3a",
    },
    billContainer: {
        border: "1px solid #3f51b5",
        borderTop: "40px solid #3f51b5",
        margin: "0 0 20px",
        padding: "10px 40px",
        "& p": {
            fontSize: 17
        },
    },
    Inform: {
        padding: "0 15px",
        wordWrap: "break-word",

    },
    table: {
        width: "100%",
        border: "1px solid #000000",
        marginTop: 20,
        fontSize: 18,
        textAlign: "right",
        borderCollapse: "collapse",
        "& td": {
            color: "#797979",
            border: "1px solid #000000",
            padding: 10,
        },
        "& th": {
            textAlign: "center",
            background: "#3f51b5",
            color: "#fff",
            border: "1px solid #000000",
            padding: 10,
        }
    },
}
export default withStyles(style)(BillContent)

