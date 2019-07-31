import React from 'react';
import Tab from '@material-ui/core/Tab';
import { navigate } from '@reach/router';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';

import { menuItems } from './constants';

const getValueFromPath = () => {
  const split = window.location.pathname.split('/');
  if (split.includes('people')) return 0;
  if (split.includes('vehicles')) return 1;

  return -10;
};

export default function Menu() {
  const classes = useStyles();
  const [value, setValue] = React.useState(getValueFromPath());

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Tabs
      orientation="vertical"
      value={value}
      onChange={handleChange}
      aria-label="simple tabs example"
      className={classes.tabs}
    >
      {menuItems.map(({ label, icon, link }, index) => (
        <Tab
          key={label.toLocaleLowerCase()}
          label={label}
          icon={icon}
          component="a"
          onClick={(event) => {
            event.preventDefault();
            navigate(link);
          }}
          href={link}
        />
      ))}
    </Tabs>
  );
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    width: 175,
    padding: `${theme.spacing(2)}px 0px`,
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.primary,
    color: theme.palette.primary.contrastText,
    flexShrink: 0,
  },
}));
