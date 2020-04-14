import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles, Container, Stepper, Step, StepLabel, Button } from "@material-ui/core/";

import Form from '../Form/Form';

import { TYPEINFORMCUSTOMER } from '../../../constants/constant'
import CheckCart from '../Form/CheckCart';
import { groupComboByStoreID } from '../../../function/CartFunction'
import Bill from './Bill';
class CartCheckOut extends BaseConsumer {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            customerInform: {
                Name: 'test',
                Phone: '09099090',
                Email: 'test@gmail.com.vn',
                Address: 'test HCM',
                isReceiver: true,
                KHTTID: '',
            },
            receiverInform: {
                Name: '',
                Phone: '',
                Email: '',
                Address: '',
            },
            dataReturn: []
        }
        this.dataSendToServer = null;
        this.steps = ['Thông tin khách hàng', 'Kiểm tra đơn hàng', 'Xác nhận tạo đơn hàng'];

    }
    //Hàm
    _getStepContent = (stepIndex) => {
        let { customerInform, receiverInform, dataSendToServer } = this.state;
        let { cartInform } = this.props;

        switch (stepIndex) {
            case 0:
                return (<Form
                    cartInform={cartInform}
                    informCustomer={customerInform}
                    informReceiver={receiverInform}
                    handleUpdateInform={this._handleUpdateInform}
                    handleCheckBox={this._handleCheckBox}
                    handleUpdateKHTT={this._handleUpdateKHTT}
                >
                </Form>);
            case 1:
                this.dataSendToServer = groupComboByStoreID(cartInform, customerInform, receiverInform);
                return <CheckCart data={this.dataSendToServer}></CheckCart>;
            case 2:
                return <Bill billInformList={this.state.dataReturn}></Bill>;
            default:
                return 'Unknown stepIndex';
        }
    }
    _checkEnoughInform = () => {
        let { customerInform, receiverInform } = this.state;
        let { cartInform } = this.props;
        let check = true;
        if (!customerInform["isReceiver"]) {
            Object.keys(receiverInform).forEach(key => {
                if (key == "Email") return;
                (receiverInform[key] == "") ? check = false : null;
            })
        }
        Object.keys(customerInform).forEach(key => {
            if (key == "isReceiver" || key == "KHTTID") return;
            (customerInform[key] == "") ? check = false : null;
        });
        cartInform.productListInCart.forEach(element => {
            Object.keys(element).forEach(key => {
                if (key == "comboInform" || key == "note") return;
                (element[key] == null || element[key] == 0 || element[key] == "") ? check = false : null;
            });
        });

        return check;
    }
    //Hàm sự kiện
    _handleUpdateKHTT = (value) => {
        let customer = JSON.parse(JSON.stringify(this.state.customerInform));
        Object.assign(customer, { KHTTID: value });
        this.setState({
            customerInform: customer,
        });
    }
    _handleUpdateInform = (type, value) => {
        let customer = JSON.parse(JSON.stringify(this.state.customerInform));
        let receiver = JSON.parse(JSON.stringify(this.state.receiverInform));
        (type == TYPEINFORMCUSTOMER.CUSTOMER) ? Object.assign(customer, value) : Object.assign(receiver, value);
        this.setState({
            customerInform: customer,
            receiverInform: receiver
        });
    }
    _handleCheckBox = (e) => {
        let customer = JSON.parse(JSON.stringify(this.state.customerInform));
        customer.isReceiver = e.target.checked;
        this.setState({
            customerInform: customer
        })
    }

    _handleNext = () => {
        if (this.state.activeStep + 1 == this.steps.length - 1) {
            console.log("da", this.dataSendToServer)
            this.ajaxPost({
                url: '/api/order/CreateOrder/',
                data: JSON.stringify(this.dataSendToServer),
                success: (response) => {
                    this.setState({
                        dataReturn: response.Data
                    })
                    localStorage.removeItem("cart")
                    let cart = { productListInCart: [], totalPrice: 0, totalProduct: 0 }
                    this.updateObject(this.props.cartInform, cart);
                    console.log("dataReturn", response.Data);
                },
                unsuccess: (res) => {
                    console.log("Lỗi API")
                }
            });
        }
        let check = true;
        (this.state.activeStep == 0) ? check = this._checkEnoughInform() : null;
        (check) ? this.setState({ activeStep: this.state.activeStep + 1 }) : this.sweetAlertError("Vui lòng điền đủ thông tin mua hàng");
    };

    _handleBack = () => {
        if (this.state.activeStep == 0 || this.state.activeStep === 2) window.open('/', '_self')
        else
            this.setState({
                activeStep: this.state.activeStep - 1
            })
    };

    consumerContent() {
        console.log("customer", this.state.customerInform)
        let steps = this.steps;
        let { activeStep } = this.state;
        let { classes, cartInform } = this.props;
        return (
            <Container className={classes.container}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label} >
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    <div>
                        <div className={classes.instructions}>{this._getStepContent(activeStep)}</div>
                        <div className={classes.buttonGroup}>
                            <Button
                                onClick={() => this._handleBack()}
                                className={classes.backButton}
                                variant="contained"
                                color="secondary"
                            >
                                {(activeStep === 0 || activeStep == steps.length - 1) ? 'Tiếp tục mua hàng' : 'Trở về'}
                            </Button>
                            {activeStep < steps.length - 1 ?
                                (
                                    <Button disabled={cartInform.totalProduct === 0} variant="contained" color="primary" onClick={() => this._handleNext()}>
                                        Kiểm tra đơn hàng
                                    </Button>
                                )
                                : null
                            }

                        </div>
                    </div>
                </div>

            </Container>
        );
    }
}
const style = {
    backButton: {
        marginRight: "4px"
    },
    buttonGroup: {
        textAlign: "center"
    },
    instructions: {
        marginTop: "1px",
        marginBottom: "1px",
    },
    container: {
        border: "1px solid #e1e1e1",
        borderTop: "3px solid #e2e2e2",
        marginTop: 20,
        padding: "20px 10px"
    }
}
export default withStyles(style)(CartCheckOut)

