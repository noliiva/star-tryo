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
  const [{ status, data, paging, error }, setParams] = useApi('vehicles/', { params: { page } });

  const {
    name,
    model,
    manufacturer,
    length,
    cost_in_credits,
    crew,
    passengers,
    max_atmosphering_speed,
    cargo_capacity,
    consumables,
    pilots = [],
  } = selection || {};

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    setPage(page - 1);
  };
  const handleSelection = (i) => {
    setSelection(i);
    navigate(`/vehicles/${extractVehicleId(i.url)}`);
  };

  useEffect(() => {
    (async () => {
      if (id) {
        const s = data.find((p) => p.url === `https://swapi.co/api/vehicles/${id}/`);
        if (!s) {
          const response = await api({ endpoint: `vehicles/${id}/` });
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
        <Typography variant="h4">Vehicles</Typography>

        <List component="nav">
          <ListItem className={classes.spacer} />

          {data.map((e) => (
            <ListItem
              button
              key={e.url}
              onClick={() => handleSelection(e)}
              selected={selection && extractVehicleId(selection.url) === extractVehicleId(e.url)}
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
              Model
            </Typography>{' '}
            <Typography variant="body1">{model}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Length
            </Typography>{' '}
            <Typography variant="body1">
              {length}
              {length !== 'unknown' && ' m'}
            </Typography>
            <br />
            <Typography variant="h6" component="span">
              Manufacturer
            </Typography>{' '}
            <Typography variant="body1">{manufacturer}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Cost in credits
            </Typography>{' '}
            <Typography variant="body1">{cost_in_credits}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Maximum atmosphering speed
            </Typography>{' '}
            <Typography variant="body1">{max_atmosphering_speed}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Cargo capacity
            </Typography>{' '}
            <Typography variant="body1">{cargo_capacity}</Typography>
            <br />
            <Typography
              variant="h6"
              component="span"
              title="The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply."
            >
              Consumables
            </Typography>{' '}
            <Typography variant="body1">{consumables}</Typography>
          </div>

          <div className={classes.column}>
            <Typography variant="h6" component="span">
              Pilots
            </Typography>{' '}
            <Typography variant="body1">
              {pilots.length === 0 && 'N/A'}
              {pilots.map((e, i, l) => (
                <React.Fragment key={e}>
                  <MUILink to={`/people/${extractPeopleId(e)}`} component={Link} color="secondary">
                    <Data link={e} />
                  </MUILink>

                  {i + 1 !== l.length && ', '}
                </React.Fragment>
              ))}
            </Typography>
            <br />
            <Typography variant="h6" component="span">
              Crew
            </Typography>{' '}
            <Typography variant="body1">{crew}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Passengers
            </Typography>{' '}
            <Typography variant="body1">{passengers}</Typography>
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
    gridTemplateColumns: '300px minmax(250px, 500px)',
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
