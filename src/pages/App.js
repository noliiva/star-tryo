import React from 'react';
import { Location, Router, Redirect } from '@reach/router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

import theme from '../styles/theme';
import { cookies } from '../constants';

import Films from './Films';
import Planets from './Planets';
import Species from './Species';
import Vehicles from './Vehicles';
import NotFound from './NotFound';
import Starships from './Starships';
import Characters from './Characters';
import Menu from '../components/Menu';
import Header from '../components/Header';

export default () => {
  const classes = useStyles();
  console.info(`${cookies}`);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Header />

      <div className={classes.root}>
        <Location>{({ location }) => <Menu location={location} />}</Location>

        <Router>
          <Redirect from="/" to="/characters" noThrow />

          <Route path="/films">
            <Films path="/" />
            <Films path="/:id" />
          </Route>

          <Route path="/characters">
            <Characters path="/" />
            <Characters path="/:id" />
          </Route>

          <Route path="/species">
            <Species path="/" />
            <Species path="/:id" />
          </Route>

          <Route path="/planets">
            <Planets path="/" />
            <Planets path="/:id" />
          </Route>

          <Route path="/starships">
            <Starships path="/" />
            <Starships path="/:id" />
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
