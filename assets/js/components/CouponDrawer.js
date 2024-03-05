import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'; 
import VerticalStepper from './VerticalStepper';

export default function CouponDrawer() { 
    const [state, setState] = useState({
        right: false,
    }); 

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    return (
        <div>
            <Button color="primary" variant="contained" onClick={toggleDrawer('right', true)}>Click Here For A Coupon</Button>
            <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
                <VerticalStepper />
            </Drawer>
        </div>
    );
}