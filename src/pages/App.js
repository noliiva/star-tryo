import React from 'react';
import { Router } from '@reach/router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

import theme from '../styles/theme';

import People from './People';
import Vehicules from './Vehicules';
import Menu from '../components/Menu';
import Header from '../components/Header';

export default () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Header />

      <div className={classes.root}>
        <Menu />

        <Router default="/people">
          <People path="/people" />
          <Vehicules path="/vehicules" />
        </Router>
      </div>
    </ThemeProvider>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
}));
