import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import useApi from '../../utils/hooks/useApi';
import { LOADING, SUCCESS, FAILURE } from '../../utils/api';

export default () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [selection, setSelection] = useState(null);
  const [{ status, data, paging, error }, setParams] = useApi('people/', { params: { page } });

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    setPage(page - 1);
  };
  const handleSelection = (c) => {
    setSelection(c);
  };

  useEffect(() => {
    setParams({ page });
  }, [page]);

  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        <Typography variant="h4">People</Typography>

        <List component="nav">
          <ListItem className={classes.spacer} />

          {data.map((character) => (
            <ListItem button key={character.id} onClick={() => handleSelection(character)}>
              <ListItemText primary={character.name} />
            </ListItem>
          ))}

          {status === LOADING && (
            <ListItem>
              <CircularProgress color="secondary" />
            </ListItem>
          )}

          {status === SUCCESS && <ListItem className={classes.spacer} />}

          {status === FAILURE && (
            <ListItem className={classes.error}>
              <ListItemText primary={error} />
            </ListItem>
          )}
        </List>

        <span className={classes.buttonContainer}>
          {page !== 1 && (
            <Button color="secondary" onClick={handlePrevPage}>
              Précédent
            </Button>
          )}
          {data.length !== paging.total && (
            <Button color="secondary" onClick={handleNextPage}>
              Suivant
            </Button>
          )}
        </span>
      </div>

      {selection && (
        <div className={classes.content}>
          Name: {selection.name}
          <br />
          Height: {selection.height}cm
          <br />
          Mass: {selection.mass}
          <br />
          Hair color: {selection.hair_color}
          <br />
          Skin color: {selection.skin_color}
          <br />
          Eye color: {selection.eye_color}
          <br />
          Birth year: {selection.birth_year}
          <br />
          Gender: {selection.gender}
          <br />
          Homeworld: {selection.homeworld}
          <br />
          Films: {selection.films.map((f) => f)}
          <br />
          Species: {selection.species.map((s) => s)}
          <br />
          Vehicules: {selection.vehicles.map((v) => v)}
          <br />
          Starships: {selection.starships.map((s) => s)}
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    color: theme.palette.primary.contrastText,
  },
  menu: {
    padding: theme.spacing(4),
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  error: {
    color: theme.palette.error.main,
  },
  spacer: {
    height: 56,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  content: {
    maxWidth: 500,
    overflow: 'hidden',
    padding: theme.spacing(4),
  },
}));
