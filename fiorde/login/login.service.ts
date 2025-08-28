import { Injectable, } from '@nestjs/common';
import { Token } from './interfaces';
import { FiordeHttpService } from '../http/http.service'
import { HttpServiceResponse } from '../http/interfaces/index';

@Injectable()
export class FiordeLoginService extends FiordeHttpService {


  async login(): Promise<HttpServiceResponse<Token>> {
    try {
      
      const env = this.configService.get();
      const config = { headers: { 'Authorization': 'Basic ' + env.FIORDE_KEY } };
      
      return await this.post(`oauth/token?scope=sap.cliente`, '', config);
    } catch (err) {
      throw err;
    }
  }
}
