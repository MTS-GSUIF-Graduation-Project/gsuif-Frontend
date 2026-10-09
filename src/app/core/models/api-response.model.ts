export interface ApiResponse<T> {
  status: string;
  clientMessage: string;
  statusCode: number;
  body: T | null;
  errors: Record<string, string> | null;
}

export class ApiException extends Error {
  constructor(
    readonly statusCode: number,
    readonly clientMessage: string,
    readonly errors: Record<string, string> | null
  ) {
    super(clientMessage);
  }
}
