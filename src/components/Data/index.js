import React from 'react';
import useApi from '../../utils/hooks/useApi';
import { LOADING, SUCCESS, FAILURE } from '../../utils/api';

export default ({ link, param = 'name' }) => {
  if (!link) return null;

  const endpoint = link.replace('https://swapi.co/api/', '');
  const [{ status, data = {} }] = useApi(endpoint, { responseIsNotAnArray: true });

  return (
    <>
      {status === LOADING && '... '}
      {status === SUCCESS && data[param]}
      {status === FAILURE && ''}
    </>
  );
};
