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

import Card from '@material-ui/core/Card';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        !contacts.length && onSetContacts()
    }, []);

    useEffect(() => {
        console.log('Effect:' + contacts.length)
        setItems(getSorted(contacts))
    }, [contacts])

    console.log(items)

    const getSorted = (contacts) => {
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

        return mapped.map((el, index) => {
            return {
                ...contacts[el.index],
                draggableId: `drag-${index}`
            };
        });
    }

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    const id2List = {
        droppable: items,
        droppable2: selected
    };

    const getList = (id) => (id2List[id]);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            if (source.droppableId === 'droppable2') {
                setSelected(items)
            }

            // sortedContacts = Array.from(items);
            setItems(items)
        } else {
            debugger;
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            setItems(result.droppable)
            setSelected(result.droppable2)
        }
    };

    return (
        <Grid
            className={classes.content}
            container
            spacing={2}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <Grid item xs className={classes.contactList}
                              ref={provided.innerRef}>
                            {
                                !isLoader ?
                                    items.map((item, index) => (
                                        <Draggable
                                            key={item.draggableId}
                                            draggableId={item.draggableId}
                                            index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    <ContactCard onCardClick={onCardClick(item)} data={item} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                    :
                                    <Container style={{textAlign: "center"}} maxWidth='false'>
                                        <CircularProgress />
                                    </Container>
                            }
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
                <Droppable droppableId="droppable2">
                    {(provided) => (
                        <Grid item xs
                            ref={provided.innerRef}>
                            {
                                selected.map((item, index) => (
                                <Draggable
                                    key={item.draggableId}
                                    draggableId={item.draggableId}
                                    index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <ContactCard onCardClick={onCardClick(item)} data={item} />
                                        </div>
                                    )}
                                </Draggable>
                            ))
                            }
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </DragDropContext>
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
