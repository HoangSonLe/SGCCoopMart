import React from 'react';
import BaseConsumer from 'BaseComponent/BaseConsumer'
import { withStyles,Grid,AppBar,Toolbar,Container,TextField,Box } from '@material-ui/core'

import Button from 'components/CustomButtons/Button';
import SearchIcon from '@material-ui/icons/Search';

class Footer extends BaseConsumer {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    consumerContent() {
        const { classes } = this.props;
        return (
            <div >
                <AppBar position="static" style={{ background: "#fff", marginTop: 50, boxShadow: "none" }}>
                    <Toolbar>
                        <Grid item xs={3} >
                            <a href='?'><img src="/dist/contents/images/FooterCorner.jpg" alt="Logo"></img></a>
                        </Grid>
                        <Grid item xs={5} style={{ margin: "0 30px" }}>
                            <Container>
                                <div className={classes.footerInfo}>
                                    <h4>Hệ thống siêu thị Co.opmart <a href="?">(Xem thông tin liên hệ tại đây)</a></h4>
                                    <ul>
                                        <li>Tổng đài CSKH: 1900.5555.68</li>
                                        <li><a>chamsockhachhang@coopmart.vn</a></li>
                                    </ul>
                                </div>
                            </Container>
                            <Container>
                                <div className={classes.footerInfo}>
                                    <h4><a>Hệ thống siêu thị Co.opmart (Xem thông tin liên hệ tại đây)</a></h4>
                                    <ul>
                                        <li>Tổng đài CSKH: 1900.5555.68</li>
                                        <li><a>chamsockhachhang@coopmart.vn</a></li>
                                    </ul>
                                </div>
                            </Container>
                        </Grid>
                        <Grid item xs={6}>
                            <Container>
                                <div className={classes.footerForm}>
                                    <h4>Kiểm tra đơn hàng</h4>
                                    <Box>
                                        <TextField className={classes.inputText} fullWidth={true} label="Email khách hàng" placeholder="Nhập email khách hàng" variant="outlined" />
                                    </Box>
                                    <Box>
                                        <TextField className={classes.inputText} fullWidth={true} label="Mã đơn hàng" placeholder="Nhập mã đơn hàng" variant="outlined" />
                                    </Box>
                                    <small style={{ color: "#999" }}>(Vui lòng nhập đầy đủ 02 thông tin trên)</small>
                                    <Box style={{display:"flex",justifyContent: "flex-end",}}>
                                        <Button
                                            justIcon
                                            color="primary"
                                        >
                                            <SearchIcon style={{ fontSize: "30px", margin:"0" }} />
                                        </Button>
                                    </Box>
                                </div>
                            </Container>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );

    }
}
const styles = {
    footerInfo: {
        color: "#133C8B",
        "& ul": {
            paddingLeft: "10px",

            listStyleType: "none"
        },
        "& li": {
            lineHeight: "28px",
            color: "#7c7c7c !important"
        },
        "& a": {
            color: "#999",
            cursor: "pointer",
            textDecoration: "none",
            "&:first-child": {
                color: "#133C8B",
                "&:hover": {
                    color: "#ED0677",
                }
            },
            "&:hover": {
                color: "#133C8B",
                paddingLeft: "10"
            }
        },

    },
    footerForm: {
        color: "#133C8B",
    },
    inputText: {
        display: 'block',
        marginTop: "10px",
    }
};

export default withStyles(styles)(Footer)