

export interface HttpServiceResponse<T> {
  error?: HttpServiceError,
  data?: T
}

export interface HttpServiceError {
  code: string,
  message?: string,
  innerMessage: string
}