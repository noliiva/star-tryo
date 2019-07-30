import { useState, useEffect } from 'react';

import fetch, { GET, NOT_REQUESTED, LOADING, SUCCESS, FAILURE } from '../api';

const useApi = (endpoint, config) => {
  const { method = GET, noAuth, headers, responseIsNotAnArray, params: initialParams } =
    config || {};

  const [state, setState] = useState({
    status: NOT_REQUESTED,
    data: responseIsNotAnArray ? {} : [],
    paging: responseIsNotAnArray ? null : {},
    error: null,
  });
  const [params, setParams] = useState(initialParams || {});

  useEffect(() => {
    let didCancel = false;

    (async () => {
      setState({ ...state, status: LOADING });

      await fetch({
        endpoint,
        headers,
        method,
        params,
        noAuth,
      }).then((response) => {
        if (!didCancel) {
          const { ok, results, count, message } = response;

          if (ok) {
            setState({
              ...state,
              status: SUCCESS,
              data: results,
              paging: !responseIsNotAnArray ? { total: count } : state.paging,
            });
          } else {
            setState({
              ...state,
              status: FAILURE,
              error: message || 'Error',
            });
          }
        }
      });
    })();

    return () => {
      didCancel = true;
    };
  }, [params]);

  return [state, setParams];
};

export default useApi;
