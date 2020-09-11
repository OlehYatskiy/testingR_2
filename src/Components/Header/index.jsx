import React, {useState} from 'react';

import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SortIcon from '@material-ui/icons/Sort';


const useStyles = makeStyles((theme) => ({
    loginButton: {
        marginLeft: 'auto'
    }
}));

export default function Header({sortValue, setSortValue}) {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = (newSortValue = sortValue) => (e) => {
        if (sortValue !== newSortValue) setSortValue(newSortValue);
        setAnchorEl(null);
    }

    const menuId = 'sort-menu';
    const valuesSortedBy = [
        { obj: 'username', label: 'Username'},
        { obj: 'email', label: 'Email'},
        { obj: 'website', label: 'Website'},
        { obj: 'address.city', label: 'Address city'}
    ];
    const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose()}
            >
                {valuesSortedBy.map((el, i) => {
                    return <MenuItem
                                key={i}
                                onClick={handleMenuClose(el.obj)}>
                                    {el.label}
                           </MenuItem>
                })}
            </Menu>

    );

    return (
        <AppBar position="relative">
            <Toolbar>
                <Button
                    size='large'
                    color="inherit"
                    startIcon={<SortIcon />}
                    onClick={handleSortMenuOpen}
                >
                    Sort by
                </Button>
                <Typography variant="h6" color="inherit" noWrap>
                    Header
                </Typography>
                <Button
                    className={classes.loginButton}
                    color="inherit">
                    Login
                </Button>
            </Toolbar>
            {renderMenu}
        </AppBar>
    );
}
