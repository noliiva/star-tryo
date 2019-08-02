import React from 'react';
import { Link } from '@reach/router';
import MUILink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import { extractId } from '../../utils';

import Data from '../../components/Data';
import List from '../../components/List';

import { ReactComponent as DeathStar } from '../../assets/images/Star_Wars_Death_Star.svg';

export default ({ id }) => {
  const classes = useStyles();

  return (
    <List apiKey="planets" id={id} title="Planets" BackgroundComponent={DeathStar}>
      {({
        name,
        diameter,
        rotation_period,
        orbital_period,
        gravity,
        population,
        climate,
        terrain,
        surface_water,
        residents = [],
        films = [],
      }) => (
        <div className={classes.content}>
          <Typography variant="h4" component="span" className={classes.title}>
            {name}
          </Typography>
          <div>
            <Typography variant="h6" component="span">
              Diameter
            </Typography>{' '}
            <Typography variant="body1">
              {diameter}
              {diameter !== 'unknonw' && ' km'}
            </Typography>
            <br />
            <Typography variant="h6" component="span">
              Rotation period
            </Typography>{' '}
            <Typography variant="body1">
              {rotation_period}
              {rotation_period !== 'unknown' && ' hours'}
            </Typography>
            <br />
            <Typography variant="h6" component="span">
              Orbital period
            </Typography>{' '}
            <Typography variant="body1">
              {orbital_period}
              {orbital_period !== 'unknown' && ' days'}
            </Typography>
            <br />
            <Typography variant="h6" component="span">
              Gravity
            </Typography>{' '}
            <Typography variant="body1">
              {gravity}
              {gravity !== 'unknown' && ` G${gravity > 1 ? 's' : ''}`}
            </Typography>
            <br />
            <Typography variant="h6" component="span">
              Population
            </Typography>{' '}
            <Typography variant="body1">{population}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Climate
            </Typography>{' '}
            <Typography variant="body1">{climate}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Terrain
            </Typography>{' '}
            <Typography variant="body1">{terrain}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Surface water
            </Typography>{' '}
            <Typography variant="body1">
              {surface_water}
              {surface_water !== 'unknown' && ' %'}
            </Typography>
          </div>

          <div>
            <Typography variant="h6" component="span">
              Residents
            </Typography>{' '}
            <Typography variant="body1">
              {residents.length === 0 && 'N/A'}
              {residents.map((e, i, l) => (
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
