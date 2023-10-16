/**
 * A custom instance of Axios to handle the requests.
 * This is to replaces the default instance when Orval generates api clients.
 */
import { emitter } from '_utils/emitter';
import { isSSR } from '@dwarvesf/react-utils';
import Axios, { AxiosRequestConfig, } from 'axios';
import { cleanAuth } from '_context/auth';


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const AXIOS_INSTANCE = Axios.create({ baseURL: BASE_URL }); // use your own URL here or environment variable

/**
 * Create the axios token for the cancellation the axios request
 */
export const SourceToken = () => {
  const { CancelToken } = Axios;
  const source = CancelToken.source();
  return source;
};

// Interceptors
const handleResponseSuccess = (response: any) => response;
const handleResponseFail = async (error: any) => {
  if (error.response?.status === 401) {
    // Remove auth storage
    cleanAuth();
    emitter.emit('FORCE_LOGOUT');
  }
  return Promise.reject(error);
};

// add a second `options` argument here if you want to pass extra options to each generated query
export const fetcher = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const token = isSSR() ? undefined : localStorage.getItem('df-token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  // Add interceptors
  AXIOS_INSTANCE.interceptors.response.use(
    handleResponseSuccess,
    handleResponseFail,
  )

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};
