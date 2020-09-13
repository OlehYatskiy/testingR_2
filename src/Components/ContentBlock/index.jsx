import React, {useEffect, useState} from 'react';

import {connect} from "react-redux";
import {setContacts as onSetContacts} from "Redux/Contact/contact.actions";

import ContactCard from "Components/ContactCard";


import 'fontsource-roboto';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CircularProgress from "@material-ui/core/CircularProgress";
import {Container} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    content: {
        display: 'flex',
        flexGrow: 1
    },
    contactList: {
        width: theme.spacing(50),
        overflow: 'auto',
        maxHeight: '84vh',
        cursor: 'pointer'
    }
}));

function ContentBlock({
        contacts,
        isLoader,
        onSetContacts,
        onCardClick,
        sortValue
    }) {

    const classes = useStyles();

    useEffect(() => {
        !contacts.length && onSetContacts()
    }, []);

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
        <Grid
            className={classes.content}
            container
            spacing={2}
        >
            <Grid item className={classes.contactList}>
                {
                    !isLoader ?
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
            <Grid item xs>
               Another content
            </Grid>
        </Grid>
    );
}

const mapStateToProps = ({contact}) => {
    return {
        contacts: contact.contacts,
        loader: contact.isLoader
    }
}

export default connect(mapStateToProps, {onSetContacts})(ContentBlock);
