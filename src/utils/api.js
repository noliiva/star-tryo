import axios from 'axios';

const API = 'https://swapi.co/api/';

export const GET = 'GET';
export const PUT = 'PUT';
export const POST = 'POST';
export const DELETE = 'DELETE';

export const NOT_REQUESTED = 'NOT_REQUESTED';
export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

const formatParams = (params) =>
  params
    ? Object.keys(params).reduce(
        (acc, key) => ({
          ...acc,
          [key]: Array.isArray(params[key]) ? params[key].join(',') : params[key],
        }),
        { format: 'json' }
      )
    : null;

/**
 *  Response Schema
 *  {
 *    // `data` is the response that was provided by the server
 *    data: {
 *      payload: any,     // Data
 *      message: string,  // Error message key
 *      metadata: object,
 *      paging: object,
 *    },
 *
 *    // `status` is the HTTP status code from the server response
 *    status: 200,
 *
 *    // `statusText` is the HTTP status message from the server response
 *    statusText: 'OK',
 *
 *    // `headers` the headers that the server responded with
 *    // All header names are lower cased
 *    headers: {},
 *
 *    // `config` is the config that was provided to `axios` for the request
 *    config: {},
 *
 *    // `request` is the request that generated this response
 *    // It is the last ClientRequest instance in node.js (in redirects)
 *    // and an XMLHttpRequest instance the browser
 *    request: {}
 *  }
 */

const api = async ({ method = GET, endpoint, url, params, data, noAuth, headers }) =>
  axios({
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    method: method.toUpperCase() || (!params && data && Object.keys(data).length ? POST : GET),
    baseURL: API,
    url: endpoint || url,
    data,
    params: formatParams(params),
  })
    .then((response) => ({
      ok: true,
      status: response.status,
      data: response.data,
    }))
    .catch((error) => {
      const { response, request } = error;

      if (response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (response.status === 401 /* UNAUTHORIZED */) {
          // @TODO logout ?
        }

        return {
          status: response.status,
          messageKey: 'SERVER_ERROR',
          ...response.data,
        };
      }

      if (request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js

        return {
          status: 503 /* SERVICE_UNAVAILABLE */,
          messageKey: 'SERVICE_UNAVAILABLE',
        };
      }

      // Something happened in setting up the request that triggered an Error
      return {
        status: 418 /* I’M A TEAPOT */,
        messageKey: 'INTERNAL_ERROR',
      };
    });

export default api;
