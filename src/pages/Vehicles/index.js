import React from 'react';
import { Link } from '@reach/router';
import MUILink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import { extractId } from '../../utils';

import Data from '../../components/Data';
import List from '../../components/List';

import { ReactComponent as R2D2 } from '../../assets/images/Star_Wars_R2D2.svg';

export default ({ id }) => {
  const classes = useStyles();

  return (
    <List apiKey="vehicles" id={id} title="Vehicles" BackgroundComponent={R2D2}>
      {({
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
      }) => (
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
                  <MUILink
                    to={`/characters/${extractId('people', e)}`}
                    component={Link}
                    color="secondary"
                  >
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
    </List>
  );
};

const useStyles = makeStyles((theme) => ({
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
}));
