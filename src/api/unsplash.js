import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

const unsplash = createApi({
  accessKey: 'Nm602E5_-NjFMvAyz7McHReLbu9yraIVouISTXGpzq0',
  fetch: nodeFetch,
});

export default unsplash;