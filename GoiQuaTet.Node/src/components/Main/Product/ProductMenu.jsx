import React from 'react';
import BaseConsumer from 'BaseComponent/BaseConsumer'
import ShouldUpdateWrapper from 'BaseComponent/ShouldUpdateWrapper'
import { withStyles, Toolbar, Grid, Tab, Tabs, Select, MenuItem, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search';
class ProductMenu extends BaseConsumer {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,//index của cái mảng productmenulist chứ ko phải id
        }
        this.valueInputFind = null
    }
    _handleChangeMenu = (event, newValue) => {
        this.setState({ value: newValue });
        this.props.handleClickProductMenu(newValue)
    };
    _handleChangeInput = (e) => {
        this.valueInputFind = e.target.value;
    }
    consumerContent() {
        const { classes, productMenuList, handleSearch } = this.props;
        const { value } = this.state;
        let ele = "";
        if (Object.keys(productMenuList).length > 0) {
            ele = productMenuList.map((e, index) => {
                return <Tab key={e.Id} label={e.Name} className={classes.divNavLink} />
            })

        }
        return (
            <Toolbar style={{ margin: "10px 0 20px", padding: 0, borderBottom: "2px solid #e1e1e1", display: "flex" }}>
                <Grid item xs={9} className={classes.gridNavLink} >
                    <Tabs
                        value={value}
                        onChange={(e, value) => { this._handleChangeMenu(e, value) }}
                        textColor="primary"
                    >
                        {ele}
                    </Tabs>
                </Grid>
                <Grid item xs={3} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" style={{ top: -4 }}>Tìm sản phẩm</InputLabel>
                        <ShouldUpdateWrapper
                            onChange={(e) => { this._handleChangeInput(e) }}
                        >
                            <OutlinedInput
                                style={{ height: 48 }}
                                id="outlined-adornment-password"

                                size="small"
                                inputProps={{
                                    padding: 0,
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                            onClick={() => handleSearch(this.valueInputFind)}
                                        >
                                            <SearchIcon></SearchIcon>
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={100}
                            />
                        </ShouldUpdateWrapper>
                    </FormControl>
                    <Select
                        value={1}
                        input={<OutlinedInput />}
                        style={{ height: 48,width:"30%", margin: "0 10px" }}
                        onChange={(e) => this.handleChange(e)}
                    >
                        <MenuItem value={1}>A-Z</MenuItem>
                        <MenuItem value={2}>B</MenuItem>
                        <MenuItem value={3}>C</MenuItem>
                    </Select>
                </Grid>

            </Toolbar>
        );

    }
}
const styles = {

    gridNavLink: {
        justifyContent: "flex-start",
        maxHeight: 55,
        marginTop: 17
    },
    divNavLink: {
        fontFamily: "Roboto,sans-serif",
        fontSize: 15,
        lineHeight: "30px",
        fontWeight: 600,
        padding: "10px 18px",
        textTransform: "uppercase",
        textDecoration: "none",
        color: "#b6c2b9",
        textAlign: 'center'
    },
};

export default withStyles(styles)(ProductMenu)