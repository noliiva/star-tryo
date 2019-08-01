import { useState, useEffect } from 'react';

import fetch, { GET, NOT_REQUESTED, LOADING, SUCCESS, FAILURE } from '../api';

const useApi = (endpoint, config) => {
  const { method = GET, noAuth, headers, responseIsNotAnArray, params: initialParams } =
    config || {};

  const [state, setState] = useState({
    status: NOT_REQUESTED,
    data: responseIsNotAnArray ? {} : [],
    paging: {},
    error: null,
  });
  const [params, setParams] = useState(initialParams || {});

  useEffect(() => {
    let didCancel = false;

    (async () => {
      setState((state) => ({ ...state, status: LOADING }));

      await fetch({
        endpoint,
        headers,
        method,
        params,
        noAuth,
      }).then((response) => {
        if (!didCancel) {
          const { ok, data, message } = response;

          if (ok) {
            setState((state) => ({
              ...state,
              status: SUCCESS,
              data: responseIsNotAnArray ? data : data.results,
              paging: responseIsNotAnArray ? null : { total: data.count },
            }));
          } else {
            setState((state) => ({
              ...state,
              status: FAILURE,
              error: message || 'Error',
            }));
          }
        }
      });
    })();

    return () => {
      didCancel = true;
    };
  }, [endpoint, headers, method, params, noAuth, responseIsNotAnArray]);

  return [state, setParams];
};

export default useApi;
