import { AxiosResponse } from 'axios';
import { HttpServiceResponse } from './interfaces';
import * as _ from 'axios';



const responseHandler = (r: AxiosResponse): HttpServiceResponse<any> => {
  const result: HttpServiceResponse<any> = {
    error: null,
    data: r.data
  }
  return result;
}

const errorHandler = (r: any): HttpServiceResponse<any> => {
  console.log(r)
  if (r.status == 400 && r.data.error && r.data.error.message) {
    const result: HttpServiceResponse<any> = {
      error: {
        code: r.status.toString(),
        innerMessage: r.data.error.message.value.toString()
      }
    }
    return result;
  }
  else {
    const result: HttpServiceResponse<any> = {
      error: {
        code: r.status.toString(),
        innerMessage: r.error.message
      }
    }
    return result;
  }
}

export function response(res: any): HttpServiceResponse<any> {
  if (res.status == 'SUCCESS' || res.status == 200 || res.status == 201 || res.status == 204) {
    return responseHandler(res);
  }
  else {
    return errorHandler(res.response || res);
  }

}