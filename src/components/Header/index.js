import React from 'react';
import clsx from 'clsx';
import { loadCSS } from 'fg-loadcss';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export default function ButtonAppBar() {
  const classes = useStyles();
  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css')
    );
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Icon className="fab fa-react" color="secondary" />
          &nbsp;&nbsp;
          <Typography variant="h6" className={classes.title} color="secondary">
            Star Tryo
          </Typography>
          <Typography variant="body2" className={classes.subtitle}>
            <a
              href="https://github.com/noliiva/star-tryo"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Icon className={clsx(classes.icon, 'fab fa-github')} />
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    color: theme.palette.divider,
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
}));
