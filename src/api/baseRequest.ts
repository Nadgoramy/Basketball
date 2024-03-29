//import { IRequestBaseBody } from '../helpers/interfaces/requestInterfaces/RequestBase';
//import { RequestGenericType } from '../helpers/types/types';

import { authorizationExpired, tokenExpired, UserActions } from "common/helpers/userCheck";
import { AuthService, AUTH_API_URL } from "./requests/authService";

const base = process.env.REACT_APP_API;

interface IRequestBaseBody {
  body?: BodyInit;
  headers?: HeadersInit;
  method?: string;
  redirect?: RequestRedirect;
  signal?: AbortSignal | null;

  // node-fetch extensions
  //agent?: RequestOptions['agent'] | ((parsedUrl: URL) => RequestOptions['agent']); // =null http.Agent instance, allows custom proxy, certificate etc.
  compress?: boolean; // =true support gzip/deflate content encoding. false to disable
  follow?: number; // =20 maximum redirect count. 0 to not follow redirect
  size?: number; // =0 maximum response body size in bytes. 0 to disable
  timeout?: number; // =0 req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies)
}
class RequestGenericType implements IRequestBaseBody { }

const request = async (
  url: string,
  data: IRequestBaseBody,
  token: string | undefined
) => {
  const headersForToken =
    token && !tokenExpired(token)
      ? {
        Authorization: `Bearer ${token}`,
      }
      : {};
  const headerForMultiPart =
    typeof data.body === "string"
      ? {
        "Content-Type": "application/json;charset=utf-8",
      }
      : {};
  try {
    const response = await fetch(url, {
      ...data,
      // @ts-ignore
      headers: {
        ...headersForToken,
        ...headerForMultiPart,
      },
    });
    if (response.ok) {
      if (response.headers.get("Content-Length") === "0") {
        return true;
      }
      const typeResponse = response.headers.get("Content-Type");
      if (typeResponse === "application/text") {
        const result = await response.text();
        return result;
      }
      const result = await response.json();
      return result;
    }

    throw { isCustomError: true, status: response.status };
  } catch (error: any) {
    if (error.isCustomError) throw error;

    throw { message: error.message };
  }
};

export const get = (url: string, token?: string) => {
  const currentUser = UserActions.getCurrentUser();
  if (!currentUser || authorizationExpired(currentUser))
    return Promise.reject({
      isCustomError: true,
      status: 401,
      message: "Authorization exception",
    });
  return request(`${base}${url}`, { method: "GET" }, currentUser.token);
};

export function post<T extends RequestGenericType>(
  url: string,
  body: T,
  token?: string
) {
  const currentUser = UserActions.getCurrentUser();
  if (
    (!currentUser || authorizationExpired(currentUser)) &&
    !url.startsWith(AUTH_API_URL)
  )
    return Promise.reject({
      isCustomError: true,
      status: 401,
      message: "Authorization exception",
    });

  return request(
    `${base}${url}`,
    { method: "POST", body: JSON.stringify(body) },
    currentUser?.token
  );
}

export const remove = (url: string, token?: string) => {
  const currentUser = UserActions.getCurrentUser();
  if (!currentUser || authorizationExpired(currentUser))
    return Promise.reject({
      isCustomError: true,
      status: 401,
      message: "Authorization exception",
    });
  return request(`${base}${url}`, { method: "DELETE" }, currentUser.token);
};

export function put<T extends RequestGenericType>(
  url: string,
  body: T,
  token?: string
) {
  const currentUser = UserActions.getCurrentUser();
  if (!currentUser || authorizationExpired(currentUser))
    return Promise.reject({
      isCustomError: true,
      status: 401,
      message: "Authorization exception",
    });

  return request(
    `${base}${url}`,
    { method: "PUT", body: JSON.stringify(body) },
    currentUser.token
  );
}

export function imagePost<T extends RequestGenericType>(
  url: string,
  body: FormData,
  token?: string
) {
  const currentUser = UserActions.getCurrentUser();
  if (!currentUser || authorizationExpired(currentUser))
    return Promise.reject({
      isCustomError: true,
      status: 401,
      message: "Authorization exception",
    });

  return request(
    `${base}${url}`,
    { method: "POST", body: body },
    currentUser.token
  );
}
