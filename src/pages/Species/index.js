import React from 'react';
import { Link } from '@reach/router';
import MUILink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import { extractId } from '../../utils';

import Data from '../../components/Data';
import List from '../../components/List';

import { ReactComponent as StormTrooper } from '../../assets/images/Star_Wars_Storm-Trooper.svg';

export default ({ id }) => {
  const classes = useStyles();

  return (
    <List apiKey="species" id={id} title="Species" BackgroundComponent={StormTrooper}>
      {({
        name,
        classification,
        designation,
        average_height,
        average_lifespan,
        eye_colors,
        hair_colors,
        skin_colors,
        language,
        homeworld,
        people = [],
        films = [],
      }) => (
        <div className={classes.content}>
          <Typography variant="h4" component="span" className={classes.title}>
            {name}
          </Typography>
          <div>
            <Typography variant="h6" component="span">
              Classification
            </Typography>{' '}
            <Typography variant="body1">{classification}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Designation
            </Typography>{' '}
            <Typography variant="body1">{designation}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Average height
            </Typography>{' '}
            <Typography variant="body1">
              {average_height}
              {average_height !== 'unknown' && ' cm'}
            </Typography>
            <br />
            <Typography variant="h6" component="span">
              Average lifespan
            </Typography>{' '}
            <Typography variant="body1">
              {average_lifespan}
              {average_lifespan !== 'unknown' && ` year${average_lifespan > 1 ? 's' : ''}`}
            </Typography>
            <br />
            <Typography variant="h6" component="span">
              Eye colors
            </Typography>{' '}
            <Typography variant="body1">{eye_colors}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Hair colors
            </Typography>{' '}
            <Typography variant="body1">{hair_colors}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Skin colors
            </Typography>{' '}
            <Typography variant="body1">{skin_colors}</Typography>
          </div>

          <div>
            <Typography variant="h6" component="span">
              Language
            </Typography>{' '}
            <Typography variant="body1">{language}</Typography>
            <br />
            <Typography variant="h6" component="span">
              Homeworld
            </Typography>{' '}
            <Typography variant="body1">
              <MUILink
                to={`/planets/${extractId('planets', homeworld)}`}
                component={Link}
                color="secondary"
              >
                <Data link={homeworld} />
              </MUILink>
            </Typography>
            <br />
            <Typography variant="h6" component="span">
              People
            </Typography>{' '}
            <Typography variant="body1">
              {people.length === 0 && 'N/A'}
              {people.map((e, i, l) => (
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
