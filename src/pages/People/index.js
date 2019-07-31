import React, { useState, useEffect } from 'react';
import { navigate, Link } from '@reach/router';
import List from '@material-ui/core/List';
import MUILink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import useApi from '../../utils/hooks/useApi';
import { extractVehicleId, extractPeopleId } from '../../utils';
import api, { LOADING, SUCCESS, FAILURE } from '../../utils/api';

import Data from '../../components/Data';

export default ({ id }) => {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [selection, setSelection] = useState(null);
  const [{ status, data, paging, error }, setParams] = useApi('people/', { params: { page } });

  const {
    name,
    birth_year,
    eye_color,
    gender,
    hair_color,
    height,
    mass,
    skin_color,
    homeworld,
    films = [],
    species = [],
    starships = [],
    vehicles = [],
  } = selection || {};

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    setPage(page - 1);
  };
  const handleSelection = (people) => {
    setSelection(people);
    navigate(`/people/${extractPeopleId(people.url)}`);
  };

  useEffect(() => {
    (async () => {
      if (id) {
        const s = data.find((p) => p.url === `https://swapi.co/api/people/${id}/`);
        if (!s) {
          const response = await api({ endpoint: `people/${id}/` });
          if (response.ok) {
            setSelection(response.data);
          } else {
            navigate('/404');
          }
        } else {
          setSelection(s);
        }
      }

      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (loaded) {
      setParams({ page });
    }
  }, [page]);

  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        <Typography variant="h4">People</Typography>

        <List component="nav">
          <ListItem className={classes.spacer} />

          {data.map((e) => (
            <ListItem
              button
              key={e.url}
              onClick={() => handleSelection(e)}
              selected={selection && extractPeopleId(selection.url) === extractPeopleId(e.url)}
            >
              <ListItemText primary={e.name} />
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

      {!!selection && (
        <div className={classes.content}>
          <Typography variant="h4" component="span" className={classes.title}>
            {name}
          </Typography>
          <div className={classes.column}>
            <Typography variant="h6" component="span">
              Gender
            </Typography>{' '}
            <Typography variant="body1">{gender}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Height
            </Typography>{' '}
            <Typography variant="body1">
              {height}
              {height !== 'unknown' && ' cm'}
            </Typography>
            <br />
            <Typography variant="h6" component="span">
              Mass
            </Typography>{' '}
            <Typography variant="body1">
              {mass}
              {mass !== 'unknown' && ' kg'}
            </Typography>
            <br />
            <Typography variant="h6" component="span">
              Hair color
            </Typography>{' '}
            <Typography variant="body1">{hair_color}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Skin color
            </Typography>{' '}
            <Typography variant="body1">{skin_color}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Eye color
            </Typography>{' '}
            <Typography variant="body1">{eye_color}</Typography>
          </div>

          <div className={classes.column}>
            <Typography variant="h6" component="span">
              Birth year
            </Typography>{' '}
            <Typography variant="body1">{birth_year}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Homeworld
            </Typography>{' '}
            <Typography variant="body1">
              <Data link={homeworld} />
            </Typography>
            <br />
            <Typography variant="h6" component="span">
              Films
            </Typography>{' '}
            <Typography variant="body1">
              {films.length === 0 && 'N/A'}
              {films.map((e, i, l) => (
                <React.Fragment key={e}>
                  <Data link={e} param="title" />
                  {i + 1 !== l.length && ', '}
                </React.Fragment>
              ))}
            </Typography>
            <br />
            <Typography variant="h6" component="span">
              Species
            </Typography>{' '}
            <Typography variant="body1">
              {species.length === 0 && 'N/A'}
              {species.map((e, i, l) => (
                <React.Fragment key={e}>
                  <Data key={e} link={e} />
                  {i + 1 !== l.length && ', '}
                </React.Fragment>
              ))}
            </Typography>
            <br />
            <Typography variant="h6">Vehicles</Typography>{' '}
            <Typography variant="body1">
              {vehicles.length === 0 && 'N/A'}
              {vehicles.map((e, i, l) => (
                <React.Fragment key={e}>
                  <MUILink
                    to={`/vehicles/${extractVehicleId(e)}`}
                    component={Link}
                    color="secondary"
                  >
                    <Data key={e} link={e} />
                  </MUILink>
                  {i + 1 !== l.length && ', '}
                </React.Fragment>
              ))}
            </Typography>
            <br />
            <Typography variant="h6" component="span">
              Starships
            </Typography>{' '}
            <Typography variant="body1">
              {starships.length === 0 && 'N/A'}
              {starships.map((e, i, l) => (
                <React.Fragment key={e}>
                  <Data key={e} link={e} internalLink="/vehicles/:id" />
                  {i + 1 !== l.length && ', '}
                </React.Fragment>
              ))}
            </Typography>
          </div>
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
    flexShrink: 0,
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
    display: 'grid',
    gridRowGap: theme.spacing(4),
    gridColumnGap: theme.spacing(6),
    gridTemplateColumns: '250px minmax(250px, 500px)',
    gridTemplateRows: '2rem auto',
    padding: theme.spacing(4),
  },
  title: {
    gridColumn: '1 / span 2',
    marginBottom: theme.spacing(4),
  },
  active: {
    color: theme.palette.secondary.main,
  },
}));
