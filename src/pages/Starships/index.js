import React from 'react';
import { Link } from '@reach/router';
import MUILink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import { extractId } from '../../utils';

import Data from '../../components/Data';
import List from '../../components/List';

export default ({ id }) => {
  const classes = useStyles();

  return (
    <List apiKey="starships" id={id} title="Starships">
      {({
        name,
        model,
        starship_class,
        manufacturer,
        cost_in_credits,
        length,
        crew,
        passengers,
        max_atmosphering_speed,
        hyperdrive_rating,
        MGLT,
        cargo_capacity,
        consumables,
        films = [],
        pilots = [],
      }) => (
        <div className={classes.content}>
          <Typography variant="h4" component="span" className={classes.title}>
            {name}
          </Typography>
          <div>
            <Typography variant="h6" component="span">
              Model
            </Typography>{' '}
            <Typography variant="body1">{model}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Starship class
            </Typography>{' '}
            <Typography variant="body1">{starship_class}</Typography>
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
              Length
            </Typography>{' '}
            <Typography variant="body1">
              {length}
              {length !== 'unknown' && ' m'}
            </Typography>
            <br />
            <Typography variant="h6" component="span">
              Maximum atmosphering speed
            </Typography>{' '}
            <Typography variant="body1">{max_atmosphering_speed}</Typography>
          </div>

          <div>
            <Typography variant="h6" component="span">
              Crew
            </Typography>{' '}
            <Typography variant="body1">{crew}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Passengers
            </Typography>{' '}
            <Typography variant="body1">{passengers}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Hyperdrive rating
            </Typography>{' '}
            <Typography variant="body1">{hyperdrive_rating}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Megalights
            </Typography>{' '}
            <Typography variant="body1">{MGLT}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Cargo capacity
            </Typography>{' '}
            <Typography variant="body1">
              {cargo_capacity}
              {cargo_capacity !== 'unknown' && ' kg'}
            </Typography>
            <br />
            <Typography variant="h6" component="span">
              Consumables
            </Typography>{' '}
            <Typography variant="body1">{consumables}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Pilots
            </Typography>{' '}
            <Typography variant="body1">
              {pilots.length === 0 && 'N/A'}
              {pilots.map((e, i, l) => (
                <React.Fragment key={e}>
                  <MUILink
                    to={`/characters/${extractId('people', e)}`}
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
              Films
            </Typography>{' '}
            <Typography variant="body1">
              {films.length === 0 && 'N/A'}
              {films.map((e, i, l) => (
                <React.Fragment key={e}>
                  <MUILink
                    to={`/films/${extractId('films', e)}`}
                    component={Link}
                    color="secondary"
                  >
                    <Data key={e} link={e} param="title" />
                  </MUILink>
                  {i + 1 !== l.length && ', '}
                </React.Fragment>
              ))}
            </Typography>
          </div>
        </div>
      )}
    </List>
  );
};

const useStyles = makeStyles((theme) => ({
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
}));
