import React from 'react';
import BaseConsumer from 'BaseComponent/BaseConsumer'
import { withStyles, Container } from '@material-ui/core'
import {NavLink} from 'react-router-dom'

class ContentGuide extends BaseConsumer {
    _handClickPolicy = (e) => {
        window.open(e, '_self')
    }
    consumerContent() {
        let { classes } = this.props
        return (
            <Container className={classes.container}>
                <h2>HƯỚNG DẪN MUA HÀNG</h2>
                <h4>1. Mua hàng</h4>
                <p>
                    - Thời gian nhận đặt hàng: từ nay đến 15/1/2020.
                    <br />
                    - Thời gian giao hàng: từ 02/1 đến 18/1/2020.
                </p>
                <p>
                    Khi đặt hàng khách hàng cần điền các thông tin chính xác và bắt buộc như: Họ tên người mua hàng, họ tên người nhận hàng, địa chỉ, số điện thoại,...
                    Siêu thị có thể sẽ liên lạc lại để kiểm tra thông tin và thỏa thuận thêm những điều có liên quan
                    <br />
                    Địa chỉ giao hàng có đầy đủ thông tin người nhận hàng, địa chỉ, số điện thoại chính xác, rõ ràng.
                    Siêu thị sẽ không chịu trách nhiệm khi khách hàng ghi sai thông tin người nhận.
                </p>

                <h4>2. Giá bán:</h4>
                <p>
                    Miễn phí giấy và công gói quà.
                    <br />
                    Giá các mẫu quà chưa bao gồm khay, giỏ và nơ. Chi phí giỏ quà và nơ: 50.000đ - 100.000đ
                    <br />
                    Giao hàng tận nơi. Vui lòng xem chính sách giao hàng <NavLink className={classes.link} to="/chinh-sach-giao-hang">tại đây</NavLink>.
                </p>
                <h4>3. Thanh toán:</h4>
                <p>
                    Siêu thị nhận đơn hàng sẽ liên lạc với khách hàng để kiểm tra thông tin và hướng dẫn khách hàng thủ tục thanh toán hóa đơn.
                    <br />
                    Bao gồm các hình thức sau: thanh toán bằng tiền mặt khi nhận hàng (nếu khách mua hàng và nhận hàng là một),
                    khách hàng đến siêu thị bất kỳ thanh toán hóa đơn, hoặc siêu thị cung cấp thông tin chuyển khoản để khách hàng chuyển khoản 50% -100% giá trị đơn hàng.
                </p>
                <h4>4. Kiểm tra đơn hàng:</h4>
                <p>
                    Khách hàng vào website <NavLink className={classes.link} to="/kiem-tra-don-hang">http://gioquatet.co-opmart.com.vn/KiemTraDonHang</NavLink> , nhập mã đơn hàng và email để kiểm tra đơn hàng.
                    <br />
                    Sau khi đặt hàng và giao hàng thành công, siêu thị sẽ gửi email thông báo đến khách hàng biết thông tin.
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
        "& p": {
            margin: 0
        },
        "& h2": {
            color: "rgb(19, 60, 139)",
            textAlign: "center",
            margin: 0,
            fontWeight: "bold",
            fontFamily: "Roboto,sans-serif"
        },
        "& h4": {
            margin: 0
        },
    },
    link: {
        cursor: "pointer",
        "&:hover": {
            color: "black"
        }
    }
}
export default withStyles(style)(ContentGuide)