import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Paper } from '../../../../components';
import { LocationOn } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    paddingBottom: theme.spacing(2),
    cursor: 'pointer'
  },
  imageWrapper: {
    height: '200px',
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    'object-fit': 'cover'
  },
  details: { padding: theme.spacing(3) },
  name: {
    fontSize: '18px',
    lineHeight: '21px',
    marginTop: theme.spacing(2),
    textTransform: 'capitalize'
  },
  city: {
    lineHeight: '16px',
    height: theme.spacing(4),
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3)
  },
  eventIcon: {
    color: theme.palette.text.secondary
  },
  eventText: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary
  }
}));

function CinemaCard(props) {
  const classes = useStyles(props);
  const { className, cinema } = props;
  const rootClassName = classNames(classes.root, className);
  return (
    <Paper className={rootClassName}>
      <div className={classes.imageWrapper} style={!(cinema && cinema.image) ? {background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center'} : {}}>
        {cinema && cinema.image ? (
          <img alt="cinema" className={classes.image} src={cinema.image} />
        ) : (
          <Typography variant="h4" style={{color: '#fff', textTransform: 'capitalize'}}>{cinema.name}</Typography>
        )}
      </div>
      <div className={classes.details}>
        <Typography className={classes.name} variant="h4">
          {cinema.name}
        </Typography>
        <Typography className={classes.city} variant="body1">
          {cinema.city}
        </Typography>
      </div>
      <div className={classes.stats}>
        <LocationOn className={classes.eventIcon} />
        <Typography className={classes.eventText} variant="body2">
          {cinema.city}
        </Typography>
      </div>
    </Paper>
  );
}

export default CinemaCard;
