import React from 'react';
import { Location, Router, Redirect } from '@reach/router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

import theme from '../styles/theme';

import People from './People';
import Vehicles from './Vehicles';
import NotFound from './NotFound';
import Menu from '../components/Menu';
import Header from '../components/Header';

export default () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Header />

      <div className={classes.root}>
        <Location>{({ location }) => <Menu location={location} />}</Location>

        <Router>
          <Redirect from="/" to="/people" noThrow />

          <Route path="/people">
            <People path="/" />
            <People path="/:id" />
          </Route>

          <Route path="/vehicles">
            <Vehicles path="/" />
            <Vehicles path="/:id" />
          </Route>

          <NotFound default />
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

const Route = ({ children }) => <>{children}</>;
