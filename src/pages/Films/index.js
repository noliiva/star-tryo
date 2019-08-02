import React from 'react';
import { format } from 'date-fns';
import { Link } from '@reach/router';
import MUILink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import { extractId } from '../../utils';

import Text from '../../components/Text';
import Data from '../../components/Data';
import List from '../../components/List';

import { ReactComponent as BobaFett } from '../../assets/images/Star_Wars_Boba_Fett.svg';

export default ({ id }) => {
  const classes = useStyles();

  return (
    <List
      apiKey="films"
      id={id}
      title="Films"
      listItemParam="title"
      BackgroundComponent={BobaFett}
      sortList={(a, b) => a.episode_id - b.episode_id}
    >
      {({
        title,
        episode_id,
        opening_crawl,
        director,
        producer,
        release_date,
        species = [],
        starships = [],
        vehicles = [],
        characters = [],
        planets = [],
      }) => (
        <div className={classes.content}>
          <Typography variant="h4" component="span" className={classes.title}>
            {title}
          </Typography>
          <div>
            <Typography variant="h6" component="span">
              Episode {episode_id}
            </Typography>
            <Typography variant="body1" />
            <br />
            <Typography variant="h6" component="span">
              Opening crawl
            </Typography>{' '}
            <Typography variant="body1" component="div">
              <Text>{opening_crawl}</Text>
            </Typography>
            <br />
            <Typography variant="h6" component="span">
              Director
            </Typography>{' '}
            <Typography variant="body1">{director}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Producer
            </Typography>{' '}
            <Typography variant="body1">{producer}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Release date
            </Typography>{' '}
            <Typography variant="body1">{format(release_date, 'DD MMMM YYYY')}</Typography>
          </div>

          <div>
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
            <Typography variant="h6" component="span">
              Starships
            </Typography>{' '}
            <Typography variant="body1">
              {starships.length === 0 && 'N/A'}
              {starships.map((e, i, l) => (
                <React.Fragment key={e}>
                  <MUILink
                    to={`/starship/${extractId('starships', e)}`}
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
              Vehicles
            </Typography>{' '}
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
              Characters
            </Typography>{' '}
            <Typography variant="body1">
              {characters.length === 0 && 'N/A'}
              {characters.map((e, i, l) => (
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
            <Typography variant="h6">Planets</Typography>{' '}
            <Typography variant="body1">
              {planets.length === 0 && 'N/A'}
              {planets.map((e, i, l) => (
                <React.Fragment key={e}>
                  <MUILink
                    to={`/planets/${extractId('planets', e)}`}
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
}));
