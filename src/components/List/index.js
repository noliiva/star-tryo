import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import { extractId } from '../../utils';
import useApi from '../../utils/hooks/useApi';
import api, { LOADING, SUCCESS, FAILURE } from '../../utils/api';

export default ({ id, apiKey, path, title, listItemParam = 'name', children }) => {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [selection, setSelection] = useState(null);
  const [{ status, data, paging, error }, setParams] = useApi(`${apiKey}/`, { params: { page } });

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    setPage(page - 1);
  };
  const handleSelection = (i) => {
    setSelection(i);
    navigate(`/${path || apiKey}/${extractId(apiKey, i.url)}`);
  };

  useEffect(() => {
    (async () => {
      if (id) {
        const s = data.find((p) => p.url === `https://swapi.co/api/${apiKey}/${id}/`);
        if (!s) {
          const response = await api({ endpoint: `${apiKey}/${id}/` });
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
  }, [apiKey, id, data]);

  useEffect(() => {
    if (loaded) {
      setParams({ page });
    }
  }, [page, loaded, setParams]);

  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        <Typography variant="h4">{title}</Typography>

        <List component="nav">
          <ListItem className={classes.spacer} />

          {data.map((e) => {
            const isSelected =
              selection && extractId(apiKey, selection.url) === extractId(apiKey, e.url);

            return (
              <ListItem
                button
                key={e.url}
                onClick={() => handleSelection(e)}
                selected={isSelected}
                classes={{ selected: classes.active }}
              >
                <ListItemText primary={e[listItemParam]} />
              </ListItem>
            );
          })}

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
          {page !== 1 ? (
            <Button color="secondary" onClick={handlePrevPage}>
              Précédent
            </Button>
          ) : (
            <div />
          )}
          {data.length !== paging.total && (
            <Button color="secondary" onClick={handleNextPage}>
              Suivant
            </Button>
          )}
        </span>
      </div>

      {!!selection && children(selection)}
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
