import React, {useEffect, useState} from 'react';

import {connect} from "react-redux";
import {setContacts as onSetContacts} from "Redux/Contact/contact.actions";

// import ProductList from "Components/ProductList";
import ContactCard from "Components/ContactCard";
import Header from "Components/Header";
import Modal from "Components/Modal";

import 'fontsource-roboto';
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SortIcon from '@material-ui/icons/Sort';
import CircularProgress from "@material-ui/core/CircularProgress";
import {Container} from "@material-ui/core";


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
        maxHeight: '84vh',
        cursor: 'pointer'
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
    const [openModal, setModalOpen] = useState(false);
    const [contact, setContact] = useState({ id: null, contact: null });

    const onCardClick = (el) => (event) => {
        event.stopPropagation();
        const { id, username } = el;
        setModalOpen(true);
        setContact({id, username});
    }

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
                <Header sortValue={sortValue} setSortValue={setSortValue} />
                <Grid
                    className={classes.content}
                    container
                    spacing={2}
                >
                    <Grid item className={classes.contactList}>
                        {
                            contacts.length ?
                                sortedContacts.map((el, id) =>
                                    <CardActionArea key={id} onDoubleClick={onCardClick(el)}>
                                        <ContactCard key={id} data={el}/>
                                    </CardActionArea>
                                )
                                :
                                <Container style={{textAlign: "center"}} maxWidth='false'>
                                    <CircularProgress />
                                </Container>
                        }
                    </Grid>
                    <Grid item xs style={{ background: 'grey' }}>
                        Another users
                    </Grid>
                </Grid>
                <footer className={classes.footer}>
                    <Typography>footer</Typography>
                </footer>
            </main>
            <Modal
                isOpen={openModal}
                contact={contact}
                setClose={() => setModalOpen(false)}
            />
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
