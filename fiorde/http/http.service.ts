import { Injectable, } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as https from 'https';
import { HttpServiceResponse } from './interfaces';
import { config } from 'rxjs';

@Injectable()
export class FiordeHttpService {

  private axiosRef: AxiosInstance = Axios.create();;

  constructor(readonly configService: ConfigService) {
    const env = this.configService.get();
    this.axiosRef.defaults.baseURL = env.FIORDE_URL;
    this.axiosRef.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
    this.axiosRef.defaults.timeout = 1000 * 60 * 30;
  }

  async post(path: string, data?: any, config?: AxiosRequestConfig): Promise<HttpServiceResponse<any>> {
    try {
      
      return await this.axiosRef.post(path, data, config);
    } catch (err) {
      throw err;
    }
  }

  async put(path: string, data?: any, config?: AxiosRequestConfig): Promise<HttpServiceResponse<any>> {
    try {
      return await this.axiosRef.put(path, data, config);
    } catch (err) {
      throw err;
    }
  }

  // put(path: string, data?: any, config?: AxiosRequestConfig): Promise<HttpServiceResponse<any>> {

  // 	return this.axiosRef.put(path, data, config);
  // }
}
