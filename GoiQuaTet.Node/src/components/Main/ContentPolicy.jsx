import React from 'react';
import BaseConsumer from 'BaseComponent/BaseConsumer'
import { withStyles, Container } from '@material-ui/core'
class ContentPolicy extends BaseConsumer {
    consumerContent() {
        let { classes } = this.props
        return (
            <Container className={classes.container}>
                <h2>CHÍNH SÁCH GIAO HÀNG</h2>
                <p>
                    Nhằm tạo ra sự hài lòng cao nhất từ Quý khách hàng,
                    chúng tôi xin giới thiệu đến Quý khách hàng chính sách giao hàng miễn phí được áp dụng cho dịch vụ đặt hàng Giỏ quà Tết năm 2020:
                </p>
                <ul>
                    <li>
                        Giao hàng miễn phí trong bán kính 6km cho các hóa đơn mua hàng từ 200.000đ.
                    </li>
                    <li>
                        Giao hàng miễn phí trong bán kính 10km cho các hóa đơn mua hàng từ 500.000đ.
                    </li>
                    <li>
                        Giao hàng miễn phí trong bán kính 15km cho các hóa đơn mua hàng từ 2.000.000đ.
                    </li>
                </ul>
                <p>
                    Trường hợp khách hàng có nhu cầu được giao hàng tại địa điểm xa hơn bán kính giao hàng miễn phí đã quy định,
                    khách hàng chịu thêm phí vận chuyển quà Tết: 5.000đ trên 01 km vượt quá quy định của 01 địa chỉ nhận hàng.
                </p>
                <p>
                    Ngoài ra còn có Dịch vụ giao hàng trên toàn quốc với chi phí thỏa thuận tùy theo từng lộ trình.
                    Thỏa thuận này được thực hiện giữa siêu thị giao hàng và khách đặt hàng.
                </p>
            </Container>
        );

    }
}
const style = {
    container: {
        padding: 20,
        color: "#545454",
        lineHeight: 2,
        "& h2": {
            color: "rgb(19, 60, 139)",
            textAlign: "center",
            margin:0,
            fontWeight:"bold",
            fontFamily:"Roboto,sans-serif"
        }
    }
}
export default withStyles(style)(ContentPolicy)