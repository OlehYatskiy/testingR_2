import React, {useEffect, useState} from 'react';

import {connect} from "react-redux";
import {setContacts as onSetContacts} from "Redux/Contact/contact.actions";

// import ProductList from "Components/ProductList";
import ContactCard from "Components/ContactCard";

import 'fontsource-roboto';
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
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
    root: {
        minHeight: '100vh',
        display: 'flex'
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflow: 'hidden'

    },
    content: {
        display: 'flex',
        flexGrow: 1
    },
    contactList: {
        width: theme.spacing(50),
        overflow: 'auto',
        maxHeight: '84vh'
    },
    footer: {
        marginTop: 'auto',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.grey[200],
        textAlign: 'center'
    },
    loginButton: {
        marginLeft: 'auto'
    }
}));

function App({contacts, isLoader, onSetContacts}) {

    const classes = useStyles();

    useEffect(() => {
        !contacts.length && onSetContacts()
    }, []);

    const [sortValue, setSortValue] = useState('username');
    const [anchorEl, setAnchorEl] = React.useState(null);

    // const setSortValue = (e, { name }) => {
    //     return setActiveMenuItem(name);
    // }
    const isMenuOpen = Boolean(anchorEl);

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = (sortValue) => {
        return () => {
            setSortValue(sortValue)
            setAnchorEl(null);
        }
    };

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
            onClose={handleMenuClose}
        >
            {valuesSortedBy.map((el) => {
                return <MenuItem
                            sortValue={el.obj}
                            onClick={handleMenuClose(el.obj)}>
                                {el.label}
                       </MenuItem>
            })}
        </Menu>
    );


    const mapped = contacts.map((el, i) => {
        const splittedValue = sortValue.split('.').reduce(
            (accum , val, i) => {
                return i === 0 ? el[val] : accum[val];
            }, ''
        );
        return {
            index: i,
            value: splittedValue.toLowerCase()};
    });
    mapped.sort((a, b) => {
        if (a.value > b.value) return 1;
        if (a.value < b.value) return -1;
        return 0;
    });
    const sortedContacts = mapped.map((el) => {
        return contacts[el.index];
    });


    return (
        <div className={classes.root}>
            <CssBaseline />
            <main className={classes.main}>
                <AppBar position="relative">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleSortMenuOpen}
                            color="inherit"
                        >
                            <SortIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Header
                        </Typography>
                        <Button
                            className={classes.loginButton}
                            color="inherit">
                            Login
                        </Button>
                    </Toolbar>
                </AppBar>
                <Grid className={classes.content} container spacing={2}>
                    <Grid item className={classes.contactList}>
                        {sortedContacts.map((el, id) => <ContactCard key={id} data={el} /> )}
                    </Grid>
                    <Grid item xs style={{ background: 'grey' }}>
                        Another users
                    </Grid>
                </Grid>
                <footer className={classes.footer}>
                    <Typography>footer</Typography>
                </footer>
            </main>
            {renderMenu}
        </div>
    );
}

const mapStateToProps = ({contact}) => {
    return {
        contacts: contact.contacts,
        loader: contact.isLoader
    }
}

export default connect(mapStateToProps, {onSetContacts})(App);
