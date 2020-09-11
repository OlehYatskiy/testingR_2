import React, {useState, useEffect, useRef, Fragment} from 'react';

import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';
import {Container} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

}));

export default function Modal({contact, isOpen, setClose}) {

    const classes = useStyles();

    const [posts, setPosts] = useState([]);

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (isOpen) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }

            axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    userId: contact.id
                }
            })
            .then((res) => {
                setPosts(res.data)
            })
            .catch((err) => {
                console.log(err);
                setClose();
            })
        }
    }, [isOpen]);

    return (
        <Dialog
            open={isOpen}
            onClose={setClose}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            ref={descriptionElementRef}
        >
            <DialogTitle id="scroll-dialog-title">{`Post of ${contact.username}`}</DialogTitle>
            <DialogContent dividers>
                {
                    !posts.length ?
                        <Container style={{textAlign: "center"}} maxWidth='false'>
                            <CircularProgress />
                        </Container>
                        :
                        posts.map((el, i) => (
                            <Fragment key={i}>
                                <DialogContentText
                                    component='h4'
                                    variant='h6'
                                >
                                    {el.title}
                                </DialogContentText>
                                <DialogContentText>
                                    {el.body}
                                </DialogContentText>
                            </Fragment>
                        ))
                }
            </DialogContent>
        </Dialog>
    );
}
