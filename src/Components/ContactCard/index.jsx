import React, {useEffect} from 'react';

import { makeStyles } from "@material-ui/core/styles";

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(1)
    }
}));

export default function ContactCard({data}) {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <Typography
                        display='inline'
                        color='primary'
                        component='span'
                    >
                        user:
                    </Typography>
                    {` ${data.username}`}
                </Typography>
                <Typography variant="h5" component="h2">
                    {data.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {`email: ${data.email}`}
                </Typography>
                <Typography variant="body2" component="p">
                    {`address: ${data.address.city}, ${data.address.street} ${data.address.suite}`}
                </Typography>
            </CardContent>
        </Card>
    );
}
