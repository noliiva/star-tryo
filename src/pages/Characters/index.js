import React from 'react';
import { Link } from '@reach/router';
import MUILink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import { sounds } from './constants';
import { extractId } from '../../utils';

import Data from '../../components/Data';
import List from '../../components/List';

import { ReactComponent as DarthVader } from '../../assets/images/Star_Wars_Darth_Vader.svg';

export default ({ id }) => {
  const classes = useStyles();

  return (
    <List
      apiKey="people"
      path="characters"
      id={id}
      title="Characters"
      BackgroundComponent={DarthVader}
      onClickItem={(id) => {
        if (sounds[id]) {
          const audio = new Audio(sounds[id]);
          audio.play();
        }
      }}
    >
      {({
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
      }) => (
        <div className={classes.content}>
          <Typography variant="h4" component="span" className={classes.title}>
            {name}&nbsp;&nbsp;
            <span className={classes.id}>#{id}</span>
          </Typography>
          <div>
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

          <div>
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
            <br />
            <Typography variant="h6" component="span">
              Species
            </Typography>{' '}
            <Typography variant="body1">
              {species.length === 0 && 'N/A'}
              {species.map((e, i, l) => (
                <React.Fragment key={e}>
                  <MUILink
                    to={`/species/${extractId('species', e)}`}
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
            <Typography variant="h6">Vehicles</Typography>{' '}
            <Typography variant="body1">
              {vehicles.length === 0 && 'N/A'}
              {vehicles.map((e, i, l) => (
                <React.Fragment key={e}>
                  <MUILink
                    to={`/vehicles/${extractId('vehicles', e)}`}
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
                  <MUILink
                    to={`/starships/${extractId('starships', e)}`}
                    component={Link}
                    color="secondary"
                  >
                    <Data key={e} link={e} />
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
  id: {
    color: theme.palette.divider,
    fontWeight: 'bold',
  },
}));
