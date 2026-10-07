export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type HttpHeaders = Record<string, string>;

export type HttpRequestOptions = {
  path?: string;
  url?: string;
  method?: HttpMethod;
  headers?: HttpHeaders;
  params?: Record<string, string | number | boolean | undefined>;
  data?: unknown;
  signal?: AbortSignal;
};

export type ApiEnvelope<T> = {status: {code: number; message: string}; data: T};

export interface HttpClient {
  get<T>(path?: string, options?: Omit<HttpRequestOptions, 'path' | 'data' | 'method'>): Promise<T>;
  post<T>(path: string, data?: unknown, options?: Omit<HttpRequestOptions, 'path' | 'data' | 'method'>): Promise<T>;
  put<T>(path: string, data?: unknown, options?: Omit<HttpRequestOptions, 'path' | 'data' | 'method'>): Promise<T>;
  delete<T>(path?: string, options?: Omit<HttpRequestOptions, 'path' | 'data' | 'method'>): Promise<T>;
  request<T>(options: HttpRequestOptions & {method: HttpMethod}): Promise<T>;
}
