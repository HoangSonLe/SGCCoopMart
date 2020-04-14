import React from 'react';
import PropTypes from 'prop-types';
import BaseConsumer from 'BaseComponent/BaseConsumer';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import ProductInform from './ProductInform';

function TabPanel(props) {
  const { children, value, index, product, cartInform, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <ProductInform cartInform={cartInform} product={product}></ProductInform>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
class ProductModal extends BaseConsumer {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  _a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  _handleChangeIndex = (index) => {
    this.setState({ value: index });
  };
  _handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  consumerContent() {
    const { classes, product, cartInform } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={(e, value) => { this._handleChange(e, value) }}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Giới thiệu" onChange={this._a11yProps(0)} />
            <Tab label="Thông tin" onChange={this._a11yProps(1)} />
            <Tab label="Món mua kèm" onChange={this._a11yProps(2)} />
            <Tab label="Sản phẩm liên quan" onChange={this._a11yProps(3)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={value}
          onChangeIndex={(index) => this._handleChangeIndex(index)}
        >
          <TabPanel value={value} product={product} cartInform={cartInform} index={0}>
            Giới thiệu
      </TabPanel>
          <TabPanel value={value} product={product} cartInform={cartInform} index={1}>
            Thông tin
      </TabPanel>
          <TabPanel value={value} product={product} cartInform={cartInform} index={2}>
            Món mua kèm
      </TabPanel>
          <TabPanel value={value} product={product} cartInform={cartInform} index={3}>
            Sản phẩm liên quan
      </TabPanel>
        </SwipeableViews>
      </div>
    );
  }
}
const styles = {
  root: {
    width: "100%",
  }
}

export default withStyles(styles)(ProductModal)