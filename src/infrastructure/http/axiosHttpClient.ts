import axios, {type AxiosInstance, type InternalAxiosRequestConfig} from 'axios';
import {Platform} from 'react-native';
import appConfig from '../../../app.json';
import {AppConfigUtility} from '@/utils/appConfig.utility';
import {ApiError} from '@/infrastructure/http/apiError';
import type {HttpClient, HttpHeaders, HttpMethod, HttpRequestOptions} from '@/infrastructure/http/httpClient';

export type AxiosHttpClientConfig = {
  baseUrl: string;
  getAppId: () => string;
  getAuthToken?: () => string | null;
  getExtraHeaders?: () => HttpHeaders;
};

let authToken: string | null = null;

export function setHttpAuthToken(token: string | null) {
  authToken = token;
}

export function getHttpAuthToken() {
  return authToken;
}

export class AxiosHttpClient implements HttpClient {
  private country: string | null = null;

  constructor(
    private readonly client: AxiosInstance,
    private readonly config: AxiosHttpClientConfig,
  ) {
    this.client.interceptors.request.use(async (request) => this.applyRequestHeaders(request));
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (axios.isAxiosError(error)) {
          throw new ApiError(
            error.message,
            error.response?.status,
            error.response?.data,
            error.config?.url,
          );
        }

        throw error;
      },
    );
  }

  async get<T>(path?: string, options: Omit<HttpRequestOptions, 'path' | 'data' | 'method'> = {}) {
    return this.request<T>({...options, method: 'get', path});
  }

  async post<T>(
    path: string,
    data?: unknown,
    options: Omit<HttpRequestOptions, 'path' | 'data' | 'method'> = {},
  ) {
    return this.request<T>({...options, method: 'post', path, data});
  }

  async put<T>(
    path: string,
    data?: unknown,
    options: Omit<HttpRequestOptions, 'path' | 'data' | 'method'> = {},
  ) {
    return this.request<T>({...options, method: 'put', path, data});
  }

  async delete<T>(path?: string, options: Omit<HttpRequestOptions, 'path' | 'data' | 'method'> = {}) {
    return this.request<T>({...options, method: 'delete', path});
  }

  async request<T>({method, path, url, headers, params, data, signal}: HttpRequestOptions & {method: HttpMethod}) {
    const appId = this.config.getAppId();

    if (!appId) {
      throw new ApiError('Missing appId for API request', undefined, undefined, path ?? url);
    }

    const response = await this.client.request<T>({
      method,
      url: url ?? path ?? '',
      headers,
      params,
      data,
      signal,
    });

    return response.data;
  }

  private async applyRequestHeaders(request: InternalAxiosRequestConfig) {
    const appId = this.config.getAppId();
    const token = this.config.getAuthToken?.();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const country = await this.getCountryFromIp();

    request.params = {
      ...request.params,
      appId,
    };

    request.headers.set('Content-Type', 'application/json');
    request.headers.set('app-id', appId);
    request.headers.set('x-consumer', Platform.OS === 'ios' || Platform.OS === 'android' ? 'phone' : Platform.OS);
    request.headers.set('x-platform', Platform.OS);
    request.headers.set('X-Client-Timestamp', new Date().toISOString());
    request.headers.set('x-timezone', timezone);
    request.headers.set('x-origin-country', country);

    if (token) {
      request.headers.set('Authorization', token);
    }

    const extraHeaders = this.config.getExtraHeaders?.() ?? {};
    Object.entries(extraHeaders).forEach(([key, value]) => {
      request.headers.set(key, value);
    });

    return request;
  }

  private async getCountryFromIp(): Promise<string> {
    if (this.country) {
      return this.country;
    }

    try {
      const result = await axios.get('https://echoip.mogiio.com/country', {
        timeout: 1000,
        responseType: 'text',
      });
      const rawCountry = typeof result.data === 'string' ? result.data : String(result.data ?? 'none');
      this.country = rawCountry.trim().replace(/[\r\n\t]/g, '') || 'none';
    } catch {
      this.country = 'none';
    }

    return this.country;
  }
}

export function createAxiosHttpClient(config: AxiosHttpClientConfig): HttpClient {
  const instance = axios.create({
    baseURL: config.baseUrl.replace(/\/$/, ''),
    timeout: 15_000,
  });

  return new AxiosHttpClient(instance, config);
}

export const httpClient = createAxiosHttpClient({
  baseUrl: AppConfigUtility.getBaseUrl(),
  getAppId: () => appConfig.appId ?? '',
  getAuthToken: getHttpAuthToken,
});
