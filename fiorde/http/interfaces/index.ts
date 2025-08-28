//import * as uuid from 'uuid/v4';ERRO NESSA LINHA NO BUILD
//import {v4 as uuid} from 'uuid';
import { uuid } from 'uuidv4';

export interface HttpServiceResponse<T> {
  error?: HttpServiceError,
  data?: T
}

export interface HttpServiceError {
  code: string,
  message?: string,
  innerMessage: string
}

export enum RequestMethodType {
  "GET" = "GET",
  "POST" = "POST",
  "PATCH" = "PATCH",
  "PUT" = "PUT",
  "DELETE" = "DELETE"
}

