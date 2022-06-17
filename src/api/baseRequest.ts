//import { IRequestBaseBody } from '../helpers/interfaces/requestInterfaces/RequestBase';
//import { RequestGenericType } from '../helpers/types/types';

const base = process.env.REACT_APP_API;

interface IRequestBaseBody{    
  body?: BodyInit | undefined;
  headers?: HeadersInit | undefined;
  method?: string | undefined;
  redirect?: RequestRedirect | undefined;
  signal?: AbortSignal | null | undefined;

  // node-fetch extensions
  //agent?: RequestOptions['agent'] | ((parsedUrl: URL) => RequestOptions['agent']); // =null http.Agent instance, allows custom proxy, certificate etc.
  compress?: boolean | undefined; // =true support gzip/deflate content encoding. false to disable
  follow?: number | undefined; // =20 maximum redirect count. 0 to not follow redirect
  size?: number | undefined; // =0 maximum response body size in bytes. 0 to disable
  timeout?: number | undefined; // =0 req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies)

}
class RequestGenericType implements IRequestBaseBody{}


const request = async (url: string, data: IRequestBaseBody, token: string | undefined) => {
  const headersForToken = token
    ? {
      Authorization: `Bearer ${token}`,
    } : { };
  const headerForMultiPart = typeof data.body === 'string' ? {
    'Content-Type': 'application/json;charset=utf-8',
  } : {};
  const response = await fetch(url, {
    ...data,
    // @ts-ignore
    headers: {
      ...headersForToken,
      ...headerForMultiPart,
    },
  });
  if (response.ok) {
    if (response.headers.get('Content-Length') === '0') {
      return true;
    }
    const typeResponse = response.headers.get('Content-Type');
    let result;
    if (typeResponse === 'application/text') {
      result = await response.text();
      return result;
    }
    result = await response.json();
    return result;
  }

  throw { isCustomError: true, status: response.status };
};

export const get = (url: string, token?: string) => request(`${base}${url}`, { method: 'GET' }, token);

export function post<T extends RequestGenericType>(url: string, body: T, token?: string) {
  return request(`${base}${url}`, { method: 'POST', body: JSON.stringify(body) }, token);
}

export const remove = (url: string, token: string) => request(`${base}${url}`, { method: 'DELETE' }, token);

export function put<T extends RequestGenericType>(url: string, body: T, token: string) {
  return request(`${base}${url}`, { method: 'PUT', body: JSON.stringify(body) }, token);
}

export function imagePost<T extends RequestGenericType>(url: string, body: FormData, token?: string) {
  return request(`${base}${url}`, { method: 'POST', body: body }, token);
}