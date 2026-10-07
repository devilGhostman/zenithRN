export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly data?: unknown,
    readonly url?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
