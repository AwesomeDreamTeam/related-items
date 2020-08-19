import React from 'react';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const AddItemCard = (props) => {
  const useStyles = makeStyles({
    card: {
      width: '315px',
      // border: '1px white solid',
    },
    cardAction: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '500px',
    },
    cardContent: {
      textAlign: 'center',
    },
    text: {
      padding: '10px',
      fontWeight: 'bold',
      fontSize: '22px',
    },
    icon: {
      fontSize: '75px',
    },
  });
  const classes = useStyles(props);

  return (
    <Grid item>
      <Card className={classes.card} raised>
        <CardActionArea className={classes.cardAction} onClick={props.handleAddItem}>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.text}>Add {props.itemName} to Your Outfit</Typography>
            <AddCircleIcon className={classes.icon} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default AddItemCard;
