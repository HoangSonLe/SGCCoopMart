import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles, Button, OutlinedInput, FormControl, InputLabel, Grid } from "@material-ui/core";
import { TYPEINFORMCUSTOMER } from '../../../constants/constant'

class InputInform extends BaseConsumer {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: null,
            text: ''
        }
    }
    _handleInputChange = (e) => {
        this.setState({
            inputValue: {
                [e.target.name]: e.target.value,
            },
            text: e.target.value
        })
    }
    _handleSubmitInput = () => {
        console.log("un", this.state.inputValue)
        this.setState({
            text: ''
        })
        this.props.handleUpdateInform(this.props.typeInputInform, this.state.inputValue)
    }
    consumerContent() {
        let { classes, inputNameProp } = this.props;
        console.log(inputNameProp.type)
        return (
            <>
                <Grid item xs={6} className={classes.grid}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel className={classes.InputLabel} htmlFor="outlined-adornment-amount" style={{ top: -4 }}>{inputNameProp.label}</InputLabel>
                        <OutlinedInput
                            style={{ height: 48 }}
                            inputProps={{
                                padding: 0,
                            }}
                            name={inputNameProp.value}
                            value={this.state.text}
                            type={inputNameProp.type}
                            onChange={(e) => this._handleInputChange(e)}
                            labelWidth={150}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={6} className={classes.grid}>
                    <Button variant="contained" color="primary" style={{ margin: "auto" }} onClick={() => { this._handleSubmitInput() }}>
                        Thêm
                    </Button>
                </Grid>
            </>
        );
    }
}
var style = {
    grid: {
        display: "flex"
    },
    InputLabel: {
        fontWeight: '500',
    },
};

export default withStyles(style)(InputInform)
