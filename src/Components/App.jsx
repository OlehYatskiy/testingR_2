import React, {useEffect, useState} from 'react';

import {connect} from "react-redux";
import {setContacts as onSetContacts} from "Redux/Contact/contact.actions";

import ContentBlock from "Components/ContentBlock";
import Header from "Components/Header";
import Modal from "Components/Modal";

import 'fontsource-roboto';
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';


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
    footer: {
        marginTop: 'auto',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.grey[200],
        textAlign: 'center'
    }
}));

function App() {

    const classes = useStyles();

    const [sortValue, setSortValue] = useState('username');
    const [openModal, setModalOpen] = useState(false);
    const [contact, setContact] = useState({ id: null, contact: null });

    const onCardClick = (el) => (event) => {
        event.stopPropagation();
        const { id, username } = el;
        setModalOpen(true);
        setContact({id, username});
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <main className={classes.main}>
                <Header sortValue={sortValue} setSortValue={setSortValue} />
                <ContentBlock
                    sortValue={sortValue}
                    onCardClick={onCardClick} />
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
