import React from 'react'
import BaseConsumer from 'BaseComponent/BaseConsumer';
import { withStyles, Select, Box, FormControl, InputLabel, Grid } from "@material-ui/core";
import InputInform from './InputInform';
import {TYPEINFORMCUSTOMER} from '../../../constants/constant'

class FormInform extends BaseConsumer {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: {
                value:'',
                label:'',
                type:''
            },
            isDisplay:'none',
        }
        this.informList = [
            {
                value: 'Name',
                label: 'Tên khách hàng',
                type:"text"
            },
            {
                value: 'Phone',
                label: 'SĐT khách hàng',
                type:"tel"
            },
            {
                value: 'Email',
                label: 'Email khách hàng',
                type:"email"
            },
            {
                value: 'Address',
                label: 'Địa chỉ khách hàng',
                type:"text"
            }
        ]
    }
    _handleSelectChange = (event) => {
        let item = this.informList.find(e=>{
            return e.value == event.target.value;
        });
        console.log(item)

        this.setState({
            selectValue: {
                value:event.target.value,
                label:event.target.options[event.target.selectedIndex].text,
                type:item.type
            }
        });
    }
    _handleShowInput=()=>{
        (this.state.selectValue.value == '') ? 
            alert('Chọn giá trị') 
            :
            this.setState({
                isDisplay:(this.state.isDisplay== '') ? 'none': '',
            })
    }
    consumerContent() {
        
        const { classes, typeInputInform,handleUpdateInform,infor } = this.props

        let { selectValue,isDisplay } = this.state;

        let optionList = this.informList.map((e, index) => {
            return <option key={index} value={e.value}>{e.label}</option>
        })
        let inform = Object.keys(infor).map((key, index) => {
            return (infor[key] !== '' || !infor[key]) ? <p key={index}>{infor[key]}</p> : null;
        });
        return (
            <Box className={classes.boxContainer}>
                <Grid item xs={3} className={classes.grid}>
                    <h4 className={classes.Label}>{(typeInputInform==TYPEINFORMCUSTOMER.RECEIVER)? 'Người nhận :' :' Người gửi'}</h4>
                </Grid>
                <Grid item xs={10}>
                    <Box className={classes.grid}>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple" style={{ top: -4 }}>Chọn thông tin ....</InputLabel>
                                <Select
                                    native
                                    className={classes.select}
                                    name={'selectValue'}
                                    value={selectValue.value}
                                    onChange={(e) => this._handleSelectChange(e)}
                                    labelWidth={150}
                                >
                                    <option aria-label="None" value="" />
                                    {optionList}
                                </Select>
                            </FormControl>
                            {inform}
                        </Grid>

                        <Grid item xs={6}>
                            <p><a className={classes.Link} onClick={()=>this._handleShowInput()}>Nhấn để thêm/hủy</a></p>
                        </Grid>
                    </Box>
                    <Box className={classes.grid} style={{display:isDisplay}}>
                        <InputInform 
                        typeInputInform={typeInputInform} 
                        handleUpdateInform={handleUpdateInform} 
                        inputNameProp={selectValue}
                        >
                        </InputInform>
                    </Box>

                </Grid>
            </Box>
        );
    }
}
var style = {
    boxContainer: {
        display: "flex",
        width: "50%"
    },
    grid: {
        display: "flex",
        marginTop:10
    },
    select:{
        height:48,
        "& .MuiSelect-select":{
            padding:10
        },
        "& .MuiSelect-icon":{
            borderLeft:"1px solid darkgrey"
        }
    },
    InputLabel: {
        fontWeight: '500',
    },
    Label: {
        color: "#3f51b5",
    },
    Link: {
        textAlign: "center",
        color: "#9c9a97",
        textDecoration: "underline",
        cursor: "pointer",
        padding: "30px",
        fontStyle: "italic",
        "&:hover": {
            color: "#696867",
            textDecoration: "none",
        }
    },
    formControl:{
        width:227
    }
};
export default withStyles(style)(FormInform)
