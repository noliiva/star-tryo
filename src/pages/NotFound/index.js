import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as BB8 } from '../../assets/bb8.svg';

export default () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <div className={classes.textContainer}>
        <h1 className={classes.title}>404</h1>
        <span className={classes.text}>This is not the page you are looking for.</span>
      </div>
      <BB8 className={classes.img} />
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    height: 'calc(100vh - 100px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    color: theme.palette.primary.contrastText,
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    textAlign: 'right',
    opacity: 0.7,
  },
  title: {
    fontSize: 200,
    margin: '50px 0 0',
  },
  text: {
    position: 'relative',
    fontSize: 75,
  },
  img: {
    marginLeft: -150,
    height: '75vh',
    color: theme.palette.divider,
  },
}));
